/**
 * @file HTTP route handlers for `/api/users/location`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/users/location/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * hall and room used as the delivery address — delegates to UserController.updateLocation.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<Record<string, never>> }} _context - Route context; this route has no
 *   dynamic segments.
 * @returns {Promise<Response>} Updated resource response body.
 * @throws {NotImplementedError} Always, until `PUT /api/users/location` is implemented.
 */
export async function PUT(_request, _context) {
  throw new NotImplementedError('PUT /api/users/location');
}
