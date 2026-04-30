---
id: "202604301955-D7JQB7"
title: "Align docs hierarchy with current agent-first IA"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "cleanup"
  - "docs"
  - "ia"
verify:
  - "bun run docs:cli:check"
  - "bun run docs:recipes:check"
  - "bun run docs:site:typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-30T19:56:44.594Z"
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
    author: "DOCS"
    body: "Start: aligning the current docs navigation and developer IA with the existing agent-first model in a dedicated branch_pr worktree, using live docs/sidebar/code-path evidence before editing."
events:
  -
    type: "status"
    at: "2026-04-30T20:04:57.266Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: aligning the current docs navigation and developer IA with the existing agent-first model in a dedicated branch_pr worktree, using live docs/sidebar/code-path evidence before editing."
doc_version: 3
doc_updated_at: "2026-04-30T20:04:57.266Z"
doc_updated_by: "DOCS"
description: "Restructure the public docs navigation around the existing agent-first model, separate current developer pages from historical/archive material, fix stale current-code references, and reconcile docs/index.mdx with website/sidebars.ts."
sections:
  Summary: |-
    Align docs hierarchy with current agent-first IA
    
    Restructure the public docs navigation around the existing agent-first model, separate current developer pages from historical/archive material, fix stale current-code references, and reconcile docs/index.mdx with website/sidebars.ts.
  Scope: |-
    - In scope: Restructure the public docs navigation around the existing agent-first model, separate current developer pages from historical/archive material, fix stale current-code references, and reconcile docs/index.mdx with website/sidebars.ts.
    - Out of scope: unrelated refactors not required for "Align docs hierarchy with current agent-first IA".
  Plan: "1. Reconcile docs/index.mdx with website/sidebars.ts so the public navigation and landing map describe one agent-first hierarchy. 2. Move historical/current-misplaced developer pages out of the active guide or label them as archive/history. 3. Fix current docs references to removed repository paths and the harness-engineering route typo. 4. Verify docs generated references and site typecheck remain green."
  Verify Steps: |-
    1. Review the requested outcome for "Align docs hierarchy with current agent-first IA". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Align docs hierarchy with current agent-first IA

Restructure the public docs navigation around the existing agent-first model, separate current developer pages from historical/archive material, fix stale current-code references, and reconcile docs/index.mdx with website/sidebars.ts.

## Scope

- In scope: Restructure the public docs navigation around the existing agent-first model, separate current developer pages from historical/archive material, fix stale current-code references, and reconcile docs/index.mdx with website/sidebars.ts.
- Out of scope: unrelated refactors not required for "Align docs hierarchy with current agent-first IA".

## Plan

1. Reconcile docs/index.mdx with website/sidebars.ts so the public navigation and landing map describe one agent-first hierarchy. 2. Move historical/current-misplaced developer pages out of the active guide or label them as archive/history. 3. Fix current docs references to removed repository paths and the harness-engineering route typo. 4. Verify docs generated references and site typecheck remain green.

## Verify Steps

1. Review the requested outcome for "Align docs hierarchy with current agent-first IA". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
