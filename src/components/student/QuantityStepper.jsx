'use client';

/**
 * @file Quantity stepper used wherever a student picks a number of units.
 *
 * Presentation only: it clamps to the bounds it is given and reports the new value.
 *
 * @module components/student/QuantityStepper
 */

/**
 * Minus/plus control around a read-only quantity.
 *
 * @param {object} props - Component props.
 * @param {number} props.value - Current quantity.
 * @param {(quantity: number) => void} props.onChange - Called with the clamped new value.
 * @param {number} [props.min] - Lowest selectable quantity.
 * @param {number} [props.max] - Highest selectable quantity.
 * @param {boolean} [props.disabled] - Whether both buttons are inert.
 * @param {string} [props.label] - Accessible name for the group.
 * @returns {import('react').ReactNode} The stepper.
 */
export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 20,
  disabled = false,
  label = 'Quantity',
}) {
  const clamp = (next) => Math.min(max, Math.max(min, next));

  return (
    <div
      className="inline-flex items-center rounded-full border border-black/15 dark:border-white/20"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        className="h-9 w-9 rounded-full text-lg leading-none disabled:opacity-40"
        onClick={() => onChange(clamp(value - 1))}
        disabled={disabled || value <= min}
        aria-label="Decrease quantity"
      >
        &minus;
      </button>
      <output className="w-8 text-center text-sm tabular-nums" aria-label={`${label}: ${value}`}>
        {value}
      </output>
      <button
        type="button"
        className="h-9 w-9 rounded-full text-lg leading-none disabled:opacity-40"
        onClick={() => onChange(clamp(value + 1))}
        disabled={disabled || value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
