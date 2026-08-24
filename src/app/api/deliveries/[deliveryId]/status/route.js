/**
 * @file HTTP route handlers for `/api/deliveries/[deliveryId]/status`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/deliveries/[deliveryId]/status/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * HJU-D04 heading to vendor then picked up — delegates to DeliveryController.advanceStatus.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ deliveryId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`deliveryId`).
 * @returns {Promise<Response>} Updated resource response body.
 * @throws {NotImplementedError} Always, until `PUT /api/deliveries/[deliveryId]/status` is implemented.
 */
export async function PUT(_request, _context) {
  throw new NotImplementedError('PUT /api/deliveries/[deliveryId]/status');
}
