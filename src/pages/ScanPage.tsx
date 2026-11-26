import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";
import { FigmaIcon } from "../components/FigmaIcon";
import { glyphToFigmaIcon } from "../components/figma-food-icon";
import type { FoodGlyphName } from "../domain/food-glyph";
import { useI18n } from "../i18n/useI18n";

const BASE_CALORIES = 610;
const BASE_MACROS = { protein: 34, carbs: 72, fat: 18 };

const ingredients: {
  glyph: FoodGlyphName;
  en: string;
  zh: string;
}[] = [
  { glyph: "noodles", en: "Noodles", zh: "面条" },
  { glyph: "beef", en: "Beef", zh: "牛肉" },
  { glyph: "leaf", en: "Bok choy", zh: "小白菜" },
  { glyph: "onion", en: "Spring onion", zh: "小葱" },
];

export function ScanPage() {
  const navigate = useNavigate();
  const { isChinese, t } = useI18n();
  const [portion, setPortion] = useState(1);
  const calories = new Intl.NumberFormat("en-GB").format(
    BASE_CALORIES * portion,
  );

  function updatePortion(delta: number) {
    setPortion((current) => Math.min(5, Math.max(1, current + delta)));
  }

  return (
    <main className="scan-page">
      <section
        className="scan-camera"
        aria-label={t("Food camera preview", "食物相机预览")}
      >
        <div className="scan-camera-top">
          <button
            aria-label={t("Close food scan", "关闭食物扫描")}
            className="scan-round-button"
            onClick={() => navigate("/home")}
            type="button"
          >
            <X aria-hidden="true" size={17} />
          </button>
          <strong>{t("Scan food", "扫描食物")}</strong>
          <button
            aria-label={t("Toggle flash", "切换闪光灯")}
            className="scan-round-button"
            type="button"
          >
            <FigmaIcon name="bolt" size={17} />
          </button>
        </div>
        <FigmaIcon className="scan-illustration" name="noodles" size={150} />
        <img
          alt=""
          aria-hidden="true"
          className="scan-frame"
          height={219}
          src={import.meta.env.BASE_URL + "figma-icons/scan-frame.svg"}
          width={239}
        />
        <span className="scan-detected">
          <Check aria-hidden="true" size={13} />
          {t("Detected", "已识别")}
        </span>
      </section>

      <section
        className="scan-sheet"
        aria-label={t("Food recognition result", "食物识别结果")}
      >
        <div aria-hidden="true" className="scan-sheet-handle" />
        <header className="scan-result-heading">
          <div>
            <h1>{t("Beef Noodle Soup", "牛肉面")}</h1>
            <button className="scan-edit" type="button">
              <FigmaIcon name="pencil" size={13} />
              {t("Not right? Edit dish", "识别不对？编辑菜品")}
            </button>
          </div>
          <span className="scan-match">{t("92% match", "92% 匹配")}</span>
        </header>

        <div className="scan-calorie-card">
          <div>
            <p className="scan-calories">
              ≈{" "}
              <span aria-label={t("Estimated calories", "估算热量")}>
                {calories}
              </span>{" "}
              <small>{t("kcal", "千卡")}</small>
            </p>
            <p className="scan-estimate">
              {t("Estimated for 1 bowl (≈550 g)", "按 1 碗估算（约 550 克）")}
            </p>
          </div>
          <div className="scan-stepper">
            <button
              aria-label={t("Decrease portion", "减少份量")}
              onClick={() => updatePortion(-1)}
              type="button"
            >
              −
            </button>
            <b aria-label={t("Portion quantity", "份量")}>{portion}</b>
            <button
              aria-label={t("Increase portion", "增加份量")}
              onClick={() => updatePortion(1)}
              type="button"
            >
              +
            </button>
          </div>
        </div>

        <div className="scan-macros">
          <div className="scan-macro">
            <span>{t("Protein", "蛋白质")}</span>
            <i>
              <b style={{ width: "62%", background: "var(--accent)" }} />
            </i>
            <strong>{BASE_MACROS.protein * portion} g</strong>
          </div>
          <div className="scan-macro">
            <span>{t("Carbs", "碳水")}</span>
            <i>
              <b style={{ width: "78%", background: "var(--amber)" }} />
            </i>
            <strong>{BASE_MACROS.carbs * portion} g</strong>
          </div>
          <div className="scan-macro">
            <span>{t("Fat", "脂肪")}</span>
            <i>
              <b style={{ width: "40%", background: "var(--coral)" }} />
            </i>
            <strong>{BASE_MACROS.fat * portion} g</strong>
          </div>
        </div>

        <div className="scan-ingredients">
          <h2>{t("Detected ingredients", "识别到的食材")}</h2>
          <div className="scan-chips">
            {ingredients.map((ingredient) => (
              <span className="scan-chip" key={ingredient.en}>
                <FigmaIcon name={glyphToFigmaIcon[ingredient.glyph]} size={14} />
                {isChinese ? ingredient.zh : ingredient.en}
              </span>
            ))}
          </div>
        </div>

        <button
          aria-label={t(
            "Log to Dinner — add to today's log",
            "记录为晚餐——添加到今日记录",
          )}
          className="scan-log-button"
          onClick={() => navigate("/home")}
          type="button"
        >
          <Check aria-hidden="true" size={17} />
          {t("Log to Dinner", "记录为晚餐")}
        </button>
      </section>
    </main>
  );
}
