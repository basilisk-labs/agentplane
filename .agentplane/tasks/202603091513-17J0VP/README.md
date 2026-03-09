---
id: "202603091513-17J0VP"
title: "Refine docs shell and preview homepage UX with liquid-glass navbar"
status: "DOING"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: tighten docs-shell spacing, replace navbar chrome with a restrained LiquidGlass wrapper, update active nav states to rounded pills, and rebuild /home-preview against the newer brief while keeping / as the placeholder."
events:
  -
    type: "status"
    at: "2026-03-09T15:13:48.500Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: tighten docs-shell spacing, replace navbar chrome with a restrained LiquidGlass wrapper, update active nav states to rounded pills, and rebuild /home-preview against the newer brief while keeping / as the placeholder."
doc_version: 3
doc_updated_at: "2026-03-09T15:36:44.551Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: the proposed @specy/liquid-glass-react package is Three.js-backed and too heavy for a narrow navbar polish pass.
  Impact: it would widen scope, add runtime complexity, and increase the risk of drift in the docs shell.
  Resolution: use a CSS-only translucent navbar with stronger blur, lower opacity, and a restrained chromatic-refraction highlight instead.
