# Design Decision Log

**Language: [中文](design-decisions.md) | English**

## Decision status

| ID | Decision | Status | Notes |
| --- | --- | --- | --- |
| D-01 | App design language | Decided | The third meeting confirmed the existing UI/UX and NutriPal app interaction approach |
| D-02 | Interaction logic | Drafted (design baseline) | Routes, navigation, screen states, and cross-module refresh rules are defined in the module design |
| D-03 | Page framework | Decided | The third meeting confirmed the NutriPal Figma interaction approach; ambiguities will continue to be resolved |
| D-04 | First-round core features | To be researched | To be determined through the questionnaire and verified competitor analysis |
| D-05 | Figma screens and click-through flow | Updated (2026-11-25) | Eight screens × default/large text, 16 frames, are archived; v1.1 implements them |
| D-06 | Trigger timing for proactive suggestions | To be researched | Usefulness, acceptability, and privacy boundaries need validation |
| D-07 | User-control mechanisms | To be researched | At minimum, study accept, postpone, dismiss, and quiet-hours behaviour |
| D-08 | Visual components and design specification | Completed (v1.1) | Uses the 2026-11-25 colour tokens, shared UI primitives and vector icons; Figma emoji are not adopted |
| D-09 | System architecture and API boundary | Drafted (pending review) | [System design](../04-engineering/system-design.en.md) |
| D-10 | Module responsibilities and routing contract | Drafted (pending review) | [Module design](../04-engineering/module-design.en.md) |
| D-11 | First-version mock/real capability boundary | Drafted (pending review) | Recipe, scan, notification, and location capabilities are reserved through adapter interfaces |
| D-12 | Bilingual design documentation | Completed | All 14 design/engineering-document pairs have a Chinese default and an English `.en.md` version |
| D-13 | HCI design-principle mapping | Not started | Post-meeting task: identify which HCI principles apply to research, design, implementation, and iteration |
| D-14 | Figma visual and interaction fidelity | Completed (v1.1) | All eight screens follow the 2026-11-25 nodes; status-bar/phone chrome is excluded and Me retains v1.0 content by decision |
| D-15 | Treatment of emoji in the design source | Decided | Emoji are a Figma design defect; the implementation uses Lucide + FoodGlyph vector icons and no emoji |
| D-16 | Large-text accessibility | Decided | Me provides a global Large text toggle; type grows by about 2px, persists and scrolls |
| D-17 | Me information scope | Decided | Keep the new Figma structure while restoring language, goals, preference summary, nudge preview and privacy content |
| D-18 | Device chrome | Decided | No simulated status bar, signal/battery or phone frame; keep a web content column |

## Decision template

When adding a decision, record:

- Decision date and participants
- Problem being solved
- Alternatives and evidence
- Final choice
- Impact
- Rejected alternatives and why
- Follow-up validation method
