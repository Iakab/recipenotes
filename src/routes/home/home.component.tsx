import { useMemo } from 'react';

import { useCategories } from 'context/categories.context';
import { useSearchItems } from 'context/search.context';

import SearchItems from 'components/search-items/search-items';
import Category from 'components/category/category';

import Loading from 'react-loading';

import './home.styles.scss';

const Home = () => {
  const { searchItems, isLoading } = useSearchItems();
  const categories = useCategories();

  if (!categories || isLoading) {
    return <Loading type="spin" color="#000" className="loading" />;
  }

  const category = useMemo(
    () =>
      Object.entries(categories).map((item) => (
        <Category key={item[0]} category={item} />
      )),
    [categories],
  );

  return (
    <div className="home">
      <div className="menu">
        <p>Menu</p>
      </div>
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
