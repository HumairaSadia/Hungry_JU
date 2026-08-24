/**
 * @file HTTP entry for the cart endpoints.
 *
 * Controllers stay thin: parse, authorize, delegate to a service, respond.
 * They are the only layer that touches `Request` and `Response`.
 *
 * @module server/controllers/cart-controller
 */

import { BaseController } from '@/server/core/base-controller';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Cart endpoints. Responses always carry server-computed subtotal, fee, and total.
 *
 * @augments BaseController
 */
export class CartController extends BaseController {
  /** @type {import('@/server/services/cart-service').CartService} */
  #cartService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/services/cart-service').CartService} dependencies.cartService -
   *   Cart business rules.
   */
  constructor({ cartService }) {
    super();
    this.#cartService = cartService;
  }

  /**
   * Returns the acting student cart with fresh totals.
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `CartController.getCart` is implemented.
   */
  async getCart(_request) {
    throw new NotImplementedError('CartController.getCart');
  }

  /**
   * Adds an item, enforcing the single-shop rule (BR-03).
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `CartController.addItem` is implemented.
   */
  async addItem(_request) {
    throw new NotImplementedError('CartController.addItem');
  }

  /**
   * Sets the quantity of one cart line.
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `CartController.updateItem` is implemented.
   */
  async updateItem(_request, _params) {
    throw new NotImplementedError('CartController.updateItem');
  }

  /**
   * Removes one cart line.
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `CartController.removeItem` is implemented.
   */
  async removeItem(_request, _params) {
    throw new NotImplementedError('CartController.removeItem');
  }

  /**
   * Empties the cart and releases its shop lock.
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `CartController.clear` is implemented.
   */
  async clear(_request) {
    throw new NotImplementedError('CartController.clear');
  }
}
