import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getRecipes, SearchOptions } from 'utils/api/api';

import { Recipes } from 'utils/api/api.types';
import { SelectedCategory } from 'components/home-menu/home-menu';

type SearchContextProps = {
  isLoading: boolean;
  loadMoreItems: boolean;
  searchedItems: Recipes | undefined;
  selectedCategory: SelectedCategory | undefined;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadMoreItems: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchedItems: React.Dispatch<React.SetStateAction<Recipes | undefined>>;
  setSearchTag: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<SelectedCategory | undefined>
  >;
};

export const SearchContext = createContext<SearchContextProps>({
  isLoading: false,
  loadMoreItems: false,
  searchedItems: undefined,
  selectedCategory: undefined,
  setIsLoading: () => {},
  setLoadMoreItems: () => {},
  setSearchedItems: () => {},
  setSearchTag: () => {},
  setSelectedCategory: () => {},
});

export const SearchProvider = ({ children }: PropsWithChildren) => {
  let searchOptions: SearchOptions = {};
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreItems, setLoadMoreItems] = useState<boolean>(false);
  const [previousSearchOptions, setPreviousSearchOptions] =
    useState<SearchOptions>(searchOptions);
  const [searchedItems, setSearchedItems] = useState<Recipes>();
  const [searchTag, setSearchTag] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>();

  useEffect(() => {
    // Search
    if (searchTag) {
      const setRecipes = async () => {
        searchOptions.nameOrIngredients = searchTag;

        setPreviousSearchOptions(searchOptions);

        setSearchedItems(await getRecipes(searchOptions));
      };
      setRecipes();
    }
  }, [searchTag]);

  // Fetch selected Category
  useEffect(() => {
    if (selectedCategory) {
      setIsLoading(true);

      if (selectedCategory.options === 'nameOrIngredients') {
        const getData = async () => {
          searchOptions.nameOrIngredients =
            selectedCategory.category.toLowerCase();

          setPreviousSearchOptions(searchOptions);
          setSearchedItems(await getRecipes(searchOptions));
        };
        getData();
      } else {
        const getData = async () => {
          searchOptions.details = selectedCategory.category.toLowerCase();

          setPreviousSearchOptions(searchOptions);
          setSearchedItems(await getRecipes(searchOptions));
        };
        getData();
      }
    }
  }, [selectedCategory]);

  // TODO: Increment the index according to the number of fetched items;
  // Load more items
  useEffect(() => {
    if (loadMoreItems) {
      // setIsLoading(true);
      const getData = async () => {
        searchOptions = previousSearchOptions;

        if (previousSearchOptions.startingIndex) {
          searchOptions.startingIndex = previousSearchOptions.startingIndex + 2;

          const newItems = await getRecipes(searchOptions);

          const newRecipesCollection: Recipes = [
            ...(searchedItems as Recipes),
            ...newItems,
          ];
          setSearchedItems(newRecipesCollection);
        } else {
          searchOptions.startingIndex = 2;

          const newItems = await getRecipes(searchOptions);

          const newRecipesCollection: Recipes = [
            ...(searchedItems as Recipes),
            ...newItems,
          ];
          setSearchedItems(newRecipesCollection);
        }
        setLoadMoreItems(false);
      };
      getData();
    }
  }, [loadMoreItems]);

  useEffect(() => {
    if (searchedItems && !loadMoreItems) {
      setIsLoading(false);
      setSearchTag(undefined);
    }
  }, [searchedItems, loadMoreItems]);

  const value = {
    isLoading,
    loadMoreItems,
    searchedItems,
    selectedCategory,
    setIsLoading,
    setLoadMoreItems,
    setSearchedItems,
    setSearchTag,
    setSelectedCategory,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearchedItems = () => {
  const { searchedItems, isLoading } = useContext(SearchContext);

  return { searchedItems, isLoading };
};
