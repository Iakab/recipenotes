import {
  getFirestore,
  setDoc,
  getDoc,
  doc,
  collection,
  getDocs,
  updateDoc,
  DocumentSnapshot,
  DocumentData,
  query,
  where,
} from 'firebase/firestore';

import { getDownloadURL, ref } from 'firebase/storage';

import { User } from 'firebase/auth';
import { app } from './config';
import { storage } from './storage';

export const db = getFirestore(app);

//  Add user's credentials to db or return the snapshot
export const createUserDocumentFormAuth = async (
  userAuth: User,
  additionalInformation = {},
): Promise<void | DocumentSnapshot<DocumentData>> => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const userUid = userAuth.uid;

    const userBio = '';

    //  get photo from Google or set the default icon
    const userPhotoUrl =
      userAuth.photoURL ??
      (await getDownloadURL(ref(storage, 'images/defaultUserIcon.png')));

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        userUid,
        userPhotoUrl,
        userBio,
        ...additionalInformation,
      });
      return await createUserDocumentFormAuth(userAuth);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  return userSnapshot;
};

//  Check if username already exists
export const displayNameIsUnique = async (displayNameInput: string) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('displayName', '==', displayNameInput));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return true;
  }
  return false;
};

export type Updates = {
  displayName?: string;
  userBio?: string;
  userPhotoUrl?: string;
};
//  Update doc
export const updateUserDocumentFormAuth = async (
  userAuth: DocumentData,
  updates: Updates,
): Promise<void | DocumentSnapshot<DocumentData>> => {
  let userDocRef = doc(db, 'users', userAuth.userUid);

  updateDoc(userDocRef, updates);

  userDocRef = doc(db, 'users', userAuth.userUid);
  const snapshot = await getDoc(userDocRef);
  return snapshot;
};
