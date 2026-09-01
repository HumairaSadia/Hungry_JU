import { getPasswordStrength } from '@/utils/passwordStrength';

describe('getPasswordStrength (AC-13)', () => {
  test('Weak for a short simple password', () => expect(getPasswordStrength('abc')).toBe('Weak'));
  test('Medium for a moderate password', () =>
    expect(getPasswordStrength('Password1')).toBe('Medium'));
  test('Strong for a long complex password', () =>
    expect(getPasswordStrength('Password@12345')).toBe('Strong'));
});
