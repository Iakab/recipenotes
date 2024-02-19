import { useMemo } from 'react';

import { RecipeItem, Recipes } from 'utils/api/api.types';

import Item from 'components/item/item.component';

import './category.scss';

type CategoryProps = {
  category: [string, Recipes];
};

const Category: React.FC<CategoryProps> = ({ category }) => {
  const item = useMemo(
    () =>
      category[1]?.map((recipe: RecipeItem) => (
        <Item key={recipe.id} recipe={recipe} />
      )),
    [category],
  );

  return <div className="category">{item}</div>;
};

export default Category;
