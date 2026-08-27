import { OrderStateMachine } from '@/server/services/order-state-machine';

describe('Cancel Order - OrderStateMachine', () => {
  describe('isCancellable', () => {
    test('allows cancellation for placed orders', () => {
      expect(OrderStateMachine.isCancellable('placed')).toBe(true);
    });

    test('allows cancellation for accepted orders', () => {
      expect(OrderStateMachine.isCancellable('accepted')).toBe(true);
    });

    test('does not allow cancellation for preparing orders', () => {
      expect(OrderStateMachine.isCancellable('preparing')).toBe(false);
    });

    test('does not allow cancellation for ready orders', () => {
      expect(OrderStateMachine.isCancellable('ready')).toBe(false);
    });

    test('does not allow cancellation for picked up orders', () => {
      expect(OrderStateMachine.isCancellable('picked_up')).toBe(false);
    });

    test('does not allow cancellation for delivered orders', () => {
      expect(OrderStateMachine.isCancellable('delivered')).toBe(false);
    });

    test('does not allow cancellation for cancelled orders', () => {
      expect(OrderStateMachine.isCancellable('cancelled')).toBe(false);
    });

    test('does not allow cancellation for rejected orders', () => {
      expect(OrderStateMachine.isCancellable('rejected')).toBe(false);
    });
  });
});