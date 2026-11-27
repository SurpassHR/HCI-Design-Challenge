import { describe, expect, it } from "vitest";
import {
  recipeDatabaseInfo,
  searchRecipes,
} from "../data/recipe-repository";

describe("mock Supabase recipe search", () => {
  it("searches English, Chinese and multi-word dish queries", async () => {
    expect(recipeDatabaseInfo.count).toBeGreaterThanOrEqual(80);

    const tofu = await searchRecipes("tofu");
    expect(tofu.mode).toBe("exact");
    expect(tofu.recipes.map((recipe) => recipe.title.en)).toContain("Ma Po Tofu");

    const chi = await searchRecipes("chi");
    expect(chi.recipes.length).toBeGreaterThan(0);
    expect(
      chi.recipes.every((recipe) => /chick|chil/i.test(recipe.title.en)),
    ).toBe(true);
    expect(
      chi.recipes.map((recipe) => recipe.title.en),
    ).not.toContain("Mapo Tofu & Brown Rice");

    const sushi = await searchRecipes("寿司");
    expect(sushi.recipes.map((recipe) => recipe.title.en)).toContain("Sushi");

    const chineseTofu = await searchRecipes("麻婆豆腐");
    expect(
      chineseTofu.recipes.map((recipe) => recipe.title.zh),
    ).toContain("麻婆豆腐配糙米饭");

    const chineseChicken = await searchRecipes("鸡肉");
    expect(chineseChicken.recipes.length).toBeGreaterThan(2);

    const chickenCurry = await searchRecipes("chicken curry");
    expect(chickenCurry.recipes.length).toBeGreaterThan(0);
    expect(
      chickenCurry.recipes.every((recipe) =>
        /chicken|curry/i.test(recipe.searchText),
      ),
    ).toBe(true);

    const unknown = await searchRecipes("zzzz-no-match");
    expect(unknown.mode).toBe("suggestions");
    expect(unknown.recipes).toHaveLength(0);
    expect(unknown.suggestions.length).toBeGreaterThan(0);

    const empty = await searchRecipes("");
    expect(empty).toEqual({
      mode: "exact",
      recipes: [],
      suggestions: [],
    });
  });
});
