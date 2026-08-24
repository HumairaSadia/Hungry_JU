/**
 * @file HTTP route handlers for `/api/cart/items/[itemId]`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/cart/items/[itemId]/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * change quantity — delegates to CartController.updateItem.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ itemId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`itemId`).
 * @returns {Promise<Response>} Updated resource response body.
 * @throws {NotImplementedError} Always, until `PATCH /api/cart/items/[itemId]` is implemented.
 */
export async function PATCH(_request, _context) {
  throw new NotImplementedError('PATCH /api/cart/items/[itemId]');
}

/**
 * drop a line — delegates to CartController.removeItem.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ itemId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`itemId`).
 * @returns {Promise<Response>} Empty (204) or confirmation response body.
 * @throws {NotImplementedError} Always, until `DELETE /api/cart/items/[itemId]` is implemented.
 */
export async function DELETE(_request, _context) {
  throw new NotImplementedError('DELETE /api/cart/items/[itemId]');
}
