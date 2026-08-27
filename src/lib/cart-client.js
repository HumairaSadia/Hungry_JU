/**
 * @file Cart endpoint bindings for the browser.
 *
 * One place that knows the cart URLs and payload shapes, so components express intent
 * (`addToCart(...)`) instead of repeating paths. No rules live here: the server decides
 * whether an add is allowed (BR-03, BR-07) and recomputes every total (NFR-12).
 *
 * @module lib/cart-client
 */

import { apiClient } from '@/lib/api-client';

/**
 * A cart line as returned by the API.
 *
 * @typedef {object} CartLine
 * @property {string} id - Cart line id, used by the quantity and remove endpoints.
 * @property {string} menuItemId - Item the line is for.
 * @property {number} quantity - Units in the cart.
 * @property {{ id: string, name: string, price: number, isAvailable: boolean }} [menuItem] -
 *   Joined menu item, when the API hydrated it.
 * @property {number} [lineTotal] - Server-computed line amount, in poisha.
 */

/**
 * The cart as returned by the API, with server-computed totals.
 *
 * @typedef {object} CartPayload
 * @property {string | null} id - Cart id, `null` while the student has no cart yet.
 * @property {string | null} shopId - Shop the cart is locked to (BR-03).
 * @property {CartLine[]} items - Cart lines.
 * @property {number} itemCount - Total units across all lines, for the nav badge.
 * @property {number} subtotal - Sum of the line totals, in poisha.
 */

/** Error code the API returns when BR-03 refuses an item from a second shop. */
export const SINGLE_SHOP_RULE_CODE = 'BUSINESS_RULE_03';

/**
 * Empty cart used before the first load and after a clear, so views never branch on
 * `null`.
 *
 * @type {CartPayload}
 */
export const EMPTY_CART = Object.freeze({
  id: null,
  shopId: null,
  items: [],
  itemCount: 0,
  subtotal: 0,
});

/**
 * Reads the acting student's cart with fresh totals.
 *
 * @param {AbortSignal} [signal] - Signal used to cancel the request on unmount.
 * @returns {Promise<CartPayload>} The current cart.
 */
export async function fetchCart(signal) {
  const payload = await apiClient.request('GET', '/api/cart', { signal });
  return normaliseCart(payload);
}

/**
 * Adds units of a menu item to the cart.
 *
 * @param {string} menuItemId - Item to add.
 * @param {number} quantity - Units to add; merges with an existing line (FR-C4).
 * @returns {Promise<CartPayload>} The updated cart.
 */
export async function addToCart(menuItemId, quantity) {
  const payload = await apiClient.post('/api/cart', { menuItemId, quantity });
  return normaliseCart(payload);
}

/**
 * Sets the quantity of one cart line.
 *
 * @param {string} itemId - Cart line id.
 * @param {number} quantity - New quantity; zero removes the line.
 * @returns {Promise<CartPayload>} The updated cart.
 */
export async function updateCartItem(itemId, quantity) {
  const payload = await apiClient.patch(`/api/cart/items/${itemId}`, { quantity });
  return normaliseCart(payload);
}

/**
 * Drops one line from the cart.
 *
 * @param {string} itemId - Cart line id.
 * @returns {Promise<CartPayload>} The updated cart.
 */
export async function removeCartItem(itemId) {
  const payload = await apiClient.delete(`/api/cart/items/${itemId}`);
  return normaliseCart(payload);
}

/**
 * Empties the cart, releasing its shop lock (BR-03).
 *
 * @returns {Promise<CartPayload>} The now-empty cart.
 */
export async function clearCart() {
  await apiClient.delete('/api/cart');
  return { ...EMPTY_CART };
}

/**
 * Fills in the fields a sparse cart response may omit, so views can read them directly.
 * Totals are only ever passed through — never recomputed here (NFR-12).
 *
 * @param {unknown} payload - Raw cart payload from the API.
 * @returns {CartPayload} Cart with every field present.
 */
export function normaliseCart(payload) {
  if (!payload || typeof payload !== 'object') {
    return { ...EMPTY_CART };
  }

  const cart = /** @type {Partial<CartPayload>} */ (payload);
  const items = Array.isArray(cart.items) ? cart.items : [];
  return {
    id: cart.id ?? null,
    shopId: cart.shopId ?? null,
    items,
    itemCount: cart.itemCount ?? items.reduce((sum, line) => sum + (line.quantity ?? 0), 0),
    subtotal: cart.subtotal ?? 0,
  };
}

/**
 * Whether a failure was BR-03 refusing an item from a different shop.
 *
 * @param {unknown} error - Error thrown by one of the cart calls.
 * @returns {boolean} `true` when the cart must be cleared before the add can succeed.
 */
export function isSingleShopConflict(error) {
  return (
    error instanceof Error &&
    'code' in error &&
    /** @type {{ code?: string }} */ (error).code === SINGLE_SHOP_RULE_CODE
  );
}
