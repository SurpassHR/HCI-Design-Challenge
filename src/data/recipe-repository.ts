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

const LATIN_FOLDS: Record<string, string> = {
  ß: "ss",
  æ: "ae",
  œ: "oe",
  ø: "o",
  đ: "d",
  ð: "d",
  ł: "l",
  þ: "th",
  ı: "i",
  ŧ: "t",
};

export function normalizeRecipeQuery(query: string) {
  return query
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[ßæœøđðłþıŧ]/g, (character) => LATIN_FOLDS[character])
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function words(value: string) {
  return normalizeRecipeQuery(value).split(" ").filter(Boolean);
}

function editDistanceWithin(left: string, right: string, maximum: number) {
  const leftCharacters = Array.from(left);
  const rightCharacters = Array.from(right);

  if (Math.abs(leftCharacters.length - rightCharacters.length) > maximum) {
    return false;
  }

  let previous = Array.from(
    { length: rightCharacters.length + 1 },
    (_, index) => index,
  );

  for (let leftIndex = 1; leftIndex <= leftCharacters.length; leftIndex += 1) {
    const current = [leftIndex];

    for (
      let rightIndex = 1;
      rightIndex <= rightCharacters.length;
      rightIndex += 1
    ) {
      const substitution =
        previous[rightIndex - 1] +
        (leftCharacters[leftIndex - 1] === rightCharacters[rightIndex - 1]
          ? 0
          : 1);
      const insertion = current[rightIndex - 1] + 1;
      const deletion = previous[rightIndex] + 1;
      current[rightIndex] = Math.min(substitution, insertion, deletion);
    }

    previous = current;
  }

  return previous[rightCharacters.length] <= maximum;
}

function fuzzyLimit(token: string) {
  if (token.length >= 7) return 2;
  return token.length >= 3 ? 1 : 0;
}

type TokenMatch = "exact" | "fuzzy";

function tokenHit(value: string, token: string): TokenMatch | null {
  const normalized = normalizeRecipeQuery(value);
  if (!normalized) return null;

  if (/[\u3400-\u9fff]/u.test(token)) {
    return normalized.includes(token) ? "exact" : null;
  }

  const valueWords = words(normalized);
  if (valueWords.some((word) => word.startsWith(token))) return "exact";

  const maximum = fuzzyLimit(token);
  if (
    maximum > 0 &&
    valueWords.some((word) => editDistanceWithin(word, token, maximum))
  ) {
    return "fuzzy";
  }

  return null;
}

function queryTokens(normalized: string) {
  return [
    ...new Set(
      normalized
        .split(" ")
        .filter(
          (token) =>
            !STOPWORDS.has(token) &&
            (token.length > 1 || /[\u3400-\u9fff]/u.test(token)),
        ),
    ),
  ];
}

function scoreRecipe(recipe: Recipe, tokens: string[]) {
  const fields = [
    {
      text: recipe.title.en + " " + recipe.title.zh,
      exactWeight: 100,
      fuzzyWeight: 55,
      title: true,
    },
    {
      text: recipe.keywords.join(" "),
      exactWeight: 40,
      fuzzyWeight: 22,
      title: false,
    },
    {
      text: recipe.ingredients.join(" "),
      exactWeight: 25,
      fuzzyWeight: 12,
      title: false,
    },
    {
      text: recipe.category + " " + recipe.area,
      exactWeight: 10,
      fuzzyWeight: 5,
      title: false,
    },
    {
      text: recipe.searchText,
      exactWeight: 15,
      fuzzyWeight: 8,
      title: false,
    },
  ];

  let exactHits = 0;
  let fuzzyHits = 0;
  let exactTitleHits = 0;
  let score = recipe.origin === "nutripal" ? 3 : 0;

  for (const token of tokens) {
    const matches = fields.map((field) => ({
      field,
      match: tokenHit(field.text, token),
    }));
    const exactMatch = matches.find(({ match }) => match === "exact");

    if (exactMatch) {
      exactHits += 1;
      if (exactMatch.field.title) exactTitleHits += 1;
      score += exactMatch.field.exactWeight;
      continue;
    }

    const fuzzyMatch = matches.find(({ match }) => match === "fuzzy");
    if (fuzzyMatch) {
      fuzzyHits += 1;
      score += fuzzyMatch.field.fuzzyWeight;
    }
  }

  return {
    recipe,
    allInTitle: exactTitleHits === tokens.length && fuzzyHits === 0,
    allExact: exactHits === tokens.length,
    allMatched: exactHits + fuzzyHits === tokens.length,
    score: exactHits + fuzzyHits === 0 ? 0 : score,
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
  const hasCjk = tokens.some((token) => /[\u3400-\u9fff]/u.test(token));
  const scored = (result.data ?? []).map((recipe) =>
    scoreRecipe(recipe, tokens),
  );
  const byScore = (
    left: ReturnType<typeof scoreRecipe>,
    right: ReturnType<typeof scoreRecipe>,
  ) => right.score - left.score;

  if (tokens.length > 0) {
    if (!hasCjk) {
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
    }

    const allMatches = scored.filter((item) => item.allExact).sort(byScore);

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

