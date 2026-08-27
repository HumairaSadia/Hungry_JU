/**
 * @file Browser-side HTTP client used by every component.
 *
 * @module lib/api-client
 */

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
 * A non-2xx answer from the API, carrying the server error envelope so a component can
 * branch on `code` (e.g. `BUSINESS_RULE_03` for the single-vendor cart rule) instead of
 * matching on message text.
 *
 * @augments Error
 */
export class ApiError extends Error {
  /** @type {number} */
  #status;

  /** @type {string} */
  #code;

  /** @type {unknown} */
  #details;

  /**
   * @param {string} message - Client-safe reason from the error envelope.
   * @param {number} status - HTTP status of the failed response.
   * @param {string} [code] - Machine-readable code from the envelope.
   * @param {unknown} [details] - Field-level issues, when the failure was a validation one.
   */
  constructor(message, status, code = 'APP_ERROR', details = null) {
    super(message);
    this.name = 'ApiError';
    this.#status = status;
    this.#code = code;
    this.#details = details;
  }

  /**
   * HTTP status of the failed response.
   *
   * @returns {number} Status code.
   */
  get status() {
    return this.#status;
  }

  /**
   * Machine-readable failure code.
   *
   * @returns {string} Code such as `'BUSINESS_RULE_03'`.
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
}

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
   * @param {string | null} token - Access token, or `null` to clear it on logout.
   * @returns {void}
   */
  setAccessToken(token) {
    this.#accessToken = token ?? undefined;
  }

  /**
   * Issues a GET request.
   *
   * @param {string} path - API path, e.g. `'/api/orders'`.
   * @param {Record<string, string | number | boolean>} [query] - Query parameters.
   * @returns {Promise<unknown>} Parsed JSON payload.
   */
  async get(path, query) {
    return this.request('GET', this.#withQuery(path, query));
  }

  /**
   * Issues a POST request.
   *
   * @param {string} path - API path.
   * @param {unknown} [body] - Payload to serialise.
   * @param {RequestOptions} [options] - Extra headers or an abort signal.
   * @returns {Promise<unknown>} Parsed JSON payload.
   */
  async post(path, body, options = {}) {
    return this.request('POST', path, { ...options, body });
  }

  /**
   * Issues a PUT request.
   *
   * @param {string} path - API path.
   * @param {unknown} [body] - Payload to serialise.
   * @returns {Promise<unknown>} Parsed JSON payload.
   */
  async put(path, body) {
    return this.request('PUT', path, { body });
  }

  /**
   * Issues a PATCH request.
   *
   * @param {string} path - API path.
   * @param {unknown} [body] - Payload to serialise.
   * @returns {Promise<unknown>} Parsed JSON payload.
   */
  async patch(path, body) {
    return this.request('PATCH', path, { body });
  }

  /**
   * Issues a DELETE request.
   *
   * @param {string} path - API path.
   * @returns {Promise<unknown>} Parsed JSON payload, or `null` for a 204.
   */
  async delete(path) {
    return this.request('DELETE', path);
  }

  /**
   * One retry through the refresh endpoint before a 401 reaches the caller.
   *
   * @param {'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'} method - HTTP verb.
   * @param {string} path - API path.
   * @param {RequestOptions} [options] - Body, headers, or abort signal.
   * @returns {Promise<unknown>} Parsed JSON payload.
   * @throws {ApiError} When the API answers with a non-2xx status.
   */
  async request(method, path, options = {}) {
    const response = await this.#send(method, path, options);
    if (response.status !== 401) {
      return this.#unwrap(response);
    }

    // The access token is short-lived (15m); one silent refresh keeps the user in place.
    const refreshed = await this.#refresh();
    if (!refreshed) {
      return this.#unwrap(response);
    }
    return this.#unwrap(await this.#send(method, path, options));
  }

  /**
   * Status polling for tracking and the rider feed; swapped for a socket in Phase 2.
   *
   * @param {string} path - API path to poll.
   * @param {number} intervalMs - Delay between polls, e.g. `REALTIME.POLL_INTERVAL_MS`.
   * @param {(payload: unknown) => void} onUpdate - Called with each fresh payload.
   * @returns {() => void} Function that stops the polling loop.
   */
  poll(path, intervalMs, onUpdate) {
    let stopped = false;
    const timer = setInterval(async () => {
      try {
        const payload = await this.get(path);
        if (!stopped) {
          onUpdate(payload);
        }
      } catch {
        // A single failed poll is not fatal; the next tick retries.
      }
    }, intervalMs);

    return () => {
      stopped = true;
      clearInterval(timer);
    };
  }

  /**
   * Performs one fetch with the shared headers applied.
   *
   * @param {string} method - HTTP verb.
   * @param {string} path - API path.
   * @param {RequestOptions} options - Body, headers, or abort signal.
   * @returns {Promise<Response>} The raw response, whatever its status.
   */
  async #send(method, path, options) {
    /** @type {Record<string, string>} */
    const headers = { Accept: 'application/json', ...(options.headers ?? {}) };
    if (this.#accessToken) {
      headers.Authorization = `Bearer ${this.#accessToken}`;
    }
    if (options.body !== undefined) {
      headers['Content-Type'] = 'application/json';
    }

    return fetch(`${this.#baseUrl}${path}`, {
      method,
      headers,
      // The refresh token lives in an httpOnly cookie, so credentials must ride along.
      credentials: 'include',
      signal: options.signal,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });
  }

  /**
   * Exchanges the refresh cookie for a new access token.
   *
   * @returns {Promise<boolean>} `true` when a fresh token was stored.
   */
  async #refresh() {
    try {
      const response = await fetch(`${this.#baseUrl}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) {
        return false;
      }
      const payload = await response.json();
      if (!payload?.accessToken) {
        return false;
      }
      this.setAccessToken(payload.accessToken);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Turns a response into its payload, or into an {@link ApiError}.
   *
   * @param {Response} response - Response to read.
   * @returns {Promise<unknown>} Parsed payload, or `null` for a 204.
   * @throws {ApiError} When the status is not 2xx.
   */
  async #unwrap(response) {
    if (response.status === 204) {
      return null;
    }

    const payload = await response.json().catch(() => null);
    if (response.ok) {
      return payload;
    }

    const envelope = payload?.error ?? {};
    throw new ApiError(
      envelope.message ?? `Request failed with status ${response.status}`,
      response.status,
      envelope.code,
      envelope.details ?? null
    );
  }

  /**
   * Appends a query string, skipping empty parameters.
   *
   * @param {string} path - API path.
   * @param {Record<string, string | number | boolean>} [query] - Query parameters.
   * @returns {string} Path with its query string, when there is one.
   */
  #withQuery(path, query) {
    if (!query) {
      return path;
    }
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== '') {
        search.set(key, String(value));
      }
    }
    const queryString = search.toString();
    return queryString ? `${path}?${queryString}` : path;
  }
}

/**
 * Shared client instance. Paths are relative, so requests hit the same origin the app
 * was served from and no build-time origin has to be baked in.
 *
 * @type {ApiClient}
 */
export const apiClient = new ApiClient('');
