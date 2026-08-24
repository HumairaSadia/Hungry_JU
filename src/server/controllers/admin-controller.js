/**
 * @file HTTP entry for the admin dashboard endpoints.
 *
 * Controllers stay thin: parse, authorize, delegate to a service, respond.
 * They are the only layer that touches `Request` and `Response`.
 *
 * @module server/controllers/admin-controller
 */

import { BaseController } from '@/server/core/base-controller';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Admin dashboard endpoints (Epic G). Every route sits behind requireRole('admin').
 *
 * @augments BaseController
 */
export class AdminController extends BaseController {
  /** @type {import('@/server/services/admin-service').AdminService} */
  #adminService;
  /** @type {import('@/server/services/analytics-service').AnalyticsService} */
  #analyticsService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/services/admin-service').AdminService} dependencies.adminService -
   *   Admin operations (Epic G).
   * @param {import('@/server/services/analytics-service').AnalyticsService} dependencies.analyticsService -
   *   Dashboard aggregates.
   */
  constructor({ adminService, analyticsService }) {
    super();
    this.#adminService = adminService;
    this.#analyticsService = analyticsService;
  }

  /**
   * Lists shop applications awaiting review (FR-G1).
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `AdminController.listPendingVendors` is implemented.
   */
  async listPendingVendors(_request) {
    throw new NotImplementedError('AdminController.listPendingVendors');
  }

  /**
   * Approves or rejects a shop application (FR-G2).
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `AdminController.decideVendorApplication` is implemented.
   */
  async decideVendorApplication(_request, _params) {
    throw new NotImplementedError('AdminController.decideVendorApplication');
  }

  /**
   * Lists accounts with filtering and paging (FR-G3).
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `AdminController.listUsers` is implemented.
   */
  async listUsers(_request) {
    throw new NotImplementedError('AdminController.listUsers');
  }

  /**
   * Suspends or reactivates an account (FR-G3).
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `AdminController.setUserStatus` is implemented.
   */
  async setUserStatus(_request, _params) {
    throw new NotImplementedError('AdminController.setUserStatus');
  }

  /**
   * Serves the live order monitor, stuck orders first.
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `AdminController.listOrders` is implemented.
   */
  async listOrders(_request) {
    throw new NotImplementedError('AdminController.listOrders');
  }

  /**
   * Applies a dispute outcome to an order (HJU-G03).
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `AdminController.resolveDispute` is implemented.
   */
  async resolveDispute(_request, _params) {
    throw new NotImplementedError('AdminController.resolveDispute');
  }

  /**
   * Returns the platform overview aggregates (FR-G5).
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `AdminController.analytics` is implemented.
   */
  async analytics(_request) {
    throw new NotImplementedError('AdminController.analytics');
  }

  /**
   * Updates the tunable system parameters (FR-G6).
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `AdminController.updateConfig` is implemented.
   */
  async updateConfig(_request) {
    throw new NotImplementedError('AdminController.updateConfig');
  }

  /**
   * Reads the audit trail (FR-G5).
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `AdminController.auditTrail` is implemented.
   */
  async auditTrail(_request) {
    throw new NotImplementedError('AdminController.auditTrail');
  }
}
