import { isValidEmail, isValidPhone, isStrongPassword, passwordsMatch, validateRegistrationForm } from '@/utils/validators';

describe('isValidEmail (AC-02)', () => {
  test('accepts a valid email', () => expect(isValidEmail('user@gmail.com')).toBe(true));
  test('rejects email missing @', () => expect(isValidEmail('usergmail.com')).toBe(false));
  test('rejects email missing local part', () => expect(isValidEmail('@gmail.com')).toBe(false));
});

describe('isValidPhone (AC-03)', () => {
  test('accepts a valid BD phone number', () => expect(isValidPhone('01712345678')).toBe(true));
  test('rejects a too-short number', () => expect(isValidPhone('12345')).toBe(false));
  test('rejects a number containing letters', () => expect(isValidPhone('01712abc678')).toBe(false));
});

describe('isStrongPassword (AC-05)', () => {
  test('accepts a strong password', () => expect(isStrongPassword('Password@123')).toBe(true));
  test('rejects a weak password', () => expect(isStrongPassword('password123')).toBe(false));
});

describe('passwordsMatch (AC-06)', () => {
  test('true when equal', () => expect(passwordsMatch('abc', 'abc')).toBe(true));
  test('false when different', () => expect(passwordsMatch('abc', 'abd')).toBe(false));
});

describe('validateRegistrationForm (AC-01)', () => {
  const validForm = {
    fullName: 'Jane Doe', email: 'jane@example.com', phoneNumber: '',
    photoURL: 'https://example.com/photo.jpg', gender: 'female',
    password: 'Password@123', confirmPassword: 'Password@123', acceptedTerms: true,
  };
  test('no errors for a valid form', () => expect(validateRegistrationForm(validForm)).toEqual({}));
  test('requires at least one contact method', () => {
    expect(validateRegistrationForm({ ...validForm, email: '' }).contact).toBeDefined();
  });
});