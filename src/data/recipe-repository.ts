import type {
  Recipe,
  RecipeSearchResponse,
} from "../domain/recipe";
import {
  mockSupabase,
  recipeCatalogMeta,
  recipeRowCount,
} from "./mock-supabase";

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "for",
  "in",
  "no",
  "of",
  "on",
  "or",
  "the",
  "to",
  "with",
]);

export function normalizeRecipeQuery(query: string) {
  return query
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function words(value: string) {
  return normalizeRecipeQuery(value).split(" ").filter(Boolean);
}

function tokenHit(value: string, token: string) {
  const normalized = normalizeRecipeQuery(value);
  if (!normalized) return false;

  if (/[\u3400-\u9fff]/u.test(token)) {
    return normalized.includes(token);
  }

  return words(normalized).some((word) => word.startsWith(token));
}

function queryTokens(normalized: string) {
  return [
    ...new Set(
      normalized
        .split(" ")
        .filter((token) => token.length > 1 && !STOPWORDS.has(token)),
    ),
  ];
}

function scoreRecipe(recipe: Recipe, tokens: string[]) {
  const keywordText = recipe.keywords.join(" ");
  const ingredientText = recipe.ingredients.join(" ");
  const metaText = recipe.category + " " + recipe.area;

  let titleHits = 0;
  let keywordHits = 0;
  let ingredientHits = 0;
  let metaHits = 0;

  for (const token of tokens) {
    if (tokenHit(recipe.title, token)) {
      titleHits += 1;
    } else if (tokenHit(keywordText, token)) {
      keywordHits += 1;
    } else if (tokenHit(ingredientText, token)) {
      ingredientHits += 1;
    } else if (tokenHit(metaText, token)) {
      metaHits += 1;
    }
  }

  return {
    recipe,
    titleHits,
    allInTitle: titleHits === tokens.length,
    allMatched:
      titleHits + keywordHits + ingredientHits + metaHits === tokens.length,
    score:
      titleHits + keywordHits + ingredientHits + metaHits === 0
        ? 0
        : titleHits * 100 +
          keywordHits * 40 +
          ingredientHits * 25 +
          metaHits * 10 +
          (recipe.origin === "nutripal" ? 3 : 0),
  };
}

export async function searchRecipes(
  query: string,
  limit = 8,
): Promise<RecipeSearchResponse> {
  const normalized = normalizeRecipeQuery(query);

  if (!normalized) {
    return { mode: "exact", recipes: [], suggestions: [] };
  }

  const result = await mockSupabase
    .from("recipes")
    .select("*")
    .limit(200);

  if (result.error) throw new Error(result.error.message);

  const tokens = queryTokens(normalized);
  const scored = (result.data ?? []).map((recipe) =>
    scoreRecipe(recipe, tokens),
  );
  const byScore = (
    left: ReturnType<typeof scoreRecipe>,
    right: ReturnType<typeof scoreRecipe>,
  ) => right.score - left.score;

  if (tokens.length > 0) {
    const titleMatches = scored
      .filter((item) => item.allInTitle)
      .sort(byScore);

    if (titleMatches.length > 0) {
      return {
        mode: "exact",
        recipes: titleMatches.slice(0, limit).map((item) => item.recipe),
        suggestions: [],
      };
    }

    const allMatches = scored
      .filter((item) => item.allMatched)
      .sort(byScore);

    if (allMatches.length > 0) {
      return {
        mode: "exact",
        recipes: allMatches.slice(0, limit).map((item) => item.recipe),
        suggestions: [],
      };
    }

    const partialMatches = scored
      .filter((item) => item.score > 0)
      .sort(byScore);

    if (partialMatches.length > 0) {
      return {
        mode: "partial",
        recipes: partialMatches.slice(0, limit).map((item) => item.recipe),
        suggestions: [],
      };
    }
  }

  return {
    mode: "suggestions",
    recipes: [],
    suggestions: (result.data ?? []).slice(0, 4),
  };
}

export const recipeDatabaseInfo = {
  count: recipeRowCount,
  sourceName: recipeCatalogMeta.sourceName,
  retrievedAt: recipeCatalogMeta.retrievedAt,
};

export type { Recipe };

