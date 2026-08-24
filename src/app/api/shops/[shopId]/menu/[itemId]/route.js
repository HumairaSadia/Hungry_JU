/**
 * @file HTTP route handlers for `/api/shops/[shopId]/menu/[itemId]`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/shops/[shopId]/menu/[itemId]/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * HJU-B02 edit a menu item — delegates to MenuController.updateItem.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ shopId: string; itemId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`shopId`, `itemId`).
 * @returns {Promise<Response>} Updated resource response body.
 * @throws {NotImplementedError} Always, until `PATCH /api/shops/[shopId]/menu/[itemId]` is implemented.
 */
export async function PATCH(_request, _context) {
  throw new NotImplementedError('PATCH /api/shops/[shopId]/menu/[itemId]');
}

/**
 * HJU-B02 remove a menu item — delegates to MenuController.deleteItem.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ shopId: string; itemId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`shopId`, `itemId`).
 * @returns {Promise<Response>} Empty (204) or confirmation response body.
 * @throws {NotImplementedError} Always, until `DELETE /api/shops/[shopId]/menu/[itemId]` is implemented.
 */
export async function DELETE(_request, _context) {
  throw new NotImplementedError('DELETE /api/shops/[shopId]/menu/[itemId]');
}
