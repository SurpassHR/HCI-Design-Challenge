import type {
  LocalizedRecipeTitle,
  Recipe,
  RecipeDetail,
  RecipeSwapOption,
  SwapDirection,
} from "../domain/recipe";
import { getRecipeSteps } from "./recipe-steps";

const text = (en: string, zh: string): LocalizedRecipeTitle => ({ en, zh });

const mapoSwaps: RecipeSwapOption[] = [
  {
    id: "mapo-lower-cauliflower-rice",
    direction: "lower",
    replacesIngredientId: "mapo-brown-rice",
    replacement: {
      id: "mapo-cauliflower-rice",
      name: text("Cauliflower rice", "花椰菜米"),
      amount: text("200 g · cooked", "200 克 · 熟"),
      emphasized: true,
    },
    optionAmount: text("200 g · cooked", "200 克 · 熟"),
    caloriesDelta: -120,
    resultingCalories: 400,
    appliedTitle: text(
      "Mapo Tofu & Cauliflower Rice",
      "麻婆豆腐配花椰菜米",
    ),
    steps: [
      {
        en: "Sauté 200 g cauliflower rice in a non-stick pan for 5 minutes.",
        zh: "200 克花椰菜米放入不粘锅，翻炒 5 分钟。",
      },
      {
        en: "Simmer tofu and mushrooms in mapo sauce for 8–10 minutes.",
        zh: "豆腐和蘑菇加入麻婆酱，焖煮 8–10 分钟。",
      },
      {
        en: "Serve tofu over the cauliflower rice.",
        zh: "将豆腐浇在花椰菜米上即可。",
      },
    ],
    allergens: [],
    cardSummary: text(
      "Brown rice → cauliflower rice · −120 kcal",
      "糙米饭 → 花椰菜米 · −120 千卡",
    ),
    confirmation: text(
      "Cauliflower rice added · −120 kcal. Your meal is now 400 kcal.",
      "已加入花椰菜米 · −120 千卡。当前餐食为 400 千卡。",
    ),
  },
  {
    id: "mapo-higher-egg-fried-rice",
    direction: "higher",
    replacesIngredientId: "mapo-brown-rice",
    replacement: {
      id: "mapo-egg-fried-rice",
      name: text("Egg fried rice", "蛋炒饭"),
      amount: text("180 g · includes 1 egg (30 g)", "180 克 · 含 1 个鸡蛋（30 克）"),
      emphasized: true,
    },
    optionAmount: text("180 g · includes 1 egg (30 g)", "180 克 · 含 1 个鸡蛋（30 克）"),
    caloriesDelta: 90,
    resultingCalories: 610,
    appliedTitle: text("Mapo Tofu & Egg Fried Rice", "麻婆豆腐配蛋炒饭"),
    steps: [
      {
        en: "Stir-fry 150 g cooked rice with 1 egg (30 g) until the egg is fully cooked.",
        zh: "150 克熟米饭与 1 个鸡蛋（30 克）炒匀，至鸡蛋完全熟透。",
      },
      {
        en: "Simmer tofu and mushrooms in mapo sauce for 8–10 minutes.",
        zh: "豆腐和蘑菇加入麻婆酱，焖煮 8–10 分钟。",
      },
      {
        en: "Serve tofu over the egg fried rice.",
        zh: "将豆腐浇在蛋炒饭上即可。",
      },
    ],
    allergens: ["Egg"],
    cardSummary: text(
      "Brown rice → egg fried rice · +90 kcal",
      "糙米饭 → 蛋炒饭 · +90 千卡",
    ),
    confirmation: text(
      "Egg fried rice added · +90 kcal. Your meal is now 610 kcal.",
      "已加入蛋炒饭 · +90 千卡。当前餐食为 610 千卡。",
    ),
  },
];

const mapoDetail: RecipeDetail = {
  recipeId: "local-mapo-tofu",
  servings: 1,
  caloriesPerServing: 520,
  ingredients: [
    {
      id: "mapo-tofu",
      name: text("Firm tofu", "北豆腐"),
      amount: text("150 g", "150 克"),
    },
    {
      id: "mapo-mushrooms",
      name: text("Mushrooms", "蘑菇"),
      amount: text("80 g", "80 克"),
    },
    {
      id: "mapo-sauce",
      name: text("Mapo sauce", "麻婆酱"),
      amount: text("60 g", "60 克"),
    },
    {
      id: "mapo-brown-rice",
      name: text("Brown rice", "糙米饭"),
      amount: text("150 g · cooked", "150 克 · 熟"),
      emphasized: true,
    },
  ],
  steps: [
    {
      en: "Heat 150 g cooked brown rice until piping hot.",
      zh: "将 150 克熟糙米饭加热至热气腾腾。",
    },
    {
      en: "Simmer tofu and mushrooms in mapo sauce for 8–10 minutes.",
      zh: "豆腐和蘑菇加入麻婆酱，焖煮 8–10 分钟。",
    },
    {
      en: "Serve the tofu over brown rice.",
      zh: "将豆腐浇在糙米饭上即可。",
    },
  ],
  allergens: [text("Soy", "大豆")],
  swaps: mapoSwaps,
};

export function getRecipeDetail(recipe: Recipe): RecipeDetail {
  if (recipe.id === mapoDetail.recipeId) return mapoDetail;

  return {
    recipeId: recipe.id,
    servings: 1,
    caloriesPerServing: recipe.calories,
    ingredients: recipe.ingredients.map((ingredient, index) => ({
      id: `${recipe.id}-ingredient-${index}`,
      name: { en: ingredient, zh: ingredient },
    })),
    steps: getRecipeSteps(recipe),
    allergens: [],
    swaps: [],
  };
}

function normalizedAllergen(value: string) {
  return value.trim().toLowerCase();
}

export function swapAllowedForAllergens(
  swap: RecipeSwapOption,
  avoidAllergens: string[],
) {
  const avoided = new Set(avoidAllergens.map(normalizedAllergen));
  return swap.allergens.every(
    (allergen) =>
      !avoided.has(normalizedAllergen(allergen)) &&
      !(allergen === "Egg" && avoided.has(normalizedAllergen("鸡蛋"))),
  );
}

export function getBlockedSwapAllergens(
  detail: RecipeDetail,
  avoidAllergens: string[],
) {
  return [
    ...new Set(
      detail.swaps
        .filter((swap) => !swapAllowedForAllergens(swap, avoidAllergens))
        .flatMap((swap) => swap.allergens),
    ),
  ];
}

export function swapsForDirection(
  detail: RecipeDetail,
  direction: SwapDirection,
  avoidAllergens: string[],
) {
  return detail.swaps.filter(
    (swap) =>
      swap.direction === direction &&
      swapAllowedForAllergens(swap, avoidAllergens),
  );
}

