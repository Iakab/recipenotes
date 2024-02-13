// import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// import { RecipesContext } from 'context/recipes.context';
// import { getRecipes } from 'utils/api/api';
// import { addCollectionAndDocuments } from 'utils/firebase/db';
import { ReactComponent as SearchIcon } from 'assets/icons/SVG/search.svg';

import './search-bar.styles.scss';

type SearchTag = {
  searchTag: string;
};

const SearchBar = () => {
  // const { setRecipes, recipes } = useContext(RecipesContext);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SearchTag>({
    defaultValues: {
      searchTag: '',
    },
  });

  // useEffect(() => {
  //   if (recipes) {
  //     console.log(recipes);
  //   }
  // }, [recipes]);

  const onSubmit = async (data: SearchTag) => {
    // console.log(data.searchTag);
    // TO DO: set to update the doc, not to overwrite!

    // const newRecipes = await getRecipes(data.searchTag);
    // setRecipes(newRecipes);
    // addCollectionAndDocuments({newRecipes})
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
