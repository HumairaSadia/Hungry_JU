/**
 * @file View for `/deliver`.
 *
 * Presentation only: the view renders state and forwards intent to the API through
 * `ApiClient`. Business rules and authorization stay server-side (NFR-12).
 *
 * @module app/(student)/deliver/page
 */

/**
 * SRS 8.2 available orders feed (own orders hidden, BR-06). View only: all rules live behind the API (NFR-12).
 *
 * @returns {import('react').ReactNode} Rendered view; `null` until the markup is built.
 */
export default function DeliverFeedPage() {
  return null;
}
