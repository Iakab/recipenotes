import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  User,
  NextOrObserver,
} from "firebase/auth";

import {
  getFirestore,
  setDoc,
  getDoc,
  doc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  DocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

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

const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export type AdditionalInformation = {
  displayName?: string;
};

//Add user's credentials to db or return the snapshot
export const createUserDocumentFormAuth = async (
  userAuth: User,
  additionalInformation: AdditionalInformation = {}
): Promise<void | DocumentSnapshot<DocumentData>> => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const userUid = userAuth.uid;

    let userBio = "";

    //get photo from Google or set the default icon
    const userPhotoUrl =
      userAuth.photoURL ??
      (await getDownloadURL(ref(storage, `images/defaultUserIcon.png`)));

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        userUid,
        userPhotoUrl,
        userBio,
        ...additionalInformation,
      });
      return createUserDocumentFormAuth(userAuth);
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  }
  return userSnapshot;
};

//Check if username already exists
export const displayNameIsUnique = async (displayNameInput: string):Promise<boolean> => {
  let usernames: string[] = [];
  const querySnapshot = await getDocs(collection(db, "users"));

  querySnapshot.forEach((user) => usernames.push(user.data().displayName));

  return !usernames.find((name) => name === displayNameInput);
};

//Authentication(for Sign-up)
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

//Google Sign in
export const signInWithGooglePopup = async () => {
  await signInWithPopup(auth, googleProvider);
};

//Sign In
export const signInAuthWithUserAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

//Sign Out
export const signOutUser = async () => {
  await signOut(auth);
};

//Auth listener
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  onAuthStateChanged(auth, callback);
};

//Upload photo
export const uploadUserImage = async (file: File, userUid: string) => {
  const userImgRef = ref(storage, `images/${userUid}`);

  //with blob api
  await uploadBytes(userImgRef, file).then((snapshot) => {
    return snapshot;
  });
};

//Get img url
export const getUserImage = async (userUid: string) => {
  const userImageRef = ref(storage, `images/${userUid}`);

  try {
    return await getDownloadURL(userImageRef);
  } catch (e) {
    console.log(e);
  }
};

type Updates = {
  displayName?: string;
  userBio?: string;
};
//Update doc
export const updateUserDocumentFormAuth = async (
  userAuth: DocumentData,
  updates: Updates
):  Promise<void | DocumentSnapshot<DocumentData>>  => {
  let userDocRef = doc(db, "users", userAuth.userUid);
  try {
    await updateDoc(userDocRef, updates);

    userDocRef = doc(db, "users", userAuth.userUid);
    const snapshot = await getDoc(userDocRef);
    return snapshot;
  } catch (error) {
    console.log(error);
  }
};

//Change password
export const resetPassword = (email: string) => {
  try {
    sendPasswordResetEmail(auth, email).then(() => {
      alert("Password reset email sent!");
    });
  } catch (error) {
    console.log(error);
  }
};

//Delete user
export const deleteAccount = (password: string) => {
  if(!auth.currentUser?.email) return;
  const user:User = auth.currentUser;
  const email:string = auth.currentUser.email;

  const userImageRef = ref(storage, `images/${user.uid}`);

  const userCredentials = EmailAuthProvider.credential(
    email,
    password,
  );

  try {
    reauthenticateWithCredential(user, userCredentials).then(() => {
      deleteDoc(doc(db, "users", user.uid));
      deleteObject(userImageRef).catch((error) => {
        console.log("No picture found");
      });
      deleteUser(user).then(() => {
        alert("Account successfully deleted");
      });
    });
  } catch (error) {
    console.log(error);
  }
};
