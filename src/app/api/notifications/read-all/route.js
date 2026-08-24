/**
 * @file HTTP route handlers for `/api/notifications/read-all`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/notifications/read-all/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * clear the badge — delegates to NotificationController.markAllRead.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<Record<string, never>> }} _context - Route context; this route has no
 *   dynamic segments.
 * @returns {Promise<Response>} Created/accepted response body.
 * @throws {NotImplementedError} Always, until `POST /api/notifications/read-all` is implemented.
 */
export async function POST(_request, _context) {
  throw new NotImplementedError('POST /api/notifications/read-all');
}
