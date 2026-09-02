'use client';

import { useState } from 'react';

/**
 * Cancel-order button with a confirm step, for use on an order card (US-005).
 *
 * @param {object} props - Component props.
 * @param {string} props.orderId - Order to cancel.
 * @param {boolean} props.isCancellable - Whether the order's current status allows
 *   cancellation (mirror of Order.isCancellable, decided by the backend).
 * @param {(newStatus: string) => void} props.onCancelled - Called with 'cancelled' once
 *   the server confirms.
 * @returns {JSX.Element | null} The button, or null if the order can't be cancelled.
 */
export function CancelOrderButton({ orderId, isCancellable, onCancelled }) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isCancellable) {
    return null; // AC-02: only eligible orders show the Cancel button.
  }

  async function handleConfirm() {
    
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/orders/${orderId}/cancel`, { method: 'POST' });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Could not cancel this order.');
      }
      onCancelled('cancelled');
      setConfirming(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={() => setConfirming(true)}>Cancel order</button>

      {confirming && (
        <div style={{ marginTop: 8 }}>
          <p>Cancel this order? This can't be undone.</p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={() => setConfirming(false)} disabled={loading}>
            Keep order
          </button>
          <button onClick={handleConfirm} disabled={loading}>
            {loading ? 'Cancelling…' : 'Confirm cancel'}
          </button>
        </div>
      )}
    </>
  );
}