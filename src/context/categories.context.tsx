import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  getCategoriesDocument,
  // addCollectionAndDocumentsAsBatch,
} from 'utils/firebase/db';

import { Recipes } from 'utils/api/api.types';

type CategoriesContextType = {
  categories: CategoriesCollection | undefined;
  // setNewCategories: React.Dispatch<React.SetStateAction<Recipes | undefined>>;
};

export type CategoryType = {
  categoryName: string;
  recipes: Recipes;
};

type CategoriesCollection = CategoryType[];

export const CategoriesContext = createContext<CategoriesContextType>({
  categories: undefined,
  // setNewCategories: () => {},
});

export const CategoriesProvider = ({ children }: PropsWithChildren<{}>) => {
  const [categories, setCategories] = useState<CategoriesCollection>();

  // FOR UPLOADING NEW CATEGORIES OF RECEPIES
  // const [newCategories, setNewCategories] = useState<Recipes>();

  // const categoriesJson = JSON.stringify(newCategories);

  // useEffect(() => {
  //   if (newCategories) {
  //     console.log(categories);
  //     addCollectionAndDocumentsAsBatch('categories', 'Dinner', categoriesJson);
  //   }
  // }, [newCategories]);

  useEffect(() => {
    if (!categories) {
      const fetchData = async () => {
        const response = await getCategoriesDocument();
        // console.log(response.docs);
        const categoriesCollection: CategoriesCollection = [];
        response.docs.forEach((category) => {
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
    // setNewCategories,
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
