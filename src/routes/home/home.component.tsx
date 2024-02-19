import { useMemo } from 'react';

import { useCategories } from 'context/categories.context';
import { useSearchItems } from 'context/search.context';

import Category from 'components/category/category';
import SearchItems from 'components/search-items/search-items';

import Loading from 'react-loading';

import './home.styles.scss';

const Home = () => {
  const searchItems = useSearchItems();
  const categories = useCategories();

  if (!categories) {
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
      <div className="body">
        {searchItems ? <SearchItems items={searchItems} /> : category}
      </div>
    </div>
  );
};
export default Home;
