/**
 * @file Vendor account: the shop owner.
 *
 * @module server/models/vendor
 */

import { User } from '@/server/models/user';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * A Bot Tola shop owner. Owns exactly one Shop in the MVP (SRS section 7.2).
 *
 * @augments User
 */
export class Vendor extends User {
  /** @type {import('@/server/models/shop').Shop | null} */
  #shop;

  /**
   * @param {import('@/server/models/user').UserAttributes} attributes - Shared user columns.
   * @param {import('@/server/models/shop').Shop | null} [shop] - Owned shop, when loaded.
   */
  constructor(attributes, shop = null) {
    super(attributes);
    this.#shop = shop;
  }

  /**
   * Role discriminator.
   *
   * @returns {import('@/shared/types').UserRole} Always `'vendor'`.
   * @throws {NotImplementedError} Until implemented.
   */
  get role() {
    throw new NotImplementedError('Vendor.role');
  }

  /**
   * The shop this vendor owns.
   *
   * @returns {import('@/server/models/shop').Shop | null} Shop, or `null` when not loaded.
   */
  get shop() {
    return this.#shop;
  }

  /**
   * BR-02: verified account plus admin-approved shop before any order can arrive.
   *
   * @returns {boolean} `true` when orders may be routed here.
   * @throws {NotImplementedError} Until implemented.
   */
  get canReceiveOrders() {
    throw new NotImplementedError('Vendor.canReceiveOrders');
  }

  /**
   * Ownership check backing the IDOR guard on shop-scoped routes.
   *
   * @param {string} _shopId - Shop addressed by the request.
   * @returns {boolean} `true` when this vendor owns that shop.
   * @throws {NotImplementedError} Until implemented.
   */
  ownsShop(_shopId) {
    throw new NotImplementedError('Vendor.ownsShop');
  }
}
