import { useMemo, useState } from 'react';

import { RecipeItem } from 'utils/api/api.types';

import ItemsSlider from 'components/items-slider/items-slider';
import PreviewItem from 'components/preview-item/preview-item';

import { CategoryType } from 'context/categories.context';

import Slider from 'react-slick';

import { Typography } from '@mui/material';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

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
    infinite: true,
    slidesToScroll: 5,
    slidesToShow: 5,
    speed: 500,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
        },
      },
    ],
  };

  const handlePreview = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const { id } = event.currentTarget;

    setTargetRecipe(recipes?.find((item: RecipeItem) => item.id === id));
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
        <Typography variant="h6">{categoryName.toUpperCase()}</Typography>
      </div>
      <Slider {...settings}>{item}</Slider>
    </div>
  );
};

export default Category;
