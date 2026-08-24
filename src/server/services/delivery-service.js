/**
 * @file Delivery progress, PIN completion, and rider earnings.
 *
 * @module server/services/delivery-service
 */

import { BaseService } from '@/server/core/base-service';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Totals shown on the rider's earnings screen (FR-D7).
 *
 * @typedef {object} EarningsSummary
 * @property {number} total - Earnings for the period, in poisha.
 * @property {number} deliveryCount - Completed deliveries in the period.
 * @property {'day' | 'week' | 'month' | 'all'} period - Window the totals cover.
 */

/**
 * Delivery progress, PIN completion, and rider earnings (FR-D5..D7).
 *
 * @augments BaseService
 */
export class DeliveryService extends BaseService {
  /** @type {import('@/server/repositories/delivery-repository').DeliveryRepository} */
  #deliveryRepository;

  /** @type {import('@/server/repositories/order-repository').OrderRepository} */
  #orderRepository;

  /** @type {import('@/server/services/order-service').OrderService} */
  #orderService;

  /** @type {import('@/server/services/pin-service').PinService} */
  #pinService;

  /** @type {import('@/server/services/notification-service').NotificationService} */
  #notificationService;

  /** @type {import('@/server/services/audit-service').AuditService} */
  #auditService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/repositories/delivery-repository').DeliveryRepository}
   *   dependencies.deliveryRepository - Delivery storage.
   * @param {import('@/server/repositories/order-repository').OrderRepository}
   *   dependencies.orderRepository - Order storage.
   * @param {import('@/server/services/order-service').OrderService} dependencies.orderService -
   *   Drives the matching order transitions.
   * @param {import('@/server/services/pin-service').PinService} dependencies.pinService -
   *   Verifies the confirmation PIN.
   * @param {import('@/server/services/notification-service').NotificationService}
   *   dependencies.notificationService - Tells the student about rider progress.
   * @param {import('@/server/services/audit-service').AuditService} dependencies.auditService -
   *   Records delivery events (BR-09).
   */
  constructor({
    deliveryRepository,
    orderRepository,
    orderService,
    pinService,
    notificationService,
    auditService,
  }) {
    super();
    this.#deliveryRepository = deliveryRepository;
    this.#orderRepository = orderRepository;
    this.#orderService = orderService;
    this.#pinService = pinService;
    this.#notificationService = notificationService;
    this.#auditService = auditService;
  }

  /**
   * The rider's single in-flight delivery, with its order attached (FR-D5).
   *
   * @param {import('@/shared/types').Actor} _actor - Requesting rider.
   * @returns {Promise<import('@/server/models/delivery').Delivery | null>} Active delivery, or
   *   `null` when the rider is free.
   * @throws {NotImplementedError} Until implemented.
   */
  async getActiveDelivery(_actor) {
    throw new NotImplementedError('DeliveryService.getActiveDelivery');
  }

  /**
   * Advances the delivery to `heading_to_vendor`.
   *
   * @param {import('@/shared/types').Actor} _actor - Assigned rider.
   * @param {string} _deliveryId - Delivery to advance.
   * @returns {Promise<import('@/server/models/delivery').Delivery>} The updated delivery.
   * @throws {NotImplementedError} Until implemented.
   */
  async markHeadingToVendor(_actor, _deliveryId) {
    throw new NotImplementedError('DeliveryService.markHeadingToVendor');
  }

  /**
   * Records pickup, which also moves the order to `picked_up`.
   *
   * @param {import('@/shared/types').Actor} _actor - Assigned rider.
   * @param {string} _deliveryId - Delivery to advance.
   * @returns {Promise<import('@/server/models/delivery').Delivery>} The updated delivery.
   * @throws {NotImplementedError} Until implemented.
   */
  async markPickedUp(_actor, _deliveryId) {
    throw new NotImplementedError('DeliveryService.markPickedUp');
  }

  /**
   * BR-10/FR-D6: the customer's PIN is the only way to close a delivery.
   *
   * @param {import('@/shared/types').Actor} _actor - Assigned rider.
   * @param {string} _deliveryId - Delivery to complete.
   * @param {string} _pin - PIN read off the customer's screen.
   * @returns {Promise<import('@/server/models/delivery').Delivery>} The completed delivery.
   * @throws {NotImplementedError} Until implemented.
   */
  async completeDelivery(_actor, _deliveryId, _pin) {
    throw new NotImplementedError('DeliveryService.completeDelivery');
  }

  /**
   * Earnings totals for the requested window (FR-D7).
   *
   * @param {import('@/shared/types').Actor} _actor - Requesting rider.
   * @param {'day' | 'week' | 'month' | 'all'} _period - Window to total.
   * @returns {Promise<EarningsSummary>} Totals for that window.
   * @throws {NotImplementedError} Until implemented.
   */
  async getEarningsSummary(_actor, _period) {
    throw new NotImplementedError('DeliveryService.getEarningsSummary');
  }

  /**
   * Past deliveries for the rider's history screen.
   *
   * @param {import('@/shared/types').Actor} _actor - Requesting rider.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/shared/types').PaginatedResult>} Deliveries plus page metadata.
   * @throws {NotImplementedError} Until implemented.
   */
  async getDeliveryHistory(_actor, _pagination) {
    throw new NotImplementedError('DeliveryService.getDeliveryHistory');
  }

  /**
   * Object-level guard: only the assigned rider may drive a delivery.
   *
   * @override
   * @param {import('@/shared/types').Actor} _actor - Requesting principal.
   * @param {import('@/server/models/delivery').Delivery} _delivery - Delivery being touched.
   * @returns {void} Returns nothing when allowed.
   * @throws {NotImplementedError} Until implemented.
   */
  assertOwnership(_actor, _delivery) {
    throw new NotImplementedError('DeliveryService.assertOwnership');
  }
}
