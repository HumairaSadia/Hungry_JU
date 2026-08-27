'use client';

/**
 * @file One menu item row on a shop page (HJU-C02).
 *
 * Presentation only: price and availability arrive from the API already decided.
 *
 * @module components/student/MenuItemCard
 */

import AddToCartButton from '@/components/student/AddToCartButton';
import { formatTaka } from '@/lib/format';

/**
 * Menu item with its price, availability badge, and add-to-cart control.
 *
 * @param {object} props - Component props.
 * @param {{ id: string, name: string, description?: string, price: number,
 *   category?: string, isAvailable?: boolean, prepTimeMin?: number }} props.item - Menu item
 *   from the API.
 * @param {boolean} [props.shopOpen] - Whether the shop is currently accepting orders (BR-07).
 * @param {(cart: import('@/lib/cart-client').CartPayload) => void} [props.onCartChange] -
 *   Called with the updated cart after a successful add.
 * @returns {import('react').ReactNode} The card.
 */
export default function MenuItemCard({ item, shopOpen = true, onCartChange }) {
  const soldOut = item.isAvailable === false;
  const blocked = soldOut || !shopOpen;

  return (
    <li className="flex items-start justify-between gap-4 border-b border-black/10 py-4 last:border-b-0 dark:border-white/10">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-medium">{item.name}</h3>
          {soldOut && (
            <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs dark:bg-white/15">
              Sold out
            </span>
          )}
        </div>
        {item.description && (
          <p className="mt-1 line-clamp-2 text-sm text-black/60 dark:text-white/60">
            {item.description}
          </p>
        )}
        <p className="mt-1 text-sm font-medium">
          {formatTaka(item.price)}
          {item.prepTimeMin ? (
            <span className="ml-2 font-normal text-black/50 dark:text-white/50">
              ~{item.prepTimeMin} min
            </span>
          ) : null}
        </p>
      </div>

      <AddToCartButton
        menuItemId={item.id}
        itemName={item.name}
        disabled={blocked}
        disabledReason={soldOut ? 'Sold out' : 'Shop is closed'}
        onCartChange={onCartChange}
      />
    </li>
  );
}
