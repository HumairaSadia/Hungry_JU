/**
 * @file HTTP route handlers for `/api/orders/[orderId]/rating`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/orders/[orderId]/rating/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * HJU-C09 rate shop and rider once delivered — delegates to RatingController.rateOrder.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ orderId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`orderId`).
 * @returns {Promise<Response>} Created/accepted response body.
 * @throws {NotImplementedError} Always, until `POST /api/orders/[orderId]/rating` is implemented.
 */
export async function POST(_request, _context) {
  throw new NotImplementedError('POST /api/orders/[orderId]/rating');
}
