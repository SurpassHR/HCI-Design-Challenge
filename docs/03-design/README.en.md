# Design and Prototyping

**Language: [中文](README.md) | English**

## Current stage

The 2026-11-25 eight-screen Figma design is archived (16 frames including default and large text), and the React prototype including the F07a–l recipe-detail and ingredient-swap flow is complete. The new visual system uses vector icons, semantic type tokens and global large text; Me retains v1.0 language, goals, preference summary and nudge entry. Team walkthrough and user testing remain.

## Recorded constraints

- The third meeting selected the existing UI/UX and app interaction approach; remaining interaction ambiguities still need resolution.
- Several page concepts should be prepared first, then the team selects one shared framework before parallel development to prevent visual inconsistencies.
- The Figma prototype must support clickable navigation between screens.
- The first prototype round does not need to implement real data import, photo recognition, or other underlying capabilities.
- Feasible external API dependencies must be listed and explained in advance.
- The first round should focus only on the most important core features; additional capabilities can be added after the second research round.

## Deliverables

- [Design decision log](design-decisions.en.md)
- [Figma prototype specification](figma-spec.en.md)
- [System design](../04-engineering/system-design.en.md)
- [Module design](../04-engineering/module-design.en.md)
- [Figma prototype fidelity audit](figma-implementation-audit.en.md)
- Design link and version: [`../../design/figma/README.en.md`](../../design/figma/README.en.md)
- Exports and review screenshots: [`../../design/exports/README.en.md`](../../design/exports/README.en.md)

## Pre-review and pre-delivery checklist

- [x] The third meeting confirms the existing UI/UX and app interaction approach.
- [x] Review and close the remaining interaction ambiguities.
- [ ] User research and competitor analysis identify the core user problem.
- [x] The first-round core features and page list are selected.
- [ ] The API dependencies and mock data needed by each page are identified.
- [x] Shared components, typography, colour, spacing, and naming conventions are unified.
