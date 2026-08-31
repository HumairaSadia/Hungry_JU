/**
 * @fileoverview Registration controller — orchestrates validation and service
 * calls. Contains no Firebase or UI code (MVC separation of concerns).
 * @module controllers/auth.controller
 */
import { validateRegistrationForm } from '@/utils/validators';
import { isDuplicateAccount, createUserAccount, generateEmailVerificationLink } from '@/services/auth.service';

/**
 * Handles the full registration use case (US-001 main flow).
 * @param {Object} form
 * @returns {Promise<{success: boolean, status: number, data?: Object, errors?: Object}>}
 */
export async function registerUserController(form) {
  // AC-01, AC-02, AC-03, AC-05, AC-06
  const errors = validateRegistrationForm(form);
  if (Object.keys(errors).length > 0) {
    return { success: false, status: 400, errors };
  }

  try {
    // AC-04
    const duplicate = await isDuplicateAccount(form.email, form.phoneNumber);
    if (duplicate) {
      return { success: false, status: 409, errors: { contact: 'An account with this email or phone number already exists.' } };
    }

    // Password hashing handled internally by Firebase Auth
    const user = await createUserAccount(form);

    // AC-07 (email path)
    if (form.email) {
      await generateEmailVerificationLink(form.email);
    }

    return { success: true, status: 201, data: { uid: user.uid, status: user.status } };
  } catch (error) {
    // AC-15: never leak internals to the client
    console.error('[auth.controller] registration failed:', error);
    return { success: false, status: 500, errors: { general: 'Something went wrong while creating your account. Please try again.' } };
  }
}