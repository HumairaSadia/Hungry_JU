/**
 * @file HTTP route handlers for `/api/orders/[orderId]/cancel`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/orders/[orderId]/cancel/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * UC-03 cancel while Placed or Accepted — delegates to OrderController.cancelOrder.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ orderId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`orderId`).
 * @returns {Promise<Response>} Created/accepted response body.
 * @throws {NotImplementedError} Always, until `POST /api/orders/[orderId]/cancel` is implemented.
 */
export async function POST(_request, _context) {
  throw new NotImplementedError('POST /api/orders/[orderId]/cancel');
}
