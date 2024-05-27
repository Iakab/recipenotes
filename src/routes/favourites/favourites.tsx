import { useContext, useMemo, useState } from 'react';

import { FavourtiesContext } from 'context/favourites.context';

import ItemCard from 'components/item-card/item-card';
import PreviewItem from 'components/preview-item/preview-item';

import CustomNoRowsOverlay from 'components/storage-table/no-content-overlay';

import { Container } from '@mui/material';
import { RecipeItem } from 'utils/api/api.types';

import './favourites.scss';

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

  const items = useMemo(() => {
    if (favouriteRecipes?.length) {
      return favouriteRecipes?.map((item: RecipeItem) => (
        <ItemCard key={item.id} recipe={item} handlePreview={handlePreview} />
      ));
    }
    return undefined;
  }, [favouriteRecipes]);

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
        {!items ? (
          <Container sx={{ height: '50vh' }}>
            <CustomNoRowsOverlay />
          </Container>
        ) : (
          items
        )}
      </Container>
    </div>
  );
};

export default Favourites;
