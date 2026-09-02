/**
 * @file Order lifecycle owner.
 *
 * @module server/services/order-service
 */

import { BaseService } from '@/server/core/base-service';
import { NotImplementedError } from '@/server/core/not-implemented-error';
import { ConflictError, ForbiddenError, NotFoundError } from '@/server/core/errors';

/**
 * What the tracking poll returns to the student's status stepper.
 *
 * @typedef {object} TrackingState
 * @property {import('@/shared/types').OrderStatus} status - Current order status.
 * @property {import('@/shared/types').DeliveryStatus | null} deliveryStatus - Rider progress,
 *   `null` before a rider claims the order.
 * @property {string | null} riderName - Assigned rider, when any.
 * @property {string | null} confirmPin - Delivery PIN, shown only to the customer.
 * @property {boolean} isCancellable - Whether the cancel button should be live (BR-04).
 */

/**
 * Order lifecycle owner (UC-01, UC-03, Epic C).
 * Every status write goes through OrderStateMachine plus a conditional UPDATE, so a
 * concurrent request can never skip a state or double-apply one (NFR-11).
 *
 * @augments BaseService
 */
export class OrderService extends BaseService {
  /** @type {import('@/server/repositories/order-repository').OrderRepository} */
  #orderRepository;

  /** @type {import('@/server/services/cart-service').CartService} */
  #cartService;

  /** @type {import('@/server/repositories/shop-repository').ShopRepository} */
  #shopRepository;

  /** @type {import('@/server/repositories/menu-item-repository').MenuItemRepository} */
  #menuItemRepository;

  /** @type {import('@/server/services/order-state-machine').OrderStateMachine} */
  #stateMachine;

  /** @type {import('@/server/services/pin-service').PinService} */
  #pinService;

  /** @type {import('@/server/services/notification-service').NotificationService} */
  #notificationService;

  /** @type {import('@/server/services/audit-service').AuditService} */
  #auditService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/repositories/order-repository').OrderRepository}
   *   dependencies.orderRepository - Order storage.
   * @param {import('@/server/services/cart-service').CartService} dependencies.cartService -
   *   Supplies and revalidates the cart at checkout.
   * @param {import('@/server/repositories/shop-repository').ShopRepository}
   *   dependencies.shopRepository - Shop open state (BR-07).
   * @param {import('@/server/repositories/menu-item-repository').MenuItemRepository}
   *   dependencies.menuItemRepository - Authoritative prices at placement time.
   * @param {import('@/server/services/order-state-machine').OrderStateMachine}
   *   dependencies.stateMachine - Legal transitions (SRS section 6).
   * @param {import('@/server/services/pin-service').PinService} dependencies.pinService -
   *   Mints the delivery-confirmation PIN.
   * @param {import('@/server/services/notification-service').NotificationService}
   *   dependencies.notificationService - Fan-out on every transition.
   * @param {import('@/server/services/audit-service').AuditService} dependencies.auditService -
   *   Records transitions (BR-09).
   */
  constructor({
    orderRepository,
    cartService,
    shopRepository,
    menuItemRepository,
    stateMachine,
    pinService,
    notificationService,
    auditService,
  }) {
    super();
    this.#orderRepository = orderRepository;
    this.#cartService = cartService;
    this.#shopRepository = shopRepository;
    this.#menuItemRepository = menuItemRepository;
    this.#stateMachine = stateMachine;
    this.#pinService = pinService;
    this.#notificationService = notificationService;
    this.#auditService = auditService;
  }

  /**
   * UC-01. The idempotency key makes a retried checkout return the same order (E1).
   *
   * @param {import('@/shared/types').Actor} _actor - Ordering student.
   * @param {{ hallName: string, roomNo: string, note?: string, paymentMethod: string }}
   *   _payload - Validated checkout fields.
   * @param {string} _idempotencyKey - Value of the `Idempotency-Key` header.
   * @returns {Promise<import('@/server/models/order').Order>} The placed order.
   * @throws {NotImplementedError} Until implemented.
   */
  async placeOrder(_actor, _payload, _idempotencyKey) {
    throw new NotImplementedError('OrderService.placeOrder');
  }

  /**
   * Reads one order, ownership-checked.
   *
   * @param {import('@/shared/types').Actor} _actor - Requesting principal.
   * @param {string} _orderId - Order to read.
   * @returns {Promise<import('@/server/models/order').Order>} The order with its lines.
   * @throws {NotImplementedError} Until implemented.
   */
  async getOrder(_actor, _orderId) {
    throw new NotImplementedError('OrderService.getOrder');
  }

  /**
   * Order history for the acting student (FR-C8).
   *
   * @param {import('@/shared/types').Actor} _actor - Requesting student.
   * @param {import('@/shared/types').Criteria} _filters - Status or date filter.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/shared/types').PaginatedResult>} Orders plus page metadata.
   * @throws {NotImplementedError} Until implemented.
   */
  async listStudentOrders(_actor, _filters, _pagination) {
    throw new NotImplementedError('OrderService.listStudentOrders');
  }

  /**
   * Incoming-order queue for a vendor (FR-B5).
   *
   * @param {import('@/shared/types').Actor} _actor - Owning vendor.
   * @param {string} _shopId - Shop whose queue is read.
   * @param {import('@/shared/types').OrderStatus[]} _statuses - Statuses to include.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/shared/types').PaginatedResult>} Orders plus page metadata.
   * @throws {NotImplementedError} Until implemented.
   */
  async listShopOrders(_actor, _shopId, _statuses, _pagination) {
    throw new NotImplementedError('OrderService.listShopOrders');
  }

  /**
   * FR-B4. Starts the preparation flow and stops the accept-timeout timer.
   *
   * @param {import('@/shared/types').Actor} _actor - Accepting vendor.
   * @param {string} _orderId - Order to accept.
   * @returns {Promise<import('@/server/models/order').Order>} The accepted order.
   * @throws {NotImplementedError} Until implemented.
   */
  async acceptOrder(_actor, _orderId) {
    throw new NotImplementedError('OrderService.acceptOrder');
  }

  /**
   * Refuses an order, telling the student why (FR-B6).
   *
   * @param {import('@/shared/types').Actor} _actor - Rejecting vendor.
   * @param {string} _orderId - Order to reject.
   * @param {string} _reason - Reason shown to the student.
   * @returns {Promise<import('@/server/models/order').Order>} The rejected order.
   * @throws {NotImplementedError} Until implemented.
   */
  async rejectOrder(_actor, _orderId, _reason) {
    throw new NotImplementedError('OrderService.rejectOrder');
  }

  /**
   * Moves an accepted order into `preparing`.
   *
   * @param {import('@/shared/types').Actor} _actor - Owning vendor.
   * @param {string} _orderId - Order to advance.
   * @returns {Promise<import('@/server/models/order').Order>} The updated order.
   * @throws {NotImplementedError} Until implemented.
   */
  async markPreparing(_actor, _orderId) {
    throw new NotImplementedError('OrderService.markPreparing');
  }

  /**
   * Marks the food ready, which exposes the order to the rider feed.
   *
   * @param {import('@/shared/types').Actor} _actor - Owning vendor.
   * @param {string} _orderId - Order to advance.
   * @returns {Promise<import('@/server/models/order').Order>} The updated order.
   * @throws {NotImplementedError} Until implemented.
   */
  async markReadyForPickup(_actor, _orderId) {
    throw new NotImplementedError('OrderService.markReadyForPickup');
  }

    /**
   * UC-03. Eligibility is re-checked at commit time, not when the button rendered.
   *
   * @param {import('@/shared/types').Actor} actor - Cancelling student.
   * @param {string} orderId - Order to cancel.
   * @param {string} [reason] - Optional reason recorded on the audit row.
   * @returns {Promise<import('@/server/models/order').Order>} The cancelled order.
   */
  async cancelOrder(actor, orderId, reason) {
    const order = await this.#orderRepository.findByIdWithItems(orderId);

    if (!order) {
      throw new NotFoundError(`Order ${orderId} not found`);
    }

    this.assertOwnership(actor, order);

    // BR-04 / AC-06: only Placed or Accepted orders may be cancelled.
    if (!order.isCancellable) {
      throw new ConflictError(
        `Order ${orderId} cannot be cancelled from status "${order.status}"`,
      );
    }

    const fromStatus = order.status;

    // Validates the transition against the state graph and updates the in-memory model.
    order.applyTransition('cancelled');

    // Conditional write: fails (returns false) if another request already moved this
    // order's status since we read it above — protects against the exact race NFR-11
    // calls out.
    const wasUpdated = await this.#orderRepository.updateStatusIf(
      orderId,
      fromStatus,
      'cancelled',
    );

    if (!wasUpdated) {
      throw new ConflictError(
        `Order ${orderId} was modified concurrently; cancellation aborted`,
      );
    }

    await this.#auditService.recordStatusChange(actor, 'order', orderId, fromStatus, 'cancelled');

    // Fans out to student, vendor, and assigned rider per FR-E2/E3.
    await this.#notificationService.notifyStatusChange(order, fromStatus, 'cancelled');

    return order;
  }

  /**
   * BR-11, called by the scheduler when a vendor never answered.
   *
   * @param {number} _timeoutSeconds - How long a vendor may sit on a `placed` order.
   * @returns {Promise<number>} How many orders were auto-cancelled.
   * @throws {NotImplementedError} Until implemented.
   */
  async autoCancelExpired(_timeoutSeconds) {
    throw new NotImplementedError('OrderService.autoCancelExpired');
  }

  /**
   * FR-E1: the status stepper polls this (5 s) until WebSockets arrive in Phase 2.
   *
   * @param {import('@/shared/types').Actor} _actor - Requesting student.
   * @param {string} _orderId - Order being tracked.
   * @returns {Promise<TrackingState>} Current progress for the stepper.
   * @throws {NotImplementedError} Until implemented.
   */
  async getTrackingState(_actor, _orderId) {
    throw new NotImplementedError('OrderService.getTrackingState');
  }

  /**
   * Rebuilds the cart from a past order (FR-C9); unavailable items are reported, not silently
   * dropped.
   *
   * @param {import('@/shared/types').Actor} _actor - Requesting student.
   * @param {string} _orderId - Order to repeat.
   * @returns {Promise<import('@/server/models/cart').Cart>} The refilled cart.
   * @throws {NotImplementedError} Until implemented.
   */
  async reorder(_actor, _orderId) {
    throw new NotImplementedError('OrderService.reorder');
  }

   /**
   * Object-level guard: students reach their own orders, vendors their shop's.
   *
   * @override
   * @param {import('@/shared/types').Actor} actor - Requesting principal.
   * @param {import('@/server/models/order').Order} order - Order being touched.
   * @returns {void} Returns nothing when allowed.
   * @throws {ForbiddenError} When the actor is not the order's owner.
   */
  assertOwnership(actor, order) {
    if (!order.belongsTo(actor.id)) {
      throw new ForbiddenError('You do not have permission to act on this order');
    }
  }
