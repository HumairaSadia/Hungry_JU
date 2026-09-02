/**
 * @file The concurrency-critical rider assignment path.
 *
 * @module server/services/delivery-assignment-service
 */

import { BaseService } from '@/server/core/base-service';
import { NotImplementedError } from '@/server/core/not-implemented-error';
import {
  ConflictError,
  BusinessRuleError,
  NotFoundError,
} from '@/server/core/app-error';

/**
 * The concurrency-critical path (UC-02) isolated in its own class:
 * first-accept-wins, exactly one rider per order, losers get a clean ConflictError.
 * Keeping it separate from DeliveryService makes it straightforward to test with
 * simulated parallel accepts (risk R4).
 *
 * @augments BaseService
 */
export class DeliveryAssignmentService extends BaseService {
  /** @type {import('@/server/repositories/delivery-repository').DeliveryRepository} */
  #deliveryRepository;

  /** @type {import('@/server/repositories/order-repository').OrderRepository} */
  #orderRepository;

  /** @type {import('@/server/repositories/student-profile-repository').StudentProfileRepository} */
  #studentProfileRepository;

  /** @type {import('@/server/services/notification-service').NotificationService} */
  #notificationService;

  /** @type {import('@/server/services/audit-service').AuditService} */
  #auditService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/repositories/delivery-repository').DeliveryRepository}
   *   dependencies.deliveryRepository - Owns the atomic claim.
   * @param {import('@/server/repositories/order-repository').OrderRepository}
   *   dependencies.orderRepository - Supplies the claimable feed.
   * @param {import('@/server/repositories/student-profile-repository').StudentProfileRepository}
   *   dependencies.studentProfileRepository - Deliver Mode flag and reliability score.
   * @param {import('@/server/services/notification-service').NotificationService}
   *   dependencies.notificationService - Announces assignment and release.
   * @param {import('@/server/services/audit-service').AuditService} dependencies.auditService -
   *   Records claims, releases, and reassignments (BR-09).
   */
  constructor({
    deliveryRepository,
    orderRepository,
    studentProfileRepository,
    notificationService,
    auditService,
  }) {
    super();
    this.#deliveryRepository = deliveryRepository;
    this.#orderRepository = orderRepository;
    this.#studentProfileRepository = studentProfileRepository;
    this.#notificationService = notificationService;
    this.#auditService = auditService;
  }

  /**
   * FR-D2. BR-06 filters the rider's own orders out of the feed.
   *
   * @param {import('@/shared/types').Actor} actor - Requesting rider.
   * @param {import('@/server/utils/pagination').Pagination} [pagination] - Page window.
   * @returns {Promise<import('@/shared/types').PaginatedResult | Array<object>>} Claimable orders.
   */
  async listAvailableOrders(actor, pagination) {
    // Check if the student has deliver mode enabled
    const profile = await this.#studentProfileRepository.findByUserId(actor.id);
    const hasDeliverMode = actor.isDeliverMode || profile?.isDeliverMode;

    if (actor.role !== 'student' || !hasDeliverMode) {
      throw new BusinessRuleError('Rider must be a student with Deliver Mode enabled to view available orders.');
    }

    const claimable = await this.#orderRepository.findAvailableOrders(pagination);

    // Filter out the rider's own placed orders (BR-06)
    if (Array.isArray(claimable)) {
      return claimable.filter((order) => order.userId !== actor.id && order.customerId !== actor.id);
    }

    if (claimable && Array.isArray(claimable.items)) {
      return {
        ...claimable,
        items: claimable.items.filter((order) => order.userId !== actor.id && order.customerId !== actor.id),
      };
    }

    return claimable || [];
  }

  /**
   * Preconditions: Deliver Mode on, no active delivery (FR-D4), not the rider's own order.
   *
   * @param {import('@/shared/types').Actor} actor - Rider attempting the claim.
   * @param {import('@/server/models/order').Order} order - Order being claimed.
   * @returns {Promise<void>} Resolves when the rider is eligible.
   */
  async assertEligible(actor, order) {
    // Check Deliver Mode
    const profile = await this.#studentProfileRepository.findByUserId(actor.id);
    const hasDeliverMode = actor.isDeliverMode || profile?.isDeliverMode;

    if (actor.role !== 'student' || !hasDeliverMode) {
      throw new BusinessRuleError('Rider must have Deliver Mode active to claim an order.');
    }

    // BR-06: A rider cannot deliver their own order
    if (order.userId === actor.id || order.customerId === actor.id) {
      throw new BusinessRuleError('BR-06: A rider cannot accept their own order.');
    }

    // FR-D4: Exactly one active delivery per rider at any time
    const activeDelivery = await this.#deliveryRepository.findActiveByRiderId(actor.id);
    if (activeDelivery) {
      throw new BusinessRuleError('FR-D4: Rider already has an active in-flight delivery.');
    }
  }

  /**
   * Atomic claim; throws ConflictError when another rider won the race.
   *
   * @param {import('@/shared/types').Actor} actor - Rider attempting the claim.
   * @param {string} orderId - Order to claim.
   * @returns {Promise<import('@/server/models/delivery').Delivery>} The delivery this rider
   *   now owns.
   */
  async acceptOrder(actor, orderId) {
    const order = await this.#orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundError(`Order ${orderId} not found.`);
    }

    await this.assertEligible(actor, order);

    // Atomic claim via repository (first-accept-wins, risk R4 / UC-02)
    const delivery = await this.#deliveryRepository.claimOrder(orderId, actor.id);
    if (!delivery) {
      throw new ConflictError('Order was already claimed by another rider.');
    }

    // Record audit trace (BR-09)
    if (this.#auditService) {
      await this.#auditService.record({
        action: 'ORDER_CLAIMED',
        actorId: actor.id,
        targetId: delivery.id || orderId,
        details: { orderId, riderId: actor.id },
      }).catch(() => {});
    }

    // Dispatch assignment notification to customer
    if (this.#notificationService) {
      await this.#notificationService.notifyAssignment({
        orderId,
        userId: order.userId || order.customerId,
        riderId: actor.id,
      }).catch(() => {});
    }

    return delivery;
  }

  /**
   * HJU-D06: order returns to the pool, rider reliability drops.
   *
   * @param {import('@/shared/types').Actor} _actor - Releasing rider.
   * @param {string} _deliveryId - Delivery to release.
   * @param {string} _reason - Why the rider dropped it.
   * @returns {Promise<void>} Resolves once the order is claimable again.
   * @throws {NotImplementedError} Until implemented.
   */
  async releaseDelivery(_actor, _deliveryId, _reason) {
    throw new NotImplementedError('DeliveryAssignmentService.releaseDelivery');
  }

  /**
   * Admin dispute tool (HJU-G03).
   *
   * @param {import('@/shared/types').Actor} _admin - Acting admin.
   * @param {string} _deliveryId - Delivery to move.
   * @param {string} _newRiderUserId - Rider to assign it to.
   * @returns {Promise<import('@/server/models/delivery').Delivery>} The reassigned delivery.
   * @throws {NotImplementedError} Until implemented.
   */
  async reassign(_admin, _deliveryId, _newRiderUserId) {
    throw new NotImplementedError('DeliveryAssignmentService.reassign');
  }

  /**
   * UC-02 E1: accepted but never picked up — alert admin, offer release.
   *
   * @param {number} _minutes - Age threshold in minutes.
   * @returns {Promise<number>} How many stalled deliveries were flagged.
   * @throws {NotImplementedError} Until implemented.
   */
  async handleStalledPickups(_minutes) {
    throw new NotImplementedError('DeliveryAssignmentService.handleStalledPickups');
  }
}