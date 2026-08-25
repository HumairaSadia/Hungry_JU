/**
 * @fileoverview User model — defines the User data structure and
 * encapsulates user-related data rules for Hungry_JU.
 * @module models/User
 */

/** @constant {string[]} Allowed gender values for registration. */
export const GENDER_OPTIONS = ['male', 'female', 'other'];

/** @constant {Object} Account verification status values (AC-07, AC-09). */
export const ACCOUNT_STATUS = {
  PENDING: 'pending_verification',
  VERIFIED: 'verified',
};

/**
 * Represents a Hungry_JU account. Single source of truth for user data
 * shape across controllers, services and Firestore.
 */
export class User {
  /**
   * @param {Object} data
   * @param {string} data.uid - Firebase Auth UID
   * @param {string} data.fullName
   * @param {string} [data.email]
   * @param {string} [data.phoneNumber]
   * @param {string} data.photoURL
   * @param {string} data.gender
   * @param {string} [data.role='customer']
   * @param {string} [data.status=ACCOUNT_STATUS.PENDING]
   */
  constructor({ uid, fullName, email = null, phoneNumber = null, photoURL, gender, role = 'customer', status = ACCOUNT_STATUS.PENDING }) {
    this.uid = uid;
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.photoURL = photoURL;
    this.gender = gender;
    this.role = role;
    this.status = status;
    this.createdAt = new Date().toISOString();
  }

  /**
   * Converts the model into a plain object safe for Firestore.
   * Password is intentionally never included — Firebase Auth owns credentials (AC-12).
   * @returns {Object}
   */
  toFirestore() {
    return {
      uid: this.uid,
      fullName: this.fullName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      photoURL: this.photoURL,
      gender: this.gender,
      role: this.role,
      status: this.status,
      createdAt: this.createdAt,
    };
  }
}