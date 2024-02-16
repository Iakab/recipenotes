import { useState } from 'react';

import { useCategories } from 'context/recipes.context';

import Item from 'components/item/item.component';
import PreviewItem from 'components/preview-item/preview-item.component';
import { RecipeItem } from 'utils/api/api.types';
import './home.styles.scss';

const Home = () => {
  const { recipes } = useCategories();
  const [targetRecipe, setTargetRecipe] = useState<RecipeItem>();

  const handlePreview = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const { id } = event.currentTarget;

    setTargetRecipe(
      recipes?.find((item: RecipeItem) => item.id === Number(id)),
    );
  };

  return (
    <div className="home">
      {targetRecipe && (
        <PreviewItem recipe={targetRecipe} setTargetRecipe={setTargetRecipe} />
      )}
      <div className="content">
        <h2 className="title">HOME page</h2>
        <div className="body">
          {recipes?.map((recipe: RecipeItem) => (
            <Item
              handlePreview={handlePreview}
              key={recipe.id}
              recipe={recipe}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
