/**
 * @file SMTP adapter for transactional mail.
 *
 * @module server/lib/email-service
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * SMTP adapter (external actor "Email Service", SRS section 3).
 * Email verification is the MVP channel because free SMS quota is tiny (constraint 2.4).
 */
export class EmailService {
  /** @type {unknown} */
  #transport;

  /**
   * @param {unknown} transport - Configured SMTP transport.
   */
  constructor(transport) {
    this.#transport = transport;
  }

  /**
   * Sends the account-verification link (FR-A3).
   *
   * @param {import('@/server/models/user').User} _user - Recipient account.
   * @param {string} _token - Single-use verification token.
   * @returns {Promise<void>} Resolves once the message is handed to the transport.
   * @throws {NotImplementedError} Until implemented.
   */
  async sendVerificationLink(_user, _token) {
    throw new NotImplementedError('EmailService.sendVerificationLink');
  }

  /**
   * Sends the password-reset link (FR-A8).
   *
   * @param {import('@/server/models/user').User} _user - Recipient account.
   * @param {string} _token - Short-lived reset token.
   * @returns {Promise<void>} Resolves once the message is handed to the transport.
   * @throws {NotImplementedError} Until implemented.
   */
  async sendPasswordReset(_user, _token) {
    throw new NotImplementedError('EmailService.sendPasswordReset');
  }

  /**
   * Notifies a vendor that their shop application was approved or rejected (FR-G2).
   *
   * @param {import('@/server/models/vendor').Vendor} _vendor - Vendor account.
   * @param {import('@/shared/types').UserStatus | 'approved' | 'rejected'} _decision - Outcome.
   * @param {string} [_reason] - Reviewer note, required for a rejection.
   * @returns {Promise<void>} Resolves once the message is handed to the transport.
   * @throws {NotImplementedError} Until implemented.
   */
  async sendVendorDecision(_vendor, _decision, _reason) {
    throw new NotImplementedError('EmailService.sendVendorDecision');
  }

  /**
   * Low-level send; every helper above funnels through it.
   *
   * @param {import('@/shared/types').EmailMessage} _message - Prepared message.
   * @returns {Promise<void>} Resolves once the transport accepts the message.
   * @throws {NotImplementedError} Until implemented.
   */
  async send(_message) {
    throw new NotImplementedError('EmailService.send');
  }
}
