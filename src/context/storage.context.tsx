import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import {
  deleteRecipe,
  fetchSubcollection,
  uploadRecipe,
} from 'utils/firebase/db';

import { RecipeItem, RecipeItemToUpload, Recipes } from 'utils/api/api.types';

import { useUserContext } from './user.context';

type StorageContextType = {
  displayMessage: string | undefined;
  imgToStore: File | undefined;
  isLoading: boolean;
  recipeToUpload: RecipeItemToUpload | undefined;
  removeItemFromStorage: (recipeId?: string, selectedIds?: string[]) => void;
  setDisplayMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  setImgToStore: React.Dispatch<React.SetStateAction<File | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setRecipeToUpload: React.Dispatch<
    React.SetStateAction<RecipeItemToUpload | undefined>
  >;
  storedRecipes: Recipes | undefined;
  uploadNewRecipe: (recipeToAdd: RecipeItem) => Promise<void>;
};

export const StorageContext = createContext<StorageContextType>({
  displayMessage: undefined,
  imgToStore: undefined,
  isLoading: true,
  recipeToUpload: undefined,
  removeItemFromStorage: () => {},
  setDisplayMessage: () => {},
  setImgToStore: () => {},
  setIsLoading: () => {},
  setRecipeToUpload: () => {},
  storedRecipes: undefined,
  uploadNewRecipe: async () => {},
});

export const StorageProvider = ({ children }: PropsWithChildren) => {
  const [displayMessage, setDisplayMessage] = useState<string>();
  const [imgToStore, setImgToStore] = useState<File>();
  const [isLoading, setIsLoading] = useState(true);
  const [recipeToUpload, setRecipeToUpload] = useState<RecipeItemToUpload>();
  const [storedRecipes, setStoredRecipes] = useState<Recipes>();
  const collectionName = 'storage';

  const { currentUser, userIsLoading } = useUserContext();

  const addTimeStamp = (recipe: RecipeItem) => {
    const recipeToAdd = recipe;

    const timeStamp = Intl.DateTimeFormat('fr-FR').format(new Date());
    recipeToAdd.lastEdit = timeStamp;

    return recipeToAdd;
  };

  const updateContext = async () => {
    const data = (
      await fetchSubcollection(currentUser?.userUid, collectionName)
    ).docs;

    if (data) {
      const recipes = data.map((document) => document.data());
      setStoredRecipes(recipes as Recipes);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!userIsLoading && currentUser) {
      updateContext();
    }
  }, [currentUser]);

  const isItemStored = (itemId: string) =>
    storedRecipes?.find((savedRecipe: RecipeItem) => savedRecipe.id === itemId);

  const uploadNewRecipe = async (item: RecipeItem) => {
    const itemIsAlreadyAdded = isItemStored(item.id);

    try {
      if (!itemIsAlreadyAdded) {
        const recipeToAdd = addTimeStamp(item);

        await uploadRecipe(currentUser?.userUid, collectionName, recipeToAdd);

        updateContext();
        setDisplayMessage('Successfully stored');
      } else {
        setIsLoading(false);
        throw new Error('Recipe already added');
      }
    } catch (error) {
      setDisplayMessage((error as Error).message);
    }
  };

  const removeItemFromStorage = (recipeId?: string, selectedIds?: string[]) => {
    if (selectedIds) {
      selectedIds.forEach((id: string) => {
        deleteRecipe(currentUser?.userUid, collectionName, id);
        updateContext();
      });
    }

    if (recipeId) {
      deleteRecipe(currentUser?.userUid, collectionName, recipeId);
      updateContext();
    }
  };

  const value = {
    displayMessage,
    imgToStore,
    isLoading,
    recipeToUpload,
    removeItemFromStorage,
    setDisplayMessage,
    setImgToStore,
    setIsLoading,
    setRecipeToUpload,
    storedRecipes,
    uploadNewRecipe,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};
