import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getRecipes, SearchOptions } from 'utils/api/api';

import { Recipes } from 'utils/api/api.types';

type SearchContextProps = {
  isLoading: boolean;
  loadMoreItems: boolean;
  searchItems: Recipes | undefined;
  selectedCategory: string | { ingredients: string } | undefined;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadMoreItems: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchItems: React.Dispatch<React.SetStateAction<Recipes | undefined>>;
  setSearchTag: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<string | { ingredients: string } | undefined>
  >;
};

export const SearchContext = createContext<SearchContextProps>({
  isLoading: false,
  loadMoreItems: false,
  searchItems: undefined,
  selectedCategory: undefined,
  setIsLoading: () => {},
  setLoadMoreItems: () => {},
  setSearchItems: () => {},
  setSearchTag: () => {},
  setSelectedCategory: () => {},
});

export const SearchProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreItems, setLoadMoreItems] = useState<boolean>(false);
  let searchOptions: SearchOptions = {};
  const [previousSearchOptions, setPreviousSearchOptions] =
    useState<SearchOptions>(searchOptions);
  const [searchItems, setSearchItems] = useState<Recipes>();
  const [searchTag, setSearchTag] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<
    string | { ingredients: string }
  >();

  useEffect(() => {
    if (searchTag) {
      setIsLoading(true);
      const setRecipes = async () => {
        searchOptions.nameOrIngredients = searchTag;
        setPreviousSearchOptions(searchOptions);
        const result = await getRecipes(searchOptions);

        setSearchItems(result);
      };
      setRecipes();
    }
  }, [searchTag]);

  useEffect(() => {
    if (selectedCategory) {
      setIsLoading(true);
      if (typeof selectedCategory === 'object') {
        const getData = async () => {
          searchOptions.nameOrIngredients =
            selectedCategory.ingredients.toLowerCase();
          setPreviousSearchOptions(searchOptions);
          setSearchItems(await getRecipes(searchOptions));
        };
        getData();
      } else {
        const getData = async () => {
          searchOptions.details = selectedCategory.toLowerCase() as string;
          setPreviousSearchOptions(searchOptions);
          setSearchItems(await getRecipes(searchOptions));
        };
        getData();
      }
    }
  }, [selectedCategory]);

  // TODO: Increment the index according to the number of fetched items;
  useEffect(() => {
    if (loadMoreItems) {
      setIsLoading(true);
      const getData = async () => {
        searchOptions = previousSearchOptions;

        if (previousSearchOptions.startingIndex) {
          searchOptions.startingIndex = (
            Number(previousSearchOptions.startingIndex) + 2
          ).toString();

          const newItems = await getRecipes(searchOptions);
          if (searchItems && newItems) {
            const newRecipesCollection: Recipes = [...searchItems, ...newItems];
            setSearchItems(newRecipesCollection);
          }
        } else {
          searchOptions.startingIndex = '2';
          const newItems = await getRecipes(searchOptions);
          if (searchItems && newItems) {
            const newRecipesCollection: Recipes = [...searchItems, ...newItems];
            setSearchItems(newRecipesCollection);
          }
        }
        setLoadMoreItems(false);
      };
      getData();
    }
  }, [loadMoreItems]);

  useEffect(() => {
    if (searchItems && !loadMoreItems) {
      setIsLoading(false);
    }
  }, [searchItems, loadMoreItems]);

  const value = {
    isLoading,
    loadMoreItems,
    searchItems,
    selectedCategory,
    setIsLoading,
    setLoadMoreItems,
    setSearchItems,
    setSearchTag,
    setSelectedCategory,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearchItems = () => {
  const { searchItems, isLoading } = useContext(SearchContext);

  return { searchItems, isLoading };
};
