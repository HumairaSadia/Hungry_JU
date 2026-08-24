/**
 * @file HTTP entry for profile and mode endpoints.
 *
 * Controllers stay thin: parse, authorize, delegate to a service, respond.
 * They are the only layer that touches `Request` and `Response`.
 *
 * @module server/controllers/user-controller
 */

import { BaseController } from '@/server/core/base-controller';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Profile, delivery location, and the Order/Deliver mode toggle.
 *
 * @augments BaseController
 */
export class UserController extends BaseController {
  /** @type {import('@/server/services/user-service').UserService} */
  #userService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/services/user-service').UserService} dependencies.userService -
   *   Profile business rules.
   */
  constructor({ userService }) {
    super();
    this.#userService = userService;
  }

  /**
   * Reads the acting user profile.
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `UserController.getProfile` is implemented.
   */
  async getProfile(_request) {
    throw new NotImplementedError('UserController.getProfile');
  }

  /**
   * Applies edits to the acting user profile.
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `UserController.updateProfile` is implemented.
   */
  async updateProfile(_request) {
    throw new NotImplementedError('UserController.updateProfile');
  }

  /**
   * Updates the hall/room delivery location (FR-C7).
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `UserController.updateLocation` is implemented.
   */
  async updateLocation(_request) {
    throw new NotImplementedError('UserController.updateLocation');
  }

  /**
   * Stores a new profile photo.
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `UserController.uploadPhoto` is implemented.
   */
  async uploadPhoto(_request) {
    throw new NotImplementedError('UserController.uploadPhoto');
  }

  /**
   * Switches Deliver Mode on or off (FR-D1).
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `UserController.toggleDeliverMode` is implemented.
   */
  async toggleDeliverMode(_request) {
    throw new NotImplementedError('UserController.toggleDeliverMode');
  }
}
