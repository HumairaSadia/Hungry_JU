/**
 * @file Structured logger with secret redaction.
 *
 * @module server/lib/logger
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Structured logger. Wrapped in a class so the "no console.log" rule in the coding
 * standards has an approved alternative, and so secrets can be redacted in one place.
 */
export class Logger {
  /** @type {string} */
  #context;

  /**
   * @param {string} context - Module name attached to every line from this instance.
   */
  constructor(context) {
    this.#context = context;
  }

  /**
   * Builds a logger bound to one module.
   *
   * @param {string} _moduleName - Module tag, e.g. `'OrderService'`.
   * @returns {Logger} Logger for that module.
   * @throws {NotImplementedError} Until implemented.
   */
  static forModule(_moduleName) {
    throw new NotImplementedError('Logger.forModule');
  }

  /**
   * Developer-detail line, suppressed in production.
   *
   * @param {string} _message - What happened.
   * @param {import('@/shared/types').LogMeta} [_meta] - Structured context.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  debug(_message, _meta) {
    throw new NotImplementedError('Logger.debug');
  }

  /**
   * Normal operational event.
   *
   * @param {string} _message - What happened.
   * @param {import('@/shared/types').LogMeta} [_meta] - Structured context.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  info(_message, _meta) {
    throw new NotImplementedError('Logger.info');
  }

  /**
   * Recoverable problem worth attention.
   *
   * @param {string} _message - What happened.
   * @param {import('@/shared/types').LogMeta} [_meta] - Structured context.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  warn(_message, _meta) {
    throw new NotImplementedError('Logger.warn');
  }

  /**
   * Failure, with the causing error attached.
   *
   * @param {string} _message - What failed.
   * @param {unknown} _error - Thrown value.
   * @param {import('@/shared/types').LogMeta} [_meta] - Structured context.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  error(_message, _error, _meta) {
    throw new NotImplementedError('Logger.error');
  }

  /**
   * Strips passwords, hashes, tokens, and PINs before anything is written.
   *
   * @param {import('@/shared/types').LogMeta} _meta - Raw context.
   * @returns {import('@/shared/types').LogMeta} Context safe to persist.
   * @throws {NotImplementedError} Until implemented.
   */
  redact(_meta) {
    throw new NotImplementedError('Logger.redact');
  }
}
