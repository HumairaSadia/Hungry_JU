/**
 * @file Access-token authentication gate.
 *
 * @module server/middleware/auth-middleware
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Verifies the access token and attaches the resolved User to the request.
 * Server-side only: hiding a button is UX, this is the actual gate (SRS section 9).
 */
export class AuthMiddleware {
  /** @type {import('@/server/services/auth-service').AuthService} */
  #authService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/services/auth-service').AuthService} dependencies.authService -
   *   Resolves tokens to actors.
   */
  constructor({ authService }) {
    this.#authService = authService;
  }

  /**
   * Throws AuthenticationError when the token is missing, expired, or the account is inactive.
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<import('@/shared/types').Actor>} The authenticated principal.
   * @throws {NotImplementedError} Until implemented.
   */
  async authenticate(_request) {
    throw new NotImplementedError('AuthMiddleware.authenticate');
  }

  /**
   * Resolves the actor when present but never rejects; used by public browse routes.
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<import('@/shared/types').Actor | null>} Actor, or `null` when the
   *   request is anonymous.
   * @throws {NotImplementedError} Until implemented.
   */
  async optionalAuthenticate(_request) {
    throw new NotImplementedError('AuthMiddleware.optionalAuthenticate');
  }

  /**
   * Pulls the bearer token out of the `Authorization` header.
   *
   * @param {Request} _request - Incoming request.
   * @returns {string | null} Raw token, or `null` when the header is absent.
   * @throws {NotImplementedError} Until implemented.
   */
  extractToken(_request) {
    throw new NotImplementedError('AuthMiddleware.extractToken');
  }
}
