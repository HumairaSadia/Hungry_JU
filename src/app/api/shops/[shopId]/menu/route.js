/**
 * @file HTTP route handlers for `/api/shops/[shopId]/menu`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/shops/[shopId]/menu/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * HJU-C02 menu with availability — delegates to MenuController.listByShop.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ shopId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`shopId`).
 * @returns {Promise<Response>} Read-only response body.
 * @throws {NotImplementedError} Always, until `GET /api/shops/[shopId]/menu` is implemented.
 */
export async function GET(_request, _context) {
  throw new NotImplementedError('GET /api/shops/[shopId]/menu');
}

/**
 * HJU-B02 add a menu item — delegates to MenuController.createItem.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ shopId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`shopId`).
 * @returns {Promise<Response>} Created/accepted response body.
 * @throws {NotImplementedError} Always, until `POST /api/shops/[shopId]/menu` is implemented.
 */
export async function POST(_request, _context) {
  throw new NotImplementedError('POST /api/shops/[shopId]/menu');
}
