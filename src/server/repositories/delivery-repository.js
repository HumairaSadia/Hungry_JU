/**
 * @file Data access for the `deliveries` table, including the atomic claim.
 *
 * @module server/repositories/delivery-repository
 */

import { BaseRepository } from '@/server/core/base-repository';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Data access for `deliveries`. UNIQUE(order_id) is the schema-level guard for FR-D3.
 *
 * @augments BaseRepository
 */
export class DeliveryRepository extends BaseRepository {
  /**
   * @param {unknown} db - Database client.
   */
  constructor(db) {
    super(db, 'deliveries');
  }

  /**
   * Atomic first-accept-wins claim: inserts the delivery row and flips the order status
   * in one conditional statement. Losers get zero rows back, never a second assignment.
   *
   * @param {string} _orderId - Order being claimed.
   * @param {string} _riderUserId - Rider attempting the claim.
   * @param {import('@/shared/types').OrderStatus} _expectedOrderStatus - Status the order must
   *   still be in for the claim to win.
   * @returns {Promise<import('@/server/models/delivery').Delivery | null>} The delivery when
   *   this caller won, `null` when another rider got there first (service maps that to a 409).
   * @throws {NotImplementedError} Until implemented.
   */
  async claimOrder(_orderId, _riderUserId, _expectedOrderStatus) {
    throw new NotImplementedError('DeliveryRepository.claimOrder');
  }

  /**
   * Loads the delivery attached to an order.
   *
   * @param {string} _orderId - Order id.
   * @returns {Promise<import('@/server/models/delivery').Delivery | null>} Delivery, or `null`.
   * @throws {NotImplementedError} Until implemented.
   */
  async findByOrderId(_orderId) {
    throw new NotImplementedError('DeliveryRepository.findByOrderId');
  }

  /**
   * FR-D4: a rider holds at most one active delivery.
   *
   * @param {string} _riderUserId - Rider to check.
   * @returns {Promise<import('@/server/models/delivery').Delivery | null>} The active
   *   delivery, or `null` when the rider is free.
   * @throws {NotImplementedError} Until implemented.
   */
  async findActiveByRiderId(_riderUserId) {
    throw new NotImplementedError('DeliveryRepository.findActiveByRiderId');
  }

  /**
   * Past deliveries for the rider's history screen.
   *
   * @param {string} _riderUserId - Rider to list.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/server/models/delivery').Delivery[]>} Completed deliveries.
   * @throws {NotImplementedError} Until implemented.
   */
  async findHistoryByRiderId(_riderUserId, _pagination) {
    throw new NotImplementedError('DeliveryRepository.findHistoryByRiderId');
  }

  /**
   * Conditional status update; zero rows mean the delivery already moved on.
   *
   * @param {string} _deliveryId - Delivery to move.
   * @param {import('@/shared/types').DeliveryStatus} _expectedStatus - Status required for the
   *   update to apply.
   * @param {import('@/shared/types').DeliveryStatus} _newStatus - Status to write.
   * @param {string} [_timestampField] - Column to stamp with the current time, e.g.
   *   `picked_up_at`.
   * @returns {Promise<boolean>} `true` when the update applied.
   * @throws {NotImplementedError} Until implemented.
   */
  async updateStatusIf(_deliveryId, _expectedStatus, _newStatus, _timestampField) {
    throw new NotImplementedError('DeliveryRepository.updateStatusIf');
  }

  /**
   * Totals a rider's earnings for the earnings screen (FR-D7).
   *
   * @param {string} _riderUserId - Rider to total.
   * @param {'day' | 'week' | 'month' | 'all'} _period - Window to sum over.
   * @returns {Promise<number>} Earnings in poisha.
   * @throws {NotImplementedError} Until implemented.
   */
  async sumEarnings(_riderUserId, _period) {
    throw new NotImplementedError('DeliveryRepository.sumEarnings');
  }

  /**
   * UC-02 E1: accepted long ago, never picked up — admin alert plus release offer.
   *
   * @param {number} _minutes - Age threshold in minutes.
   * @returns {Promise<import('@/server/models/delivery').Delivery[]>} Stalled deliveries.
   * @throws {NotImplementedError} Until implemented.
   */
  async findStalledPickups(_minutes) {
    throw new NotImplementedError('DeliveryRepository.findStalledPickups');
  }

  /**
   * Maps a `deliveries` row onto its entity.
   *
   * @param {import('@/shared/types').PersistenceRow} _row - Row from `deliveries`.
   * @returns {import('@/server/models/delivery').Delivery} Hydrated delivery.
   * @throws {NotImplementedError} Until implemented.
   */
  toModel(_row) {
    throw new NotImplementedError('DeliveryRepository.toModel');
  }
}
