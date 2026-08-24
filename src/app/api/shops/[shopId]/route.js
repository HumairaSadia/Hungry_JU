/**
 * @file HTTP route handlers for `/api/shops/[shopId]`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/shops/[shopId]/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * HJU-C02 shop profile (read-only) — delegates to ShopController.getShop.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ shopId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`shopId`).
 * @returns {Promise<Response>} Read-only response body.
 * @throws {NotImplementedError} Always, until `GET /api/shops/[shopId]` is implemented.
 */
export async function GET(_request, _context) {
  throw new NotImplementedError('GET /api/shops/[shopId]');
}

/**
 * vendor edits own shop — delegates to ShopController.updateShop.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ shopId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`shopId`).
 * @returns {Promise<Response>} Updated resource response body.
 * @throws {NotImplementedError} Always, until `PATCH /api/shops/[shopId]` is implemented.
 */
export async function PATCH(_request, _context) {
  throw new NotImplementedError('PATCH /api/shops/[shopId]');
}
