/**
 * @file Order aggregate root and its immutable financial record.
 *
 * @module server/models/order
 */

import { BaseModel } from '@/server/core/base-model';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Table `orders`. Aggregate root over OrderItem and the immutable financial record:
 * subtotal, fee, and total are stored at placement time and never recomputed.
 * Status changes go through OrderStateMachine, never by assigning to the field.
 *
 * @augments BaseModel
 */
export class Order extends BaseModel {
  /** @type {string} */
  #studentId;

  /** @type {string} */
  #shopId;

  /** @type {import('@/shared/types').OrderStatus} */
  #status;

  /** @type {import('@/server/models/order-item').OrderItem[]} */
  #items;

  /** @type {number} */
  #subtotal;

  /** @type {number} */
  #deliveryFee;

  /** @type {number} */
  #total;

  /** @type {string} */
  #deliveryHall;

  /** @type {string} */
  #deliveryRoom;

  /** @type {string | undefined} */
  #note;

  /** @type {string} */
  #paymentMethod;

  /** @type {Date} */
  #placedAt;

  /**
   * @param {object} attributes - Column values plus the loaded line items.
   * @param {string | null} [attributes.id] - Primary key.
   * @param {Date | null} [attributes.createdAt] - Row creation timestamp.
   * @param {string} attributes.studentId - Student who placed the order.
   * @param {string} attributes.shopId - Shop fulfilling it (single-vendor cart, BR-03).
   * @param {import('@/shared/types').OrderStatus} attributes.status - Lifecycle state.
   * @param {import('@/server/models/order-item').OrderItem[]} [attributes.items] - Line
   *   snapshots.
   * @param {number} attributes.subtotal - Sum of line totals, in poisha.
   * @param {number} attributes.deliveryFee - Fee applied at placement time, in poisha.
   * @param {number} attributes.total - Subtotal plus fee, in poisha.
   * @param {string} attributes.deliveryHall - Drop-off hall.
   * @param {string} attributes.deliveryRoom - Drop-off room.
   * @param {string} [attributes.note] - Free-text instruction for the vendor or rider.
   * @param {string} attributes.paymentMethod - Payment method chosen at checkout.
   * @param {Date} attributes.placedAt - When the order entered `placed`.
   */
  constructor({
    id,
    createdAt,
    studentId,
    shopId,
    status,
    items = [],
    subtotal,
    deliveryFee,
    total,
    deliveryHall,
    deliveryRoom,
    note,
    paymentMethod,
    placedAt,
  }) {
    super({ id, createdAt });
    this.#studentId = studentId;
    this.#shopId = shopId;
    this.#status = status;
    this.#items = items;
    this.#subtotal = subtotal;
    this.#deliveryFee = deliveryFee;
    this.#total = total;
    this.#deliveryHall = deliveryHall;
    this.#deliveryRoom = deliveryRoom;
    this.#note = note;
    this.#paymentMethod = paymentMethod;
    this.#placedAt = placedAt;
  }

  /**
   * Ordering student.
   *
   * @returns {string} Student user id.
   */
  get studentId() {
    return this.#studentId;
  }

  /**
   * Fulfilling shop.
   *
   * @returns {string} Shop id.
   */
  get shopId() {
    return this.#shopId;
  }

  /**
   * Lifecycle state.
   *
   * @returns {import('@/shared/types').OrderStatus} Current status.
   */
  get status() {
    return this.#status;
  }

  /**
   * Line items, copied so callers cannot mutate the aggregate.
   *
   * @returns {import('@/server/models/order-item').OrderItem[]} Line snapshots.
   */
  get items() {
    return [...this.#items];
  }

  /**
   * Sum of line totals.
   *
   * @returns {number} Subtotal in poisha.
   */
  get subtotal() {
    return this.#subtotal;
  }

  /**
   * Delivery fee frozen at placement time.
   *
   * @returns {number} Fee in poisha.
   */
  get deliveryFee() {
    return this.#deliveryFee;
  }

  /**
   * Amount payable.
   *
   * @returns {number} Total in poisha.
   */
  get total() {
    return this.#total;
  }

  /**
   * Drop-off hall.
   *
   * @returns {string} Hall name.
   */
  get deliveryHall() {
    return this.#deliveryHall;
  }

  /**
   * Drop-off room.
   *
   * @returns {string} Room number.
   */
  get deliveryRoom() {
    return this.#deliveryRoom;
  }

  /**
   * Free-text instruction supplied at checkout.
   *
   * @returns {string | undefined} Note, when given.
   */
  get note() {
    return this.#note;
  }

  /**
   * Payment method chosen at checkout.
   *
   * @returns {string} `'cod'` in the MVP.
   */
  get paymentMethod() {
    return this.#paymentMethod;
  }

  /**
   * When the order was placed.
   *
   * @returns {Date} Placement timestamp.
   */
  get placedAt() {
    return this.#placedAt;
  }

  /**
   * BR-04: cancellable only while Placed or Accepted.
   *
   * @returns {boolean} `true` while the cancel window is open.
   * @throws {NotImplementedError} Until implemented.
   */
  // get isCancellable() {
  //   throw new NotImplementedError('Order.isCancellable');
  // }
  get isCancellable() {
  return OrderStateMachine.isCancellable(this.status);
}


  /**
   * Available to riders once the vendor accepted it (drives the Available Orders feed).
   *
   * @returns {boolean} `true` when a rider may claim it.
   * @throws {NotImplementedError} Until implemented.
   */
  get isAssignable() {
    throw new NotImplementedError('Order.isAssignable');
  }

  /**
   * Whether the order has reached a final state.
   *
   * @returns {boolean} `true` for delivered, cancelled, or rejected.
   * @throws {NotImplementedError} Until implemented.
   */
  get isTerminal() {
    throw new NotImplementedError('Order.isTerminal');
  }

  /**
   * Only OrderStateMachine may call this; it validates the transition first.
   *
   * @param {import('@/shared/types').OrderStatus} _toStatus - Target state.
   * @param {import('@/shared/types').Actor} _actor - Who is driving the transition.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  // applyTransition(_toStatus, _actor) {
  //   throw new NotImplementedError('Order.applyTransition');
  // }

  applyTransition(nextStatus) {
  OrderStateMachine.assertCan(this.status, nextStatus);
  this.status = nextStatus;
  return this;
}

  /**
   * Recomputes totals from line snapshots; used at construction, not after placement.
   *
   * @param {number} _deliveryFee - Fee to apply, in poisha.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  calculateTotals(_deliveryFee) {
    throw new NotImplementedError('Order.calculateTotals');
  }

  /**
   * Ownership check backing the IDOR guard on order routes.
   *
   * @param {string} _studentId - Actor's user id.
   * @returns {boolean} `true` when the order belongs to that student.
   * @throws {NotImplementedError} Until implemented.
   */
  // belongsTo(_studentId) {
  //   throw new NotImplementedError('Order.belongsTo');
  // }
  belongsTo(userId) {
  return this.userId === userId;
}

  /**
   * Built from a validated Cart at checkout (UC-01 step 7).
   *
   * @param {import('@/server/models/cart').Cart} _cart - Cart being checked out.
   * @param {{ hallName: string, roomNo: string, note?: string }} _location - Drop-off details.
   * @param {number} _deliveryFee - Fee to freeze onto the order, in poisha.
   * @param {string} _paymentMethod - Chosen payment method.
   * @returns {Order} Unsaved order with its line snapshots and totals.
   * @throws {NotImplementedError} Until implemented.
   */
  static fromCart(_cart, _location, _deliveryFee, _paymentMethod) {
    throw new NotImplementedError('Order.fromCart');
  }
}
