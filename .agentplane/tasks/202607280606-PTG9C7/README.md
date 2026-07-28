---
id: "202607280606-PTG9C7"
title: "Prevent self-invalidating side-effect authority records"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 19
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
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-28T06:20:05.095Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 2 typed finding(s)."
  evaluated_sha: "1ec387cd29895158d5157c446a3913cc9598e440"
  blueprint_digest: "6c3c595869d15122f3c343194be31715fc6f619c829d8d906e248ed80ae88ad4"
  evidence_refs:
    - ".agentplane/tasks/202607280606-PTG9C7/quality/20260728-062004792-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607280606-PTG9C7/quality/20260728-062004792-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607280606-PTG9C7/quality/20260728-062004792-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607280606-PTG9C7/quality/20260728-062004792-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607280606-PTG9C7/quality/20260728-062004792-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607280606-PTG9C7/README.md"
    - ".agentplane/tasks/202607280606-PTG9C7/quality/20260728-062004792-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607280606-PTG9C7/quality/20260728-062004792-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607280606-PTG9C7/quality/20260728-062004792-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Route resolution and AgentWorkOrder preparation now share branch snapshot precedence in branch_pr mode, so task.revision and state_fingerprint.task_revision cannot diverge solely by checkout."
    - "The regression advances and commits the task worktree document, invokes task next-action from main, and asserts both revision fields equal the branch snapshot."
commit:
  hash: "0e2bcb59e5931c267bb29ce4d9686b854e5fe724"
  message: "🚧 PTG9C7 task: authorize pre-merge closure"
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
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
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
  -
    type: "status"
    at: "2026-07-28T06:20:45.314Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-28T06:20:45.315Z"
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
      -
        actor: "USER"
        at: "2026-07-28T06:20:24.171Z"
        authorityDigest: "sha256:2c3f2346767928c18e34854c36953856217b7cc1686ec57ed55935d607049bb8"
        digest: "sha256:7559feffa163e6812d8839bbce626b885909f33af73d657b06b8a7b2a5a1ecec"
        operationDigest: "sha256:4c1f59120de2ba60e38597224b676fc5a8739f540160b39ac3488a912074480c"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:a5e0278f5c78582008f90413654f1310ab1946ff1156218e949a3ebf88ea933e"
        schemaVersion: 1
        sequence: 2
        stateFingerprintDigest: "sha256:efd338becc8af6425572abac5c3fd2c89e214786dca8e7745182d9a513c8eaff"
      -
        actor: "USER"
        at: "2026-07-28T06:21:03.377Z"
        authorityDigest: "sha256:1e0d40e027a95d3cea15d7e4a45d4ddc53e2bdce10a314d69fe769d6e7eb501a"
        digest: "sha256:71baf8b21bd1f87529471f93c295ede94f632538acb251fc7f632938c009a141"
        operationDigest: "sha256:748ad576ec679574ddc902170b50dfa956a456268667b50d6f79ebf9ad7c678c"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:7559feffa163e6812d8839bbce626b885909f33af73d657b06b8a7b2a5a1ecec"
        schemaVersion: 1
        sequence: 3
        stateFingerprintDigest: "sha256:ec5a13ae0ba7dd240716563a188de42d3bd0d73a8ea36fdee1d4e25f3494e33b"
      -
        actor: "USER"
        at: "2026-07-28T06:25:04.656Z"
        authorityDigest: "sha256:989dc4dac257a16b3789e848d213c84192fa5b7b94bb5be9c4041df20a0fdfc3"
        digest: "sha256:e2d64f810db430a08f8daa6309e89fdc283d0d577173e2716ae649acd68c055c"
        operationDigest: "sha256:6357c43fdacac354dee0c924d8d64b8038933003fbc7f1c0a985d495d295d798"
        operationId: "integration.enqueue"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:71baf8b21bd1f87529471f93c295ede94f632538acb251fc7f632938c009a141"
        schemaVersion: 1
        sequence: 4
        stateFingerprintDigest: "sha256:5d4484e3df8443741cfb09344a02c4cb624cca22d0f6b1422fbed935ec475baa"
      -
        actor: "USER"
        at: "2026-07-28T06:45:38.438Z"
        authorityDigest: "sha256:48f530435f938f95f0785923b0dda295e31c0d99ac349abbf2ebd391629e6957"
        digest: "sha256:479543c946ee7d07d8c2467165cb6b370ce5d68285b48445253a660863e95c58"
        operationDigest: "sha256:6357c43fdacac354dee0c924d8d64b8038933003fbc7f1c0a985d495d295d798"
        operationId: "integration.enqueue"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:e2d64f810db430a08f8daa6309e89fdc283d0d577173e2716ae649acd68c055c"
        schemaVersion: 1
        sequence: 5
        stateFingerprintDigest: "sha256:08fb27de3b22a808d83f15c39531899add1606ec70d21f01243694936148b914"
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
      -
        actor: "USER"
        digest: "sha256:2c3f2346767928c18e34854c36953856217b7cc1686ec57ed55935d607049bb8"
        expiresAt: "2026-07-28T06:35:24.171Z"
        id: "authority-68122422-89eb-4100-979c-a7c848083865"
        issuedAt: "2026-07-28T06:20:24.171Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:4c1f59120de2ba60e38597224b676fc5a8739f540160b39ac3488a912074480c"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:efd338becc8af6425572abac5c3fd2c89e214786dca8e7745182d9a513c8eaff"
        stateScopeDigest: "sha256:810f3027e076813b54d331eb0d02516c734ccef9c4c3afba2c279b8183bb76cc"
      -
        actor: "USER"
        digest: "sha256:1e0d40e027a95d3cea15d7e4a45d4ddc53e2bdce10a314d69fe769d6e7eb501a"
        expiresAt: "2026-07-28T06:36:03.377Z"
        id: "authority-c08f9c38-e44b-46b4-8904-cb96c4e2f73d"
        issuedAt: "2026-07-28T06:21:03.377Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:748ad576ec679574ddc902170b50dfa956a456268667b50d6f79ebf9ad7c678c"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:ec5a13ae0ba7dd240716563a188de42d3bd0d73a8ea36fdee1d4e25f3494e33b"
        stateScopeDigest: "sha256:382d7ee81909d1105f7c5862a41f88b643d5047ea355e11e2dfe9161096b7273"
      -
        actor: "USER"
        digest: "sha256:989dc4dac257a16b3789e848d213c84192fa5b7b94bb5be9c4041df20a0fdfc3"
        expiresAt: "2026-07-28T06:40:04.656Z"
        id: "authority-a7dc1377-7e64-4cc8-a6a5-8ad896824833"
        issuedAt: "2026-07-28T06:25:04.656Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:6357c43fdacac354dee0c924d8d64b8038933003fbc7f1c0a985d495d295d798"
        operationId: "integration.enqueue"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:5d4484e3df8443741cfb09344a02c4cb624cca22d0f6b1422fbed935ec475baa"
        stateScopeDigest: "sha256:8dad5393b760fc988272c93fb0eecfab44bb1ba09580030394e4a0299eb97697"
      -
        actor: "USER"
        digest: "sha256:48f530435f938f95f0785923b0dda295e31c0d99ac349abbf2ebd391629e6957"
        expiresAt: "2026-07-28T07:00:38.438Z"
        id: "authority-9f88f893-cd36-4b4a-a691-3a9485fedc42"
        issuedAt: "2026-07-28T06:45:38.438Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:6357c43fdacac354dee0c924d8d64b8038933003fbc7f1c0a985d495d295d798"
        operationId: "integration.enqueue"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:08fb27de3b22a808d83f15c39531899add1606ec70d21f01243694936148b914"
        stateScopeDigest: "sha256:97742fb14996a30af37be0f6c02d23ebf50daa3a836aa62a5a2667280a6fe7db"
    schemaVersion: 1
  implementation_commit:
    hash: "1ec387cd29895158d5157c446a3913cc9598e440"
    message: "🚧 PTG9C7 task: align work-order task snapshot"
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
