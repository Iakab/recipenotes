import {
  createContext,
  useState,
  useEffect,
  SetStateAction,
  PropsWithChildren,
} from 'react';

import { DocumentData } from 'firebase/firestore';

import { onAuthStateChangedListener } from '../utils/firebase/auth';

import {
  createUserDocumentFormAuth,
  updateUserDocumentFormAuth,
  Updates,
} from '../utils/firebase/db';

type UserContextType = {
  currentUser?: DocumentData | null;
  setCurrentUser: React.Dispatch<SetStateAction<DocumentData | null>>;
  userIsLoading: boolean;
  setUpdateUserDoc: React.Dispatch<SetStateAction<Updates | null | undefined>>;
};

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => null,
  userIsLoading: true,
  setUpdateUserDoc: () => null,
});

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const [currentUser, setCurrentUser] = useState<
    DocumentData | null | undefined
  >(null);
  const [userIsLoading, setUserIsLoading] = useState(true);
  const [updateUserDoc, setUpdateUserDoc] = useState<
    Updates | null | undefined
  >(null);

  useEffect(() => {
    onAuthStateChangedListener(async (user) => {
      if (user) {
        try {
          const userSnapshot = await createUserDocumentFormAuth(user);
          setCurrentUser(userSnapshot?.data());
          setUserIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      } else {
        setCurrentUser(null);
        setUserIsLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (updateUserDoc && currentUser) {
      const update = async () => {
        const snapshot = await updateUserDocumentFormAuth(
          currentUser,
          updateUserDoc,
        );
        setCurrentUser(snapshot?.data());
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
