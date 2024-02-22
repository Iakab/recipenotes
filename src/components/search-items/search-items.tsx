import { useState, useMemo } from 'react';

import Item from 'components/item/item.component';
import PreviewItem from 'components/preview-item/preview-item.component';
import { RecipeItem, Recipes } from 'utils/api/api.types';

import './search-items.scss';

type SearchItemsProps = {
  items: Recipes;
};

const SearchItems: React.FC<SearchItemsProps> = ({ items }) => {
  const [targetRecipe, setTargetRecipe] = useState<RecipeItem>();

  const handlePreview = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const { id } = event.currentTarget;

    setTargetRecipe(
      items?.find((item: RecipeItem) => Number(item.id) === Number(id)),
    );
  };

  const item = useMemo(
    () =>
      items?.map((recipe: RecipeItem) => (
        <Item handlePreview={handlePreview} key={recipe.id} recipe={recipe} />
      )),
    [items],
  );

  return (
    <div>
      {targetRecipe && (
        <PreviewItem recipe={targetRecipe} setTargetRecipe={setTargetRecipe} />
      )}
      <div className="content">
        <h2 className="title">HOME page</h2>
        <div className="body">{item}</div>
      </div>
    </div>
  );
};

export default SearchItems;
