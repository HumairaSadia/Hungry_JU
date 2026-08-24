/**
 * @file The marker error every skeleton method throws.
 *
 * @module server/core/not-implemented-error
 */

/**
 * Marker error thrown by every skeleton method in this project.
 * Exists so an un-implemented layer fails loudly instead of silently returning undefined.
 *
 * @augments Error
 */
export class NotImplementedError extends Error {
  /**
   * @param {string} methodName - Fully qualified member that is still a stub, e.g.
   *   `'AuthService.login'` or `'POST /api/orders'`.
   */
  constructor(methodName) {
    super(`Not implemented: ${methodName}`);
    this.name = 'NotImplementedError';
  }
}
