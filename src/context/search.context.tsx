import SearchItems from 'components/search-items/search-items';
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
  searchItems: Recipes | undefined;
  setSearchTag: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSearchItems: React.Dispatch<React.SetStateAction<Recipes | undefined>>;
  isLoading: boolean;
};

export const SearchContext = createContext<SearchContextProps>({
  searchItems: undefined,
  setSearchTag: () => {},
  setSearchItems: () => {},
  isLoading: false,
});
export const SearchProvider = ({ children }: PropsWithChildren) => {
  const [searchTag, setSearchTag] = useState<string>();
  const [searchItems, setSearchItems] = useState<Recipes>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchTag) {
      setIsLoading(true);
      const setRecipes = async () => {
        const searchOptions: SearchOptions = {};
        searchOptions.nameOrIngredients = searchTag;

        const result = await getRecipes(searchOptions);
        setSearchItems(result);
      };
      setRecipes();
    }
  }, [searchTag]);

  useEffect(() => {
    setIsLoading(false);
  }, [searchItems]);

  const value = {
    searchItems,
    setSearchTag,
    setSearchItems,
    isLoading,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearchItems = () => {
  const { searchItems, isLoading } = useContext(SearchContext);

  return { searchItems, isLoading };
};
