/**
 * @file View for `/admin/vendors`.
 *
 * Presentation only: the view renders state and forwards intent to the API through
 * `ApiClient`. Business rules and authorization stay server-side (NFR-12).
 *
 * @module app/(admin)/admin/vendors/page
 */

/**
 * HJU-G01 approval queue with reason capture. View only: all rules live behind the API (NFR-12).
 *
 * @returns {import('react').ReactNode} Rendered view; `null` until the markup is built.
 */
export default function AdminVendorQueuePage() {
  return null;
}
