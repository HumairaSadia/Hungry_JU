/**
 * @file Abstract controller shared by every HTTP controller.
 *
 * @module server/core/base-controller
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Abstract controller: translates HTTP requests into service calls and results into responses.
 * Route handlers under src/app/api stay one-liners that delegate to a controller instance.
 *
 * @abstract
 */
export class BaseController {
  /**
   * @throws {TypeError} When constructed directly instead of through a subclass.
   */
  constructor() {
    if (new.target === BaseController) {
      throw new TypeError('BaseController is abstract');
    }
  }

  /**
   * Parses body/query against a validator schema; throws ValidationError on failure.
   *
   * @abstract
   * @param {Request} _request - Incoming request.
   * @param {import('@/shared/types').Schema} _schema - Zod schema to validate against.
   * @returns {Promise<Record<string, unknown>>} The validated, whitelisted payload.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  async parse(_request, _schema) {
    throw new NotImplementedError(`${this.constructor.name}.parse`);
  }

  /**
   * Reads the authenticated actor attached by AuthMiddleware.
   *
   * @abstract
   * @param {Request} _request - Incoming request.
   * @returns {import('@/shared/types').Actor} The authenticated principal.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  actor(_request) {
    throw new NotImplementedError(`${this.constructor.name}.actor`);
  }

  /**
   * Builds a 200 response.
   *
   * @abstract
   * @param {unknown} _data - Payload to serialise.
   * @returns {Response} JSON response with status 200.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  ok(_data) {
    throw new NotImplementedError(`${this.constructor.name}.ok`);
  }

  /**
   * Builds a 201 response.
   *
   * @abstract
   * @param {unknown} _data - Representation of the created resource.
   * @returns {Response} JSON response with status 201.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  created(_data) {
    throw new NotImplementedError(`${this.constructor.name}.created`);
  }

  /**
   * Builds an empty 204 response.
   *
   * @abstract
   * @returns {Response} Response with status 204 and no body.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  noContent() {
    throw new NotImplementedError(`${this.constructor.name}.noContent`);
  }

  /**
   * Wraps a handler so thrown AppErrors become JSON responses (see ErrorMiddleware).
   *
   * @abstract
   * @param {(request: Request, params?: Record<string, string>) => Promise<Response>} _handler -
   *   Controller method to guard.
   * @returns {(request: Request, params?: Record<string, string>) => Promise<Response>} Wrapped
   *   handler safe to export from a route module.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  handle(_handler) {
    throw new NotImplementedError(`${this.constructor.name}.handle`);
  }
}
