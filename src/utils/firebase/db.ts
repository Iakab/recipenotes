import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { getDownloadURL, ref } from 'firebase/storage';

import { User } from 'firebase/auth';

import { app } from './config';
import { storage } from './storage';

import { RecipeItem } from '../api/api.types';

export const db = getFirestore(app);

//  Add user's credentials to db or return the snapshot
export const createUserDocumentFormAuth = async (
  userAuth: User,
  additionalInformation?: { displayName: string },
): Promise<void | DocumentSnapshot<DocumentData>> => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const { displayName } = additionalInformation || userAuth;

    const userUid = userAuth.uid;

    const userBio = '';

    //  get photo from Google or set the default icon
    const userPhotoUrl =
      userAuth.photoURL ||
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
      return await createUserDocumentFormAuth(userAuth, additionalInformation);
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

export const fetchSubcollection = (userUid: string, subcollection: string) => {
  const path = collection(db, 'users', userUid, subcollection);
  return getDocs(path);
};

export const uploadRecipe = async (
  userUid: string,
  subcollection: string,
  recipe: RecipeItem,
) => {
  const favouritesRef = doc(db, 'users', userUid, subcollection, recipe.id);

  try {
    await setDoc(favouritesRef, { ...recipe });
  } catch (error) {
    console.error(error);
  }
};

export const deleteRecipe = async (
  userUid: string,
  subcollection: string,
  recipeId: string,
) => {
  const path = doc(db, 'users', userUid, subcollection, recipeId);
  deleteDoc(path);
};

// GET All DOCS FROM COLLECTION

export const getCategoriesDocument = async () => {
  const categoriesRef = collection(db, 'categories');
  const queryResults = query(categoriesRef, orderBy('data'));

  return getDocs(queryResults);
};
