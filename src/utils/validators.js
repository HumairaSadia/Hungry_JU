/**
 * @fileoverview Validation utilities for the registration flow.
 * Implements AC-01 to AC-06 from User Story US-001.
 * @module utils/validators
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Bangladeshi mobile numbers: 01[3-9]XXXXXXXX (11 digits total)
const BD_PHONE_REGEX = /^01[3-9]\d{8}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

/**
 * Validates an email address format. (AC-02)
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return typeof email === 'string' && EMAIL_REGEX.test(email.trim());
}

/**
 * Validates a Bangladeshi phone number. (AC-03)
 * @param {string} phone
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  return typeof phone === 'string' && BD_PHONE_REGEX.test(phone.trim());
}

/**
 * Validates password strength. (AC-05)
 * @param {string} password
 * @returns {boolean}
 */
export function isStrongPassword(password) {
  return typeof password === 'string' && PASSWORD_REGEX.test(password);
}

/**
 * Confirms password and confirmPassword match. (AC-06)
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {boolean}
 */
export function passwordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}

/**
 * Validates the full registration payload. (AC-01)
 * @param {Object} form
 * @returns {Object<string,string>} field -> error message; empty object = valid
 */
export function validateRegistrationForm(form) {
  const errors = {};

  if (!form.fullName?.trim()) errors.fullName = 'Full name is required.';
  if (!form.photoURL?.trim()) errors.photoURL = 'Profile photo URL is required.';
  if (!form.gender?.trim()) errors.gender = 'Gender is required.';
  if (!form.acceptedTerms) errors.acceptedTerms = 'You must accept the Terms and Conditions.';

  const hasEmail = !!form.email?.trim();
  const hasPhone = !!form.phoneNumber?.trim();

  if (!hasEmail && !hasPhone) errors.contact = 'Provide at least one of Email or Phone Number.';
  if (hasEmail && !isValidEmail(form.email)) errors.email = 'Please enter a valid email address.';
  if (hasPhone && !isValidPhone(form.phoneNumber)) errors.phoneNumber = 'Please enter a valid Bangladeshi phone number.';
  if (!isStrongPassword(form.password)) {
    errors.password = 'Password must be 8+ characters with uppercase, lowercase, number and special character.';
  }
  if (!passwordsMatch(form.password, form.confirmPassword)) errors.confirmPassword = 'Passwords do not match.';

  return errors;
}