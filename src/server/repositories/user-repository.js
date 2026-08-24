/**
 * @file Data access for the `users` table.
 *
 * @module server/repositories/user-repository
 */

import { BaseRepository } from '@/server/core/base-repository';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Data access for `users`. Instantiates the right User subclass from the role column.
 *
 * @augments BaseRepository
 */
export class UserRepository extends BaseRepository {
  /**
   * @param {unknown} db - Database client.
   */
  constructor(db) {
    super(db, 'users');
  }

  /**
   * Looks a user up by email.
   *
   * @param {string} _email - Email address, already normalised.
   * @returns {Promise<import('@/server/models/user').User | null>} User, or `null`.
   * @throws {NotImplementedError} Until implemented.
   */
  async findByEmail(_email) {
    throw new NotImplementedError('UserRepository.findByEmail');
  }

  /**
   * Looks a user up by phone number.
   *
   * @param {string} _phone - Phone number in storage format.
   * @returns {Promise<import('@/server/models/user').User | null>} User, or `null`.
   * @throws {NotImplementedError} Until implemented.
   */
  async findByPhone(_phone) {
    throw new NotImplementedError('UserRepository.findByPhone');
  }

  /**
   * FR-A4: login accepts either identifier.
   *
   * @param {string} _identifier - Email address or phone number.
   * @returns {Promise<import('@/server/models/user').User | null>} User, or `null`.
   * @throws {NotImplementedError} Until implemented.
   */
  async findByEmailOrPhone(_identifier) {
    throw new NotImplementedError('UserRepository.findByEmailOrPhone');
  }

  /**
   * BR-01 uniqueness pre-check used during registration.
   *
   * @param {string} _email - Candidate email.
   * @param {string} _phone - Candidate phone.
   * @returns {Promise<boolean>} `true` when either is already taken.
   * @throws {NotImplementedError} Until implemented.
   */
  async existsWithEmailOrPhone(_email, _phone) {
    throw new NotImplementedError('UserRepository.existsWithEmailOrPhone');
  }

  /**
   * Writes a new account status (verification, suspension, reactivation).
   *
   * @param {string} _userId - Account to update.
   * @param {import('@/shared/types').UserStatus} _status - New status.
   * @returns {Promise<void>} Resolves once written.
   * @throws {NotImplementedError} Until implemented.
   */
  async updateStatus(_userId, _status) {
    throw new NotImplementedError('UserRepository.updateStatus');
  }

  /**
   * Stores a new credential hash after a reset or change.
   *
   * @param {string} _userId - Account to update.
   * @param {string} _hash - Bcrypt hash.
   * @returns {Promise<void>} Resolves once written.
   * @throws {NotImplementedError} Until implemented.
   */
  async updatePasswordHash(_userId, _hash) {
    throw new NotImplementedError('UserRepository.updatePasswordHash');
  }

  /**
   * Bumps the failed-login counter behind the FR-A6 lockout.
   *
   * @param {string} _userId - Account that failed to authenticate.
   * @returns {Promise<number>} The counter after the increment.
   * @throws {NotImplementedError} Until implemented.
   */
  async incrementFailedLogins(_userId) {
    throw new NotImplementedError('UserRepository.incrementFailedLogins');
  }

  /**
   * Clears the failed-login counter after a successful login.
   *
   * @param {string} _userId - Account that authenticated.
   * @returns {Promise<void>} Resolves once written.
   * @throws {NotImplementedError} Until implemented.
   */
  async resetFailedLogins(_userId) {
    throw new NotImplementedError('UserRepository.resetFailedLogins');
  }

  /**
   * Backs the admin user list with filtering and paging (FR-G3).
   *
   * @param {import('@/shared/types').Criteria} _criteria - Role, status, or search filter.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/server/models/user').User[]>} Matching accounts.
   * @throws {NotImplementedError} Until implemented.
   */
  async searchForAdmin(_criteria, _pagination) {
    throw new NotImplementedError('UserRepository.searchForAdmin');
  }

  /**
   * Polymorphic mapping: role column decides Student, Vendor, or Admin.
   *
   * @param {import('@/shared/types').PersistenceRow} _row - Row from `users`.
   * @returns {import('@/server/models/user').User} Role-specific entity.
   * @throws {NotImplementedError} Until implemented.
   */
  toModel(_row) {
    throw new NotImplementedError('UserRepository.toModel');
  }
}
