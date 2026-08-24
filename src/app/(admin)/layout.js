/**
 * @file Layout shell for the `(admin)` route group.
 *
 * Presentation only: the view renders state and forwards intent to the API through
 * `ApiClient`. Business rules and authorization stay server-side (NFR-12).
 *
 * @module app/(admin)/layout
 */

/**
 * Admin shell. Role is enforced server-side; this layout only shapes the chrome.
 *
 * @param {object} props - Component props.
 * @param {import('react').ReactNode} props.children - Nested route segment to render
 *   inside this shell.
 * @returns {import('react').ReactNode} The wrapped subtree.
 */
export default function AdminLayout({ children }) {
  return children;
}
