import { Typography } from '@mui/material';

import { RecipeItem } from 'utils/api/api.types';

import './items-slider.scss';

type ItemSliderProps = {
  handlePreview: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  recipe: RecipeItem;
};

const ItemsSlider: React.FC<ItemSliderProps> = ({ recipe, handlePreview }) => {
  const { id, name, thumbnail_url: thumbnailUrl } = recipe;

  return (
    <div className="slide-item" id={id} onClick={handlePreview}>
      <img src={thumbnailUrl} className="image" />

      <Typography variant="body1" className="name">
        {name}
      </Typography>
    </div>
  );
};

export default ItemsSlider;
