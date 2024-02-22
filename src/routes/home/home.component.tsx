import { useMemo } from 'react';

import { useCategories, CategoryType } from 'context/categories.context';
import { useSearchItems } from 'context/search.context';

import SearchItems from 'components/search-items/search-items';
import Category from 'components/category/category';
import HomeMenu from 'components/home-menu/home-menu';

import Loading from 'react-loading';

import './home.styles.scss';

// import { getRecipes } from 'utils/api/api';

const Home = () => {
  const { searchItems, isLoading } = useSearchItems();
  const categories = useCategories();

  if (!categories || isLoading) {
    return <Loading type="spin" color="#000" className="loading" />;
  }

  const category = useMemo(
    () =>
      categories.map((item: CategoryType, index: number) => (
        <Category key={index} category={item} />
      )),

    [categories],
  );

  return (
    <div className="home">
      <HomeMenu />
      {searchItems ? (
        <SearchItems items={searchItems} />
      ) : (
        <div className="categories">
          <h2>DISCOVER NEW RECIPES</h2>
          {category}
        </div>
      )}
    </div>
  );
};
export default Home;
