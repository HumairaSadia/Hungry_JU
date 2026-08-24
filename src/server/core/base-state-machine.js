/**
 * @file Generic transition-table state machine.
 *
 * @module server/core/base-state-machine
 */

import { NotImplementedError } from '@/server/core/not-implemented-error';

/**
 * A transition table: each state maps to the states reachable from it.
 *
 * @typedef {Readonly<Record<string, readonly string[]>>} TransitionTable
 */

/**
 * Generic transition-table state machine.
 * SRS section 6 recommends encoding order status as a table so illegal transitions are
 * impossible by construction instead of guarded by scattered if-statements.
 *
 * @abstract
 */
export class BaseStateMachine {
  /** @type {TransitionTable} */
  #transitions;

  /**
   * @param {TransitionTable} transitions - Allowed transitions, keyed by source state.
   * @throws {TypeError} When constructed directly instead of through a subclass.
   */
  constructor(transitions) {
    if (new.target === BaseStateMachine) {
      throw new TypeError('BaseStateMachine is abstract');
    }
    this.#transitions = transitions;
  }

  /**
   * The transition table backing this machine.
   *
   * @returns {TransitionTable} Frozen table.
   */
  get transitions() {
    return this.#transitions;
  }

  /**
   * Whether a transition exists in the table.
   *
   * @abstract
   * @param {string} _from - Current state.
   * @param {string} _to - Requested next state.
   * @returns {boolean} `true` when the move is legal.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  can(_from, _to) {
    throw new NotImplementedError(`${this.constructor.name}.can`);
  }

  /**
   * Throws BusinessRuleError when the transition is absent from the table.
   *
   * @abstract
   * @param {string} _from - Current state.
   * @param {string} _to - Requested next state.
   * @param {import('@/shared/types').UserRole} _actorRole - Role attempting the move.
   * @returns {void} Returns nothing when the move is allowed.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  assertCan(_from, _to, _actorRole) {
    throw new NotImplementedError(`${this.constructor.name}.assertCan`);
  }

  /**
   * Lists the states reachable from one state.
   *
   * @abstract
   * @param {string} _state - Source state.
   * @returns {string[]} Reachable states, empty when terminal.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  allowedFrom(_state) {
    throw new NotImplementedError(`${this.constructor.name}.allowedFrom`);
  }

  /**
   * Whether a state has no outgoing transitions.
   *
   * @abstract
   * @param {string} _state - State to test.
   * @returns {boolean} `true` when the state is final.
   * @throws {NotImplementedError} Until a subclass implements it.
   */
  isTerminal(_state) {
    throw new NotImplementedError(`${this.constructor.name}.isTerminal`);
  }
}
