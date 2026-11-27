# NutriPal ATDD Prototype Scaffold

**Language: [中文](atdd.md) | English**

> - Status: Automated acceptance passing; the F07a–F07l recipe-detail and swap flow is implemented
> - Date: 2026-11-27
> - Stack: React 19 + Vite 8 + TypeScript 5.9 + Vitest + Testing Library

See the [Figma prototype fidelity audit](../03-design/figma-implementation-audit.en.md).

## 1. Current acceptance scope

| ID | User behaviour | Acceptance condition |
| --- | --- | --- |
| AC-01 | New user visits /home | Redirect to F01; no status bar; + Add opens and adds a custom avoidance |
| AC-02 | User selects preferences and Continue | Preferences persist locally, F02 opens and navigation appears |
| AC-03 | User searches in F02 | 91 bilingual recipes; chi, Chinese titles and single characters are searchable; tou, toufu and diacritic-free queries return close matches; chi returns only Chicken/Chilli title matches; results follow the UI language |
| AC-04 | User enters F03/F03b | New week strip, constraints, pantry and meals; F03b has four items and budget |
| AC-05 | User checks an F03b item | Feta starts checked; clicking Chicken thighs marks it checked |
| AC-06 | User enters F04 | Gradient lock screen, notification and suggestion; no tab bar; all four actions available |
| AC-07 | User enters F05 | Master toggle, snooze, frequency, categories, explanation and feedback |
| AC-08 | User enters F06 | Recognition, portion, macros, Log to Dinner and return Home |
| AC-09 | User enters Me | New setting rows, language, goals, preference summary, nudge preview, privacy and large-text switch |
| AC-10 | User enables Large text | Root data-text-size=large, persisted, all nine routes accessible |
| AC-11 | User switches language | English/Chinese changes and survives refresh |
| AC-12 | Figma icons | F01 uses exact emoji; F02–F07/F03b use Figma-exported SVGs |
| AC-13 | User clicks an F02 curated card | Opens the matching full-screen F07 recipe detail with ingredients and simple steps; fluid at 530px and capped at 760px at 926px; secondary cards and search results open it too |
| AC-14 | User drags or double-clicks UI text | Body copy, buttons and labels produce no selection; search inputs, textareas and editable regions still allow text selection |
| AC-15 | Mock recipes and CSS regression | English/Chinese/multi-word search passes; every explicit font size follows the large-text boost |
| AC-16 | User adjusts Mapo Tofu | Covers F07a–F07l: Lower/Higher browse and preview, Apply/Undo, Dismiss, no-goal and Egg-allergy filtering; swaps stay page-local |

Acceptance file: [app.acceptance.test.tsx](../../src/acceptance/app.acceptance.test.tsx).

## 2. RED → GREEN record (v1.1)

1. Large text failed without DisplayPreferencesProvider; added domain types, repository and provider.
2. F02 search failed without a search field; upgraded to a 91-recipe Supabase-compatible mock with results, details and no-match suggestions.
3. F01 custom avoidance failed because + Add had no destination; added the sheet and save path.
4. F03/F03b new fixtures and Share action passed after updating data and CTA behaviour.
5. Me retention passed after restoring language, goals, preference summary, nudge preview and privacy.
6. F01 emoji and F02–F07/F03b SVGs follow Figma exactly; the old no-emoji rule is withdrawn.

## 3. Implemented

- React/Vite/TypeScript project, lockfile and Node requirement.
- Routing, onboarding guard, shared app shell and bottom navigation.
- v1.1 token layer, shared UI components and page styles.
- F01 persistence, custom avoidances and edit return.
- F02 nutrition summary, 91-recipe mock search, Try chips, recommendations and See all.
- F07a–F07l full recipe detail, detailed ingredients, cooking steps, calorie directions, swap preview/apply/undo, dismissed hints and allergen filtering.
- F03 date, budget, pantry, swap, regenerate and shopping entry.
- F03b items, budget, pantry, check-off, share and delivery demo.
- F04/F05/F06 proactive suggestion, controls, explanation and scan calculations.
- Me with complete v1.0 content plus the new Accessibility large-text setting.
- PWA manifest, icons, Apple touch icon and offline shell.

## 4. Verification commands

npm test
npm run lint
npm run build

## 5. ATDD loop

1. Add one user behaviour under src/acceptance.
2. Run it and confirm the expected failure.
3. Add the minimum implementation.
4. Run all tests, lint and build.
5. Compare at 390 × 844 with the 2026-11-25 archive and record intentional deviations.

## 6. Execution baseline

- Visuals and copy: [2026-11-25 Figma archive](../../design/exports/2026-11-25-nutripal-v2/README.en.md).
- Icons: F01 uses Figma emoji; F02–F07/F03b use Figma-exported SVGs (public/figma-icons) without self-drawn substitutes.
- Device chrome: no status bar, signal/battery or phone frame.
- Backend: local Mock and reserved Repository/API contracts only.
- Permissions and privacy: no real camera, location or notification permissions.
- PWA: manifest, theme colours and offline shell; production deployment remains with the project owner.

## 7. Remaining manual work

- Team click-through and target-user prototype testing.
- Real third-party credentials and authorisation.
- Real-device font rendering checks beyond system emoji.

