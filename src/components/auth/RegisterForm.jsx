/**
 * @fileoverview Registration form (View). Runs client-side validation for
 * fast feedback, then submits to the /api/auth/register controller endpoint.
 * @module components/auth/RegisterForm
 */
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PasswordInput from './PasswordInput';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { validateRegistrationForm } from '@/utils/validators';
import Link from 'next/link';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phoneNumber: '',
  photoURL: '',
  gender: '',
  password: '',
  confirmPassword: '',
  acceptedTerms: false,
};

const LABEL_CLASS = 'block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5';
const INPUT_CLASS =
  'w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100';
const ERROR_CLASS = 'mt-1 text-xs text-red-500';

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  /** @param {string} field @param {*} value */
  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  /** @param {import('react').FormEvent} e */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientErrors = validateRegistrationForm(form);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();

      if (!res.ok) {
        setErrors(result.errors || { general: 'Registration failed.' });
        return;
      }
      router.push('/login'); // AC-16
    } catch {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="fullName" className={LABEL_CLASS}>
          Full Name *
        </label>
        <input
          id="fullName"
          value={form.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="Your Name"
          className={INPUT_CLASS}
        />
        {errors.fullName && <p className={ERROR_CLASS}>{errors.fullName}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className={LABEL_CLASS}>
            Email Address
          </label>
          <input
            id="email"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="you@example.com"
            className={INPUT_CLASS}
          />
          {errors.email && <p className={ERROR_CLASS}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phoneNumber" className={LABEL_CLASS}>
            Phone Number
          </label>
          <input
            id="phoneNumber"
            value={form.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            placeholder="01700000000"
            className={INPUT_CLASS}
          />
          {errors.phoneNumber && <p className={ERROR_CLASS}>{errors.phoneNumber}</p>}
        </div>
      </div>
      {errors.contact && <p className={ERROR_CLASS}>{errors.contact}</p>}

      <div>
        <label htmlFor="photoURL" className={LABEL_CLASS}>
          Profile Photo URL *
        </label>
        <input
          id="photoURL"
          value={form.photoURL}
          onChange={(e) => handleChange('photoURL', e.target.value)}
          placeholder="https://example.com/photo.jpg"
          className={INPUT_CLASS}
        />
        {errors.photoURL && <p className={ERROR_CLASS}>{errors.photoURL}</p>}
      </div>

      <div>
        <label htmlFor="gender" className={LABEL_CLASS}>
          Gender *
        </label>
        <select
          id="gender"
          value={form.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
          className={INPUT_CLASS}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p className={ERROR_CLASS}>{errors.gender}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="password" className={LABEL_CLASS}>
            Password *
          </label>
          <PasswordInput
            id="password"
            value={form.password}
            onChange={(v) => handleChange('password', v)}
            placeholder="••••••••"
          />
          <PasswordStrengthMeter password={form.password} />
          {errors.password && <p className={ERROR_CLASS}>{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword" className={LABEL_CLASS}>
            Confirm Password *
          </label>
          <PasswordInput
            id="confirmPassword"
            value={form.confirmPassword}
            onChange={(v) => handleChange('confirmPassword', v)}
            placeholder="••••••••"
          />
          {errors.confirmPassword && <p className={ERROR_CLASS}>{errors.confirmPassword}</p>}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={form.acceptedTerms}
          onChange={(e) => handleChange('acceptedTerms', e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
        />
        I accept the Terms and Conditions
      </label>
      {errors.acceptedTerms && <p className={ERROR_CLASS}>{errors.acceptedTerms}</p>}
      {errors.general && <p className="text-sm text-red-600">{errors.general}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 w-full rounded-lg bg-orange-700 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50"
      >
        {submitting ? 'Creating account…' : 'Submit Registration ↗'}
      </button>
      <p className="text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-orange-500 hover:text-orange-600">
          Log in
        </Link>
      </p>
    </form>
  );
}
