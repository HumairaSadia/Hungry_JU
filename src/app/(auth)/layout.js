/**
 * @file Layout shell for the `(auth)` route group.
 *
 * Presentation only: the view renders state and forwards intent to the API through
 * `ApiClient`. Business rules and authorization stay server-side (NFR-12).
 *
 * @module app/(auth)/layout
 */

/**
 * Shell for unauthenticated screens; redirects an already-signed-in user to their dashboard.
 *
 * @param {object} props - Component props.
 * @param {import('react').ReactNode} props.children - Nested route segment to render
 *   inside this shell.
 * @returns {import('react').ReactNode} The wrapped subtree.
 */
export default function AuthLayout({ children }) {
  return children;
}
