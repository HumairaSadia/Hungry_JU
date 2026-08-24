/**
 * @file Cart aggregate root: one active cart per student.
 *
 * @module server/models/cart
 */

import { BaseModel } from '@/server/core/base-model';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Table `carts`, one active cart per student.
 * Aggregate root over CartItem: all quantity maths goes through here so BR-03
 * (a cart holds items from exactly one shop) cannot be bypassed.
 *
 * @augments BaseModel
 */
export class Cart extends BaseModel {
  /** @type {string} */
  #studentId;

  /** @type {string | null} */
  #shopId;

  /** @type {import('@/server/models/cart-item').CartItem[]} */
  #items;

  /** @type {Date} */
  #updatedAt;

  /**
   * @param {object} attributes - Column values plus the loaded lines.
   * @param {string | null} [attributes.id] - Primary key.
   * @param {Date | null} [attributes.createdAt] - Row creation timestamp.
   * @param {string} attributes.studentId - Owning student.
   * @param {string | null} attributes.shopId - Shop the cart is locked to (BR-03); `null`
   *   while the cart is empty.
   * @param {import('@/server/models/cart-item').CartItem[]} [attributes.items] - Cart lines.
   * @param {Date} attributes.updatedAt - Last mutation timestamp.
   */
  constructor({ id, createdAt, studentId, shopId, items = [], updatedAt }) {
    super({ id, createdAt });
    this.#studentId = studentId;
    this.#shopId = shopId;
    this.#items = items;
    this.#updatedAt = updatedAt;
  }

  /**
   * Owning student.
   *
   * @returns {string} Student user id.
   */
  get studentId() {
    return this.#studentId;
  }

  /**
   * Shop this cart is locked to.
   *
   * @returns {string | null} Shop id, or `null` when empty.
   */
  get shopId() {
    return this.#shopId;
  }

  /**
   * Cart lines, copied so callers cannot mutate the aggregate.
   *
   * @returns {import('@/server/models/cart-item').CartItem[]} Lines.
   */
  get items() {
    return [...this.#items];
  }

  /**
   * Last mutation timestamp.
   *
   * @returns {Date} Updated-at.
   */
  get updatedAt() {
    return this.#updatedAt;
  }

  /**
   * Whether the cart holds any line.
   *
   * @returns {boolean} `true` when empty.
   * @throws {NotImplementedError} Until implemented.
   */
  get isEmpty() {
    throw new NotImplementedError('Cart.isEmpty');
  }

  /**
   * Total units across all lines, for the nav badge.
   *
   * @returns {number} Unit count.
   * @throws {NotImplementedError} Until implemented.
   */
  get itemCount() {
    throw new NotImplementedError('Cart.itemCount');
  }

  /**
   * BR-03 guard: adding an item from another shop requires an explicit clear first.
   *
   * @param {import('@/server/models/menu-item').MenuItem} _menuItem - Item to add.
   * @param {number} _quantity - Units to add; merges with an existing line (FR-C4).
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  addItem(_menuItem, _quantity) {
    throw new NotImplementedError('Cart.addItem');
  }

  /**
   * Sets the quantity of one line, removing it at zero.
   *
   * @param {string} _itemId - Cart line id.
   * @param {number} _quantity - New quantity.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  updateQuantity(_itemId, _quantity) {
    throw new NotImplementedError('Cart.updateQuantity');
  }

  /**
   * Drops one line.
   *
   * @param {string} _itemId - Cart line id.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  removeItem(_itemId) {
    throw new NotImplementedError('Cart.removeItem');
  }

  /**
   * Empties the cart and releases the shop lock.
   *
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  clear() {
    throw new NotImplementedError('Cart.clear');
  }

  /**
   * Sum of the line totals at current menu prices.
   *
   * @returns {number} Subtotal in poisha.
   * @throws {NotImplementedError} Until implemented.
   */
  subtotal() {
    throw new NotImplementedError('Cart.subtotal');
  }

  /**
   * Subtotal plus the delivery fee.
   *
   * @param {number} _deliveryFee - Fee to add, in poisha.
   * @returns {number} Payable total in poisha.
   * @throws {NotImplementedError} Until implemented.
   */
  total(_deliveryFee) {
    throw new NotImplementedError('Cart.total');
  }

  /**
   * Re-checks shop open state and item availability just before checkout (UC-01 step 6).
   *
   * @param {import('@/server/models/shop').Shop} _shop - Shop the cart is locked to.
   * @param {import('@/server/models/menu-item').MenuItem[]} _menuItems - Current versions of
   *   the items in the cart.
   * @returns {void} Returns nothing when the cart is still checkout-able.
   * @throws {NotImplementedError} Until implemented.
   */
  revalidate(_shop, _menuItems) {
    throw new NotImplementedError('Cart.revalidate');
  }
}
