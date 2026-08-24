/**
 * @file HTTP route handlers for `/api/deliveries`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/deliveries/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * UC-02 first-accept-wins claim (409 on loss) — delegates to DeliveryController.acceptOrder.
 * Creating the delivery IS the claim, so the order id travels in the body: at this point no
 * delivery id exists yet, and Next.js allows only one slug name per path position.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<Record<string, never>> }} _context - Route context; this route has no
 *   dynamic segments.
 * @returns {Promise<Response>} Created/accepted response body.
 * @throws {NotImplementedError} Always, until `POST /api/deliveries` is implemented.
 */
export async function POST(_request, _context) {
  throw new NotImplementedError('POST /api/deliveries');
}
