import notebook from 'assets/img/notebook.png';
import { RecipeItem } from './api/api.types';

export const cuisines = [
  'Mexican',
  'Italian',
  'Chinese',
  'Indian',
  'Japanese',
  'German',
  'French',
];

export const ingredients = [
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

export const meals = [
  'Breakfast & Brunch',
  'Lunch',
  'Dinner',
  'Appetizers',
  'Side dish',
  'Soups',
  'Pasta',
  'Drinks',
  'Desserts',
];

export const occasions = [
  'Easter',
  'Thanksgiving',
  'Christmas',
  'Lent',
  'Summer',
  'Cold season',
];

export const occasionsObj = [
  { name: 'Easter', id: '1' },
  { name: 'Thanksgiving', id: '2' },
  { name: 'Christmas', id: '3' },
  { name: 'Lent', id: '4' },
  { name: 'Summer', id: '5' },
  { name: 'Cold season', id: '6' },
];

export const time = ['Under 15 minutes', 'Under 30 minutes', 'Under 1 hour'];

export type Instruction = {
  btnLabel?: string;
  guidelines: string[];
  image?: string;
  title: string;
  action: string;
};

export const instructions: Instruction[] = [
  {
    action: 'handleNavigateToTop',
    btnLabel: 'Discover new recipes',
    guidelines: [
      'Search through a large variety of recipes and find an appealing recipe',
      'Add it to wishlist',
      'Prepare the recipe',
      'Customize it to your taste and store it in your storage',
    ],
    title: 'ADD TO STORAGE',
  },
  {
    action: 'handleNavigateToUpload',
    btnLabel: 'Upload Recipe',
    guidelines: [
      'Follow the steps from the upload page',
      'Save any recipe that you wish to store in your storage',
    ],
    title: 'UPLOAD NEW RECIPES',
  },
  {
    action: 'handleNavigateToStorage',
    guidelines: ['Visit all your saved and upload recipes'],
    image: notebook,
    title: 'VISIT STORAGE',
  },
];

export const timeOptions = [
  'Under 15 minutes',
  'Under 30 minutes',
  'Under 1 hour',
  'Under 2 hour',
  'Under 3 hour',
  'More than 3 hours',
];
export const difficultyOptions = ['Easy', 'Medium', 'Hard'];
export const mealsOptions = [
  'Breakfast',
  'Desserts',
  'Dinner',
  'Lunch',
  'Snacks',
];
