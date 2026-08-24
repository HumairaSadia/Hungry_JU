/**
 * @file HTTP entry for the payment endpoints.
 *
 * Controllers stay thin: parse, authorize, delegate to a service, respond.
 * They are the only layer that touches `Request` and `Response`.
 *
 * @module server/controllers/payment-controller
 */

import { BaseController } from '@/server/core/base-controller';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * COD settlement in the MVP; the online/escrow endpoints exist as the Phase 2 shape
 * so the route surface does not change when the gateway lands.
 *
 * @augments BaseController
 */
export class PaymentController extends BaseController {
  /** @type {import('@/server/services/payment-service').PaymentService} */
  #paymentService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/services/payment-service').PaymentService}
   *   dependencies.paymentService - Payment and settlement rules.
   */
  constructor({ paymentService }) {
    super();
    this.#paymentService = paymentService;
  }

  /**
   * Records that cash changed hands on delivery (F01).
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `PaymentController.recordCodSettlement` is implemented.
   */
  async recordCodSettlement(_request, _params) {
    throw new NotImplementedError('PaymentController.recordCodSettlement');
  }

  /**
   * Phase 2.
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `PaymentController.initiateOnline` is implemented.
   */
  async initiateOnline(_request, _params) {
    throw new NotImplementedError('PaymentController.initiateOnline');
  }

  /**
   * Phase 2. Verifies the gateway signature before touching escrow state.
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `PaymentController.gatewayWebhook` is implemented.
   */
  async gatewayWebhook(_request) {
    throw new NotImplementedError('PaymentController.gatewayWebhook');
  }
}
