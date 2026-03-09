---
id: "202603091642-V6B825"
title: "Redesign preview homepage around video-led editorial layout"
result_summary: "Reworked the preview homepage into a lighter editorial landing with one dominant glass hero, typographic comparison, single repository proof panel, workflow timeline, lighter modes/journal sections, and a restrained CTA without altering the root placeholder page."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T16:43:21.901Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-09T16:50:09.541Z"
  updated_by: "REVIEWER"
  note: "Verified: /home-preview now uses one dominant glass hero over atmospheric media, flat typographic sections, a single repository proof panel, a vertical workflow timeline, lighter modes and journal surfaces, and a single color-accent CTA. bun run docs:site:check, node .agentplane/policy/check-routing.mjs, and agentplane doctor all passed."
commit:
  hash: "fae222e276629da670b62f780a5f0d1bcf0c76ff"
  message: "🎨 V6B825 frontend: redesign home preview around video-led editorial layout"
comments:
  -
    author: "CODER"
    body: "Start: rebuild the preview homepage into a lighter editorial surface with one dominant hero panel, a single repository proof panel, a timeline workflow section, and reduced shadows and card noise."
  -
    author: "CODER"
    body: "Verified: /home-preview now follows the lighter editorial/video-led layout and all required checks passed."
events:
  -
    type: "status"
    at: "2026-03-09T16:43:29.584Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: rebuild the preview homepage into a lighter editorial surface with one dominant hero panel, a single repository proof panel, a timeline workflow section, and reduced shadows and card noise."
  -
    type: "verify"
    at: "2026-03-09T16:50:09.541Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: /home-preview now uses one dominant glass hero over atmospheric media, flat typographic sections, a single repository proof panel, a vertical workflow timeline, lighter modes and journal surfaces, and a single color-accent CTA. bun run docs:site:check, node .agentplane/policy/check-routing.mjs, and agentplane doctor all passed."
  -
    type: "status"
    at: "2026-03-09T16:50:19.858Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: /home-preview now follows the lighter editorial/video-led layout and all required checks passed."
doc_version: 3
doc_updated_at: "2026-03-09T16:50:19.858Z"
doc_updated_by: "CODER"
description: "Rework /home-preview into a lighter editorial landing: one glass hero over video, large typographic problem section, single repository proof panel, workflow timeline, lighter modes/journal sections, and restrained CTA with minimal shadows."
id_source: "generated"
---
## Summary

Redesign preview homepage around video-led editorial layout

Rework /home-preview into a lighter editorial landing: one glass hero over video, large typographic problem section, single repository proof panel, workflow timeline, lighter modes/journal sections, and restrained CTA with minimal shadows.

## Scope

- In scope: Rework /home-preview into a lighter editorial landing: one glass hero over video, large typographic problem section, single repository proof panel, workflow timeline, lighter modes/journal sections, and restrained CTA with minimal shadows.
- Out of scope: unrelated refactors not required for "Redesign preview homepage around video-led editorial layout".

## Plan

1. Simplify the preview page structure around a single glass hero over video, removing secondary hero cards and reducing shadows across sections. 2. Rebuild the middle of the page as large typographic sections: problem framing, one repository proof panel with labels, a vertical workflow timeline, and a lighter modes section. 3. Lighten journal/footer/CTA surfaces so the CTA remains the only strong color accent, then run docs-site and policy checks before closing.

## Verify Steps

1. Open `/home-preview`. Expected: the first screen has one dominant glass hero panel over visible video atmosphere, with no secondary utility-card grid under the terminal.
2. Review the body sections. Expected: problem framing is typographic rather than card-heavy, repository proof appears as one main panel with labels, and workflow is rendered as a vertical timeline instead of step cards.
3. Inspect surface weight. Expected: most section shadows are removed, journal/modes blocks are lighter and flatter, and the final CTA remains the only strongly colorized block.
4. Run `bun run docs:site:check`. Expected: the website typecheck, build, and design checks all pass.
5. Run `node .agentplane/policy/check-routing.mjs` and `agentplane doctor`. Expected: routing is OK and doctor reports `errors=0` and `warnings=0`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T16:50:09.541Z — VERIFY — ok

By: REVIEWER

Note: Verified: /home-preview now uses one dominant glass hero over atmospheric media, flat typographic sections, a single repository proof panel, a vertical workflow timeline, lighter modes and journal surfaces, and a single color-accent CTA. bun run docs:site:check, node .agentplane/policy/check-routing.mjs, and agentplane doctor all passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T16:43:29.584Z, excerpt_hash=sha256:0c045966882c51e1b800fd303d9ec05390b0a2fbee43a3e083b6554a2814ef3d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
