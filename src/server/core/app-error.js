/**
 * @file Error hierarchy for expected failures that cross a layer boundary.
 *
 * Every class here carries the HTTP status and machine-readable code that
 * `ErrorMiddleware` turns into a JSON response, so no layer below the controller
 * needs to know about HTTP.
 *
 * @module server/core/app-error
 */

import { HTTP_STATUS } from '@/server/config/constants';

/**
 * Base class for every expected (non-bug) failure that crosses a layer boundary.
 *
 * @augments Error
 */
export class AppError extends Error {
  /** @type {number} */
  #statusCode;

  /** @type {string} */
  #code;

  /** @type {unknown} */
  #details;

  /**
   * @param {string} message - Human-readable reason, safe to show a client.
   * @param {number} [statusCode] - HTTP status the middleware should respond with.
   * @param {string} [code] - Stable machine-readable code for clients to branch on.
   * @param {unknown} [details] - Optional structured detail, e.g. field-level issues.
   */
  constructor(
    message,
    statusCode = HTTP_STATUS.INTERNAL_ERROR,
    code = 'APP_ERROR',
    details = null
  ) {
    super(message);
    this.name = new.target.name;
    this.#statusCode = statusCode;
    this.#code = code;
    this.#details = details;
  }

  /**
   * HTTP status this failure maps to.
   *
   * @returns {number} Status code.
   */
  get statusCode() {
    return this.#statusCode;
  }

  /**
   * Machine-readable failure code.
   *
   * @returns {string} Code such as `'VALIDATION_ERROR'`.
   */
  get code() {
    return this.#code;
  }

  /**
   * Structured detail attached to the failure, when any.
   *
   * @returns {unknown} Details, or `null`.
   */
  get details() {
    return this.#details;
  }

  /**
   * Serialises to the wire envelope returned to clients.
   *
   * @returns {import('@/shared/types').ErrorEnvelope} Error envelope.
   */
  toJSON() {
    return { error: { code: this.#code, message: this.message, details: this.#details } };
  }
}

/**
 * A request payload failed whitelist validation. Carries the offending fields.
 *
 * @augments AppError
 */
export class ValidationError extends AppError {
  /**
   * @param {import('@/shared/types').ValidationIssue[]} details - Flattened field issues.
   */
  constructor(details) {
    super('Invalid request payload', HTTP_STATUS.UNPROCESSABLE, 'VALIDATION_ERROR', details);
  }
}

/**
 * No usable credentials: token missing, expired, or the account is not active.
 *
 * @augments AppError
 */
export class AuthenticationError extends AppError {
  /**
   * @param {string} [message] - Override for the default reason.
   */
  constructor(message = 'Authentication required') {
    super(message, HTTP_STATUS.UNAUTHORIZED, 'AUTHENTICATION_ERROR');
  }
}

/**
 * Raised by object-level ownership checks: the IDOR guard required by SRS section 9.
 *
 * @augments AppError
 */
export class AuthorizationError extends AppError {
  /**
   * @param {string} [message] - Override for the default reason.
   */
  constructor(message = 'Not allowed') {
    super(message, HTTP_STATUS.FORBIDDEN, 'AUTHORIZATION_ERROR');
  }
}

/**
 * The addressed resource does not exist, or the actor may not know that it does.
 *
 * @augments AppError
 */
export class NotFoundError extends AppError {
  /**
   * @param {string} [resource] - Resource name used in the message, e.g. `'Order'`.
   */
  constructor(resource = 'Resource') {
    super(`${resource} not found`, HTTP_STATUS.NOT_FOUND, 'NOT_FOUND');
  }
}

/**
 * Lost race on an atomic update, e.g. two riders accepting one order (FR-D3).
 *
 * @augments AppError
 */
export class ConflictError extends AppError {
  /**
   * @param {string} [message] - Override for the default reason.
   */
  constructor(message = 'Resource state changed') {
    super(message, HTTP_STATUS.CONFLICT, 'CONFLICT');
  }
}

/**
 * A business rule (BR-01..BR-12) refused the operation.
 *
 * @augments AppError
 */
export class BusinessRuleError extends AppError {
  /**
   * @param {string} ruleId - Rule identifier, e.g. `'04'`; becomes code `BUSINESS_RULE_04`.
   * @param {string} message - Why the rule refused, in client-safe wording.
   */
  constructor(ruleId, message) {
    super(message, HTTP_STATUS.BAD_REQUEST, `BUSINESS_RULE_${ruleId}`);
  }
}
