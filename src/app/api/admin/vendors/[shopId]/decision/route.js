/**
 * @file HTTP route handlers for `/api/admin/vendors/[shopId]/decision`.
 *
 * Thin HTTP boundary: every handler resolves its controller from the DI container and
 * delegates. No business rules live here (NFR-12); validation, authorization, and
 * persistence belong to the middleware, service, and repository layers.
 *
 * @module app/api/admin/vendors/[shopId]/decision/route
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * HJU-G01 approve or reject with a reason — delegates to AdminController.decideVendorApplication.
 *
 * @param {Request} _request - Incoming HTTP request.
 * @param {{ params: Promise<{ shopId: string }> }} _context - Route context; `params`
 *   resolves to the dynamic segments (`shopId`).
 * @returns {Promise<Response>} Created/accepted response body.
 * @throws {NotImplementedError} Always, until `POST /api/admin/vendors/[shopId]/decision` is implemented.
 */
export async function POST(_request, _context) {
  throw new NotImplementedError('POST /api/admin/vendors/[shopId]/decision');
}
