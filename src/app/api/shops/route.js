/**
 * @file HTTP route handlers for `/api/shops`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/shops/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * FR-C1 browse approved open vendors — delegates to ShopController.listShops.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<Record<string, never>> }} _context - Route context; this route has no
 *   dynamic segments.
 * @returns {Promise<Response>} Read-only response body.
 * @throws {NotImplementedError} Always, until `GET /api/shops` is implemented.
 */
export async function GET(_request, _context) {
  throw new NotImplementedError('GET /api/shops');
}

/**
 * HJU-B01 submit a shop for admin approval — delegates to ShopController.registerShop.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<Record<string, never>> }} _context - Route context; this route has no
 *   dynamic segments.
 * @returns {Promise<Response>} Created/accepted response body.
 * @throws {NotImplementedError} Always, until `POST /api/shops` is implemented.
 */
export async function POST(_request, _context) {
  throw new NotImplementedError('POST /api/shops');
}
