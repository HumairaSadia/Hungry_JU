/**
 * @file Zod schemas for the checkout and order payloads.
 *
 * Validation is server-side and whitelist-based: unknown keys are dropped and any
 * client-side check is treated as UX only (SRS section 9). Schemas live here rather
 * than in the controllers so a client form can reuse one without importing server code.
 *
 * @module server/validators/order-validator
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Checkout and order payloads. Prices and totals are never accepted from the client;
 * only item ids, quantities, and the delivery location are.
 */
export class OrderValidator {
  /**
   * Delivery location, note, and payment method for checkout.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `OrderValidator.placeOrder` is implemented.
   */
  static placeOrder() {
    throw new NotImplementedError('OrderValidator.placeOrder');
  }

  /**
   * Optional cancellation reason.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `OrderValidator.cancelOrder` is implemented.
   */
  static cancelOrder() {
    throw new NotImplementedError('OrderValidator.cancelOrder');
  }

  /**
   * Vendor rejection reason shown to the student.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `OrderValidator.rejectOrder` is implemented.
   */
  static rejectOrder() {
    throw new NotImplementedError('OrderValidator.rejectOrder');
  }

  /**
   * Target status for a vendor-side transition.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `OrderValidator.statusTransition` is implemented.
   */
  static statusTransition() {
    throw new NotImplementedError('OrderValidator.statusTransition');
  }

  /**
   * Status and date filters plus paging for order history.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `OrderValidator.historyQuery` is implemented.
   */
  static historyQuery() {
    throw new NotImplementedError('OrderValidator.historyQuery');
  }
}
