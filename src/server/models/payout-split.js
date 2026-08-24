/**
 * @file Payout split: one row per payee of a payment (Phase 2).
 *
 * @module server/models/payout-split
 */

import { BaseModel } from '@/server/core/base-model';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Table `payout_splits` (Phase 2). One row per payee instead of three columns.
 * SRS section 12.2: the vendor share comes off the food price and the rider share is the
 * delivery fee — two separate streams, not one percentage of the whole order.
 *
 * @augments BaseModel
 */
export class PayoutSplit extends BaseModel {
  /** @type {string} */
  #paymentId;

  /** @type {string} */
  #payeeType;

  /** @type {number} */
  #amount;

  /** @type {Date | null} */
  #releasedAt;

  /**
   * @param {object} attributes - Column values.
   * @param {string | null} [attributes.id] - Primary key.
   * @param {Date | null} [attributes.createdAt] - Row creation timestamp.
   * @param {string} attributes.paymentId - Payment this split belongs to.
   * @param {string} attributes.payeeType - Who is paid: vendor, rider, or platform.
   * @param {number} attributes.amount - Share for this payee, in poisha.
   * @param {Date | null} attributes.releasedAt - When the share was paid out.
   */
  constructor({ id, createdAt, paymentId, payeeType, amount, releasedAt }) {
    super({ id, createdAt });
    this.#paymentId = paymentId;
    this.#payeeType = payeeType;
    this.#amount = amount;
    this.#releasedAt = releasedAt;
  }

  /**
   * Payment this split belongs to.
   *
   * @returns {string} Payment id.
   */
  get paymentId() {
    return this.#paymentId;
  }

  /**
   * Who is paid.
   *
   * @returns {string} One of `vendor`, `rider`, `platform`.
   */
  get payeeType() {
    return this.#payeeType;
  }

  /**
   * Share for this payee.
   *
   * @returns {number} Amount in poisha.
   */
  get amount() {
    return this.#amount;
  }

  /**
   * When the share was paid out.
   *
   * @returns {Date | null} Timestamp, or `null` while held.
   */
  get releasedAt() {
    return this.#releasedAt;
  }

  /**
   * Stamps the split as paid out.
   *
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  markReleased() {
    throw new NotImplementedError('PayoutSplit.markReleased');
  }
}
