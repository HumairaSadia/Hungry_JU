/**
 * @file Role and ownership gates.
 *
 * @module server/middleware/rbac-middleware
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * A guard that inspects the request and throws when the actor may not proceed.
 *
 * @typedef {(request: Request, params?: Record<string, string>) => Promise<void>} Guard
 */

/**
 * Role gate (FR-A7) and the object-level ownership gate that stops IDOR.
 * Role alone is never enough: a vendor is not allowed to touch another vendor's shop.
 */
export class RbacMiddleware {
  /**
   * Builds a guard admitting exactly one role.
   *
   * @param {import('@/shared/types').UserRole} _role - Required role.
   * @returns {Guard} Guard that throws `AuthorizationError` for other roles.
   * @throws {NotImplementedError} Until implemented.
   */
  requireRole(_role) {
    throw new NotImplementedError('RbacMiddleware.requireRole');
  }

  /**
   * Builds a guard admitting any of several roles.
   *
   * @param {import('@/shared/types').UserRole[]} _roles - Accepted roles.
   * @returns {Guard} Guard that throws `AuthorizationError` for other roles.
   * @throws {NotImplementedError} Until implemented.
   */
  requireAnyRole(_roles) {
    throw new NotImplementedError('RbacMiddleware.requireAnyRole');
  }

  /**
   * Deliver Mode must be on before any rider endpoint responds.
   *
   * @returns {Guard} Guard that rejects students with Deliver Mode off.
   * @throws {NotImplementedError} Until implemented.
   */
  requireDeliverMode() {
    throw new NotImplementedError('RbacMiddleware.requireDeliverMode');
  }

  /**
   * Builds the object-level guard: loads the target and checks the actor owns it.
   *
   * @param {(request: Request, params?: Record<string, string>) =>
   *   Promise<import('@/server/core/base-model').BaseModel | null>} _resourceLoader - Loads
   *   the resource addressed by the request.
   * @returns {Guard} Guard that throws `AuthorizationError` on a foreign resource.
   * @throws {NotImplementedError} Until implemented.
   */
  requireOwnership(_resourceLoader) {
    throw new NotImplementedError('RbacMiddleware.requireOwnership');
  }
}
