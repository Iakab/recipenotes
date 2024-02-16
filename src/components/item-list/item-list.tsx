import { ReactComponent as ThumbsUpIcon } from 'assets/icons/SVG/thumbs-up.svg';
import { ReactComponent as ThumbsDownIcon } from 'assets/icons/SVG/thumbs-down.svg';

import { RecipeItem } from 'utils/api/api.types';
import './item-list.scss';

type ItemListProps = {
  recipe: RecipeItem;
};

const ItemList: React.FC<ItemListProps> = ({ recipe }) => {
  const {
    credits,
    description,
    name,
    sections,
    thumbnail_url: thumbnail,
    total_time_tier: timeTier,
    user_ratings: authorRatings,
  } = recipe;

  const { components } = sections[0];
  const { count_negative: negativeRatings, count_positive: positiveRatings } =
    authorRatings;

  const totalRatings = negativeRatings + positiveRatings;

  return (
    <div className="item-list">
      <div className="photo-container">
        <img src={thumbnail} alt="photo" className="photo" />
      </div>
      <div className="details">
        <div className="title">
          <h3 className="name">{name}</h3>
          <p>{timeTier.display_tier}</p>
        </div>
        <h4 className="description">{description}</h4>
        <div className="ingredients">
          {components.map((item) => (
            <p key={item.id}>&bull; {item.raw_text}</p>
          ))}
        </div>
        <button className="btn">START COOKING &rarr;</button>
      </div>
      <div className="author">
        <h4 className="name">{credits[0].name}</h4>
        <p>Ratings: ({totalRatings})</p>
        <div className="reviews">
          <div>
            <ThumbsUpIcon />
            <h5>{positiveRatings}</h5>
          </div>
          <div>
            <ThumbsDownIcon />
            <h5>{negativeRatings}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
