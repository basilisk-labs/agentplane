---
id: "202603091513-17J0VP"
title: "Refine docs shell and preview homepage UX with liquid-glass navbar"
result_summary: "Navbar chrome is subtler and more refractive, docs content gutters are wider and stay below the navbar, and /home-preview now follows the newer proof-first brief while / remains the placeholder."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T15:13:38.489Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-09T15:39:31.650Z"
  updated_by: "CODER"
  note: "Passed docs:site:check, policy routing, and doctor after replacing the heavy navbar package idea with a CSS-only glass treatment and safe docs theme wrappers."
commit:
  hash: "ac289426200712935662b1fcb7e67cd811ef7a26"
  message: "✨ 17J0VP frontend: refine docs shell and preview homepage"
comments:
  -
    author: "CODER"
    body: "Start: tighten docs-shell spacing, replace navbar chrome with a restrained LiquidGlass wrapper, update active nav states to rounded pills, and rebuild /home-preview against the newer brief while keeping / as the placeholder."
  -
    author: "CODER"
    body: "Verified: docs/site, routing, and doctor passed after the CSS-only navbar polish and preview-homepage/docs-shell refresh."
events:
  -
    type: "status"
    at: "2026-03-09T15:13:48.500Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: tighten docs-shell spacing, replace navbar chrome with a restrained LiquidGlass wrapper, update active nav states to rounded pills, and rebuild /home-preview against the newer brief while keeping / as the placeholder."
  -
    type: "verify"
    at: "2026-03-09T15:39:31.650Z"
    author: "CODER"
    state: "ok"
    note: "Passed docs:site:check, policy routing, and doctor after replacing the heavy navbar package idea with a CSS-only glass treatment and safe docs theme wrappers."
  -
    type: "status"
    at: "2026-03-09T15:39:41.968Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: docs/site, routing, and doctor passed after the CSS-only navbar polish and preview-homepage/docs-shell refresh."
doc_version: 3
doc_updated_at: "2026-03-09T15:39:41.968Z"
doc_updated_by: "CODER"
description: "Tighten docs-shell gutters and sticky offsets, adopt @specy/liquid-glass-react for the navbar chrome, make nav active states rounded-rect pills, and update /home-preview to match the newer implementation brief while keeping / as the placeholder."
id_source: "generated"
---
## Summary

Refine docs shell spacing and preview homepage UX with a CSS-only glass navbar

Tighten docs-shell gutters and sticky offsets, make the navbar more transparent and blurrier with a restrained chromatic-refraction effect, update active nav states to rounded pills, and rebuild /home-preview against the newer implementation brief while keeping / as the placeholder.

## Scope

- In scope: tighten docs-shell gutters and sticky offsets, make the navbar more transparent and blurrier with a restrained chromatic-refraction effect, keep active nav states as rounded rectangular pills, and update /home-preview to match the newer implementation brief while keeping / as the placeholder.
- Out of scope: replacing the root homepage, introducing a heavy runtime navbar dependency, or unrelated frontend refactors outside the docs shell and preview surface.

## Plan

1. Audit the current docs shell, navbar structure, and preview homepage against the brief and identify the minimum insertion points for wider docs gutters, sticky offsets, and safer navbar chrome.
2. Implement the docs-shell and navbar changes: widen docs content gutters, keep the sidebar below the navbar while scrolling, replace the earlier package idea with a lightweight CSS-only glass treatment, and convert active nav states to rounded rectangular pills.
3. Rebuild /home-preview against the newer homepage brief with a stronger section hierarchy, more faithful proof surfaces, and restrained motion while keeping / as the placeholder.
4. Run docs/site, routing, and doctor checks; then record verification and close the task with only the intended frontend scope.

## Verify Steps

1. Run bun run docs:site:check. Expected: the docs site builds successfully and the updated navbar/docs-shell/home-preview styling passes the design checker.
2. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing remains OK after the task lifecycle updates.
3. Run agentplane doctor. Expected: errors=0 and warnings=0 for the current workspace.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T15:39:31.650Z — VERIFY — ok

By: CODER

Note: Passed docs:site:check, policy routing, and doctor after replacing the heavy navbar package idea with a CSS-only glass treatment and safe docs theme wrappers.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T15:36:44.551Z, excerpt_hash=sha256:738b1bf9f4de5ec18fbb7ed12af15462e918bace0d99438f5fe58d8334102364

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: the proposed @specy/liquid-glass-react package is Three.js-backed and too heavy for a narrow navbar polish pass.
  Impact: it would widen scope, add runtime complexity, and increase the risk of drift in the docs shell.
  Resolution: use a CSS-only translucent navbar with stronger blur, lower opacity, and a restrained chromatic-refraction highlight instead.
