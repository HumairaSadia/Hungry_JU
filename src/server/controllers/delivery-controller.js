/**
 * @file HTTP entry for the delivery-partner endpoints.
 *
 * Controllers stay thin: parse, authorize, delegate to a service, respond.
 * They are the only layer that touches `Request` and `Response`.
 *
 * @module server/controllers/delivery-controller
 */

import { BaseController } from '@/server/core/base-controller';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Delivery partner endpoints: the available feed, the claim, progress, and PIN completion.
 *
 * @augments BaseController
 */
export class DeliveryController extends BaseController {
  /** @type {import('@/server/services/delivery-service').DeliveryService} */
  #deliveryService;

  /** @type {import('@/server/services/delivery-assignment-service').DeliveryAssignmentService} */
  #assignmentService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/services/delivery-service').DeliveryService}
   *   dependencies.deliveryService - Delivery progress and earnings.
   * @param {import('@/server/services/delivery-assignment-service').DeliveryAssignmentService}
   *   dependencies.assignmentService - The atomic rider claim.
   */
  constructor({ deliveryService, assignmentService }) {
    super();
    this.#deliveryService = deliveryService;
    this.#assignmentService = assignmentService;
  }

  /**
   * Lists claimable orders for the rider feed (FR-D2).
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `DeliveryController.listAvailable` is implemented.
   */
  async listAvailable(_request) {
    throw new NotImplementedError('DeliveryController.listAvailable');
  }

  /**
   * Returns 409 when another rider won the race — the client refreshes the feed.
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `DeliveryController.acceptOrder` is implemented.
   */
  async acceptOrder(_request, _params) {
    throw new NotImplementedError('DeliveryController.acceptOrder');
  }

  /**
   * Returns the rider single in-flight delivery (FR-D5).
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `DeliveryController.getActive` is implemented.
   */
  async getActive(_request) {
    throw new NotImplementedError('DeliveryController.getActive');
  }

  /**
   * Moves the delivery to its next status.
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `DeliveryController.advanceStatus` is implemented.
   */
  async advanceStatus(_request, _params) {
    throw new NotImplementedError('DeliveryController.advanceStatus');
  }

  /**
   * Completes the delivery against the customer PIN (BR-10).
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `DeliveryController.complete` is implemented.
   */
  async complete(_request, _params) {
    throw new NotImplementedError('DeliveryController.complete');
  }

  /**
   * Releases the delivery back to the pool (HJU-D06).
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `DeliveryController.release` is implemented.
   */
  async release(_request, _params) {
    throw new NotImplementedError('DeliveryController.release');
  }

  /**
   * Returns the rider earnings summary (FR-D7).
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `DeliveryController.earnings` is implemented.
   */
  async earnings(_request) {
    throw new NotImplementedError('DeliveryController.earnings');
  }

  /**
   * Lists the rider past deliveries.
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `DeliveryController.history` is implemented.
   */
  async history(_request) {
    throw new NotImplementedError('DeliveryController.history');
  }
}
