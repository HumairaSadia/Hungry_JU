/**
 * @file Layout shell for the `(vendor)` route group.
 *
 * Presentation only: the view renders state and forwards intent to the API through
 * `ApiClient`. Business rules and authorization stay server-side (NFR-12).
 *
 * @module app/(vendor)/layout
 */

/**
 * Vendor shell. Role is enforced server-side; this layout only shapes the chrome.
 *
 * @param {object} props - Component props.
 * @param {import('react').ReactNode} props.children - Nested route segment to render
 *   inside this shell.
 * @returns {import('react').ReactNode} The wrapped subtree.
 */
export default function VendorLayout({ children }) {
  return children;
}
