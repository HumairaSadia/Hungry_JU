/**
 * @file The order lifecycle encoded as a transition table.
 *
 * @module server/services/order-state-machine
 */

import { BaseStateMachine } from '@/server/core/base-state-machine';
import { NotImplementedError } from '@/server/core/not-implemented-error';
import { ORDER_STATUS } from '@/shared/enums';

/**
 * The order lifecycle as a transition table (SRS section 6).
 * Each entry also names the role allowed to trigger it, so "vendor cancels a delivered
 * order" is rejected by the table instead of by a forgotten if-statement.
 *
 * @type {import('@/server/core/base-state-machine').TransitionTable}
 */
export const ORDER_TRANSITIONS = Object.freeze({
  [ORDER_STATUS.PLACED]: [ORDER_STATUS.ACCEPTED, ORDER_STATUS.REJECTED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.ACCEPTED]: [ORDER_STATUS.PREPARING, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.PREPARING]: [ORDER_STATUS.READY],
  [ORDER_STATUS.READY]: [ORDER_STATUS.PICKED_UP],
  [ORDER_STATUS.PICKED_UP]: [ORDER_STATUS.DELIVERED],
  [ORDER_STATUS.DELIVERED]: [],
  [ORDER_STATUS.CANCELLED]: [],
  [ORDER_STATUS.REJECTED]: [],
});

/**
 * State machine bound to {@link ORDER_TRANSITIONS}; the only place order status moves.
 *
 * @augments BaseStateMachine
 */
export class OrderStateMachine extends BaseStateMachine {
  /**
   * Binds the machine to the frozen {@link ORDER_TRANSITIONS} table.
   */
  constructor() {
    super(ORDER_TRANSITIONS);
  }

  /**
   * Whether a transition exists in the table.
   *
   * @override
   * @param {import('@/shared/types').OrderStatus} _from - Current status.
   * @param {import('@/shared/types').OrderStatus} _to - Requested status.
   * @returns {boolean} `true` when the move is legal.
   * @throws {NotImplementedError} Until implemented.
   */
  can(_from, _to) {
    throw new NotImplementedError('OrderStateMachine.can');
  }

  /**
   * Asserts the transition is legal for this role, throwing BusinessRuleError otherwise.
   *
   * @override
   * @param {import('@/shared/types').OrderStatus} _from - Current status.
   * @param {import('@/shared/types').OrderStatus} _to - Requested status.
   * @param {import('@/shared/types').UserRole} _actorRole - Role attempting the move.
   * @returns {void} Returns nothing when the move is allowed.
   * @throws {NotImplementedError} Until implemented.
   */
  assertCan(_from, _to, _actorRole) {
    throw new NotImplementedError('OrderStateMachine.assertCan');
  }

  /**
   * Statuses reachable from one status.
   *
   * @override
   * @param {import('@/shared/types').OrderStatus} _state - Source status.
   * @returns {import('@/shared/types').OrderStatus[]} Reachable statuses.
   * @throws {NotImplementedError} Until implemented.
   */
  allowedFrom(_state) {
    throw new NotImplementedError('OrderStateMachine.allowedFrom');
  }

  /**
   * Whether a status is final.
   *
   * @override
   * @param {import('@/shared/types').OrderStatus} _state - Status to test.
   * @returns {boolean} `true` for delivered, cancelled, and rejected.
   * @throws {NotImplementedError} Until implemented.
   */
  isTerminal(_state) {
    throw new NotImplementedError('OrderStateMachine.isTerminal');
  }

  /**
   * BR-04 in one place: the cancel button and the API share this answer.
   *
   * @param {import('@/shared/types').OrderStatus} _state - Current status.
   * @returns {boolean} `true` while the order may still be cancelled.
   * @throws {NotImplementedError} Until implemented.
   */
  // isCancellable(_state) {
  //   throw new NotImplementedError('OrderStateMachine.isCancellable');
  // }
  static isCancellable(status) {
  return status === ORDER_STATUS.PLACED || status === ORDER_STATUS.ACCEPTED;
}

  /**
   * Which role may drive this transition (student, vendor, delivery partner, scheduler).
   *
   * @param {import('@/shared/types').OrderStatus} _from - Current status.
   * @param {import('@/shared/types').OrderStatus} _to - Requested status.
   * @returns {string} Role or actor name permitted to make the move.
   * @throws {NotImplementedError} Until implemented.
   */
  actorFor(_from, _to) {
    throw new NotImplementedError('OrderStateMachine.actorFor');
  }
}
