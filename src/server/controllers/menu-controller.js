/**
 * @file HTTP entry for menu management and search.
 *
 * Controllers stay thin: parse, authorize, delegate to a service, respond.
 * They are the only layer that touches `Request` and `Response`.
 *
 * @module server/controllers/menu-controller
 */

import { BaseController } from '@/server/core/base-controller';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Menu CRUD for vendors and menu reads/search for students.
 *
 * @augments BaseController
 */
export class MenuController extends BaseController {
  /** @type {import('@/server/services/menu-service').MenuService} */
  #menuService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/services/menu-service').MenuService} dependencies.menuService -
   *   Menu business rules.
   */
  constructor({ menuService }) {
    super();
    this.#menuService = menuService;
  }

  /**
   * Lists one shop menu.
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `MenuController.listByShop` is implemented.
   */
  async listByShop(_request, _params) {
    throw new NotImplementedError('MenuController.listByShop');
  }

  /**
   * Searches items across shops (FR-C2, FR-C3).
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `MenuController.search` is implemented.
   */
  async search(_request) {
    throw new NotImplementedError('MenuController.search');
  }

  /**
   * Adds an item to the acting vendor own menu (FR-B2).
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `MenuController.createItem` is implemented.
   */
  async createItem(_request, _params) {
    throw new NotImplementedError('MenuController.createItem');
  }

  /**
   * Edits an existing menu item.
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `MenuController.updateItem` is implemented.
   */
  async updateItem(_request, _params) {
    throw new NotImplementedError('MenuController.updateItem');
  }

  /**
   * Removes an item from the menu.
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `MenuController.deleteItem` is implemented.
   */
  async deleteItem(_request, _params) {
    throw new NotImplementedError('MenuController.deleteItem');
  }

  /**
   * Flips the sold-out toggle (FR-B3).
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `MenuController.setAvailability` is implemented.
   */
  async setAvailability(_request, _params) {
    throw new NotImplementedError('MenuController.setAvailability');
  }
}
