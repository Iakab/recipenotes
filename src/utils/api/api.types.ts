export type Instruction = {
  appliance: string;
  display_text: string;
  end_time: number;
  id: number;
  position: number;
  start_time: number;
  temperature: number;
};

export type Instructions = Instruction;

type Nutrition = {
  calories: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  protein: number;
  sugar: number;
};

type Tags = {
  display_name: string;
  id: number;
  name: string;
  root_tag_type: string;
  type: string;
};
type TipsSummary = {
  by_line: string;
  content: string;
  header: string;
};

type UserRatings = {
  count_negative: number;
  count_positive: number;
  score: number;
};

type Credit = {
  name: string;
  type: string;
};
type Credits = Credit;

type Renditions = {
  aspect: string;
  bit_rate: number;
  container: string;
  content_type: string;
  duration: number;
  file_size: number;
  height: number;
  maximum_bit_rate: number;
  minimum_bit_rate: number;
  name: string;
  poster_url: string;
  url: string;
  width: number;
};

type TotalTimeTier = {
  display_tier: string;
  tier: string;
};

type Ingredient = {
  display_plural: string;
  display_singular: string;
  name: string;
};

type Unit = {
  abbreviation: string;
  display_plural: string;
  display_singular: string;
  name: string;
  system: string;
};
type Measurement = {
  id: number;
  quantity: string;
  unit: Unit[];
};

export type Component = {
  extra_comment: string;
  id: number;
  ingredient: Ingredient[];
  measurements: Measurement[];
  position: number;
  raw_text: string;
};
type Components = Component;

type Section = {
  components: Components[];
  name: string;
  position: number;
};
export type RecipeItem = {
  country: string;
  credits: Credits[];
  description: string;
  id: string;
  instructions: Instructions[];
  name: string;
  nutrition: Nutrition[];
  original_video_url: string;
  prep_time_minuntes: number;
  // renditions: Renditions[];
  sections: Section[];
  tags: Tags[];
  thumbnail_url: string;
  tips_summary: TipsSummary[];
  total_time_tier: TotalTimeTier;
  user_ratings: UserRatings;
  video_id: number;
  video_url: string;
  yields: string;
};

export type Recipes = RecipeItem[];
