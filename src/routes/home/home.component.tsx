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

  return (
    <div className="home">
      <div className="body">
        {searchItems ? (
          <SearchItems searchItems={searchItems} />
        ) : (
          Object.entries(categories).map((category) => (
            <Category key={category[0]} category={category} />
          ))
        )}
      </div>
    </div>
  );
};
export default Home;
