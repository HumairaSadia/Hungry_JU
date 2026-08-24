/**
 * @file Admin operations: approvals, suspensions, disputes, configuration.
 *
 * @module server/services/admin-service
 */

import { BaseService } from '@/server/core/base-service';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Epic G: vendor approvals, suspensions, dispute intervention, system configuration.
 *
 * @augments BaseService
 */
export class AdminService extends BaseService {
  /** @type {import('@/server/repositories/user-repository').UserRepository} */
  #userRepository;

  /** @type {import('@/server/repositories/shop-repository').ShopRepository} */
  #shopRepository;

  /** @type {import('@/server/repositories/order-repository').OrderRepository} */
  #orderRepository;

  /** @type {import('@/server/repositories/delivery-repository').DeliveryRepository} */
  #deliveryRepository;

  /** @type {import('@/server/services/delivery-assignment-service').DeliveryAssignmentService} */
  #assignmentService;

  /** @type {import('@/server/services/notification-service').NotificationService} */
  #notificationService;

  /** @type {import('@/server/services/audit-service').AuditService} */
  #auditService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/repositories/user-repository').UserRepository}
   *   dependencies.userRepository - Account storage.
   * @param {import('@/server/repositories/shop-repository').ShopRepository}
   *   dependencies.shopRepository - Shop approval queue.
   * @param {import('@/server/repositories/order-repository').OrderRepository}
   *   dependencies.orderRepository - Live order monitor.
   * @param {import('@/server/repositories/delivery-repository').DeliveryRepository}
   *   dependencies.deliveryRepository - Delivery state for disputes.
   * @param {import('@/server/services/delivery-assignment-service').DeliveryAssignmentService}
   *   dependencies.assignmentService - Reassigns deliveries during a dispute.
   * @param {import('@/server/services/notification-service').NotificationService}
   *   dependencies.notificationService - Tells affected users about decisions.
   * @param {import('@/server/services/audit-service').AuditService} dependencies.auditService -
   *   Records every admin action (BR-09).
   */
  constructor({
    userRepository,
    shopRepository,
    orderRepository,
    deliveryRepository,
    assignmentService,
    notificationService,
    auditService,
  }) {
    super();
    this.#userRepository = userRepository;
    this.#shopRepository = shopRepository;
    this.#orderRepository = orderRepository;
    this.#deliveryRepository = deliveryRepository;
    this.#assignmentService = assignmentService;
    this.#notificationService = notificationService;
    this.#auditService = auditService;
  }

  /**
   * Shops awaiting review (FR-G1).
   *
   * @param {import('@/shared/types').Actor} _admin - Acting admin.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/shared/types').PaginatedResult>} Pending shops.
   * @throws {NotImplementedError} Until implemented.
   */
  async listPendingVendors(_admin, _pagination) {
    throw new NotImplementedError('AdminService.listPendingVendors');
  }

  /**
   * FR-G1: rejection carries a reason the vendor can act on.
   *
   * @param {import('@/shared/types').Actor} _admin - Acting admin.
   * @param {string} _shopId - Shop under review.
   * @param {'approved' | 'rejected'} _decision - Outcome.
   * @param {string} [_reason] - Required when rejecting.
   * @returns {Promise<import('@/server/models/shop').Shop>} The reviewed shop.
   * @throws {NotImplementedError} Until implemented.
   */
  async decideVendorApplication(_admin, _shopId, _decision, _reason) {
    throw new NotImplementedError('AdminService.decideVendorApplication');
  }

  /**
   * Suspends an account (FR-G3).
   *
   * @param {import('@/shared/types').Actor} _admin - Acting admin.
   * @param {string} _userId - Account to suspend.
   * @param {string} _reason - Justification, mailed and audited.
   * @returns {Promise<import('@/server/models/user').User>} The suspended account.
   * @throws {NotImplementedError} Until implemented.
   */
  async suspendUser(_admin, _userId, _reason) {
    throw new NotImplementedError('AdminService.suspendUser');
  }

  /**
   * Lifts a suspension.
   *
   * @param {import('@/shared/types').Actor} _admin - Acting admin.
   * @param {string} _userId - Account to reactivate.
   * @returns {Promise<import('@/server/models/user').User>} The reactivated account.
   * @throws {NotImplementedError} Until implemented.
   */
  async reactivateUser(_admin, _userId) {
    throw new NotImplementedError('AdminService.reactivateUser');
  }

  /**
   * Live orders monitor; stuck orders (> X min) surface first (SRS section 8.4).
   *
   * @param {import('@/shared/types').Actor} _admin - Acting admin.
   * @param {import('@/shared/types').Criteria} _filters - Status, shop, or age filter.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/shared/types').PaginatedResult>} Orders plus page metadata.
   * @throws {NotImplementedError} Until implemented.
   */
  async listOrders(_admin, _filters, _pagination) {
    throw new NotImplementedError('AdminService.listOrders');
  }

  /**
   * Applies a dispute outcome to an order (HJU-G03).
   *
   * @param {import('@/shared/types').Actor} _admin - Acting admin.
   * @param {string} _orderId - Disputed order.
   * @param {{ action: string, note: string }} _resolution - What was decided and why.
   * @returns {Promise<import('@/server/models/order').Order>} The order after resolution.
   * @throws {NotImplementedError} Until implemented.
   */
  async resolveDispute(_admin, _orderId, _resolution) {
    throw new NotImplementedError('AdminService.resolveDispute');
  }

  /**
   * Cancels an order regardless of the normal cancel window.
   *
   * @param {import('@/shared/types').Actor} _admin - Acting admin.
   * @param {string} _orderId - Order to cancel.
   * @param {string} _reason - Justification, audited.
   * @returns {Promise<import('@/server/models/order').Order>} The cancelled order.
   * @throws {NotImplementedError} Until implemented.
   */
  async forceCancelOrder(_admin, _orderId, _reason) {
    throw new NotImplementedError('AdminService.forceCancelOrder');
  }

  /**
   * FR-G6: delivery fee, cancellation window, vendor accept timeout.
   *
   * @param {import('@/shared/types').Actor} _admin - Acting admin.
   * @param {Record<string, unknown>} _changes - Validated configuration values.
   * @returns {Promise<Record<string, unknown>>} The configuration after the change.
   * @throws {NotImplementedError} Until implemented.
   */
  async updateSystemConfig(_admin, _changes) {
    throw new NotImplementedError('AdminService.updateSystemConfig');
  }

  /**
   * Reads the audit trail (FR-G5).
   *
   * @param {import('@/shared/types').Actor} _admin - Acting admin.
   * @param {import('@/shared/types').Criteria} _filters - Entity or actor filter.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/shared/types').PaginatedResult>} Audit rows plus metadata.
   * @throws {NotImplementedError} Until implemented.
   */
  async readAuditTrail(_admin, _filters, _pagination) {
    throw new NotImplementedError('AdminService.readAuditTrail');
  }
}
