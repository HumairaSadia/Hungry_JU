/**
 * @file Typed access to process.env.
 *
 * @module server/config/env
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * SMTP credentials used by `EmailService`.
 *
 * @typedef {object} SmtpConfig
 * @property {string} host - SMTP host name.
 * @property {number} port - SMTP port.
 * @property {string} user - Account used to authenticate.
 * @property {string} password - Account password or app token.
 * @property {string} from - Default `From:` address.
 */

/**
 * Typed access to process.env. Secrets never get read directly elsewhere,
 * so a missing variable fails once at boot instead of at the first request.
 */
export class Env {
  /** @type {Env | null} */
  static #instance = null;

  /** @type {Record<string, string | undefined>} */
  #values;

  /**
   * @param {Record<string, string | undefined>} values - Raw environment map, normally
   *   `process.env`.
   */
  constructor(values) {
    this.#values = values;
  }

  /**
   * Reads and validates the environment once, at boot.
   *
   * @returns {Env} The validated environment.
   * @throws {NotImplementedError} Until implemented.
   */
  static load() {
    throw new NotImplementedError('Env.load');
  }

  /**
   * The loaded environment.
   *
   * @returns {Env} Singleton instance.
   * @throws {NotImplementedError} Until implemented.
   */
  static get instance() {
    throw new NotImplementedError('Env.instance');
  }

  /**
   * Connection string for the primary database.
   *
   * @returns {string} Database URL.
   * @throws {NotImplementedError} Until implemented.
   */
  get databaseUrl() {
    throw new NotImplementedError('Env.databaseUrl');
  }

  /**
   * Signing secret for short-lived access tokens.
   *
   * @returns {string} Access-token secret.
   * @throws {NotImplementedError} Until implemented.
   */
  get jwtAccessSecret() {
    throw new NotImplementedError('Env.jwtAccessSecret');
  }

  /**
   * Signing secret for refresh tokens; deliberately distinct from the access secret.
   *
   * @returns {string} Refresh-token secret.
   * @throws {NotImplementedError} Until implemented.
   */
  get jwtRefreshSecret() {
    throw new NotImplementedError('Env.jwtRefreshSecret');
  }

  /**
   * Mail transport settings.
   *
   * @returns {SmtpConfig} SMTP configuration.
   * @throws {NotImplementedError} Until implemented.
   */
  get smtp() {
    throw new NotImplementedError('Env.smtp');
  }

  /**
   * Public base URL, used to build verification and reset links.
   *
   * @returns {string} Absolute application URL.
   * @throws {NotImplementedError} Until implemented.
   */
  get appUrl() {
    throw new NotImplementedError('Env.appUrl');
  }

  /**
   * Whether the process runs in production mode.
   *
   * @returns {boolean} `true` in production.
   * @throws {NotImplementedError} Until implemented.
   */
  get isProduction() {
    throw new NotImplementedError('Env.isProduction');
  }
}
