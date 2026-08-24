/**
 * @file HTTP route handlers for `/api/shops/[shopId]/orders`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/shops/[shopId]/orders/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * vendor orders board — delegates to OrderController.listShopOrders.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ shopId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`shopId`).
 * @returns {Promise<Response>} Read-only response body.
 * @throws {NotImplementedError} Always, until `GET /api/shops/[shopId]/orders` is implemented.
 */
export async function GET(_request, _context) {
  throw new NotImplementedError('GET /api/shops/[shopId]/orders');
}
