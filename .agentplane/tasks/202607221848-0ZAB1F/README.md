---
id: "202607221848-0ZAB1F"
title: "Introduce StateFingerprint and stale-state rejection"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on:
  - "202607221907-DK2CJF"
tags:
  - "fingerprint"
  - "milestone-alpha2"
  - "refactor"
  - "rf-06"
  - "v0.7"
  - "wave-contracts"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-24T09:03:13.557Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-24T21:39:50.493Z"
  updated_by: "TESTER"
  note: "Exact SHA f0a65ee70d7e10818921498c6f5400ff8fe9b536: RF06 271/271, critical CLI 71/71, full fast 3035/3035, typecheck, ESLint, lifecycle invariants, ci:contract, compatibility and offline provider replay passed; independent audit found no P0/P1."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-24T21:40:45.271Z"
  updated_by: "EVALUATOR"
  note: "Exact-SHA review confirms StateFingerprint authority, stale-state rejection, durable lifecycle records, and compatibility requirements at f0a65ee70d7e10818921498c6f5400ff8fe9b536."
  evaluated_sha: "f0a65ee70d7e10818921498c6f5400ff8fe9b536"
  blueprint_digest: "583f771d32107c02fb8a19a4f1d903741f7900de256fe7d005a0fe1837a28323"
  evidence_refs:
    - ".agentplane/tasks/202607221848-0ZAB1F/README.md"
    - ".agentplane/tasks/202607221848-0ZAB1F/quality/20260724-214045271-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221848-0ZAB1F/quality/20260724-214045271-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221848-0ZAB1F/quality/20260724-214045271-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221848-0ZAB1F/blueprint/resolved-snapshot.json"
    - "commit f0a65ee70d7e10818921498c6f5400ff8fe9b536; RF06 271/271; critical CLI 71/71; full fast 3035/3035; ci:contract PASS"
  findings:
    - "Pre-effect stale or unavailable required truth fails closed before apply; post-effect TTL expiry is retained only as a bounded authority-valid observation, while real capture failure remains post_state_unknown."
commit:
  hash: "f0a65ee70d7e10818921498c6f5400ff8fe9b536"
  message: "🚧 0ZAB1F task: harden StateFingerprint authority and persistence"
comments:
  -
    author: "CODER"
    body: "Start: implement deterministic state fingerprints and fail-closed stale-state rejection."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-24T09:04:17.392Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement deterministic state fingerprints and fail-closed stale-state rejection."
  -
    type: "verify"
    at: "2026-07-24T09:11:41.306Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Implementation is not present yet; the branch contains only generated task, PR, and blueprint artifacts."
  -
    type: "verify"
    at: "2026-07-24T21:39:50.493Z"
    author: "TESTER"
    state: "ok"
    note: "Exact SHA f0a65ee70d7e10818921498c6f5400ff8fe9b536: RF06 271/271, critical CLI 71/71, full fast 3035/3035, typecheck, ESLint, lifecycle invariants, ci:contract, compatibility and offline provider replay passed; independent audit found no P0/P1."
  -
    type: "status"
    at: "2026-07-24T21:41:13.451Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-24T21:41:13.452Z"
doc_updated_by: "CODER"
description: "RF-06a: define a reproducible fingerprint for task, Git, backend, policy, blueprint, knowledge, provider, and authority state; reject stale operations before side effects."
sections:
  Summary: |-
    Introduce StateFingerprint and stale-state rejection

    RF-06a: define a reproducible fingerprint for task, Git, backend, policy, blueprint, knowledge, provider, and authority state; reject stale operations before side effects.
  Scope: |-
    - In scope: StateFingerprint schema/types, digest inputs and canonicalization, freshness adapters, persisted provenance, stale-state errors, and fixture coverage for local/remote changes.
    - Out of scope: caching or executing workflow steps; those consume this contract in later tasks.
  Plan: |-
    1. Define canonical fingerprint components and optional/provider freshness semantics.
    2. Implement deterministic digest construction with explicit missing/unavailable states.
    3. Attach fingerprints to prepared operations and results.
    4. Recompute immediately before effects and reject mismatches with typed diagnostics.
    5. Cover task revision, Git HEAD/worktree, backend projection, policy, blueprint, knowledge, provider, and authority changes.
  Verify Steps: |-
    1. Build the same state twice. Expected: identical canonical fingerprint and component digests.
    2. Mutate each component independently in fixtures. Expected: only the corresponding digest changes and a prepared operation is rejected as stale.
    3. Simulate unavailable remote provider truth. Expected: the fingerprint records bounded uncertainty and policy decides whether execution may proceed.
    4. Run focused lifecycle tests, `bun run lifecycle:invariants`, and `bun run typecheck`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-24T09:11:41.306Z — VERIFY — needs_rework

    By: TESTER

    Note: Implementation is not present yet; the branch contains only generated task, PR, and blueprint artifacts.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T09:04:17.392Z, excerpt_hash=sha256:040f098b1cbc5b850bf2786c474bed20118b58607e6e18d496e296777acea920

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-0ZAB1F-introduce-statefingerprint-and-stale-state-rejec/.agentplane/tasks/202607221848-0ZAB1F/blueprint/resolved-snapshot.json
    - old_digest: 583f771d32107c02fb8a19a4f1d903741f7900de256fe7d005a0fe1837a28323
    - current_digest: 583f771d32107c02fb8a19a4f1d903741f7900de256fe7d005a0fe1837a28323
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221848-0ZAB1F

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221848-0ZAB1F
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-24T21:39:50.493Z — VERIFY — ok

    By: TESTER

    Note: Exact SHA f0a65ee70d7e10818921498c6f5400ff8fe9b536: RF06 271/271, critical CLI 71/71, full fast 3035/3035, typecheck, ESLint, lifecycle invariants, ci:contract, compatibility and offline provider replay passed; independent audit found no P0/P1.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T09:11:41.679Z, excerpt_hash=sha256:040f098b1cbc5b850bf2786c474bed20118b58607e6e18d496e296777acea920

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-0ZAB1F-introduce-statefingerprint-and-stale-state-rejec/.agentplane/tasks/202607221848-0ZAB1F/blueprint/resolved-snapshot.json
    - old_digest: 583f771d32107c02fb8a19a4f1d903741f7900de256fe7d005a0fe1837a28323
    - current_digest: 583f771d32107c02fb8a19a4f1d903741f7900de256fe7d005a0fe1837a28323
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221848-0ZAB1F

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
    - Observation: HEAD changes only lifecycle metadata and the resolved blueprint snapshot; no StateFingerprint production code or tests exist.
      Impact: The approved Verify Steps cannot be executed and the task cannot pass verification.
      Resolution: Return control to CODER to implement StateFingerprint, stale-state rejection, uncertainty handling, and focused coverage before re-verification.
id_source: "generated"
---
## Summary

Introduce StateFingerprint and stale-state rejection

RF-06a: define a reproducible fingerprint for task, Git, backend, policy, blueprint, knowledge, provider, and authority state; reject stale operations before side effects.

## Scope

- In scope: StateFingerprint schema/types, digest inputs and canonicalization, freshness adapters, persisted provenance, stale-state errors, and fixture coverage for local/remote changes.
- Out of scope: caching or executing workflow steps; those consume this contract in later tasks.

## Plan

1. Define canonical fingerprint components and optional/provider freshness semantics.
2. Implement deterministic digest construction with explicit missing/unavailable states.
3. Attach fingerprints to prepared operations and results.
4. Recompute immediately before effects and reject mismatches with typed diagnostics.
5. Cover task revision, Git HEAD/worktree, backend projection, policy, blueprint, knowledge, provider, and authority changes.

## Verify Steps

1. Build the same state twice. Expected: identical canonical fingerprint and component digests.
2. Mutate each component independently in fixtures. Expected: only the corresponding digest changes and a prepared operation is rejected as stale.
3. Simulate unavailable remote provider truth. Expected: the fingerprint records bounded uncertainty and policy decides whether execution may proceed.
4. Run focused lifecycle tests, `bun run lifecycle:invariants`, and `bun run typecheck`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-24T09:11:41.306Z — VERIFY — needs_rework

By: TESTER

Note: Implementation is not present yet; the branch contains only generated task, PR, and blueprint artifacts.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T09:04:17.392Z, excerpt_hash=sha256:040f098b1cbc5b850bf2786c474bed20118b58607e6e18d496e296777acea920

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-0ZAB1F-introduce-statefingerprint-and-stale-state-rejec/.agentplane/tasks/202607221848-0ZAB1F/blueprint/resolved-snapshot.json
- old_digest: 583f771d32107c02fb8a19a4f1d903741f7900de256fe7d005a0fe1837a28323
- current_digest: 583f771d32107c02fb8a19a4f1d903741f7900de256fe7d005a0fe1837a28323
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221848-0ZAB1F

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221848-0ZAB1F
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-24T21:39:50.493Z — VERIFY — ok

By: TESTER

Note: Exact SHA f0a65ee70d7e10818921498c6f5400ff8fe9b536: RF06 271/271, critical CLI 71/71, full fast 3035/3035, typecheck, ESLint, lifecycle invariants, ci:contract, compatibility and offline provider replay passed; independent audit found no P0/P1.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T09:11:41.679Z, excerpt_hash=sha256:040f098b1cbc5b850bf2786c474bed20118b58607e6e18d496e296777acea920

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-0ZAB1F-introduce-statefingerprint-and-stale-state-rejec/.agentplane/tasks/202607221848-0ZAB1F/blueprint/resolved-snapshot.json
- old_digest: 583f771d32107c02fb8a19a4f1d903741f7900de256fe7d005a0fe1837a28323
- current_digest: 583f771d32107c02fb8a19a4f1d903741f7900de256fe7d005a0fe1837a28323
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221848-0ZAB1F

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

- Observation: HEAD changes only lifecycle metadata and the resolved blueprint snapshot; no StateFingerprint production code or tests exist.
  Impact: The approved Verify Steps cannot be executed and the task cannot pass verification.
  Resolution: Return control to CODER to implement StateFingerprint, stale-state rejection, uncertainty handling, and focused coverage before re-verification.
