import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import {
  addCollectionAndDocumentsAsBatch,
  getRecipesDocument,
} from 'utils/firebase/db';

import { RecipeItem, Recipes } from 'utils/api/api.types';

import { useUserContext } from './user.context';

type StorageContextType = {
  displayMessage: Error | undefined;
  isLoading: boolean;
  removeItemFromStorage: (
    recipeId?: string,
    selectedIds?: string[],
  ) => Promise<void>;
  setDisplayMessage: React.Dispatch<React.SetStateAction<Error | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  storedRecipes: Recipes | undefined;
  uploadNewRecipe: (recipeToAdd: RecipeItem) => Promise<void>;
};

export const StorageContext = createContext<StorageContextType>({
  displayMessage: undefined,
  isLoading: true,
  removeItemFromStorage: async () => {},
  setDisplayMessage: () => {},
  setIsLoading: () => {},
  storedRecipes: undefined,
  uploadNewRecipe: async () => {},
});

export const StorageProvider = ({ children }: PropsWithChildren) => {
  const [displayMessage, setDisplayMessage] = useState<Error>();
  const [isLoading, setIsLoading] = useState(true);
  const [storedRecipes, setStoredRecipes] = useState<Recipes>();

  const { currentUser, userIsLoading } = useUserContext();

  const getData = async () => {
    const data = (
      await getRecipesDocument('storage', currentUser?.userUid)
    ).data()?.data;
    if (data) {
      return JSON.parse(data);
    }
    return null;
  };

  const uploadRecipes = async (newRecipesCollection: Recipes | undefined) => {
    await addCollectionAndDocumentsAsBatch(
      'storage',
      currentUser?.userUid,
      JSON.stringify(newRecipesCollection),
    );
    setStoredRecipes(await getData());
    setIsLoading(false);
  };

  const addTimeStamp = (recipe: RecipeItem) => {
    const recipeToAdd = recipe;

    const timeStamp = Intl.DateTimeFormat('fr-FR').format(new Date());
    recipeToAdd.lastEdit = timeStamp;

    return recipeToAdd;
  };

  const isUnique = (item: RecipeItem) =>
    !storedRecipes?.find(
      (savedRecipe: RecipeItem) => savedRecipe.id === item.id,
    );

  useEffect(() => {
    if (!storedRecipes && currentUser && !userIsLoading) {
      const fetchStoredData = async () => {
        setStoredRecipes(await getData());
        setIsLoading(false);
      };
      fetchStoredData();
    }
  }, [currentUser]);

  const uploadNewRecipe = async (recipe: RecipeItem) => {
    const recipeToAdd = addTimeStamp(recipe);

    if (storedRecipes) {
      try {
        if (isUnique(recipeToAdd)) {
          await addCollectionAndDocumentsAsBatch(
            'storage',
            currentUser?.userUid,
            JSON.stringify([...storedRecipes, recipeToAdd]),
          );
        } else {
          throw new Error('Recipe is already saved in your storage');
        }
      } catch (error) {
        setDisplayMessage(error as Error);
      }
    } else {
      uploadRecipes([recipeToAdd]);
    }

    setStoredRecipes(await getData());
    setIsLoading(false);
  };

  // TODO: remove toString() after rebuilding the categories in firestore
  const removeItemFromStorage = async (
    recipeId?: string,
    selectedIds?: string[],
  ) => {
    if (recipeId) {
      const newRecipesCollection = storedRecipes?.filter(
        (recipe: RecipeItem) => recipe.id.toString() !== recipeId,
      );

      uploadRecipes(newRecipesCollection);
    } else {
      const newRecipesCollection = storedRecipes?.filter(
        (recipe: RecipeItem) => !selectedIds?.includes(recipe.id.toString()),
      );

      uploadRecipes(newRecipesCollection);
    }
  };

  const value = {
    displayMessage,
    isLoading,
    removeItemFromStorage,
    setDisplayMessage,
    setIsLoading,
    storedRecipes,
    uploadNewRecipe,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};
