import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';

import './home-menu.scss';

const HomeMenu = () => {
  const ingredients = [
    'Chicken',
    'Pork',
    'Fish',
    'Beef',
    'Pasta',
    'Vegetables',
    'Salad',
    'Rice',
    'Potatoes',
    'Seafood',
  ];
  const occasion = [
    'Easter',
    'Thanksgiving',
    'Christmas',
    'Lent',
    'Summer',
    'Cold season',
  ];

  const cuisines = [
    'Mexican',
    'Italian',
    'Chinese',
    'Indian',
    'Japanese',
    'German',
    'French',
    'Romanian',
    'Greek',
    'Spanish',
  ];

  const meals = [
    'Breakfast & Brunch',
    'Lunch',
    'Dinner',
    'Appetizers',
    'Side dish',
    'Soups',
    'Pasta',
    'Drinks',
    'Desserts',
    'Diabetic',
  ];

  const time = ['Under 15 minutes', 'Under 30 minutes', 'Under 1 hour'];

  return (
    <div className="menu">
      <Menu
        menuButton={<MenuButton className="btn-menu">Ingredients</MenuButton>}
      >
        {ingredients.map((item) => (
          <MenuItem className="dropDown">{item}</MenuItem>
        ))}
      </Menu>
      <Menu menuButton={<MenuButton className="btn-menu">Occasion</MenuButton>}>
        {occasion.map((item) => (
          <MenuItem className="dropDown">{item}</MenuItem>
        ))}
      </Menu>
      <Menu menuButton={<MenuButton className="btn-menu">Cuisines</MenuButton>}>
        {cuisines.map((item) => (
          <MenuItem className="dropDown">{item}</MenuItem>
        ))}
      </Menu>
      <Menu menuButton={<MenuButton className="btn-menu">Meals</MenuButton>}>
        {meals.map((item) => (
          <MenuItem className="dropDown">{item}</MenuItem>
        ))}
      </Menu>
      <Menu
        className="menu-dropdown"
        menuButton={<MenuButton className="btn-menu">Time</MenuButton>}
      >
        {time.map((item) => (
          <MenuItem className="dropDown">{item}</MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default HomeMenu;
