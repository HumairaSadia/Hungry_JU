/**
 * @file Payment record; escrow fields are Phase 2.
 *
 * @module server/models/payment
 */

import { BaseModel } from '@/server/core/base-model';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Table `payments`. Phase 2 escrow; present in the MVP schema only as a COD record
 * so adding the gateway later needs no migration (SRS section 10).
 *
 * @augments BaseModel
 */
export class Payment extends BaseModel {
  /** @type {string} */
  #orderId;

  /** @type {string} */
  #method;

  /** @type {string | null} */
  #gatewayTxnId;

  /** @type {number} */
  #amount;

  /** @type {string} */
  #escrowStatus;

  /**
   * @param {object} attributes - Column values.
   * @param {string | null} [attributes.id] - Primary key.
   * @param {Date | null} [attributes.createdAt] - Row creation timestamp.
   * @param {string} attributes.orderId - Order being paid for.
   * @param {string} attributes.method - Payment method; `'cod'` in the MVP.
   * @param {string | null} attributes.gatewayTxnId - Gateway reference (Phase 2).
   * @param {number} attributes.amount - Amount captured, in poisha.
   * @param {string} attributes.escrowStatus - Escrow state (Phase 2).
   */
  constructor({ id, createdAt, orderId, method, gatewayTxnId, amount, escrowStatus }) {
    super({ id, createdAt });
    this.#orderId = orderId;
    this.#method = method;
    this.#gatewayTxnId = gatewayTxnId;
    this.#amount = amount;
    this.#escrowStatus = escrowStatus;
  }

  /**
   * Order being paid for.
   *
   * @returns {string} Order id.
   */
  get orderId() {
    return this.#orderId;
  }

  /**
   * Payment method.
   *
   * @returns {string} Method code.
   */
  get method() {
    return this.#method;
  }

  /**
   * Gateway reference.
   *
   * @returns {string | null} Transaction id, or `null` for COD.
   */
  get gatewayTxnId() {
    return this.#gatewayTxnId;
  }

  /**
   * Amount captured.
   *
   * @returns {number} Amount in poisha.
   */
  get amount() {
    return this.#amount;
  }

  /**
   * Escrow state.
   *
   * @returns {string} One of `held`, `released`, `refunded`.
   */
  get escrowStatus() {
    return this.#escrowStatus;
  }

  /**
   * BR-12 (Phase 2): funds release only after the customer confirms delivery.
   *
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  release() {
    throw new NotImplementedError('Payment.release');
  }

  /**
   * Returns the money to the customer after a cancellation or dispute (Phase 2).
   *
   * @param {string} _reason - Why the refund was issued; recorded in the audit log.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  refund(_reason) {
    throw new NotImplementedError('Payment.refund');
  }
}
