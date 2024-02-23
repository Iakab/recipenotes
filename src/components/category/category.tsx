import { useMemo, useState } from 'react';

import { RecipeItem } from 'utils/api/api.types';

import ItemsSlider from 'components/items-slider/items-slider';
import PreviewItem from 'components/preview-item/preview-item.component';

import { CategoryType } from 'context/categories.context';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './category.scss';

type CategoryProps = {
  category: CategoryType;
};

const Category: React.FC<CategoryProps> = ({ category }) => {
  const [targetRecipe, setTargetRecipe] = useState<RecipeItem>();
  const { categoryName, recipes } = category;

  const settings = {
    className: 'slider',
    dots: true,
    infinite: false,
    slidesToScroll: 5,
    slidesToShow: 3.9,
    speed: 500,
  };

  const handlePreview = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const { id } = event.currentTarget;

    // TODO: Remove toString after rebuilding the categories from firestore
    setTargetRecipe(
      recipes?.find((item: RecipeItem) => item.id.toString() === id),
    );
  };

  const item = useMemo(
    () =>
      recipes?.map((recipe: RecipeItem) => (
        <ItemsSlider
          handlePreview={handlePreview}
          key={recipe.id}
          recipe={recipe}
        />
      )),
    [category],
  );

  return (
    <div className="category">
      {targetRecipe && (
        <PreviewItem recipe={targetRecipe} setTargetRecipe={setTargetRecipe} />
      )}
      <div className="title">
        <h2>{categoryName.toUpperCase()}</h2>
      </div>
      <Slider {...settings}>{item}</Slider>
    </div>
  );
};

export default Category;
