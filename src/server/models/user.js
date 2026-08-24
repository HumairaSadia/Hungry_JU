/**
 * @file Abstract user entity, root of the single-table role hierarchy.
 *
 * @module server/models/user
 */

import { BaseModel } from '@/server/core/base-model';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Constructor attributes shared by every user subclass.
 *
 * @typedef {object} UserAttributes
 * @property {string | null} [id] - Primary key.
 * @property {Date | null} [createdAt] - Row creation timestamp.
 * @property {string} fullName - Display name.
 * @property {string} email - Unique login email (BR-01).
 * @property {string} phone - Unique contact phone (BR-01).
 * @property {string} passwordHash - Bcrypt hash; the plaintext never reaches this layer.
 * @property {string} [gender] - Optional self-declared gender.
 * @property {string} [photoUrl] - Optional avatar URL.
 * @property {import('@/shared/types').UserStatus} status - Account lifecycle state.
 */

/**
 * Abstract user (table `users`, single-table inheritance per SRS section 7).
 * Student / Vendor / Admin subclass it because permissions and behaviour differ by role,
 * while identity, credentials, and verification are shared.
 *
 * @abstract
 * @augments BaseModel
 */
export class User extends BaseModel {
  /** @type {string} */
  #fullName;

  /** @type {string} */
  #email;

  /** @type {string} */
  #phone;

  /** @type {string} */
  #passwordHash;

  /** @type {string | undefined} */
  #gender;

  /** @type {string | undefined} */
  #photoUrl;

  /** @type {import('@/shared/types').UserStatus} */
  #status;

  /**
   * @param {UserAttributes} attributes - Identity and credential columns.
   * @throws {TypeError} When constructed directly instead of through a role subclass.
   */
  constructor({ id, createdAt, fullName, email, phone, passwordHash, gender, photoUrl, status }) {
    super({ id, createdAt });
    if (new.target === User) {
      throw new TypeError('User is abstract; construct Student, Vendor, or Admin');
    }
    this.#fullName = fullName;
    this.#email = email;
    this.#phone = phone;
    this.#passwordHash = passwordHash;
    this.#gender = gender;
    this.#photoUrl = photoUrl;
    this.#status = status;
  }

  /**
   * Display name.
   *
   * @returns {string} Full name.
   */
  get fullName() {
    return this.#fullName;
  }

  /**
   * Login email.
   *
   * @returns {string} Email address.
   */
  get email() {
    return this.#email;
  }

  /**
   * Contact phone.
   *
   * @returns {string} Phone number.
   */
  get phone() {
    return this.#phone;
  }

  /**
   * Account lifecycle state.
   *
   * @returns {import('@/shared/types').UserStatus} Current status.
   */
  get status() {
    return this.#status;
  }

  /**
   * Self-declared gender.
   *
   * @returns {string | undefined} Gender, when provided.
   */
  get gender() {
    return this.#gender;
  }

  /**
   * Avatar URL.
   *
   * @returns {string | undefined} Photo URL, when provided.
   */
  get photoUrl() {
    return this.#photoUrl;
  }

  /**
   * Subclasses answer with their USER_ROLE value; polymorphic role routing depends on it.
   *
   * @abstract
   * @returns {import('@/shared/types').UserRole} Role of this account.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  get role() {
    throw new NotImplementedError(`${this.constructor.name}.role`);
  }

  /**
   * BR-02: an account is usable only once verified and not suspended.
   *
   * @returns {boolean} `true` when the account may act.
   * @throws {NotImplementedError} Until implemented.
   */
  get isActive() {
    throw new NotImplementedError(`${this.constructor.name}.isActive`);
  }

  /**
   * Compared inside PasswordService only; the hash never leaves the model otherwise.
   *
   * @param {string} _hash - Candidate hash to compare against the stored one.
   * @returns {boolean} `true` on a match.
   * @throws {NotImplementedError} Until implemented.
   */
  matchesPasswordHash(_hash) {
    throw new NotImplementedError(`${this.constructor.name}.matchesPasswordHash`);
  }

  /**
   * Replaces the stored credential hash.
   *
   * @param {string} _newHash - Freshly computed bcrypt hash.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  changePassword(_newHash) {
    throw new NotImplementedError(`${this.constructor.name}.changePassword`);
  }

  /**
   * Moves the account from `pending` to `verified` (FR-A3).
   *
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  markVerified() {
    throw new NotImplementedError(`${this.constructor.name}.markVerified`);
  }

  /**
   * Suspends the account; every subsequent request is refused (FR-G3).
   *
   * @param {string} _reason - Admin-supplied justification, recorded in the audit log.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  suspend(_reason) {
    throw new NotImplementedError(`${this.constructor.name}.suspend`);
  }

  /**
   * Lifts a suspension.
   *
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  reactivate() {
    throw new NotImplementedError(`${this.constructor.name}.reactivate`);
  }

  /**
   * Applies editable profile fields, ignoring anything not user-editable.
   *
   * @param {Partial<Pick<UserAttributes, 'fullName' | 'phone' | 'gender' | 'photoUrl'>>}
   *   _changes - Fields to update.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  updateProfile(_changes) {
    throw new NotImplementedError(`${this.constructor.name}.updateProfile`);
  }

  /**
   * Which dashboard the user lands on after login (FR-A7).
   *
   * @returns {string} Route path for this role.
   * @throws {NotImplementedError} Until implemented.
   */
  defaultRoute() {
    throw new NotImplementedError(`${this.constructor.name}.defaultRoute`);
  }
}
