---
id: "202604301955-D7JQB7"
title: "Align docs hierarchy with current agent-first IA"
result_summary: "Merged via PR #634."
status: "DONE"
priority: "high"
owner: "DOCS"
revision: 6
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
  state: "ok"
  updated_at: "2026-04-30T20:27:54.189Z"
  updated_by: "DOCS"
  note: "Verified: docs index/sidebar IA comparison passed; stale current-doc references for harness-engineering, Zod ADR routing, and removed core/context paths were cleared; docs site typecheck/build/design checks passed; docs CLI, recipes, bootstrap, scripts checks passed; policy routing and agentplane doctor passed."
commit:
  hash: "b5daf155b62ade526b1602d816bfafcb1b31c595"
  message: "Merge pull request #634 from basilisk-labs/task/202604301955-D7JQB7/docs-agent-first-ia"
comments:
  -
    author: "DOCS"
    body: "Start: aligning the current docs navigation and developer IA with the existing agent-first model in a dedicated branch_pr worktree, using live docs/sidebar/code-path evidence before editing."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #634 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-30T20:04:57.266Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: aligning the current docs navigation and developer IA with the existing agent-first model in a dedicated branch_pr worktree, using live docs/sidebar/code-path evidence before editing."
  -
    type: "verify"
    at: "2026-04-30T20:27:54.189Z"
    author: "DOCS"
    state: "ok"
    note: "Verified: docs index/sidebar IA comparison passed; stale current-doc references for harness-engineering, Zod ADR routing, and removed core/context paths were cleared; docs site typecheck/build/design checks passed; docs CLI, recipes, bootstrap, scripts checks passed; policy routing and agentplane doctor passed."
  -
    type: "status"
    at: "2026-04-30T20:31:46.355Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #634 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-30T20:31:46.360Z"
doc_updated_by: "INTEGRATOR"
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
    ### 2026-04-30T20:27:54.189Z — VERIFY — ok
    
    By: DOCS
    
    Note: Verified: docs index/sidebar IA comparison passed; stale current-doc references for harness-engineering, Zod ADR routing, and removed core/context paths were cleared; docs site typecheck/build/design checks passed; docs CLI, recipes, bootstrap, scripts checks passed; policy routing and agentplane doctor passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T20:04:57.266Z, excerpt_hash=sha256:ed00d5d2f5b4f790c3fe2bf4e67cc07e2e06da478954560310aa1e7b4cda1841
    
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
### 2026-04-30T20:27:54.189Z — VERIFY — ok

By: DOCS

Note: Verified: docs index/sidebar IA comparison passed; stale current-doc references for harness-engineering, Zod ADR routing, and removed core/context paths were cleared; docs site typecheck/build/design checks passed; docs CLI, recipes, bootstrap, scripts checks passed; policy routing and agentplane doctor passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T20:04:57.266Z, excerpt_hash=sha256:ed00d5d2f5b4f790c3fe2bf4e67cc07e2e06da478954560310aa1e7b4cda1841

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
