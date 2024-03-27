import { Typography } from '@mui/material';

import { RecipeItem } from 'utils/api/api.types';

import './items-slider.scss';

// TODO: Set the type
type ItemSliderProps = {
  handlePreview: any;
  recipe: RecipeItem;
};

const ItemsSlider: React.FC<ItemSliderProps> = ({ recipe, handlePreview }) => {
  const { id, name, thumbnail_url: thumbnailUrl } = recipe;

  return (
    <div className="item1" id={id} onClick={handlePreview}>
      <img src={thumbnailUrl} className="image1" />

      <Typography variant="body1" className="name1">
        {name}
      </Typography>
    </div>
  );
};

export default ItemsSlider;
