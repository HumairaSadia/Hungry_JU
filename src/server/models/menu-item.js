/**
 * @file Menu item entity: a sellable dish with its current price.
 *
 * @module server/models/menu-item
 */

import { BaseModel } from '@/server/core/base-model';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Frozen name/price copy handed to an order line at placement time.
 *
 * @typedef {object} MenuItemSnapshot
 * @property {string} menuItemId - Source item id.
 * @property {string} name - Item name as sold.
 * @property {number} unitPrice - Price at placement time, in poisha.
 */

/**
 * Table `menu_items`. Current price lives here; order lines snapshot it instead of
 * referencing it, so editing a price never rewrites order history (SRS section 7).
 *
 * @augments BaseModel
 */
export class MenuItem extends BaseModel {
  /** @type {string} */
  #shopId;

  /** @type {string} */
  #name;

  /** @type {string} */
  #description;

  /** @type {number} */
  #price;

  /** @type {string | undefined} */
  #photoUrl;

  /** @type {string} */
  #category;

  /** @type {boolean} */
  #isAvailable;

  /** @type {number} */
  #prepTimeMin;

  /**
   * @param {object} attributes - Column values.
   * @param {string | null} [attributes.id] - Primary key.
   * @param {Date | null} [attributes.createdAt] - Row creation timestamp.
   * @param {string} attributes.shopId - Owning shop.
   * @param {string} attributes.name - Item name.
   * @param {string} attributes.description - Short description shown on the menu.
   * @param {number} attributes.price - Current price in poisha.
   * @param {string} [attributes.photoUrl] - Optional photo.
   * @param {string} attributes.category - Menu section, e.g. `'rice'`.
   * @param {boolean} attributes.isAvailable - Sold-out toggle (risk R3).
   * @param {number} attributes.prepTimeMin - Typical preparation time in minutes.
   */
  constructor({
    id,
    createdAt,
    shopId,
    name,
    description,
    price,
    photoUrl,
    category,
    isAvailable,
    prepTimeMin,
  }) {
    super({ id, createdAt });
    this.#shopId = shopId;
    this.#name = name;
    this.#description = description;
    this.#price = price;
    this.#photoUrl = photoUrl;
    this.#category = category;
    this.#isAvailable = isAvailable;
    this.#prepTimeMin = prepTimeMin;
  }

  /**
   * Owning shop.
   *
   * @returns {string} Shop id.
   */
  get shopId() {
    return this.#shopId;
  }

  /**
   * Item name.
   *
   * @returns {string} Name.
   */
  get name() {
    return this.#name;
  }

  /**
   * Menu description.
   *
   * @returns {string} Description.
   */
  get description() {
    return this.#description;
  }

  /**
   * Current price.
   *
   * @returns {number} Price in poisha.
   */
  get price() {
    return this.#price;
  }

  /**
   * Item photo.
   *
   * @returns {string | undefined} Photo URL, when set.
   */
  get photoUrl() {
    return this.#photoUrl;
  }

  /**
   * Menu section.
   *
   * @returns {string} Category label.
   */
  get category() {
    return this.#category;
  }

  /**
   * Availability flag.
   *
   * @returns {boolean} `true` when the item can be ordered.
   */
  get isAvailable() {
    return this.#isAvailable;
  }

  /**
   * Typical preparation time.
   *
   * @returns {number} Minutes.
   */
  get prepTimeMin() {
    return this.#prepTimeMin;
  }

  /**
   * One-tap sold-out toggle; risk R3 depends on this being trivial for vendors.
   *
   * @param {boolean} _isAvailable - Desired availability.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  setAvailability(_isAvailable) {
    throw new NotImplementedError('MenuItem.setAvailability');
  }

  /**
   * Applies vendor edits to the editable fields.
   *
   * @param {Partial<{ name: string, description: string, price: number, photoUrl: string,
   *   category: string, prepTimeMin: number }>} _changes - Fields to update.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  updateDetails(_changes) {
    throw new NotImplementedError('MenuItem.updateDetails');
  }

  /**
   * Frozen copy of name + price handed to OrderItem at placement time.
   *
   * @returns {MenuItemSnapshot} Immutable line snapshot.
   * @throws {NotImplementedError} Until implemented.
   */
  toSnapshot() {
    throw new NotImplementedError('MenuItem.toSnapshot');
  }

  /**
   * Case-insensitive match used by the search endpoint.
   *
   * @param {string} _searchTerm - Raw search term.
   * @returns {boolean} `true` when the item matches.
   * @throws {NotImplementedError} Until implemented.
   */
  matches(_searchTerm) {
    throw new NotImplementedError('MenuItem.matches');
  }
}
