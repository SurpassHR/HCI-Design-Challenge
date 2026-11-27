import type { Recipe, RecipeCatalog } from "../domain/recipe";
import catalogJson from "./recipe-catalog.json";

const catalog = catalogJson as RecipeCatalog;
const RECIPE_ROWS: Recipe[] = catalog.recipes;

type QueryResult<T> = {
  data: T[] | null;
  error: { message: string } | null;
};

function columnValue(row: Recipe, column: string): string {
  const snakeToCamel: Record<string, keyof Recipe> = {
    search_text: "searchText",
    source_name: "sourceName",
    source_url: "sourceUrl",
    external_id: "externalId",
  };
  const key = (snakeToCamel[column] ?? column) as keyof Recipe;
  const value = row[key];
  if (Array.isArray(value)) return value.join(" ");
  if (value && typeof value === "object") return Object.values(value).join(" ");
  return String(value ?? "");
}

function ilikePattern(pattern: string): RegExp {
  const escaped = pattern
    .split("%")
    .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join(".*");
  return new RegExp("^" + escaped + "$", "i");
}

class MockRecipeQuery implements PromiseLike<QueryResult<Recipe>> {
  private predicates: Array<(recipe: Recipe) => boolean> = [];
  private maximum = Number.POSITIVE_INFINITY;

  select(columns = "*") {
    if (!columns.trim()) {
      throw new Error("select requires a column list");
    }
    return this;
  }

  ilike(column: string, pattern: string) {
    const matcher = ilikePattern(pattern);
    this.predicates.push((recipe) => matcher.test(columnValue(recipe, column)));
    return this;
  }

  or(filters: string) {
    const alternatives = filters.split(",").map((filter) => {
      const match = filter.match(/^([^.]+)\.ilike\.(.+)$/);
      if (!match) {
        throw new Error("Unsupported mock Supabase filter: " + filter);
      }
      const [, column, pattern] = match;
      const matcher = ilikePattern(pattern);
      return (recipe: Recipe) => matcher.test(columnValue(recipe, column));
    });

    this.predicates.push((recipe) =>
      alternatives.some((predicate) => predicate(recipe)),
    );
    return this;
  }

  limit(count: number) {
    this.maximum = Math.max(0, count);
    return this;
  }

  private async execute(): Promise<QueryResult<Recipe>> {
    const data = RECIPE_ROWS.filter((recipe) =>
      this.predicates.every((predicate) => predicate(recipe)),
    ).slice(0, Number.isFinite(this.maximum) ? this.maximum : undefined);

    return { data, error: null };
  }

  then<TResult1 = QueryResult<Recipe>, TResult2 = never>(
    onfulfilled?:
      | ((value: QueryResult<Recipe>) => TResult1 | PromiseLike<TResult1>)
      | null,
    onrejected?:
      | ((reason: unknown) => TResult2 | PromiseLike<TResult2>)
      | null,
  ): Promise<TResult1 | TResult2> {
    return this.execute().then(onfulfilled, onrejected);
  }
}

export const mockSupabase = {
  from(table: "recipes") {
    if (table !== "recipes") {
      throw new Error("Unknown mock Supabase table: " + table);
    }

    return new MockRecipeQuery();
  },
};

export const recipeCatalogMeta = catalog.meta;
export const recipeRowCount = RECIPE_ROWS.length;

