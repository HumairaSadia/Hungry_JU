/**
 * @file Browser-side HTTP client used by every component.
 *
 * @module lib/api-client
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * Extra per-request options accepted by the verb helpers.
 *
 * @typedef {object} RequestOptions
 * @property {Record<string, string>} [headers] - Additional request headers, e.g. an
 *   `Idempotency-Key` on checkout.
 * @property {unknown} [body] - Payload to serialise as JSON.
 * @property {AbortSignal} [signal] - Signal used to cancel an in-flight request.
 */

/**
 * Browser-side HTTP client. Every component talks to the API through this class so
 * auth headers, refresh-on-401, and error shapes are handled once, and so no component
 * ever imports server code (NFR-12: business rules never live in the frontend).
 */
export class ApiClient {
  /** @type {string} */
  #baseUrl;

  /** @type {string | undefined} */
  #accessToken;

  /**
   * @param {string} baseUrl - Origin plus prefix every path is resolved against.
   */
  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
  }

  /**
   * Stores the bearer token attached to subsequent requests.
   *
   * @param {string | null} _token - Access token, or `null` to clear it on logout.
   * @returns {void}
   * @throws {NotImplementedError} Until implemented.
   */
  setAccessToken(_token) {
    throw new NotImplementedError('ApiClient.setAccessToken');
  }

  /**
   * Issues a GET request.
   *
   * @param {string} _path - API path, e.g. `'/api/orders'`.
   * @param {Record<string, string | number | boolean>} [_query] - Query parameters.
   * @returns {Promise<unknown>} Parsed JSON payload.
   * @throws {NotImplementedError} Until implemented.
   */
  async get(_path, _query) {
    throw new NotImplementedError('ApiClient.get');
  }

  /**
   * Issues a POST request.
   *
   * @param {string} _path - API path.
   * @param {unknown} [_body] - Payload to serialise.
   * @param {RequestOptions} [_options] - Extra headers or an abort signal.
   * @returns {Promise<unknown>} Parsed JSON payload.
   * @throws {NotImplementedError} Until implemented.
   */
  async post(_path, _body, _options) {
    throw new NotImplementedError('ApiClient.post');
  }

  /**
   * Issues a PUT request.
   *
   * @param {string} _path - API path.
   * @param {unknown} [_body] - Payload to serialise.
   * @returns {Promise<unknown>} Parsed JSON payload.
   * @throws {NotImplementedError} Until implemented.
   */
  async put(_path, _body) {
    throw new NotImplementedError('ApiClient.put');
  }

  /**
   * Issues a PATCH request.
   *
   * @param {string} _path - API path.
   * @param {unknown} [_body] - Payload to serialise.
   * @returns {Promise<unknown>} Parsed JSON payload.
   * @throws {NotImplementedError} Until implemented.
   */
  async patch(_path, _body) {
    throw new NotImplementedError('ApiClient.patch');
  }

  /**
   * Issues a DELETE request.
   *
   * @param {string} _path - API path.
   * @returns {Promise<unknown>} Parsed JSON payload, or `null` for a 204.
   * @throws {NotImplementedError} Until implemented.
   */
  async delete(_path) {
    throw new NotImplementedError('ApiClient.delete');
  }

  /**
   * One retry through the refresh endpoint before a 401 reaches the caller.
   *
   * @param {'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'} _method - HTTP verb.
   * @param {string} _path - API path.
   * @param {RequestOptions} [_options] - Body, headers, or abort signal.
   * @returns {Promise<unknown>} Parsed JSON payload.
   * @throws {NotImplementedError} Until implemented.
   */
  async request(_method, _path, _options) {
    throw new NotImplementedError('ApiClient.request');
  }

  /**
   * Status polling for tracking and the rider feed; swapped for a socket in Phase 2.
   *
   * @param {string} _path - API path to poll.
   * @param {number} _intervalMs - Delay between polls, e.g. `REALTIME.POLL_INTERVAL_MS`.
   * @param {(payload: unknown) => void} _onUpdate - Called with each fresh payload.
   * @returns {() => void} Function that stops the polling loop.
   * @throws {NotImplementedError} Until implemented.
   */
  poll(_path, _intervalMs, _onUpdate) {
    throw new NotImplementedError('ApiClient.poll');
  }
}
