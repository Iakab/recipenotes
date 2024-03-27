import { useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

import { CategoryType, useCategories } from 'context/categories.context';
import { useSearchedItems } from 'context/search.context';

import Category from 'components/category/category';
import HomeMenu from 'components/home-menu/home-menu';
import SearchItems from 'components/search-items/search-items';

import Loading from 'react-loading';
import notebook from 'assets/img/notebook.png';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';

import './home.styles.scss';

const Home = () => {
  const { isLoading, searchedItems } = useSearchedItems();
  const categories = useCategories();
  const navigate = useNavigate();

  const category = useMemo(
    () =>
      categories?.map((item: CategoryType, index: number) => (
        <Category key={index} category={item} />
      )),

    [categories],
  );

  const handleNavigateToStorage = () => {
    navigate('/storage');
  };

  const handleNavigateToUpload = () => {
    navigate('/upload');
  };

  return (
    <div className="home">
      {isLoading && <Loading type="spin" color="#fff" className="loading" />}
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
              <Card
                sx={{
                  maxWidth: '30rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: '2.5rem' }}>
                    ADD TO STORAGE
                  </Typography>

                  <Typography variant="body1">
                    <ArrowRightIcon fontSize="small" sx={{ mb: '-.3rem' }} />
                    Search through a large variety of recipes and find an
                    appealing recipe
                  </Typography>

                  <Typography variant="body1">
                    <ArrowRightIcon fontSize="small" sx={{ mb: '-.3rem' }} />
                    Add it to wishlist
                  </Typography>
                  <Typography variant="body1">
                    <ArrowRightIcon fontSize="small" sx={{ mb: '-.3rem' }} />
                    Prepare the recipe
                  </Typography>
                  <Typography variant="body1">
                    <ArrowRightIcon fontSize="small" sx={{ mb: '-.3rem' }} />
                    Customize it to your taste and store it in your storage
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button type="button" href="#">
                    Discover new Recipes
                  </Button>
                </CardActions>
              </Card>

              <Card
                sx={{
                  maxWidth: '30rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: '2.5rem' }}>
                    UPLOAD NEW RECIPES
                  </Typography>

                  <Typography variant="body1">
                    <ArrowRightIcon fontSize="small" sx={{ mb: '-.3rem' }} />
                    Follow the steps from the upload page
                  </Typography>
                  <Typography variant="body1">
                    <ArrowRightIcon fontSize="small" sx={{ mb: '-.3rem' }} />
                    Save any recipe that you wish to store in your storage
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={handleNavigateToUpload}>
                    Upload Recipe
                  </Button>
                </CardActions>
              </Card>

              <Card sx={{ maxWidth: '30rem' }}>
                <CardActionArea onClick={handleNavigateToStorage}>
                  <CardMedia
                    alt="notebook"
                    component="img"
                    height="200"
                    image={notebook}
                    sx={{ objectFit: 'cover', objectPosition: 'center' }}
                  />

                  <CardContent>
                    <Typography variant="h6">VISIT STORAGE</Typography>

                    <Typography variant="body1">
                      <ArrowRightIcon fontSize="small" sx={{ mb: '-.3rem' }} />
                      Visit all your saved and upload recipes
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Container>
          </Container>
        </div>
      )}
    </div>
  );
};
export default Home;
