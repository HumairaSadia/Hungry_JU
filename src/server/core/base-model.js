/**
 * @file Abstract root of the domain entities.
 *
 * @module server/core/base-model
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Abstract root of every domain entity.
 * Entities own their own invariants; services orchestrate them and never reach inside.
 *
 * @abstract
 */
export class BaseModel {
  /** @type {string | null} */
  #id;

  /** @type {Date | null} */
  #createdAt;

  /**
   * @param {object} [attributes] - Identity attributes shared by every entity.
   * @param {string | null} [attributes.id] - Primary key, `null` before the first insert.
   * @param {Date | null} [attributes.createdAt] - Row creation timestamp.
   * @throws {TypeError} When constructed directly instead of through a subclass.
   */
  constructor({ id = null, createdAt = null } = {}) {
    if (new.target === BaseModel) {
      throw new TypeError('BaseModel is abstract');
    }
    this.#id = id;
    this.#createdAt = createdAt;
  }

  /**
   * Primary key.
   *
   * @returns {string | null} Id, or `null` when not yet persisted.
   */
  get id() {
    return this.#id;
  }

  /**
   * Row creation timestamp.
   *
   * @returns {Date | null} Timestamp, or `null` when not yet persisted.
   */
  get createdAt() {
    return this.#createdAt;
  }

  /**
   * Whether this entity has a database identity.
   *
   * @returns {boolean} `true` once an id has been assigned.
   */
  get isPersisted() {
    return this.#id !== null;
  }

  /**
   * Check own invariants; throws ValidationError when broken.
   *
   * @abstract
   * @returns {void}
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  validate() {
    throw new NotImplementedError(`${this.constructor.name}.validate`);
  }

  /**
   * Row shape matching the snake_case schema of SRS section 7.
   *
   * @abstract
   * @returns {import('@/shared/types').PersistenceRow} Row ready for the repository.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  toPersistence() {
    throw new NotImplementedError(`${this.constructor.name}.toPersistence`);
  }

  /**
   * Client-safe shape. Never leaks password hashes, PINs, or internal flags.
   *
   * @abstract
   * @returns {Record<string, unknown>} Serialisable projection of the entity.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  toJSON() {
    throw new NotImplementedError(`${this.constructor.name}.toJSON`);
  }

  /**
   * Rebuilds an entity from a database row.
   *
   * @abstract
   * @param {import('@/shared/types').PersistenceRow} _row - Row as read from storage.
   * @returns {BaseModel} Hydrated entity.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  static fromPersistence(_row) {
    throw new NotImplementedError(`${this.name}.fromPersistence`);
  }
}
