---
id: "202607252223-THDN0G"
title: "Bound branch snapshot probes in task active"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on:
  - "202607252051-RK9N29"
tags:
  - "correctness"
  - "milestone-alpha2"
  - "performance"
  - "routing"
  - "v0.7"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run lifecycle:invariants"
  - "bun test packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-07-25T22:23:48.811Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-25T23:25:51.634Z"
  updated_by: "TESTER"
  note: "Independent verification passed at 6f538546b276d4fa6db3b3d901084cadc0cb3457: 41 focused active/branch-snapshot/runner-claim tests, typecheck, lint:core, lifecycle invariants, routing, diff check, and built task active JSON behavior are green."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-25T23:29:50.919Z"
  updated_by: "EVALUATOR"
  note: "Independent review at 6f538546 confirms the Bun-compatible mock repair preserves the approved bounded-read contract without semantic scope creep."
  evaluated_sha: "6f538546b276d4fa6db3b3d901084cadc0cb3457"
  blueprint_digest: "2f69b6c42284d67d479cd7c7933116259b50e329f6059215f702dcdedbe5e4d3"
  evidence_refs:
    - ".agentplane/tasks/202607252223-THDN0G/README.md"
    - ".agentplane/tasks/202607252223-THDN0G/quality/20260725-232950919-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607252223-THDN0G/quality/20260725-232950919-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607252223-THDN0G/quality/20260725-232950919-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607252223-THDN0G/blueprint/resolved-snapshot.json"
    - ".agentplane/tasks/202607252223-THDN0G/README.md (TESTER verification tied to 6f538546)"
    - "bun test active, branch-snapshot, runner-claim focused files: 29 pass, 0 fail"
    - "bun test packages/agentplane/src/commands/shared/task-backend.test.ts: 12 pass, 0 fail; includes stale-base and origin-only snapshot fallback"
    - "agentplane task active --owner CODER --limit 1 --json: success with filtered_count=38"
    - "git diff main...6f538546 reviewed: scoped task-active, branch inventory, read-only claim, regressions, and alpha.2 fan-in only"
  findings:
    - "CommandContext now owns one shared local-and-origin branch inventory promise; concurrent branch lookups reuse it, while a new command context receives a fresh inventory."
    - "task active uses mapLimit with concurrency 4; the 13-task regression preserves all items and observes a maximum of exactly four concurrent route evaluations."
    - "Read-only active-claim inspection returns null when the protected chain is absent, does not create .git/agentplane, and still rejects unsafe symlinked paths; mutating claim acquisition retains its creator path."
    - "The post-rework source delta changes only two unit-test mock harnesses from unsupported vi.hoisted/module mocks to Bun-compatible spies; assertions for memoization and fan-out remain intact."
commit:
  hash: "6f538546b276d4fa6db3b3d901084cadc0cb3457"
  message: "🧩 THDN0G correctness: make unit mocks Bun-compatible"
comments:
  -
    author: "CODER"
    body: "Start: bound branch snapshot inventory probes in the dedicated task worktree."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-25T22:34:35.389Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: bound branch snapshot inventory probes in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-07-25T23:02:20.383Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Focused verification cannot pass until the new unit test harness is runnable under the repository test runtime."
  -
    type: "verify"
    at: "2026-07-25T23:25:51.634Z"
    author: "TESTER"
    state: "ok"
    note: "Independent verification passed at 6f538546b276d4fa6db3b3d901084cadc0cb3457: 41 focused active/branch-snapshot/runner-claim tests, typecheck, lint:core, lifecycle invariants, routing, diff check, and built task active JSON behavior are green."
  -
    type: "status"
    at: "2026-07-25T23:31:35.558Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-25T23:31:35.559Z"
doc_updated_by: "CODER"
description: "Prevent task active from spawning an unbounded local and remote branch probe per task route. Reuse one command-scoped branch inventory or apply a bounded concurrency strategy while preserving branch snapshot precedence and stale-base recovery."
sections:
  Summary: |-
    Bound branch snapshot probes in task active

    Prevent task active from spawning an unbounded local and remote branch probe per task route. Reuse one command-scoped branch inventory or apply a bounded concurrency strategy while preserving branch snapshot precedence and stale-base recovery.
  Scope: "In scope: task-active route evaluation, shared branch-snapshot inventory helpers, focused regression tests, and the alpha.2 roadmap/fan-in record needed to make this v0.7 regression release-blocking. Preserve branch snapshot source priority and existing task route semantics. Out of scope: changing task lifecycle policy, removing snapshot recovery, or broad task-list redesign."
  Plan: "1. Reproduce task active against the real multi-worktree repository and identify the repeated route-level branch inventory probes that exhaust process descriptors. 2. Introduce a command-scoped memoized branch inventory or bounded probe path so route evaluation cannot launch one local and remote git scan per active task. 3. Preserve live-worktree, local-branch, and origin snapshot precedence plus stale-base routing semantics. 4. Add focused active-list and branch-snapshot regression coverage that asserts bounded inventory calls and correct route output. 5. Add this regression to the alpha.2 gate fan-in and roadmap, then run focused tests, type, lint, lifecycle, policy, and diff checks."
  Verify Steps: "1. Reproduce or model a multi-task branch_pr task active call and prove branch inventory is bounded per command rather than per task. 2. agentplane task active succeeds against the repository with many task branches and preserves route output/freshness. 3. Existing branch-snapshot stale-base and remote-only behavior remains covered. 4. This task is listed in 202607221908-9M2FBQ alpha.2 fan-in and roadmap. 5. Run focused active/branch-snapshot tests, bun run typecheck, bun run lint:core, bun run lifecycle:invariants, node .agentplane/policy/check-routing.mjs, and git diff --check."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-25T23:02:20.383Z — VERIFY — needs_rework

    By: TESTER

    Note: Focused verification cannot pass until the new unit test harness is runnable under the repository test runtime.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T22:34:35.389Z, excerpt_hash=sha256:bf0c1c7986e7a823fdc75c2cbb39ca869d876f41085568bf5a8d1bf711f73f30

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252223-THDN0G-bound-branch-snapshot-probes-in-task-active/.agentplane/tasks/202607252223-THDN0G/blueprint/resolved-snapshot.json
    - old_digest: 2f69b6c42284d67d479cd7c7933116259b50e329f6059215f702dcdedbe5e4d3
    - current_digest: 2f69b6c42284d67d479cd7c7933116259b50e329f6059215f702dcdedbe5e4d3
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607252223-THDN0G

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607252223-THDN0G
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-25T23:25:51.634Z — VERIFY — ok

    By: TESTER

    Note: Independent verification passed at 6f538546b276d4fa6db3b3d901084cadc0cb3457: 41 focused active/branch-snapshot/runner-claim tests, typecheck, lint:core, lifecycle invariants, routing, diff check, and built task active JSON behavior are green.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T23:02:20.989Z, excerpt_hash=sha256:bf0c1c7986e7a823fdc75c2cbb39ca869d876f41085568bf5a8d1bf711f73f30

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252223-THDN0G-bound-branch-snapshot-probes-in-task-active/.agentplane/tasks/202607252223-THDN0G/blueprint/resolved-snapshot.json
    - old_digest: 2f69b6c42284d67d479cd7c7933116259b50e329f6059215f702dcdedbe5e4d3
    - current_digest: 2f69b6c42284d67d479cd7c7933116259b50e329f6059215f702dcdedbe5e4d3
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607252223-THDN0G

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
  Rollback Plan: "Revert the task PR as one unit, including its alpha.2 dependency and roadmap record. This restores prior task-active behavior but reintroduces the observed descriptor-exhaustion risk; no persisted task state is migrated."
  Findings: |-
    - Observation: bun test across active, branch-snapshot, stale-base/remote-only, and runner-claim suites produced 38 pass and 2 failures: both new unit files throw TypeError: vi.hoisted is not a function before their assertions. Live agentplane task active --owner CODER --limit 1 --json succeeded with filtered_count=38.
      Impact: The operational EBADF regression appears resolved, but the required durable proof for command-scoped inventory reuse and bounded route fan-out is not executable, so Verify Steps 1 and 5 are incomplete.
      Resolution: Replace the unsupported vi.hoisted setup in the two new unit tests with the repository-supported Bun test mocking pattern, retain the concurrency and memoization assertions, then rerun the focused suite and remaining stated gates.
extensions:
  workflow_route_baseline:
    start_head_sha: "220c7f110c07a14b2b055003cd338ad4c1c3503e"
    version: 1
id_source: "generated"
---
## Summary

Bound branch snapshot probes in task active

Prevent task active from spawning an unbounded local and remote branch probe per task route. Reuse one command-scoped branch inventory or apply a bounded concurrency strategy while preserving branch snapshot precedence and stale-base recovery.

## Scope

In scope: task-active route evaluation, shared branch-snapshot inventory helpers, focused regression tests, and the alpha.2 roadmap/fan-in record needed to make this v0.7 regression release-blocking. Preserve branch snapshot source priority and existing task route semantics. Out of scope: changing task lifecycle policy, removing snapshot recovery, or broad task-list redesign.

## Plan

1. Reproduce task active against the real multi-worktree repository and identify the repeated route-level branch inventory probes that exhaust process descriptors. 2. Introduce a command-scoped memoized branch inventory or bounded probe path so route evaluation cannot launch one local and remote git scan per active task. 3. Preserve live-worktree, local-branch, and origin snapshot precedence plus stale-base routing semantics. 4. Add focused active-list and branch-snapshot regression coverage that asserts bounded inventory calls and correct route output. 5. Add this regression to the alpha.2 gate fan-in and roadmap, then run focused tests, type, lint, lifecycle, policy, and diff checks.

## Verify Steps

1. Reproduce or model a multi-task branch_pr task active call and prove branch inventory is bounded per command rather than per task. 2. agentplane task active succeeds against the repository with many task branches and preserves route output/freshness. 3. Existing branch-snapshot stale-base and remote-only behavior remains covered. 4. This task is listed in 202607221908-9M2FBQ alpha.2 fan-in and roadmap. 5. Run focused active/branch-snapshot tests, bun run typecheck, bun run lint:core, bun run lifecycle:invariants, node .agentplane/policy/check-routing.mjs, and git diff --check.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-25T23:02:20.383Z — VERIFY — needs_rework

By: TESTER

Note: Focused verification cannot pass until the new unit test harness is runnable under the repository test runtime.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T22:34:35.389Z, excerpt_hash=sha256:bf0c1c7986e7a823fdc75c2cbb39ca869d876f41085568bf5a8d1bf711f73f30

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252223-THDN0G-bound-branch-snapshot-probes-in-task-active/.agentplane/tasks/202607252223-THDN0G/blueprint/resolved-snapshot.json
- old_digest: 2f69b6c42284d67d479cd7c7933116259b50e329f6059215f702dcdedbe5e4d3
- current_digest: 2f69b6c42284d67d479cd7c7933116259b50e329f6059215f702dcdedbe5e4d3
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607252223-THDN0G

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607252223-THDN0G
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-25T23:25:51.634Z — VERIFY — ok

By: TESTER

Note: Independent verification passed at 6f538546b276d4fa6db3b3d901084cadc0cb3457: 41 focused active/branch-snapshot/runner-claim tests, typecheck, lint:core, lifecycle invariants, routing, diff check, and built task active JSON behavior are green.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T23:02:20.989Z, excerpt_hash=sha256:bf0c1c7986e7a823fdc75c2cbb39ca869d876f41085568bf5a8d1bf711f73f30

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252223-THDN0G-bound-branch-snapshot-probes-in-task-active/.agentplane/tasks/202607252223-THDN0G/blueprint/resolved-snapshot.json
- old_digest: 2f69b6c42284d67d479cd7c7933116259b50e329f6059215f702dcdedbe5e4d3
- current_digest: 2f69b6c42284d67d479cd7c7933116259b50e329f6059215f702dcdedbe5e4d3
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607252223-THDN0G

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

Revert the task PR as one unit, including its alpha.2 dependency and roadmap record. This restores prior task-active behavior but reintroduces the observed descriptor-exhaustion risk; no persisted task state is migrated.

## Findings

- Observation: bun test across active, branch-snapshot, stale-base/remote-only, and runner-claim suites produced 38 pass and 2 failures: both new unit files throw TypeError: vi.hoisted is not a function before their assertions. Live agentplane task active --owner CODER --limit 1 --json succeeded with filtered_count=38.
  Impact: The operational EBADF regression appears resolved, but the required durable proof for command-scoped inventory reuse and bounded route fan-out is not executable, so Verify Steps 1 and 5 are incomplete.
  Resolution: Replace the unsupported vi.hoisted setup in the two new unit tests with the repository-supported Bun test mocking pattern, retain the concurrency and memoization assertions, then rerun the focused suite and remaining stated gates.
