/**
 * @file Rating entity: one shop and one rider score per delivered order.
 *
 * @module server/models/rating
 */

import { BaseModel } from '@/server/core/base-model';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Table `ratings`. UNIQUE(order_id, target_type) enforces BR-08:
 * one shop rating and one rider rating per delivered order.
 *
 * @augments BaseModel
 */
export class Rating extends BaseModel {
  /** @type {string} */
  #orderId;

  /** @type {string} */
  #raterUserId;

  /** @type {string} */
  #targetType;

  /** @type {string} */
  #targetId;

  /** @type {number} */
  #stars;

  /** @type {string | undefined} */
  #comment;

  /**
   * @param {object} attributes - Column values.
   * @param {string | null} [attributes.id] - Primary key.
   * @param {Date | null} [attributes.createdAt] - Row creation timestamp.
   * @param {string} attributes.orderId - Order being rated.
   * @param {string} attributes.raterUserId - Student leaving the rating.
   * @param {string} attributes.targetType - `'shop'` or `'rider'`.
   * @param {string} attributes.targetId - Shop id or rider user id.
   * @param {number} attributes.stars - Score from 1 to 5.
   * @param {string} [attributes.comment] - Optional free-text feedback.
   */
  constructor({ id, createdAt, orderId, raterUserId, targetType, targetId, stars, comment }) {
    super({ id, createdAt });
    this.#orderId = orderId;
    this.#raterUserId = raterUserId;
    this.#targetType = targetType;
    this.#targetId = targetId;
    this.#stars = stars;
    this.#comment = comment;
  }

  /**
   * Order being rated.
   *
   * @returns {string} Order id.
   */
  get orderId() {
    return this.#orderId;
  }

  /**
   * Student leaving the rating.
   *
   * @returns {string} Rater user id.
   */
  get raterUserId() {
    return this.#raterUserId;
  }

  /**
   * What is being rated.
   *
   * @returns {string} `'shop'` or `'rider'`.
   */
  get targetType() {
    return this.#targetType;
  }

  /**
   * Identity of the rated party.
   *
   * @returns {string} Shop id or rider user id.
   */
  get targetId() {
    return this.#targetId;
  }

  /**
   * Score given.
   *
   * @returns {number} Stars, 1 to 5.
   */
  get stars() {
    return this.#stars;
  }

  /**
   * Optional free-text feedback.
   *
   * @returns {string | undefined} Comment, when given.
   */
  get comment() {
    return this.#comment;
  }

  /**
   * BR-08: only the customer of a Delivered order may rate it.
   *
   * @param {import('@/server/models/order').Order} _order - Order being rated.
   * @param {string} _raterUserId - Actor attempting to rate.
   * @returns {void} Returns nothing when the rating is allowed.
   * @throws {NotImplementedError} Until implemented.
   */
  static assertEligible(_order, _raterUserId) {
    throw new NotImplementedError('Rating.assertEligible');
  }
}
