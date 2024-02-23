import { useContext } from 'react';

import { SearchContext } from 'context/search.context';

import { cuisines, ingredients, meals, occasion, time } from 'utils/constants';

import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';

import './home-menu.scss';

const HomeMenu = () => {
  const { setSelectedCategory } = useContext(SearchContext);

  const handleSelect = (category: string | { ingredients: string }) => {
    setSelectedCategory(category);
  };

  return (
    <div className="menu">
      <Menu
        menuButton={<MenuButton className="btn-menu">Ingredients</MenuButton>}
      >
        {ingredients.map((item, index) => (
          <MenuItem
            className="dropDown"
            key={index}
            onClick={() => handleSelect({ ingredients: item })}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
      <Menu menuButton={<MenuButton className="btn-menu">Occasion</MenuButton>}>
        {occasion.map((item, index) => (
          <MenuItem
            className="dropDown"
            key={index}
            onClick={() => handleSelect(item)}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
      <Menu menuButton={<MenuButton className="btn-menu">Cuisines</MenuButton>}>
        {cuisines.map((item, index) => (
          <MenuItem
            className="dropDown"
            key={index}
            onClick={() => handleSelect(item)}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
      <Menu menuButton={<MenuButton className="btn-menu">Meals</MenuButton>}>
        {meals.map((item, index) => (
          <MenuItem
            className="dropDown"
            key={index}
            onClick={() => handleSelect(item)}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        className="menu-dropdown"
        menuButton={<MenuButton className="btn-menu">Time</MenuButton>}
      >
        {time.map((item, index) => (
          <MenuItem
            className="dropDown"
            key={index}
            onClick={() => handleSelect(item)}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default HomeMenu;
