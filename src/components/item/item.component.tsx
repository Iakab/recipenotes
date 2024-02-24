import { RecipeItem } from 'utils/api/api.types';

import './item.styles.scss';

type ItemProps = {
  handlePreview: any;
  recipe: RecipeItem;
};

const Item: React.FC<ItemProps> = ({ recipe, handlePreview }) => {
  const { name, thumbnail_url: thumbnailUrl, id } = recipe;
  return (
    <div className="item" id={id.toString()} onClick={handlePreview}>
      <div className="image">
        <img src={thumbnailUrl} className="photo" />
      </div>
      <span className="name">{name}</span>
    </div>
  );
};

export default Item;
