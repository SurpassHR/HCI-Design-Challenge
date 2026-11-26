import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { AppRouter } from "../app/AppRouter";
import {
  DISPLAY_PREFERENCES_STORAGE_KEY,
} from "../data/display-preference-repository";
import { PROFILE_STORAGE_KEY } from "../data/profile-repository";

function renderApp(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AppRouter />
    </MemoryRouter>,
  );
}

function seedOnboardedProfile() {
  const now = new Date().toISOString();
  localStorage.setItem(
    PROFILE_STORAGE_KEY,
    JSON.stringify({
      profileId: "test-profile",
      displayName: "Alex",
      onboardingCompleted: true,
      createdAt: now,
      preferences: {
        cuisines: ["Chinese", "Indian", "Mediterr."],
        dietStyles: ["Halal", "High-protein"],
        avoidAllergens: ["Nuts", "Shellfish"],
        updatedAt: now,
      },
      healthTargets: {
        dailyCalories: 1900,
        proteinTargetG: 110,
        weeklyBudget: 35,
        maxCookMinutes: 30,
      },
    }),
  );
}

describe("ATDD NutriPal v1.1 acceptance", () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.textSize;
  });

  it("renders F01 without simulated device chrome and adds a custom avoidance", async () => {
    const user = userEvent.setup();
    renderApp("/home");

    expect(
      await screen.findByRole("heading", { name: /what do you love to eat/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText("9:41")).not.toBeInTheDocument();
    expect(screen.getByText("2 / 4")).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Cuisines" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Diet style" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Avoid & allergies" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mediterr." })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "High-protein" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Shellfish" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("group", { name: "Language" }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(
      screen.getByRole("dialog", { name: /add an avoidance/i }),
    ).toBeInTheDocument();
    await user.type(
      screen.getByRole("textbox", { name: /ingredient or allergen/i }),
      "Pork",
    );
    await user.click(
      within(screen.getByRole("dialog")).getByRole("button", { name: "Add" }),
    );

    expect(screen.getByRole("button", { name: "Pork" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("persists preferences and restores the F02 home design", async () => {
    const user = userEvent.setup();
    renderApp("/preferences");

    await user.click(screen.getByRole("button", { name: "Chinese" }));
    await user.click(screen.getByRole("button", { name: "Halal" }));
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(
      await screen.findByRole("heading", { name: /what.s on your plate today/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("1,240")).toBeInTheDocument();
    expect(screen.getByText("Mapo Tofu & Brown Rice")).toBeInTheDocument();
    expect(screen.getByText("Halloumi Quinoa Bowl")).toBeInTheDocument();
    expect(screen.getByText("Miso Salmon Rice")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: /primary navigation/i }),
    ).toBeInTheDocument();

    const stored = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) ?? "{}");
    expect(stored.onboardingCompleted).toBe(true);
    expect(stored.preferences.cuisines).toContain("Chinese");
    expect(stored.preferences.dietStyles).toContain("Halal");
  });

  it("searches the mock Supabase recipe database with multiple queries", async () => {
    const user = userEvent.setup();
    seedOnboardedProfile();
    renderApp("/home");

    const search = await screen.findByRole("searchbox", { name: /search dishes/i });
    await user.type(search, "tofu");

    expect(
      await screen.findByText("Ma Po Tofu"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /search results/i }),
    ).toBeInTheDocument();

    await user.clear(search);
    await user.type(search, "pasta");
    expect(
      await screen.findByText("Fettuccine Alfredo"),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /fettuccine alfredo/i }),
    );
    expect(
      screen.getByRole("dialog", { name: /fettuccine alfredo/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /view source/i }),
    ).toHaveAttribute("href", expect.stringContaining("themealdb.com"));
    await user.keyboard("{Escape}");

    await user.clear(search);
    await user.type(search, "nothing-matches");
    expect(
      await screen.findByText(/no exact match for/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /suggested recipes/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /clear search/i }));
    await user.click(screen.getByRole("button", { name: "Sushi" }));
    expect(
      await screen.findByText("Sushi", { selector: ".recipe-result__copy strong" }),
    ).toBeInTheDocument();
  });

  it("renders the F03 plan and opens the F03b shopping list", async () => {
    const user = userEvent.setup();
    seedOnboardedProfile();
    renderApp("/plan");

    expect(
      await screen.findByRole("heading", { name: /my meal plan/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Spinach & Feta Omelette")).toBeInTheDocument();
    expect(screen.getByText("Chicken Rice Bowl")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /swap meal/i })).toHaveLength(3);
    expect(screen.getByRole("button", { name: "Chicken" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await user.click(screen.getByRole("link", { name: /shopping list/i }));
    expect(
      await screen.findByRole("heading", { name: /shopping list/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("£12.40")).toBeInTheDocument();
    expect(screen.getByText("Chicken thighs")).toBeInTheDocument();
    expect(screen.getByText("Brown rice")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /share list/i })).toBeInTheDocument();
  });

  it("supports the F03b item check-off interaction", async () => {
    const user = userEvent.setup();
    seedOnboardedProfile();
    renderApp("/plan/shopping-list");

    const feta = await screen.findByRole("button", { name: /feta cheese/i });
    expect(feta).toHaveClass("done");

    const chicken = screen.getByRole("button", { name: /chicken thighs/i });
    await user.click(chicken);

    expect(chicken).toHaveClass("done");
    expect(within(chicken).getByText("✓")).toBeInTheDocument();
  });

  it("renders the F04 proactive suggestion without the tab bar", async () => {
    seedOnboardedProfile();
    renderApp("/nudges/preview");

    expect(await screen.findByText("18:42")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /heading home/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Leaving the gym")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cook this/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /other ideas/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /not now/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /why am i seeing this/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("navigation", { name: /primary navigation/i }),
    ).not.toBeInTheDocument();
  });

  it("renders the F05 nudge controls and toggles a category", async () => {
    const user = userEvent.setup();
    seedOnboardedProfile();
    renderApp("/nudges/settings");

    expect(
      await screen.findByRole("heading", { name: /nudge settings/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Balanced" })).toHaveClass("on");
    const hydration = screen.getByRole("button", { name: "Hydration reminders" });
    expect(hydration).toHaveAttribute("aria-pressed", "false");
    await user.click(hydration);
    expect(hydration).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Why you got the last nudge")).toBeInTheDocument();
  });

  it("renders F06, updates the portion and logs the meal", async () => {
    const user = userEvent.setup();
    seedOnboardedProfile();
    renderApp("/scan");

    expect(await screen.findByText("Scan food")).toBeInTheDocument();
    expect(screen.getByText("Beef Noodle Soup")).toBeInTheDocument();
    expect(screen.getByText("92% match")).toBeInTheDocument();
    expect(screen.getByLabelText("Estimated calories")).toHaveTextContent("610");
    expect(screen.getByLabelText("Portion quantity")).toHaveTextContent("1");
    expect(
      screen.queryByRole("navigation", { name: /primary navigation/i }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /increase portion/i }));
    expect(screen.getByLabelText("Estimated calories")).toHaveTextContent("1,220");
    expect(screen.getByText("68 g")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /log to dinner/i }));
    expect(
      await screen.findByRole("heading", { name: /what.s on your plate today/i }),
    ).toBeInTheDocument();
  });

  it("keeps v1.0 Me content and persists the large-text preference", async () => {
    const user = userEvent.setup();
    seedOnboardedProfile();
    const view = renderApp("/me");

    expect(
      await screen.findByRole("heading", { name: /^Me$/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Today’s targets")).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Language" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /preview a nudge/i })).toBeInTheDocument();
    expect(screen.getByText(/private by design/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /dietary & cultural preferences/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /notification settings/i }),
    ).toBeInTheDocument();

    const toggle = screen.getByRole("switch", { name: "Large text" });
    expect(toggle).toHaveAttribute("aria-checked", "false");
    await user.click(toggle);

    await waitFor(() =>
      expect(document.documentElement.dataset.textSize).toBe("large"),
    );
    expect(localStorage.getItem(DISPLAY_PREFERENCES_STORAGE_KEY)).toContain(
      '"large"',
    );

    view.unmount();
    renderApp("/me");
    expect(
      await screen.findByRole("switch", { name: "Large text" }),
    ).toHaveAttribute("aria-checked", "true");
  });

  it("switches between English and Chinese and remembers the choice", async () => {
    const user = userEvent.setup();
    seedOnboardedProfile();
    const firstRender = renderApp("/me");

    expect(
      await screen.findByRole("heading", { name: /^Me/i }),
    ).toBeInTheDocument();

    const languageGroup = screen.getByRole("group", { name: "Language" });
    await user.click(within(languageGroup).getByRole("button", { name: "中文" }));

    expect(screen.getByRole("heading", { name: /^我/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "首页" })).toBeInTheDocument();
    expect(localStorage.getItem("nutripal.v1.language")).toBe("zh");

    firstRender.unmount();
    renderApp("/home");

    expect(await screen.findByText(/晚上好/)).toBeInTheDocument();
  });

  it("uses the exact Figma cuisine emojis", async () => {
    renderApp("/preferences");

    const cuisines = [
      ["Chinese", "🥟"],
      ["Indian", "🍛"],
      ["Italian", "🍝"],
      ["Japanese", "🍣"],
      ["Mexican", "🌮"],
      ["Mediterr.", "🥙"],
      ["British", "🥧"],
      ["Korean", "🍜"],
    ] as const;

    for (const [name, emoji] of cuisines) {
      const tile = await screen.findByRole("button", { name });
      expect(within(tile).getByText(emoji)).toBeInTheDocument();
    }
  });
});
