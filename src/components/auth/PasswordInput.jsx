/**
 * @fileoverview Password input with show/hide toggle. (AC-14)
 * @module components/auth/PasswordInput
 */
'use client';
import { useState } from 'react';

/**
 * @param {Object} props
 * @param {string} props.id
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {string} props.placeholder
 */
export default function PasswordInput({ id, value, onChange, placeholder }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 pr-12 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
      />
      <button
        type="button"
        aria-label={visible ? 'Hide password' : 'Show password'}
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-600"
      >
        {visible ? 'Hide' : 'Show'}
      </button>
    </div>
  );
}