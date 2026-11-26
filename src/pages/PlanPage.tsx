import { useState } from "react";
import { Link } from "react-router-dom";
import { FigmaIcon } from "../components/FigmaIcon";
import { glyphToFigmaIcon } from "../components/figma-food-icon";
import type { FoodGlyphName } from "../domain/food-glyph";
import { useI18n } from "../i18n/useI18n";

const week = [
  { day: "Mon", zhDay: "周一", date: "23", label: "Monday", zhLabel: "星期一" },
  { day: "Tue", zhDay: "周二", date: "24", label: "Tuesday", zhLabel: "星期二" },
  { day: "Wed", zhDay: "周三", date: "25", label: "Wednesday", zhLabel: "星期三" },
  { day: "Thu", zhDay: "周四", date: "26", label: "Thursday", zhLabel: "星期四" },
  { day: "Fri", zhDay: "周五", date: "27", label: "Friday", zhLabel: "星期五" },
  { day: "Sat", zhDay: "周六", date: "28", label: "Saturday", zhLabel: "星期六" },
  { day: "Sun", zhDay: "周日", date: "29", label: "Sunday", zhLabel: "星期日" },
];

const pantry = [
  { glyph: "egg" as const, label: "Eggs", zh: "鸡蛋", initial: true },
  { glyph: "leaf" as const, label: "Spinach", zh: "菠菜", initial: true },
  { glyph: "rice" as const, label: "Rice", zh: "米饭", initial: true },
  { glyph: "chicken" as const, label: "Chicken", zh: "鸡肉", initial: true },
  { glyph: "tomato" as const, label: "Tomato", zh: "番茄", initial: false },
];

const PANTRY_TOTAL = 6;

interface Meal {
  time: string;
  name: string;
  meta: string;
  glyph: FoodGlyphName;
  tint: string;
}

const tuesdayMeals: Meal[] = [
  {
    time: "Breakfast · 8:00",
    name: "Spinach & Feta Omelette",
    meta: "10 min · £1.10 · 380 kcal",
    glyph: "egg",
    tint: "#f5f1ff",
  },
  {
    time: "Lunch · 12:30",
    name: "Chicken Rice Bowl",
    meta: "20 min · £2.40 · 560 kcal",
    glyph: "chicken",
    tint: "#f2f0f8",
  },
  {
    time: "Dinner · 19:00",
    name: "Tomato Egg Stir-fry",
    meta: "15 min · £1.60 · 490 kcal",
    glyph: "tomato",
    tint: "#fff0eb",
  },
];

const dayMeals: Record<string, Meal[]> = {
  Mon: [
    {
      time: "Breakfast · 8:00",
      name: "Greek Yogurt & Berries",
      meta: "5 min · £1.40 · 310 kcal",
      glyph: "berries",
      tint: "#eef4ff",
    },
    {
      time: "Lunch · 12:30",
      name: "Chicken Couscous Bowl",
      meta: "20 min · £2.80 · 540 kcal",
      glyph: "chicken",
      tint: "#fff3df",
    },
    {
      time: "Dinner · 19:00",
      name: "Golden Lentil Curry",
      meta: "25 min · £1.90 · 470 kcal",
      glyph: "curry",
      tint: "#fff0d8",
    },
  ],
  Tue: tuesdayMeals,
  Wed: [
    {
      time: "Breakfast · 8:00",
      name: "Apple Cinnamon Oats",
      meta: "8 min · £0.90 · 350 kcal",
      glyph: "grain",
      tint: "#fff3df",
    },
    {
      time: "Lunch · 12:30",
      name: "Tuna Jacket Potato",
      meta: "18 min · £2.10 · 510 kcal",
      glyph: "fish",
      tint: "#eef4ff",
    },
    {
      time: "Dinner · 19:00",
      name: "Halloumi Quinoa Bowl",
      meta: "15 min · £2.80 · 450 kcal",
      glyph: "salad",
      tint: "#eaf7ee",
    },
  ],
  Thu: [
    {
      time: "Breakfast · 8:00",
      name: "Soft Scrambled Eggs",
      meta: "10 min · £1.20 · 390 kcal",
      glyph: "egg",
      tint: "#fff3df",
    },
    {
      time: "Lunch · 12:30",
      name: "Miso Salmon Rice",
      meta: "20 min · £4.60 · 580 kcal",
      glyph: "sushi",
      tint: "#eaf7ee",
    },
    {
      time: "Dinner · 19:00",
      name: "Ginger Chicken Stir-fry",
      meta: "18 min · £2.60 · 520 kcal",
      glyph: "chicken",
      tint: "#fff0eb",
    },
  ],
  Fri: [
    {
      time: "Breakfast · 8:00",
      name: "Banana Oat Pancakes",
      meta: "15 min · £1.30 · 420 kcal",
      glyph: "pancake",
      tint: "#fff3df",
    },
    {
      time: "Lunch · 12:30",
      name: "Tomato Lentil Soup",
      meta: "12 min · £1.50 · 360 kcal",
      glyph: "stew",
      tint: "#fff0eb",
    },
    {
      time: "Dinner · 19:00",
      name: "Friday Flatbread Pizza",
      meta: "22 min · £3.20 · 640 kcal",
      glyph: "pizza",
      tint: "#fff0eb",
    },
  ],
  Sat: [
    {
      time: "Breakfast · 9:00",
      name: "Spiced Shakshuka",
      meta: "20 min · £1.80 · 430 kcal",
      glyph: "egg",
      tint: "#fff0eb",
    },
    {
      time: "Lunch · 13:00",
      name: "Crispy Falafel Wrap",
      meta: "15 min · £2.40 · 480 kcal",
      glyph: "wrap",
      tint: "#eaf7ee",
    },
    {
      time: "Dinner · 19:30",
      name: "Creamy Butter Chicken",
      meta: "30 min · £3.90 · 690 kcal",
      glyph: "curry",
      tint: "#fff3df",
    },
  ],
  Sun: [
    {
      time: "Breakfast · 9:00",
      name: "Maple Pecan Porridge",
      meta: "7 min · £1.10 · 380 kcal",
      glyph: "grain",
      tint: "#fff3df",
    },
    {
      time: "Lunch · 13:00",
      name: "Roast Chicken & Greens",
      meta: "30 min · £4.20 · 560 kcal",
      glyph: "chicken",
      tint: "#fff0d8",
    },
    {
      time: "Dinner · 18:30",
      name: "Sunday Veggie Ramen",
      meta: "20 min · £2.20 · 510 kcal",
      glyph: "noodles",
      tint: "#eaf7ee",
    },
  ],
};

const swapAlternatives = [
  "Mushroom Herb Omelette",
  "Lemon Chicken Couscous",
  "Tofu & Pepper Rice",
];

const mealNamesZh: Record<string, string> = {
  "Spinach & Feta Omelette": "菠菜菲达奶酪煎蛋",
  "Chicken Rice Bowl": "鸡肉米饭碗",
  "Tomato Egg Stir-fry": "番茄炒蛋",
  "Greek Yogurt & Berries": "希腊酸奶配莓果",
  "Chicken Couscous Bowl": "鸡肉库斯库斯碗",
  "Golden Lentil Curry": "金黄扁豆咖喱",
  "Apple Cinnamon Oats": "苹果肉桂燕麦",
  "Tuna Jacket Potato": "金枪鱼烤土豆",
  "Halloumi Quinoa Bowl": "哈鲁米藜麦碗",
  "Soft Scrambled Eggs": "嫩炒蛋",
  "Miso Salmon Rice": "味噌三文鱼饭",
  "Ginger Chicken Stir-fry": "姜汁鸡肉炒菜",
  "Banana Oat Pancakes": "香蕉燕麦松饼",
  "Tomato Lentil Soup": "番茄扁豆汤",
  "Friday Flatbread Pizza": "周五薄饼披萨",
  "Spiced Shakshuka": "香料北非蛋",
  "Crispy Falafel Wrap": "香脆鹰嘴豆卷",
  "Creamy Butter Chicken": "奶油黄油鸡",
  "Maple Pecan Porridge": "枫糖碧根果粥",
  "Roast Chicken & Greens": "烤鸡配时蔬",
  "Sunday Veggie Ramen": "周日蔬菜拉面",
  "Mushroom Herb Omelette": "蘑菇香草煎蛋",
  "Lemon Chicken Couscous": "柠檬鸡肉库斯库斯",
  "Tofu & Pepper Rice": "豆腐彩椒饭",
};

function localizeMealName(name: string, isChinese: boolean) {
  return isChinese ? (mealNamesZh[name] ?? name) : name;
}

function localizeMealTime(time: string, isChinese: boolean) {
  if (!isChinese) return time;
  return time
    .replace("Breakfast", "早餐")
    .replace("Lunch", "午餐")
    .replace("Dinner", "晚餐");
}

function localizeMealMeta(meta: string, isChinese: boolean) {
  if (!isChinese) return meta;
  return meta.replace(" min", " 分钟").replace(" kcal", " 千卡");
}

export function PlanPage() {
  const { isChinese, t } = useI18n();
  const [selectedDay, setSelectedDay] = useState("Tue");
  const [selectedPantry, setSelectedPantry] = useState(
    () => new Set(pantry.filter((item) => item.initial).map((item) => item.label)),
  );
  const [editingPantry, setEditingPantry] = useState(false);
  const [swaps, setSwaps] = useState<Record<string, number>>({});
  const [status, setStatus] = useState("");
  const activeDay = week.find((day) => day.day === selectedDay) ?? week[1];
  const activeDayLabel = isChinese ? activeDay.zhLabel : activeDay.label;
  const meals = dayMeals[selectedDay] ?? tuesdayMeals;

  function togglePantry(label: string) {
    setSelectedPantry((current) => {
      const next = new Set(current);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  function swapMeal(index: number) {
    const key = `${selectedDay}-${index}`;
    setSwaps((current) => ({
      ...current,
      [key]: ((current[key] ?? 0) + 1) % 2,
    }));
    setStatus(
      t(
        "Meal swapped for " + activeDayLabel + ". Your budget is still on track.",
        "已更换" + activeDayLabel + "的一道餐食，预算仍在计划内。",
      ),
    );
  }

  function regeneratePlan() {
    setSwaps(
      Object.fromEntries(
        meals.map((_, index) => [`${selectedDay}-${index}`, 1]),
      ),
    );
    setStatus(
      t(
        "Fresh meals generated around your pantry, budget and time.",
        "已根据现有食材、预算和时间生成新餐单。",
      ),
    );
  }

  return (
    <main className="plan-page page">
      <header className="page-title-row">
        <div>
          <p className="kicker">{t("Week of 23 Nov", "11 月 23 日当周")}</p>
          <h1 className="heading-with-icon">
            {t("My Meal Plan", "我的餐单")}
            <FigmaIcon name="calendar" size={26} />
          </h1>
        </div>
        <button className="soft-action" onClick={regeneratePlan} type="button">
          <span aria-hidden="true">↻</span>
          {t("Regenerate", "重新生成")}
        </button>
      </header>

      <div className="week-strip" aria-label={t("Week days", "一周日期")}>
        {week.map(({ day, zhDay, date, label, zhLabel }) => {
          const selected = selectedDay === day;
          const dayLabel = isChinese ? zhLabel : label;
          return (
            <button
              aria-label={dayLabel + " " + date}
              aria-pressed={selected}
              className={selected ? "week-day on" : "week-day"}
              key={day}
              onClick={() => setSelectedDay(day)}
              type="button"
            >
              <span>{isChinese ? zhDay : day}</span>
              <b>{date}</b>
            </button>
          );
        })}
      </div>

      <div className="constraint-grid">
        <div className="constraint constraint--budget">
          <strong>
            <FigmaIcon name="money" size={13} />
            {t("£35/wk", "£35/周")}
          </strong>
          <span>{t("Budget", "每周预算")}</span>
        </div>
        <div className="constraint constraint--time">
          <strong>
            <FigmaIcon name="timer" size={13} />
            {t("≤ 30 min", "≤ 30 分钟")}
          </strong>
          <span>{t("Cook time", "烹饪时间")}</span>
        </div>
        <div className="constraint constraint--pantry">
          <strong>
            <FigmaIcon name="ice" size={16} />
            {PANTRY_TOTAL} {t("items", "项")}
          </strong>
          <span>{t("Pantry", "食材库")}</span>
        </div>
      </div>

      <div className="section-bar section-bar--tight">
        <h2>{t("Using what you have", "用现有食材")}</h2>
        <button
          className="text-link"
          onClick={() => setEditingPantry((current) => !current)}
          type="button"
        >
          {editingPantry ? t("Done", "完成") : t("Edit", "编辑")}
        </button>
      </div>

      <div className="pantry-chips" aria-label={t("Pantry ingredients", "现有食材")}>
        {pantry.map((item) => {
          const selected = selectedPantry.has(item.label);
          return (
            <button
              aria-pressed={selected}
              className={selected ? "pantry-chip on" : "pantry-chip"}
              key={item.label}
              onClick={() => togglePantry(item.label)}
              type="button"
            >
              <FigmaIcon name={glyphToFigmaIcon[item.glyph]} size={14} />
              {isChinese ? item.zh : item.label}
            </button>
          );
        })}
      </div>

      <h2 className="meals-title">
        {t(activeDayLabel + "’s meals", activeDayLabel + "的三餐")}
      </h2>

      <section
        className="meal-list"
        aria-label={t(activeDayLabel + "'s meals", activeDayLabel + "的三餐")}
      >
        {meals.map((meal, index) => {
          const alternative = swapAlternatives[index];
          const displayedName = localizeMealName(
            swaps[`${selectedDay}-${index}`] && alternative
              ? alternative
              : meal.name,
            isChinese,
          );
          return (
            <article className="meal-row" key={`${selectedDay}-${index}`}>
              <div
                aria-hidden="true"
                className="meal-icon"
                style={{ background: meal.tint }}
              >
                <FigmaIcon name={glyphToFigmaIcon[meal.glyph]} size={26} />
              </div>
              <div className="meal-copy">
                <span>{localizeMealTime(meal.time, isChinese)}</span>
                <h3>{displayedName}</h3>
                <small>{localizeMealMeta(meal.meta, isChinese)}</small>
              </div>
              <button
                aria-label={t(
                  "Swap meal " + displayedName,
                  "更换餐食：" + displayedName,
                )}
                className="swap-button"
                onClick={() => swapMeal(index)}
                type="button"
              >
                ⇄
              </button>
            </article>
          );
        })}
      </section>

      <Link className="shopping-cta" to="/plan/shopping-list">
        <span aria-hidden="true" className="shopping-cta-icon">
          <FigmaIcon name="cart" size={22} />
        </span>
        <span>
          <strong>{t("Shopping list", "购物清单")}</strong>
          <small>{t("Only 4 items to buy · £12.40", "只需购买 4 项 · £12.40")}</small>
        </span>
        <b aria-hidden="true">
          <span aria-hidden="true">→</span>
        </b>
      </Link>

      <p aria-live="polite" className="inline-status">
        {status}
      </p>
    </main>
  );
}
