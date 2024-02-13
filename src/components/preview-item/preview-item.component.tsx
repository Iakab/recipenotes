import { useState, useRef } from 'react';

import ReactPlayer from 'react-player';

import { RecipeItem, Component, Instruction } from 'utils/api/api.types';

import { ReactComponent as CloseIcon } from 'assets/icons/SVG/cross.svg';
import { ReactComponent as HeartIcon } from 'assets/icons/SVG/heart-outlined.svg';

import './preview-item.styles.scss';

type PreviewItemProps = {
  recipe: RecipeItem;
  setTargetRecipe: React.Dispatch<React.SetStateAction<RecipeItem | undefined>>;
};

const PreviewItem: React.FC<PreviewItemProps> = ({
  recipe,
  setTargetRecipe,
}) => {
  const closeIconRef = useRef<null | SVGAElement>(null);
  const [favouriteRecipe, setFavouriteRecipe] = useState();
  const {
    description,
    instructions,
    name,
    original_video_url: originalVideoUrl,
    sections,
    thumbnail_url: thumbnail,
    video_url: videoUrl,
  } = recipe;

  const { components } = sections[0];

  type ExitPreview = React.MouseEvent<HTMLDivElement | SVGAElement, MouseEvent>;
  const exitPreview = (event: ExitPreview) => {
    if (
      event.target === event.currentTarget ||
      closeIconRef.current?.contains(event.target as Node)
    ) {
      setTargetRecipe(undefined);
    }
  };

  const handleFavourites = (
    event: React.MouseEvent<SVGAElement, MouseEvent>,
  ) => {};

  return (
    <div className="overlay" onClick={exitPreview}>
      <CloseIcon
        className="icon-close"
        ref={closeIconRef}
        onClick={exitPreview}
      />

      <div className="preview">
        <div className="options">
          <HeartIcon onClick={handleFavourites} />
        </div>
        <h2 className="title">{name}</h2>
        <h4 className="description">{description}</h4>
        <div className="presentation">
          <div className="ingredients">
            <h4>INGREDIENTS:</h4>
            {components.map((ingredient: Component) => (
              <h4 key={ingredient.id}>{ingredient.raw_text}</h4>
            ))}
          </div>
          <img src={thumbnail} className="image"></img>
        </div>
        <div className="instructions">
          {instructions.map((instruction: Instruction) => (
            <p key={instruction.id}>
              {instructions.indexOf(instruction) + 1}.{' '}
              {instruction.display_text}
            </p>
          ))}
        </div>

        {videoUrl && (
          <div className="player-container">
            <ReactPlayer
              className="videoPlayer"
              controls
              url={originalVideoUrl}
              volume={0.5}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewItem;
