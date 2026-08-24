/**
 * @file Data access for the `menu_items` table.
 *
 * @module server/repositories/menu-item-repository
 */

import { BaseRepository } from '@/server/core/base-repository';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Data access for `menu_items`. Index on (shop_id, is_available) per SRS section 10.
 *
 * @augments BaseRepository
 */
export class MenuItemRepository extends BaseRepository {
  /**
   * @param {unknown} db - Database client.
   */
  constructor(db) {
    super(db, 'menu_items');
  }

  /**
   * Loads a shop's menu.
   *
   * @param {string} _shopId - Owning shop.
   * @param {{ availableOnly?: boolean, category?: string }} [_options] - Narrowing options;
   *   student-facing calls pass `availableOnly`.
   * @returns {Promise<import('@/server/models/menu-item').MenuItem[]>} Menu items.
   * @throws {NotImplementedError} Until implemented.
   */
  async findByShopId(_shopId, _options) {
    throw new NotImplementedError('MenuItemRepository.findByShopId');
  }

  /**
   * FR-C2: partial match, so "khich" finds "Khichuri".
   *
   * @param {string} _term - Raw search term.
   * @param {import('@/shared/types').Criteria} _filters - Extra filters, e.g. category.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/server/models/menu-item').MenuItem[]>} Matching items.
   * @throws {NotImplementedError} Until implemented.
   */
  async searchByName(_term, _filters, _pagination) {
    throw new NotImplementedError('MenuItemRepository.searchByName');
  }

  /**
   * Bulk load used at checkout to re-read prices and availability.
   *
   * @param {string[]} _itemIds - Item ids from the cart.
   * @returns {Promise<import('@/server/models/menu-item').MenuItem[]>} Items found.
   * @throws {NotImplementedError} Until implemented.
   */
  async findManyByIds(_itemIds) {
    throw new NotImplementedError('MenuItemRepository.findManyByIds');
  }

  /**
   * Persists the sold-out toggle (FR-B3).
   *
   * @param {string} _itemId - Item to update.
   * @param {boolean} _isAvailable - Desired state.
   * @returns {Promise<void>} Resolves once written.
   * @throws {NotImplementedError} Until implemented.
   */
  async setAvailability(_itemId, _isAvailable) {
    throw new NotImplementedError('MenuItemRepository.setAvailability');
  }

  /**
   * Distinct categories used to section a shop's menu.
   *
   * @param {string} _shopId - Owning shop.
   * @returns {Promise<string[]>} Category labels.
   * @throws {NotImplementedError} Until implemented.
   */
  async findCategories(_shopId) {
    throw new NotImplementedError('MenuItemRepository.findCategories');
  }

  /**
   * Maps a `menu_items` row onto its entity.
   *
   * @param {import('@/shared/types').PersistenceRow} _row - Row from `menu_items`.
   * @returns {import('@/server/models/menu-item').MenuItem} Hydrated item.
   * @throws {NotImplementedError} Until implemented.
   */
  toModel(_row) {
    throw new NotImplementedError('MenuItemRepository.toModel');
  }
}
