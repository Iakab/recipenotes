import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SearchContext } from 'context/search.context';

import { getSuggestions } from 'utils/api/api';

import { useMediaQuery } from '@mui/system';

import { ReactComponent as SearchIcon } from 'assets/icons/SVG/search.svg';

import './search-bar.scss';

type SearchTag = {
  searchTag: string | undefined;
};

type Suggestion = {
  display: string;
};
type Suggestions = Suggestion[];

type SearchBarProps = {
  setDisplayOptions: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchBar: React.FC<SearchBarProps> = ({ setDisplayOptions }) => {
  const [initialInput, setInitialInput] = useState<string>();
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestions>();

  const { setSearchTag, setIsLoading } = useContext(SearchContext);

  const formRef = useRef<any>(null);
  const matchingPhoneSize = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    setIsSearchBarOpen(!matchingPhoneSize);
  }, [matchingPhoneSize]);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<SearchTag>({
    defaultValues: {
      searchTag: '',
    },
  });

  const closeSearchBar = (event: MouseEvent) => {
    if (
      isSearchBarOpen &&
      !formRef.current?.contains(event.target as Node) &&
      matchingPhoneSize
    ) {
      setIsSearchBarOpen(false);
      setDisplayOptions(true);
      setSuggestions(undefined);
      reset();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeSearchBar);

    return () => document.removeEventListener('mousedown', closeSearchBar);
  }, [isSearchBarOpen]);

  const onSubmit = async (data: SearchTag) => {
    if (!data.searchTag) {
      setIsSearchBarOpen(true);
      setDisplayOptions(false);
    } else {
      setIsLoading(true);
      setSearchTag(data.searchTag);
    }
  };

  useEffect(() => {
    watch(async (data) => {
      setInitialInput(data.searchTag || undefined);
    });
  }, [watch]);

  useEffect(() => {
    if (initialInput) {
      const registerSuggestions = async () => {
        setSuggestions(await getSuggestions(initialInput));
      };
      registerSuggestions();
    } else {
      setSuggestions(undefined);
    }
  }, [initialInput]);

  const handleSelectedSuggestion = (value: string) => {
    onSubmit({ searchTag: value });
  };

  useEffect(() => {
    if (!isSearchBarOpen && suggestions) {
      setSuggestions(undefined);
    }
  }, [isSearchBarOpen, suggestions]);

  return (
    <div className="search">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="search-bar"
        ref={formRef}
      >
        <button id="btn-icon">
          <SearchIcon className="icon" />
        </button>

        {isSearchBarOpen && (
          <input
            {...register('searchTag')}
            autoFocus
            className="input"
            placeholder="Food or main ingredient..."
            type="text"
          />
        )}

        {suggestions && (
          <div className="suggestions">
            <ul>
              {suggestions
                .slice(0, 5)
                .map((suggestion: Suggestion, index: number) => (
                  <li
                    key={index}
                    onClick={() => handleSelectedSuggestion(suggestion.display)}
                  >
                    {suggestion.display}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
