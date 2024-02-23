import { RecipeItem } from 'utils/api/api.types';

import './item.styles.scss';

type ItemProps = {
  recipe: RecipeItem;
  handlePreview: any;
};

const Item: React.FC<ItemProps> = ({ recipe, handlePreview }) => {
  const { name, thumbnail_url: thumbnailUrl, description, id } = recipe;
  return (
    <div className="item" id={id.toString()} onClick={handlePreview}>
      <div className="image">
        <img src={thumbnailUrl} className="photo" />
        {/* <div className="description">
          <p className="text">{description}</p>
        </div> */}
      </div>
      <span className="name">{name}</span>
    </div>
  );
};

export default Item;
