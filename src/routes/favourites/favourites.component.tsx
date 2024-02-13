import { useContext } from 'react';

import { RecipesContext } from 'context/recipes.context';

import ItemList from 'components/item-list/item-list';

import { RecipeItem } from 'utils/api/api.types';

import './favourites.styles.scss';

const Favourites = () => {
  
  const { recipes } = useContext(RecipesContext);
  
  console.log(recipes)
  return (
    <div className="favourites">
      {recipes?.map((item: RecipeItem) => <ItemList key={item.id} recipe={item} />)}
      
    </div>
  );
};

export default Favourites;
