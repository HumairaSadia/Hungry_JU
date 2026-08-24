/**
 * @file View for `/vendor/dashboard`.
 *
 * Presentation only: the view renders state and forwards intent to the API through
 * `ApiClient`. Business rules and authorization stay server-side (NFR-12).
 *
 * @module app/(vendor)/vendor/dashboard/page
 */

/**
 * SRS 8.3 shop status, approval banner, today summary. View only: all rules live behind the API (NFR-12).
 *
 * @returns {import('react').ReactNode} Rendered view; `null` until the markup is built.
 */
export default function VendorDashboardPage() {
  return null;
}
