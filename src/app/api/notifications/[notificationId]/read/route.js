/**
 * @file HTTP route handlers for `/api/notifications/[notificationId]/read`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/notifications/[notificationId]/read/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * mark one as read — delegates to NotificationController.markRead.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ notificationId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`notificationId`).
 * @returns {Promise<Response>} Updated resource response body.
 * @throws {NotImplementedError} Always, until `PUT /api/notifications/[notificationId]/read` is implemented.
 */
export async function PUT(_request, _context) {
  throw new NotImplementedError('PUT /api/notifications/[notificationId]/read');
}
