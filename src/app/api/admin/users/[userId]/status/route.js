/**
 * @file HTTP route handlers for `/api/admin/users/[userId]/status`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/admin/users/[userId]/status/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * HJU-G02 suspend or reactivate — delegates to AdminController.setUserStatus.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ userId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`userId`).
 * @returns {Promise<Response>} Updated resource response body.
 * @throws {NotImplementedError} Always, until `PUT /api/admin/users/[userId]/status` is implemented.
 */
export async function PUT(_request, _context) {
  throw new NotImplementedError('PUT /api/admin/users/[userId]/status');
}
