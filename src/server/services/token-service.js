/**
 * @file JWT issuing, verification, and rotation.
 *
 * @module server/services/token-service
 */

import { BaseService } from '@/server/core/base-service';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Claims carried by an access token.
 *
 * @typedef {object} AccessTokenClaims
 * @property {string} sub - User id.
 * @property {import('@/shared/types').UserRole} role - Role, for the RBAC gate.
 * @property {number} exp - Expiry, seconds since the epoch.
 */

/**
 * A freshly issued access/refresh pair.
 *
 * @typedef {object} TokenPair
 * @property {string} accessToken - Short-lived bearer token.
 * @property {string} refreshToken - Long-lived token, delivered as an httpOnly cookie.
 */

/**
 * JWT issue/verify/rotate. Short-lived access token plus httpOnly refresh token,
 * so logout can invalidate a session without a server-side session store (SRS section 9).
 *
 * @augments BaseService
 */
export class TokenService extends BaseService {
  /**
   * Issues the short-lived bearer token.
   *
   * @param {import('@/server/models/user').User} _user - Authenticated account.
   * @returns {string} Signed access token.
   * @throws {NotImplementedError} Until implemented.
   */
  issueAccessToken(_user) {
    throw new NotImplementedError('TokenService.issueAccessToken');
  }

  /**
   * Issues the refresh token stored in an httpOnly cookie.
   *
   * @param {import('@/server/models/user').User} _user - Authenticated account.
   * @returns {string} Signed refresh token.
   * @throws {NotImplementedError} Until implemented.
   */
  issueRefreshToken(_user) {
    throw new NotImplementedError('TokenService.issueRefreshToken');
  }

  /**
   * Verifies an access token's signature and expiry.
   *
   * @param {string} _token - Raw bearer token.
   * @returns {AccessTokenClaims} Decoded claims.
   * @throws {NotImplementedError} Until implemented.
   */
  verifyAccessToken(_token) {
    throw new NotImplementedError('TokenService.verifyAccessToken');
  }

  /**
   * Verifies a refresh token and checks it has not been revoked.
   *
   * @param {string} _token - Raw refresh token.
   * @returns {AccessTokenClaims} Decoded claims.
   * @throws {NotImplementedError} Until implemented.
   */
  verifyRefreshToken(_token) {
    throw new NotImplementedError('TokenService.verifyRefreshToken');
  }

  /**
   * Rotation on refresh: the old token is revoked as the new pair is issued.
   *
   * @param {string} _refreshToken - Token presented by the client.
   * @returns {Promise<TokenPair>} The replacement pair.
   * @throws {NotImplementedError} Until implemented.
   */
  async rotate(_refreshToken) {
    throw new NotImplementedError('TokenService.rotate');
  }

  /**
   * Invalidates a refresh token at logout.
   *
   * @param {string} _refreshToken - Token to revoke.
   * @returns {Promise<void>} Resolves once revoked.
   * @throws {NotImplementedError} Until implemented.
   */
  async revoke(_refreshToken) {
    throw new NotImplementedError('TokenService.revoke');
  }

  /**
   * Phase 2: signed, single-use, TTL-bound QR payload for delivery confirmation.
   *
   * @param {import('@/server/models/delivery').Delivery} _delivery - Delivery to confirm.
   * @returns {string} Signed QR token.
   * @throws {NotImplementedError} Until implemented.
   */
  issueDeliveryQrToken(_delivery) {
    throw new NotImplementedError('TokenService.issueDeliveryQrToken');
  }
}
