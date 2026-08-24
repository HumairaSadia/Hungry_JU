/**
 * @file Read-only aggregates for the vendor and admin dashboards.
 *
 * @module server/services/analytics-service
 */

import { BaseService } from '@/server/core/base-service';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Inclusive date window an aggregate is computed over.
 *
 * @typedef {object} DateRange
 * @property {Date} from - Start of the window.
 * @property {Date} to - End of the window.
 */

/**
 * Read-only aggregates for vendor and admin dashboards (FR-B6, FR-G5).
 *
 * @augments BaseService
 */
export class AnalyticsService extends BaseService {
  /** @type {import('@/server/repositories/order-repository').OrderRepository} */
  #orderRepository;

  /** @type {import('@/server/repositories/delivery-repository').DeliveryRepository} */
  #deliveryRepository;

  /** @type {import('@/server/repositories/user-repository').UserRepository} */
  #userRepository;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/repositories/order-repository').OrderRepository}
   *   dependencies.orderRepository - Order counts and revenue.
   * @param {import('@/server/repositories/delivery-repository').DeliveryRepository}
   *   dependencies.deliveryRepository - Delivery timings.
   * @param {import('@/server/repositories/user-repository').UserRepository}
   *   dependencies.userRepository - Account totals for the platform overview.
   */
  constructor({ orderRepository, deliveryRepository, userRepository }) {
    super();
    this.#orderRepository = orderRepository;
    this.#deliveryRepository = deliveryRepository;
    this.#userRepository = userRepository;
  }

  /**
   * Orders and revenue per day for one shop (FR-B6).
   *
   * @param {import('@/shared/types').Actor} _actor - Owning vendor.
   * @param {string} _shopId - Shop to report on.
   * @param {DateRange} _dateRange - Window to cover.
   * @returns {Promise<Array<{ date: string, orderCount: number, revenue: number }>>} Daily rows.
   * @throws {NotImplementedError} Until implemented.
   */
  async vendorDailySummary(_actor, _shopId, _dateRange) {
    throw new NotImplementedError('AnalyticsService.vendorDailySummary');
  }

  /**
   * Best-selling items for one shop.
   *
   * @param {import('@/shared/types').Actor} _actor - Owning vendor.
   * @param {string} _shopId - Shop to report on.
   * @param {number} _limit - How many items to return.
   * @returns {Promise<Array<{ itemName: string, unitsSold: number }>>} Ranked items.
   * @throws {NotImplementedError} Until implemented.
   */
  async vendorTopItems(_actor, _shopId, _limit) {
    throw new NotImplementedError('AnalyticsService.vendorTopItems');
  }

  /**
   * Peak-hour histogram; the lunch spike is the operational risk R1.
   *
   * @param {import('@/shared/types').Actor} _actor - Owning vendor.
   * @param {string} _shopId - Shop to report on.
   * @returns {Promise<Array<{ hour: number, orderCount: number }>>} Orders per hour.
   * @throws {NotImplementedError} Until implemented.
   */
  async vendorPeakHours(_actor, _shopId) {
    throw new NotImplementedError('AnalyticsService.vendorPeakHours');
  }

  /**
   * Platform-wide totals for the admin dashboard.
   *
   * @param {import('@/shared/types').Actor} _admin - Acting admin.
   * @param {DateRange} _dateRange - Window to cover.
   * @returns {Promise<Record<string, number>>} Headline figures.
   * @throws {NotImplementedError} Until implemented.
   */
  async platformOverview(_admin, _dateRange) {
    throw new NotImplementedError('AnalyticsService.platformOverview');
  }

  /**
   * Share of orders cancelled or rejected, a health signal for risk R1.
   *
   * @param {import('@/shared/types').Actor} _admin - Acting admin.
   * @param {DateRange} _dateRange - Window to cover.
   * @returns {Promise<number>} Rate between 0 and 1.
   * @throws {NotImplementedError} Until implemented.
   */
  async cancellationRate(_admin, _dateRange) {
    throw new NotImplementedError('AnalyticsService.cancellationRate');
  }

  /**
   * Mean minutes from placement to delivery.
   *
   * @param {import('@/shared/types').Actor} _admin - Acting admin.
   * @param {DateRange} _dateRange - Window to cover.
   * @returns {Promise<number>} Average duration in minutes.
   * @throws {NotImplementedError} Until implemented.
   */
  async averageDeliveryTime(_admin, _dateRange) {
    throw new NotImplementedError('AnalyticsService.averageDeliveryTime');
  }
}
