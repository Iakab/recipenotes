import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  getAuth,
  GoogleAuthProvider,
  NextOrObserver,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';

import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

import { storage } from './storage';
import { db } from './db';

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

//  Authentication(for Sign-up)
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
) =>
  createUserWithEmailAndPassword(auth, email, password).then(
    (userAuth) => userAuth,
  );

//  Google Sign in
export const signInWithGooglePopup = async () =>
  signInWithPopup(auth, googleProvider);

//  Sign In
export const signInAuthWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  if (email && password) {
    await signInWithEmailAndPassword(auth, email, password);
  }
};

//  Sign Out
export const signOutUser = async () => signOut(auth);

//  Change password
export const resetPassword = (email: string) => {
  try {
    sendPasswordResetEmail(auth, email).then(() => {
      alert('Password reset email sent!');
    });
  } catch (error) {
    console.log(error);
  }
};

//  Delete user
export const deleteAccount = (password: string) => {
  const { currentUser } = auth;
  const { email } = currentUser || {};

  if (!currentUser || !email) return;

  const userImageRef = ref(storage, `images/${currentUser.uid}`);

  const userCredentials = EmailAuthProvider.credential(email, password);

  try {
    reauthenticateWithCredential(currentUser, userCredentials).then(() => {
      deleteDoc(doc(db, 'users', currentUser.uid));
      deleteObject(userImageRef).catch((error) => {
        console.log((error as Error).message);
      });
      deleteUser(currentUser).then(() => {
        alert('Account successfully deleted');
      });
    });
  } catch (error) {
    console.log(error);
  }
};

//  Auth listener
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);
