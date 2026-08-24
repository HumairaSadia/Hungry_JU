/**
 * @file Payment handling: COD today, escrow in Phase 2.
 *
 * @module server/services/payment-service
 */

import { BaseService } from '@/server/core/base-service';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * MVP is COD-Direct (SRS section 12.1): the rider fronts nothing, the customer pays cash
 * on delivery, and the platform takes no cut. Only recordCodSettlement is in MVP scope.
 * The escrow methods are the designed Phase 2 evolution and stay unimplemented on purpose.
 *
 * @augments BaseService
 */
export class PaymentService extends BaseService {
  /** @type {import('@/server/repositories/payment-repository').PaymentRepository} */
  #paymentRepository;

  /** @type {import('@/server/repositories/order-repository').OrderRepository} */
  #orderRepository;

  /** @type {import('@/server/services/audit-service').AuditService} */
  #auditService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/repositories/payment-repository').PaymentRepository}
   *   dependencies.paymentRepository - Payment and split storage.
   * @param {import('@/server/repositories/order-repository').OrderRepository}
   *   dependencies.orderRepository - Order totals being settled.
   * @param {import('@/server/services/audit-service').AuditService} dependencies.auditService -
   *   Records money movement (BR-09).
   */
  constructor({ paymentRepository, orderRepository, auditService }) {
    super();
    this.#paymentRepository = paymentRepository;
    this.#orderRepository = orderRepository;
    this.#auditService = auditService;
  }

  /**
   * MVP: records that cash changed hands so earnings and analytics have a source.
   *
   * @param {import('@/shared/types').Actor} _actor - Rider or vendor confirming settlement.
   * @param {string} _orderId - Order that was paid.
   * @returns {Promise<import('@/server/models/payment').Payment>} The settlement record.
   * @throws {NotImplementedError} Until implemented.
   */
  async recordCodSettlement(_actor, _orderId) {
    throw new NotImplementedError('PaymentService.recordCodSettlement');
  }

  /**
   * Phase 2 (HJU-F02).
   *
   * @param {import('@/shared/types').Actor} _actor - Paying student.
   * @param {string} _orderId - Order to pay for.
   * @param {string} _gateway - Gateway identifier.
   * @returns {Promise<{ redirectUrl: string }>} Where to send the payer.
   * @throws {NotImplementedError} Until implemented.
   */
  async initiateOnlinePayment(_actor, _orderId, _gateway) {
    throw new NotImplementedError('PaymentService.initiateOnlinePayment');
  }

  /**
   * Phase 2 (BR-12): release escrow only after the customer confirmed delivery.
   *
   * @param {string} _orderId - Order whose funds are released.
   * @returns {Promise<void>} Resolves once the splits are marked released.
   * @throws {NotImplementedError} Until implemented.
   */
  async releaseEscrow(_orderId) {
    throw new NotImplementedError('PaymentService.releaseEscrow');
  }

  /**
   * Phase 2 (SRS section 12.2): vendor is paid the food price minus commission and the
   * rider gets the delivery fee — two streams, not one percentage of the order total.
   *
   * @param {import('@/server/models/order').Order} _order - Order to split.
   * @returns {Promise<import('@/server/models/payout-split').PayoutSplit[]>} Per-payee splits.
   * @throws {NotImplementedError} Until implemented.
   */
  async computeSplits(_order) {
    throw new NotImplementedError('PaymentService.computeSplits');
  }

  /**
   * Returns money to the customer after a cancellation or dispute (Phase 2).
   *
   * @param {string} _orderId - Order to refund.
   * @param {string} _reason - Why the refund was issued.
   * @returns {Promise<void>} Resolves once the refund is recorded.
   * @throws {NotImplementedError} Until implemented.
   */
  async refund(_orderId, _reason) {
    throw new NotImplementedError('PaymentService.refund');
  }
}
