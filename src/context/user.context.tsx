import {
  createContext,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { DocumentData } from 'firebase/firestore';

import { onAuthStateChangedListener } from 'utils/firebase/auth';

import {
  createUserDocumentFormAuth,
  Updates,
  updateUserDocumentFormAuth,
} from 'utils/firebase/db';

type UserContextType = {
  currentUser?: DocumentData | null;
  setCurrentUser: React.Dispatch<SetStateAction<DocumentData | null>>;
  setUpdateUserDoc: React.Dispatch<SetStateAction<Updates | null | undefined>>;
  userIsLoading: boolean;
};

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => null,
  setUpdateUserDoc: () => null,
  userIsLoading: true,
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
    setUpdateUserDoc,
    userIsLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
