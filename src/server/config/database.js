/**
 * @file Database connection holder.
 *
 * @module server/config/database
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Database connection holder. Kept behind a class so the concrete driver/ORM
 * (Prisma, Sequelize, raw pg) is chosen in exactly one place.
 * Next.js dev mode reloads modules, so the client must be memoised on globalThis.
 */
export class Database {
  /** @type {unknown} */
  static #client = null;

  /**
   * Opens the connection (or reuses the memoised one) and verifies it is usable.
   *
   * @returns {Promise<unknown>} The connected client.
   * @throws {NotImplementedError} Until implemented.
   */
  static async connect() {
    throw new NotImplementedError('Database.connect');
  }

  /**
   * The live client, for repositories resolved from the container.
   *
   * @returns {unknown} Connected client.
   * @throws {NotImplementedError} Until implemented.
   */
  static get client() {
    throw new NotImplementedError('Database.client');
  }

  /**
   * Closes the connection; used by tests and graceful shutdown.
   *
   * @returns {Promise<void>} Resolves once the pool is drained.
   * @throws {NotImplementedError} Until implemented.
   */
  static async disconnect() {
    throw new NotImplementedError('Database.disconnect');
  }

  /**
   * Cheap round-trip used by readiness checks.
   *
   * @returns {Promise<boolean>} `true` when the database answers.
   * @throws {NotImplementedError} Until implemented.
   */
  static async healthCheck() {
    throw new NotImplementedError('Database.healthCheck');
  }
}
