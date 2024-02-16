import { useContext } from 'react';

import { FavourtiesContext } from 'context/favourites.context';

import ItemList from 'components/item-list/item-list';

import { RecipeItem } from 'utils/api/api.types';

import './favourites.styles.scss';

const Favourites = () => {
  const { favouriteRecipes } = useContext(FavourtiesContext);

  return (
    <div className="favourites">
      {favouriteRecipes?.map((item: RecipeItem) => (
        <ItemList key={item.id} recipe={item} />
      ))}
    </div>
  );
};

export default Favourites;
