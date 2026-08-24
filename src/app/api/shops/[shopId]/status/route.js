/**
 * @file HTTP route handlers for `/api/shops/[shopId]/status`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/shops/[shopId]/status/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * HJU-B03 one-tap open/close — delegates to ShopController.setOpenState.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ shopId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`shopId`).
 * @returns {Promise<Response>} Updated resource response body.
 * @throws {NotImplementedError} Always, until `PUT /api/shops/[shopId]/status` is implemented.
 */
export async function PUT(_request, _context) {
  throw new NotImplementedError('PUT /api/shops/[shopId]/status');
}
