/**
 * @file View for `/deliver/active`.
 *
 * Presentation only: the view renders state and forwards intent to the API through
 * `ApiClient`. Business rules and authorization stay server-side (NFR-12).
 *
 * @module app/(student)/deliver/active/page
 */

/**
 * SRS 8.2 pickup details, status buttons, PIN entry. View only: all rules live behind the API (NFR-12).
 *
 * @returns {import('react').ReactNode} Rendered view; `null` until the markup is built.
 */
export default function ActiveDeliveryPage() {
  return null;
}
