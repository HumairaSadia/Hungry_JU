/**
 * @file Data access for the `ratings` table.
 *
 * @module server/repositories/rating-repository
 */

import { BaseRepository } from '@/server/core/base-repository';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Data access for `ratings`. The unique constraint, not application code, enforces BR-08.
 *
 * @augments BaseRepository
 */
export class RatingRepository extends BaseRepository {
  /**
   * @param {unknown} db - Database client.
   */
  constructor(db) {
    super(db, 'ratings');
  }

  /**
   * Ratings left for one order (at most one per target type).
   *
   * @param {string} _orderId - Order id.
   * @returns {Promise<import('@/server/models/rating').Rating[]>} Ratings on that order.
   * @throws {NotImplementedError} Until implemented.
   */
  async findByOrderId(_orderId) {
    throw new NotImplementedError('RatingRepository.findByOrderId');
  }

  /**
   * Ratings received by one shop or rider.
   *
   * @param {string} _targetType - `'shop'` or `'rider'`.
   * @param {string} _targetId - Shop id or rider user id.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/server/models/rating').Rating[]>} Ratings for that target.
   * @throws {NotImplementedError} Until implemented.
   */
  async findByTarget(_targetType, _targetId, _pagination) {
    throw new NotImplementedError('RatingRepository.findByTarget');
  }

  /**
   * Mean score for one target, used to refresh the denormalised averages.
   *
   * @param {string} _targetType - `'shop'` or `'rider'`.
   * @param {string} _targetId - Shop id or rider user id.
   * @returns {Promise<number>} Average stars.
   * @throws {NotImplementedError} Until implemented.
   */
  async averageForTarget(_targetType, _targetId) {
    throw new NotImplementedError('RatingRepository.averageForTarget');
  }

  /**
   * Ratings flagged for moderation, for the admin queue.
   *
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/server/models/rating').Rating[]>} Flagged ratings.
   * @throws {NotImplementedError} Until implemented.
   */
  async findFlagged(_pagination) {
    throw new NotImplementedError('RatingRepository.findFlagged');
  }

  /**
   * Maps a `ratings` row onto its entity.
   *
   * @param {import('@/shared/types').PersistenceRow} _row - Row from `ratings`.
   * @returns {import('@/server/models/rating').Rating} Hydrated rating.
   * @throws {NotImplementedError} Until implemented.
   */
  toModel(_row) {
    throw new NotImplementedError('RatingRepository.toModel');
  }
}
