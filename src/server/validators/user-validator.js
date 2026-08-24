/**
 * @file Zod schemas for the profile payloads.
 *
 * Validation is server-side and whitelist-based: unknown keys are dropped and any
 * client-side check is treated as UX only (SRS section 9). Schemas live here rather
 * than in the controllers so a client form can reuse one without importing server code.
 *
 * @module server/validators/user-validator
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/** Profile payloads. Photo and gender are optional by decision (SRS section 5.1). */
export class UserValidator {
  /**
   * Editable profile fields.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `UserValidator.updateProfile` is implemented.
   */
  static updateProfile() {
    throw new NotImplementedError('UserValidator.updateProfile');
  }

  /**
   * Hall and room of the default drop-off location.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `UserValidator.updateLocation` is implemented.
   */
  static updateLocation() {
    throw new NotImplementedError('UserValidator.updateLocation');
  }

  /**
   * The Deliver Mode toggle value.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `UserValidator.toggleDeliverMode` is implemented.
   */
  static toggleDeliverMode() {
    throw new NotImplementedError('UserValidator.toggleDeliverMode');
  }
}
