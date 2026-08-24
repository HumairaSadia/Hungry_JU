/**
 * @file HTTP entry for the authentication endpoints.
 *
 * Controllers stay thin: parse, authorize, delegate to a service, respond.
 * They are the only layer that touches `Request` and `Response`.
 *
 * @module server/controllers/auth-controller
 */

import { BaseController } from '@/server/core/base-controller';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * HTTP entry for Epic A. Route handlers under src/app/api/auth delegate straight here.
 *
 * @augments BaseController
 */
export class AuthController extends BaseController {
  /** @type {import('@/server/services/auth-service').AuthService} */
  #authService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/services/auth-service').AuthService} dependencies.authService -
   *   Epic A business rules.
   */
  constructor({ authService }) {
    super();
    this.#authService = authService;
  }

  /**
   * Registers an account and mails the verification link (FR-A1).
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `AuthController.register` is implemented.
   */
  async register(_request) {
    throw new NotImplementedError('AuthController.register');
  }

  /**
   * Consumes a verification token and activates the account (FR-A3).
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `AuthController.verify` is implemented.
   */
  async verify(_request) {
    throw new NotImplementedError('AuthController.verify');
  }

  /**
   * Re-sends the verification link, subject to the hourly cap.
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `AuthController.resendVerification` is implemented.
   */
  async resendVerification(_request) {
    throw new NotImplementedError('AuthController.resendVerification');
  }

  /**
   * Sets the refresh token as an httpOnly cookie; the access token goes in the body.
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `AuthController.login` is implemented.
   */
  async login(_request) {
    throw new NotImplementedError('AuthController.login');
  }

  /**
   * Revokes the refresh token and clears its cookie.
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `AuthController.logout` is implemented.
   */
  async logout(_request) {
    throw new NotImplementedError('AuthController.logout');
  }

  /**
   * Exchanges the refresh cookie for a fresh token pair.
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `AuthController.refresh` is implemented.
   */
  async refresh(_request) {
    throw new NotImplementedError('AuthController.refresh');
  }

  /**
   * Starts the password-reset flow (FR-A5).
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `AuthController.forgotPassword` is implemented.
   */
  async forgotPassword(_request) {
    throw new NotImplementedError('AuthController.forgotPassword');
  }

  /**
   * Completes a reset with a single-use token.
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `AuthController.resetPassword` is implemented.
   */
  async resetPassword(_request) {
    throw new NotImplementedError('AuthController.resetPassword');
  }

  /**
   * Returns the authenticated account for client-side bootstrapping.
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `AuthController.me` is implemented.
   */
  async me(_request) {
    throw new NotImplementedError('AuthController.me');
  }
}
