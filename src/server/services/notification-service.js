/**
 * @file Notification fan-out for order status changes.
 *
 * @module server/services/notification-service
 */

import { BaseService } from '@/server/core/base-service';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Fan-out for order status changes (FR-E2/E3).
 * A failed notification never rolls back the state change that triggered it
 * (UC-03 E1): the write commits, delivery is retried.
 *
 * @augments BaseService
 */
export class NotificationService extends BaseService {
  /** @type {import('@/server/repositories/notification-repository').NotificationRepository} */
  #notificationRepository;

  /** @type {import('@/server/lib/notification-dispatcher').NotificationDispatcher} */
  #dispatcher;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/repositories/notification-repository').NotificationRepository}
   *   dependencies.notificationRepository - Notification storage.
   * @param {import('@/server/lib/notification-dispatcher').NotificationDispatcher}
   *   dependencies.dispatcher - Transport; in-app rows in the MVP, push in Phase 2.
   */
  constructor({ notificationRepository, dispatcher }) {
    super();
    this.#notificationRepository = notificationRepository;
    this.#dispatcher = dispatcher;
  }

  /**
   * Decides who hears about a transition: student, vendor, assigned rider, or all three.
   *
   * @param {import('@/server/models/order').Order} _order - Order that moved.
   * @param {import('@/shared/types').OrderStatus} _fromStatus - State left behind.
   * @param {import('@/shared/types').OrderStatus} _toStatus - State entered.
   * @returns {Promise<void>} Resolves once the notifications are stored and dispatched.
   * @throws {NotImplementedError} Until implemented.
   */
  async notifyStatusChange(_order, _fromStatus, _toStatus) {
    throw new NotImplementedError('NotificationService.notifyStatusChange');
  }

  /**
   * Sends one notification to one recipient.
   *
   * @param {string} _userId - Recipient.
   * @param {string} _type - Value from `NOTIFICATION_TYPE`.
   * @param {Record<string, unknown>} _payload - Data used to render title and body.
   * @returns {Promise<import('@/server/models/notification').Notification>} The stored
   *   notification.
   * @throws {NotImplementedError} Until implemented.
   */
  async notifyUser(_userId, _type, _payload) {
    throw new NotImplementedError('NotificationService.notifyUser');
  }

  /**
   * Notification history for the acting user (FR-E4).
   *
   * @param {import('@/shared/types').Actor} _actor - Requesting principal.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/shared/types').PaginatedResult>} Notifications plus metadata.
   * @throws {NotImplementedError} Until implemented.
   */
  async listForUser(_actor, _pagination) {
    throw new NotImplementedError('NotificationService.listForUser');
  }

  /**
   * Marks one of the actor's notifications read.
   *
   * @param {import('@/shared/types').Actor} _actor - Requesting principal.
   * @param {string} _notificationId - Notification to mark.
   * @returns {Promise<void>} Resolves once written.
   * @throws {NotImplementedError} Until implemented.
   */
  async markRead(_actor, _notificationId) {
    throw new NotImplementedError('NotificationService.markRead');
  }

  /**
   * Unread count behind the bell badge.
   *
   * @param {import('@/shared/types').Actor} _actor - Requesting principal.
   * @returns {Promise<number>} Unread notifications.
   * @throws {NotImplementedError} Until implemented.
   */
  async countUnread(_actor) {
    throw new NotImplementedError('NotificationService.countUnread');
  }
}
