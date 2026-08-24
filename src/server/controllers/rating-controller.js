/**
 * @file HTTP entry for the rating endpoints.
 *
 * Controllers stay thin: parse, authorize, delegate to a service, respond.
 * They are the only layer that touches `Request` and `Response`.
 *
 * @module server/controllers/rating-controller
 */

import { BaseController } from '@/server/core/base-controller';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Post-delivery ratings for shop and rider.
 *
 * @augments BaseController
 */
export class RatingController extends BaseController {
  /** @type {import('@/server/services/rating-service').RatingService} */
  #ratingService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/services/rating-service').RatingService} dependencies.ratingService -
   *   Rating rules (BR-08).
   */
  constructor({ ratingService }) {
    super();
    this.#ratingService = ratingService;
  }

  /**
   * Records shop and rider ratings for a delivered order (BR-08).
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `RatingController.rateOrder` is implemented.
   */
  async rateOrder(_request, _params) {
    throw new NotImplementedError('RatingController.rateOrder');
  }

  /**
   * Lists the reviews shown on a shop page.
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `RatingController.listForShop` is implemented.
   */
  async listForShop(_request, _params) {
    throw new NotImplementedError('RatingController.listForShop');
  }

  /**
   * Posts a vendor reply to a review (HJU-B07).
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `RatingController.reply` is implemented.
   */
  async reply(_request, _params) {
    throw new NotImplementedError('RatingController.reply');
  }
}
