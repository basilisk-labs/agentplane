---
id: "202607252051-RK9N29"
title: "Make branch_pr route resolution branch-snapshot aware"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
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
  state: "ok"
  updated_at: "2026-07-25T21:26:11.564Z"
  updated_by: "TESTER"
  note: "Focused route, PR-flow, resume, task-backend, and artifact tests passed; typecheck, lint, guards, lifecycle, routing, architecture, formatting, and diff checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-25T21:27:40.785Z"
  updated_by: "EVALUATOR"
  note: "The branch-pr control plane now consistently treats the resolved task branch snapshot as authoritative for task state and PR metadata, while direct mode retains base-local reads."
  evaluated_sha: "4af6f2d47700f7bc5814ad74492a39c6baa638b1"
  blueprint_digest: "6766cd7e139b108d2cee7e6bc3f99d6fa1d0894f3f49f4d36a05ee42a516af23"
  evidence_refs:
    - ".agentplane/tasks/202607252051-RK9N29/README.md"
    - ".agentplane/tasks/202607252051-RK9N29/quality/20260725-212740785-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607252051-RK9N29/quality/20260725-212740785-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607252051-RK9N29/quality/20260725-212740785-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607252051-RK9N29/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/pr/internal/pr-paths.ts"
    - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
    - "packages/agentplane/src/cli/run-cli.core.route-decision.pre-merge.test.ts"
    - "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
    - "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
  findings:
    - "A resolved task branch returns its own PR metadata result, including missing metadata, so a stale base meta.json cannot authorize or distort the route."
commit:
  hash: "4af6f2d47700f7bc5814ad74492a39c6baa638b1"
  message: "🧩 RK9N29 routing: prefer task branch snapshots"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-25T20:53:29.853Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-07-25T21:26:11.564Z"
    author: "TESTER"
    state: "ok"
    note: "Focused route, PR-flow, resume, task-backend, and artifact tests passed; typecheck, lint, guards, lifecycle, routing, architecture, formatting, and diff checks passed."
  -
    type: "status"
    at: "2026-07-25T21:28:01.419Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-25T21:28:01.419Z"
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
    ### 2026-07-25T21:26:11.564Z — VERIFY — ok

    By: TESTER

    Note: Focused route, PR-flow, resume, task-backend, and artifact tests passed; typecheck, lint, guards, lifecycle, routing, architecture, formatting, and diff checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T21:23:00.645Z, excerpt_hash=sha256:460fe3fb6bfdef8df9d4ee393a69eddb1a86b2163f03f06d62c83e5a6e6bee8b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252051-RK9N29-make-branch-pr-route-resolution-branch-snapshot/.agentplane/tasks/202607252051-RK9N29/blueprint/resolved-snapshot.json
    - old_digest: 6766cd7e139b108d2cee7e6bc3f99d6fa1d0894f3f49f4d36a05ee42a516af23
    - current_digest: 6766cd7e139b108d2cee7e6bc3f99d6fa1d0894f3f49f4d36a05ee42a516af23
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607252051-RK9N29

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607252051-RK9N29
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task PR as one unit. This restores prior base-local route reads without altering task data or hosted PR state."
  Findings: |-
    - Observation: The existing stale runner reclaim integration test exits 8 on both the task branch and untouched main worktree.
      Impact: The full task-handoff test file cannot be used as a green gate for this branch-snapshot change; the new resume-context regression passes in isolation.
      Resolution: Recorded as a pre-existing, out-of-scope baseline failure; retain the focused resume regression and route a separate runner-reclaim task before release.

    - Observation: The unrelated stale runner reclaim integration test exits 8 on both the task branch and untouched main.
      Impact: The full task-handoff file remains red despite the new resume regression passing.
      Resolution: Recorded as a task-local baseline finding and routed for a separate runner-reclaim follow-up.
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
### 2026-07-25T21:26:11.564Z — VERIFY — ok

By: TESTER

Note: Focused route, PR-flow, resume, task-backend, and artifact tests passed; typecheck, lint, guards, lifecycle, routing, architecture, formatting, and diff checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T21:23:00.645Z, excerpt_hash=sha256:460fe3fb6bfdef8df9d4ee393a69eddb1a86b2163f03f06d62c83e5a6e6bee8b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252051-RK9N29-make-branch-pr-route-resolution-branch-snapshot/.agentplane/tasks/202607252051-RK9N29/blueprint/resolved-snapshot.json
- old_digest: 6766cd7e139b108d2cee7e6bc3f99d6fa1d0894f3f49f4d36a05ee42a516af23
- current_digest: 6766cd7e139b108d2cee7e6bc3f99d6fa1d0894f3f49f4d36a05ee42a516af23
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607252051-RK9N29

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607252051-RK9N29
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task PR as one unit. This restores prior base-local route reads without altering task data or hosted PR state.

## Findings

- Observation: The existing stale runner reclaim integration test exits 8 on both the task branch and untouched main worktree.
  Impact: The full task-handoff test file cannot be used as a green gate for this branch-snapshot change; the new resume-context regression passes in isolation.
  Resolution: Recorded as a pre-existing, out-of-scope baseline failure; retain the focused resume regression and route a separate runner-reclaim task before release.

- Observation: The unrelated stale runner reclaim integration test exits 8 on both the task branch and untouched main.
  Impact: The full task-handoff file remains red despite the new resume regression passing.
  Resolution: Recorded as a task-local baseline finding and routed for a separate runner-reclaim follow-up.
