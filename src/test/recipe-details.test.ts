import { describe, expect, it } from "vitest";
import {
  getBlockedSwapAllergens,
  getRecipeDetail,
  swapAllowedForAllergens,
  swapsForDirection,
} from "../data/recipe-details";
import { getRecipeById } from "../data/recipe-repository";

describe("recipe details and ingredient swaps", () => {
  it("builds the complete Mapo Tofu swap flow", async () => {
    const recipe = await getRecipeById("local-mapo-tofu");
    expect(recipe).toBeDefined();

    const detail = getRecipeDetail(recipe!);
    expect(detail.caloriesPerServing).toBe(520);
    expect(detail.ingredients).toHaveLength(4);
    expect(detail.steps).toHaveLength(3);
    expect(detail.swaps.map((swap) => swap.direction)).toEqual([
      "lower",
      "higher",
    ]);

    const lower = swapsForDirection(detail, "lower", [])[0];
    expect(lower.resultingCalories).toBe(400);
    expect(lower.replacement.name.en).toBe("Cauliflower rice");

    const higher = swapsForDirection(detail, "higher", [])[0];
    expect(higher.resultingCalories).toBe(610);
    expect(higher.appliedTitle.en).toBe("Mapo Tofu & Egg Fried Rice");
  });

  it("filters egg swaps using English and Chinese allergy labels", async () => {
    const recipe = await getRecipeById("local-mapo-tofu");
    const detail = getRecipeDetail(recipe!);
    const higher = swapsForDirection(detail, "higher", [])[0];

    expect(swapAllowedForAllergens(higher, ["Egg"])).toBe(false);
    expect(swapAllowedForAllergens(higher, ["鸡蛋"])).toBe(false);
    expect(swapsForDirection(detail, "higher", ["Egg"])).toHaveLength(0);
    expect(swapsForDirection(detail, "lower", ["Egg"])).toHaveLength(1);
    expect(getBlockedSwapAllergens(detail, ["Egg"])).toEqual(["Egg"]);
  });

  it("falls back to read-only details for catalog recipes", async () => {
    const recipe = await getRecipeById("themealdb-53369");
    const detail = getRecipeDetail(recipe!);

    expect(detail.ingredients.length).toBeGreaterThan(0);
    expect(detail.steps).toHaveLength(4);
    expect(detail.swaps).toHaveLength(0);
    expect(detail.allergens).toHaveLength(0);
  });
});
