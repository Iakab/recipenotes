import { useContext, useEffect, useMemo, useRef, useState } from 'react';

import Item from 'components/item/item.component';
import PreviewItem from 'components/preview-item/preview-item.component';

import { SearchContext } from 'context/search.context';
import { RecipeItem, Recipes } from 'utils/api/api.types';

import './search-items.scss';

type SearchItemsProps = {
  items: Recipes;
};

const SearchItems: React.FC<SearchItemsProps> = ({ items }) => {
  const [targetRecipe, setTargetRecipe] = useState<RecipeItem>();
  const { loadMoreItems, setIsLoading, setLoadMoreItems } =
    useContext(SearchContext);
  const showMoreRef: React.MutableRefObject<any> = useRef(null);

  const handlePreview = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const { id } = event.currentTarget;
    setTargetRecipe(
      items?.find((item: RecipeItem) => item.id.toString() === id),
    );
  };

  const item = useMemo(
    () =>
      items?.map((recipe: RecipeItem) => (
        <Item handlePreview={handlePreview} key={recipe.id} recipe={recipe} />
      )),
    [items],
  );

  const handleShowMore = () => {
    setIsLoading(true);
    setLoadMoreItems(true);

    showMoreRef.current.disabled = true;
  };

  useEffect(() => {
    if (!loadMoreItems) {
      showMoreRef.current.disabled = false;
    }
  }, [loadMoreItems]);

  return (
    <div className="search-items">
      {targetRecipe && (
        <PreviewItem recipe={targetRecipe} setTargetRecipe={setTargetRecipe} />
      )}
      <div className="content">
        <h2 className="title">HOME page</h2>
        <div className="body">{item}</div>
        <button className="btn" ref={showMoreRef} onClick={handleShowMore}>
          Show more&hellip;
        </button>
      </div>
    </div>
  );
};

export default SearchItems;
