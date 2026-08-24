/**
 * @file In-app notification entity.
 *
 * @module server/models/notification
 */

import { BaseModel } from '@/server/core/base-model';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Table `notifications`. Storage is transport-agnostic, so the Phase 2 push sender
 * plugs in behind NotificationService without touching this model (SRS section 10).
 *
 * @augments BaseModel
 */
export class Notification extends BaseModel {
  /** @type {string} */
  #userId;

  /** @type {string} */
  #type;

  /** @type {string} */
  #title;

  /** @type {string} */
  #body;

  /** @type {string | null} */
  #relatedOrderId;

  /** @type {boolean} */
  #isRead;

  /**
   * @param {object} attributes - Column values.
   * @param {string | null} [attributes.id] - Primary key.
   * @param {Date | null} [attributes.createdAt] - Row creation timestamp.
   * @param {string} attributes.userId - Recipient.
   * @param {string} attributes.type - Event type from `NOTIFICATION_TYPE`.
   * @param {string} attributes.title - Headline shown in the list.
   * @param {string} attributes.body - Detail line.
   * @param {string | null} attributes.relatedOrderId - Order to deep-link to, when any.
   * @param {boolean} attributes.isRead - Whether the recipient has opened it.
   */
  constructor({ id, createdAt, userId, type, title, body, relatedOrderId, isRead }) {
    super({ id, createdAt });
    this.#userId = userId;
    this.#type = type;
    this.#title = title;
    this.#body = body;
    this.#relatedOrderId = relatedOrderId;
    this.#isRead = isRead;
  }

  /**
   * Recipient.
   *
   * @returns {string} User id.
   */
  get userId() {
    return this.#userId;
  }

  /**
   * Event type.
   *
   * @returns {string} Value from `NOTIFICATION_TYPE`.
   */
  get type() {
    return this.#type;
  }

  /**
   * Headline.
   *
   * @returns {string} Title.
   */
  get title() {
    return this.#title;
  }

  /**
   * Detail line.
   *
   * @returns {string} Body text.
   */
  get body() {
    return this.#body;
  }

  /**
   * Order this notification points at.
   *
   * @returns {string | null} Order id, or `null`.
   */
  get relatedOrderId() {
    return this.#relatedOrderId;
  }

  /**
   * Read state.
   *
   * @returns {boolean} `true` once opened.
   */
  get isRead() {
    return this.#isRead;
  }

  /**
   * Flags the notification as read (FR-E4).
   *
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  markRead() {
    throw new NotImplementedError('Notification.markRead');
  }

  /**
   * Builds the per-recipient message for one order status transition (FR-E2).
   *
   * @param {import('@/server/models/order').Order} _order - Order that moved.
   * @param {string} _recipientId - Who should be told.
   * @param {import('@/shared/types').OrderStatus} _newStatus - State just entered.
   * @returns {Notification} Unsaved notification.
   * @throws {NotImplementedError} Until implemented.
   */
  static forStatusChange(_order, _recipientId, _newStatus) {
    throw new NotImplementedError('Notification.forStatusChange');
  }
}
