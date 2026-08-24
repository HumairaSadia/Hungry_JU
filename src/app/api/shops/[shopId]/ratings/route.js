/**
 * @file HTTP route handlers for `/api/shops/[shopId]/ratings`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/shops/[shopId]/ratings/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * reviews shown on the shop page — delegates to RatingController.listForShop.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ shopId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`shopId`).
 * @returns {Promise<Response>} Read-only response body.
 * @throws {NotImplementedError} Always, until `GET /api/shops/[shopId]/ratings` is implemented.
 */
export async function GET(_request, _context) {
  throw new NotImplementedError('GET /api/shops/[shopId]/ratings');
}
