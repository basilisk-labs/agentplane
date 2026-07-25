---
id: "202607252051-RK9N29"
title: "Make branch_pr route resolution branch-snapshot aware"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 17
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
  updated_at: "2026-07-25T21:52:06.091Z"
  updated_by: "TESTER"
  note: "CI remediation moves branch-aware metadata-path construction into the PR helper; targeted route and artifact tests, lint, hotspots, typecheck, architecture, guards, lifecycle, policy routing, and critical CLI checks passed."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-25T21:47:49.676Z"
  updated_by: "EVALUATOR"
  note: "Hosted CI found deterministic compliance failures on the current PR head."
  evaluated_sha: "bf6ae520184549e1e43a53005160a7c11873a3d0"
  blueprint_digest: "6766cd7e139b108d2cee7e6bc3f99d6fa1d0894f3f49f4d36a05ee42a516af23"
  evidence_refs:
    - ".agentplane/tasks/202607252051-RK9N29/README.md"
    - ".agentplane/tasks/202607252051-RK9N29/quality/20260725-214749676-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607252051-RK9N29/quality/20260725-214749676-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607252051-RK9N29/quality/20260725-214749676-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607252051-RK9N29/blueprint/resolved-snapshot.json"
    - "https://github.com/basilisk-labs/agentplane/actions/runs/30176058282/job/89724927469"
    - "https://github.com/basilisk-labs/agentplane/actions/runs/30176058282/job/89724927472"
  findings:
    - "The route decision module exceeds the 600-line hotspot limit, and two newly added test declarations violate lint rules."
commit:
  hash: "ec932f0aabd07c0da6b4a88aaa5a406817c925c5"
  message: "🧐 RK9N29 task: record evaluator pass"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
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
  -
    type: "verify"
    at: "2026-07-25T21:33:21.580Z"
    author: "TESTER"
    state: "ok"
    note: "Security rework replaces dynamic remote Git argv with a constant ref root and post-query filtering; route, PR-flow, resume, origin-only, type, lint, guards, lifecycle, routing, architecture, and diff checks passed."
  -
    type: "status"
    at: "2026-07-25T21:37:43.368Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-25T21:52:06.091Z"
    author: "TESTER"
    state: "ok"
    note: "CI remediation moves branch-aware metadata-path construction into the PR helper; targeted route and artifact tests, lint, hotspots, typecheck, architecture, guards, lifecycle, policy routing, and critical CLI checks passed."
doc_version: 3
doc_updated_at: "2026-07-25T21:52:06.923Z"
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

    ### 2026-07-25T21:33:21.580Z — VERIFY — ok

    By: TESTER

    Note: Security rework replaces dynamic remote Git argv with a constant ref root and post-query filtering; route, PR-flow, resume, origin-only, type, lint, guards, lifecycle, routing, architecture, and diff checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T21:28:01.419Z, excerpt_hash=sha256:460fe3fb6bfdef8df9d4ee393a69eddb1a86b2163f03f06d62c83e5a6e6bee8b

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
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-25T21:52:06.091Z — VERIFY — ok

    By: TESTER

    Note: CI remediation moves branch-aware metadata-path construction into the PR helper; targeted route and artifact tests, lint, hotspots, typecheck, architecture, guards, lifecycle, policy routing, and critical CLI checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T21:37:43.368Z, excerpt_hash=sha256:460fe3fb6bfdef8df9d4ee393a69eddb1a86b2163f03f06d62c83e5a6e6bee8b

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
    - diagnostic_command: none
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

    - Observation: GitHub CodeQL flagged dynamic ref arguments in remote task-branch discovery.
      Impact: The PR could not pass its required review gate until the command construction was made constant.
      Resolution: Remote refs are now listed from a constant origin root and filtered in TypeScript; origin-only snapshot coverage remains green.

    - Observation: Hosted CI identified a 607-line route module and two test lint violations on the prior head.
      Impact: The PR could not satisfy required hosted gates.
      Resolution: The route module is back below the threshold without semantic changes, and both test declarations are now type-safe.
extensions:
  implementation_commit:
    hash: "bf6ae520184549e1e43a53005160a7c11873a3d0"
    message: "🧩 RK9N29 correctness: avoid dynamic remote ref argv"
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

### 2026-07-25T21:33:21.580Z — VERIFY — ok

By: TESTER

Note: Security rework replaces dynamic remote Git argv with a constant ref root and post-query filtering; route, PR-flow, resume, origin-only, type, lint, guards, lifecycle, routing, architecture, and diff checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T21:28:01.419Z, excerpt_hash=sha256:460fe3fb6bfdef8df9d4ee393a69eddb1a86b2163f03f06d62c83e5a6e6bee8b

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
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-25T21:52:06.091Z — VERIFY — ok

By: TESTER

Note: CI remediation moves branch-aware metadata-path construction into the PR helper; targeted route and artifact tests, lint, hotspots, typecheck, architecture, guards, lifecycle, policy routing, and critical CLI checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T21:37:43.368Z, excerpt_hash=sha256:460fe3fb6bfdef8df9d4ee393a69eddb1a86b2163f03f06d62c83e5a6e6bee8b

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
- diagnostic_command: none
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

- Observation: GitHub CodeQL flagged dynamic ref arguments in remote task-branch discovery.
  Impact: The PR could not pass its required review gate until the command construction was made constant.
  Resolution: Remote refs are now listed from a constant origin root and filtered in TypeScript; origin-only snapshot coverage remains green.

- Observation: Hosted CI identified a 607-line route module and two test lint violations on the prior head.
  Impact: The PR could not satisfy required hosted gates.
  Resolution: The route module is back below the threshold without semantic changes, and both test declarations are now type-safe.
