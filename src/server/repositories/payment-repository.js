/**
 * @file Data access for `payments` and `payout_splits`.
 *
 * @module server/repositories/payment-repository
 */

import { BaseRepository } from '@/server/core/base-repository';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Data access for `payments` and `payout_splits`. Escrow methods stay dormant until Phase 2.
 *
 * @augments BaseRepository
 */
export class PaymentRepository extends BaseRepository {
  /**
   * @param {unknown} db - Database client.
   */
  constructor(db) {
    super(db, 'payments');
  }

  /**
   * Loads the payment record attached to an order.
   *
   * @param {string} _orderId - Order id.
   * @returns {Promise<import('@/server/models/payment').Payment | null>} Payment, or `null`.
   * @throws {NotImplementedError} Until implemented.
   */
  async findByOrderId(_orderId) {
    throw new NotImplementedError('PaymentRepository.findByOrderId');
  }

  /**
   * Records the payment for a freshly placed order (COD in the MVP).
   *
   * @param {import('@/server/models/payment').Payment} _payment - Payment to store.
   * @returns {Promise<import('@/server/models/payment').Payment>} Stored payment.
   * @throws {NotImplementedError} Until implemented.
   */
  async createForOrder(_payment) {
    throw new NotImplementedError('PaymentRepository.createForOrder');
  }

  /**
   * Moves a payment between escrow states (Phase 2).
   *
   * @param {string} _paymentId - Payment to update.
   * @param {string} _escrowStatus - New escrow state.
   * @returns {Promise<void>} Resolves once written.
   * @throws {NotImplementedError} Until implemented.
   */
  async updateEscrowStatus(_paymentId, _escrowStatus) {
    throw new NotImplementedError('PaymentRepository.updateEscrowStatus');
  }

  /**
   * Writes the per-payee split rows for one payment (Phase 2).
   *
   * @param {string} _paymentId - Owning payment.
   * @param {import('@/server/models/payout-split').PayoutSplit[]} _splits - Splits to store.
   * @returns {Promise<import('@/server/models/payout-split').PayoutSplit[]>} Stored splits.
   * @throws {NotImplementedError} Until implemented.
   */
  async createSplits(_paymentId, _splits) {
    throw new NotImplementedError('PaymentRepository.createSplits');
  }

  /**
   * Loads the splits of one payment.
   *
   * @param {string} _paymentId - Owning payment.
   * @returns {Promise<import('@/server/models/payout-split').PayoutSplit[]>} Splits.
   * @throws {NotImplementedError} Until implemented.
   */
  async findSplits(_paymentId) {
    throw new NotImplementedError('PaymentRepository.findSplits');
  }

  /**
   * Maps a `payments` row onto its entity.
   *
   * @param {import('@/shared/types').PersistenceRow} _row - Row from `payments`.
   * @returns {import('@/server/models/payment').Payment} Hydrated payment.
   * @throws {NotImplementedError} Until implemented.
   */
  toModel(_row) {
    throw new NotImplementedError('PaymentRepository.toModel');
  }
}
