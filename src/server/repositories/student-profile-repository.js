/**
 * @file Data access for the `student_profiles` table.
 *
 * @module server/repositories/student-profile-repository
 */

import { BaseRepository } from '@/server/core/base-repository';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Data access for `student_profiles` (hall/room, Deliver Mode flag, reliability score).
 *
 * @augments BaseRepository
 */
export class StudentProfileRepository extends BaseRepository {
  /**
   * @param {unknown} db - Database client.
   */
  constructor(db) {
    super(db, 'student_profiles');
  }

  /**
   * Loads the profile attached to a user.
   *
   * @param {string} _userId - Owning user.
   * @returns {Promise<import('@/server/models/student-profile').StudentProfile | null>}
   *   Profile, or `null`.
   * @throws {NotImplementedError} Until implemented.
   */
  async findByUserId(_userId) {
    throw new NotImplementedError('StudentProfileRepository.findByUserId');
  }

  /**
   * Persists the Deliver Mode toggle (FR-D1).
   *
   * @param {string} _userId - Owning user.
   * @param {boolean} _enabled - Desired state.
   * @returns {Promise<void>} Resolves once written.
   * @throws {NotImplementedError} Until implemented.
   */
  async setDeliveryEnabled(_userId, _enabled) {
    throw new NotImplementedError('StudentProfileRepository.setDeliveryEnabled');
  }

  /**
   * Updates the default drop-off location (FR-C7).
   *
   * @param {string} _userId - Owning user.
   * @param {string} _hallName - New hall.
   * @param {string} _roomNo - New room.
   * @returns {Promise<void>} Resolves once written.
   * @throws {NotImplementedError} Until implemented.
   */
  async updateLocation(_userId, _hallName, _roomNo) {
    throw new NotImplementedError('StudentProfileRepository.updateLocation');
  }

  /**
   * Applies a signed change to the reliability score (risk R1).
   *
   * @param {string} _userId - Rider whose score moves.
   * @param {number} _delta - Signed adjustment.
   * @returns {Promise<number>} Score after the adjustment.
   * @throws {NotImplementedError} Until implemented.
   */
  async adjustReliability(_userId, _delta) {
    throw new NotImplementedError('StudentProfileRepository.adjustReliability');
  }

  /**
   * Recomputes the maintained rider rating average from the ratings table.
   *
   * @param {string} _userId - Rider to refresh.
   * @returns {Promise<number>} The new average.
   * @throws {NotImplementedError} Until implemented.
   */
  async recalculateRiderRating(_userId) {
    throw new NotImplementedError('StudentProfileRepository.recalculateRiderRating');
  }

  /**
   * Maps a `student_profiles` row onto its entity.
   *
   * @param {import('@/shared/types').PersistenceRow} _row - Row from `student_profiles`.
   * @returns {import('@/server/models/student-profile').StudentProfile} Hydrated profile.
   * @throws {NotImplementedError} Until implemented.
   */
  toModel(_row) {
    throw new NotImplementedError('StudentProfileRepository.toModel');
  }
}
