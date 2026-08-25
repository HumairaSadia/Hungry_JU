/**
 * @fileoverview Computes a password strength label for the live UI indicator (AC-13).
 * @module utils/passwordStrength
 */

/** @typedef {'Weak'|'Medium'|'Strong'} StrengthLabel */

/**
 * Scores and labels password strength.
 * @param {string} password
 * @returns {StrengthLabel}
 */
export function getPasswordStrength(password = '') {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  if (password.length >= 12) score += 1;

  if (score <= 2) return 'Weak';
  if (score <= 3) return 'Medium';
  return 'Strong';
}