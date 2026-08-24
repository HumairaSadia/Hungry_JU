/**
 * @file Shop entity: a vendor's Bot Tola outlet.
 *
 * @module server/models/shop
 */

import { BaseModel } from '@/server/core/base-model';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Table `shops`. A vendor's Bot Tola outlet, orderable only when approved and open.
 *
 * @augments BaseModel
 */
export class Shop extends BaseModel {
  /** @type {string} */
  #ownerUserId;

  /** @type {string} */
  #shopName;

  /** @type {string} */
  #botTolaLocation;

  /** @type {string} */
  #contactPhone;

  /** @type {string} */
  #operatingHours;

  /** @type {import('@/shared/types').UserStatus | 'approved' | 'rejected' | 'pending'} */
  #approvalStatus;

  /** @type {boolean} */
  #isOpen;

  /** @type {number} */
  #ratingAvg;

  /**
   * @param {object} attributes - Column values.
   * @param {string | null} [attributes.id] - Primary key.
   * @param {Date | null} [attributes.createdAt] - Row creation timestamp.
   * @param {string} attributes.ownerUserId - Vendor who owns the shop.
   * @param {string} attributes.shopName - Display name.
   * @param {string} attributes.botTolaLocation - Stall location inside Bot Tola.
   * @param {string} attributes.contactPhone - Phone shown to riders.
   * @param {string} attributes.operatingHours - Human-readable opening hours.
   * @param {string} attributes.approvalStatus - Admin review outcome (FR-G2).
   * @param {boolean} attributes.isOpen - Vendor-controlled open/closed switch.
   * @param {number} attributes.ratingAvg - Maintained average shop rating.
   */
  constructor({
    id,
    createdAt,
    ownerUserId,
    shopName,
    botTolaLocation,
    contactPhone,
    operatingHours,
    approvalStatus,
    isOpen,
    ratingAvg,
  }) {
    super({ id, createdAt });
    this.#ownerUserId = ownerUserId;
    this.#shopName = shopName;
    this.#botTolaLocation = botTolaLocation;
    this.#contactPhone = contactPhone;
    this.#operatingHours = operatingHours;
    this.#approvalStatus = approvalStatus;
    this.#isOpen = isOpen;
    this.#ratingAvg = ratingAvg;
  }

  /**
   * Owning vendor.
   *
   * @returns {string} Vendor user id.
   */
  get ownerUserId() {
    return this.#ownerUserId;
  }

  /**
   * Display name.
   *
   * @returns {string} Shop name.
   */
  get shopName() {
    return this.#shopName;
  }

  /**
   * Stall location inside Bot Tola.
   *
   * @returns {string} Location label.
   */
  get botTolaLocation() {
    return this.#botTolaLocation;
  }

  /**
   * Phone shown to riders on an active delivery.
   *
   * @returns {string} Contact phone.
   */
  get contactPhone() {
    return this.#contactPhone;
  }

  /**
   * Opening hours as displayed to students.
   *
   * @returns {string} Operating hours.
   */
  get operatingHours() {
    return this.#operatingHours;
  }

  /**
   * Admin review outcome.
   *
   * @returns {string} One of `pending`, `approved`, `rejected`.
   */
  get approvalStatus() {
    return this.#approvalStatus;
  }

  /**
   * Vendor-controlled open switch.
   *
   * @returns {boolean} `true` when the shop is taking orders right now.
   */
  get isOpen() {
    return this.#isOpen;
  }

  /**
   * Maintained aggregate, recomputed on new ratings; documented denormalisation.
   *
   * @returns {number} Average rating.
   */
  get ratingAvg() {
    return this.#ratingAvg;
  }

  /**
   * BR-07: closed or unapproved shops accept no orders and stay out of the browse index.
   *
   * @returns {boolean} `true` when the shop may receive orders.
   * @throws {NotImplementedError} Until implemented.
   */
  get isOrderable() {
    throw new NotImplementedError('Shop.isOrderable');
  }

  /**
   * Opens the shop for orders.
   *
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  open() {
    throw new NotImplementedError('Shop.open');
  }

  /**
   * Closes the shop; in-flight orders are unaffected.
   *
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  close() {
    throw new NotImplementedError('Shop.close');
  }

  /**
   * Records an approval decision (FR-G2).
   *
   * @param {string} _adminId - Deciding admin, for the audit log.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  approve(_adminId) {
    throw new NotImplementedError('Shop.approve');
  }

  /**
   * Records a rejection decision (FR-G2).
   *
   * @param {string} _adminId - Deciding admin, for the audit log.
   * @param {string} _reason - Why the application was refused; mailed to the vendor.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  reject(_adminId, _reason) {
    throw new NotImplementedError('Shop.reject');
  }

  /**
   * Recomputes the maintained rating average from the shop's ratings.
   *
   * @param {import('@/server/models/rating').Rating[]} _ratings - Ratings to average.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  recalculateRating(_ratings) {
    throw new NotImplementedError('Shop.recalculateRating');
  }
}
