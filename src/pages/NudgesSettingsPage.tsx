import { useState } from "react";
import {
  FigmaIcon,
  type FigmaIconName,
} from "../components/FigmaIcon";
import { useI18n } from "../i18n/useI18n";

type Frequency = "Fewer" | "Balanced" | "More";

const frequencies: Frequency[] = ["Fewer", "Balanced", "More"];
const snoozeOptions = ["1 hour", "Today", "1 week"];

const categoryDefaults = [
  {
    label: "Quiet hours",
    zhLabel: "免打扰时间",
    description: "22:00 – 07:30",
    zhDescription: "22:00 – 07:30",
    icon: "moon" as const,
    enabled: true,
  },
  {
    label: "Meal ideas",
    zhLabel: "餐食灵感",
    description: "Suggestions around mealtimes",
    zhDescription: "在用餐时间前后提供建议",
    icon: "meal" as const,
    enabled: true,
  },
  {
    label: "Hydration reminders",
    zhLabel: "饮水提醒",
    description: "Gentle prompts through the day",
    zhDescription: "全天温和提醒补充水分",
    icon: "hydration" as const,
    enabled: false,
  },
  {
    label: "Snack swaps",
    zhLabel: "零食替换",
    description: "Lighter choices when you snack",
    zhDescription: "想吃零食时提供更轻盈的选择",
    icon: "snack" as const,
    enabled: true,
  },
];

export function NudgesSettingsPage() {
  const { isChinese, t } = useI18n();
  const [proactive, setProactive] = useState(true);
  const [frequency, setFrequency] = useState<Frequency>("Balanced");
  const [snooze, setSnooze] = useState<string | null>(null);
  const [categories, setCategories] = useState(categoryDefaults);
  const [feedback, setFeedback] = useState(false);
  const frequencyLabels: Record<Frequency, string> = {
    Fewer: "更少",
    Balanced: "均衡",
    More: "更多",
  };
  const snoozeLabels: Record<string, string> = {
    "1 hour": "1 小时",
    Today: "今天",
    "1 week": "1 周",
  };
  const settingIcons: Record<string, FigmaIconName> = {
    moon: "moon",
    meal: "plate",
    hydration: "droplet",
    snack: "apple",
  };

  function toggleCategory(label: string) {
    setCategories((current) =>
      current.map((category) =>
        category.label === label
          ? { ...category, enabled: !category.enabled }
          : category,
      ),
    );
  }

  return (
    <main className="nudges-page page">
      <header className="nudges-header">
        <h1 className="heading-with-icon">
          {t("Nudge settings", "提醒设置")}
          <FigmaIcon name="bell" size={26} />
        </h1>
        <p>{t("You decide when NutriPal speaks up.", "由你决定 NutriPal 何时提醒你。")}</p>
      </header>

      <section className="settings-card">
        <button
          aria-label={t("Proactive suggestions", "主动建议")}
          aria-pressed={proactive}
          className="setting-row setting-row--master"
          onClick={() => setProactive((current) => !current)}
          type="button"
        >
          <span aria-hidden="true" className="setting-icon">
            <FigmaIcon name="sparkle" size={18} />
          </span>
          <span className="setting-copy">
            <strong>{t("Proactive suggestions", "主动建议")}</strong>
            <small>
              {t(
                "Meal ideas based on time, place & goals",
                "根据时间、地点和目标推荐餐食",
              )}
            </small>
          </span>
          <span aria-hidden="true" className={proactive ? "switch on" : "switch"} />
        </button>

        <div className="snooze-row">
          <span className="snooze-label">
            <FigmaIcon name="pause" size={13} />
            {t("Snooze:", "暂停：")}
          </span>
          <div className="snooze-options">
            {snoozeOptions.map((option) => (
              <button
                aria-pressed={snooze === option}
                className={snooze === option ? "tiny-chip on" : "tiny-chip"}
                key={option}
                onClick={() =>
                  setSnooze((current) => (current === option ? null : option))
                }
                type="button"
              >
                {isChinese ? snoozeLabels[option] : option}
              </button>
            ))}
          </div>
        </div>

        <div
          className="segmented"
          aria-label={t("Nudge frequency", "提醒频率")}
          role="group"
        >
          {frequencies.map((option) => (
            <button
              aria-pressed={frequency === option}
              className={frequency === option ? "on" : ""}
              key={option}
              onClick={() => setFrequency(option)}
              type="button"
            >
              {isChinese ? frequencyLabels[option] : option}
            </button>
          ))}
        </div>
      </section>

      <section className="settings-card settings-card--categories">
        {categories.map((category) => (
          (() => {
            const icon = settingIcons[category.icon];
            return (
          <button
            aria-label={isChinese ? category.zhLabel : category.label}
            aria-pressed={category.enabled}
            className="setting-row"
            key={category.label}
            onClick={() => toggleCategory(category.label)}
            type="button"
          >
            <span aria-hidden="true" className="setting-icon">
              <FigmaIcon name={icon} size={18} />
            </span>
            <span className="setting-copy">
              <strong>{isChinese ? category.zhLabel : category.label}</strong>
              <small>
                {isChinese ? category.zhDescription : category.description}
              </small>
            </span>
            <span
              aria-hidden="true"
              className={category.enabled ? "switch on" : "switch"}
            />
          </button>
            );
          })()
        ))}
      </section>

      <section className="explanation-card" id="why-last">
        <h2>
          <FigmaIcon name="bulb" size={17} />
          <span>{t("Why you got the last nudge", "为什么你会收到上一条提醒")}</span>
        </h2>
        <p>
          <FigmaIcon name="pin" size={15} />
          {t("You were leaving the gym", "你当时正要离开健身房")}
        </p>
        <p>
          <FigmaIcon name="clock" size={15} />
          {t("4 hours since your last meal", "距离上一餐已经 4 小时")}
        </p>
        <p>
          <FigmaIcon name="muscle" size={15} />
          {t("Protein below today’s goal", "今日蛋白质摄入仍低于目标")}
        </p>
        <p>
          <FigmaIcon name="rice" size={15} />
          {t("Rice in your pantry expires soon", "食材库里的米饭即将过期")}
        </p>
        <button
          className="feedback-link"
          onClick={() => setFeedback(true)}
          type="button"
        >
          {feedback
            ? t("Thanks — we’ll use this feedback.", "谢谢，我们会参考你的反馈。")
            : t("Not helpful? Tell us →", "没有帮助？告诉我们 →")}
        </button>
      </section>

      <p aria-live="polite" className="inline-status">
        {snooze
          ? t(
              "Nudges paused for " + snooze.toLowerCase() + ".",
              "提醒已暂停：" + (snoozeLabels[snooze] ?? snooze) + "。",
            )
          : ""}
      </p>
    </main>
  );
}
