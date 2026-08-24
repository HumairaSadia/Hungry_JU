/**
 * @file HTTP route handlers for `/api/orders/[orderId]/status`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/orders/[orderId]/status/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * vendor moves Preparing then Ready — delegates to OrderController.advanceStatus.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ orderId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`orderId`).
 * @returns {Promise<Response>} Updated resource response body.
 * @throws {NotImplementedError} Always, until `PUT /api/orders/[orderId]/status` is implemented.
 */
export async function PUT(_request, _context) {
  throw new NotImplementedError('PUT /api/orders/[orderId]/status');
}
