/**
 * @file Display formatting helpers for the browser.
 *
 * Formatting only. Amounts arrive from the API already computed in poisha; nothing here
 * derives a price or a total (NFR-12).
 *
 * @module lib/format
 */

/** Poisha in one taka. */
const POISHA_PER_TAKA = 100;

/**
 * Renders an amount held in poisha as taka.
 *
 * @param {number} poisha - Amount in poisha (1 BDT = 100 poisha).
 * @param {string} [locale] - BCP 47 locale tag.
 * @returns {string} Human-readable amount, e.g. `'৳120.00'`.
 */
export function formatTaka(poisha, locale = 'en-BD') {
  const amount = Number.isFinite(poisha) ? poisha / POISHA_PER_TAKA : 0;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'BDT',
    currencyDisplay: 'narrowSymbol',
  }).format(amount);
}
