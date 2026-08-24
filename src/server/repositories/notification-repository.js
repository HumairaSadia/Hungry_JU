/**
 * @file Data access for the `notifications` table.
 *
 * @module server/repositories/notification-repository
 */

import { BaseRepository } from '@/server/core/base-repository';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Data access for `notifications` (FR-E4 in-app history).
 *
 * @augments BaseRepository
 */
export class NotificationRepository extends BaseRepository {
  /**
   * @param {unknown} db - Database client.
   */
  constructor(db) {
    super(db, 'notifications');
  }

  /**
   * Notification history for one recipient, newest first.
   *
   * @param {string} _userId - Recipient.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/server/models/notification').Notification[]>} Notifications.
   * @throws {NotImplementedError} Until implemented.
   */
  async findByUserId(_userId, _pagination) {
    throw new NotImplementedError('NotificationRepository.findByUserId');
  }

  /**
   * Unread count behind the bell badge.
   *
   * @param {string} _userId - Recipient.
   * @returns {Promise<number>} Unread notifications.
   * @throws {NotImplementedError} Until implemented.
   */
  async countUnread(_userId) {
    throw new NotImplementedError('NotificationRepository.countUnread');
  }

  /**
   * Marks one notification read; scoped by user so it doubles as the ownership check.
   *
   * @param {string} _notificationId - Notification to mark.
   * @param {string} _userId - Recipient making the request.
   * @returns {Promise<boolean>} `true` when a row was updated.
   * @throws {NotImplementedError} Until implemented.
   */
  async markRead(_notificationId, _userId) {
    throw new NotImplementedError('NotificationRepository.markRead');
  }

  /**
   * Marks every notification of one recipient read.
   *
   * @param {string} _userId - Recipient.
   * @returns {Promise<number>} How many rows were updated.
   * @throws {NotImplementedError} Until implemented.
   */
  async markAllRead(_userId) {
    throw new NotImplementedError('NotificationRepository.markAllRead');
  }

  /**
   * Bulk insert used when one status change notifies several parties.
   *
   * @param {import('@/server/models/notification').Notification[]} _notifications -
   *   Notifications to store.
   * @returns {Promise<import('@/server/models/notification').Notification[]>} Stored rows.
   * @throws {NotImplementedError} Until implemented.
   */
  async createMany(_notifications) {
    throw new NotImplementedError('NotificationRepository.createMany');
  }

  /**
   * Maps a `notifications` row onto its entity.
   *
   * @param {import('@/shared/types').PersistenceRow} _row - Row from `notifications`.
   * @returns {import('@/server/models/notification').Notification} Hydrated notification.
   * @throws {NotImplementedError} Until implemented.
   */
  toModel(_row) {
    throw new NotImplementedError('NotificationRepository.toModel');
  }
}
