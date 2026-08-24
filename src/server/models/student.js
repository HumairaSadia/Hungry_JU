/**
 * @file Student account: customer and, with Deliver Mode on, delivery partner.
 *
 * @module server/models/student
 */

import { User } from '@/server/models/user';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * A student customer, who is also the delivery fleet: Deliver Mode is a toggle
 * on the same account (SRS section 3), not a second account type.
 *
 * @augments User
 */
export class Student extends User {
  /** @type {import('@/server/models/student-profile').StudentProfile | null} */
  #profile;

  /**
   * @param {import('@/server/models/user').UserAttributes} attributes - Shared user columns.
   * @param {import('@/server/models/student-profile').StudentProfile | null} [profile] -
   *   Hall/room and rider stats, when already loaded.
   */
  constructor(attributes, profile = null) {
    super(attributes);
    this.#profile = profile;
  }

  /**
   * Role discriminator.
   *
   * @returns {import('@/shared/types').UserRole} Always `'student'`.
   * @throws {NotImplementedError} Until implemented.
   */
  get role() {
    throw new NotImplementedError('Student.role');
  }

  /**
   * Attached profile row.
   *
   * @returns {import('@/server/models/student-profile').StudentProfile | null} Profile, or
   *   `null` when not loaded.
   */
  get profile() {
    return this.#profile;
  }

  /**
   * Whether Deliver Mode is currently on.
   *
   * @returns {boolean} `true` when the student accepts deliveries.
   * @throws {NotImplementedError} Until implemented.
   */
  get isDeliveryEnabled() {
    throw new NotImplementedError('Student.isDeliveryEnabled');
  }

  /**
   * FR-D1. Refused while a delivery is active so a rider cannot abandon an order.
   *
   * @param {boolean} _enabled - Desired Deliver Mode state.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  toggleDeliverMode(_enabled) {
    throw new NotImplementedError('Student.toggleDeliverMode');
  }

  /**
   * BR-06: a student may never deliver an order they placed.
   *
   * @param {import('@/server/models/order').Order} _order - Order being considered.
   * @returns {boolean} `true` when this student may claim it.
   * @throws {NotImplementedError} Until implemented.
   */
  canDeliver(_order) {
    throw new NotImplementedError('Student.canDeliver');
  }

  /**
   * Default drop-off location taken from the profile.
   *
   * @returns {{ hallName: string, roomNo: string }} Hall and room to deliver to.
   * @throws {NotImplementedError} Until implemented.
   */
  deliveryAddress() {
    throw new NotImplementedError('Student.deliveryAddress');
  }
}
