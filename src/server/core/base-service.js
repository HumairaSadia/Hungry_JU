/**
 * @file Abstract business-logic unit shared by every service.
 *
 * @module server/core/base-service
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Abstract business-logic unit. Dependencies arrive through the constructor
 * (composition over inheritance) so services stay unit-testable with fakes.
 *
 * @abstract
 */
export class BaseService {
  /**
   * @throws {TypeError} When constructed directly instead of through a subclass.
   */
  constructor() {
    if (new.target === BaseService) {
      throw new TypeError('BaseService is abstract');
    }
  }

  /**
   * Object-level guard: may this actor act on this resource? SRS section 9 IDOR rule.
   *
   * @abstract
   * @param {import('@/shared/types').Actor} _actor - Authenticated principal.
   * @param {import('@/server/core/base-model').BaseModel} _resource - Entity being touched.
   * @returns {void} Returns nothing when the actor is allowed.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  assertOwnership(_actor, _resource) {
    throw new NotImplementedError(`${this.constructor.name}.assertOwnership`);
  }
}
