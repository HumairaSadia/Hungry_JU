/**
 * @file HTTP route handlers for `/api/users/profile`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/users/profile/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * HJU-A04 read own profile — delegates to UserController.getProfile.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<Record<string, never>> }} _context - Route context; this route has no
 *   dynamic segments.
 * @returns {Promise<Response>} Read-only response body.
 * @throws {NotImplementedError} Always, until `GET /api/users/profile` is implemented.
 */
export async function GET(_request, _context) {
  throw new NotImplementedError('GET /api/users/profile');
}

/**
 * HJU-A04 edit own profile — delegates to UserController.updateProfile.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<Record<string, never>> }} _context - Route context; this route has no
 *   dynamic segments.
 * @returns {Promise<Response>} Updated resource response body.
 * @throws {NotImplementedError} Always, until `PATCH /api/users/profile` is implemented.
 */
export async function PATCH(_request, _context) {
  throw new NotImplementedError('PATCH /api/users/profile');
}
