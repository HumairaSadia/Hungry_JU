/**
 * @file Delivery-confirmation PIN generation and verification.
 *
 * @module server/services/pin-service
 */

import { BaseService } from '@/server/core/base-service';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Delivery confirmation PIN (SRS section 12.4: 90% of the QR system's anti-fraud value
 * at 5% of the effort). Generated at order placement, shown only to the customer,
 * stored hashed so a database read cannot complete a delivery.
 *
 * @augments BaseService
 */
export class PinService extends BaseService {
  /**
   * Draws a fresh PIN of the configured length.
   *
   * @returns {string} Plaintext PIN, shown only on the customer's screen.
   * @throws {NotImplementedError} Until implemented.
   */
  generate() {
    throw new NotImplementedError('PinService.generate');
  }

  /**
   * Hashes a PIN for storage on the delivery row.
   *
   * @param {string} _plainPin - PIN as generated.
   * @returns {Promise<string>} Hash to persist.
   * @throws {NotImplementedError} Until implemented.
   */
  async hash(_plainPin) {
    throw new NotImplementedError('PinService.hash');
  }

  /**
   * Constant-time compare, rate-limited by the caller to block brute force.
   *
   * @param {string} _plainPin - PIN entered by the rider.
   * @param {string} _hash - Stored hash.
   * @returns {Promise<boolean>} `true` on a match.
   * @throws {NotImplementedError} Until implemented.
   */
  async verify(_plainPin, _hash) {
    throw new NotImplementedError('PinService.verify');
  }
}
