# Figma Workspace

**Language: [中文](README.md) | English**

## File index

| Name | Link | Version/date | Status |
| --- | --- | --- | --- |
| NutriPal – Healthy Eating App (Copy) | <https://www.figma.com/design/QHOOV8NcB4Ev499ycoRtZq/> | 2026-11-25 | **Current visual baseline**; archived |
| NutriPal – Healthy Eating App | <https://www.figma.com/design/FzzqscVPbxGe2X56MfWBEW/NutriPal-%E2%80%93-Healthy-Eating-App?timeline=keyframe&node-id=0-1&p=f&t=6hx1mpAIOP6H6Jma-0> | 2026-11-24 | Archived; view-only access |

## Current baseline (2026-11-25)

- Figma file key: QHOOV8NcB4Ev499ycoRtZq
- File: NutriPal – Healthy Eating App (Copy)
- Page: App Screens (0:1)
- Artboards: iPhone 390 wide; F02 is 936 high and the rest are 844 high; 8 screens × default/large text = 16 frames
- Screens: F01–F06, F03b and Me; every screen has a large-text variant
- Components and tokens: 10 components, 17 variables, 2 variable collections
- Static copy, previews and acceptance record: [2026-11-25 archive](../exports/2026-11-25-nutripal-v2/README.en.md)
- Implementation conventions: no Figma status bar or phone frame; F01 cuisine emoji are used exactly as supplied, and F02–F06/F03b icons are exported unchanged from Figma SVG nodes into public/figma-icons.
- This file records the design source of truth; the app is a v1.1 React prototype, not a pixel copy of Figma.

## Previous archive (2026-11-24)

- Figma file key: `FzzqscVPbxGe2X56MfWBEW`
- Page: `App Screens`
- Last file modification (Figma page metadata): 2026-11-24 13:16:20 UTC
- Access at archive time: viewable, not editable (`can_edit: false`)
- Frame size: iPhone 390 × 844; seven screens
- Static copy, previews, and acceptance record: [`../exports/2026-11-24-nutripal/`](../exports/2026-11-24-nutripal/README.en.md)
- This folder records a **design archive**, not a backend or shippable app implementation.
- Engineering contracts: [`../../docs/04-engineering/system-design.en.md`](../../docs/04-engineering/system-design.en.md), [`../../docs/04-engineering/module-design.en.md`](../../docs/04-engineering/module-design.en.md).

## Screen inventory

| Frame | Function | Key content |
| --- | --- | --- |
| F01 | Dietary & Cultural Preferences | First-use step 2/4; cuisine, diet style, and allergen/avoidance selection |
| F02 | Personalised Meal Recommendations | Daily calories and macro summary; personalised recipe recommendations |
| F03 | Practical Meal Planning | Weekly meal plan, budget/cooking-time/pantry constraints, shopping-list entry |
| F03b | Shopping List | Budget, purchase items, and pantry items generated from the plan |
| F04 | Context-Aware Proactive Assistance | Lock-screen proactive suggestion; triggers include leaving the gym, meal gap, protein target, and expiring ingredients |
| F05 | Notification Control & Explanation | Proactive toggle, snooze, frequency, quiet hours, and “why this nudge” explanation |
| F06 | AI Food Recognition & Calorie Estimation | Photo recognition, portion adjustment, calorie/macro estimates, and adding to the daily log |
| Me | Profile & Settings | Profile, dietary/notification setting entries and the large-text accessibility toggle |

Large-text variants (F01–F06, F03b, Me) keep the same structure with roughly 2px larger type. Clipping inside the fixed 844px captures is not an implementation requirement.

## Historical Figma comment index (2026-11-24 file)

| Comment | Content |
| --- | --- |
| #1 | Personalised user settings, shown on first launch |
| #2 | Calories for today's food |
| #3 | AI recipe recommendations |
| #4 | AI plans the day's meals |
| #5 | Notifications for proactive intervention |
| #6 | Notification and message-preference settings |
| #7 | Calorie calculator via photo + AI image recognition |
| #8 | Ingredient recommendations based on configured recipes and proactive notification |

> Comments #2 and #7 each have one reply. The reply body was not expanded in the read-only comment list and is not archived.

## Version rules (recommended)

- Establish a baseline after the page framework is finalised.
- Record dates or versions for major structural changes.
- Freeze screenshots for prototype reviews so simultaneous edits do not invalidate comparisons.
- Ensure course reviewers have read-only access.
