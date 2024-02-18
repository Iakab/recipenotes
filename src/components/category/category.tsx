import { RecipeItem, Recipes } from 'utils/api/api.types';

import Item from 'components/item/item.component';

import './category.scss';

type CategoryProps = {
  category: [string, Recipes];
};

const Category: React.FC<CategoryProps> = ({ category }) => {
  console.log(category);

  return (
    <div className="category">
      {category[1]?.map((recipe: RecipeItem) => (
        <Item key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default Category;
