/**
 * @file The concurrency-critical rider assignment path.
 *
 * @module server/services/delivery-assignment-service
 */

import { BaseService } from '@/server/core/base-service';
import { NotImplementedError } from '@/server/core/not-implemented-error';

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
   * @param {import('@/shared/types').Actor} _actor - Requesting rider.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/shared/types').PaginatedResult>} Claimable orders.
   * @throws {NotImplementedError} Until implemented.
   */
  async listAvailableOrders(_actor, _pagination) {
    throw new NotImplementedError('DeliveryAssignmentService.listAvailableOrders');
  }

  /**
   * Preconditions: Deliver Mode on, no active delivery (FR-D4), not the rider's own order.
   *
   * @param {import('@/shared/types').Actor} _actor - Rider attempting the claim.
   * @param {import('@/server/models/order').Order} _order - Order being claimed.
   * @returns {Promise<void>} Resolves when the rider is eligible.
   * @throws {NotImplementedError} Until implemented.
   */
  async assertEligible(_actor, _order) {
    throw new NotImplementedError('DeliveryAssignmentService.assertEligible');
  }

  /**
   * Atomic claim; throws ConflictError when another rider won the race.
   *
   * @param {import('@/shared/types').Actor} _actor - Rider attempting the claim.
   * @param {string} _orderId - Order to claim.
   * @returns {Promise<import('@/server/models/delivery').Delivery>} The delivery this rider
   *   now owns.
   * @throws {NotImplementedError} Until implemented.
   */
  async acceptOrder(_actor, _orderId) {
    throw new NotImplementedError('DeliveryAssignmentService.acceptOrder');
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
