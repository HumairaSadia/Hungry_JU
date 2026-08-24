/**
 * @file Data access for the cart aggregate (`carts` + `cart_items`).
 *
 * @module server/repositories/cart-repository
 */

import { BaseRepository } from '@/server/core/base-repository';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Data access for `carts` and `cart_items` together: the cart is one aggregate,
 * so items are never written without their parent.
 *
 * @augments BaseRepository
 */
export class CartRepository extends BaseRepository {
  /**
   * @param {unknown} db - Database client.
   */
  constructor(db) {
    super(db, 'carts');
  }

  /**
   * Loads the student's single active cart with its items hydrated.
   *
   * @param {string} _studentId - Owning student.
   * @returns {Promise<import('@/server/models/cart').Cart | null>} Cart, or `null` when the
   *   student has none yet.
   * @throws {NotImplementedError} Until implemented.
   */
  async findActiveByStudentId(_studentId) {
    throw new NotImplementedError('CartRepository.findActiveByStudentId');
  }

  /**
   * Opens a cart locked to one shop (BR-03).
   *
   * @param {string} _studentId - Owning student.
   * @param {string} _shopId - Shop the cart is locked to.
   * @returns {Promise<import('@/server/models/cart').Cart>} The new cart.
   * @throws {NotImplementedError} Until implemented.
   */
  async createForStudent(_studentId, _shopId) {
    throw new NotImplementedError('CartRepository.createForStudent');
  }

  /**
   * UNIQUE(cart_id, item_id) turns a re-add into a quantity bump (FR-C4).
   *
   * @param {string} _cartId - Target cart.
   * @param {string} _menuItemId - Item being added.
   * @param {number} _quantity - Units to add or set.
   * @returns {Promise<import('@/server/models/cart-item').CartItem>} The stored line.
   * @throws {NotImplementedError} Until implemented.
   */
  async upsertItem(_cartId, _menuItemId, _quantity) {
    throw new NotImplementedError('CartRepository.upsertItem');
  }

  /**
   * Drops one line from the cart.
   *
   * @param {string} _cartId - Target cart.
   * @param {string} _menuItemId - Item to remove.
   * @returns {Promise<void>} Resolves once written.
   * @throws {NotImplementedError} Until implemented.
   */
  async removeItem(_cartId, _menuItemId) {
    throw new NotImplementedError('CartRepository.removeItem');
  }

  /**
   * Empties the cart, releasing its shop lock.
   *
   * @param {string} _cartId - Target cart.
   * @returns {Promise<void>} Resolves once written.
   * @throws {NotImplementedError} Until implemented.
   */
  async clear(_cartId) {
    throw new NotImplementedError('CartRepository.clear');
  }

  /**
   * Writes the whole aggregate — parent row and lines — in one transaction.
   *
   * @param {import('@/server/models/cart').Cart} _cart - Cart to persist.
   * @returns {Promise<import('@/server/models/cart').Cart>} Persisted cart.
   * @throws {NotImplementedError} Until implemented.
   */
  async save(_cart) {
    throw new NotImplementedError('CartRepository.save');
  }

  /**
   * Maps a `carts` row (with joined lines) onto its aggregate.
   *
   * @param {import('@/shared/types').PersistenceRow} _row - Row from `carts`.
   * @returns {import('@/server/models/cart').Cart} Hydrated cart.
   * @throws {NotImplementedError} Until implemented.
   */
  toModel(_row) {
    throw new NotImplementedError('CartRepository.toModel');
  }
}
