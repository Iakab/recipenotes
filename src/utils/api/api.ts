import { Recipes } from './api.types';

export const asdf = () => {};

export const getRecipes = async (searchTag: string): Promise<Recipes> => {
  // try {
  const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=10&tags=under_30_minutes&q=${searchTag}`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a454844a4dmsh793dc8da81d5815p14b3efjsn51d4bbe9afe0',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  return data.results;
};




