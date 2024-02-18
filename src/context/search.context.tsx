import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getRecipes } from 'utils/api/api';

import { Recipes } from 'utils/api/api.types';

type SearchContextProps = {
  searchResult: Recipes | undefined;
  setSearchTag: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const SearchContext = createContext<SearchContextProps>({
  searchResult: undefined,
  setSearchTag: () => {},
});

export const SearchProvider = ({ children }: PropsWithChildren) => {
  const [searchTag, setSearchTag] = useState<string>();
  const [searchResult, setSearchResult] = useState<Recipes>();

  useEffect(() => {
    if (searchTag) {
      getRecipes(searchTag).then((result) => setSearchResult(result));
    }
  }, [searchTag]);
  const value = {
    searchResult,
    setSearchTag,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearchItems = () => {
  const { searchResult } = useContext(SearchContext);

  return searchResult;
};
