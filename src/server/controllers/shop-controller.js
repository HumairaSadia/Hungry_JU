/**
 * @file HTTP entry for shop management and browsing.
 *
 * Controllers stay thin: parse, authorize, delegate to a service, respond.
 * They are the only layer that touches `Request` and `Response`.
 *
 * @module server/controllers/shop-controller
 */

import { BaseController } from '@/server/core/base-controller';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Vendor shop management plus the public browse/search endpoints.
 *
 * @augments BaseController
 */
export class ShopController extends BaseController {
  /** @type {import('@/server/services/shop-service').ShopService} */
  #shopService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/services/shop-service').ShopService} dependencies.shopService -
   *   Shop business rules.
   */
  constructor({ shopService }) {
    super();
    this.#shopService = shopService;
  }

  /**
   * Lists approved, open shops for browsing (FR-C1).
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `ShopController.listShops` is implemented.
   */
  async listShops(_request) {
    throw new NotImplementedError('ShopController.listShops');
  }

  /**
   * Returns one shop with its menu (HJU-C02).
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `ShopController.getShop` is implemented.
   */
  async getShop(_request, _params) {
    throw new NotImplementedError('ShopController.getShop');
  }

  /**
   * Submits a shop application, which lands as Pending (FR-B1).
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `ShopController.registerShop` is implemented.
   */
  async registerShop(_request) {
    throw new NotImplementedError('ShopController.registerShop');
  }

  /**
   * Applies vendor edits to their own shop.
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `ShopController.updateShop` is implemented.
   */
  async updateShop(_request, _params) {
    throw new NotImplementedError('ShopController.updateShop');
  }

  /**
   * Opens or closes the shop for orders (FR-B4).
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `ShopController.setOpenState` is implemented.
   */
  async setOpenState(_request, _params) {
    throw new NotImplementedError('ShopController.setOpenState');
  }

  /**
   * Returns the shop owned by the acting vendor.
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `ShopController.getMyShop` is implemented.
   */
  async getMyShop(_request) {
    throw new NotImplementedError('ShopController.getMyShop');
  }
}
