/**
 * @file Post-delivery ratings and their moderation.
 *
 * @module server/services/rating-service
 */

import { BaseService } from '@/server/core/base-service';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Ratings for shop and rider after delivery (HJU-C09, BR-08), plus admin moderation.
 *
 * @augments BaseService
 */
export class RatingService extends BaseService {
  /** @type {import('@/server/repositories/rating-repository').RatingRepository} */
  #ratingRepository;

  /** @type {import('@/server/repositories/order-repository').OrderRepository} */
  #orderRepository;

  /** @type {import('@/server/repositories/shop-repository').ShopRepository} */
  #shopRepository;

  /** @type {import('@/server/repositories/student-profile-repository').StudentProfileRepository} */
  #studentProfileRepository;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/repositories/rating-repository').RatingRepository}
   *   dependencies.ratingRepository - Rating storage.
   * @param {import('@/server/repositories/order-repository').OrderRepository}
   *   dependencies.orderRepository - Eligibility check (BR-08).
   * @param {import('@/server/repositories/shop-repository').ShopRepository}
   *   dependencies.shopRepository - Refreshes the shop rating average.
   * @param {import('@/server/repositories/student-profile-repository').StudentProfileRepository}
   *   dependencies.studentProfileRepository - Refreshes the rider rating average.
   */
  constructor({ ratingRepository, orderRepository, shopRepository, studentProfileRepository }) {
    super();
    this.#ratingRepository = ratingRepository;
    this.#orderRepository = orderRepository;
    this.#shopRepository = shopRepository;
    this.#studentProfileRepository = studentProfileRepository;
  }

  /**
   * BR-08: Delivered orders only, once per target, by the ordering student.
   *
   * @param {import('@/shared/types').Actor} _actor - Rating student.
   * @param {string} _orderId - Order being rated.
   * @param {{ shop?: { stars: number, comment?: string },
   *   rider?: { stars: number, comment?: string } }} _ratings - Scores per target.
   * @returns {Promise<import('@/server/models/rating').Rating[]>} The stored ratings.
   * @throws {NotImplementedError} Until implemented.
   */
  async rateOrder(_actor, _orderId, _ratings) {
    throw new NotImplementedError('RatingService.rateOrder');
  }

  /**
   * Public reviews shown on a shop page.
   *
   * @param {string} _shopId - Shop to list.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/shared/types').PaginatedResult>} Ratings plus page metadata.
   * @throws {NotImplementedError} Until implemented.
   */
  async listForShop(_shopId, _pagination) {
    throw new NotImplementedError('RatingService.listForShop');
  }

  /**
   * Could-have (HJU-B07): vendor replies to a review.
   *
   * @param {import('@/shared/types').Actor} _actor - Replying vendor.
   * @param {string} _ratingId - Rating being answered.
   * @param {string} _reply - Reply text.
   * @returns {Promise<import('@/server/models/rating').Rating>} The rating with its reply.
   * @throws {NotImplementedError} Until implemented.
   */
  async replyToRating(_actor, _ratingId, _reply) {
    throw new NotImplementedError('RatingService.replyToRating');
  }

  /**
   * Admin moderation of an abusive or fake review.
   *
   * @param {import('@/shared/types').Actor} _admin - Acting admin.
   * @param {string} _ratingId - Rating to moderate.
   * @param {'hide' | 'delete' | 'restore'} _action - What to do with it.
   * @returns {Promise<void>} Resolves once applied.
   * @throws {NotImplementedError} Until implemented.
   */
  async moderate(_admin, _ratingId, _action) {
    throw new NotImplementedError('RatingService.moderate');
  }
}
