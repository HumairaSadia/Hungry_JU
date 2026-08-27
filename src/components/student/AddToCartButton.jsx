'use client';

/**
 * @file Add-to-cart control for one menu item (FR-C4).
 *
 * Presentation only. The server owns every rule: this component sends the intent and
 * renders whatever the API answers, including BR-03 refusing an item from a second shop
 * (NFR-12).
 *
 * @module components/student/AddToCartButton
 */

import { useState } from 'react';
import QuantityStepper from '@/components/student/QuantityStepper';
import { addToCart, clearCart, isSingleShopConflict } from '@/lib/cart-client';

/** Ceiling on a single add, so a mis-tap cannot order a stack of plates. */
const MAX_QUANTITY = 20;

/**
 * Quantity stepper plus an add button, with inline feedback.
 *
 * When BR-03 refuses the add because the cart is locked to another shop, the component
 * asks the student to confirm, then clears the cart and retries — it never clears without
 * being told to, because that would silently discard an order in progress.
 *
 * @param {object} props - Component props.
 * @param {string} props.menuItemId - Item to add.
 * @param {string} props.itemName - Item name, used in the confirmation and status copy.
 * @param {boolean} [props.disabled] - Whether adding is blocked, e.g. a closed shop or a
 *   sold-out item.
 * @param {string} [props.disabledReason] - Why adding is blocked, shown in place of the
 *   button.
 * @param {(cart: import('@/lib/cart-client').CartPayload) => void} [props.onCartChange] -
 *   Called with the updated cart after every successful change.
 * @returns {import('react').ReactNode} The control.
 */
export default function AddToCartButton({
  menuItemId,
  itemName,
  disabled = false,
  disabledReason = 'Unavailable',
  onCartChange,
}) {
  const [quantity, setQuantity] = useState(1);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState(null);
  const [conflict, setConflict] = useState(false);

  /**
   * Sends the add, optionally emptying the cart first to satisfy BR-03.
   *
   * @param {boolean} replaceCart - Whether to clear the existing cart before adding.
   * @returns {Promise<void>} Resolves once the API has answered.
   */
  async function submit(replaceCart) {
    setPending(true);
    setMessage(null);
    try {
      if (replaceCart) {
        await clearCart();
      }
      const cart = await addToCart(menuItemId, quantity);
      setConflict(false);
      setQuantity(1);
      setMessage({ tone: 'success', text: `Added ${itemName} to your cart.` });
      onCartChange?.(cart);
    } catch (error) {
      if (isSingleShopConflict(error)) {
        setConflict(true);
        setMessage(null);
      } else {
        setConflict(false);
        setMessage({ tone: 'error', text: error.message });
      }
    } finally {
      setPending(false);
    }
  }

  if (disabled) {
    return (
      <p className="text-sm text-black/50 dark:text-white/50" role="status">
        {disabledReason}
      </p>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        <QuantityStepper
          value={quantity}
          onChange={setQuantity}
          max={MAX_QUANTITY}
          disabled={pending}
          label={`Quantity of ${itemName}`}
        />
        <button
          type="button"
          className="bg-foreground text-background h-9 rounded-full px-4 text-sm font-medium disabled:opacity-50"
          onClick={() => submit(false)}
          disabled={pending}
        >
          {pending ? 'Adding…' : 'Add'}
        </button>
      </div>

      {conflict && (
        <div
          className="w-full rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm"
          role="alertdialog"
          aria-label="Cart belongs to another shop"
        >
          <p>
            Your cart holds items from another shop. Ordering from two shops at once is not
            possible.
          </p>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              className="bg-foreground text-background rounded-full px-3 py-1 text-xs font-medium disabled:opacity-50"
              onClick={() => submit(true)}
              disabled={pending}
            >
              Empty cart and add
            </button>
            <button
              type="button"
              className="rounded-full border border-black/15 px-3 py-1 text-xs dark:border-white/20"
              onClick={() => setConflict(false)}
              disabled={pending}
            >
              Keep my cart
            </button>
          </div>
        </div>
      )}

      <p
        className={`text-xs ${message?.tone === 'error' ? 'text-red-600 dark:text-red-400' : 'text-green-700 dark:text-green-400'}`}
        role="status"
        aria-live="polite"
      >
        {message?.text ?? ''}
      </p>
    </div>
  );
}
