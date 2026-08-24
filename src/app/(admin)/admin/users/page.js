/**
 * @file View for `/admin/users`.
 *
 * Presentation only: the view renders state and forwards intent to the API through
 * `ApiClient`. Business rules and authorization stay server-side (NFR-12).
 *
 * @module app/(admin)/admin/users/page
 */

/**
 * HJU-G02 suspend and reactivate accounts. View only: all rules live behind the API (NFR-12).
 *
 * @returns {import('react').ReactNode} Rendered view; `null` until the markup is built.
 */
export default function AdminUsersPage() {
  return null;
}
