/**
 * @file HTTP route handlers for `/api/orders/[orderId]/track`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/orders/[orderId]/track/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * HJU-E01 status stepper poll — delegates to OrderController.trackOrder.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ orderId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`orderId`).
 * @returns {Promise<Response>} Read-only response body.
 * @throws {NotImplementedError} Always, until `GET /api/orders/[orderId]/track` is implemented.
 */
export async function GET(_request, _context) {
  throw new NotImplementedError('GET /api/orders/[orderId]/track');
}
