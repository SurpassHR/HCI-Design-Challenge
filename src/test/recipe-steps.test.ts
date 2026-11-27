import { describe, expect, it } from "vitest";
import { getRecipeById } from "../data/recipe-repository";
import { getRecipeSteps } from "../data/recipe-steps";

describe("recipe cooking steps", () => {
  it("provides curated bilingual steps for NutriPal recommendations", async () => {
    const recipe = await getRecipeById("local-mapo-tofu");
    expect(recipe).toBeDefined();

    const steps = getRecipeSteps(recipe!);
    expect(steps).toHaveLength(4);
    expect(steps[0].zh).toContain("糙米饭");
    expect(steps.every((step) => step.en.length > 0 && step.zh.length > 0)).toBe(
      true,
    );
  });

  it("provides bilingual category steps for catalog recipes", async () => {
    const recipe = await getRecipeById("themealdb-53369");
    expect(recipe).toBeDefined();

    const steps = getRecipeSteps(recipe!);
    expect(steps).toHaveLength(4);
    expect(steps[0].en).toContain("vegetables");
    expect(steps[3].zh).toContain("装盘");
  });
});
