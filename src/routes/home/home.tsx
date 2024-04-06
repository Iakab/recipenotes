import { useMemo } from 'react';

import { CategoryType, useCategories } from 'context/categories.context';
import { useSearchedItems } from 'context/search.context';
import { instructions } from 'utils/constants';

import Category from 'components/category/category';
import HomeMenu from 'components/home-menu/home-menu';
import SearchItems from 'components/search-items/search-items';
import InstructionsCard from 'components/instructions-card/instructions-card';

import Loading from 'react-loading';

import { Container, Typography } from '@mui/material';

import './home.scss';

const Home = () => {
  const { isLoading, searchedItems } = useSearchedItems();
  const categories = useCategories();

  const category = useMemo(
    () =>
      categories?.map((item: CategoryType, index: number) => (
        <Category key={index} category={item} />
      )),

    [categories],
  );

  const instructionCards = useMemo(
    () =>
      instructions.map((instruction, index) => (
        <InstructionsCard details={instruction} key={index} />
      )),
    [instructions],
  );

  return (
    <div className="home">
      {isLoading && (
        <Loading type="spin" color="#fff" className="loading-categories" />
      )}
      <HomeMenu />
      {searchedItems ? (
        <SearchItems items={searchedItems} />
      ) : (
        <div className="content">
          <Typography variant="h4">DISCOVER NEW RECIPES</Typography>
          {category}

          <Container
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: '#f8f6f4',
            }}
            style={{ maxWidth: '100%' }}
          >
            <Typography variant="h4" sx={{ mb: '3rem', mt: '2rem' }}>
              Organize all your recipes in one place
            </Typography>

            <Container
              sx={{
                width: '100%',
                gap: '2rem',
                mb: '4rem',
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
              }}
              style={{ maxWidth: '100%' }}
            >
              {instructionCards}
            </Container>
          </Container>
        </div>
      )}
    </div>
  );
};
export default Home;
