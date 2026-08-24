/**
 * @file Order line item: the immutable snapshot of what was bought.
 *
 * @module server/models/order-item
 */

import { BaseModel } from '@/server/core/base-model';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Table `order_items`. Stores name and unit price as snapshots: a later menu edit
 * must not rewrite what the student agreed to pay (SRS section 7 / 7.3).
 *
 * @augments BaseModel
 */
export class OrderItem extends BaseModel {
  /** @type {string} */
  #orderId;

  /** @type {string} */
  #menuItemId;

  /** @type {string} */
  #itemNameSnapshot;

  /** @type {number} */
  #unitPriceSnapshot;

  /** @type {number} */
  #quantity;

  /** @type {number} */
  #lineTotal;

  /**
   * @param {object} attributes - Column values.
   * @param {string | null} [attributes.id] - Primary key.
   * @param {Date | null} [attributes.createdAt] - Row creation timestamp.
   * @param {string} attributes.orderId - Owning order.
   * @param {string} attributes.menuItemId - Source menu item, kept for reporting only.
   * @param {string} attributes.itemNameSnapshot - Item name as sold.
   * @param {number} attributes.unitPriceSnapshot - Unit price as sold, in poisha.
   * @param {number} attributes.quantity - Units ordered.
   * @param {number} attributes.lineTotal - Unit price times quantity, in poisha.
   */
  constructor({
    id,
    createdAt,
    orderId,
    menuItemId,
    itemNameSnapshot,
    unitPriceSnapshot,
    quantity,
    lineTotal,
  }) {
    super({ id, createdAt });
    this.#orderId = orderId;
    this.#menuItemId = menuItemId;
    this.#itemNameSnapshot = itemNameSnapshot;
    this.#unitPriceSnapshot = unitPriceSnapshot;
    this.#quantity = quantity;
    this.#lineTotal = lineTotal;
  }

  /**
   * Owning order.
   *
   * @returns {string} Order id.
   */
  get orderId() {
    return this.#orderId;
  }

  /**
   * Source menu item.
   *
   * @returns {string} Menu item id.
   */
  get menuItemId() {
    return this.#menuItemId;
  }

  /**
   * Item name frozen at placement time.
   *
   * @returns {string} Name as sold.
   */
  get itemNameSnapshot() {
    return this.#itemNameSnapshot;
  }

  /**
   * Unit price frozen at placement time.
   *
   * @returns {number} Price in poisha.
   */
  get unitPriceSnapshot() {
    return this.#unitPriceSnapshot;
  }

  /**
   * Units ordered.
   *
   * @returns {number} Quantity.
   */
  get quantity() {
    return this.#quantity;
  }

  /**
   * Line amount.
   *
   * @returns {number} Total in poisha.
   */
  get lineTotal() {
    return this.#lineTotal;
  }

  /**
   * Converts a cart line into its frozen order line.
   *
   * @param {import('@/server/models/cart-item').CartItem} _cartItem - Cart line at checkout.
   * @returns {OrderItem} Snapshot line, not yet attached to an order id.
   * @throws {NotImplementedError} Until implemented.
   */
  static fromCartItem(_cartItem) {
    throw new NotImplementedError('OrderItem.fromCartItem');
  }
}
