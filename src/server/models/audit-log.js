/**
 * @file Audit-log entity: who changed what, from what, to what.
 *
 * @module server/models/audit-log
 */

import { BaseModel } from '@/server/core/base-model';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Table `audit_logs`. Implements BR-09 / NFR-13 in one place instead of repeating
 * "all actions are logged" in every story: actor, entity, old value, new value.
 *
 * @augments BaseModel
 */
export class AuditLog extends BaseModel {
  /** @type {string} */
  #actorUserId;

  /** @type {string} */
  #entityType;

  /** @type {string} */
  #entityId;

  /** @type {string} */
  #action;

  /** @type {unknown} */
  #oldValue;

  /** @type {unknown} */
  #newValue;

  /**
   * @param {object} attributes - Column values.
   * @param {string | null} [attributes.id] - Primary key.
   * @param {Date | null} [attributes.createdAt] - Row creation timestamp.
   * @param {string} attributes.actorUserId - Who performed the action.
   * @param {string} attributes.entityType - Entity name, e.g. `'order'`.
   * @param {string} attributes.entityId - Affected row.
   * @param {string} attributes.action - Value from `AUDIT_ACTION`.
   * @param {unknown} attributes.oldValue - State before the change.
   * @param {unknown} attributes.newValue - State after the change.
   */
  constructor({ id, createdAt, actorUserId, entityType, entityId, action, oldValue, newValue }) {
    super({ id, createdAt });
    this.#actorUserId = actorUserId;
    this.#entityType = entityType;
    this.#entityId = entityId;
    this.#action = action;
    this.#oldValue = oldValue;
    this.#newValue = newValue;
  }

  /**
   * Who performed the action.
   *
   * @returns {string} Actor user id.
   */
  get actorUserId() {
    return this.#actorUserId;
  }

  /**
   * Entity name.
   *
   * @returns {string} Type label.
   */
  get entityType() {
    return this.#entityType;
  }

  /**
   * Affected row.
   *
   * @returns {string} Entity id.
   */
  get entityId() {
    return this.#entityId;
  }

  /**
   * What kind of change was made.
   *
   * @returns {string} Value from `AUDIT_ACTION`.
   */
  get action() {
    return this.#action;
  }

  /**
   * State before the change.
   *
   * @returns {unknown} Old value.
   */
  get oldValue() {
    return this.#oldValue;
  }

  /**
   * State after the change.
   *
   * @returns {unknown} New value.
   */
  get newValue() {
    return this.#newValue;
  }

  /**
   * Builds the audit row for a status transition.
   *
   * @param {import('@/shared/types').Actor} _actor - Who drove the transition.
   * @param {import('@/server/core/base-model').BaseModel} _entity - Entity that moved.
   * @param {string} _from - State left behind.
   * @param {string} _to - State entered.
   * @returns {AuditLog} Unsaved audit row.
   * @throws {NotImplementedError} Until implemented.
   */
  static forStatusChange(_actor, _entity, _from, _to) {
    throw new NotImplementedError('AuditLog.forStatusChange');
  }
}
