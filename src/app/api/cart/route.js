/**
 * @file HTTP route handlers for `/api/cart`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/cart/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * HJU-C05 read the single-vendor cart — delegates to CartController.getCart.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<Record<string, never>> }} _context - Route context; this route has no
 *   dynamic segments.
 * @returns {Promise<Response>} Read-only response body.
 * @throws {NotImplementedError} Always, until `GET /api/cart` is implemented.
 */
export async function GET(_request, _context) {
  throw new NotImplementedError('GET /api/cart');
}

/**
 * BR-03 add an item — delegates to CartController.addItem.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<Record<string, never>> }} _context - Route context; this route has no
 *   dynamic segments.
 * @returns {Promise<Response>} Created/accepted response body.
 * @throws {NotImplementedError} Always, until `POST /api/cart` is implemented.
 */
export async function POST(_request, _context) {
  throw new NotImplementedError('POST /api/cart');
}

/**
 * empty the cart — delegates to CartController.clear.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<Record<string, never>> }} _context - Route context; this route has no
 *   dynamic segments.
 * @returns {Promise<Response>} Empty (204) or confirmation response body.
 * @throws {NotImplementedError} Always, until `DELETE /api/cart` is implemented.
 */
export async function DELETE(_request, _context) {
  throw new NotImplementedError('DELETE /api/cart');
}
