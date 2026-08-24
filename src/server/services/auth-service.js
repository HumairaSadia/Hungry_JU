/**
 * @file Registration, verification, login, logout, and password reset.
 *
 * @module server/services/auth-service
 */

import { BaseService } from '@/server/core/base-service';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Registration payload accepted from the client (FR-A1).
 *
 * @typedef {object} RegistrationPayload
 * @property {string} fullName - Display name.
 * @property {string} email - Login email; must be unused (BR-01).
 * @property {string} phone - Contact phone; must be unused (BR-01).
 * @property {string} password - Plaintext password, checked against FR-A3 rules.
 * @property {import('@/shared/types').UserRole} role - Account type being created.
 * @property {string} [hallName] - Residence hall, for students.
 * @property {string} [roomNo] - Room number, for students.
 */

/**
 * What a successful login hands back to the controller.
 *
 * @typedef {object} AuthSession
 * @property {import('@/server/models/user').User} user - Authenticated account.
 * @property {string} accessToken - Short-lived bearer token.
 * @property {string} refreshToken - Refresh token for the httpOnly cookie.
 */

/**
 * Registration, verification, login, logout, password reset (Epic A / FR-A1..A9).
 *
 * @augments BaseService
 */
export class AuthService extends BaseService {
  /** @type {import('@/server/repositories/user-repository').UserRepository} */
  #userRepository;

  /** @type {import('@/server/repositories/student-profile-repository').StudentProfileRepository} */
  #studentProfileRepository;

  /** @type {import('@/server/services/password-service').PasswordService} */
  #passwordService;

  /** @type {import('@/server/services/token-service').TokenService} */
  #tokenService;

  /** @type {import('@/server/lib/email-service').EmailService} */
  #emailService;

  /** @type {import('@/server/services/audit-service').AuditService} */
  #auditService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/repositories/user-repository').UserRepository}
   *   dependencies.userRepository - Account storage.
   * @param {import('@/server/repositories/student-profile-repository').StudentProfileRepository}
   *   dependencies.studentProfileRepository - Student profile storage.
   * @param {import('@/server/services/password-service').PasswordService}
   *   dependencies.passwordService - Hashing and strength rules.
   * @param {import('@/server/services/token-service').TokenService} dependencies.tokenService -
   *   Session tokens.
   * @param {import('@/server/lib/email-service').EmailService} dependencies.emailService -
   *   Verification and reset mail.
   * @param {import('@/server/services/audit-service').AuditService} dependencies.auditService -
   *   Records logins and credential changes (BR-09).
   */
  constructor({
    userRepository,
    studentProfileRepository,
    passwordService,
    tokenService,
    emailService,
    auditService,
  }) {
    super();
    this.#userRepository = userRepository;
    this.#studentProfileRepository = studentProfileRepository;
    this.#passwordService = passwordService;
    this.#tokenService = tokenService;
    this.#emailService = emailService;
    this.#auditService = auditService;
  }

  /**
   * BR-01/BR-02: unique email and phone; account starts pending until verified.
   *
   * @param {RegistrationPayload} _payload - Validated registration fields.
   * @returns {Promise<import('@/server/models/user').User>} The created, unverified account.
   * @throws {NotImplementedError} Until implemented.
   */
  async register(_payload) {
    throw new NotImplementedError('AuthService.register');
  }

  /**
   * Consumes a verification token and activates the account (FR-A3).
   *
   * @param {string} _verificationToken - Token from the emailed link.
   * @returns {Promise<import('@/server/models/user').User>} The verified account.
   * @throws {NotImplementedError} Until implemented.
   */
  async verifyAccount(_verificationToken) {
    throw new NotImplementedError('AuthService.verifyAccount');
  }

  /**
   * Re-sends the verification link, subject to the hourly cap.
   *
   * @param {string} _identifier - Email or phone of the pending account.
   * @returns {Promise<void>} Resolves once the mail is queued.
   * @throws {NotImplementedError} Until implemented.
   */
  async resendVerification(_identifier) {
    throw new NotImplementedError('AuthService.resendVerification');
  }

  /**
   * FR-A6: counts failures and locks the account after the configured threshold.
   *
   * @param {string} _identifier - Email or phone (FR-A4).
   * @param {string} _password - Plaintext password.
   * @returns {Promise<AuthSession>} Authenticated user plus the token pair.
   * @throws {NotImplementedError} Until implemented.
   */
  async login(_identifier, _password) {
    throw new NotImplementedError('AuthService.login');
  }

  /**
   * Revokes the presented refresh token, ending the session.
   *
   * @param {string} _refreshToken - Token from the httpOnly cookie.
   * @returns {Promise<void>} Resolves once revoked.
   * @throws {NotImplementedError} Until implemented.
   */
  async logout(_refreshToken) {
    throw new NotImplementedError('AuthService.logout');
  }

  /**
   * Exchanges a refresh token for a fresh pair, rotating the old one out.
   *
   * @param {string} _refreshToken - Token from the httpOnly cookie.
   * @returns {Promise<AuthSession>} Replacement session.
   * @throws {NotImplementedError} Until implemented.
   */
  async refreshSession(_refreshToken) {
    throw new NotImplementedError('AuthService.refreshSession');
  }

  /**
   * Starts the reset flow; answers identically for unknown accounts so the endpoint
   * cannot be used to enumerate users (FR-A5).
   *
   * @param {string} _identifier - Email or phone.
   * @returns {Promise<void>} Resolves once the mail is queued.
   * @throws {NotImplementedError} Until implemented.
   */
  async requestPasswordReset(_identifier) {
    throw new NotImplementedError('AuthService.requestPasswordReset');
  }

  /**
   * Consumes a reset token and stores the new credential.
   *
   * @param {string} _resetToken - Single-use token from the emailed link.
   * @param {string} _newPassword - Replacement password, checked for strength.
   * @returns {Promise<void>} Resolves once the password is changed.
   * @throws {NotImplementedError} Until implemented.
   */
  async resetPassword(_resetToken, _newPassword) {
    throw new NotImplementedError('AuthService.resetPassword');
  }

  /**
   * Resolves the actor for middleware; returns null rather than throwing.
   *
   * @param {string} _accessToken - Raw bearer token.
   * @returns {Promise<import('@/shared/types').Actor | null>} Actor, or `null` when the token
   *   is missing, expired, or the account is inactive.
   * @throws {NotImplementedError} Until implemented.
   */
  async resolveActor(_accessToken) {
    throw new NotImplementedError('AuthService.resolveActor');
  }
}
