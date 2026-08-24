/**
 * @file Delivery transport behind NotificationService.
 *
 * @module server/lib/notification-dispatcher
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Transport behind NotificationService. MVP writes in-app rows that clients poll;
 * Phase 2 adds an FCM sender behind this same interface (SRS section 10), so no
 * caller changes when push notifications arrive.
 */
export class NotificationDispatcher {
  /**
   * Delivers one notification through the active transport.
   *
   * @param {import('@/server/models/notification').Notification} _notification - Notification
   *   to deliver.
   * @returns {Promise<void>} Resolves once the transport accepted it.
   * @throws {NotImplementedError} Until implemented.
   */
  async dispatch(_notification) {
    throw new NotImplementedError('NotificationDispatcher.dispatch');
  }

  /**
   * Failed sends are retried out-of-band; the state change already committed.
   *
   * @returns {Promise<number>} How many pending notifications were re-sent.
   * @throws {NotImplementedError} Until implemented.
   */
  async retryFailed() {
    throw new NotImplementedError('NotificationDispatcher.retryFailed');
  }
}
