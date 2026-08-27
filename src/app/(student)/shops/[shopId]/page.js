'use client';

/**
 * @file View for `/shops/[shopId]`.
 *
 * Presentation only: the view renders state and forwards intent to the API through
 * `ApiClient`. Business rules and authorization stay server-side (NFR-12).
 *
 * @module app/(student)/shops/[shopId]/page
 */

import { use, useCallback, useEffect, useState } from 'react';
import CartSummaryBar from '@/components/student/CartSummaryBar';
import MenuItemCard from '@/components/student/MenuItemCard';
import { apiClient } from '@/lib/api-client';
import { EMPTY_CART, normaliseCart } from '@/lib/cart-client';

/**
 * Reads a list payload that may arrive bare or wrapped in a pagination envelope.
 *
 * @param {unknown} payload - Response body.
 * @returns {object[]} The rows.
 */
function toList(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }
  const items = /** @type {{ items?: unknown }} */ (payload ?? {}).items;
  return Array.isArray(items) ? items : [];
}

/**
 * HJU-C02 menu with prices and availability badges. View only: all rules live behind the API (NFR-12).
 *
 * @param {object} props - Component props.
 * @param {Promise<{ shopId: string }>} props.params - Resolved dynamic route segments.
 * @returns {import('react').ReactNode} Rendered view.
 */
export default function ShopMenuPage({ params }) {
  const { shopId } = use(params);

  const [shop, setShop] = useState(null);
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState(EMPTY_CART);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [shopPayload, menuPayload] = await Promise.all([
          apiClient.request('GET', `/api/shops/${shopId}`, { signal: controller.signal }),
          apiClient.request('GET', `/api/shops/${shopId}/menu`, { signal: controller.signal }),
        ]);
        if (controller.signal.aborted) {
          return;
        }
        setShop(shopPayload);
        setMenu(toList(menuPayload));
      } catch (loadError) {
        if (!controller.signal.aborted) {
          setError(loadError.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    load();
    return () => controller.abort();
  }, [shopId]);

  useEffect(() => {
    const controller = new AbortController();

    // A failed cart read must not blank the menu: an anonymous or cart-less student still
    // browses, and the bar simply stays hidden.
    apiClient
      .request('GET', '/api/cart', { signal: controller.signal })
      .then((payload) => {
        if (!controller.signal.aborted) {
          setCart(normaliseCart(payload));
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  const handleCartChange = useCallback((updated) => setCart(updated), []);

  if (loading) {
    return <p className="p-6 text-sm text-black/60 dark:text-white/60">Loading menu…</p>;
  }

  if (error) {
    return (
      <p className="p-6 text-sm text-red-600 dark:text-red-400" role="alert">
        {error}
      </p>
    );
  }

  const shopOpen = shop?.isOrderable ?? shop?.isOpen ?? true;

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6">
      <header>
        <h1 className="text-xl font-semibold">{shop?.shopName ?? 'Shop'}</h1>
        <p className="mt-1 text-sm text-black/60 dark:text-white/60">
          {shop?.botTolaLocation}
          {shopOpen ? null : <span className="ml-2 font-medium">Closed right now</span>}
        </p>
      </header>

      {menu.length === 0 ? (
        <p className="mt-6 text-sm text-black/60 dark:text-white/60">
          This shop has not published a menu yet.
        </p>
      ) : (
        <ul className="mt-4">
          {menu.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              shopOpen={shopOpen}
              onCartChange={handleCartChange}
            />
          ))}
        </ul>
      )}

      <CartSummaryBar cart={cart} />
    </main>
  );
}
