/**
 * @file Profile reads and edits.
 *
 * @module server/services/user-service
 */

import { BaseService } from '@/server/core/base-service';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Profile reads and edits, including the hall/room delivery location (FR-A8, HJU-A04).
 *
 * @augments BaseService
 */
export class UserService extends BaseService {
  /** @type {import('@/server/repositories/user-repository').UserRepository} */
  #userRepository;

  /** @type {import('@/server/repositories/student-profile-repository').StudentProfileRepository} */
  #studentProfileRepository;

  /** @type {import('@/server/services/audit-service').AuditService} */
  #auditService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/repositories/user-repository').UserRepository}
   *   dependencies.userRepository - Account storage.
   * @param {import('@/server/repositories/student-profile-repository').StudentProfileRepository}
   *   dependencies.studentProfileRepository - Student profile storage.
   * @param {import('@/server/services/audit-service').AuditService} dependencies.auditService -
   *   Records profile changes (BR-09).
   */
  constructor({ userRepository, studentProfileRepository, auditService }) {
    super();
    this.#userRepository = userRepository;
    this.#studentProfileRepository = studentProfileRepository;
    this.#auditService = auditService;
  }

  /**
   * Reads a profile; a non-admin actor may only read their own.
   *
   * @param {import('@/shared/types').Actor} _actor - Requesting principal.
   * @param {string} _userId - Account to read.
   * @returns {Promise<import('@/server/models/user').User>} The account, client-safe.
   * @throws {NotImplementedError} Until implemented.
   */
  async getProfile(_actor, _userId) {
    throw new NotImplementedError('UserService.getProfile');
  }

  /**
   * Applies edits to the actor's own profile.
   *
   * @param {import('@/shared/types').Actor} _actor - Requesting principal.
   * @param {Record<string, unknown>} _changes - Validated, whitelisted fields.
   * @returns {Promise<import('@/server/models/user').User>} The updated account.
   * @throws {NotImplementedError} Until implemented.
   */
  async updateProfile(_actor, _changes) {
    throw new NotImplementedError('UserService.updateProfile');
  }

  /**
   * Updates the default drop-off location used at checkout (FR-C7).
   *
   * @param {import('@/shared/types').Actor} _actor - Requesting student.
   * @param {string} _hallName - New hall.
   * @param {string} _roomNo - New room.
   * @returns {Promise<import('@/server/models/student-profile').StudentProfile>} The updated
   *   profile.
   * @throws {NotImplementedError} Until implemented.
   */
  async updateDeliveryLocation(_actor, _hallName, _roomNo) {
    throw new NotImplementedError('UserService.updateDeliveryLocation');
  }

  /**
   * Stores a new profile photo.
   *
   * @param {import('@/shared/types').Actor} _actor - Requesting principal.
   * @param {File | Blob} _file - Uploaded image.
   * @returns {Promise<string>} URL of the stored photo.
   * @throws {NotImplementedError} Until implemented.
   */
  async uploadPhoto(_actor, _file) {
    throw new NotImplementedError('UserService.uploadPhoto');
  }

  /**
   * FR-D1. Blocked while the rider has an active delivery.
   *
   * @param {import('@/shared/types').Actor} _actor - Requesting student.
   * @param {boolean} _enabled - Desired Deliver Mode state.
   * @returns {Promise<boolean>} The state actually stored.
   * @throws {NotImplementedError} Until implemented.
   */
  async toggleDeliverMode(_actor, _enabled) {
    throw new NotImplementedError('UserService.toggleDeliverMode');
  }

  /**
   * Object-level guard: an actor may only touch their own account row.
   *
   * @override
   * @param {import('@/shared/types').Actor} _actor - Requesting principal.
   * @param {import('@/server/models/user').User} _resource - Account being touched.
   * @returns {void} Returns nothing when allowed.
   * @throws {NotImplementedError} Until implemented.
   */
  assertOwnership(_actor, _resource) {
    throw new NotImplementedError('UserService.assertOwnership');
  }
}
