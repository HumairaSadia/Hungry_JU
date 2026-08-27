'use client';

/**
 * @file Sticky cart summary shown while browsing a menu.
 *
 * Presentation only: it renders the count and subtotal the API returned (NFR-12).
 *
 * @module components/student/CartSummaryBar
 */

import Link from 'next/link';
import { formatTaka } from '@/lib/format';

/**
 * Bar pinned to the bottom of a shop page once the cart holds something.
 *
 * @param {object} props - Component props.
 * @param {import('@/lib/cart-client').CartPayload} props.cart - Current cart.
 * @returns {import('react').ReactNode} The bar, or `null` while the cart is empty.
 */
export default function CartSummaryBar({ cart }) {
  if (!cart || cart.itemCount < 1) {
    return null;
  }

  const units = `${cart.itemCount} item${cart.itemCount === 1 ? '' : 's'}`;

  return (
    <div className="bg-background sticky bottom-0 mt-6 border-t border-black/10 py-3 dark:border-white/10">
      <Link
        href="/cart"
        className="bg-foreground text-background flex items-center justify-between rounded-full px-5 py-3"
      >
        <span className="text-sm font-medium">
          {units} &middot; {formatTaka(cart.subtotal)}
        </span>
        <span className="text-sm font-medium">View cart</span>
      </Link>
    </div>
  );
}
