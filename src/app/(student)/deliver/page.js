'use client';

/**
 * @file View for `/deliver`.
 *
 * Presentation only: the view renders the available peer delivery feed and forwards intent
 * to the API through `apiClient`. Business rules and authorization stay server-side (NFR-12).
 *
 * @module app/(student)/deliver/page
 */

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { apiClient } from '@/lib/api-client';

/**
 * @typedef {object} AvailableOrder
 * @property {string} id - Order unique identifier.
 * @property {string} shopName - Food stall name.
 * @property {string} pickupLocation - Campus pickup spot.
 * @property {string} deliveryLocation - Dropoff destination.
 * @property {number} estimatedEarnings - Earnings in BDT.
 * @property {string} deliveryDistance - Walking distance.
 */

/**
 * Feed component displaying claimable deliveries to student riders.
 *
 * @returns {React.ReactNode} Available delivery feed interface.
 */
export default function DeliverPage() {
  /** @type {[AvailableOrder[], React.Dispatch<React.SetStateAction<AvailableOrder[]>>]} */
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState(null);
  const [feedback, setFeedback] = useState({ error: '', success: '' });

  /**
   * Loads claimable delivery orders from the API feed.
   *
   * @returns {Promise<void>}
   */
  const loadOrders = useCallback(async () => {
    try {
      const response = await apiClient.get('/api/deliveries/available');
      const orderList = Array.isArray(response) ? response : response?.data || [];
      setOrders(orderList);
      setFeedback((prev) => ({ ...prev, error: '' }));
    } catch (err) {
      setFeedback((prev) => ({
        ...prev,
        error: err.message || 'Failed to load available orders.'
      }));
    } finally {
      setLoading(false);
    }
  }, []);

  // AC-06: Automatic periodic polling
  useEffect(() => {
    loadOrders();
    const unsubscribe = apiClient.poll('/api/deliveries/available', 10000, (freshOrders) => {
      setOrders(Array.isArray(freshOrders) ? freshOrders : freshOrders?.data || []);
    });

    return () => unsubscribe();
  }, [loadOrders]);

  /**
   * Accepts and claims an order for delivery.
   *
   * @param {string} orderId - Target order ID.
   * @returns {Promise<void>}
   */
  const handleAcceptOrder = async (orderId) => {
    setClaimingId(orderId);
    setFeedback({ error: '', success: '' });

    try {
      await apiClient.post('/api/deliveries', { orderId });
      setFeedback({
        error: '',
        success: `Order #${orderId.slice(-4)} accepted! Proceed to pickup.`
      });
      // AC-02: Assigned order disappears from the feed
      setOrders((prev) => prev.filter((item) => item.id !== orderId));
    } catch (err) {
      setFeedback({
        error: err.status === 409
          ? 'Another rider just accepted this order.'
          : err.message || 'Could not accept this order.',
        success: ''
      });
      loadOrders();
    } finally {
      setClaimingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#111827] font-sans flex flex-col justify-between">
      {/* Navigation Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 overflow-hidden rounded-full border border-neutral-200 bg-white shadow-sm flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="HungryJU Logo"
              width={48}
              height={48}
              className="object-contain p-1"
              priority
            />
          </div>
          <span className="text-2xl font-black tracking-tight text-[#111827]">
            Hungry<span className="text-[#E07A5F]">JU</span>
          </span>
        </div>

        <nav className="flex items-center gap-6 font-medium text-sm text-[#4B5563]">
          <a href="/orders" className="hover:text-[#111827] transition">My Orders</a>
          <a href="/deliver" className="text-[#E07A5F] font-bold">Deliver Feed</a>
          <a href="/deliver/earnings" className="hover:text-[#111827] transition">Earnings</a>
        </nav>
      </header>

      {/* Main Delivery Feed */}
      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="mb-8 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#E07A5F] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-pulse"></span>
            Peer Delivery Network
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
            Available <span className="italic text-[#E07A5F] font-serif font-normal">Orders.</span>
          </h1>
          <p className="text-[#6B7280] text-sm sm:text-base mt-2">
            Pick up campus meals on your way and earn directly into your student account.
          </p>
        </div>

        {feedback.success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium text-center">
            {feedback.success}
          </div>
        )}

        {feedback.error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium text-center">
            {feedback.error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#9CA3AF]">
            <div className="w-7 h-7 border-2 border-[#E07A5F] border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm">Scanning for active campus orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#EBE7DF] p-12 text-center max-w-md mx-auto shadow-sm">
            <div className="w-14 h-14 bg-amber-50 text-[#E07A5F] rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
              📦
            </div>
            <h3 className="text-lg font-bold text-[#111827] mb-1">No available orders found</h3>
            <p className="text-sm text-[#6B7280] mb-6 leading-relaxed">
              All active orders have been assigned. New requests will appear automatically.
            </p>
            <button
              type="button"
              onClick={loadOrders}
              className="px-5 py-2.5 rounded-xl border border-[#D1D5DB] text-sm font-semibold text-[#111827] hover:bg-neutral-50 transition"
            >
              Refresh Feed
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-[#EBE7DF] p-6 shadow-sm flex flex-col justify-between hover:border-[#E07A5F]/40 transition"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold uppercase text-[#E07A5F] tracking-wider">
                      {order.shopName || 'Campus Spot'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                      +{order.estimatedEarnings} BDT
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#111827] mb-4">
                    Order #{order.id.slice(-5)}
                  </h3>
                  <div className="space-y-2 text-sm text-[#4B5563] mb-6">
                    <p className="truncate">
                      <span className="font-semibold text-[#111827]">Pickup:</span> {order.pickupLocation}
                    </p>
                    <p className="truncate">
                      <span className="font-semibold text-[#111827]">Drop:</span> {order.deliveryLocation}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      Approx. {order.deliveryDistance}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={claimingId === order.id}
                  onClick={() => handleAcceptOrder(order.id)}
                  className="w-full bg-[#1A2536] hover:bg-[#111827] text-white text-sm font-semibold py-3 rounded-xl transition shadow-sm disabled:opacity-50"
                >
                  {claimingId === order.id ? 'Claiming...' : 'Accept Order ↗'}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-[#9CA3AF]">
        © 2026 Hungry_JU • Savar, Dhaka
      </footer>
    </div>
  );
}