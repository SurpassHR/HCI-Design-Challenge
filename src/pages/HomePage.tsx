import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoaderCircle,
  Search,
  X,
} from "lucide-react";
import { useProfile } from "../app/profile-context";
import {
  FigmaIcon,
  type FigmaIconName,
} from "../components/FigmaIcon";
import { glyphToFigmaIcon } from "../components/figma-food-icon";
import {
  recipeDatabaseInfo,
  searchRecipes,
} from "../data/recipe-repository";
import type { FoodGlyphName } from "../domain/food-glyph";
import type { Recipe, RecipeSearchResponse } from "../domain/recipe";
import { useI18n } from "../i18n/useI18n";

interface LocalizedText {
  en: string;
  zh: string;
}

interface Dish {
  id: string;
  title: LocalizedText;
  glyph: FoodGlyphName;
  time: LocalizedText;
  calories: LocalizedText;
  price: string;
  tags: LocalizedText[];
  reason: LocalizedText;
  tone: "coral" | "green" | "gold";
  keywords: string[];
}

const dishes: Dish[] = [
  {
    id: "local-mapo-tofu",
    title: { en: "Mapo Tofu & Brown Rice", zh: "麻婆豆腐配糙米饭" },
    glyph: "curry",
    time: { en: "25 min", zh: "25 分钟" },
    calories: { en: "520 kcal", zh: "520 千卡" },
    price: "£3.20",
    tags: [
      { en: "Sichuan", zh: "川味" },
      { en: "High-protein", zh: "高蛋白" },
    ],
    reason: {
      en: "You love Sichuan food and need +30g protein today.",
      zh: "你喜欢川味，而且今天的蛋白质还差 30 克。",
    },
    tone: "coral",
    keywords: ["tofu", "mapo", "sichuan", "rice", "spicy"],
  },
  {
    id: "local-halloumi-quinoa",
    title: { en: "Halloumi Quinoa Bowl", zh: "哈鲁米藜麦碗" },
    glyph: "salad",
    time: { en: "15 min", zh: "15 分钟" },
    calories: { en: "450 kcal", zh: "450 千卡" },
    price: "£2.80",
    tags: [
      { en: "Fresh", zh: "清爽" },
      { en: "Vegetarian", zh: "素食" },
    ],
    reason: {
      en: "A quick vegetarian option that fits your 30-minute limit.",
      zh: "符合你 30 分钟烹饪限制的快手素食。",
    },
    tone: "green",
    keywords: ["halloumi", "quinoa", "bowl", "salad", "vegetarian"],
  },
  {
    id: "local-miso-salmon",
    title: { en: "Miso Salmon Rice", zh: "味噌三文鱼饭" },
    glyph: "sushi",
    time: { en: "20 min", zh: "20 分钟" },
    calories: { en: "580 kcal", zh: "580 千卡" },
    price: "£4.60",
    tags: [
      { en: "Omega-3", zh: "Omega-3" },
      { en: "Pantry rice", zh: "现有米饭" },
    ],
    reason: {
      en: "You have rice at home and still need 36g of protein today.",
      zh: "家里有米饭，而且今天还需要补充 36 克蛋白质。",
    },
    tone: "gold",
    keywords: ["sushi", "salmon", "miso", "rice", "fish", "japanese"],
  },
  {
    id: "local-lemon-chicken",
    title: { en: "Lemon Herb Chicken", zh: "柠檬香草鸡" },
    glyph: "citrus",
    time: { en: "30 min", zh: "30 分钟" },
    calories: { en: "610 kcal", zh: "610 千卡" },
    price: "£4.20",
    tags: [
      { en: "High-protein", zh: "高蛋白" },
      { en: "One pan", zh: "一锅完成" },
    ],
    reason: {
      en: "A filling option that uses the lemon already in your pantry.",
      zh: "利用食材库里已有的柠檬，做一顿有满足感的晚餐。",
    },
    tone: "green",
    keywords: ["lemon", "chicken", "herb", "high protein"],
  },
  {
    id: "local-mushroom-risotto",
    title: { en: "Mushroom Miso Risotto", zh: "蘑菇味噌烩饭" },
    glyph: "beans",
    time: { en: "25 min", zh: "25 分钟" },
    calories: { en: "520 kcal", zh: "520 千卡" },
    price: "£3.40",
    tags: [
      { en: "Vegetarian", zh: "素食" },
      { en: "Comfort", zh: "暖心" },
    ],
    reason: {
      en: "A warm vegetarian meal that keeps tonight’s budget in check.",
      zh: "温暖的全素餐，同时把今晚的预算控制在范围内。",
    },
    tone: "gold",
    keywords: ["mushroom", "miso", "risotto", "rice", "vegetarian"],
  },
];

const categoryLabels: Record<string, string> = {
  Beef: "牛肉",
  Breakfast: "早餐",
  Chicken: "鸡肉",
  Chinese: "中式",
  Dessert: "甜点",
  Goat: "山羊肉",
  Lamb: "羊肉",
  Miscellaneous: "综合",
  Pasta: "意面",
  Pork: "猪肉",
  Seafood: "海鲜",
  Side: "配菜",
  Starter: "前菜",
  Vegan: "纯素",
  Vegetarian: "素食",
};

const areaLabels: Record<string, string> = {
  Algerian: "阿尔及利亚",
  Argentina: "阿根廷",
  Australian: "澳大利亚",
  British: "英国",
  Canadian: "加拿大",
  Chinese: "中国",
  Greek: "希腊",
  India: "印度",
  Italian: "意大利",
  Jamaican: "牙买加",
  Japanese: "日本",
  Kenyan: "肯尼亚",
  Malaysian: "马来西亚",
  Mediterranean: "地中海",
  Mexican: "墨西哥",
  Netherlands: "荷兰",
  Norway: "挪威",
  Sichuan: "四川",
  Spanish: "西班牙",
  Syrian: "叙利亚",
  Thai: "泰国",
  Turkish: "土耳其",
  "United States": "美国",
  Venezuela: "委内瑞拉",
  Vietnamese: "越南",
};

type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; response: RecipeSearchResponse };

function tagIcon(label: string): FigmaIconName | undefined {
  const value = label.toLowerCase();
  if (value.includes("sichuan") || value.includes("spicy")) return "chili";
  if (value.includes("protein") || value.includes("omega")) return "muscle";
  if (value.includes("fish") || value.includes("sushi")) return "bento";
  if (value.includes("rice")) return "rice";
  if (value.includes("vegetarian") || value.includes("fresh")) return "leaf";
  return undefined;
}

export function HomePage() {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const { isChinese, t } = useI18n();
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [searchState, setSearchState] = useState<SearchState>({ status: "idle" });
  const isSearching = query.trim().length > 0;
  const visibleDishes = showAll ? dishes : dishes.slice(0, 3);
  const featured = visibleDishes[0];
  const localize = (value: LocalizedText) =>
    isChinese ? value.zh : value.en;

  function updateQuery(next: string) {
    setQuery(next);
    setSearchState(
      next.trim() ? { status: "loading" } : { status: "idle" },
    );
  }

  function openRecipe(recipeId: string) {
    navigate(`/recipe/${encodeURIComponent(recipeId)}`);
  }

  useEffect(() => {
    const normalized = query.trim();

    if (!normalized) {
      return;
    }

    let active = true;
    const timer = window.setTimeout(() => {
      void searchRecipes(normalized, 8)
        .then((response) => {
          if (active) setSearchState({ status: "ready", response });
        })
        .catch(() => {
          if (active) setSearchState({ status: "error" });
        });
    }, 180);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [query]);

  const resultRecipes =
    searchState.status === "ready" ? searchState.response.recipes : [];
  const suggestionRecipes =
    searchState.status === "ready" ? searchState.response.suggestions : [];
  const searchMode =
    searchState.status === "ready" ? searchState.response.mode : "exact";
  const categoryLabel = (value: string) =>
    isChinese ? (categoryLabels[value] ?? value) : value;
  const areaLabel = (value: string) =>
    isChinese
      ? (areaLabels[value] ?? (value || "国际"))
      : value || "International";

  return (
    <main className="home-page page">
      <header className="home-header">
        <div>
          <p className="home-greeting">
            <span>
              {t(
                "Good evening, " + profile.displayName,
                "晚上好，" + profile.displayName,
              )}
            </span>
            <FigmaIcon name="wave" size={15} />
          </p>
          <h1>{t("What’s on your plate today?", "今天想吃点什么？")}</h1>
        </div>
        <button
          aria-label={t("Open your profile", "打开个人档案")}
          className="avatar"
          onClick={() => navigate("/me")}
          type="button"
        >
          <FigmaIcon name="avatar" size={27} />
        </button>
      </header>

      <section
        aria-label={t("Daily nutrition summary", "每日营养概览")}
        className="daily-summary daily-summary--v2"
      >
        <p className="daily-kcal">
          <strong>1,240</strong>
          <span>{t("/ 1,900 kcal today", "/ 1,900 千卡 · 今日")}</span>
        </p>
        <div
          aria-label={t("65 percent of daily calories", "今日热量完成 65%")}
          className="daily-progress"
        >
          <i style={{ width: "65%" }} />
        </div>
        <div className="daily-macros">
          <div>
            <b>62g</b>
            <span>{t("Protein", "蛋白质")}</span>
          </div>
          <div>
            <b>140g</b>
            <span>{t("Carbs", "碳水")}</span>
          </div>
          <div>
            <b>38g</b>
            <span>{t("Fat", "脂肪")}</span>
          </div>
        </div>
      </section>

      <section aria-label={t("Dish search", "菜品搜索")} className="dish-search">
        <label className="dish-search__field">
          <span className="visually-hidden">
            {t("Search dishes", "搜索菜品")}
          </span>
          <input
            aria-label={t("Search dishes", "搜索菜品")}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder={t("Search dishes", "搜索菜品")}
            type="search"
            value={query}
          />
          {query ? (
            <button
              aria-label={t("Clear search", "清除搜索")}
              onClick={() => updateQuery("")}
              type="button"
            >
              <X aria-hidden="true" size={15} />
            </button>
          ) : null}
        </label>
        <div className="dish-search__samples">
          <span>{t("Try:", "试试：")}</span>
          {[
            { en: "Tofu", zh: "豆腐" },
            { en: "Sushi", zh: "寿司" },
            { en: "Chicken", zh: "鸡肉" },
            { en: "Pasta", zh: "意面" },
          ].map((sample) => (
            <button
              className="ui-chip"
              key={sample.en}
              onClick={() => updateQuery(sample.en)}
              type="button"
            >
              {isChinese ? sample.zh : sample.en}
            </button>
          ))}
        </div>
      </section>

      <div className="section-bar">
        <h2 className="heading-with-icon">
          {isSearching ? (
            <Search aria-hidden="true" size={18} />
          ) : (
            <FigmaIcon name="sparkle" size={19} />
          )}
          {isSearching
            ? searchMode === "suggestions"
              ? t("Suggested recipes", "推荐菜谱")
              : searchMode === "partial"
                ? t("Close matches", "相近菜谱")
                : t("Search results", "搜索结果")
            : t("Picked for you", "为你精选")}
        </h2>
        {!isSearching ? (
          <button
            aria-expanded={showAll}
            className="text-link"
            onClick={() => setShowAll((current) => !current)}
            type="button"
          >
            {showAll ? t("Show less", "收起") : t("See all", "查看全部")}
          </button>
        ) : (
          <span className="result-count">
            {searchState.status === "loading"
              ? t("Searching…", "搜索中…")
              : searchState.status === "error"
                ? t("Unavailable", "不可用")
                : resultRecipes.length > 0
                  ? `${resultRecipes.length} ${
                      resultRecipes.length === 1
                        ? t("recipe", "道菜谱")
                        : t("recipes", "道菜谱")
                    }`
                  : searchMode === "suggestions"
                    ? `${suggestionRecipes.length} ${
                        suggestionRecipes.length === 1
                          ? t("suggestion", "个建议")
                          : t("suggestions", "个建议")
                      }`
                    : `0 ${t("recipes", "道菜谱")}`}
          </span>
        )}
      </div>

      {isSearching ? (
        searchState.status === "loading" ? (
          <section className="search-feedback" role="status">
            <LoaderCircle aria-hidden="true" size={20} />
            <span>
              {t(
                "Searching " + recipeDatabaseInfo.count + " recipes…",
                "正在搜索 " + recipeDatabaseInfo.count + " 道菜谱…",
              )}
            </span>
          </section>
        ) : searchState.status === "error" ? (
          <section className="search-feedback search-feedback--error" role="alert">
            <span>
              {t(
                "Recipe search is temporarily unavailable.",
                "菜谱搜索暂时不可用。",
              )}
            </span>
            <button className="text-link" onClick={() => updateQuery("")} type="button">
              {t("Show all recipes", "显示全部菜谱")}
            </button>
          </section>
        ) : resultRecipes.length > 0 ? (
          <RecipeResults
            areaLabel={areaLabel}
            categoryLabel={categoryLabel}
            label={t("Matching recipes", "匹配菜谱")}
            onOpen={(recipe) => openRecipe(recipe.id)}
            recipes={resultRecipes}
          />
        ) : (
          <section className="empty-search empty-search--suggestions" aria-live="polite">
            <span aria-hidden="true">
              <Search size={28} />
            </span>
            <h2>
              {t(
                "No exact match for “" + query.trim() + "”",
                "没有完全匹配“" + query.trim() + "”",
              )}
            </h2>
            <p>
              {t(
                `Searched ${recipeDatabaseInfo.count} recipes. Try one of these instead.`,
                `已搜索 ${recipeDatabaseInfo.count} 道菜谱，可以试试这些。`,
              )}
            </p>
            <RecipeResults
              areaLabel={areaLabel}
              categoryLabel={categoryLabel}
              label={t("Suggested recipes", "推荐菜谱")}
              onOpen={(recipe) => openRecipe(recipe.id)}
              recipes={suggestionRecipes}
            />
            <button className="text-link" onClick={() => updateQuery("")} type="button">
              {t("Show all recipes", "显示全部菜谱")}
            </button>
          </section>
        )
      ) : featured ? (
        <>
          <button
            aria-haspopup="dialog"
            aria-label={
              t("Open recipe", "打开菜谱") + ": " + localize(featured.title)
            }
            className="featured-card"
            onClick={() => openRecipe(featured.id)}
            type="button"
          >
            <div className={"featured-hero featured-hero--" + featured.tone}>
              <div className="featured-tags">
                {featured.tags.map((tag) => (
                  <span key={tag.en}>
                    {tagIcon(tag.en) ? (
                      <FigmaIcon name={tagIcon(tag.en)!} size={12} />
                    ) : null}
                    {localize(tag)}
                  </span>
                ))}
              </div>
              <span aria-hidden="true" className="featured-glyph">
                <FigmaIcon
                  name={glyphToFigmaIcon[featured.glyph]}
                  size={64}
                />
              </span>
              <div aria-hidden="true" className="plate-shadow" />
            </div>
            <div className="featured-body">
              <h3>{localize(featured.title)}</h3>
              <p className="recipe-meta">
                <span>
                  <FigmaIcon name="timer" size={13} /> {localize(featured.time)}
                </span>
                <span>
                  <FigmaIcon name="flame" size={13} /> {localize(featured.calories)}
                </span>
                <span>
                  <FigmaIcon name="money" size={13} /> {featured.price}
                </span>
              </p>
              <p className="why-card">
                <FigmaIcon name="bulb" size={14} />
                <span>
                  <b>{t("Why this?", "为什么推荐？")}</b> {localize(featured.reason)}
                </span>
              </p>
            </div>
          </button>

          {visibleDishes.length > 1 ? (
            <div
              aria-label={t("More recommendations", "更多推荐")}
              className="mini-grid"
            >
              {visibleDishes
                .filter((dish) => dish.title.en !== featured.title.en)
                .map((dish) => (
                  <button
                    aria-haspopup="dialog"
                    aria-label={
                      t("Open recipe", "打开菜谱") + ": " + localize(dish.title)
                    }
                    className="mini-card"
                    key={dish.title.en}
                    onClick={() => openRecipe(dish.id)}
                    type="button"
                  >
                    <span aria-hidden="true" className="mini-card__icon">
                      <FigmaIcon
                        name={glyphToFigmaIcon[dish.glyph]}
                        size={34}
                      />
                    </span>
                    <strong>{localize(dish.title)}</strong>
                    <small>
                      {localize(dish.calories)} · {localize(dish.time)}
                    </small>
                  </button>
                ))}
            </div>
          ) : null}
        </>
      ) : null}

    </main>
  );
}

function RecipeResults({
  recipes,
  onOpen,
  categoryLabel,
  areaLabel,
  label,
}: {
  recipes: Recipe[];
  onOpen: (recipe: Recipe) => void;
  categoryLabel: (value: string) => string;
  areaLabel: (value: string) => string;
  label: string;
}) {
  const { isChinese } = useI18n();

  return (
    <section aria-label={label} className="recipe-results">
      {recipes.map((recipe) => (
        <button
          className="recipe-result"
          key={recipe.id}
          onClick={() => onOpen(recipe)}
          type="button"
        >
          <span aria-hidden="true" className="recipe-result__glyph">
            <FigmaIcon
              name={glyphToFigmaIcon[recipe.glyph]}
              size={26}
            />
          </span>
          <span className="recipe-result__copy">
            <strong>{recipe.title[isChinese ? "zh" : "en"]}</strong>
            <small>
              {categoryLabel(recipe.category)} · {areaLabel(recipe.area)}
            </small>
            <em>{recipe.ingredients.slice(0, 3).join(" · ")}</em>
          </span>
          <span
            className={
              recipe.origin === "nutripal"
                ? "recipe-result__source recipe-result__source--local"
                : "recipe-result__source"
            }
          >
            {recipe.origin === "nutripal" ? "NutriPal" : recipe.sourceName}
          </span>
        </button>
      ))}
    </section>
  );
}
