import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import {
  uploadRecipe,
  fetchSubcollection,
  deleteRecipe,
} from 'utils/firebase/db';

import { RecipeItem, Recipes } from 'utils/api/api.types';

import { useUserContext } from './user.context';

type StorageContextType = {
  displayMessage: string | undefined;
  isLoading: boolean;
  removeItemFromStorage: (recipeId?: string, selectedIds?: string[]) => void;
  setDisplayMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  storedRecipes: Recipes | undefined;
  uploadNewRecipe: (recipeToAdd: RecipeItem) => Promise<void>;
};

export const StorageContext = createContext<StorageContextType>({
  displayMessage: undefined,
  isLoading: true,
  removeItemFromStorage: () => {},
  setDisplayMessage: () => {},
  setIsLoading: () => {},
  storedRecipes: undefined,
  uploadNewRecipe: async () => {},
});

export const StorageProvider = ({ children }: PropsWithChildren) => {
  const [displayMessage, setDisplayMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [storedRecipes, setStoredRecipes] = useState<Recipes>();
  const { currentUser, userIsLoading } = useUserContext();
<<<<<<< Updated upstream

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
=======
  const collectionName = 'storage';
>>>>>>> Stashed changes

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

  const isItemStored = (item: RecipeItem) =>
    storedRecipes?.find(
      (savedRecipe: RecipeItem) => savedRecipe.id === item.id,
    );

  const uploadNewRecipe = async (item: RecipeItem) => {
    const itemIsAlreadyAdded = isItemStored(item);

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

<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
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
