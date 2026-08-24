/**
 * @file View for `/cart`.
 *
 * Presentation only: the view renders state and forwards intent to the API through
 * `ApiClient`. Business rules and authorization stay server-side (NFR-12).
 *
 * @module app/(student)/cart/page
 */

/**
 * HJU-C05 single-vendor cart with live totals. View only: all rules live behind the API (NFR-12).
 *
 * @returns {import('react').ReactNode} Rendered view; `null` until the markup is built.
 */
export default function CartPage() {
  return null;
}
