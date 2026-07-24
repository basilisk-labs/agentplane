---
id: "202607221846-9XC1H0"
title: "Enforce role-scoped sandboxes and actual write boundaries"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202607221846-Y89CFB"
tags:
  - "milestone-alpha1"
  - "refactor"
  - "rf-03"
  - "runner"
  - "sandbox"
  - "security"
  - "v0.7"
  - "wave-trust"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run guards:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-23T18:44:52.366Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-07-23T18:50:15.804Z"
  updated_by: "TESTER"
  note: "REWORK at 3e79cc151: current diff contains only lifecycle and PR metadata; no RF-03 sandbox or scope implementation exists yet. Return to CODER for the approved implementation and rerun all Verify Steps."
  attempts: 1
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Enforce role-derived sandbox defaults, authority-backed danger mode, and observed write-boundary rejection with adapter downgrade evidence."
events:
  -
    type: "status"
    at: "2026-07-23T18:45:27.018Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Enforce role-derived sandbox defaults, authority-backed danger mode, and observed write-boundary rejection with adapter downgrade evidence."
  -
    type: "verify"
    at: "2026-07-23T18:50:15.804Z"
    author: "TESTER"
    state: "needs_rework"
    note: "REWORK at 3e79cc151: current diff contains only lifecycle and PR metadata; no RF-03 sandbox or scope implementation exists yet. Return to CODER for the approved implementation and rerun all Verify Steps."
doc_version: 3
doc_updated_at: "2026-07-23T18:50:16.084Z"
doc_updated_by: "CODER"
description: "RF-03: default executor/context runs to workspace-write and evaluator runs to read-only, require explicit authority for danger mode, and reject actual out-of-scope or protected-path mutations."
sections:
  Summary: |-
    Enforce role-scoped sandboxes and actual write boundaries

    RF-03: default executor/context runs to workspace-write and evaluator runs to read-only, require explicit authority for danger mode, and reject actual out-of-scope or protected-path mutations.
  Scope: |-
    - In scope: role-derived sandbox policy, authority provenance for danger-full-access, adapter capability downgrade reporting, actual delta-based scope checks, protected paths, unacceptable-run policy, and negative fixtures.
    - Out of scope: promising enforcement an adapter cannot provide; such cases must surface a typed capability downgrade.
  Plan: |-
    1. Define role-to-sandbox defaults and explicit authority records for danger mode.
    2. Pass requested enforcement through adapter capability negotiation and record downgrades.
    3. Validate observed workspace deltas against declared scope and protected paths.
    4. Mark any unauthorized actual mutation unacceptable regardless of manifest claims.
    5. Add executor, context, evaluator, custom-adapter, pre-dirty, hidden-write, and protected-path tests.
  Verify Steps: |-
    1. Prepare executor/context and evaluator runs without sandbox configuration. Expected: workspace-write and read-only respectively, with no implicit danger mode.
    2. Request danger-full-access without authority. Expected: a typed approval/authority failure; with authority, the receipt records its provenance.
    3. Perform an unreported out-of-scope write and a protected-path mutation. Expected: both are observed and make the run unacceptable.
    4. Use an adapter lacking requested enforcement. Expected: a truthful capability downgrade, not a false claim of safety.
    5. Run focused runner policy tests, `bun run guards:check`, `bun run typecheck`, and `bun run ci:contract`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-23T18:50:15.804Z — VERIFY — needs_rework

    By: TESTER

    Note: REWORK at 3e79cc151: current diff contains only lifecycle and PR metadata; no RF-03 sandbox or scope implementation exists yet. Return to CODER for the approved implementation and rerun all Verify Steps.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T18:45:27.018Z, excerpt_hash=sha256:fdd02d6de6b9d9ca7a9e3b4e00efd56e99a70ecc294cc0c2791776222c993eee

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-9XC1H0-enforce-role-scoped-sandboxes-and-actual-write-b/.agentplane/tasks/202607221846-9XC1H0/blueprint/resolved-snapshot.json
    - old_digest: ee4dae58b254cdc1bd7dd5fc50176ad71155d880e51062ed2b75ebefe30cb2ea
    - current_digest: ee4dae58b254cdc1bd7dd5fc50176ad71155d880e51062ed2b75ebefe30cb2ea
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221846-9XC1H0

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221846-9XC1H0
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) without changing unrelated task state.
    - Restore the previous persisted contract or schema version where applicable.
    - Re-run the task-specific checks and record any data requiring explicit migration repair.
  Findings: |-
    - Observation: origin/main...HEAD changes only task-local lifecycle and PR artifacts.
      Impact: Verify Steps 1-5 have no implementation evidence and cannot pass.
      Resolution: Implement RF-03 in the task worktree, add focused negative tests, then hand back to TESTER.
id_source: "generated"
---
## Summary

Enforce role-scoped sandboxes and actual write boundaries

RF-03: default executor/context runs to workspace-write and evaluator runs to read-only, require explicit authority for danger mode, and reject actual out-of-scope or protected-path mutations.

## Scope

- In scope: role-derived sandbox policy, authority provenance for danger-full-access, adapter capability downgrade reporting, actual delta-based scope checks, protected paths, unacceptable-run policy, and negative fixtures.
- Out of scope: promising enforcement an adapter cannot provide; such cases must surface a typed capability downgrade.

## Plan

1. Define role-to-sandbox defaults and explicit authority records for danger mode.
2. Pass requested enforcement through adapter capability negotiation and record downgrades.
3. Validate observed workspace deltas against declared scope and protected paths.
4. Mark any unauthorized actual mutation unacceptable regardless of manifest claims.
5. Add executor, context, evaluator, custom-adapter, pre-dirty, hidden-write, and protected-path tests.

## Verify Steps

1. Prepare executor/context and evaluator runs without sandbox configuration. Expected: workspace-write and read-only respectively, with no implicit danger mode.
2. Request danger-full-access without authority. Expected: a typed approval/authority failure; with authority, the receipt records its provenance.
3. Perform an unreported out-of-scope write and a protected-path mutation. Expected: both are observed and make the run unacceptable.
4. Use an adapter lacking requested enforcement. Expected: a truthful capability downgrade, not a false claim of safety.
5. Run focused runner policy tests, `bun run guards:check`, `bun run typecheck`, and `bun run ci:contract`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-23T18:50:15.804Z — VERIFY — needs_rework

By: TESTER

Note: REWORK at 3e79cc151: current diff contains only lifecycle and PR metadata; no RF-03 sandbox or scope implementation exists yet. Return to CODER for the approved implementation and rerun all Verify Steps.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T18:45:27.018Z, excerpt_hash=sha256:fdd02d6de6b9d9ca7a9e3b4e00efd56e99a70ecc294cc0c2791776222c993eee

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-9XC1H0-enforce-role-scoped-sandboxes-and-actual-write-b/.agentplane/tasks/202607221846-9XC1H0/blueprint/resolved-snapshot.json
- old_digest: ee4dae58b254cdc1bd7dd5fc50176ad71155d880e51062ed2b75ebefe30cb2ea
- current_digest: ee4dae58b254cdc1bd7dd5fc50176ad71155d880e51062ed2b75ebefe30cb2ea
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221846-9XC1H0

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221846-9XC1H0
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) without changing unrelated task state.
- Restore the previous persisted contract or schema version where applicable.
- Re-run the task-specific checks and record any data requiring explicit migration repair.

## Findings

- Observation: origin/main...HEAD changes only task-local lifecycle and PR artifacts.
  Impact: Verify Steps 1-5 have no implementation evidence and cannot pass.
  Resolution: Implement RF-03 in the task worktree, add focused negative tests, then hand back to TESTER.
