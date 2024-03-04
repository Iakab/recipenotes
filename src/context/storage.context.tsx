import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import {
  addCollectionAndDocumentsAsBatch,
  getRecipesDocument,
} from 'utils/firebase/db';

import { RecipeItem, Recipes } from 'utils/api/api.types';

import { useUserContext } from './user.context';

type StorageContextType = {
  removeItemFromStorage: (recipeToRemove: string) => Promise<void>;
  storedRecipes: Recipes | undefined;
  uploadNewRecipe: (recipeToAdd: RecipeItem) => Promise<void>;
};

export const StorageContext = createContext<StorageContextType>({
  removeItemFromStorage: async () => {},
  storedRecipes: undefined,
  uploadNewRecipe: async () => {},
});

export const StorageProvider = ({ children }: PropsWithChildren) => {
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

  const isUnique = (item: RecipeItem) =>
    !storedRecipes?.find(
      (savedRecipe: RecipeItem) => savedRecipe.id === item.id,
    );

  useEffect(() => {
    if (!storedRecipes && currentUser && !userIsLoading) {
      const fetchStoredData = async () => {
        setStoredRecipes(await getData());
      };
      fetchStoredData();
    }
  }, [currentUser]);

  const uploadNewRecipe = async (recipeToAdd: RecipeItem) => {
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
        alert((error as Error).message);
      }
    } else {
      await addCollectionAndDocumentsAsBatch(
        'storage',
        currentUser?.userUid,
        JSON.stringify([recipeToAdd]),
      );
    }

    setStoredRecipes(await getData());
  };

  // TODO: remove toString() after rebuilding the categories in firestore
  const removeItemFromStorage = async (recipeId: string) => {
    const newRecipesCollection: Recipes = [];
    storedRecipes?.forEach((recipe: RecipeItem) => {
      if (recipe.id.toString() === recipeId) {
        return;
      }
      newRecipesCollection.push(recipe);
    });

    await addCollectionAndDocumentsAsBatch(
      'storage',
      currentUser?.userUid,
      JSON.stringify(newRecipesCollection),
    );

    setStoredRecipes(await getData());
  };

  useEffect(() => {
    if (storedRecipes) {
      console.log(storedRecipes);
    }
  }, [storedRecipes]);

  const value = {
    removeItemFromStorage,
    storedRecipes,
    uploadNewRecipe,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};
