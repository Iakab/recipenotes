import {
  collection,
  deleteField,
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

import { User } from 'firebase/auth';

import { app } from './config';
import { storage } from './storage';

import { RecipeItem } from '../api/api.types';

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

// UPLOAD CATEGORIES
export const addCollectionAndDocumentsAsBatch = async (
  collectionName: string,
  documentName: string,
  jsonToAdd: string,
) => {
  const batch = writeBatch(db);
  const docRef = doc(db, collectionName, documentName);

  batch.set(docRef, { data: jsonToAdd });
  await batch.commit();
  console.log('done');
};

// GET All DOCS FROM COLLECTION
export const getCategoriesDocument = async (collectionName: string) =>
  getDocs(collection(db, collectionName));

// Get DOC
export const getRecipesDocument = (
  collectionName: string,
  documentName: string,
) => {
  const docRef = doc(db, collectionName, documentName);
  return getDoc(docRef);
};

// UPDATE OR CREATE FAVOURITES
export const updateFavouritesCollection = async (
  collectionName: string,
  documentName: string,
  objectsToAdd: RecipeItem,
) => {
  const recipeDocRef = doc(db, collectionName, documentName);
  const favouritesSnapshot = await getDoc(recipeDocRef);

  if (favouritesSnapshot.exists()) {
    await updateDoc(recipeDocRef, { [objectsToAdd.id]: objectsToAdd });
  } else {
    await setDoc(recipeDocRef, {
      [objectsToAdd.id]: objectsToAdd,
    });
  }

  return getDoc(recipeDocRef);
};

// REMOVE RECIPE FROM FAVOURITES
export const removeRecipeFromDoc = async (
  collectionName: string,
  documentName: string,
  objectsToAdd: RecipeItem,
) => {
  const recipeDocRef = doc(db, collectionName, documentName);
  await updateDoc(recipeDocRef, {
    [objectsToAdd.id]: deleteField(),
  });

  return getDoc(recipeDocRef);
};
