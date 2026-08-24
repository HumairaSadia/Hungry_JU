/**
 * @file Layout shell for the `(student)` route group.
 *
 * Presentation only: the view renders state and forwards intent to the API through
 * `ApiClient`. Business rules and authorization stay server-side (NFR-12).
 *
 * @module app/(student)/layout
 */

/**
 * Student shell: bottom nav, cart badge, notification bell, Order/Deliver mode switch.
 *
 * @param {object} props - Component props.
 * @param {import('react').ReactNode} props.children - Nested route segment to render
 *   inside this shell.
 * @returns {import('react').ReactNode} The wrapped subtree.
 */
export default function StudentLayout({ children }) {
  return children;
}
