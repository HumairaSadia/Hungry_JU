/**
 * @file Error-to-response translation for route handlers.
 *
 * @module server/middleware/error-middleware
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Converts thrown errors into JSON responses. Known AppErrors keep their status and
 * code; anything else becomes a generic 500 so stack traces never reach a client.
 */
export class ErrorMiddleware {
  /** @type {import('@/server/lib/logger').Logger} */
  #logger;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/lib/logger').Logger} dependencies.logger - Sink for failures.
   */
  constructor({ logger }) {
    this.#logger = logger;
  }

  /**
   * Wraps a route handler: catch, log, and translate.
   *
   * @param {(request: Request, context?: unknown) => Promise<Response>} _handler - Handler to
   *   guard.
   * @returns {(request: Request, context?: unknown) => Promise<Response>} Handler that never
   *   throws.
   * @throws {NotImplementedError} Until implemented.
   */
  wrap(_handler) {
    throw new NotImplementedError('ErrorMiddleware.wrap');
  }

  /**
   * Maps one error onto its wire response.
   *
   * @param {unknown} _error - Thrown value; `AppError` keeps its status, anything else
   *   becomes a 500.
   * @returns {Response} JSON error response.
   * @throws {NotImplementedError} Until implemented.
   */
  toResponse(_error) {
    throw new NotImplementedError('ErrorMiddleware.toResponse');
  }
}
