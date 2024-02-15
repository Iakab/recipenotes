
import { Recipes, RecipeItem } from './api.types';



export const reduceRecipesSize = (unalteredRecipes: Recipes): Recipes => {
  const recipes:Recipes = unalteredRecipes.map((recipe: RecipeItem):RecipeItem=> {
    const {
      description,
      instructions,
      name,
      original_video_url: originalVideoUrl,
      sections,
      thumbnail_url: thumbnail,
      video_url: videoUrl,
      country,
      credits,
      id,
      nutrition,
      prep_time_minuntes: prepTime,
      tags,
      tips_summary: tipsSummary,
      total_time_tier: totalTimeTier,
      user_ratings: UserRatings,
      video_id: videoId,
      yields,
    } = recipe;

    return {
      description,
      instructions,
      name,
      original_video_url: originalVideoUrl,
      sections,
      thumbnail_url: thumbnail,
      video_url: videoUrl,
      country,
      credits,
      id,
      nutrition,
      prep_time_minuntes: prepTime,
      tags,
      tips_summary: tipsSummary,
      total_time_tier: totalTimeTier,
      user_ratings: UserRatings,
      video_id: videoId,
      yields,
    };
  });
  return recipes;
};

export const getRecipes = async (searchTag: string) => {

  // try {
  const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=${searchTag}`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a454844a4dmsh793dc8da81d5815p14b3efjsn51d4bbe9afe0',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  const unalteredRecipes = data.results;
  
  const recipes = reduceRecipesSize(unalteredRecipes);

  console.log(recipes);
  return recipes;
};
