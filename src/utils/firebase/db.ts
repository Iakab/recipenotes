import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';

import { getDownloadURL, ref } from 'firebase/storage';

import { User, getAuth } from 'firebase/auth';

import { app } from './config';
import { storage } from './storage';

import { Recipes, RecipeItem } from '../api/api.types';

export const db = getFirestore(app);
const auth = getAuth();
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
        ...additionalInformation,
        displayName,
        email,
        userBio,
        userPhotoUrl,
        userUid,
      });
      await createUserDocumentFormAuth(userAuth);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  return userSnapshot;
};

//  Check if username already exists
export const displayNameIsUnique = async (displayNameInput: string) => {
  const usersRef = collection(db, 'users');
  const queryResults = query(
    usersRef,
    where('displayName', '==', displayNameInput),
  );
  const docSnapshot = await getDocs(queryResults);
  return docSnapshot.empty;
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
  return getDoc(userDocRef);
};

export const addCollectionAndDocuments = async (
  objectsToAdd: Recipes,
  collectionName: string,
  documentName: string,
) => {
  const collectionRef = collection(db, collectionName);
  const batch = writeBatch(db);
  const docRef = doc(collectionRef, documentName);

  batch.set(docRef, objectsToAdd);
  await batch.commit();
  console.log('done');
};

export const getRecipesDocument = async (
  collectionName: string,
  documentName: string,
) => {
  const docRef = doc(db, collectionName, documentName);
  const docSnapshot = await getDoc(docRef);
  return docSnapshot;
};
