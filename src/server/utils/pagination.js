/**
 * @file Page-window value object for list queries.
 *
 * @module server/utils/pagination
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Value object for list queries; caps the page size so a client cannot ask for everything.
 */
export class Pagination {
  /** @type {number} */
  #page;

  /** @type {number} */
  #limit;

  /**
   * @param {number} page - 1-based page number.
   * @param {number} limit - Page size, clamped to `PAGINATION.MAX_LIMIT` by `fromQuery`.
   */
  constructor(page, limit) {
    this.#page = page;
    this.#limit = limit;
  }

  /**
   * Reads `page` and `limit` from a query string, applying defaults and the ceiling.
   *
   * @param {URLSearchParams} _searchParams - Query parameters of the request.
   * @returns {Pagination} Clamped page window.
   * @throws {NotImplementedError} Until implemented.
   */
  static fromQuery(_searchParams) {
    throw new NotImplementedError('Pagination.fromQuery');
  }

  /**
   * Requested page number.
   *
   * @returns {number} 1-based page.
   */
  get page() {
    return this.#page;
  }

  /**
   * Page size in effect.
   *
   * @returns {number} Row limit.
   */
  get limit() {
    return this.#limit;
  }

  /**
   * Row offset derived from page and limit, for the SQL `OFFSET` clause.
   *
   * @returns {number} Rows to skip.
   * @throws {NotImplementedError} Until implemented.
   */
  get offset() {
    throw new NotImplementedError('Pagination.offset');
  }

  /**
   * Builds the metadata block returned next to a list payload.
   *
   * @param {number} _totalCount - Total rows matching the query, ignoring the window.
   * @returns {import('@/shared/types').PaginationMeta} Page descriptor.
   * @throws {NotImplementedError} Until implemented.
   */
  toMeta(_totalCount) {
    throw new NotImplementedError('Pagination.toMeta');
  }
}
