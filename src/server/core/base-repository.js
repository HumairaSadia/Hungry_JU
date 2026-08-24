/**
 * @file Abstract data-access gateway shared by every repository.
 *
 * @module server/core/base-repository
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Abstract data-access gateway. Subclasses map rows to models and back.
 * Isolated from services so the storage engine can change without touching business rules.
 *
 * @abstract
 */
export class BaseRepository {
  /** @type {unknown} */
  #db;

  /** @type {string} */
  #table;

  /**
   * @param {unknown} db - Database client resolved from the DI container.
   * @param {string} table - Physical table this repository owns.
   * @throws {TypeError} When constructed directly instead of through a subclass.
   */
  constructor(db, table) {
    if (new.target === BaseRepository) {
      throw new TypeError('BaseRepository is abstract');
    }
    this.#db = db;
    this.#table = table;
  }

  /**
   * Database client for subclass queries.
   *
   * @returns {unknown} The injected client.
   */
  get db() {
    return this.#db;
  }

  /**
   * Table this repository reads and writes.
   *
   * @returns {string} Table name.
   */
  get table() {
    return this.#table;
  }

  /**
   * Loads one row by primary key.
   *
   * @abstract
   * @param {string} _id - Primary key.
   * @returns {Promise<import('@/server/core/base-model').BaseModel | null>} Model, or `null`
   *   when absent.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  async findById(_id) {
    throw new NotImplementedError(`${this.constructor.name}.findById`);
  }

  /**
   * Loads the first row matching the criteria.
   *
   * @abstract
   * @param {import('@/shared/types').Criteria} _criteria - Column/value filter.
   * @returns {Promise<import('@/server/core/base-model').BaseModel | null>} Model, or `null`
   *   when nothing matches.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  async findOne(_criteria) {
    throw new NotImplementedError(`${this.constructor.name}.findOne`);
  }

  /**
   * Loads a page of rows matching the criteria.
   *
   * @abstract
   * @param {import('@/shared/types').Criteria} _criteria - Column/value filter.
   * @param {import('@/server/utils/pagination').Pagination} [_pagination] - Page window.
   * @returns {Promise<import('@/server/core/base-model').BaseModel[]>} Models for the page.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  async findMany(_criteria, _pagination) {
    throw new NotImplementedError(`${this.constructor.name}.findMany`);
  }

  /**
   * Counts rows matching the criteria.
   *
   * @abstract
   * @param {import('@/shared/types').Criteria} _criteria - Column/value filter.
   * @returns {Promise<number>} Matching row count.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  async count(_criteria) {
    throw new NotImplementedError(`${this.constructor.name}.count`);
  }

  /**
   * Inserts a new row built from an entity.
   *
   * @abstract
   * @param {import('@/server/core/base-model').BaseModel} _model - Entity to persist.
   * @returns {Promise<import('@/server/core/base-model').BaseModel>} Entity with its id.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  async create(_model) {
    throw new NotImplementedError(`${this.constructor.name}.create`);
  }

  /**
   * Applies a partial update to one row.
   *
   * @abstract
   * @param {string} _id - Primary key.
   * @param {Record<string, unknown>} _changes - Columns to write.
   * @returns {Promise<import('@/server/core/base-model').BaseModel>} Updated entity.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  async update(_id, _changes) {
    throw new NotImplementedError(`${this.constructor.name}.update`);
  }

  /**
   * Removes one row.
   *
   * @abstract
   * @param {string} _id - Primary key.
   * @returns {Promise<boolean>} `true` when a row was removed.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  async delete(_id) {
    throw new NotImplementedError(`${this.constructor.name}.delete`);
  }

  /**
   * Runs a callback in one transaction; multi-table writes (order + order_items) need it.
   *
   * @abstract
   * @param {(tx: unknown) => Promise<unknown>} _callback - Work to run inside the transaction.
   * @returns {Promise<unknown>} Whatever the callback resolved to, once committed.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  async transaction(_callback) {
    throw new NotImplementedError(`${this.constructor.name}.transaction`);
  }

  /**
   * Maps one storage row onto its domain entity.
   *
   * @abstract
   * @param {import('@/shared/types').PersistenceRow} _row - Row as read from storage.
   * @returns {import('@/server/core/base-model').BaseModel} Hydrated entity.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  toModel(_row) {
    throw new NotImplementedError(`${this.constructor.name}.toModel`);
  }
}
