import { useMemo } from 'react';

import { useNavigate } from 'react-router';

import { CategoryType, useCategories } from 'context/categories.context';
import { useSearchedItems } from 'context/search.context';

import Category from 'components/category/category';
import HomeMenu from 'components/home-menu/home-menu';
import SearchItems from 'components/search-items/search-items';

import Loading from 'react-loading';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArchiveIcon from '@mui/icons-material/Archive';
import { Stack } from '@mui/system';
import Paper from '@mui/material/Paper';

import './home.styles.scss';

const Home = () => {
  const { searchedItems, isLoading } = useSearchedItems();
  const categories = useCategories();
  const navigate = useNavigate();

  const category = useMemo(
    () =>
      categories?.map((item: CategoryType, index: number) => (
        <Category key={index} category={item} />
      )),

    [categories],
  );

  const paperStyle = {
    width: 170,
    height: 'fit-content',
    padding: 1,
    bgcolor: '#b4b4b8',
    fontSize: 19,
  };

  const handleNavigateToStorage = () => {
    navigate('/storage');
  };

  return (
    <div className="home">
      {isLoading && <Loading type="spin" color="#fff" className="loading" />}
      <HomeMenu />
      {searchedItems ? (
        <SearchItems items={searchedItems} />
      ) : (
        <div className="content">
          <div className="header">
            <div className="text">
              <h2>Organize all your recipes in one place</h2>

              <Stack
                direction="row"
                justifyContent={'center'}
                alignItems={'center'}
                spacing={3}
              >
                <Paper elevation={2} square={false} sx={paperStyle}>
                  &nbsp; Search through a large variety of recipes and find an
                  appealing recipe
                </Paper>
                <ArrowForwardIcon sx={{ fontSize: 35 }} />
                <Paper elevation={2} square={false} sx={paperStyle}>
                  Add it to wishlist
                </Paper>
                <ArrowForwardIcon sx={{ fontSize: 35 }} />
                <Paper elevation={2} square={false} sx={paperStyle}>
                  Prepare the recipe
                </Paper>
                <ArrowForwardIcon sx={{ fontSize: 35 }} />
                <Paper elevation={2} square={false} sx={paperStyle}>
                  &nbsp; Customize it to your taste and store it in your storage
                </Paper>
              </Stack>

              <span>OR</span>
              <Stack
                direction="row"
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Paper
                  elevation={2}
                  square={false}
                  sx={{
                    fontSize: 19,
                    width: 350,
                    height: 'fit-content',
                    padding: 1,
                    bgcolor: '#b4b4b8',
                  }}
                >
                  &nbsp; Upload any recipe that you wish to store in your
                  storage
                </Paper>
              </Stack>
            </div>
            <div className="image" onClick={handleNavigateToStorage}>
              <p>VISIT YOUR STORED RECIPES</p>
              <div className="archive-icon">
                <ArchiveIcon sx={{ fontSize: 50 }} />
              </div>
            </div>
          </div>
          <div className="categories">
            <h2>DISCOVER NEW RECIPES</h2>
            {category}
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
