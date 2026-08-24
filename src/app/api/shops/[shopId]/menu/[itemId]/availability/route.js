/**
 * @file HTTP route handlers for `/api/shops/[shopId]/menu/[itemId]/availability`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/shops/[shopId]/menu/[itemId]/availability/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * one-tap sold-out toggle — delegates to MenuController.setAvailability.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ shopId: string; itemId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`shopId`, `itemId`).
 * @returns {Promise<Response>} Updated resource response body.
 * @throws {NotImplementedError} Always, until `PUT /api/shops/[shopId]/menu/[itemId]/availability` is implemented.
 */
export async function PUT(_request, _context) {
  throw new NotImplementedError('PUT /api/shops/[shopId]/menu/[itemId]/availability');
}
