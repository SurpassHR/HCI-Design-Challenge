import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProfile } from "../app/profile-context";
import { Sheet } from "../components/ui/Sheet";
import {
  getBlockedSwapAllergens,
  getRecipeDetail,
  swapsForDirection,
} from "../data/recipe-details";
import { getRecipeById } from "../data/recipe-repository";
import type {
  LocalizedRecipeTitle,
  Recipe,
  RecipeDetail,
  RecipeSwapOption,
  SwapDirection,
} from "../domain/recipe";
import { useI18n } from "../i18n/useI18n";

type LoadState =
  | { status: "loading" }
  | { status: "ready"; recipe: Recipe }
  | { status: "error" };

const allergenLabels: Record<string, LocalizedRecipeTitle> = {
  Egg: { en: "egg", zh: "鸡蛋" },
  Soy: { en: "soy", zh: "大豆" },
};

function localize(value: LocalizedRecipeTitle, isChinese: boolean) {
  return isChinese ? value.zh : value.en;
}

function signedCalories(value: number) {
  return `${value > 0 ? "+" : "−"}${Math.abs(value)}`;
}

function allergenList(values: string[], isChinese: boolean) {
  return values.map((value) => {
    const label = allergenLabels[value];
    return label ? localize(label, isChinese) : value.toLowerCase();
  });
}

export function RecipeDetailPage() {
  const { recipeId = "" } = useParams();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let active = true;

    void getRecipeById(recipeId)
      .then((recipe) => {
        if (!active) return;
        if (!recipe) {
          navigate("/home", { replace: true });
          return;
        }
        setState({ status: "ready", recipe });
      })
      .catch(() => {
        if (active) setState({ status: "error" });
      });

    return () => {
      active = false;
    };
  }, [navigate, recipeId]);

  if (
    state.status === "loading" ||
    (state.status === "ready" && state.recipe.id !== recipeId)
  ) {
    return (
      <main className="recipe-page">
        <div className="recipe-page__inner" role="status">
          {t("Loading recipe…", "正在加载菜谱…")}
        </div>
      </main>
    );
  }

  if (state.status === "error") {
    return (
      <main className="recipe-page">
        <div className="recipe-page__inner recipe-page__empty">
          <p>{t("Recipe unavailable.", "菜谱暂时不可用。")}</p>
          <button className="text-link" onClick={() => navigate("/home")} type="button">
            {t("Back to Home", "返回首页")}
          </button>
        </div>
      </main>
    );
  }

  return <RecipeDetailContent key={state.recipe.id} recipe={state.recipe} />;
}

function RecipeDetailContent({ recipe }: { recipe: Recipe }) {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { isChinese, t } = useI18n();
  const detail = getRecipeDetail(recipe);
  const avoidAllergens = profile.preferences.avoidAllergens;
  const blockedAllergens = getBlockedSwapAllergens(detail, avoidAllergens);
  const hasCalorieGoal =
    Number.isFinite(profile.healthTargets.dailyCalories) &&
    profile.healthTargets.dailyCalories > 0;
  const canRecommend =
    hasCalorieGoal && blockedAllergens.length === 0 && detail.swaps.length > 0;
  const [direction, setDirection] = useState<SwapDirection | null>(
    canRecommend ? "lower" : null,
  );
  const [hintDismissed, setHintDismissed] = useState(false);
  const [appliedSwap, setAppliedSwap] = useState<RecipeSwapOption | null>(null);
  const [swapSheetOpen, setSwapSheetOpen] = useState(false);
  const [sheetDirection, setSheetDirection] = useState<SwapDirection>(
    direction ?? "lower",
  );
  const [previewSwapId, setPreviewSwapId] = useState<string | null>(null);

  const title = appliedSwap ? appliedSwap.appliedTitle : recipe.title;
  const calories = appliedSwap?.resultingCalories ?? detail.caloriesPerServing;
  const ingredients = detail.ingredients.map((ingredient) =>
    ingredient.id === appliedSwap?.replacesIngredientId
      ? appliedSwap.replacement
      : ingredient,
  );
  const steps = appliedSwap?.steps ?? detail.steps;
  const allergens = [
    ...new Set([
      ...detail.allergens.map((allergen) => allergen.en),
      ...(appliedSwap?.allergens ?? []),
    ]),
  ];
  const blockedLabel = allergenList(blockedAllergens, isChinese).join(
    isChinese ? "、" : " & ",
  );
  const directionOption = direction
    ? swapsForDirection(detail, direction, avoidAllergens)[0]
    : undefined;
  const sheetOptions = swapsForDirection(
    detail,
    sheetDirection,
    avoidAllergens,
  );
  const previewSwap =
    sheetOptions.find((option) => option.id === previewSwapId) ?? null;
  const baseSwap = detail.swaps.find((swap) => swap.direction === direction);
  const replacedIngredient = detail.ingredients.find(
    (ingredient) =>
      ingredient.id ===
      (baseSwap?.replacesIngredientId ?? detail.swaps[0]?.replacesIngredientId),
  );

  function chooseDirection(next: SwapDirection) {
    setDirection(next);
    if (swapSheetOpen) {
      setSheetDirection(next);
      setPreviewSwapId(null);
    }
  }

  function openSwapSheet() {
    if (!direction) return;
    setSheetDirection(direction);
    setPreviewSwapId(null);
    setSwapSheetOpen(true);
  }

  function applySwap() {
    if (!previewSwap) return;
    setAppliedSwap(previewSwap);
    setSwapSheetOpen(false);
    setPreviewSwapId(null);
  }

  const calorieGoalCopy = canRecommend
    ? t("Recommended for your calorie goal", "根据你的热量目标推荐")
    : t("Adjust this meal", "调整这道菜");
  const suggestionCopy = blockedAllergens.length
    ? t(
        `Swaps are filtered for your ${blockedLabel} allergy.`,
        `已按你的${blockedLabel}过敏筛选替换项。`,
      )
    : !hasCalorieGoal && !direction
      ? t(
          "Choose a direction to see ingredient swaps.",
          "选择方向以查看食材替换。",
        )
      : directionOption
        ? localize(directionOption.cardSummary, isChinese)
        : t(
            "Choose a direction to see ingredient swaps.",
            "选择方向以查看食材替换。",
          );

  return (
    <main className="recipe-page">
      <div className="recipe-page__inner">
        <nav className="recipe-detail-nav" aria-label={t("Recipe navigation", "菜谱导航")}>
          <button onClick={() => navigate("/home")} type="button">
            <span aria-hidden="true">‹</span> {t("Home", "首页")}
          </button>
          <strong>{t("Recipe detail", "菜谱详情")}</strong>
        </nav>

        <h1>{localize(title, isChinese)}</h1>

        <section className="recipe-nutrition-card">
          <p className="recipe-detail-metrics">
            {recipe.minutes !== undefined ? (
              <span>{recipe.minutes} {t("min", "分钟")}</span>
            ) : null}
            {calories !== undefined ? (
              <span>{calories} {t("kcal", "千卡")}</span>
            ) : null}
            {recipe.price ? <span>{recipe.price}</span> : null}
          </p>
          <p>
            {isChinese
              ? `每份估算 · ${detail.servings} 人份`
              : `Estimated per serving · Serves ${detail.servings}`}
          </p>
        </section>

        {appliedSwap ? (
          <section className="recipe-card recipe-swap-applied">
            <h2>✓ {t("Swap applied", "已应用替换")}</h2>
            <p>{localize(appliedSwap.confirmation, isChinese)}</p>
            <button className="text-link" onClick={() => setAppliedSwap(null)} type="button">
              {t("Undo", "撤销")}
            </button>
          </section>
        ) : detail.swaps.length > 0 ? (
          hintDismissed ? (
            <section className="recipe-card recipe-own-card">
              <h2>{t("Make this meal your own", "自由调整这道菜")}</h2>
              <p>
                {t(
                  "Suggestions hidden for this visit. You can still swap from ingredients.",
                  "本次已隐藏推荐。仍可从食材区替换。",
                )}
              </p>
              <strong>
                {calories} {t("kcal", "千卡")} · {t("Original recipe", "原菜谱")}
              </strong>
            </section>
          ) : (
            <section className="recipe-card recipe-swap-card">
              <div className="recipe-card-heading">
                <h2>{calorieGoalCopy}</h2>
                <button
                  aria-label={t("Dismiss suggestion", "关闭推荐")}
                  className="recipe-card-dismiss"
                  onClick={() => setHintDismissed(true)}
                  type="button"
                >
                  ×
                </button>
              </div>
              <div className="recipe-direction-tabs" role="group" aria-label={t("Swap direction", "替换方向")}>
                {(["lower", "higher"] as const).map((value) => (
                  <button
                    aria-pressed={direction === value}
                    className={direction === value ? "is-selected" : ""}
                    key={value}
                    onClick={() => chooseDirection(value)}
                    type="button"
                  >
                    {value === "lower"
                      ? t("Lower calories", "更低热量")
                      : t("Higher calories", "更高热量")}
                  </button>
                ))}
              </div>
              <p className="recipe-suggestion-copy">{suggestionCopy}</p>
              <button
                className="recipe-view-swaps"
                disabled={!direction}
                onClick={openSwapSheet}
                type="button"
              >
                {t("View swaps", "查看替换")}
              </button>
            </section>
          )
        ) : null}

        <section className="recipe-card recipe-ingredients-card">
          <div className="recipe-card-heading">
            <h2>{t("Ingredients", "食材")}</h2>
            {appliedSwap ? (
              <span>{t("Updated", "已更新")}</span>
            ) : detail.swaps.length > 0 ? (
              <button
                className="recipe-inline-action"
                disabled={!direction}
                onClick={openSwapSheet}
                type="button"
              >
                {t("Swap ingredient", "替换食材")}
              </button>
            ) : null}
          </div>
          <div className="recipe-ingredient-lines">
            {ingredients.map((ingredient) => (
              <p className={ingredient.emphasized ? "is-emphasized" : ""} key={ingredient.id}>
                <span>{localize(ingredient.name, isChinese)}</span>
                {ingredient.amount ? (
                  <span> · {localize(ingredient.amount, isChinese)}</span>
                ) : null}
              </p>
            ))}
          </div>
          {allergens.length > 0 ? (
            <p className="recipe-allergens">
              {t("Contains", "含")} {allergenList(allergens, isChinese).join(isChinese ? "、" : " and ")}
            </p>
          ) : null}
        </section>

        <section className="recipe-card recipe-steps-card">
          <h2>{t("Let’s cook", "开始烹饪")}</h2>
          <ol>
            {steps.map((step, index) => (
              <li key={step.en}>
                <span aria-hidden="true">{index + 1}</span>
                <p>{isChinese ? step.zh : step.en}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {swapSheetOpen ? (
        <SwapSheet
          blockedAllergens={blockedAllergens}
          currentCalories={calories ?? 0}
          direction={sheetDirection}
          onApply={applySwap}
          onClose={() => setSwapSheetOpen(false)}
          onDirectionChange={(next) => {
            setSheetDirection(next);
            setPreviewSwapId(null);
          }}
          onPreview={setPreviewSwapId}
          options={sheetOptions}
          previewSwap={previewSwap}
          replacedIngredient={replacedIngredient ?? null}
        />
      ) : null}
    </main>
  );
}

function SwapSheet({
  direction,
  options,
  previewSwap,
  blockedAllergens,
  replacedIngredient,
  currentCalories,
  onDirectionChange,
  onPreview,
  onApply,
  onClose,
}: {
  direction: SwapDirection;
  options: RecipeSwapOption[];
  previewSwap: RecipeSwapOption | null;
  blockedAllergens: string[];
  replacedIngredient: RecipeDetail["ingredients"][number] | null;
  currentCalories: number;
  onDirectionChange: (direction: SwapDirection) => void;
  onPreview: (id: string) => void;
  onApply: () => void;
  onClose: () => void;
}) {
  const { isChinese, t } = useI18n();
  const blockedLabel = allergenList(blockedAllergens, isChinese).join(
    isChinese ? "、" : " & ",
  );
  const blockedTitle = blockedLabel
    ? blockedLabel.charAt(0).toUpperCase() + blockedLabel.slice(1)
    : blockedLabel;
  const otherDirection = direction === "lower" ? "Higher" : "Lower";
  const filtered = blockedAllergens.length > 0;

  return (
    <Sheet
      className="recipe-swap-sheet"
      closeLabel={t("Close", "关闭")}
      description={
        replacedIngredient
          ? t("Replace", "替换") +
            " " +
            localize(replacedIngredient.name, isChinese).toLowerCase() +
            " · " +
            (replacedIngredient.amount
              ? localize(replacedIngredient.amount, isChinese)
              : "")
          : t("Choose a replacement ingredient", "选择替换食材")
      }
      footer={
        <>
          <button
            className="ui-sheet__primary"
            disabled={!previewSwap}
            onClick={onApply}
            type="button"
          >
            {t("Apply swap", "应用替换")}
          </button>
          <button
            className="ui-sheet__secondary recipe-swap-cancel"
            onClick={onClose}
            type="button"
          >
            {t("Cancel", "取消")}
          </button>
        </>
      }
      onClose={onClose}
      title={t("Swap an ingredient", "替换食材")}
    >
      <div className="recipe-swap-sheet__body">
        <div className="recipe-direction-tabs recipe-direction-tabs--sheet" role="group" aria-label={t("Swap direction", "替换方向")}>
          {(["lower", "higher"] as const).map((value) => (
            <button
              aria-pressed={direction === value}
              className={direction === value ? "is-selected" : ""}
              key={value}
              onClick={() => onDirectionChange(value)}
              type="button"
            >
              {value === "lower"
                ? t("Lower calories", "更低热量")
                : t("Higher calories", "更高热量")}
            </button>
          ))}
        </div>

        <p className="recipe-swap-filter">
          {filtered
            ? t(
                `Dietary filter: ${blockedLabel} allergy`,
                `饮食筛除：${blockedLabel}过敏`,
              )
            : t("Checked against your dietary preferences", "已按你的饮食偏好筛选")}
        </p>

        {options.length > 0 ? (
          <div className="recipe-swap-options" role="radiogroup" aria-label={t("Replacement options", "替换选项")}>
            {options.map((option) => {
              const selected = previewSwap?.id === option.id;
              return (
                <button
                  aria-checked={selected}
                  className={selected ? "recipe-swap-option is-selected" : "recipe-swap-option"}
                  key={option.id}
                  onClick={() => onPreview(option.id)}
                  role="radio"
                  type="button"
                >
                  <span aria-hidden="true" className="recipe-swap-radio">
                    {selected ? "●" : "○"}
                  </span>
                  <span className="recipe-swap-option__copy">
                    <strong>{localize(option.replacement.name, isChinese)}</strong>
                    <small>{localize(option.optionAmount, isChinese)}</small>
                    <b className="recipe-swap-option__numbers">
                      {signedCalories(option.caloriesDelta)} {t("kcal", "千卡")}
                      <em>
                        {option.resultingCalories} {t("kcal / meal", "千卡 / 餐")}
                      </em>
                    </b>
                    <small>
                      {t("Replaces", "替换")}{" "}
                      {replacedIngredient
                        ? localize(replacedIngredient.name, isChinese).toLowerCase()
                        : ""}
                      {replacedIngredient?.amount
                        ? " · " + localize(replacedIngredient.amount, isChinese)
                        : ""}
                    </small>
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="recipe-no-swaps">
            <h3>
              {t(
                "No suitable swaps for your dietary preferences.",
                "没有符合你饮食偏好的替换项。",
              )}
            </h3>
            <p>
              {filtered
                ? t(
                    `${blockedTitle}-based swaps are hidden. Try the ${otherDirection} calories direction.`,
                    `已隐藏含${blockedLabel}的替换项。可以试试${otherDirection === "Lower" ? "更低" : "更高"}热量方向。`,
                  )
                : t(
                    "Try another direction or recipe.",
                    "请尝试其他方向或菜谱。",
                  )}
            </p>
          </div>
        )}

        <div className="recipe-swap-summary">
          <span>
            {previewSwap
              ? t("Preview only · not applied", "仅预览 · 尚未应用")
              : t("Current meal · no changes yet", "当前餐食 · 尚未更改")}
          </span>
          <strong>
            {previewSwap
              ? `${currentCalories} → ${previewSwap.resultingCalories} ${t("kcal per serving", "千卡 / 份")}`
              : `${currentCalories} ${t("kcal per serving", "千卡 / 份")}`}
          </strong>
        </div>
      </div>
    </Sheet>
  );
}
