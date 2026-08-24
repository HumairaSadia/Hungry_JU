/**
 * @file HTTP entry for the notification endpoints.
 *
 * Controllers stay thin: parse, authorize, delegate to a service, respond.
 * They are the only layer that touches `Request` and `Response`.
 *
 * @module server/controllers/notification-controller
 */

import { BaseController } from '@/server/core/base-controller';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * In-app notification bell and history.
 *
 * @augments BaseController
 */
export class NotificationController extends BaseController {
  /** @type {import('@/server/services/notification-service').NotificationService} */
  #notificationService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/services/notification-service').NotificationService} dependencies.notificationService -
   *   Notification reads and writes.
   */
  constructor({ notificationService }) {
    super();
    this.#notificationService = notificationService;
  }

  /**
   * Lists the acting user notifications (FR-E4).
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `NotificationController.list` is implemented.
   */
  async list(_request) {
    throw new NotImplementedError('NotificationController.list');
  }

  /**
   * Returns the unread count behind the bell badge.
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `NotificationController.unreadCount` is implemented.
   */
  async unreadCount(_request) {
    throw new NotImplementedError('NotificationController.unreadCount');
  }

  /**
   * Marks one notification read.
   *
   * @param {Request} _request - Incoming request.
   * @param {Record<string, string>} _params - Resolved dynamic route segments.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `NotificationController.markRead` is implemented.
   */
  async markRead(_request, _params) {
    throw new NotImplementedError('NotificationController.markRead');
  }

  /**
   * Marks every notification read.
   *
   * @param {Request} _request - Incoming request.
   * @returns {Promise<Response>} JSON response for the route handler to return.
   * @throws {NotImplementedError} Until `NotificationController.markAllRead` is implemented.
   */
  async markAllRead(_request) {
    throw new NotImplementedError('NotificationController.markAllRead');
  }
}
