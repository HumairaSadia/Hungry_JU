import { registerUserController } from '@/controllers/auth.controller';
import * as authService from '@/services/auth.service';

jest.mock('@/services/auth.service', () => ({
  isDuplicateAccount: jest.fn(),
  createUserAccount: jest.fn(),
  generateEmailVerificationLink: jest.fn(),
  markUserVerified: jest.fn(),
}));

const validForm = {
  fullName: 'Jane Doe', email: 'jane@example.com', phoneNumber: '',
  photoURL: 'https://example.com/photo.jpg', gender: 'female',
  password: 'Password@123', confirmPassword: 'Password@123', acceptedTerms: true,
};

describe('registerUserController', () => {
  beforeEach(() => jest.clearAllMocks());

  test('returns 400 when validation fails', async () => {
    const result = await registerUserController({ ...validForm, password: 'weak' });
    expect(result.status).toBe(400);
  });

  test('returns 409 for a duplicate account (AC-04)', async () => {
    authService.isDuplicateAccount.mockResolvedValue(true);
    const result = await registerUserController(validForm);
    expect(result.status).toBe(409);
  });

  test('returns 201 on success (AC-16)', async () => {
    authService.isDuplicateAccount.mockResolvedValue(false);
    authService.createUserAccount.mockResolvedValue({ uid: 'abc123', status: 'pending_verification' });
    authService.generateEmailVerificationLink.mockResolvedValue('https://verify.link');
    const result = await registerUserController(validForm);
    expect(result.status).toBe(201);
    expect(authService.createUserAccount).toHaveBeenCalledWith(validForm);
  });
});