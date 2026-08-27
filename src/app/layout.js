/**
 * @file Root layout: the single HTML document shell for every route.
 *
 * Fonts are loaded through `next/font` so they are self-hosted and hashed at build time
 * rather than fetched from a third party at runtime.
 *
 * @module app/layout
 */

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

/** Variable sans-serif face exposed to CSS as `--font-geist-sans`. */
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

/** Variable monospace face exposed to CSS as `--font-geist-mono`. */
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

/**
 * Document metadata applied to every route unless a segment overrides it.
 *
 * @type {import('next').Metadata}
 */
export const metadata = {
  title: 'HungryJU | Campus food, sorted',
  description: 'Order fresh food from around Jahangirnagar University.',
};

/**
 * Renders the `<html>`/`<body>` shell shared by all route groups.
 *
 * @param {object} props - Component props.
 * @param {import('react').ReactNode} props.children - Active route segment.
 * @returns {import('react').ReactNode} The document shell.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
