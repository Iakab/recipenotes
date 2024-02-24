import axios from 'axios';

import { Recipes, RecipeItem } from './api.types';

export const reduceRecipesSize = (unalteredRecipes: Recipes): Recipes => {
  const recipes: Recipes = unalteredRecipes.map(
    (recipe: RecipeItem): RecipeItem => {
      const {
        country,
        credits,
        description,
        instructions,
        name,
        nutrition,
        original_video_url: originalVideoUrl,
        prep_time_minuntes: prepTime,
        sections,
        tags,
        thumbnail_url: thumbnail,
        tips_summary: tipsSummary,
        total_time_tier: totalTimeTier,
        user_ratings: UserRatings,
        video_id: videoId,
        video_url: videoUrl,
        yields,
      } = recipe;

      const id = recipe.id.toString();

      return {
        country,
        credits,
        description,
        id,
        instructions,
        name,
        nutrition,
        original_video_url: originalVideoUrl,
        prep_time_minuntes: prepTime,
        sections,
        tags,
        thumbnail_url: thumbnail,
        tips_summary: tipsSummary,
        total_time_tier: totalTimeTier,
        user_ratings: UserRatings,
        video_id: videoId,
        video_url: videoUrl,
        yields,
      };
    },
  );
  return recipes;
};

export type SearchOptions = {
  countryShorthand?: string;
  details?: string;
  nameOrIngredients?: string;
  numberOfItems?: number;
  startingIndex?: number;
};

export const getRecipes = async (
  searchOptions: SearchOptions,
): Promise<Recipes> => {
  const { details, nameOrIngredients, numberOfItems, startingIndex } =
    searchOptions;

  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/list',
    params: {
      from: startingIndex || 0,
      q: nameOrIngredients,
      size: numberOfItems || 2,
      tags: details,
    },
    headers: {
      'X-RapidAPI-Key': 'f733879bf8msh039fecc6e50e11dp19ea08jsned9b4f14fcba',

      'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
    },
  };
  try {
    const response = await axios.request(options);
    const unalteredRecipes = response.data.results;
    const recipes = reduceRecipesSize(unalteredRecipes);
    console.log(recipes);
    return recipes;
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
