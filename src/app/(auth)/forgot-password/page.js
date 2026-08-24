/**
 * @file View for `/forgot-password`.
 *
 * Presentation only: the view renders state and forwards intent to the API through
 * `ApiClient`. Business rules and authorization stay server-side (NFR-12).
 *
 * @module app/(auth)/forgot-password/page
 */

/**
 * HJU-A03 request a reset link. View only: all rules live behind the API (NFR-12).
 *
 * @returns {import('react').ReactNode} Rendered view; `null` until the markup is built.
 */
export default function ForgotPasswordPage() {
  return null;
}
