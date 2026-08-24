/**
 * @file View for `/shops/[shopId]`.
 *
 * Presentation only: the view renders state and forwards intent to the API through
 * `ApiClient`. Business rules and authorization stay server-side (NFR-12).
 *
 * @module app/(student)/shops/[shopId]/page
 */

/**
 * HJU-C02 menu with prices and availability badges. View only: all rules live behind the API (NFR-12).
 *
 * @returns {import('react').ReactNode} Rendered view; `null` until the markup is built.
 */
export default function ShopMenuPage() {
  return null;
}
