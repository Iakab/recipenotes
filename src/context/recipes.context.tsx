import {
  createContext,
  useState,
  PropsWithChildren,
  useEffect,
  useContext,
} from 'react';

import {
  // addCollectionAndDocumentsAsBatch,
  getRecipesDocument,
} from 'utils/firebase/db';
import { Recipes } from 'utils/api/api.types';

type RecipesContextType = {
  recipes: Recipes | undefined;
  setRecipes: React.Dispatch<React.SetStateAction<Recipes | undefined>>;
};

export const RecipesContext = createContext<RecipesContextType>({
  recipes: undefined,
  setRecipes: () => {},
});

export const RecipesProvider = ({ children }: PropsWithChildren<{}>) => {
  const [recipes, setRecipes] = useState<Recipes>();

  // FOR UPLOADING NEW CATEGORIES OF RECEPIES
  // const recipesJson = JSON.stringify(recipes);

  // useEffect(() => {
  //   if(recipes) {
  //     console.log(recipes)
  //     addCollectionAndDocumentsAsBatch('categories', 'soup', recipesJson)
  //   }
  // },[recipes]);

  useEffect(() => {
    if (!recipes) {
      const retriveData = async () => {
        const response = await getRecipesDocument('categories', 'chicken');

        const categoryJson = response.data();
        // TODO: ({category:JSON.parse(categoryJson?.data)})
        setRecipes(JSON.parse(categoryJson?.data));
      };
      retriveData();
    }
  }, [recipes]);

  const value = {
    recipes,
    setRecipes,
  };

  return (
    <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
  );
};

export const useCategories = () => {
  const { recipes, setRecipes } = useContext(RecipesContext);

  return {
    recipes,
    setRecipes,
  };
};
