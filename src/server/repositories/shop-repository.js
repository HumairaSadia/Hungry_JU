/**
 * @file Data access for the `shops` table.
 *
 * @module server/repositories/shop-repository
 */

import { BaseRepository } from '@/server/core/base-repository';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Data access for `shops`. Browse queries are the read-heavy hot path — index and cache here.
 *
 * @augments BaseRepository
 */
export class ShopRepository extends BaseRepository {
  /**
   * @param {unknown} db - Database client.
   */
  constructor(db) {
    super(db, 'shops');
  }

  /**
   * Loads the shop a vendor owns.
   *
   * @param {string} _ownerUserId - Vendor user id.
   * @returns {Promise<import('@/server/models/shop').Shop | null>} Shop, or `null`.
   * @throws {NotImplementedError} Until implemented.
   */
  async findByOwnerId(_ownerUserId) {
    throw new NotImplementedError('ShopRepository.findByOwnerId');
  }

  /**
   * FR-C1: approved and open only.
   *
   * @param {import('@/shared/types').Criteria} _filters - Category or location filter.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/server/models/shop').Shop[]>} Orderable shops.
   * @throws {NotImplementedError} Until implemented.
   */
  async findOrderable(_filters, _pagination) {
    throw new NotImplementedError('ShopRepository.findOrderable');
  }

  /**
   * Feeds the admin approval queue (FR-G1).
   *
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/server/models/shop').Shop[]>} Shops awaiting review.
   * @throws {NotImplementedError} Until implemented.
   */
  async findPendingApproval(_pagination) {
    throw new NotImplementedError('ShopRepository.findPendingApproval');
  }

  /**
   * Name search across orderable shops.
   *
   * @param {string} _term - Raw search term.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/server/models/shop').Shop[]>} Matching shops.
   * @throws {NotImplementedError} Until implemented.
   */
  async search(_term, _pagination) {
    throw new NotImplementedError('ShopRepository.search');
  }

  /**
   * Records an admin approval decision (FR-G2).
   *
   * @param {string} _shopId - Shop under review.
   * @param {string} _status - `'approved'` or `'rejected'`.
   * @param {string} [_reason] - Required when rejecting.
   * @returns {Promise<void>} Resolves once written.
   * @throws {NotImplementedError} Until implemented.
   */
  async setApprovalStatus(_shopId, _status, _reason) {
    throw new NotImplementedError('ShopRepository.setApprovalStatus');
  }

  /**
   * Flips the vendor's open/closed switch (FR-B4).
   *
   * @param {string} _shopId - Shop to update.
   * @param {boolean} _isOpen - Desired state.
   * @returns {Promise<void>} Resolves once written.
   * @throws {NotImplementedError} Until implemented.
   */
  async setOpenState(_shopId, _isOpen) {
    throw new NotImplementedError('ShopRepository.setOpenState');
  }

  /**
   * Recomputes the denormalised rating average after a new rating.
   *
   * @param {string} _shopId - Shop to refresh.
   * @returns {Promise<number>} The new average.
   * @throws {NotImplementedError} Until implemented.
   */
  async refreshRatingAverage(_shopId) {
    throw new NotImplementedError('ShopRepository.refreshRatingAverage');
  }

  /**
   * Maps a `shops` row onto its entity.
   *
   * @param {import('@/shared/types').PersistenceRow} _row - Row from `shops`.
   * @returns {import('@/server/models/shop').Shop} Hydrated shop.
   * @throws {NotImplementedError} Until implemented.
   */
  toModel(_row) {
    throw new NotImplementedError('ShopRepository.toModel');
  }
}
