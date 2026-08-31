/**
 * @fileoverview Authentication service — the only layer that talks to Firebase.
 * Controllers call these functions; they never touch Firebase directly.
 * @module services/auth.service
 */
import { adminAuth, adminDB } from '@/lib/firebaseAdmin';
import { User, ACCOUNT_STATUS } from '@/models/User.model';

const USERS_COLLECTION = 'users';

/**
 * Checks whether an email or phone number is already registered. (AC-04)
 * @param {string} [email]
 * @param {string} [phoneNumber]
 * @returns {Promise<boolean>}
 */
export async function isDuplicateAccount(email, phoneNumber) {
  if (email) {
    const byEmail = await adminDB.collection(USERS_COLLECTION).where('email', '==', email).limit(1).get();
    if (!byEmail.empty) return true;
  }
  if (phoneNumber) {
    const byPhone = await adminDB.collection(USERS_COLLECTION).where('phoneNumber', '==', phoneNumber).limit(1).get();
    if (!byPhone.empty) return true;
  }
  return false;
}

/**
 * Creates a Firebase Auth user and a matching Firestore profile.
 * Firebase Auth hashes and stores the password internally — this app
 * never sees or stores a plaintext/hashed password itself. (AC-12)
 * @param {Object} form - validated registration form data
 * @returns {Promise<User>}
 */
export async function createUserAccount(form) {
  const userRecord = await adminAuth.createUser({
    email: form.email || undefined,
    phoneNumber: form.phoneNumber ? `+880${form.phoneNumber.slice(1)}` : undefined,
    password: form.password,
    displayName: form.fullName,
    photoURL: form.photoURL,
    disabled: false,
  });

  const user = new User({
    uid: userRecord.uid,
    fullName: form.fullName,
    email: form.email || null,
    phoneNumber: form.phoneNumber || null,
    photoURL: form.photoURL,
    gender: form.gender,
    status: ACCOUNT_STATUS.PENDING,
  });

  await adminDB.collection(USERS_COLLECTION).doc(user.uid).set(user.toFirestore());
  return user;
}

/**
 * Generates an email verification link and marks account pending. (AC-07)
 * @param {string} email
 * @returns {Promise<string>} verification link
 */
export async function generateEmailVerificationLink(email) {
  return adminAuth.generateEmailVerificationLink(email);
}

/**
 * Marks a user's profile as verified after successful OTP/link verification. (AC-09)
 * @param {string} uid
 * @returns {Promise<void>}
 */
export async function markUserVerified(uid) {
  await adminDB.collection(USERS_COLLECTION).doc(uid).update({ status: ACCOUNT_STATUS.VERIFIED });
}