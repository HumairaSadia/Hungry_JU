/**
 * @file HTTP entry for the order endpoints.
 *
 * Controllers stay thin: parse, authorize, delegate to a service, respond.
 * They are the only layer that touches `Request` and `Response`.
 *
 * @module server/controllers/order-controller
 */

import { BaseController } from '@/server/core/base-controller';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Order endpoints for students and vendors, plus the tracking poll.
 *
 * @augments BaseController
 */
export class OrderController extends BaseController {
  /** @type {import('@/server/services/order-service').OrderService} */
  #orderService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/services/order-service').OrderService} dependencies.orderService -
   *   Order lifecycle rules.
   */
  constructor({ orderService }) {
    super();
    this.#orderService = orderService;
  }

  /**
   * Reads the Idempotency-Key header so a retried checkout cannot create two orders.
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `OrderController.placeOrder` is implemented.
   */
  async placeOrder(_request) {
    throw new NotImplementedError('OrderController.placeOrder');
  }

  /**
   * Lists the acting student order history (FR-C8).
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `OrderController.listMyOrders` is implemented.
   */
  async listMyOrders(_request) {
    throw new NotImplementedError('OrderController.listMyOrders');
  }

  /**
   * Returns one order, ownership-checked.
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `OrderController.getOrder` is implemented.
   */
  async getOrder(_request, _params) {
    throw new NotImplementedError('OrderController.getOrder');
  }

  /**
   * Cancels an order inside the BR-04 window.
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `OrderController.cancelOrder` is implemented.
   */
  async cancelOrder(_request, _params) {
    throw new NotImplementedError('OrderController.cancelOrder');
  }

  /**
   * Serves the 5-second tracking poll (FR-E1).
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `OrderController.trackOrder` is implemented.
   */
  async trackOrder(_request, _params) {
    throw new NotImplementedError('OrderController.trackOrder');
  }

  /**
   * Refills the cart from a past order (FR-C9).
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `OrderController.reorder` is implemented.
   */
  async reorder(_request, _params) {
    throw new NotImplementedError('OrderController.reorder');
  }

  /**
   * Lists the incoming-order queue for a shop (FR-B5).
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `OrderController.listShopOrders` is implemented.
   */
  async listShopOrders(_request, _params) {
    throw new NotImplementedError('OrderController.listShopOrders');
  }

  /**
   * Accepts an incoming order (FR-B4).
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `OrderController.acceptOrder` is implemented.
   */
  async acceptOrder(_request, _params) {
    throw new NotImplementedError('OrderController.acceptOrder');
  }

  /**
   * Rejects an incoming order with a reason (FR-B6).
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `OrderController.rejectOrder` is implemented.
   */
  async rejectOrder(_request, _params) {
    throw new NotImplementedError('OrderController.rejectOrder');
  }

  /**
   * Moves an order to the next vendor-side status.
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `OrderController.advanceStatus` is implemented.
   */
  async advanceStatus(_request, _params) {
    throw new NotImplementedError('OrderController.advanceStatus');
  }
}
