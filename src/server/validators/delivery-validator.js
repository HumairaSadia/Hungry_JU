/**
 * @file Zod schemas for the delivery payloads.
 *
 * Validation is server-side and whitelist-based: unknown keys are dropped and any
 * client-side check is treated as UX only (SRS section 9). Schemas live here rather
 * than in the controllers so a client form can reuse one without importing server code.
 *
 * @module server/validators/delivery-validator
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/** Delivery payloads, including the confirmation PIN entered by the rider. */
export class DeliveryValidator {
  /**
   * Order id carried in the claim request body.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `DeliveryValidator.acceptOrder` is implemented.
   */
  static acceptOrder() {
    throw new NotImplementedError('DeliveryValidator.acceptOrder');
  }

  /**
   * Target delivery status for a progress update.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `DeliveryValidator.advanceStatus` is implemented.
   */
  static advanceStatus() {
    throw new NotImplementedError('DeliveryValidator.advanceStatus');
  }

  /**
   * The confirmation PIN entered by the rider (BR-10).
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `DeliveryValidator.completeWithPin` is implemented.
   */
  static completeWithPin() {
    throw new NotImplementedError('DeliveryValidator.completeWithPin');
  }

  /**
   * Reason a rider is dropping the delivery (HJU-D06).
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `DeliveryValidator.release` is implemented.
   */
  static release() {
    throw new NotImplementedError('DeliveryValidator.release');
  }
}
