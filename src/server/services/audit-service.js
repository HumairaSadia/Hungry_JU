/**
 * @file The single writer for the audit trail.
 *
 * @module server/services/audit-service
 */

import { BaseService } from '@/server/core/base-service';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Single writer for audit_logs. Every service depends on this instead of logging
 * inline, so BR-09 / NFR-13 is satisfied once rather than in every story.
 *
 * @augments BaseService
 */
export class AuditService extends BaseService {
  /** @type {import('@/server/repositories/audit-log-repository').AuditLogRepository} */
  #auditLogRepository;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/repositories/audit-log-repository').AuditLogRepository}
   *   dependencies.auditLogRepository - Append-only audit storage.
   */
  constructor({ auditLogRepository }) {
    super();
    this.#auditLogRepository = auditLogRepository;
  }

  /**
   * Records a state transition on any entity.
   *
   * @param {import('@/shared/types').Actor} _actor - Who drove the change.
   * @param {string} _entityType - Entity name, e.g. `'order'`.
   * @param {string} _entityId - Affected row.
   * @param {string} _from - State left behind.
   * @param {string} _to - State entered.
   * @returns {Promise<void>} Resolves once appended.
   * @throws {NotImplementedError} Until implemented.
   */
  async recordStatusChange(_actor, _entityType, _entityId, _from, _to) {
    throw new NotImplementedError('AuditService.recordStatusChange');
  }

  /**
   * Records a non-transition action, e.g. a profile edit or a config change.
   *
   * @param {import('@/shared/types').Actor} _actor - Who acted.
   * @param {string} _entityType - Entity name.
   * @param {string} _entityId - Affected row.
   * @param {string} _action - Value from `AUDIT_ACTION`.
   * @param {Record<string, unknown>} [_details] - Before/after detail.
   * @returns {Promise<void>} Resolves once appended.
   * @throws {NotImplementedError} Until implemented.
   */
  async recordAction(_actor, _entityType, _entityId, _action, _details) {
    throw new NotImplementedError('AuditService.recordAction');
  }

  /**
   * Records a login, logout, or credential change.
   *
   * @param {import('@/shared/types').Actor} _actor - Account involved.
   * @param {string} _action - Value from `AUDIT_ACTION`.
   * @param {import('@/shared/types').LogMeta} [_metadata] - IP, user agent, and similar;
   *   secrets are redacted before storage.
   * @returns {Promise<void>} Resolves once appended.
   * @throws {NotImplementedError} Until implemented.
   */
  async recordAuthEvent(_actor, _action, _metadata) {
    throw new NotImplementedError('AuditService.recordAuthEvent');
  }
}
