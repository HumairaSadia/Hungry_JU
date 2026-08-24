/**
 * @file Zod schemas for the authentication payloads.
 *
 * Validation is server-side and whitelist-based: unknown keys are dropped and any
 * client-side check is treated as UX only (SRS section 9). Schemas live here rather
 * than in the controllers so a client form can reuse one without importing server code.
 *
 * @module server/validators/auth-validator
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Zod schemas for Epic A payloads. Kept out of the controllers so the same schema
 * can be reused by a form on the client without dragging server code along.
 */
export class AuthValidator {
  /**
   * FR-A1: full name, password, and at least one of email or BD phone.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `AuthValidator.register` is implemented.
   */
  static register() {
    throw new NotImplementedError('AuthValidator.register');
  }

  /**
   * Login credentials: email or phone (FR-A4) plus the password.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `AuthValidator.login` is implemented.
   */
  static login() {
    throw new NotImplementedError('AuthValidator.login');
  }

  /**
   * Account-verification token from the emailed link.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `AuthValidator.verify` is implemented.
   */
  static verify() {
    throw new NotImplementedError('AuthValidator.verify');
  }

  /**
   * Identifier the reset link should be sent to.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `AuthValidator.forgotPassword` is implemented.
   */
  static forgotPassword() {
    throw new NotImplementedError('AuthValidator.forgotPassword');
  }

  /**
   * Reset token plus the replacement password.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `AuthValidator.resetPassword` is implemented.
   */
  static resetPassword() {
    throw new NotImplementedError('AuthValidator.resetPassword');
  }
}
