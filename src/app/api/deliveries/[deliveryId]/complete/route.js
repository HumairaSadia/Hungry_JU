/**
 * @file HTTP route handlers for `/api/deliveries/[deliveryId]/complete`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/deliveries/[deliveryId]/complete/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * HJU-D05 close the delivery with the customer PIN — delegates to DeliveryController.complete.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ deliveryId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`deliveryId`).
 * @returns {Promise<Response>} Created/accepted response body.
 * @throws {NotImplementedError} Always, until `POST /api/deliveries/[deliveryId]/complete` is implemented.
 */
export async function POST(_request, _context) {
  throw new NotImplementedError('POST /api/deliveries/[deliveryId]/complete');
}
