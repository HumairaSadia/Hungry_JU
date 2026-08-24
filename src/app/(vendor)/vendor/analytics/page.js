/**
 * @file View for `/vendor/analytics`.
 *
 * Presentation only: the view renders state and forwards intent to the API through
 * `ApiClient`. Business rules and authorization stay server-side (NFR-12).
 *
 * @module app/(vendor)/vendor/analytics/page
 */

/**
 * HJU-B06 orders per day, revenue, top items. View only: all rules live behind the API (NFR-12).
 *
 * @returns {import('react').ReactNode} Rendered view; `null` until the markup is built.
 */
export default function VendorAnalyticsPage() {
  return null;
}
