# Figma Prototype Specification

**Language: [中文](figma-spec.md) | English**

## Goal

Use a clickable mobile web prototype to validate the core task flows, proactive-suggestion approach and user control. The prototype also demonstrates F02 dish search, the Me settings hub and a global large-text mode. It does not need to implement the underlying third-party capabilities.

## Current baseline (2026-11-25)

- Visual source of truth: Figma NutriPal – Healthy Eating App (Copy), file key QHOOV8NcB4Ev499ycoRtZq.
- Eight screens: F01–F06, F03b and Me; every screen has a default and large-text variant, giving 16 frames at 390 × 844.
- Design archive: [2026-11-25 archive](../../design/exports/2026-11-25-nutripal-v2/README.en.md).
- Implementation: NutriPal v1.1; the presentation layer is redesigned while data and /api/v1 contracts remain compatible.
- Figma is the visual source of truth; implementation is not a pixel copy.

## Confirmed implementation interpretations

- **Use Figma icons as supplied**: F01 cuisine tiles use Figma emoji; F02–F06/F03b use SVG assets exported from Figma (public/figma-icons) for food, notification, setting and status icons. No substitute assets are invented.
- **No device chrome**: no Figma 9:41 status bar, signal/battery chrome or 44px phone frame. The web prototype uses a content column of at most 390px.
- **Fixed mobile zoom**: pinch zoom is disabled by requirement (viewport, touch-action and iOS gesture events); single-finger scrolling and input focus remain. Every input uses at least 16px type to prevent iOS focus zoom.
- **Responsive layout**: mobile stays single-column; from 600px the app uses a fluid width, from 640px Me becomes two columns, from 900px Home becomes two columns, and the bottom navigation stays centered instead of stretching.
- **Large text**: the Me toggle applies globally and persists; every explicit font size receives a 2px text boost, inherited text grows with it, and pages scroll instead of reproducing fixed-frame clipping.
- **Me retains v1.0 information**: language, today’s targets, preference summary, nudge preview, Nudges entry and privacy note remain in addition to the Figma rows.
- **Custom avoidances**: the F01 + Add action opens a local sheet for any ingredient or allergen; no backend field is added.

## Current delivery requirements

### Required

- Unified visual tokens, components and bottom navigation.
- Clickable flows for core tasks, with buttons connected to real screens or documented sheets/demo states.
- F02 search backed by a Supabase-compatible mock with 91 web/prototype recipes, including English, Chinese, multi-word, closest-match and suggestion states.
- F01 custom avoidance, saving and edit-mode return to Me.
- Me large-text toggle, language switch, preference and notification entries.
- Accept, postpone, dismiss and explanation controls for proactive suggestions.
- Clear separation between Mock capabilities and real API dependencies.

### Not required

- Real GPS, weather, recipe, notification or camera permissions.
- Real image recognition, backend, accounts or store release.
- Figma status bar or device frame; emoji glyphs may vary slightly by platform font.

## Screen plan

| Frame | Screen | Purpose | Current implementation |
| --- | --- | --- | --- |
| F01 | Dietary & Cultural Preferences | Cuisine, diet style, allergen/avoidance and custom add | Implemented, including edit mode |
| F02 | Personalised Meal Recommendations | Nutrition summary, search, recommendations and See all | Implemented with a 91-recipe mock database |
| F03 | Practical Meal Planning | Weekly plan, budget, cook time, pantry and shopping entry | Implemented with day/swap/edit/regenerate |
| F03b | Shopping List | Items, budget, pantry, check-off and share | Implemented, with delivery demo |
| F04 | Context-Aware Proactive Assistance | Lock-screen suggestion and context explanation | Implemented with gradient and all actions |
| F05 | Notification Control & Explanation | Master toggle, snooze, frequency, categories, explanation and feedback | Implemented |
| F06 | AI Food Recognition & Calorie Estimation | Simulated recognition, portion, nutrition and log | Implemented with Mock recognition |
| Me | Profile & Settings | Profile, preferences, notifications, language and large text | Implemented while retaining v1.0 content |

## Pre-delivery checklist

- [x] All eight screens have routes and reachable entry points.
- [x] Both default and large-text states work.
- [x] Key buttons lead to real screens, sheets or documented demo states.
- [x] Mock data and real capabilities are clearly distinguished.
- [x] F01 emoji and F02–F06/F03b SVG icons match Figma; no simulated device chrome.
- [ ] Complete a team click-through review.
- [ ] Test with at least one target user and record issues.

