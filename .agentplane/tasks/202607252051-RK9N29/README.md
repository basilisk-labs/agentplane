---
id: "202607252051-RK9N29"
title: "Make branch_pr route resolution branch-snapshot aware"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "correctness"
  - "routing"
  - "v0.7"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-25T20:52:41.271Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-25T20:53:29.853Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-25T21:23:00.645Z"
doc_updated_by: "CODER"
description: "Correct branch_pr control-plane truth: routes, flow status, blockers, and resume must prefer the active task branch snapshot (live worktree, local branch, then origin) for task README and PR metadata, falling back to base only when no branch snapshot exists. Regress stale base TODO versus task-branch DONE/open PR so the CLI selects publication or integration, never a false plan approval. Keep typed route semantics unchanged."
sections:
  Summary: |-
    Make branch_pr route resolution branch-snapshot aware

    Correct branch_pr control-plane truth: routes, flow status, blockers, and resume must prefer the active task branch snapshot (live worktree, local branch, then origin) for task README and PR metadata, falling back to base only when no branch snapshot exists. Regress stale base TODO versus task-branch DONE/open PR so the CLI selects publication or integration, never a false plan approval. Keep typed route semantics unchanged.
  Scope: "In scope: make branch_pr route, PR flow, blocker, and resume reads prefer a verified task-branch snapshot over stale base-local task artifacts; preserve base fallback; add a stale-base versus DONE-branch regression. Out of scope: changing workflow phases, TaskData schema, or provider semantics."
  Plan: "1. Trace existing branch-snapshot readers and identify every route/resume consumer that mixes base task state with branch PR state. 2. Add one branch-first task/PR artifact read path using live worktree, local task branch, then origin, with base-local fallback. 3. Wire route decision, flow status, blockers, and handoff/resume to the same source-of-truth path. 4. Add focused regression fixtures for stale base TODO plus task-branch DONE/open PR and preserve absent-branch fallback. 5. Run route, PR-flow, handoff, type, lint, and lifecycle checks; record any residual source-confidence limit."
  Verify Steps: "1. Focused route regression proves a base checkout with stale TODO/pending README and no local PR meta resolves the DONE task branch snapshot and returns publication or integration, never approve_plan. 2. PR-flow and resume tests prove branch-first metadata selection with base fallback. 3. bun test packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts plus touched PR-flow and handoff tests pass. 4. bun run typecheck, bun run lint:core, bun run guards:check, bun run lifecycle:invariants, and node .agentplane/policy/check-routing.mjs pass."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task PR as one unit. This restores prior base-local route reads without altering task data or hosted PR state."
  Findings: |-
    - Observation: The existing stale runner reclaim integration test exits 8 on both the task branch and untouched main worktree.
      Impact: The full task-handoff test file cannot be used as a green gate for this branch-snapshot change; the new resume-context regression passes in isolation.
      Resolution: Recorded as a pre-existing, out-of-scope baseline failure; retain the focused resume regression and route a separate runner-reclaim task before release.
extensions:
  workflow_route_baseline:
    start_head_sha: "8e37e79ba5f2c934ab7c35a242c181049180e164"
    version: 1
id_source: "generated"
---
## Summary

Make branch_pr route resolution branch-snapshot aware

Correct branch_pr control-plane truth: routes, flow status, blockers, and resume must prefer the active task branch snapshot (live worktree, local branch, then origin) for task README and PR metadata, falling back to base only when no branch snapshot exists. Regress stale base TODO versus task-branch DONE/open PR so the CLI selects publication or integration, never a false plan approval. Keep typed route semantics unchanged.

## Scope

In scope: make branch_pr route, PR flow, blocker, and resume reads prefer a verified task-branch snapshot over stale base-local task artifacts; preserve base fallback; add a stale-base versus DONE-branch regression. Out of scope: changing workflow phases, TaskData schema, or provider semantics.

## Plan

1. Trace existing branch-snapshot readers and identify every route/resume consumer that mixes base task state with branch PR state. 2. Add one branch-first task/PR artifact read path using live worktree, local task branch, then origin, with base-local fallback. 3. Wire route decision, flow status, blockers, and handoff/resume to the same source-of-truth path. 4. Add focused regression fixtures for stale base TODO plus task-branch DONE/open PR and preserve absent-branch fallback. 5. Run route, PR-flow, handoff, type, lint, and lifecycle checks; record any residual source-confidence limit.

## Verify Steps

1. Focused route regression proves a base checkout with stale TODO/pending README and no local PR meta resolves the DONE task branch snapshot and returns publication or integration, never approve_plan. 2. PR-flow and resume tests prove branch-first metadata selection with base fallback. 3. bun test packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts plus touched PR-flow and handoff tests pass. 4. bun run typecheck, bun run lint:core, bun run guards:check, bun run lifecycle:invariants, and node .agentplane/policy/check-routing.mjs pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task PR as one unit. This restores prior base-local route reads without altering task data or hosted PR state.

## Findings

- Observation: The existing stale runner reclaim integration test exits 8 on both the task branch and untouched main worktree.
  Impact: The full task-handoff test file cannot be used as a green gate for this branch-snapshot change; the new resume-context regression passes in isolation.
  Resolution: Recorded as a pre-existing, out-of-scope baseline failure; retain the focused resume regression and route a separate runner-reclaim task before release.
