/**
 * @file HTTP route handlers for `/api/deliveries`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/deliveries/route
 */

import { Container, TOKENS } from '@/server/config/container';

/**
 * UC-02 first-accept-wins claim (409 on loss) – delegates to DeliveryController.acceptOrder.
 * Creating the delivery IS the claim, so the order id travels in the body: at this point no
 * delivery id exists yet, and Next.js allows only one slug name per path position.
 *
 * @param {Request} request - Incoming HTTP request.
 * @param {{ params: Promise<Record<string, never>> }} context - Route context; this route has no
 *   dynamic segments.
 * @returns {Promise<Response>} Created/accepted response body.
 */
export async function POST(request, context) {
  const controller = Container.instance.resolve(TOKENS.DELIVERY_CONTROLLER ?? Symbol.for('deliveryController'));
  return controller.acceptOrder(request, context.params);
}