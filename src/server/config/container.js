/**
 * @file Dependency-injection container and its resolution tokens.
 *
 * @module server/config/container
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Tiny service locator wiring repositories into services into controllers.
 * Centralising construction keeps every class dependency-injected (SOLID: D)
 * and lets tests swap a repository for a fake without touching call sites.
 */
export class Container {
  /** @type {Container | null} */
  static #instance = null;

  /** @type {Map<symbol, () => unknown>} */
  #registry = new Map();

  /**
   * Process-wide container, created on first access.
   *
   * @returns {Container} The singleton container.
   * @throws {NotImplementedError} Until implemented.
   */
  static get instance() {
    throw new NotImplementedError('Container.instance');
  }

  /**
   * Registers a lazy factory under a token.
   *
   * @param {symbol} _token - Key from {@link TOKENS}.
   * @param {() => unknown} _factory - Builder invoked on first resolution.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  register(_token, _factory) {
    throw new NotImplementedError('Container.register');
  }

  /**
   * Resolves a token, memoising singletons.
   *
   * @param {symbol} _token - Key from {@link TOKENS}.
   * @returns {unknown} The registered instance.
   * @throws {NotImplementedError} Until implemented.
   */
  resolve(_token) {
    throw new NotImplementedError('Container.resolve');
  }

  /**
   * Registers every repository, service, and controller of the application.
   *
   * @returns {Container} The bootstrapped container.
   * @throws {NotImplementedError} Until implemented.
   */
  static bootstrap() {
    throw new NotImplementedError('Container.bootstrap');
  }

  /**
   * Clears every registration and memoised instance; used between tests.
   *
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  reset() {
    throw new NotImplementedError('Container.reset');
  }
}

/**
 * Resolution tokens; string keys would invite typos.
 *
 * @type {Readonly<Record<string, symbol>>}
 */
export const TOKENS = Object.freeze({
  DB: Symbol('db'),
  USER_REPOSITORY: Symbol('userRepository'),
  STUDENT_PROFILE_REPOSITORY: Symbol('studentProfileRepository'),
  SHOP_REPOSITORY: Symbol('shopRepository'),
  MENU_ITEM_REPOSITORY: Symbol('menuItemRepository'),
  CART_REPOSITORY: Symbol('cartRepository'),
  ORDER_REPOSITORY: Symbol('orderRepository'),
  DELIVERY_REPOSITORY: Symbol('deliveryRepository'),
  PAYMENT_REPOSITORY: Symbol('paymentRepository'),
  RATING_REPOSITORY: Symbol('ratingRepository'),
  NOTIFICATION_REPOSITORY: Symbol('notificationRepository'),
  AUDIT_LOG_REPOSITORY: Symbol('auditLogRepository'),
  AUTH_SERVICE: Symbol('authService'),
  TOKEN_SERVICE: Symbol('tokenService'),
  PASSWORD_SERVICE: Symbol('passwordService'),
  USER_SERVICE: Symbol('userService'),
  SHOP_SERVICE: Symbol('shopService'),
  MENU_SERVICE: Symbol('menuService'),
  CART_SERVICE: Symbol('cartService'),
  ORDER_SERVICE: Symbol('orderService'),
  DELIVERY_SERVICE: Symbol('deliveryService'),
  ASSIGNMENT_SERVICE: Symbol('assignmentService'),
  PIN_SERVICE: Symbol('pinService'),
  RATING_SERVICE: Symbol('ratingService'),
  NOTIFICATION_SERVICE: Symbol('notificationService'),
  EMAIL_SERVICE: Symbol('emailService'),
  PAYMENT_SERVICE: Symbol('paymentService'),
  ADMIN_SERVICE: Symbol('adminService'),
  ANALYTICS_SERVICE: Symbol('analyticsService'),
  AUDIT_SERVICE: Symbol('auditService'),
  SCHEDULER_SERVICE: Symbol('schedulerService'),
});
