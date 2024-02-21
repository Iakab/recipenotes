import './items-slider.scss';
import { RecipeItem } from 'utils/api/api.types';
// TODO: Set the type

type ItemSliderProps = {
  recipe: RecipeItem;
  handlePreview: any;
};

const ItemsSlider: React.FC<ItemSliderProps> = ({ recipe, handlePreview }) => {
  const { name, thumbnail_url: thumbnailUrl, id } = recipe;

  return (
    <div className="item1" id={id.toString()} onClick={handlePreview}>
      <img src={thumbnailUrl} className="image1" />

      <span className="name1">{name}</span>
    </div>
  );
};

export default ItemsSlider;
