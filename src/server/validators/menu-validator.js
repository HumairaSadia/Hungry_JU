/**
 * @file Zod schemas for the menu payloads and search query.
 *
 * Validation is server-side and whitelist-based: unknown keys are dropped and any
 * client-side check is treated as UX only (SRS section 9). Schemas live here rather
 * than in the controllers so a client form can reuse one without importing server code.
 *
 * @module server/validators/menu-validator
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/** Menu item payloads and the search/filter query (FR-B2, FR-C2, FR-C3). */
export class MenuValidator {
  /**
   * Fields required to add a menu item.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `MenuValidator.createItem` is implemented.
   */
  static createItem() {
    throw new NotImplementedError('MenuValidator.createItem');
  }

  /**
   * Editable subset of the menu item fields.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `MenuValidator.updateItem` is implemented.
   */
  static updateItem() {
    throw new NotImplementedError('MenuValidator.updateItem');
  }

  /**
   * The sold-out toggle value.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `MenuValidator.setAvailability` is implemented.
   */
  static setAvailability() {
    throw new NotImplementedError('MenuValidator.setAvailability');
  }

  /**
   * Search term, filters, sort, and paging for item search.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `MenuValidator.searchQuery` is implemented.
   */
  static searchQuery() {
    throw new NotImplementedError('MenuValidator.searchQuery');
  }
}
