/**
 * @file HTTP route handlers for `/api/notifications`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/notifications/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * FR-E4 in-app history — delegates to NotificationController.list.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<Record<string, never>> }} _context - Route context; this route has no
 *   dynamic segments.
 * @returns {Promise<Response>} Read-only response body.
 * @throws {NotImplementedError} Always, until `GET /api/notifications` is implemented.
 */
export async function GET(_request, _context) {
  throw new NotImplementedError('GET /api/notifications');
}
