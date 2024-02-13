import { createContext, useState, PropsWithChildren, useEffect } from 'react';

import { getRecipesDocument } from 'utils/firebase/db';
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

  useEffect(() => {
    if (!recipes) {
      const retriveData = async () => {
        const res = await getRecipesDocument('items', 'recipes');
        const data = res.data();
        setRecipes(data?.newRecipes);
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
