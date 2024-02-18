import { useState } from 'react';

import Item from 'components/item/item.component';
import PreviewItem from 'components/preview-item/preview-item.component';
import { RecipeItem } from 'utils/api/api.types';

import './search-items.scss';

type SearchItemsProps = {
  searchItems: any;
};

const SearchItems: React.FC<SearchItemsProps> = ({ searchItems }) => {
  const [targetRecipe, setTargetRecipe] = useState<RecipeItem>();
  console.log(searchItems);
  const handlePreview = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const { id } = event.currentTarget;

    setTargetRecipe(
      searchItems?.find((item: RecipeItem) => item.id === Number(id)),
    );
  };

  return (
    <div>
      {targetRecipe && (
        <PreviewItem recipe={targetRecipe} setTargetRecipe={setTargetRecipe} />
      )}
      <div className="content">
        <h2 className="title">HOME page</h2>
        <div className="body">
          {searchItems?.map((recipe: RecipeItem) => (
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

export default SearchItems;
