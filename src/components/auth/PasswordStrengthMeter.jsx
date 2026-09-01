/**
 * @fileoverview Live password strength indicator. (AC-13)
 * @module components/auth/PasswordStrengthMeter
 */
'use client';
import { getPasswordStrength } from '@/utils/passwordStrength';

const COLORS = { Weak: 'bg-red-500', Medium: 'bg-yellow-500', Strong: 'bg-green-500' };
const WIDTHS = { Weak: '33%', Medium: '66%', Strong: '100%' };

/** @param {Object} props @param {string} props.password */
export default function PasswordStrengthMeter({ password }) {
  if (!password) return null;
  const strength = getPasswordStrength(password);

  return (
    <div className="mt-1">
      <div className="h-1.5 w-full rounded bg-gray-200">
        <div className={`h-1.5 rounded ${COLORS[strength]}`} style={{ width: WIDTHS[strength] }} />
      </div>
      <span className="text-xs text-gray-600">{strength}</span>
    </div>
  );
}
