/**
 * @file HTTP route handlers for `/api/auth/verify/resend`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/auth/verify/resend/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * re-send the verification email — delegates to AuthController.resendVerification.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<Record<string, never>> }} _context - Route context; this route has no
 *   dynamic segments.
 * @returns {Promise<Response>} Created/accepted response body.
 * @throws {NotImplementedError} Always, until `POST /api/auth/verify/resend` is implemented.
 */
export async function POST(_request, _context) {
  throw new NotImplementedError('POST /api/auth/verify/resend');
}
