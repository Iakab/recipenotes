import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  // addCollectionAndDocumentsAsBatch,
  getCategoriesDocument,
} from 'utils/firebase/db';
import { Recipes } from 'utils/api/api.types';

type CategoriesContextType = {
  categories: CategoriesCollection | undefined;
  setCategories: React.Dispatch<
    React.SetStateAction<CategoriesCollection | undefined>
  >;
};

export type CategoryType = {
  categoryName: string;
  recipes: Recipes;
};

type CategoriesCollection = CategoryType[];

export const CategoriesContext = createContext<CategoriesContextType>({
  categories: undefined,
  setCategories: () => {},
});

export const CategoriesProvider = ({ children }: PropsWithChildren<{}>) => {
  const [categories, setCategories] = useState<CategoriesCollection>();

  // FOR UPLOADING NEW CATEGORIES OF RECEPIES
  // const categoriesJson = JSON.stringify(categories);

  // useEffect(() => {
  //   if(categories) {
  //     console.log(categories)
  //     addCollectionAndDocumentsAsBatch('categories', 'soup', categoriesJson)
  //   }
  // },[categories]);

  useEffect(() => {
    if (!categories) {
      const fetchData = async () => {
        const response = await getCategoriesDocument('categories');

        const categoriesCollection: CategoriesCollection = [];
        response.forEach((category) => {
          const categoryId: string = category.id;
          categoriesCollection.push({
            categoryName: categoryId,
            recipes: JSON.parse(category.data().data),
          });
        });

        setCategories(categoriesCollection);
      };
      fetchData();
    }
  }, [categories]);

  const value = {
    categories,
    setCategories,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const { categories } = useContext(CategoriesContext);

  return categories;
};
