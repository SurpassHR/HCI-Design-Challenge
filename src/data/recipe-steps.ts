import type { Recipe } from "../domain/recipe";

export interface RecipeStep {
  en: string;
  zh: string;
}

const curatedSteps: Record<string, RecipeStep[]> = {
  "local-mapo-tofu": [
    {
      en: "Cook the brown rice according to the packet instructions.",
      zh: "按包装说明将糙米饭煮熟。",
    },
    {
      en: "Pat the tofu dry, cut it into cubes and brown it lightly in a little oil.",
      zh: "豆腐吸干水分后切块，用少许油煎至表面微黄。",
    },
    {
      en: "Fry the spring onion and chilli bean paste, return the tofu with a splash of water and simmer for 5 minutes.",
      zh: "炒香葱花和豆瓣酱，放回豆腐，加少量水焖煮 5 分钟。",
    },
    {
      en: "Spoon the tofu over the rice and serve hot.",
      zh: "将麻婆豆腐浇在糙米饭上，趁热享用。",
    },
  ],
  "local-halloumi-quinoa": [
    {
      en: "Rinse the quinoa and simmer in water for 12–15 minutes until fluffy.",
      zh: "藜麦冲洗后加水煮 12–15 分钟，至松软。",
    },
    {
      en: "Slice the halloumi and pan-fry until golden on both sides.",
      zh: "哈鲁米切片，用平底锅煎至两面金黄。",
    },
    {
      en: "Warm the tomatoes and spinach in the pan until the spinach wilts.",
      zh: "将番茄和菠菜放入锅中加热，至菠菜变软。",
    },
    {
      en: "Add the quinoa to a bowl, top with halloumi and vegetables, then serve.",
      zh: "藜麦装碗，铺上哈鲁米和蔬菜即可。",
    },
  ],
  "local-miso-salmon": [
    {
      en: "Cook the rice according to the packet instructions.",
      zh: "按包装说明将米饭煮熟。",
    },
    {
      en: "Stir the miso with a splash of warm water to make a smooth glaze.",
      zh: "味噌加少量温水调成顺滑的酱汁。",
    },
    {
      en: "Pan-sear the salmon, brush with the miso glaze and cook through.",
      zh: "三文鱼用平底锅煎熟，中途刷上味噌酱。",
    },
    {
      en: "Serve the salmon over rice and finish with sliced spring onion.",
      zh: "三文鱼铺在米饭上，撒上葱花即可。",
    },
  ],
  "local-lemon-chicken": [
    {
      en: "Season the chicken with the herbs, salt and pepper.",
      zh: "鸡肉用香草、盐和胡椒调味。",
    },
    {
      en: "Pan-sear the chicken until golden and cooked through.",
      zh: "鸡肉用平底锅煎至两面金黄并完全熟透。",
    },
    {
      en: "Add the lemon juice to the pan and spoon the juices over the chicken.",
      zh: "锅中加入柠檬汁，将汤汁淋在鸡肉上。",
    },
    {
      en: "Cook the potatoes until tender and serve alongside the chicken.",
      zh: "土豆煮至软熟，与鸡肉一起装盘。",
    },
  ],
  "local-mushroom-risotto": [
    {
      en: "Keep the cooking liquid warm and slice the mushrooms.",
      zh: "将煮饭用的液体保温，蘑菇切片。",
    },
    {
      en: "Sauté the mushrooms in butter until golden, then set them aside.",
      zh: "蘑菇用黄油炒至金黄，盛出备用。",
    },
    {
      en: "Toast the rice, add the warm liquid a little at a time and stir until creamy and tender.",
      zh: "米饭炒香后分次加入温热液体，持续搅拌至浓稠软熟。",
    },
    {
      en: "Stir the mushrooms and miso back in, rest for 2 minutes and serve.",
      zh: "拌回蘑菇和味噌，静置 2 分钟后享用。",
    },
  ],
};

const searedProteinSteps: RecipeStep[] = [
  {
    en: "Cut the main ingredients and vegetables into even pieces and measure the seasonings.",
    zh: "将主料和蔬菜切成均匀大小，并备好调味料。",
  },
  {
    en: "Brown the main protein in a hot pan, then set it aside.",
    zh: "用热锅将主料煎至表面上色，盛出备用。",
  },
  {
    en: "Cook the vegetables, return the protein with a splash of water and simmer until tender and cooked through.",
    zh: "炒香蔬菜，放回主料并加少量水，焖煮至软嫩熟透。",
  },
  {
    en: "Rest for a few minutes, season to taste and serve.",
    zh: "静置几分钟，调味后装盘。",
  },
];

const poultrySteps: RecipeStep[] = [
  {
    en: "Pat the chicken dry, trim any excess and prepare the remaining ingredients.",
    zh: "鸡肉吸干水分并修整，准备好其余食材。",
  },
  {
    en: "Season the chicken and sear it in a hot pan until golden on both sides.",
    zh: "鸡肉调味后放入热锅，煎至两面金黄。",
  },
  {
    en: "Add the remaining ingredients, cover and cook until the chicken is tender and cooked through.",
    zh: "加入其余食材，加盖煮至鸡肉软嫩并完全熟透。",
  },
  {
    en: "Rest briefly, slice or portion the chicken and serve.",
    zh: "稍作静置，切块或分份后装盘。",
  },
];

const seafoodSteps: RecipeStep[] = [
  {
    en: "Prepare the seafood and vegetables and keep them close to the hob.",
    zh: "处理好海鲜和蔬菜，放在灶台旁备用。",
  },
  {
    en: "Heat a little oil and cook the aromatics until fragrant.",
    zh: "锅中加少许油，将香料炒出香味。",
  },
  {
    en: "Add the seafood and cook gently until opaque and just cooked through.",
    zh: "加入海鲜，用中小火煮至变色并刚熟。",
  },
  {
    en: "Season to taste, finish with herbs or lemon if available and serve.",
    zh: "调味，可撒香草或挤些柠檬汁后装盘。",
  },
];

const pastaSteps: RecipeStep[] = [
  {
    en: "Bring salted water to the boil and cook the pasta until just tender.",
    zh: "将加盐的水烧开，意面煮至刚熟。",
  },
  {
    en: "Meanwhile, heat a pan and cook the aromatics and main ingredients.",
    zh: "同时用平底锅炒香配料和主要食材。",
  },
  {
    en: "Drain the pasta, reserving a splash of water, then toss it through the pan until glossy.",
    zh: "意面沥干并保留少量面汤，倒入锅中拌匀至有光泽。",
  },
  {
    en: "Season to taste and serve while hot.",
    zh: "调味后趁热装盘。",
  },
];

const dessertSteps: RecipeStep[] = [
  {
    en: "Prepare the tin or dish and measure all the ingredients.",
    zh: "准备好烤模或容器，称量全部食材。",
  },
  {
    en: "Mix the wet and dry ingredients until evenly combined.",
    zh: "将湿料和干料混合至均匀。",
  },
  {
    en: "Cook or bake until set, golden and cooked through.",
    zh: "烘烤或加热至定型、上色并完全熟透。",
  },
  {
    en: "Cool slightly, portion and serve.",
    zh: "稍微放凉后切份装盘。",
  },
];

const breakfastSteps: RecipeStep[] = [
  {
    en: "Prepare and measure the breakfast ingredients.",
    zh: "准备并称量早餐食材。",
  },
  {
    en: "Cook the main ingredients in a lightly oiled pan.",
    zh: "在薄薄抹油的锅中烹调主要食材。",
  },
  {
    en: "Add the remaining components and warm everything through.",
    zh: "加入其余配料，加热至全部热透。",
  },
  {
    en: "Plate the breakfast, season to taste and serve.",
    zh: "装盘，调味后享用。",
  },
];

const vegetableSteps: RecipeStep[] = [
  {
    en: "Wash and cut the vegetables and prepare the dressing or seasoning.",
    zh: "蔬菜洗净切好，并准备好调味汁。",
  },
  {
    en: "Heat a little oil and cook any aromatics until fragrant.",
    zh: "锅中加少许油，将香料炒香。",
  },
  {
    en: "Add the main ingredients and cook until tender or evenly warmed.",
    zh: "加入主要食材，煮至软嫩或全部热透。",
  },
  {
    en: "Season, toss gently and serve.",
    zh: "调味后轻轻拌匀，装盘享用。",
  },
];

const generalSteps: RecipeStep[] = [
  {
    en: "Prepare and measure all the ingredients.",
    zh: "准备并称量全部食材。",
  },
  {
    en: "Heat a pan or pot and add the main ingredients in order.",
    zh: "加热锅具，按顺序加入主要食材。",
  },
  {
    en: "Cook, stirring as needed, until everything is tender and cooked through.",
    zh: "按需搅拌，煮至全部食材软嫩熟透。",
  },
  {
    en: "Taste, adjust the seasoning and serve.",
    zh: "尝味后调整调味，装盘享用。",
  },
];

const categorySteps: Record<string, RecipeStep[]> = {
  Beef: searedProteinSteps,
  Lamb: searedProteinSteps,
  Goat: searedProteinSteps,
  Pork: searedProteinSteps,
  Chicken: poultrySteps,
  Seafood: seafoodSteps,
  Pasta: pastaSteps,
  Dessert: dessertSteps,
  Breakfast: breakfastSteps,
  Side: vegetableSteps,
  Starter: vegetableSteps,
  Vegan: vegetableSteps,
  Vegetarian: vegetableSteps,
  Miscellaneous: generalSteps,
};

export function getRecipeSteps(recipe: Recipe): RecipeStep[] {
  return curatedSteps[recipe.id] ?? categorySteps[recipe.category] ?? generalSteps;
}
