/**
 * @file Admin account: the platform operator.
 *
 * @module server/models/admin
 */

import { User } from '@/server/models/user';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Platform operator: vendor approvals, suspensions, dispute resolution (Epic G).
 *
 * @augments User
 */
export class Admin extends User {
  /**
   * Role discriminator.
   *
   * @returns {import('@/shared/types').UserRole} Always `'admin'`.
   * @throws {NotImplementedError} Until implemented.
   */
  get role() {
    throw new NotImplementedError('Admin.role');
  }

  /**
   * Admin bypasses ownership checks but every action still lands in audit_logs (BR-09).
   *
   * @param {import('@/server/core/base-model').BaseModel} _resource - Entity being acted on.
   * @returns {boolean} `true` when the admin may moderate it.
   * @throws {NotImplementedError} Until implemented.
   */
  canModerate(_resource) {
    throw new NotImplementedError('Admin.canModerate');
  }
}
