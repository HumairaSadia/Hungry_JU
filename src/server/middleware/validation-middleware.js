/**
 * @file Server-side whitelist validation.
 *
 * @module server/middleware/validation-middleware
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Whitelist validation on the server for every field. Client-side checks are UX only
 * and are assumed hostile (SRS section 9).
 */
export class ValidationMiddleware {
  /**
   * Parses and validates the JSON body.
   *
   * @param {Request} _request - Incoming request.
   * @param {import('@/shared/types').Schema} _schema - Zod schema for the body.
   * @returns {Promise<Record<string, unknown>>} Whitelisted body; unknown keys are dropped.
   * @throws {NotImplementedError} Until implemented.
   */
  async validateBody(_request, _schema) {
    throw new NotImplementedError('ValidationMiddleware.validateBody');
  }

  /**
   * Validates the query string.
   *
   * @param {Request} _request - Incoming request.
   * @param {import('@/shared/types').Schema} _schema - Zod schema for the query.
   * @returns {Record<string, unknown>} Whitelisted query parameters.
   * @throws {NotImplementedError} Until implemented.
   */
  validateQuery(_request, _schema) {
    throw new NotImplementedError('ValidationMiddleware.validateQuery');
  }

  /**
   * Validates dynamic route segments.
   *
   * @param {Record<string, string>} _params - Resolved route parameters.
   * @param {import('@/shared/types').Schema} _schema - Zod schema for the parameters.
   * @returns {Record<string, unknown>} Whitelisted parameters.
   * @throws {NotImplementedError} Until implemented.
   */
  validateParams(_params, _schema) {
    throw new NotImplementedError('ValidationMiddleware.validateParams');
  }

  /**
   * Flattens a Zod issue list into the details of one ValidationError.
   *
   * @param {unknown[]} _issues - Raw Zod issues.
   * @returns {import('@/shared/types').ValidationIssue[]} Field-level issues for the client.
   * @throws {NotImplementedError} Until implemented.
   */
  formatIssues(_issues) {
    throw new NotImplementedError('ValidationMiddleware.formatIssues');
  }
}
