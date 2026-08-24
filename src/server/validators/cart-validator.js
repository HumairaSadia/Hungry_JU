/**
 * @file Zod schemas for the cart payloads.
 *
 * Validation is server-side and whitelist-based: unknown keys are dropped and any
 * client-side check is treated as UX only (SRS section 9). Schemas live here rather
 * than in the controllers so a client form can reuse one without importing server code.
 *
 * @module server/validators/cart-validator
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/** Cart payloads. Quantity is bounded so a typo cannot order 9999 plates. */
export class CartValidator {
  /**
   * Item id and quantity for an add-to-cart request.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `CartValidator.addItem` is implemented.
   */
  static addItem() {
    throw new NotImplementedError('CartValidator.addItem');
  }

  /**
   * New quantity for one cart line.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `CartValidator.updateQuantity` is implemented.
   */
  static updateQuantity() {
    throw new NotImplementedError('CartValidator.updateQuantity');
  }
}
