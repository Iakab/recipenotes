import { useContext, useState } from 'react';

import { FavourtiesContext } from 'context/favourites.context';

import ItemList from 'components/item-list/item-list';
import { Container } from '@mui/material';
import { RecipeItem } from 'utils/api/api.types';
import PreviewItem from 'components/preview-item/preview-item.component';

import './favourites.styles.scss';

const Favourites = () => {
  const [targetRecipe, setTargetRecipe] = useState<RecipeItem>();
  const { favouriteRecipes } = useContext(FavourtiesContext);

  const handlePreview = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const { id } = event.currentTarget;
    setTargetRecipe(
      favouriteRecipes?.find(
        (recipe: RecipeItem) => recipe.id.toString() === id,
      ),
    );
  };

  return (
    <div className="favourites">
      <h3 style={{ fontSize: '3rem', margin: '2rem 10rem' }}>Favourites</h3>
      {targetRecipe && (
        <PreviewItem recipe={targetRecipe} setTargetRecipe={setTargetRecipe} />
      )}
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '5rem',
          flexWrap: 'wrap',
        }}
      >
        {favouriteRecipes?.map((item: RecipeItem) => (
          <ItemList key={item.id} recipe={item} handlePreview={handlePreview} />
        ))}
      </Container>
    </div>
  );
};

export default Favourites;
