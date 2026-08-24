/**
 * @file Zod schemas for the admin payloads.
 *
 * Validation is server-side and whitelist-based: unknown keys are dropped and any
 * client-side check is treated as UX only (SRS section 9). Schemas live here rather
 * than in the controllers so a client form can reuse one without importing server code.
 *
 * @module server/validators/admin-validator
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/** Admin payloads. A rejection or suspension always carries a reason (FR-G1, FR-G2). */
export class AdminValidator {
  /**
   * Approve/reject decision on a shop application; a rejection must carry a reason.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `AdminValidator.vendorDecision` is implemented.
   */
  static vendorDecision() {
    throw new NotImplementedError('AdminValidator.vendorDecision');
  }

  /**
   * Suspension or reactivation of an account, with the justification.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `AdminValidator.userStatusChange` is implemented.
   */
  static userStatusChange() {
    throw new NotImplementedError('AdminValidator.userStatusChange');
  }

  /**
   * Dispute outcome plus the note recorded on the audit row.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `AdminValidator.disputeResolution` is implemented.
   */
  static disputeResolution() {
    throw new NotImplementedError('AdminValidator.disputeResolution');
  }

  /**
   * Tunable parameters of FR-G6: fee, cancel window, accept timeout.
   *
   * @returns {import('@/shared/types').Schema} Schema the validation middleware
   *   applies to the request.
   * @throws {NotImplementedError} Until `AdminValidator.systemConfig` is implemented.
   */
  static systemConfig() {
    throw new NotImplementedError('AdminValidator.systemConfig');
  }
}
