'use client';

/**
 * @file View for `/store-registration`.
 *
 * Presentation only: the view renders state and forwards intent to the API through
 * `ApiClient`. Business rules and authorization stay server-side (NFR-12).
 *
 * @module app/(auth)/store-registration/page
 */

import React, { useState } from 'react';
import Image from 'next/image';
import { ApiClient } from '@/lib/api-client';

/**
 * Form state aggregate for store registration input fields.
 *
 * @typedef {object} StoreRegistrationFormData
 * @property {string} name - Official name of the food shop.
 * @property {string} address - Physical location or stall number within campus.
 * @property {string} contactNumber - Primary contact phone number.
 * @property {string} email - Official vendor email address.
 * @property {string} openingTime - Daily opening time (HH:mm format).
 * @property {string} closingTime - Daily closing time (HH:mm format).
 */

/**
 * Interactive store registration form component.
 *
 * Manages user input state, client validation display, and API dispatching.
 *
 * @returns {React.ReactNode} Interactive form markup or submission confirmation UI.
 */
function StoreRegistrationForm() {
  /** @type {[StoreRegistrationFormData, React.Dispatch<React.SetStateAction<StoreRegistrationFormData>>]} */
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contactNumber: '',
    email: '',
    openingTime: '09:00',
    closingTime: '22:00',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * Handles change events across form text inputs.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - Controlled input change event.
   * @returns {void}
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Handles form submission and dispatches shop application payload to the server.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - Form submit event.
   * @returns {Promise<void>} Async submission resolution.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const { name, address, contactNumber, email, openingTime, closingTime } = formData;

    if (!name.trim() || !address.trim() || !contactNumber.trim() || !email.trim()) {
      setErrorMessage('All required fields must be populated.');
      setLoading(false);
      return;
    }

    try {
      await ApiClient.post('/api/shops', {
        name,
        address,
        contactNumber,
        email,
        openingTime,
        closingTime,
      });

      setIsSuccess(true);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to submit store registration request.');
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="mx-auto w-full max-w-lg rounded-3xl border border-[#EBE7DF] bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E07A5F]/10 text-2xl font-bold text-[#E07A5F]">
          ✓
        </div>
        <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-[#111827]">
          Registration Submitted
        </h2>
        <p className="mb-8 leading-relaxed text-[#6B7280]">
          Your store registration request has been submitted for admin approval.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="w-full rounded-xl bg-[#1A2536] px-6 py-3.5 font-semibold text-white shadow-sm transition duration-150 hover:bg-[#111827]"
        >
          Register Another Spot
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-[#EBE7DF] bg-white p-8 shadow-sm sm:p-10">
      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-xs font-semibold tracking-wider text-[#111827] uppercase"
          >
            Store Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Noor Zahan Store"
            required
            className="w-full rounded-xl border border-[#D1D5DB] px-4 py-3 text-[#111827] placeholder-[#9CA3AF] transition focus:border-transparent focus:ring-2 focus:ring-[#E07A5F] focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="mb-2 block text-xs font-semibold tracking-wider text-[#111827] uppercase"
          >
            Location / Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="e.g., Stall 12, Bot Tola, JU"
            required
            className="w-full rounded-xl border border-[#D1D5DB] px-4 py-3 text-[#111827] placeholder-[#9CA3AF] transition focus:border-transparent focus:ring-2 focus:ring-[#E07A5F] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contactNumber"
              className="mb-2 block text-xs font-semibold tracking-wider text-[#111827] uppercase"
            >
              Contact Number *
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="01000000000"
              required
              className="w-full rounded-xl border border-[#D1D5DB] px-4 py-3 text-[#111827] placeholder-[#9CA3AF] transition focus:border-transparent focus:ring-2 focus:ring-[#E07A5F] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-semibold tracking-wider text-[#111827] uppercase"
            >
              Store Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="store@example.com"
              required
              className="w-full rounded-xl border border-[#D1D5DB] px-4 py-3 text-[#111827] placeholder-[#9CA3AF] transition focus:border-transparent focus:ring-2 focus:ring-[#E07A5F] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="openingTime"
              className="mb-2 block text-xs font-semibold tracking-wider text-[#111827] uppercase"
            >
              Opening Time
            </label>
            <input
              type="time"
              id="openingTime"
              name="openingTime"
              value={formData.openingTime}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#D1D5DB] px-4 py-3 text-[#111827] transition focus:border-transparent focus:ring-2 focus:ring-[#E07A5F] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="closingTime"
              className="mb-2 block text-xs font-semibold tracking-wider text-[#111827] uppercase"
            >
              Closing Time
            </label>
            <input
              type="time"
              id="closingTime"
              name="closingTime"
              value={formData.closingTime}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#D1D5DB] px-4 py-3 text-[#111827] transition focus:border-transparent focus:ring-2 focus:ring-[#E07A5F] focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1A2536] py-3.5 font-semibold text-white shadow-sm transition duration-150 hover:bg-[#111827] disabled:opacity-50"
        >
          <span>{loading ? 'Submitting Application...' : 'Submit Registration'}</span>
          {!loading && <span className="text-lg">↗</span>}
        </button>
      </form>
    </div>
  );
}

/**
 * HJU Store Registration page entrypoint view component.
 *
 * @returns {React.ReactNode} Rendered store registration page view.
 */
export default function StoreRegistrationPage() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#FBF9F4] font-sans text-[#111827]">
      {/* Navigation Header */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-white shadow-sm">
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

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#4B5563] md:flex">
          <a href="#" className="transition hover:text-[#111827]">
            Explore menu
          </a>
          <a href="#" className="transition hover:text-[#111827]">
            How it works
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="/login"
            className="hidden text-sm font-semibold text-[#111827] transition hover:opacity-80 sm:inline-block"
          >
            Log in
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#E07A5F] uppercase">
            <span className="h-2 w-2 rounded-full bg-[#E07A5F]"></span>
            Jahangirnagar University, Savar
          </div>

          <h1 className="text-4xl leading-tight font-black tracking-tight text-[#111827] sm:text-5xl">
            Register your <br className="hidden sm:block" />
            <span className="font-serif font-normal text-[#E07A5F] italic">food spot.</span>
          </h1>

          <p className="mt-3 text-base leading-relaxed text-[#6B7280] sm:text-lg">
            Partner with Hungry_JU to get your campus bites delivered directly to students.
          </p>
        </div>

        <StoreRegistrationForm />
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-[#9CA3AF]">
        © 2026 Hungry_JU • Savar, Dhaka
      </footer>
    </div>
  );
}
