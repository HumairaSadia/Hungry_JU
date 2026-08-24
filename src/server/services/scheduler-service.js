/**
 * @file Timed jobs run by the System Scheduler actor.
 *
 * @module server/services/scheduler-service
 */

import { BaseService } from '@/server/core/base-service';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * The System Scheduler actor of SRS section 3: timed jobs nobody triggers by hand.
 * Jobs must be idempotent — a serverless cron can fire the same tick twice.
 *
 * @augments BaseService
 */
export class SchedulerService extends BaseService {
  /** @type {import('@/server/services/order-service').OrderService} */
  #orderService;

  /** @type {import('@/server/services/delivery-assignment-service').DeliveryAssignmentService} */
  #assignmentService;

  /** @type {import('@/server/repositories/shop-repository').ShopRepository} */
  #shopRepository;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/services/order-service').OrderService} dependencies.orderService -
   *   Performs the auto-cancel (BR-11).
   * @param {import('@/server/services/delivery-assignment-service').DeliveryAssignmentService}
   *   dependencies.assignmentService - Handles stalled pickups.
   * @param {import('@/server/repositories/shop-repository').ShopRepository}
   *   dependencies.shopRepository - Auto-closes idle shops.
   */
  constructor({ orderService, assignmentService, shopRepository }) {
    super();
    this.#orderService = orderService;
    this.#assignmentService = assignmentService;
    this.#shopRepository = shopRepository;
  }

  /**
   * BR-11: vendor did not answer inside the timeout, so the order auto-cancels.
   *
   * @returns {Promise<number>} How many orders were cancelled this tick.
   * @throws {NotImplementedError} Until implemented.
   */
  async runVendorAcceptTimeoutJob() {
    throw new NotImplementedError('SchedulerService.runVendorAcceptTimeoutJob');
  }

  /**
   * UC-02 E1: accepted but not picked up.
   *
   * @returns {Promise<number>} How many deliveries were flagged this tick.
   * @throws {NotImplementedError} Until implemented.
   */
  async runStalledPickupJob() {
    throw new NotImplementedError('SchedulerService.runStalledPickupJob');
  }

  /**
   * Risk R3: shops left open with no activity get closed automatically.
   *
   * @returns {Promise<number>} How many shops were closed this tick.
   * @throws {NotImplementedError} Until implemented.
   */
  async runShopAutoCloseJob() {
    throw new NotImplementedError('SchedulerService.runShopAutoCloseJob');
  }

  /**
   * Alerts admins about ready orders no rider has claimed.
   *
   * @returns {Promise<number>} How many orders were alerted on this tick.
   * @throws {NotImplementedError} Until implemented.
   */
  async runUnassignedOrderAlertJob() {
    throw new NotImplementedError('SchedulerService.runUnassignedOrderAlertJob');
  }
}
