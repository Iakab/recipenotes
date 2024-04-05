import { useContext } from 'react';

import { FavourtiesContext } from 'context/favourites.context';
import { StorageContext } from 'context/storage.context';

import { RecipeItem } from 'utils/api/api.types';

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

type ItemListProps = {
  handlePreview: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  recipe: RecipeItem;
};

const ItemCard: React.FC<ItemListProps> = ({ recipe, handlePreview }) => {
  const { uploadNewRecipe } = useContext(StorageContext);
  const { updateFavourites } = useContext(FavourtiesContext);

  const { description, name, thumbnail_url: thumbnail } = recipe;

  const handleDelete = () => {
    updateFavourites(recipe);
  };

  const handleAddToStorage = () => {
    uploadNewRecipe(recipe);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        maxWidth: '32rem',
      }}
    >
      <CardActionArea onClick={handlePreview} id={recipe.id}>
        <CardHeader title={name} />
        <CardMedia component="img" height="200" image={thumbnail} alt={name} />
        <CardContent sx={{ flex: '1 1 auto' }}>
          <Typography variant="body1">{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ alignSelf: 'flex-end' }}>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={handleAddToStorage}>
          <LibraryAddIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
