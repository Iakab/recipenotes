import { createContext, useState, PropsWithChildren, useEffect } from 'react';

import {
  addCollectionAndDocumentsAsBatch,
  getRecipesDocument,
} from 'utils/firebase/db';

import { RecipeItem, Recipes } from 'utils/api/api.types';

import { useUserContext } from './user.context';

type StorageContextType = {
  storedRecipes: Recipes | undefined;
  uploadNewRecipe: (recipeToAdd: RecipeItem) => Promise<void>;
};

export const StorageContext = createContext<StorageContextType>({
  storedRecipes: undefined,
  uploadNewRecipe: async () => {},
});

export const StorageProvider = ({ children }: PropsWithChildren) => {
  const [storedRecipes, setStoredRecipes] = useState<Recipes>([]);
  const { currentUser, userIsLoading } = useUserContext();

  const uploadNewRecipe = async (recipeToAdd: RecipeItem) => {
    if (currentUser && !userIsLoading) {
      const newRecipesCollection = [...(storedRecipes as Recipes), recipeToAdd];
      await addCollectionAndDocumentsAsBatch(
        'storage',
        currentUser.userUid,
        JSON.stringify(newRecipesCollection),
      );

      setStoredRecipes(
        JSON.parse(
          (await getRecipesDocument('storage', currentUser.userUid)).data()
            ?.data,
        ),
      );
    }
  };

  useEffect(() => {
    if (storedRecipes) {
      console.log(storedRecipes);
    }
  }, [storedRecipes]);

  const value = {
    storedRecipes,
    uploadNewRecipe,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};
