/**
 * @file Integer-poisha money value object.
 *
 * @module server/utils/money
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * BDT amounts as integer poisha. Floats are banned in order totals: 0.1 + 0.2 problems
 * in a financial record are not worth the convenience.
 */
export class Money {
  /** @type {number} */
  #poisha;

  /**
   * @param {number} poisha - Amount in poisha (1 BDT = 100 poisha); must be an integer.
   */
  constructor(poisha) {
    this.#poisha = poisha;
  }

  /**
   * Builds an amount from taka, rounding to the nearest poisha.
   *
   * @param {number} _taka - Amount in taka.
   * @returns {Money} Equivalent amount.
   * @throws {NotImplementedError} Until implemented.
   */
  static fromTaka(_taka) {
    throw new NotImplementedError('Money.fromTaka');
  }

  /**
   * Raw amount, the only value ever persisted.
   *
   * @returns {number} Amount in poisha.
   */
  get poisha() {
    return this.#poisha;
  }

  /**
   * Adds another amount, returning a new value object.
   *
   * @param {Money} _other - Amount to add.
   * @returns {Money} Sum.
   * @throws {NotImplementedError} Until implemented.
   */
  add(_other) {
    throw new NotImplementedError('Money.add');
  }

  /**
   * Scales the amount by a line quantity.
   *
   * @param {number} _quantity - Integer multiplier.
   * @returns {Money} Product.
   * @throws {NotImplementedError} Until implemented.
   */
  multiply(_quantity) {
    throw new NotImplementedError('Money.multiply');
  }

  /**
   * Converts to taka for display only; never for storage or arithmetic.
   *
   * @returns {number} Amount in taka.
   * @throws {NotImplementedError} Until implemented.
   */
  toTaka() {
    throw new NotImplementedError('Money.toTaka');
  }

  /**
   * Formats the amount for a locale, e.g. `৳120.00`.
   *
   * @param {string} [_locale] - BCP 47 locale tag; defaults to the app locale.
   * @returns {string} Human-readable amount.
   * @throws {NotImplementedError} Until implemented.
   */
  format(_locale) {
    throw new NotImplementedError('Money.format');
  }
}
