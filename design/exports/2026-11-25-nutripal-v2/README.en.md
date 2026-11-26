# NutriPal Figma Design Archive v2 (2026-11-25)

**Language: [中文](README.md) | English**

![NutriPal v2 default-size overview](screens-gallery.png)

Implementation comparison: [default](implementation/screens-gallery.png) · [large text](implementation/screens-gallery-large-text.png)

## Source

- Figma: <https://www.figma.com/design/QHOOV8NcB4Ev499ycoRtZq/>
- File: `NutriPal – Healthy Eating App (Copy)`
- File key: `QHOOV8NcB4Ev499ycoRtZq`
- Page: `App Screens` (`0:1`)
- Archived: 2026-11-25
- Artboards: iPhone 390 × 844; F02 is 390 × 936
- Screens: 8 screens × default/large text = 16 frames

## Differences from the 2026-11-24 archive

- Adds a `Me · Profile & Settings` screen and a dedicated Me tab.
- Adds a large-text variant for every screen; type is generally about 2px larger and pages may scroll.
- Adds dish search, Try chips and search-state variables to F02.
- Updates the F03/F03b budget, pantry, meal and shopping fixtures.
- Introduces the new colour tokens, radii, cards and tab-bar styling.
- F01 cuisine icons use the exact Figma emoji (🥟 🍛 🍝 🍣 🌮 🥙 🥧 🍜); no self-drawn SVG substitutes are used.

## Files

| File | Purpose |
| --- | --- |
| `screens/*.png` | Sixteen 390 × 844 Figma screen captures |
| `screens-gallery.png` | Default-size eight-screen overview |
| `screens-gallery-large-text.png` | Large-text eight-screen overview |
| `components-gallery.png` | Figma components area |
| `frames.json` | Frame IDs, names, variants and screenshot names |
| `design-tokens.json` | Colour and search variables plus component index |
| `checksums.sha256` | SHA-256 for archived images and metadata |
| `implementation/` | Implemented v1.1 comparison captures (filled during implementation) |

### Implementation comparison

- `implementation/screens-gallery.png`: v1.1 default-size overview.
- `implementation/screens-gallery-large-text.png`: v1.1 large-text overview.
- `implementation/comparison-gallery.png`: Figma on the left and v1.1 implementation on the right for every screen.
- `implementation/F02-search-gallery.png`: mock recipe results, detail sheet and no-match suggestions.
- Implementation captures omit the Figma status bar/phone frame; Me is longer than the design.

## Screen index

| Frame | Screen | Default capture | Large-text capture |
| --- | --- | --- | --- |
| 3:6 | F01 Dietary & Cultural Preferences | `F01-preferences.png` | `F01-preferences-large-text.png` |
| 3:87 | F02 Personalised Meal Recommendations | `F02-recommendations.png` | `F02-recommendations-large-text.png` |
| 4:62 | F03 Practical Meal Planning | `F03-meal-plan.png` | `F03-meal-plan-large-text.png` |
| 4:193 | F04 Context-Aware Proactive Assistance | `F04-proactive-assistance.png` | `F04-proactive-assistance-large-text.png` |
| 5:112 | F05 Notification Control & Explanation | `F05-nudge-settings.png` | `F05-nudge-settings-large-text.png` |
| 5:226 | F06 AI Food Recognition & Calorie Estimation | `F06-food-recognition.png` | `F06-food-recognition-large-text.png` |
| 26:209 | F03b Shopping List | `F03b-shopping-list.png` | `F03b-shopping-list-large-text.png` |
| 2014:269 | Me Profile & Settings | `ME-profile-settings.png` | `ME-profile-settings-large-text.png` |

## Design tokens

Colours: `bg #FFF7EC`, `surface #FFFFFF`, `ink #1E1A3C`, `muted #6E6A8A`, `line #EEE6DA`, `purple #7B5CFF`, `orange #FF8A3D`, `pink #FF5C8A`, `green #22C27A`, `yellow #FFC83D`, `blue #38B6FF`.

Components: Button/Primary, Checklist Item, Chip, Cuisine Tile, Me / Accessibility Toggle Row, Me / Settings Row, Segmented Control, Status Bar, Tab Bar, Toggle.

## Implementation conventions

- Figma is the visual source of truth; this directory is frozen evidence and is not edited during implementation.
- The implementation omits the Figma 9:41 status bar, signal/battery chrome and 44px phone frame. These are presentation chrome, not product UI.
- Large text is implemented through global type tokens and scrolling rather than reproducing clipping in fixed 844px captures.
- The Me screen retains v1.0 language, goals, preference summary, nudge preview and privacy content in addition to the Figma rows.

## Verification

| Check | Result |
| --- | --- |
| 8 screens × default/large text = 16 frames | Passed |
| Every capture is 390 wide; F02 is 936 high and the rest are 844 high | Passed |
| Component and token index | Passed |
| Source hashes | Passed; see `checksums.sha256` |
| Pixel-identical to Figma | Not applicable: this folder holds Figma captures; implementation captures live under `implementation/` |

