import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useProfile } from "../app/profile-context";
import {
  FoodGlyph,
  type FoodGlyphName,
} from "../components/FoodGlyph";
import { Chip } from "../components/ui/Chip";
import { CuisineTile } from "../components/ui/CuisineTile";
import { Sheet } from "../components/ui/Sheet";
import { useI18n } from "../i18n/useI18n";

const cuisines = [
  { value: "Chinese", en: "Chinese", zh: "中式", glyph: "curry" },
  { value: "Indian", en: "Indian", zh: "印度", glyph: "stew" },
  { value: "Italian", en: "Italian", zh: "意式", glyph: "pasta" },
  { value: "Japanese", en: "Japanese", zh: "日式", glyph: "sushi" },
  { value: "Mexican", en: "Mexican", zh: "墨西哥", glyph: "taco" },
  { value: "Mediterr.", en: "Mediterr.", zh: "地中海", glyph: "salad" },
  { value: "British", en: "British", zh: "英式", glyph: "pie" },
  { value: "Korean", en: "Korean", zh: "韩式", glyph: "noodles" },
] satisfies {
  value: string;
  en: string;
  zh: string;
  glyph: FoodGlyphName;
}[];

const dietStyles = [
  { value: "Vegetarian", en: "Vegetarian", zh: "素食" },
  { value: "Vegan", en: "Vegan", zh: "纯素" },
  { value: "Pescatarian", en: "Pescatarian", zh: "鱼素" },
  { value: "Halal", en: "Halal", zh: "清真" },
  { value: "Low-carb", en: "Low-carb", zh: "低碳水" },
  { value: "High-protein", en: "High-protein", zh: "高蛋白" },
];

const allergens = [
  { value: "Nuts", en: "Nuts", zh: "坚果" },
  { value: "Dairy", en: "Dairy", zh: "乳制品" },
  { value: "Gluten", en: "Gluten", zh: "麸质" },
  { value: "Shellfish", en: "Shellfish", zh: "贝类" },
];

const allergenLabels: Record<string, string> = {
  Nuts: "坚果",
  Dairy: "乳制品",
  Gluten: "麸质",
  Shellfish: "贝类",
  Pork: "猪肉",
};

function toggleValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export function PreferencesPage() {
  const { profile, savePreferences } = useProfile();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isChinese, t } = useI18n();
  const isEditing = searchParams.get("mode") === "edit";
  const [selectedCuisines, setSelectedCuisines] = useState(
    profile.preferences.cuisines,
  );
  const [selectedDiets, setSelectedDiets] = useState(
    profile.preferences.dietStyles.filter((item) => item !== "No preference"),
  );
  const [selectedAllergens, setSelectedAllergens] = useState(
    profile.preferences.avoidAllergens.filter(
      (item) => item !== "No preference",
    ),
  );
  const [isAddingAllergen, setIsAddingAllergen] = useState(false);
  const [newAllergen, setNewAllergen] = useState("");
  const customAllergens = selectedAllergens.filter(
    (item) => !allergens.some((allergen) => allergen.value === item),
  );

  function addCustomAllergen() {
    const value = newAllergen.trim();
    if (!value) return;

    setSelectedAllergens((current) =>
      current.some((item) => item.toLowerCase() === value.toLowerCase())
        ? current
        : [...current, value],
    );
    setNewAllergen("");
    setIsAddingAllergen(false);
  }

  function handleSave() {
    savePreferences({
      cuisines: selectedCuisines,
      dietStyles: selectedDiets,
      avoidAllergens: selectedAllergens,
    });
    navigate(isEditing ? "/me" : "/home");
  }

  return (
    <main className="preferences-page">
      <div className="preferences-inner">
        <div className="preferences-top">
          {isEditing ? (
            <button
              aria-label={t("Back to me", "返回“我”页面")}
              className="round-back"
              onClick={() => navigate("/me")}
              type="button"
            >
              <ArrowLeft aria-hidden="true" size={18} />
            </button>
          ) : (
            <div
              aria-label={t("Step 2 of 4", "第 2 步，共 4 步")}
              className="setup-progress"
            >
              <span className="is-done" />
              <span className="is-done" />
              <span />
              <span />
              <em>2 / 4</em>
            </div>
          )}
        </div>

        <header className="preferences-heading">
          {isEditing && (
            <p className="preferences-kicker">{t("Your profile", "你的档案")}</p>
          )}
          <h1>
            {isEditing
              ? t("Your food preferences", "你的饮食偏好")
              : t("What do you love to eat?", "你喜欢吃什么？")}
          </h1>
          <p>
            {t(
              "Pick the cuisines you eat often — we’ll keep your meals familiar and tasty.",
              "选择你常吃的菜系——我们会让餐食既熟悉又合口味。",
            )}
          </p>
        </header>

        <fieldset className="choice-group">
          <legend>{t("Cuisines", "菜系")}</legend>
          <div className="cuisine-grid">
            {cuisines.map((cuisine) => {
              const name = isChinese ? cuisine.zh : cuisine.en;
              const selected = selectedCuisines.includes(cuisine.value);
              return (
                <CuisineTile
                  icon={<FoodGlyph name={cuisine.glyph} size={27} />}
                  key={cuisine.value}
                  label={name}
                  onClick={() =>
                    setSelectedCuisines((current) =>
                      toggleValue(current, cuisine.value),
                    )
                  }
                  selected={selected}
                />
              );
            })}
          </div>
        </fieldset>

        <fieldset className="choice-group">
          <legend>{t("Diet style", "饮食方式")}</legend>
          <div className="choice-chips">
            {dietStyles.map((diet) => {
              const name = isChinese ? diet.zh : diet.en;
              const selected = selectedDiets.includes(diet.value);
              return (
                <Chip
                  key={diet.value}
                  onClick={() =>
                    setSelectedDiets((current) => toggleValue(current, diet.value))
                  }
                  selected={selected}
                >
                  {name}
                </Chip>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="choice-group">
          <legend>{t("Avoid & allergies", "忌口与过敏")}</legend>
          <div className="choice-chips">
            {allergens.map((allergen) => {
              const name = isChinese ? allergen.zh : allergen.en;
              const selected = selectedAllergens.includes(allergen.value);
              return (
                <Chip
                  key={allergen.value}
                  onClick={() =>
                    setSelectedAllergens((current) =>
                      toggleValue(current, allergen.value),
                    )
                  }
                  selected={selected}
                >
                  {name}
                </Chip>
              );
            })}
            {customAllergens.map((allergen) => (
              <Chip
                key={allergen}
                onClick={() =>
                  setSelectedAllergens((current) =>
                    toggleValue(current, allergen),
                  )
                }
                selected
              >
                {isChinese ? (allergenLabels[allergen] ?? allergen) : allergen}
              </Chip>
            ))}
            <button
              className="ui-add-chip"
              onClick={() => setIsAddingAllergen(true)}
              type="button"
            >
              <Plus aria-hidden="true" size={15} />
              {t("Add", "添加")}
            </button>
          </div>
        </fieldset>

        <button
          className="primary-button preferences-save"
          onClick={handleSave}
          type="button"
        >
          <span>{isEditing ? t("Save changes", "保存更改") : t("Continue", "继续")}</span>
          <ArrowRight aria-hidden="true" size={18} />
        </button>
        <p className="preferences-note">
          {t(
            "Saved on this device for the prototype. You can change this any time from Me.",
            "偏好仅保存在此设备。你随时可以在“我”页面修改。",
          )}
        </p>
      </div>

      {isAddingAllergen ? (
        <Sheet
          description={t(
            "Add an ingredient or allergen you want NutriPal to avoid.",
            "添加希望 NutriPal 避开的食材或过敏原。",
          )}
          footer={
            <>
              <button
                className="ui-sheet__secondary"
                onClick={() => {
                  setNewAllergen("");
                  setIsAddingAllergen(false);
                }}
                type="button"
              >
                {t("Cancel", "取消")}
              </button>
              <button
                className="ui-sheet__primary"
                disabled={!newAllergen.trim()}
                onClick={addCustomAllergen}
                type="button"
              >
                {t("Add", "添加")}
              </button>
            </>
          }
          onClose={() => setIsAddingAllergen(false)}
          title={t("Add an avoidance", "添加忌口")}
        >
          <label className="ui-field">
            <span>{t("Ingredient or allergen", "食材或过敏原")}</span>
            <input
              autoFocus
              onChange={(event) => setNewAllergen(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") addCustomAllergen();
              }}
              placeholder={t("For example: Pork", "例如：猪肉")}
              value={newAllergen}
            />
          </label>
        </Sheet>
      ) : null}
    </main>
  );
}
