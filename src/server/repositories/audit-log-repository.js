/**
 * @file Append-only data access for the `audit_logs` table.
 *
 * @module server/repositories/audit-log-repository
 */

import { BaseRepository } from '@/server/core/base-repository';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Append-only data access for `audit_logs`. No update or delete by design (NFR-13).
 *
 * @augments BaseRepository
 */
export class AuditLogRepository extends BaseRepository {
  /**
   * @param {unknown} db - Database client.
   */
  constructor(db) {
    super(db, 'audit_logs');
  }

  /**
   * Appends one audit row.
   *
   * @param {import('@/server/models/audit-log').AuditLog} _auditLog - Row to append.
   * @returns {Promise<import('@/server/models/audit-log').AuditLog>} Stored row.
   * @throws {NotImplementedError} Until implemented.
   */
  async append(_auditLog) {
    throw new NotImplementedError('AuditLogRepository.append');
  }

  /**
   * Change history of one entity, for the admin trail.
   *
   * @param {string} _entityType - Entity name, e.g. `'order'`.
   * @param {string} _entityId - Entity id.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/server/models/audit-log').AuditLog[]>} Audit rows.
   * @throws {NotImplementedError} Until implemented.
   */
  async findByEntity(_entityType, _entityId, _pagination) {
    throw new NotImplementedError('AuditLogRepository.findByEntity');
  }

  /**
   * Everything one actor did, for accountability reviews.
   *
   * @param {string} _actorUserId - Actor to trace.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/server/models/audit-log').AuditLog[]>} Audit rows.
   * @throws {NotImplementedError} Until implemented.
   */
  async findByActor(_actorUserId, _pagination) {
    throw new NotImplementedError('AuditLogRepository.findByActor');
  }

  /**
   * Not supported: the audit trail is immutable.
   *
   * @override
   * @returns {Promise<never>} Never resolves.
   * @throws {Error} Always.
   */
  async update() {
    throw new Error('audit_logs is append-only');
  }

  /**
   * Not supported: the audit trail is immutable.
   *
   * @override
   * @returns {Promise<never>} Never resolves.
   * @throws {Error} Always.
   */
  async delete() {
    throw new Error('audit_logs is append-only');
  }

  /**
   * Maps an `audit_logs` row onto its entity.
   *
   * @param {import('@/shared/types').PersistenceRow} _row - Row from `audit_logs`.
   * @returns {import('@/server/models/audit-log').AuditLog} Hydrated audit row.
   * @throws {NotImplementedError} Until implemented.
   */
  toModel(_row) {
    throw new NotImplementedError('AuditLogRepository.toModel');
  }
}
