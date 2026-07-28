---
id: "202607221850-DRWR0V"
title: "Extract the shared typed workflow supervisor from Hermes"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on:
  - "202607221908-9M2FBQ"
tags:
  - "hermes"
  - "milestone-beta1"
  - "refactor"
  - "rf-09"
  - "rf-25"
  - "supervisor"
  - "v0.7"
  - "wave-supervisor"
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
  updated_at: "2026-07-27T23:41:21.664Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-28T00:11:42.458Z"
  updated_by: "TESTER"
  note: "Verified shared typed supervisor: registry-bound execution, route refresh after every attempt, and Hermes in-process runner adapter."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-28T00:12:08.203Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "425ee76ab656e27805ca20a5184531a8bbfeac1c"
  blueprint_digest: "718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102"
  evidence_refs:
    - ".agentplane/tasks/202607221850-DRWR0V/quality/20260728-001208105-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221850-DRWR0V/quality/20260728-001208105-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221850-DRWR0V/quality/20260728-001208105-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221850-DRWR0V/quality/20260728-001208105-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221850-DRWR0V/quality/20260728-001208105-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221850-DRWR0V/README.md"
    - ".agentplane/tasks/202607221850-DRWR0V/quality/20260728-001208105-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221850-DRWR0V/quality/20260728-001208105-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221850-DRWR0V/quality/20260728-001208105-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The supervisor rejects unregistered, cross-task, stale, non-authorized, duplicate, approval, semantic, human, wait, and terminal routes before execution; attempts refresh route state exactly once after execution."
commit:
  hash: "425ee76ab656e27805ca20a5184531a8bbfeac1c"
  message: "✨ DRWR0V supervisor: share typed workflow execution"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: shared typed supervisor committed at 425ee76ab656; targeted, critical, type, lint, guard, and formatting checks passed."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-27T23:42:49.570Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-28T00:11:23.397Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: shared typed supervisor committed at 425ee76ab656; targeted, critical, type, lint, guard, and formatting checks passed."
  -
    type: "verify"
    at: "2026-07-28T00:11:42.458Z"
    author: "TESTER"
    state: "ok"
    note: "Verified shared typed supervisor: registry-bound execution, route refresh after every attempt, and Hermes in-process runner adapter."
  -
    type: "status"
    at: "2026-07-28T00:12:35.087Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-28T00:12:35.087Z"
doc_updated_by: "CODER"
description: "RF-09/RF-25c: implement one in-process decide, execute, refresh, and audit loop over typed operations; make Hermes and CLI adapters use it without raw shell route execution."
sections:
  Summary: |-
    Extract the shared typed workflow supervisor from Hermes

    RF-09/RF-25c: implement one in-process decide, execute, refresh, and audit loop over typed operations; make Hermes and CLI adapters use it without raw shell route execution.
  Scope: |-
    - In scope: shared supervisor use case, typed operation registry/executor, state refresh after each operation, idempotency/postcondition enforcement, compatibility adapters for Hermes and CLI, uniform audit log, and hard stops for plan approval and semantic closeout.
    - Out of scope: full context/direct/branch_pr lifecycle automation, which is delivered by dependent vertical slices.
  Plan: |-
    1. Define supervisor input/output and typed operation executor ports.
    2. Move Hermes route classification and allowlisted execution onto the common reducer and registry.
    3. Execute at most one safe step, observe it, refresh state, and decide again until a typed stop.
    4. Reject raw shell strings, stale fingerprints, missing authority, plan approval, and semantic closeout.
    5. Add caller-parity, idempotency, audit, crash, and stop-condition fixtures.
  Verify Steps: |-
    1. Feed identical state through Hermes and CLI adapters. Expected: both produce the same typed step, operation result, refreshed fingerprint, and audit entry.
    2. Supply a raw shell route or unregistered operation. Expected: the supervisor rejects it before execution.
    3. Exercise approval, semantic closeout, wait, crash, and repeated-idempotency cases. Expected: bounded typed stops and no duplicated side effect.
    4. Run supervisor/Hermes/route tests, lifecycle invariants, guards, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-28T00:11:42.458Z — VERIFY — ok

    By: TESTER

    Note: Verified shared typed supervisor: registry-bound execution, route refresh after every attempt, and Hermes in-process runner adapter.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T00:11:23.397Z, excerpt_hash=sha256:2465e808ab2543aa665437fb7588025441de69da8e4f7be0eda602c12c55ddd9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf09-integration-lane.8OI6wK/repo/.agentplane/worktrees/202607221850-DRWR0V-extract-the-shared-typed-workflow-supervisor-fro/.agentplane/tasks/202607221850-DRWR0V/blueprint/resolved-snapshot.json
    - old_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
    - current_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221850-DRWR0V

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221850-DRWR0V
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
    - Restore the previous compatibility path behind an explicit feature/compatibility boundary.
    - Re-run lifecycle, focused, and type checks before resuming dependent work.
  Findings: |-
    - Observation: 20 targeted supervisor/Hermes tests, 11 critical CLI chunks, typecheck, lint, guards, and formatting passed.
      Impact: The supervisor rejects raw, unregistered, cross-task, stale, duplicate, approval, semantic, and wait paths before a duplicate side effect.
      Resolution: Recorded evidence in the task blueprint and removed the fixed Hermes subprocess ratchet entry.
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-27T23:43:01.343Z"
        authorityDigest: "sha256:dbce89022531053e8f681e2d0191c7d4fd2e95183f274c296728df6285c614f8"
        digest: "sha256:1ab233d4e140180a2f8968916b1986c45fd5605c52e58754871884baff956082"
        operationDigest: "sha256:6b9c1ca1f5682941b10ccdc69ca307304daddacd065362fcfb42a0201edda03b"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:b22bc8c8821ce72b870ffed0e117cb0fad3074f907d3fd9800411bd35c77b09d"
      -
        actor: "USER"
        at: "2026-07-28T00:12:21.822Z"
        authorityDigest: "sha256:34900186ff0753a992560c86165818abd4d1d20db45550c6ebae3cae0072feae"
        digest: "sha256:f8f3f86edc77f884fecc804ae07d80a52d15df5791f0239377ec6faf66106c22"
        operationDigest: "sha256:daab60af0159efce940ea0a86d8ba89b92faec9f55f3a49b046a76a53bf660aa"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:1ab233d4e140180a2f8968916b1986c45fd5605c52e58754871884baff956082"
        schemaVersion: 1
        sequence: 2
        stateFingerprintDigest: "sha256:e64979076b879a2bd00452900652e85bd6e8561a9af5c16ead952757393d159e"
    grants:
      -
        actor: "USER"
        digest: "sha256:dbce89022531053e8f681e2d0191c7d4fd2e95183f274c296728df6285c614f8"
        expiresAt: "2026-07-27T23:58:01.343Z"
        id: "authority-38324f39-545f-476a-bf03-cadaeed06fb9"
        issuedAt: "2026-07-27T23:43:01.343Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:6b9c1ca1f5682941b10ccdc69ca307304daddacd065362fcfb42a0201edda03b"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:b22bc8c8821ce72b870ffed0e117cb0fad3074f907d3fd9800411bd35c77b09d"
        stateScopeDigest: "sha256:b6760c538c90412a2b37ffe3bf7cafe86ae74d7a9eb29334c61e5b2d55cad55f"
      -
        actor: "USER"
        digest: "sha256:34900186ff0753a992560c86165818abd4d1d20db45550c6ebae3cae0072feae"
        expiresAt: "2026-07-28T00:27:21.822Z"
        id: "authority-05169555-9bdb-4dfc-8c5e-8604182dbdca"
        issuedAt: "2026-07-28T00:12:21.822Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:daab60af0159efce940ea0a86d8ba89b92faec9f55f3a49b046a76a53bf660aa"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:e64979076b879a2bd00452900652e85bd6e8561a9af5c16ead952757393d159e"
        stateScopeDigest: "sha256:88d9827ae1e5f9da98ff77ab4c4657fa2dd9e9a5cbe246c84d937df11b203624"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "2d6582e7f017820668cbbbbe90c211e360e47394"
    version: 1
id_source: "generated"
---
## Summary

Extract the shared typed workflow supervisor from Hermes

RF-09/RF-25c: implement one in-process decide, execute, refresh, and audit loop over typed operations; make Hermes and CLI adapters use it without raw shell route execution.

## Scope

- In scope: shared supervisor use case, typed operation registry/executor, state refresh after each operation, idempotency/postcondition enforcement, compatibility adapters for Hermes and CLI, uniform audit log, and hard stops for plan approval and semantic closeout.
- Out of scope: full context/direct/branch_pr lifecycle automation, which is delivered by dependent vertical slices.

## Plan

1. Define supervisor input/output and typed operation executor ports.
2. Move Hermes route classification and allowlisted execution onto the common reducer and registry.
3. Execute at most one safe step, observe it, refresh state, and decide again until a typed stop.
4. Reject raw shell strings, stale fingerprints, missing authority, plan approval, and semantic closeout.
5. Add caller-parity, idempotency, audit, crash, and stop-condition fixtures.

## Verify Steps

1. Feed identical state through Hermes and CLI adapters. Expected: both produce the same typed step, operation result, refreshed fingerprint, and audit entry.
2. Supply a raw shell route or unregistered operation. Expected: the supervisor rejects it before execution.
3. Exercise approval, semantic closeout, wait, crash, and repeated-idempotency cases. Expected: bounded typed stops and no duplicated side effect.
4. Run supervisor/Hermes/route tests, lifecycle invariants, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-28T00:11:42.458Z — VERIFY — ok

By: TESTER

Note: Verified shared typed supervisor: registry-bound execution, route refresh after every attempt, and Hermes in-process runner adapter.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T00:11:23.397Z, excerpt_hash=sha256:2465e808ab2543aa665437fb7588025441de69da8e4f7be0eda602c12c55ddd9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf09-integration-lane.8OI6wK/repo/.agentplane/worktrees/202607221850-DRWR0V-extract-the-shared-typed-workflow-supervisor-fro/.agentplane/tasks/202607221850-DRWR0V/blueprint/resolved-snapshot.json
- old_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
- current_digest: 718eba7013d12b83c5fd630518a34c07055d7c030b3f21d07b4ef16bc1f69102
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221850-DRWR0V

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221850-DRWR0V
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
- Restore the previous compatibility path behind an explicit feature/compatibility boundary.
- Re-run lifecycle, focused, and type checks before resuming dependent work.

## Findings

- Observation: 20 targeted supervisor/Hermes tests, 11 critical CLI chunks, typecheck, lint, guards, and formatting passed.
  Impact: The supervisor rejects raw, unregistered, cross-task, stale, duplicate, approval, semantic, and wait paths before a duplicate side effect.
  Resolution: Recorded evidence in the task blueprint and removed the fixed Hermes subprocess ratchet entry.
