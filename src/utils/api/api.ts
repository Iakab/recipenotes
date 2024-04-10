import axios from 'axios';

import { Recipes, RecipeItem } from './api.types';

export const reduceRecipesSize = (unalteredRecipes: Recipes): Recipes => {
  const recipes: Recipes = unalteredRecipes.map(
    (recipe: RecipeItem): RecipeItem => {
      const id = recipe.id.toString();
      return { ...recipe, id };
    },
  );
  return recipes;
};

export type SearchOptions = {
  countryShorthand?: string;
  details?: string;
  nameOrIngredients?: string;
  startingIndex?: number;
};

export const numberOfFetchedItems = 20;

export const getRecipes = async (
  searchOptions: SearchOptions,
): Promise<Recipes> => {
  const { details, nameOrIngredients, startingIndex } = searchOptions;

  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/list',
    params: {
      from: startingIndex || 0,
      q: nameOrIngredients,
      size: numberOfFetchedItems,
      tags: details,
      sort: '',
    },
    headers: {
      'X-RapidAPI-Key': 'f733879bf8msh039fecc6e50e11dp19ea08jsned9b4f14fcba',

      'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
    },
  };
  try {
    const response = await axios.request(options);
    const unalteredRecipes = response.data.results;

    return reduceRecipesSize(unalteredRecipes);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getSuggestions = async (searchTag: string) => {
  const url = `https://tasty.p.rapidapi.com/recipes/auto-complete?&size=5&prefix=${searchTag}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f733879bf8msh039fecc6e50e11dp19ea08jsned9b4f14fcba',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data.results;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// Fineas recipeNotes
// 'X-RapidAPI-Key': 'a454844a4dmsh793dc8da81d5815p14b3efjsn51d4bbe9afe0',
