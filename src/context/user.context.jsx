import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFormAuth,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  console.log(currentUser)
  useEffect(() => {
    onAuthStateChangedListener(async (user) => {
      if (user) {
        const userSnapshot = await createUserDocumentFormAuth(user);
        
        setCurrentUser(userSnapshot.data());
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
