import { useMemo } from 'react';

import { CategoryType, useCategories } from 'context/categories.context';
import { useSearchedItems } from 'context/search.context';

import Category from 'components/category/category';
import HomeMenu from 'components/home-menu/home-menu';
import SearchItems from 'components/search-items/search-items';

import Loading from 'react-loading';

import './home.styles.scss';

const Home = () => {
  const { searchedItems, isLoading } = useSearchedItems();
  const categories = useCategories();

  const category = useMemo(
    () =>
      categories?.map((item: CategoryType, index: number) => (
        <Category key={index} category={item} />
      )),

    [categories],
  );

  return (
    <div className="home">
      {isLoading && <Loading type="spin" color="#fff" className="loading" />}
      <HomeMenu />
      {searchedItems ? (
        <SearchItems items={searchedItems} />
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
