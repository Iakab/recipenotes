import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SearchContext } from 'context/search.context';

import { getSuggestions } from 'utils/api/api';

import { ReactComponent as SearchIcon } from 'assets/icons/SVG/search.svg';

import './search-bar.styles.scss';

type SearchTag = {
  searchTag: string | undefined;
};

type Suggesiton = {
  display: string;
};
type Suggestions = Suggesiton[];

const SearchBar = () => {
  const { setSearchTag, setSearchItems } = useContext(SearchContext);
  const [initialInput, setInitialInput] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestions>();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SearchTag>({
    defaultValues: {
      searchTag: '',
    },
  });

  const onSubmit = async (data: SearchTag) => {
    setSearchTag(data.searchTag);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInitialInput(event.target.value);
  };

  useEffect(() => {
    if (!initialInput) {
      setSearchItems(undefined);
    }
    if (initialInput) {
      const fetchSuggestions = async () => {
        setSuggestions(await getSuggestions(initialInput));
      };
      fetchSuggestions();
    }
  }, [initialInput]);

  useEffect(() => {
    if (suggestions && !initialInput) {
      console.log(suggestions);
      setSuggestions(undefined);
    }
  }, [suggestions, initialInput]);

  const handleSelectedSuggestion = (value: string) => {
    setInitialInput(value);

    onSubmit({ searchTag: value });
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit(onSubmit)} className="search-bar">
        <input
          {...register('searchTag')}
          className="input"
          value={initialInput}
          onChange={handleChange}
          placeholder="food or main ingredient"
          type="text"
        />

        <button id="btn-icon">
          <SearchIcon className="icon" />
        </button>

        {suggestions && (
          <div className="suggestions">
            <ul>
              {suggestions
                .slice(0, 5)
                .map((suggestion: Suggesiton, index: number) => (
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
