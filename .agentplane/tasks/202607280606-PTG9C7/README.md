---
id: "202607280606-PTG9C7"
title: "Prevent self-invalidating side-effect authority records"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "authority"
  - "branch-pr"
  - "lifecycle"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
blueprint_request: "code.branch_pr"
verify:
  - "Focused authority lifecycle regression"
  - "bun run typecheck"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T06:15:21.657Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-28T06:19:32.579Z"
  updated_by: "TESTER"
  note: "Focused AgentWorkOrder integration and side-effect authority suites passed: 13 tests. Typecheck and policy routing passed. The base-checkout route for 202607242236-1BFWEY now resolves without a task-revision schema error."
  attempts: 0
commit:
  hash: "1ec387cd29895158d5157c446a3913cc9598e440"
  message: "🚧 PTG9C7 task: align work-order task snapshot"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the self-invalidating authority transition, then implement the smallest fail-closed lifecycle fix with focused regressions."
  -
    author: "CODER"
    body: "Start: implement the branch-snapshot consistency regression and minimal preparation fix."
  -
    author: "CODER"
    body: "Implementation: AgentWorkOrder preparation now uses the branch snapshot selected by branch_pr route resolution; regression covers invocation from base checkout."
events:
  -
    type: "status"
    at: "2026-07-28T06:07:13.202Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the self-invalidating authority transition, then implement the smallest fail-closed lifecycle fix with focused regressions."
  -
    type: "status"
    at: "2026-07-28T06:15:22.225Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: implement the branch-snapshot consistency regression and minimal preparation fix."
  -
    type: "status"
    at: "2026-07-28T06:18:54.021Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: AgentWorkOrder preparation now uses the branch snapshot selected by branch_pr route resolution; regression covers invocation from base checkout."
  -
    type: "verify"
    at: "2026-07-28T06:19:32.579Z"
    author: "TESTER"
    state: "ok"
    note: "Focused AgentWorkOrder integration and side-effect authority suites passed: 13 tests. Typecheck and policy routing passed. The base-checkout route for 202607242236-1BFWEY now resolves without a task-revision schema error."
doc_version: 3
doc_updated_at: "2026-07-28T06:19:33.181Z"
doc_updated_by: "CODER"
description: "Fix the branch_pr lifecycle defect where a task authority grant changes the task revision/state fingerprint and makes the freshly recorded authority invalid before the required pre-merge closure or route refresh can execute. Preserve fail-closed authorization and support the documented grant -> clean commit -> recompute route path without manual GitHub merge."
sections:
  Summary: |-
    Prevent self-invalidating side-effect authority records

    Fix the branch_pr lifecycle defect where a task authority grant changes the task revision/state fingerprint and makes the freshly recorded authority invalid before the required pre-merge closure or route refresh can execute. Preserve fail-closed authorization and support the documented grant -> clean commit -> recompute route path without manual GitHub merge.
  Scope: |-
    - In scope: Fix the branch_pr lifecycle defect where a task authority grant changes the task revision/state fingerprint and makes the freshly recorded authority invalid before the required pre-merge closure or route refresh can execute. Preserve fail-closed authorization and support the documented grant -> clean commit -> recompute route path without manual GitHub merge.
    - Out of scope: unrelated refactors not required for "Prevent self-invalidating side-effect authority records".
  Plan: "Align branch_pr AgentWorkOrder preparation with the same task branch snapshot used by route resolution. Prevent a base-checkout task next-action or task brief from combining a stale local task revision with a newer route fingerprint. Preserve fail-closed side-effect authority semantics; do not weaken authority validation. Add a regression where the task worktree has a newer task revision than main and preparation from main succeeds with matching work-order task and fingerprint revisions."
  Verify Steps: "1. Add a regression for branch_pr: update the task in its task worktree, commit it, then invoke task next-action from main. Expected: the work-order task revision equals state_fingerprint.task_revision and the command returns JSON rather than schema validation error. 2. Run the focused AgentWorkOrder integration test and side-effect authority tests. Expected: both pass, including fail-closed negative authority cases. 3. Run bun run typecheck and node .agentplane/policy/check-routing.mjs. Expected: both pass. 4. Re-run task next-action for supervisor task 202607242236-1BFWEY from its integration/base context. Expected: no AgentWorkOrder task revision mismatch."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-28T06:19:32.579Z — VERIFY — ok

    By: TESTER

    Note: Focused AgentWorkOrder integration and side-effect authority suites passed: 13 tests. Typecheck and policy routing passed. The base-checkout route for 202607242236-1BFWEY now resolves without a task-revision schema error.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T06:18:54.021Z, excerpt_hash=sha256:dbb7d0fbbad8e8c27f4b1a3c936bb899726a436166ddf5c35883d99078c1c092

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607280606-PTG9C7-prevent-self-invalidating-side-effect-authority/.agentplane/tasks/202607280606-PTG9C7/blueprint/resolved-snapshot.json
    - old_digest: 6c3c595869d15122f3c343194be31715fc6f619c829d8d906e248ed80ae88ad4
    - current_digest: 6c3c595869d15122f3c343194be31715fc6f619c829d8d906e248ed80ae88ad4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607280606-PTG9C7

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607280606-PTG9C7
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Before the fix, a branch_pr command from main combined the base task revision with the task-worktree fingerprint and failed AgentWorkOrder validation.
      Impact: The route oracle could not progress a valid task from the base checkout.
      Resolution: AgentWorkOrder preparation now uses the branch snapshot in branch_pr mode; regression covers the mismatched revision path.
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-28T06:18:20.437Z"
        authorityDigest: "sha256:70537b3ef8c0212f0f7f5ef921f22371981508c23fd5b6a6a35db242ab96092d"
        digest: "sha256:a5e0278f5c78582008f90413654f1310ab1946ff1156218e949a3ebf88ea933e"
        operationDigest: "sha256:fca746e05f2bdcf1d5c7f4a343da571be7f1a64a298ea05c0ba68f29f50f62aa"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:21b94b9565a67b32d8fab5cdcc6025ffaa794d007e399b844b36f1fd5c6212da"
    grants:
      -
        actor: "USER"
        digest: "sha256:70537b3ef8c0212f0f7f5ef921f22371981508c23fd5b6a6a35db242ab96092d"
        expiresAt: "2026-07-28T06:33:20.437Z"
        id: "authority-3f9fbb04-bfd7-4936-a548-ee082e185cb1"
        issuedAt: "2026-07-28T06:18:20.437Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:fca746e05f2bdcf1d5c7f4a343da571be7f1a64a298ea05c0ba68f29f50f62aa"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:21b94b9565a67b32d8fab5cdcc6025ffaa794d007e399b844b36f1fd5c6212da"
        stateScopeDigest: "sha256:bfc9073aa48a7486231ea060ca83e4ad134d15c7447f37b94605a14fcafd9230"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "08dd47769434fc336d23a80d2d47f4fb0a265d74"
    version: 1
id_source: "generated"
---
## Summary

Prevent self-invalidating side-effect authority records

Fix the branch_pr lifecycle defect where a task authority grant changes the task revision/state fingerprint and makes the freshly recorded authority invalid before the required pre-merge closure or route refresh can execute. Preserve fail-closed authorization and support the documented grant -> clean commit -> recompute route path without manual GitHub merge.

## Scope

- In scope: Fix the branch_pr lifecycle defect where a task authority grant changes the task revision/state fingerprint and makes the freshly recorded authority invalid before the required pre-merge closure or route refresh can execute. Preserve fail-closed authorization and support the documented grant -> clean commit -> recompute route path without manual GitHub merge.
- Out of scope: unrelated refactors not required for "Prevent self-invalidating side-effect authority records".

## Plan

Align branch_pr AgentWorkOrder preparation with the same task branch snapshot used by route resolution. Prevent a base-checkout task next-action or task brief from combining a stale local task revision with a newer route fingerprint. Preserve fail-closed side-effect authority semantics; do not weaken authority validation. Add a regression where the task worktree has a newer task revision than main and preparation from main succeeds with matching work-order task and fingerprint revisions.

## Verify Steps

1. Add a regression for branch_pr: update the task in its task worktree, commit it, then invoke task next-action from main. Expected: the work-order task revision equals state_fingerprint.task_revision and the command returns JSON rather than schema validation error. 2. Run the focused AgentWorkOrder integration test and side-effect authority tests. Expected: both pass, including fail-closed negative authority cases. 3. Run bun run typecheck and node .agentplane/policy/check-routing.mjs. Expected: both pass. 4. Re-run task next-action for supervisor task 202607242236-1BFWEY from its integration/base context. Expected: no AgentWorkOrder task revision mismatch.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-28T06:19:32.579Z — VERIFY — ok

By: TESTER

Note: Focused AgentWorkOrder integration and side-effect authority suites passed: 13 tests. Typecheck and policy routing passed. The base-checkout route for 202607242236-1BFWEY now resolves without a task-revision schema error.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T06:18:54.021Z, excerpt_hash=sha256:dbb7d0fbbad8e8c27f4b1a3c936bb899726a436166ddf5c35883d99078c1c092

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607280606-PTG9C7-prevent-self-invalidating-side-effect-authority/.agentplane/tasks/202607280606-PTG9C7/blueprint/resolved-snapshot.json
- old_digest: 6c3c595869d15122f3c343194be31715fc6f619c829d8d906e248ed80ae88ad4
- current_digest: 6c3c595869d15122f3c343194be31715fc6f619c829d8d906e248ed80ae88ad4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607280606-PTG9C7

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607280606-PTG9C7
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Before the fix, a branch_pr command from main combined the base task revision with the task-worktree fingerprint and failed AgentWorkOrder validation.
  Impact: The route oracle could not progress a valid task from the base checkout.
  Resolution: AgentWorkOrder preparation now uses the branch snapshot in branch_pr mode; regression covers the mismatched revision path.
