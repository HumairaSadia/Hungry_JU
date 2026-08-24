/**
 * @file Password hashing, verification, and strength rules.
 *
 * @module server/services/password-service
 */

import { BaseService } from '@/server/core/base-service';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Owns every password rule so bcrypt appears in exactly one file (SRS section 9).
 * FR-A3: minimum 8 chars with upper, lower, digit, and special.
 *
 * @augments BaseService
 */
export class PasswordService extends BaseService {
  /**
   * Hashes a plaintext password at the configured cost.
   *
   * @param {string} _plainPassword - Password as typed.
   * @returns {Promise<string>} Bcrypt hash.
   * @throws {NotImplementedError} Until implemented.
   */
  async hash(_plainPassword) {
    throw new NotImplementedError('PasswordService.hash');
  }

  /**
   * Compares a candidate password against a stored hash.
   *
   * @param {string} _plainPassword - Password as typed.
   * @param {string} _hash - Stored bcrypt hash.
   * @returns {Promise<boolean>} `true` on a match.
   * @throws {NotImplementedError} Until implemented.
   */
  async verify(_plainPassword, _hash) {
    throw new NotImplementedError('PasswordService.verify');
  }

  /**
   * Throws ValidationError listing every unmet rule, not just the first.
   *
   * @param {string} _plainPassword - Password as typed.
   * @returns {void} Returns nothing when the password is acceptable.
   * @throws {NotImplementedError} Until implemented.
   */
  assertStrength(_plainPassword) {
    throw new NotImplementedError('PasswordService.assertStrength');
  }

  /**
   * Single-use, 15-minute reset token (FR-A5).
   *
   * @returns {string} Opaque reset token.
   * @throws {NotImplementedError} Until implemented.
   */
  generateResetToken() {
    throw new NotImplementedError('PasswordService.generateResetToken');
  }
}
