import type { FoodGlyphName } from "./food-glyph";

export type RecipeOrigin = "nutripal" | "themealdb";

export interface LocalizedRecipeTitle {
  en: string;
  zh: string;
}

export type SwapDirection = "lower" | "higher";

export interface RecipeDetailIngredient {
  id: string;
  name: LocalizedRecipeTitle;
  amount?: LocalizedRecipeTitle;
  emphasized?: boolean;
}

export interface RecipeSwapOption {
  id: string;
  direction: SwapDirection;
  replacesIngredientId: string;
  replacement: RecipeDetailIngredient;
  optionAmount: LocalizedRecipeTitle;
  caloriesDelta: number;
  resultingCalories: number;
  appliedTitle: LocalizedRecipeTitle;
  steps: LocalizedRecipeStep[];
  allergens: string[];
  cardSummary: LocalizedRecipeTitle;
  confirmation: LocalizedRecipeTitle;
}

export interface LocalizedRecipeStep {
  en: string;
  zh: string;
}

export interface RecipeDetail {
  recipeId: string;
  servings: number;
  caloriesPerServing?: number;
  ingredients: RecipeDetailIngredient[];
  steps: LocalizedRecipeStep[];
  allergens: LocalizedRecipeTitle[];
  swaps: RecipeSwapOption[];
}

export interface Recipe {
  id: string;
  title: LocalizedRecipeTitle;
  category: string;
  area: string;
  ingredients: string[];
  glyph: FoodGlyphName;
  origin: RecipeOrigin;
  sourceName: string;
  sourceUrl?: string;
  externalId?: string;
  keywords: string[];
  searchText: string;
  minutes?: number;
  calories?: number;
  price?: string;
  reason?: string;
}

export interface RecipeCatalogMeta {
  sourceName: string;
  sourceUrl: string;
  retrievedAt: string;
  categories: string[];
  note: string;
}

export interface RecipeCatalog {
  meta: RecipeCatalogMeta;
  recipes: Recipe[];
}

export type RecipeSearchMode = "exact" | "partial" | "suggestions";

export interface RecipeSearchResponse {
  mode: RecipeSearchMode;
  recipes: Recipe[];
  suggestions: Recipe[];
}

