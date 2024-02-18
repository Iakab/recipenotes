import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { SearchContext } from 'context/search.context';

import { ReactComponent as SearchIcon } from 'assets/icons/SVG/search.svg';

import './search-bar.styles.scss';

type SearchTag = {
  searchTag: string;
};

const SearchBar = () => {
  const { setSearchTag } = useContext(SearchContext);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="search">
      <input
        {...register('searchTag')}
        className="input"
        placeholder="food or main ingredient"
        type="text"
      />

      <button id="btn-icon">
        <SearchIcon className="icon" />
      </button>
    </form>
  );
};

export default SearchBar;
