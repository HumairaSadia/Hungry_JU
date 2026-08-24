/**
 * @file HTTP route handlers for `/api/deliveries/[deliveryId]/release`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/deliveries/[deliveryId]/release/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * HJU-D06 emergency release back to the pool — delegates to DeliveryController.release.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ deliveryId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`deliveryId`).
 * @returns {Promise<Response>} Created/accepted response body.
 * @throws {NotImplementedError} Always, until `POST /api/deliveries/[deliveryId]/release` is implemented.
 */
export async function POST(_request, _context) {
  throw new NotImplementedError('POST /api/deliveries/[deliveryId]/release');
}
