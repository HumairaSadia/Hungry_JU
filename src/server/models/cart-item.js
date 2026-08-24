/**
 * @file Cart line item.
 *
 * @module server/models/cart-item
 */

import { BaseModel } from '@/server/core/base-model';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Table `cart_items`. UNIQUE(cart_id, item_id) makes re-adding merge quantities (FR-C4).
 *
 * @augments BaseModel
 */
export class CartItem extends BaseModel {
  /** @type {string} */
  #cartId;

  /** @type {string} */
  #menuItemId;

  /** @type {number} */
  #quantity;

  /** @type {import('@/server/models/menu-item').MenuItem | null} */
  #menuItem;

  /**
   * @param {object} attributes - Column values.
   * @param {string | null} [attributes.id] - Primary key.
   * @param {Date | null} [attributes.createdAt] - Row creation timestamp.
   * @param {string} attributes.cartId - Owning cart.
   * @param {string} attributes.menuItemId - Item being bought.
   * @param {number} attributes.quantity - Units in the cart.
   * @param {import('@/server/models/menu-item').MenuItem | null} [attributes.menuItem] -
   *   Joined menu item, when loaded, for prices and availability.
   */
  constructor({ id, createdAt, cartId, menuItemId, quantity, menuItem = null }) {
    super({ id, createdAt });
    this.#cartId = cartId;
    this.#menuItemId = menuItemId;
    this.#quantity = quantity;
    this.#menuItem = menuItem;
  }

  /**
   * Owning cart.
   *
   * @returns {string} Cart id.
   */
  get cartId() {
    return this.#cartId;
  }

  /**
   * Item being bought.
   *
   * @returns {string} Menu item id.
   */
  get menuItemId() {
    return this.#menuItemId;
  }

  /**
   * Units in the cart.
   *
   * @returns {number} Quantity.
   */
  get quantity() {
    return this.#quantity;
  }

  /**
   * Joined menu item.
   *
   * @returns {import('@/server/models/menu-item').MenuItem | null} Item, or `null` when not
   *   loaded.
   */
  get menuItem() {
    return this.#menuItem;
  }

  /**
   * Merges a repeat add into this line (FR-C4).
   *
   * @param {number} _amount - Units to add.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  increaseBy(_amount) {
    throw new NotImplementedError('CartItem.increaseBy');
  }

  /**
   * Replaces the quantity outright.
   *
   * @param {number} _quantity - New quantity; must be positive.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  setQuantity(_quantity) {
    throw new NotImplementedError('CartItem.setQuantity');
  }

  /**
   * Line amount at the item's current price.
   *
   * @returns {number} Total in poisha.
   * @throws {NotImplementedError} Until implemented.
   */
  lineTotal() {
    throw new NotImplementedError('CartItem.lineTotal');
  }
}
