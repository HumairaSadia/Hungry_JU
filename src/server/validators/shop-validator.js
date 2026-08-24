/**
 * @file Zod schemas for the shop payloads and browse query.
 *
 * Validation is server-side and whitelist-based: unknown keys are dropped and any
 * client-side check is treated as UX only (SRS section 9). Schemas live here rather
 * than in the controllers so a client form can reuse one without importing server code.
 *
 * @module server/validators/shop-validator
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/** Shop registration and management payloads (FR-B1, FR-B3). */
export class ShopValidator {
  /**
   * Fields required to submit a shop application.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `ShopValidator.registerShop` is implemented.
   */
  static registerShop() {
    throw new NotImplementedError('ShopValidator.registerShop');
  }

  /**
   * Editable subset of the shop fields.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `ShopValidator.updateShop` is implemented.
   */
  static updateShop() {
    throw new NotImplementedError('ShopValidator.updateShop');
  }

  /**
   * The open/closed switch value.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `ShopValidator.setOpenState` is implemented.
   */
  static setOpenState() {
    throw new NotImplementedError('ShopValidator.setOpenState');
  }

  /**
   * Filters, search term, and paging for the browse index.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `ShopValidator.browseQuery` is implemented.
   */
  static browseQuery() {
    throw new NotImplementedError('ShopValidator.browseQuery');
  }
}
