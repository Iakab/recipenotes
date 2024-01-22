import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFormAuth,
  updateUserDocumentFormAuth,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  userIsLoading: true,
  setUserIsLoading: () => true,
  updateUserDoc: null,
  setUpdateUserDoc: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userIsLoading, setUserIsLoading] = useState(true);
  const [updateUserDoc, setUpdateUserDoc] = useState(null);


  useEffect(() => {
    onAuthStateChangedListener(async (user) => {
      if (user) {
        try {
          const userSnapshot = await createUserDocumentFormAuth(user);
          setCurrentUser(userSnapshot.data());
          setUserIsLoading(false);
        } catch(error) {
          console.log(error);
        }


      } else {
        setCurrentUser(null);
        setUserIsLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (!updateUserDoc) {
      return;
    } else {
      const update = async () => {
        const snapshot = await updateUserDocumentFormAuth(
          currentUser,
          updateUserDoc
        );
        setCurrentUser(snapshot.data());
      };
      update();
    }
  }, [updateUserDoc]);

  const value = {
    currentUser,
    setCurrentUser,
    userIsLoading,
    setUpdateUserDoc,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
