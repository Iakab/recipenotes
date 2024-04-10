import { useContext, useEffect, useRef, useState } from 'react';

import { FavourtiesContext } from 'context/favourites.context';
import { StorageContext } from 'context/storage.context';

import ReactPlayer from 'react-player';

import { RecipeItem, Component, Instruction } from 'utils/api/api.types';

import { Checkbox, IconButton, Tooltip, useMediaQuery } from '@mui/material';

import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import { ReactComponent as CustomCloseIcon } from 'assets/icons/SVG/cross.svg';

import './preview-item.scss';

type PreviewItemProps = {
  recipe: RecipeItem;
  setTargetRecipe: React.Dispatch<React.SetStateAction<RecipeItem | undefined>>;
};

type ExitPreview = React.MouseEvent<HTMLDivElement, MouseEvent>;

const PreviewItem: React.FC<PreviewItemProps> = ({
  recipe,
  setTargetRecipe,
}) => {
  const closeIconRef = useRef<null | SVGAElement>(null);
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const { updateFavourites, isItemFavourite, favouriteRecipes } =
    useContext(FavourtiesContext);
  const { uploadNewRecipe } = useContext(StorageContext);
  const isMaxTabPortSize = useMediaQuery('(max-width: 900px)');

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

  const handleAddToFavourites = async () => {
    updateFavourites(recipe);
  };

  useEffect(() => {
    const itemIsFavourite = isItemFavourite(recipe);
    setAddedToFavorites(itemIsFavourite);
  }, [favouriteRecipes]);

  const handleAddToStorage = () => {
    uploadNewRecipe(recipe);
  };

  const exitPreview = (event: ExitPreview) => {
    if (event.target === event.currentTarget) {
      setTargetRecipe(undefined);
    }
  };

  const closePreview = () => {
    setTargetRecipe(undefined);
  };

  return (
    <div className="overlay" onClick={exitPreview}>
      {!isMaxTabPortSize && (
        <CustomCloseIcon
          className="icon-close"
          ref={closeIconRef}
          onClick={closePreview}
        />
      )}

      <div className="preview">
        <div className="options">
          {isMaxTabPortSize ? (
            <IconButton
              onClick={closePreview}
              sx={{
                padding: 0,
                justifyContent: 'flex-start',
                marginLeft: '0',
              }}
            >
              <ArrowBackIcon fontSize="large" sx={{ marginLeft: 0 }} />
            </IconButton>
          ) : (
            <div></div>
          )}
          <div style={{ flex: '1 1 auto' }}></div>

          <Checkbox
            className="icon-heart"
            checked={addedToFavorites}
            onClick={handleAddToFavourites}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ fill: 'red' }} />}
          />

          <Tooltip title="Add to Storage">
            <IconButton onClick={handleAddToStorage}>
              <LibraryAddIcon />
            </IconButton>
          </Tooltip>
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
          {instructions.map((instruction: Instruction, index: number) => (
            <p key={instruction.id}>
              {index + 1}. {instruction.display_text}
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
              width={'100%'}
              height={'100%'}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewItem;
