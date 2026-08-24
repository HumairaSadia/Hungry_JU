/**
 * @file Menu CRUD, availability, and student-facing search.
 *
 * @module server/services/menu-service
 */

import { BaseService } from '@/server/core/base-service';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Menu item CRUD, availability toggles, and student search (FR-B2, FR-C2, FR-C3).
 *
 * @augments BaseService
 */
export class MenuService extends BaseService {
  /** @type {import('@/server/repositories/menu-item-repository').MenuItemRepository} */
  #menuItemRepository;

  /** @type {import('@/server/repositories/shop-repository').ShopRepository} */
  #shopRepository;

  /** @type {import('@/server/services/audit-service').AuditService} */
  #auditService;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/repositories/menu-item-repository').MenuItemRepository}
   *   dependencies.menuItemRepository - Menu storage.
   * @param {import('@/server/repositories/shop-repository').ShopRepository}
   *   dependencies.shopRepository - Shop storage, for ownership checks.
   * @param {import('@/server/services/audit-service').AuditService} dependencies.auditService -
   *   Records menu changes (BR-09).
   */
  constructor({ menuItemRepository, shopRepository, auditService }) {
    super();
    this.#menuItemRepository = menuItemRepository;
    this.#shopRepository = shopRepository;
    this.#auditService = auditService;
  }

  /**
   * Adds an item to the vendor's own menu (FR-B2).
   *
   * @param {import('@/shared/types').Actor} _actor - Owning vendor.
   * @param {string} _shopId - Shop the item belongs to.
   * @param {Record<string, unknown>} _payload - Validated item fields.
   * @returns {Promise<import('@/server/models/menu-item').MenuItem>} The created item.
   * @throws {NotImplementedError} Until implemented.
   */
  async createItem(_actor, _shopId, _payload) {
    throw new NotImplementedError('MenuService.createItem');
  }

  /**
   * Edits an existing item; past orders keep their price snapshots.
   *
   * @param {import('@/shared/types').Actor} _actor - Owning vendor.
   * @param {string} _itemId - Item to edit.
   * @param {Record<string, unknown>} _changes - Validated, whitelisted fields.
   * @returns {Promise<import('@/server/models/menu-item').MenuItem>} The updated item.
   * @throws {NotImplementedError} Until implemented.
   */
  async updateItem(_actor, _itemId, _changes) {
    throw new NotImplementedError('MenuService.updateItem');
  }

  /**
   * Removes an item from the menu.
   *
   * @param {import('@/shared/types').Actor} _actor - Owning vendor.
   * @param {string} _itemId - Item to remove.
   * @returns {Promise<void>} Resolves once removed.
   * @throws {NotImplementedError} Until implemented.
   */
  async deleteItem(_actor, _itemId) {
    throw new NotImplementedError('MenuService.deleteItem');
  }

  /**
   * One tap for the vendor; risk R3 says anything harder will not get used.
   *
   * @param {import('@/shared/types').Actor} _actor - Owning vendor.
   * @param {string} _itemId - Item to toggle.
   * @param {boolean} _isAvailable - Desired availability.
   * @returns {Promise<import('@/server/models/menu-item').MenuItem>} The updated item.
   * @throws {NotImplementedError} Until implemented.
   */
  async setAvailability(_actor, _itemId, _isAvailable) {
    throw new NotImplementedError('MenuService.setAvailability');
  }

  /**
   * Lists a shop's menu for students or for the vendor's own editor.
   *
   * @param {string} _shopId - Shop to list.
   * @param {{ availableOnly?: boolean, category?: string }} [_options] - Narrowing options.
   * @returns {Promise<import('@/server/models/menu-item').MenuItem[]>} Menu items.
   * @throws {NotImplementedError} Until implemented.
   */
  async listByShop(_shopId, _options) {
    throw new NotImplementedError('MenuService.listByShop');
  }

  /**
   * Partial matching plus filters and sort; sold-out items rank last, never hidden.
   *
   * @param {string} _term - Raw search term.
   * @param {import('@/shared/types').Criteria} _filters - Price, category, or shop filter.
   * @param {string} _sort - Sort key, e.g. `'price_asc'`.
   * @param {import('@/server/utils/pagination').Pagination} _pagination - Page window.
   * @returns {Promise<import('@/shared/types').PaginatedResult>} Matching items.
   * @throws {NotImplementedError} Until implemented.
   */
  async search(_term, _filters, _sort, _pagination) {
    throw new NotImplementedError('MenuService.search');
  }

  /**
   * Object-level guard: an item may only be edited by the vendor who owns its shop.
   *
   * @override
   * @param {import('@/shared/types').Actor} _actor - Requesting principal.
   * @param {import('@/server/models/menu-item').MenuItem} _menuItem - Item being touched.
   * @returns {void} Returns nothing when allowed.
   * @throws {NotImplementedError} Until implemented.
   */
  assertOwnership(_actor, _menuItem) {
    throw new NotImplementedError('MenuService.assertOwnership');
  }
}
