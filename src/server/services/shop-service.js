/**
 * @file Shop registration, open state, and the student browse index.
 *
 * @module server/services/shop-service
 */

import { BaseService } from '@/server/core/base-service';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Shop registration, open/close, and the student-facing browse index (Epic B, FR-C1).
 *
 * @augments BaseService
 */
export class ShopService extends BaseService {
  /** @type {import('@/server/repositories/shop-repository').ShopRepository} */
  #shopRepository;

  /** @type {import('@/server/repositories/menu-item-repository').MenuItemRepository} */
  #menuItemRepository;

  /** @type {import('@/server/services/audit-service').AuditService} */
  #auditService;

  /** @type {import('@/server/services/notification-service').NotificationService} */
  #notificationService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/repositories/shop-repository').ShopRepository}
   *   dependencies.shopRepository - Shop storage.
   * @param {import('@/server/repositories/menu-item-repository').MenuItemRepository}
   *   dependencies.menuItemRepository - Menu storage, for the shop detail view.
   * @param {import('@/server/services/audit-service').AuditService} dependencies.auditService -
   *   Records shop changes (BR-09).
   * @param {import('@/server/services/notification-service').NotificationService}
   *   dependencies.notificationService - Tells vendors about approval decisions.
   */
  constructor({ shopRepository, menuItemRepository, auditService, notificationService }) {
    super();
    this.#shopRepository = shopRepository;
    this.#menuItemRepository = menuItemRepository;
    this.#auditService = auditService;
    this.#notificationService = notificationService;
  }

  /**
   * FR-B1: submission lands as Pending; the vendor cannot self-approve.
   *
   * @param {import('@/shared/types').Actor} _actor - Registering vendor.
   * @param {Record<string, unknown>} _payload - Validated shop details.
   * @returns {Promise<import('@/server/models/shop').Shop>} The pending shop.
   * @throws {NotImplementedError} Until implemented.
   */
  async registerShop(_actor, _payload) {
    throw new NotImplementedError('ShopService.registerShop');
  }

  /**
   * Applies vendor edits to their own shop.
   *
   * @param {import('@/shared/types').Actor} _actor - Owning vendor.
   * @param {string} _shopId - Shop to edit.
   * @param {Record<string, unknown>} _changes - Validated, whitelisted fields.
   * @returns {Promise<import('@/server/models/shop').Shop>} The updated shop.
   * @throws {NotImplementedError} Until implemented.
   */
  async updateShop(_actor, _shopId, _changes) {
    throw new NotImplementedError('ShopService.updateShop');
  }

  /**
   * Opens or closes the shop for new orders (FR-B4).
   *
   * @param {import('@/shared/types').Actor} _actor - Owning vendor.
   * @param {string} _shopId - Shop to switch.
   * @param {boolean} _isOpen - Desired state.
   * @returns {Promise<import('@/server/models/shop').Shop>} The updated shop.
   * @throws {NotImplementedError} Until implemented.
   */
  async setOpenState(_actor, _shopId, _isOpen) {
    throw new NotImplementedError('ShopService.setOpenState');
  }

  /**
   * Browse index of approved, open shops (FR-C1).
   *
   * @param {import('@/shared/types').Criteria} _filters - Category or location filter.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/shared/types').PaginatedResult>} Shops plus page metadata.
   * @throws {NotImplementedError} Until implemented.
   */
  async listOrderableShops(_filters, _pagination) {
    throw new NotImplementedError('ShopService.listOrderableShops');
  }

  /**
   * HJU-C02: shop profile plus menu, read-only, no writes anywhere in this path.
   *
   * @param {string} _shopId - Shop to show.
   * @returns {Promise<{ shop: import('@/server/models/shop').Shop,
   *   menu: import('@/server/models/menu-item').MenuItem[] }>} Shop and its menu.
   * @throws {NotImplementedError} Until implemented.
   */
  async getShopWithMenu(_shopId) {
    throw new NotImplementedError('ShopService.getShopWithMenu');
  }

  /**
   * Name search over orderable shops.
   *
   * @param {string} _term - Raw search term.
   * @param {import('@/shared/types').Criteria} _filters - Extra filters.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/shared/types').PaginatedResult>} Matching shops.
   * @throws {NotImplementedError} Until implemented.
   */
  async searchShops(_term, _filters, _pagination) {
    throw new NotImplementedError('ShopService.searchShops');
  }

  /**
   * Object-level guard: a vendor may only touch the shop they own.
   *
   * @override
   * @param {import('@/shared/types').Actor} _actor - Requesting principal.
   * @param {import('@/server/models/shop').Shop} _shop - Shop being touched.
   * @returns {void} Returns nothing when allowed.
   * @throws {NotImplementedError} Until implemented.
   */
  assertOwnership(_actor, _shop) {
    throw new NotImplementedError('ShopService.assertOwnership');
  }
}
