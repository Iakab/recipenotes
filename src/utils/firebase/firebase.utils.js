import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  getFirestore,
  setDoc,
  getDoc,
  doc,
  collection,
  getDocs,
} from "firebase/firestore";

// App's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOrEUXEpq4aPiltPuYHaj3wNYkYBkdghQ",
  authDomain: "recipenotes-e07df.firebaseapp.com",
  projectId: "recipenotes-e07df",
  storageBucket: "recipenotes-e07df.appspot.com",
  messagingSenderId: "416432297722",
  appId: "1:416432297722:web:5d43b64c9887ecd80c5b43",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

//Add user's credentials to db or return the snapshot
export const createUserDocumentFormAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        ...additionalInformation,
      });
      return createUserDocumentFormAuth(userAuth);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return userSnapshot;
};

//Check if username already exists
export const displayNameIsUnique = async (displayNameInput) => {
  let usernames = [];
  const querySnapshot = await getDocs(collection(db, "users"));

  querySnapshot.forEach((user) => usernames.push(user.data().displayName));

  return !usernames.find((name) => name === displayNameInput);
};

//Authentication(for Sign-up)
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

//Google Sign in
export const signInWithGooglePopup = async () => {
  await signInWithPopup(auth, googleProvider);
};

//Sign In
export const signInAuthWithUserAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

//Sign Out
export const signOutUser = async () => {
  await signOut(auth);
};

//Auth listener
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
