/**
 * @file Student-only profile row: location and rider reputation.
 *
 * @module server/models/student-profile
 */

import { BaseModel } from '@/server/core/base-model';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Table `student_profiles`, 1:1 with users where role = student.
 * Split out so vendor and admin rows do not carry NULL hall/room columns (3NF hygiene).
 *
 * @augments BaseModel
 */
export class StudentProfile extends BaseModel {
  /** @type {string} */
  #userId;

  /** @type {string} */
  #hallName;

  /** @type {string} */
  #roomNo;

  /** @type {boolean} */
  #isDeliveryEnabled;

  /** @type {number} */
  #riderRatingAvg;

  /** @type {number} */
  #reliabilityScore;

  /**
   * @param {object} attributes - Column values.
   * @param {string | null} [attributes.id] - Primary key.
   * @param {Date | null} [attributes.createdAt] - Row creation timestamp.
   * @param {string} attributes.userId - Owning user row.
   * @param {string} attributes.hallName - Residence hall used as the default drop-off.
   * @param {string} attributes.roomNo - Room number within the hall.
   * @param {boolean} attributes.isDeliveryEnabled - Whether Deliver Mode is on (FR-D1).
   * @param {number} attributes.riderRatingAvg - Maintained average of rider ratings.
   * @param {number} attributes.reliabilityScore - Completion-behaviour score (risk R1).
   */
  constructor({
    id,
    createdAt,
    userId,
    hallName,
    roomNo,
    isDeliveryEnabled,
    riderRatingAvg,
    reliabilityScore,
  }) {
    super({ id, createdAt });
    this.#userId = userId;
    this.#hallName = hallName;
    this.#roomNo = roomNo;
    this.#isDeliveryEnabled = isDeliveryEnabled;
    this.#riderRatingAvg = riderRatingAvg;
    this.#reliabilityScore = reliabilityScore;
  }

  /**
   * Owning user row.
   *
   * @returns {string} User id.
   */
  get userId() {
    return this.#userId;
  }

  /**
   * Residence hall.
   *
   * @returns {string} Hall name.
   */
  get hallName() {
    return this.#hallName;
  }

  /**
   * Room within the hall.
   *
   * @returns {string} Room number.
   */
  get roomNo() {
    return this.#roomNo;
  }

  /**
   * Deliver Mode flag.
   *
   * @returns {boolean} `true` when the student accepts deliveries.
   */
  get isDeliveryEnabled() {
    return this.#isDeliveryEnabled;
  }

  /**
   * Maintained average of ratings received as a rider.
   *
   * @returns {number} Average rating.
   */
  get riderRatingAvg() {
    return this.#riderRatingAvg;
  }

  /**
   * Reputation score used to rank and, eventually, restrict riders.
   *
   * @returns {number} Reliability score.
   */
  get reliabilityScore() {
    return this.#reliabilityScore;
  }

  /**
   * Updates the default drop-off location (FR-C7).
   *
   * @param {string} _hallName - New hall.
   * @param {string} _roomNo - New room.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  updateLocation(_hallName, _roomNo) {
    throw new NotImplementedError('StudentProfile.updateLocation');
  }

  /**
   * Flips Deliver Mode on the profile row.
   *
   * @param {boolean} _enabled - Desired state.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  setDeliveryEnabled(_enabled) {
    throw new NotImplementedError('StudentProfile.setDeliveryEnabled');
  }

  /**
   * Drops on release/timeout, rises on clean completions (risk R1, SRS section 12.4).
   *
   * @param {number} _delta - Signed adjustment applied to the score.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  adjustReliability(_delta) {
    throw new NotImplementedError('StudentProfile.adjustReliability');
  }
}
