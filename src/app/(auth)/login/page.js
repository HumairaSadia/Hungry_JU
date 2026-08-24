/**
 * @file View for `/login`.
 *
 * Presentation only: the view renders state and forwards intent to the API through
 * `ApiClient`. Business rules and authorization stay server-side (NFR-12).
 *
 * @module app/(auth)/login/page
 */

/**
 * HJU-A02 email or phone plus password. View only: all rules live behind the API (NFR-12).
 *
 * @returns {import('react').ReactNode} Rendered view; `null` until the markup is built.
 */
export default function LoginPage() {
  return null;
}
