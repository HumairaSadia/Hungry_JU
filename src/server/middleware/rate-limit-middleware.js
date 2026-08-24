/**
 * @file Request throttling for the abuse-prone endpoints.
 *
 * @module server/middleware/rate-limit-middleware
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Throttles login, verification resend, order placement, and PIN attempts.
 * Also the practical brute-force guard on the 4-digit delivery PIN.
 */
export class RateLimitMiddleware {
  /** @type {unknown} */
  #store;

  /**
   * @param {unknown} store - Counter store (in-memory for MVP, shared cache later).
   */
  constructor(store) {
    this.#store = store;
  }

  /**
   * Records one hit and reports whether the budget is exhausted.
   *
   * @param {string} _key - Bucket key, normally from {@link RateLimitMiddleware#keyFor}.
   * @param {number} _maxRequests - Hits allowed inside the window.
   * @param {number} _windowSeconds - Window length in seconds.
   * @returns {Promise<void>} Resolves when the hit is within budget.
   * @throws {NotImplementedError} Until implemented.
   */
  limit(_key, _maxRequests, _windowSeconds) {
    throw new NotImplementedError('RateLimitMiddleware.limit');
  }

  /**
   * Per-user when authenticated, per-IP otherwise.
   *
   * @param {Request} _request - Incoming request.
   * @param {string} _scope - Bucket name, e.g. `'login'` or `'order'`.
   * @returns {string} Composite bucket key.
   * @throws {NotImplementedError} Until implemented.
   */
  keyFor(_request, _scope) {
    throw new NotImplementedError('RateLimitMiddleware.keyFor');
  }
}
