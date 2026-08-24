/**
 * @file HTTP route handlers for `/api/auth/verify`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/auth/verify/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * FR-A2 activate an account from an email link — delegates to AuthController.verify.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<Record<string, never>> }} _context - Route context; this route has no
 *   dynamic segments.
 * @returns {Promise<Response>} Created/accepted response body.
 * @throws {NotImplementedError} Always, until `POST /api/auth/verify` is implemented.
 */
export async function POST(_request, _context) {
  throw new NotImplementedError('POST /api/auth/verify');
}
