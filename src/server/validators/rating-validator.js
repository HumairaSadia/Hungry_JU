/**
 * @file Zod schemas for the rating payloads.
 *
 * Validation is server-side and whitelist-based: unknown keys are dropped and any
 * client-side check is treated as UX only (SRS section 9). Schemas live here rather
 * than in the controllers so a client form can reuse one without importing server code.
 *
 * @module server/validators/rating-validator
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/** Rating payloads: 1-5 stars, optional comment, escaped before it is ever rendered. */
export class RatingValidator {
  /**
   * Star scores and optional comments for shop and rider.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `RatingValidator.rateOrder` is implemented.
   */
  static rateOrder() {
    throw new NotImplementedError('RatingValidator.rateOrder');
  }

  /**
   * Vendor reply text for one review.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `RatingValidator.reply` is implemented.
   */
  static reply() {
    throw new NotImplementedError('RatingValidator.reply');
  }
}
