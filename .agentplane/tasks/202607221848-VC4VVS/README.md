---
id: "202607221848-VC4VVS"
title: "Unify brief, next-action, runner, and Hermes on AgentWorkOrder v2"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on:
  - "202607221848-T9B3PS"
  - "202607221848-VBV9B1"
tags:
  - "hermes"
  - "milestone-alpha2"
  - "refactor"
  - "rf-05"
  - "rf-25"
  - "runner"
  - "v0.7"
  - "wave-contracts"
  - "work-order"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run guards:check"
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-26T08:57:43.713Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-26T12:07:59.217Z"
  updated_by: "CODER"
  note: "Rework at cd59e4d7 adds the approved AgentWorkOrder v2 production paths and passes declared checks."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-26T12:14:45.368Z"
  updated_by: "EVALUATOR"
  note: "Rework required: production Hermes supervise prepares a remote work order while brief, next-action, and runner prepare local work orders, violating the required shared remote policy."
  evaluated_sha: "cd59e4d7b8536ff89ee2f442037fe3b008633cde"
  blueprint_digest: "50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b"
  evidence_refs:
    - ".agentplane/tasks/202607221848-VC4VVS/README.md"
    - ".agentplane/tasks/202607221848-VC4VVS/quality/20260726-121445368-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221848-VC4VVS/quality/20260726-121445368-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221848-VC4VVS/quality/20260726-121445368-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221848-VC4VVS/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/hermes/hermes.command.ts:126-132"
    - "packages/agentplane/src/commands/task/brief.command.ts:39-43"
    - "packages/agentplane/src/commands/task/next-action.command.ts:50-54"
    - "packages/agentplane/src/runner/usecases/task-run.ts:157-169"
    - "packages/agentplane/src/runner/usecases/agent-work-order-projection.ts:115-134"
    - "bunx vitest run packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts (3 passed; equality fixture uses routePacket includeRemote=false at lines 163-169)"
  findings:
    - "Hermes supervise hard-codes includeRemote=true; brief and next-action default --remote=false and runner hard-codes include_remote=false. Preparation serializes that choice into remote_policy, so the surfaces cannot share the required canonical signature."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-26T10:53:22.520Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-07-26T10:57:41.946Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework required: the current branch contains only task/blueprint/PR artifacts and no implementation paths for the approved AgentWorkOrder v2 scope."
  -
    type: "verify"
    at: "2026-07-26T12:07:59.217Z"
    author: "CODER"
    state: "ok"
    note: "Rework at cd59e4d7 adds the approved AgentWorkOrder v2 production paths and passes declared checks."
doc_version: 3
doc_updated_at: "2026-07-26T12:07:59.914Z"
doc_updated_by: "CODER"
description: "RF-05b/RF-25c: make task brief, next-action, runner bootstrap, and Hermes projections views of one prepared AgentWorkOrder v2 result instead of independent route/context reconstruction."
sections:
  Summary: |-
    Unify brief, next-action, runner, and Hermes on AgentWorkOrder v2

    RF-05b/RF-25c: make task brief, next-action, runner bootstrap, and Hermes projections views of one prepared AgentWorkOrder v2 result instead of independent route/context reconstruction.
  Scope: |-
    - In scope: one in-process work-order builder, typed use-case result, human/JSON compatibility renderers, shared remote policy, prompt compilation, source/test context manifests, and deletion of unsafe casts and duplicate snake/camel aliases from the v2 surface.
    - Out of scope: removing the announced v1 compatibility output during its support window.
  Plan: |-
    1. Build AgentWorkOrder once from task, route, policy, Git, knowledge, prompt, and verification inputs.
    2. Return a typed use-case result independent of stdout.
    3. Render brief, next-action, runner, and Hermes compatibility views from that result.
    4. Use the real prompt-module compiler and fail preparation on error diagnostics.
    5. Remove duplicated reconstruction and add cross-surface equality/freshness fixtures.
  Verify Steps: |-
    1. Prepare one task through brief, next-action, runner, and Hermes paths. Expected: all views share one work-order id, fingerprint, remote policy, route step, source manifest, and verification intent.
    2. Change task/Git/policy state after preparation. Expected: every invocation path rejects the same stale work order.
    3. Introduce a prompt compiler error. Expected: all launch surfaces stop before agent execution.
    4. Compare v1 compatibility and v2 JSON snapshots. Expected: v1 remains explicit and v2 has one casing without duplicate aliases.
    5. Run focused route/brief/runner/Hermes tests, lifecycle invariants, guards, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-26T10:57:41.946Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework required: the current branch contains only task/blueprint/PR artifacts and no implementation paths for the approved AgentWorkOrder v2 scope.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T10:53:22.520Z, excerpt_hash=sha256:d2f6c6f20f6879962cc44710c469d54d50ecf5b8cd8c7fb3dae9389597c7fc90

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-VC4VVS-unify-brief-next-action-runner-and-hermes-on-age/.agentplane/tasks/202607221848-VC4VVS/blueprint/resolved-snapshot.json
    - old_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
    - current_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221848-VC4VVS

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221848-VC4VVS
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-26T12:07:59.217Z — VERIFY — ok

    By: CODER

    Note: Rework at cd59e4d7 adds the approved AgentWorkOrder v2 production paths and passes declared checks.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T10:57:42.605Z, excerpt_hash=sha256:d2f6c6f20f6879962cc44710c469d54d50ecf5b8cd8c7fb3dae9389597c7fc90

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-VC4VVS-unify-brief-next-action-runner-and-hermes-on-age/.agentplane/tasks/202607221848-VC4VVS/blueprint/resolved-snapshot.json
    - old_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
    - current_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221848-VC4VVS

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
  Rollback Plan: |-
    - Revert the task implementation commit(s) while preserving unrelated task and migration state.
    - Restore the previous compatibility view or persisted contract version.
    - Re-run focused contract, migration, and type checks.
  Findings: |-
    - Observation: Compared with main, changed paths are limited to .agentplane/tasks/202607221848-VC4VVS artifacts.
      Impact: The declared behavioral Verify Steps cannot be satisfied without a source implementation.
      Resolution: Return the task to CODER for the approved implementation, then run the declared focused and contract checks.

    - Observation: Clean task worktree at cd59e4d7; guards:check, lifecycle:invariants, test:critical (11 files/72 tests), typecheck, and agent-work-order.integration.test.ts (3 tests) passed.
      Impact: The initial needs_rework finding is resolved: the branch now contains source implementation plus cross-surface integration coverage.
      Resolution: Record CODER verification and return route to TESTER; no PR or provider action performed.
extensions:
  workflow_route_baseline:
    start_head_sha: "4da09cdaca713eb3be1576f00a4f57e72b1353db"
    version: 1
id_source: "generated"
---
## Summary

Unify brief, next-action, runner, and Hermes on AgentWorkOrder v2

RF-05b/RF-25c: make task brief, next-action, runner bootstrap, and Hermes projections views of one prepared AgentWorkOrder v2 result instead of independent route/context reconstruction.

## Scope

- In scope: one in-process work-order builder, typed use-case result, human/JSON compatibility renderers, shared remote policy, prompt compilation, source/test context manifests, and deletion of unsafe casts and duplicate snake/camel aliases from the v2 surface.
- Out of scope: removing the announced v1 compatibility output during its support window.

## Plan

1. Build AgentWorkOrder once from task, route, policy, Git, knowledge, prompt, and verification inputs.
2. Return a typed use-case result independent of stdout.
3. Render brief, next-action, runner, and Hermes compatibility views from that result.
4. Use the real prompt-module compiler and fail preparation on error diagnostics.
5. Remove duplicated reconstruction and add cross-surface equality/freshness fixtures.

## Verify Steps

1. Prepare one task through brief, next-action, runner, and Hermes paths. Expected: all views share one work-order id, fingerprint, remote policy, route step, source manifest, and verification intent.
2. Change task/Git/policy state after preparation. Expected: every invocation path rejects the same stale work order.
3. Introduce a prompt compiler error. Expected: all launch surfaces stop before agent execution.
4. Compare v1 compatibility and v2 JSON snapshots. Expected: v1 remains explicit and v2 has one casing without duplicate aliases.
5. Run focused route/brief/runner/Hermes tests, lifecycle invariants, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-26T10:57:41.946Z — VERIFY — needs_rework

By: TESTER

Note: Rework required: the current branch contains only task/blueprint/PR artifacts and no implementation paths for the approved AgentWorkOrder v2 scope.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T10:53:22.520Z, excerpt_hash=sha256:d2f6c6f20f6879962cc44710c469d54d50ecf5b8cd8c7fb3dae9389597c7fc90

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-VC4VVS-unify-brief-next-action-runner-and-hermes-on-age/.agentplane/tasks/202607221848-VC4VVS/blueprint/resolved-snapshot.json
- old_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
- current_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221848-VC4VVS

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221848-VC4VVS
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-26T12:07:59.217Z — VERIFY — ok

By: CODER

Note: Rework at cd59e4d7 adds the approved AgentWorkOrder v2 production paths and passes declared checks.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T10:57:42.605Z, excerpt_hash=sha256:d2f6c6f20f6879962cc44710c469d54d50ecf5b8cd8c7fb3dae9389597c7fc90

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-VC4VVS-unify-brief-next-action-runner-and-hermes-on-age/.agentplane/tasks/202607221848-VC4VVS/blueprint/resolved-snapshot.json
- old_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
- current_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221848-VC4VVS

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

- Revert the task implementation commit(s) while preserving unrelated task and migration state.
- Restore the previous compatibility view or persisted contract version.
- Re-run focused contract, migration, and type checks.

## Findings

- Observation: Compared with main, changed paths are limited to .agentplane/tasks/202607221848-VC4VVS artifacts.
  Impact: The declared behavioral Verify Steps cannot be satisfied without a source implementation.
  Resolution: Return the task to CODER for the approved implementation, then run the declared focused and contract checks.

- Observation: Clean task worktree at cd59e4d7; guards:check, lifecycle:invariants, test:critical (11 files/72 tests), typecheck, and agent-work-order.integration.test.ts (3 tests) passed.
  Impact: The initial needs_rework finding is resolved: the branch now contains source implementation plus cross-surface integration coverage.
  Resolution: Record CODER verification and return route to TESTER; no PR or provider action performed.
