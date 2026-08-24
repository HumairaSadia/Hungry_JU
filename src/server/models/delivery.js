/**
 * @file Delivery entity: the rider-side half of an order.
 *
 * @module server/models/delivery
 */

import { BaseModel } from '@/server/core/base-model';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Table `deliveries`, 1:1 with orders (UNIQUE order_id is the last line of defence
 * against a double assignment, risk R4). Rider concerns stay out of the order row.
 * confirm_pin_hash is stored hashed: the plaintext PIN only ever lives on the customer screen.
 *
 * @augments BaseModel
 */
export class Delivery extends BaseModel {
  /** @type {string} */
  #orderId;

  /** @type {string | null} */
  #riderUserId;

  /** @type {import('@/shared/types').DeliveryStatus} */
  #status;

  /** @type {Date | null} */
  #acceptedAt;

  /** @type {Date | null} */
  #pickedUpAt;

  /** @type {Date | null} */
  #deliveredAt;

  /** @type {number} */
  #earningAmount;

  /** @type {string | null} */
  #confirmPinHash;

  /**
   * @param {object} attributes - Column values.
   * @param {string | null} [attributes.id] - Primary key.
   * @param {Date | null} [attributes.createdAt] - Row creation timestamp.
   * @param {string} attributes.orderId - Order being delivered; UNIQUE in the schema.
   * @param {string | null} attributes.riderUserId - Claiming student, `null` while unassigned.
   * @param {import('@/shared/types').DeliveryStatus} attributes.status - Assignment state.
   * @param {Date | null} attributes.acceptedAt - When the claim succeeded.
   * @param {Date | null} attributes.pickedUpAt - When the food left the shop.
   * @param {Date | null} attributes.deliveredAt - When the PIN was confirmed.
   * @param {number} attributes.earningAmount - Rider payout for this delivery, in poisha.
   * @param {string | null} attributes.confirmPinHash - Hash of the customer's 4-digit PIN.
   */
  constructor({
    id,
    createdAt,
    orderId,
    riderUserId,
    status,
    acceptedAt,
    pickedUpAt,
    deliveredAt,
    earningAmount,
    confirmPinHash,
  }) {
    super({ id, createdAt });
    this.#orderId = orderId;
    this.#riderUserId = riderUserId;
    this.#status = status;
    this.#acceptedAt = acceptedAt;
    this.#pickedUpAt = pickedUpAt;
    this.#deliveredAt = deliveredAt;
    this.#earningAmount = earningAmount;
    this.#confirmPinHash = confirmPinHash;
  }

  /**
   * Order being delivered.
   *
   * @returns {string} Order id.
   */
  get orderId() {
    return this.#orderId;
  }

  /**
   * Claiming rider.
   *
   * @returns {string | null} Rider user id, or `null` while unassigned.
   */
  get riderUserId() {
    return this.#riderUserId;
  }

  /**
   * Assignment state.
   *
   * @returns {import('@/shared/types').DeliveryStatus} Current status.
   */
  get status() {
    return this.#status;
  }

  /**
   * When the claim succeeded.
   *
   * @returns {Date | null} Timestamp, or `null`.
   */
  get acceptedAt() {
    return this.#acceptedAt;
  }

  /**
   * When the food left the shop.
   *
   * @returns {Date | null} Timestamp, or `null`.
   */
  get pickedUpAt() {
    return this.#pickedUpAt;
  }

  /**
   * When delivery was confirmed by PIN.
   *
   * @returns {Date | null} Timestamp, or `null`.
   */
  get deliveredAt() {
    return this.#deliveredAt;
  }

  /**
   * MVP: the flat delivery fee, kept by the rider in full (SRS section 12.1).
   *
   * @returns {number} Earning in poisha.
   */
  get earningAmount() {
    return this.#earningAmount;
  }

  /**
   * Whether this delivery still occupies the rider's single active slot.
   *
   * @returns {boolean} `true` while assigned, heading to vendor, or picked up.
   * @throws {NotImplementedError} Until implemented.
   */
  get isActive() {
    throw new NotImplementedError('Delivery.isActive');
  }

  /**
   * Binds the delivery to the rider that won the claim.
   *
   * @param {string} _riderUserId - Winning rider.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  assignTo(_riderUserId) {
    throw new NotImplementedError('Delivery.assignTo');
  }

  /**
   * Advances to `heading_to_vendor`.
   *
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  markHeadingToVendor() {
    throw new NotImplementedError('Delivery.markHeadingToVendor');
  }

  /**
   * Advances to `picked_up`, which also moves the order forward.
   *
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  markPickedUp() {
    throw new NotImplementedError('Delivery.markPickedUp');
  }

  /**
   * BR-10: completion requires the customer's PIN; a rider can never self-confirm.
   *
   * @param {string} _plainPin - PIN read off the customer's screen.
   * @param {import('@/server/services/pin-service').PinService} _pinService - Verifies the
   *   PIN against the stored hash.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  completeWithPin(_plainPin, _pinService) {
    throw new NotImplementedError('Delivery.completeWithPin');
  }

  /**
   * HJU-D06: returns the order to the pool and dents the rider's reliability score.
   *
   * @param {string} _reason - Why the rider dropped the delivery.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  release(_reason) {
    throw new NotImplementedError('Delivery.release');
  }
}
