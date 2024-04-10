import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from 'react';

import {
<<<<<<< Updated upstream
  removeRecipeFromDoc,
  updateCollection,
  getRecipesDocument,
=======
  uploadRecipe,
  deleteRecipe,
  fetchSubcollection,
>>>>>>> Stashed changes
} from 'utils/firebase/db';

import { RecipeItem, Recipes } from 'utils/api/api.types';

import { UserContext } from './user.context';

export type FavourtiesContextType = {
  favouriteRecipes: Recipes | undefined;
  isItemFavourite: (item: RecipeItem) => RecipeItem | undefined;
  setFavouriteRecipes: React.Dispatch<
    React.SetStateAction<Recipes | undefined>
  >;
  updateFavourites: (item: RecipeItem) => Promise<void>;
};

export const FavourtiesContext = createContext<FavourtiesContextType>({
  favouriteRecipes: undefined,
  isItemFavourite: () => undefined,
  setFavouriteRecipes: () => {},
  updateFavourites: async () => {},
});

export const FavouritesProvider = ({ children }: PropsWithChildren) => {
  const [favouriteRecipes, setFavouriteRecipes] = useState<Recipes>();
  const { currentUser, userIsLoading } = useContext(UserContext);

  const collectionName = 'favourites';

  // DEFAULT
  const updateContext = async () => {
    const data = (
      await fetchSubcollection(currentUser?.userUid, collectionName)
    ).docs;

    const recipes = data.map((document) => document.data());

    if (recipes) {
      setFavouriteRecipes(recipes as Recipes);
    }
  };

  useEffect(() => {
    if (!userIsLoading && currentUser) {
      updateContext();
    }
  }, [currentUser]);

  const isItemFavourite = (item: RecipeItem) =>
    favouriteRecipes?.find(
      (savedRecipe: RecipeItem) => savedRecipe.id === item.id,
    );

<<<<<<< Updated upstream
  const setDataFromSnapshot = (
    favouritesSnapshot: DocumentSnapshot<DocumentData, DocumentData>,
  ) => {
    const data = favouritesSnapshot.data();

    if (data) {
      setFavouriteRecipes(Object.values(data));
    }
  };

  // DEFAULT
  useEffect(() => {
    if (!favouriteRecipes && !userIsLoading) {
      const getFavouritesDoc = async () => {
        const favouritesSnapshot = await getRecipesDocument(
          collectionName,
          currentUser?.userUid,
        );
        setDataFromSnapshot(favouritesSnapshot);
      };
      getFavouritesDoc();
    }
  }, [currentUser]);

  // ADD OR REMOVE
=======
>>>>>>> Stashed changes
  const updateFavourites = async (item: RecipeItem) => {
    const itemIsAlreadyAdded = isItemFavourite(item);

    if (!itemIsAlreadyAdded) {
      await uploadRecipe(currentUser?.userUid, collectionName, item);
      updateContext();
    } else {
      await deleteRecipe(currentUser?.userUid, collectionName, item.id);
      updateContext();
    }
  };

  // ADD OR REMOVE
  const value = {
    favouriteRecipes,
    isItemFavourite,
    setFavouriteRecipes,
    updateFavourites,
  };

  return (
    <FavourtiesContext.Provider value={value}>
      {children}
    </FavourtiesContext.Provider>
  );
};
