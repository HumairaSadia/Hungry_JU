/**
 * @file Cart operations and the pre-checkout revalidation.
 *
 * @module server/services/cart-service
 */

import { BaseService } from '@/server/core/base-service';
import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Cart operations (FR-C4, FR-C5). Totals are recomputed server-side, never trusted from the
 * client.
 *
 * @augments BaseService
 */
export class CartService extends BaseService {
  /** @type {import('@/server/repositories/cart-repository').CartRepository} */
  #cartRepository;

  /** @type {import('@/server/repositories/menu-item-repository').MenuItemRepository} */
  #menuItemRepository;

  /** @type {import('@/server/repositories/shop-repository').ShopRepository} */
  #shopRepository;

  /**
   * @param {object} dependencies - Injected collaborators.
   * @param {import('@/server/repositories/cart-repository').CartRepository}
   *   dependencies.cartRepository - Cart storage.
   * @param {import('@/server/repositories/menu-item-repository').MenuItemRepository}
   *   dependencies.menuItemRepository - Prices and availability.
   * @param {import('@/server/repositories/shop-repository').ShopRepository}
   *   dependencies.shopRepository - Shop open state (BR-07).
   */
  constructor({ cartRepository, menuItemRepository, shopRepository }) {
    super();
    this.#cartRepository = cartRepository;
    this.#menuItemRepository = menuItemRepository;
    this.#shopRepository = shopRepository;
  }

  /**
   * Reads the actor's cart with fresh prices.
   *
   * @param {import('@/shared/types').Actor} _actor - Owning student.
   * @returns {Promise<import('@/server/models/cart').Cart>} The active cart, created empty
   *   when the student has none.
   * @throws {NotImplementedError} Until implemented.
   */
  async getCart(_actor) {
    throw new NotImplementedError('CartService.getCart');
  }

  /**
   * BR-03/BR-07: one shop per cart, and sold-out items are refused.
   *
   * @param {import('@/shared/types').Actor} _actor - Owning student.
   * @param {string} _menuItemId - Item to add.
   * @param {number} _quantity - Units to add.
   * @returns {Promise<import('@/server/models/cart').Cart>} The updated cart.
   * @throws {NotImplementedError} Until implemented.
   */
  async addItem(_actor, _menuItemId, _quantity) {
    throw new NotImplementedError('CartService.addItem');
  }

  /**
   * Sets the quantity of one line, removing it at zero.
   *
   * @param {import('@/shared/types').Actor} _actor - Owning student.
   * @param {string} _menuItemId - Item to change.
   * @param {number} _quantity - New quantity.
   * @returns {Promise<import('@/server/models/cart').Cart>} The updated cart.
   * @throws {NotImplementedError} Until implemented.
   */
  async updateQuantity(_actor, _menuItemId, _quantity) {
    throw new NotImplementedError('CartService.updateQuantity');
  }

  /**
   * Drops one line from the cart.
   *
   * @param {import('@/shared/types').Actor} _actor - Owning student.
   * @param {string} _menuItemId - Item to remove.
   * @returns {Promise<import('@/server/models/cart').Cart>} The updated cart.
   * @throws {NotImplementedError} Until implemented.
   */
  async removeItem(_actor, _menuItemId) {
    throw new NotImplementedError('CartService.removeItem');
  }

  /**
   * Empties the cart, releasing its shop lock (BR-03).
   *
   * @param {import('@/shared/types').Actor} _actor - Owning student.
   * @returns {Promise<void>} Resolves once cleared.
   * @throws {NotImplementedError} Until implemented.
   */
  async clearCart(_actor) {
    throw new NotImplementedError('CartService.clearCart');
  }

  /**
   * UC-01 step 6: re-check shop state, availability, and prices before checkout.
   *
   * @param {import('@/shared/types').Actor} _actor - Owning student.
   * @returns {Promise<import('@/server/models/cart').Cart>} The cart, proven checkout-able.
   * @throws {NotImplementedError} Until implemented.
   */
  async revalidateForCheckout(_actor) {
    throw new NotImplementedError('CartService.revalidateForCheckout');
  }

  /**
   * Object-level guard: a cart is reachable only by the student who owns it.
   *
   * @override
   * @param {import('@/shared/types').Actor} _actor - Requesting principal.
   * @param {import('@/server/models/cart').Cart} _cart - Cart being touched.
   * @returns {void} Returns nothing when allowed.
   * @throws {NotImplementedError} Until implemented.
   */
  assertOwnership(_actor, _cart) {
    throw new NotImplementedError('CartService.assertOwnership');
  }
}
