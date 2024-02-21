import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from 'react';

import {
  removeRecipeFromDoc,
  updateFavouritesCollection,
  getRecipesDocument,
} from 'utils/firebase/db';

import { DocumentData, DocumentSnapshot } from 'firebase/firestore';

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

  const isItemFavourite = (item: RecipeItem) =>
    favouriteRecipes?.find(
      (savedRecipe: RecipeItem) => savedRecipe.id === item.id,
    );

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
  const updateFavourites = async (item: RecipeItem) => {
    const itemIsAlreadyAdded = isItemFavourite(item);

    if (!itemIsAlreadyAdded) {
      const favouritesSnapshot = await updateFavouritesCollection(
        collectionName,
        currentUser?.userUid,
        item,
      );
      setDataFromSnapshot(favouritesSnapshot);
    } else {
      const favouritesSnapshot = await removeRecipeFromDoc(
        collectionName,
        currentUser?.userUid,
        item,
      );
      setDataFromSnapshot(favouritesSnapshot);
    }
  };

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
