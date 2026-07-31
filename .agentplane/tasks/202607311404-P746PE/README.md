---
id: "202607311404-P746PE"
title: "Bind verification records to semantic review targets"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 22
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evaluator"
  - "provenance"
  - "quality"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "Review the final diff. Expected: change is limited to verification target resolution plus focused regression coverage; no quality gate is weakened."
  - "Run bun run test:critical. Expected: all critical chunks pass."
  - "Run focused verification-record and evaluator runtime-evidence tests. Expected: verification after lifecycle-only task commits records the exact semantic implementation SHA and is accepted by evaluator preparation."
plan_approval:
  state: "approved"
  updated_at: "2026-07-31T14:05:08.988Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-31T15:31:15.267Z"
  updated_by: "TESTER"
  note: "PASS: semantic verification target remains stable through full closure history."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-31T15:37:01.331Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "9d4b182abb337d2849f7e25760ef4b2ad3d99aa1"
  blueprint_digest: "d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597"
  evidence_refs:
    - ".agentplane/tasks/202607311404-P746PE/quality/20260731-153602337-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607311404-P746PE/quality/20260731-153602337-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607311404-P746PE/quality/20260731-153602337-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607311404-P746PE/quality/20260731-153602337-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607311404-P746PE/quality/20260731-153602337-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607311404-P746PE/README.md"
    - ".agentplane/tasks/202607311404-P746PE/quality/20260731-153602337-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607311404-P746PE/quality/20260731-153602337-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607311404-P746PE/verification/20260731153115267-c27ca95630d2c5e7.json"
    - ".agentplane/tasks/202607311404-P746PE/quality/20260731-153602337-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Implementation and frozen verification evidence consistently bind verification records and evaluator preparation to the same semantic target SHA across lifecycle-only closure history."
commit:
  hash: "949ccd0470a303577e72f1041b0fee0abcc11fb4"
  message: "✅ P746PE task: record evaluator pass"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: resolve verification provenance through the semantic review target and assert exact evaluator SHA parity."
  -
    author: "CODER"
    body: "Implementation rework: add branch_pr, included-task batch, and semantic-advance provenance regressions."
  -
    author: "CODER"
    body: "Implementation rework: resolve full branch_pr batch targets for primary and included tasks across verify, evaluator, and integrate."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-31T14:05:33.609Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-31T14:08:52.641Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: resolve verification provenance through the semantic review target and assert exact evaluator SHA parity."
  -
    type: "verify"
    at: "2026-07-31T14:10:23.126Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: semantic verification provenance is exact and all focused plus critical checks pass at 58d0fc2a6."
  -
    type: "status"
    at: "2026-07-31T14:18:06.207Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation rework: add branch_pr, included-task batch, and semantic-advance provenance regressions."
  -
    type: "verify"
    at: "2026-07-31T14:19:29.916Z"
    author: "TESTER"
    state: "ok"
    note: "PASS after rework: branch_pr, batch, semantic-advance, focused, and critical checks pass at 6141e3600."
  -
    type: "status"
    at: "2026-07-31T14:23:51.266Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation rework: resolve full branch_pr batch targets for primary and included tasks across verify, evaluator, and integrate."
  -
    type: "verify"
    at: "2026-07-31T14:25:12.465Z"
    author: "TESTER"
    state: "ok"
    note: "PASS after included-task rework: all provenance, batch, integrate, and critical checks pass at 0af1c1a64."
  -
    type: "verify"
    at: "2026-07-31T14:27:16.722Z"
    author: "TESTER"
    state: "ok"
    note: "PASS with immutable evidence scope: source and managed task artifacts pass range whitespace validation at 0af1c1a64."
  -
    type: "status"
    at: "2026-07-31T14:29:00.456Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-31T15:31:15.267Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: semantic verification target remains stable through full closure history."
  -
    type: "status"
    at: "2026-07-31T15:38:12.518Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-31T15:38:12.519Z"
doc_updated_by: "CODER"
description: "Record task verification implementation_sha from the same semantic quality-review target used by EVALUATOR when lifecycle-only task artifacts follow the implementation commit. Preserve exact provenance so evaluator evidence cannot contradict the frozen evaluated SHA. Add regression coverage for post-code verification commits without weakening review freshness."
sections:
  Summary: |-
    Bind verification records to semantic review targets

    Record task verification implementation_sha from the same semantic quality-review target used by EVALUATOR when lifecycle-only task artifacts follow the implementation commit. Preserve exact provenance so evaluator evidence cannot contradict the frozen evaluated SHA. Add regression coverage for post-code verification commits without weakening review freshness.
  Scope: |-
    - In scope: Record task verification implementation_sha from the same semantic quality-review target used by EVALUATOR when lifecycle-only task artifacts follow the implementation commit. Preserve exact provenance so evaluator evidence cannot contradict the frozen evaluated SHA. Add regression coverage for post-code verification commits without weakening review freshness.
    - Out of scope: unrelated refactors not required for "Bind verification records to semantic review targets".
  Plan: "1. Reproduce the mismatch where task-only lifecycle commits follow the implementation. 2. Make verify resolve implementation_sha through the semantic quality-review target resolver. 3. Add focused regression coverage proving the verification record and evaluator packet use the same exact SHA. 4. Run focused tests and the critical suite; record structured evidence. 5. Pass independent EVALUATOR review and merge through the hosted queue."
  Verify Steps: |-
    1. Run the focused verification-record tests that create an implementation commit followed by lifecycle-only task artifacts, then record verification. Expected: the generated record implementation_sha equals the semantic implementation commit, not the later lifecycle HEAD.
    2. Prepare an evaluator work order for the same fixture. Expected: evaluated_sha and the frozen verification record implementation_sha are byte-for-byte equal, and the record remains accepted.
    3. Run the relevant evaluator runtime-evidence and verification command suites. Expected: existing direct-mode, branch_pr, stale-record, and runtime-evidence behavior remains green.
    4. Run bun run test:critical. Expected: all critical CLI chunks pass.
    5. Review the final diff and structured verification evidence. Expected: changes are limited to verification target resolution and focused tests; quality freshness and fail-closed behavior are not weakened.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-31T14:10:23.126Z — VERIFY — ok

    By: TESTER

    Note: PASS: semantic verification provenance is exact and all focused plus critical checks pass at 58d0fc2a6.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T14:08:52.641Z, excerpt_hash=sha256:652b4ebeca3d23477a5f7d18c6209cba69f4a74d077fa1f5fef8c47ae3447428

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts
    Result: pass
    Evidence: 3 files and 23 tests passed at 58d0fc2a6; lifecycle-only fixture asserts frozen verification implementation_sha and evaluator evaluated_sha both equal the source implementation SHA
    Scope: exact verification provenance, accepted evaluator records, runtime evidence, stale-record rejection, direct and branch_pr behavior

    Command: bun run test:critical
    Result: pass
    Evidence: 12 of 12 critical CLI chunks passed at 58d0fc2a6
    Scope: agent efficiency, replay, exit, Git edge, protected path, scope leak, symlink, and trust-boundary regressions

    Command: bun run typecheck and bun run format:check and git diff --check
    Result: pass
    Evidence: TypeScript build passed, all files match Prettier, and diff whitespace validation passed
    Scope: static correctness and repository formatting contract

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311404-P746PE-bind-verification-records-to-semantic-review-tar/.agentplane/tasks/202607311404-P746PE/blueprint/resolved-snapshot.json
    - old_digest: d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597
    - current_digest: d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607311404-P746PE

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607311404-P746PE
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-31T14:19:29.916Z — VERIFY — ok

    By: TESTER

    Note: PASS after rework: branch_pr, batch, semantic-advance, focused, and critical checks pass at 6141e3600.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T14:18:06.207Z, excerpt_hash=sha256:652b4ebeca3d23477a5f7d18c6209cba69f4a74d077fa1f5fef8c47ae3447428

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts
    Result: pass
    Evidence: 3 files and 26 tests passed at 6141e3600; exact-SHA assertions cover direct lifecycle descendants, branch_pr lifecycle descendants, included-task batches, and later semantic changes
    Scope: verification target provenance across direct, branch_pr, batch, stale-record, runtime-evidence, and semantic-advance paths

    Command: bun run test:critical
    Result: pass
    Evidence: 12 of 12 critical CLI chunks passed at 6141e3600
    Scope: critical agent-efficiency, replay, exit, Git, protected-path, scope, symlink, and trust-boundary regressions

    Command: bun run typecheck and bun run format:check and git diff --check
    Result: pass
    Evidence: TypeScript build, Prettier check, and diff whitespace validation passed for the reworked source
    Scope: static correctness and formatting contract

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311404-P746PE-bind-verification-records-to-semantic-review-tar/.agentplane/tasks/202607311404-P746PE/blueprint/resolved-snapshot.json
    - old_digest: d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597
    - current_digest: d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607311404-P746PE

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

    ### 2026-07-31T14:25:12.465Z — VERIFY — ok

    By: TESTER

    Note: PASS after included-task rework: all provenance, batch, integrate, and critical checks pass at 0af1c1a64.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T14:23:51.266Z, excerpt_hash=sha256:652b4ebeca3d23477a5f7d18c6209cba69f4a74d077fa1f5fef8c47ae3447428

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/commands/pr/internal/sync-batch-ownership.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts
    Result: pass
    Evidence: 5 files and 53 tests passed at 0af1c1a64; primary and included branch_pr tasks both record the original semantic SHA and the included evaluator packet resolves the same SHA
    Scope: exact provenance across direct, branch_pr primary, branch_pr included, full batch ownership, semantic advance, evaluator preparation, and integration

    Command: bun run test:critical
    Result: pass
    Evidence: 12 of 12 critical CLI chunks passed at 0af1c1a64
    Scope: critical agent-efficiency, replay, exit, Git, protected-path, scope, symlink, and trust-boundary regressions

    Command: bun run typecheck and bun run format:check and git diff --check
    Result: pass
    Evidence: TypeScript build, Prettier check, and diff whitespace validation passed after included-task rework
    Scope: static correctness and formatting contract

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311404-P746PE-bind-verification-records-to-semantic-review-tar/.agentplane/tasks/202607311404-P746PE/blueprint/resolved-snapshot.json
    - old_digest: d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597
    - current_digest: d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607311404-P746PE

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

    ### 2026-07-31T14:27:16.722Z — VERIFY — ok

    By: TESTER

    Note: PASS with immutable evidence scope: source and managed task artifacts pass range whitespace validation at 0af1c1a64.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T14:25:13.270Z, excerpt_hash=sha256:652b4ebeca3d23477a5f7d18c6209cba69f4a74d077fa1f5fef8c47ae3447428

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/commands/pr/internal/sync-batch-ownership.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts
    Result: pass
    Evidence: 5 files and 53 tests passed at 0af1c1a64; primary and included branch_pr tasks share exact semantic provenance across verify, evaluator, and integrate
    Scope: direct, branch_pr primary, branch_pr included, full batch ownership, semantic advance, evaluator preparation, and integration

    Command: bun run test:critical
    Result: pass
    Evidence: 12 of 12 critical CLI chunks passed at 0af1c1a64
    Scope: critical agent-efficiency, replay, exit, Git, protected-path, scope, symlink, and trust-boundary regressions

    Command: git diff --check 7f9c6ff8e11c0bbe7dcf9c26beb44240cac5310e 0af1c1a648db15f88a72571b7411cd5ebe8ca7ac -- . :(exclude).agentplane/tasks/202607311404-P746PE/quality/**
    Result: pass
    Evidence: command exited zero after all source, task README, PR, blueprint, and verification changes were checked; immutable hash-addressed raw evaluator quality artifacts were excluded because rewriting them would invalidate frozen evidence
    Scope: final tracked implementation and mutable lifecycle diff; frozen quality evidence retains its original byte content and hashes

    Command: bun run typecheck and bun run format:check
    Result: pass
    Evidence: TypeScript build and Prettier repository check passed after included-task rework
    Scope: static correctness and formatting contract

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311404-P746PE-bind-verification-records-to-semantic-review-tar/.agentplane/tasks/202607311404-P746PE/blueprint/resolved-snapshot.json
    - old_digest: d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597
    - current_digest: d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607311404-P746PE

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

    ### 2026-07-31T15:31:15.267Z — VERIFY — ok

    By: TESTER

    Note: PASS: semantic verification target remains stable through full closure history.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T14:29:00.456Z, excerpt_hash=sha256:652b4ebeca3d23477a5f7d18c6209cba69f4a74d077fa1f5fef8c47ae3447428

    Details:

    Command: bunx vitest run evaluator qualification, closure runtime, and quality-review-target focused checks
    Result: pass
    Evidence: qualification 1/1, complete pre-merge and included-batch closure 2/2, resolver 14/14 at 9d4b182abb337d2849f7e25760ef4b2ad3d99aa1
    Scope: exact semantic target selection across primary, included batch, and qualification dependency history

    Command: bunx vitest run seven related evaluator, verification, batch ownership, integration, resolver, and qualification files
    Result: pass
    Evidence: 7 files and 74 tests passed at 9d4b182abb337d2849f7e25760ef4b2ad3d99aa1
    Scope: direct, branch_pr, stale-record, runtime-evidence, batch, integration, and qualification behavior

    Command: bun run test:critical
    Result: pass
    Evidence: 12 of 12 critical CLI chunks passed at 9d4b182abb337d2849f7e25760ef4b2ad3d99aa1
    Scope: critical agent-efficiency, replay, exit, Git, protected-path, scope, symlink, and trust-boundary regressions

    Command: bun run typecheck; bun run format:check; git diff --check HEAD^ HEAD
    Result: pass
    Evidence: TypeScript build, repository Prettier check, and final semantic diff whitespace validation passed
    Scope: static correctness and formatting contract

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311404-P746PE-bind-verification-records-to-semantic-review-tar/.agentplane/tasks/202607311404-P746PE/blueprint/resolved-snapshot.json
    - old_digest: d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597
    - current_digest: d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607311404-P746PE

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
  Rollback Plan: "Revert the verification-target resolver change and its focused tests. Existing verification records remain readable; no schema or persisted task migration is introduced."
  Findings: |-
    - Observation: Qualification dependencies were incorrectly treated as lifecycle-compressible task artifacts, so their quality-review changes could be hidden behind a primary-task README mismatch.
      Impact: A release qualification packet could report an aggregate README mismatch instead of the precise stale dependency review and fail the intended gate.
      Resolution: Lifecycle compression is now scoped to the primary and included batch tasks; qualification dependencies remain semantic review inputs.
extensions:
  implementation_commit:
    hash: "9d4b182abb337d2849f7e25760ef4b2ad3d99aa1"
    message: "🐛 P746PE task: scope lifecycle target compression"
  workflow_route_baseline:
    start_head_sha: "7f9c6ff8e11c0bbe7dcf9c26beb44240cac5310e"
    version: 1
id_source: "generated"
---
## Summary

Bind verification records to semantic review targets

Record task verification implementation_sha from the same semantic quality-review target used by EVALUATOR when lifecycle-only task artifacts follow the implementation commit. Preserve exact provenance so evaluator evidence cannot contradict the frozen evaluated SHA. Add regression coverage for post-code verification commits without weakening review freshness.

## Scope

- In scope: Record task verification implementation_sha from the same semantic quality-review target used by EVALUATOR when lifecycle-only task artifacts follow the implementation commit. Preserve exact provenance so evaluator evidence cannot contradict the frozen evaluated SHA. Add regression coverage for post-code verification commits without weakening review freshness.
- Out of scope: unrelated refactors not required for "Bind verification records to semantic review targets".

## Plan

1. Reproduce the mismatch where task-only lifecycle commits follow the implementation. 2. Make verify resolve implementation_sha through the semantic quality-review target resolver. 3. Add focused regression coverage proving the verification record and evaluator packet use the same exact SHA. 4. Run focused tests and the critical suite; record structured evidence. 5. Pass independent EVALUATOR review and merge through the hosted queue.

## Verify Steps

1. Run the focused verification-record tests that create an implementation commit followed by lifecycle-only task artifacts, then record verification. Expected: the generated record implementation_sha equals the semantic implementation commit, not the later lifecycle HEAD.
2. Prepare an evaluator work order for the same fixture. Expected: evaluated_sha and the frozen verification record implementation_sha are byte-for-byte equal, and the record remains accepted.
3. Run the relevant evaluator runtime-evidence and verification command suites. Expected: existing direct-mode, branch_pr, stale-record, and runtime-evidence behavior remains green.
4. Run bun run test:critical. Expected: all critical CLI chunks pass.
5. Review the final diff and structured verification evidence. Expected: changes are limited to verification target resolution and focused tests; quality freshness and fail-closed behavior are not weakened.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-31T14:10:23.126Z — VERIFY — ok

By: TESTER

Note: PASS: semantic verification provenance is exact and all focused plus critical checks pass at 58d0fc2a6.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T14:08:52.641Z, excerpt_hash=sha256:652b4ebeca3d23477a5f7d18c6209cba69f4a74d077fa1f5fef8c47ae3447428

Details:

Command: bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts
Result: pass
Evidence: 3 files and 23 tests passed at 58d0fc2a6; lifecycle-only fixture asserts frozen verification implementation_sha and evaluator evaluated_sha both equal the source implementation SHA
Scope: exact verification provenance, accepted evaluator records, runtime evidence, stale-record rejection, direct and branch_pr behavior

Command: bun run test:critical
Result: pass
Evidence: 12 of 12 critical CLI chunks passed at 58d0fc2a6
Scope: agent efficiency, replay, exit, Git edge, protected path, scope leak, symlink, and trust-boundary regressions

Command: bun run typecheck and bun run format:check and git diff --check
Result: pass
Evidence: TypeScript build passed, all files match Prettier, and diff whitespace validation passed
Scope: static correctness and repository formatting contract

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311404-P746PE-bind-verification-records-to-semantic-review-tar/.agentplane/tasks/202607311404-P746PE/blueprint/resolved-snapshot.json
- old_digest: d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597
- current_digest: d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607311404-P746PE

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607311404-P746PE
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-31T14:19:29.916Z — VERIFY — ok

By: TESTER

Note: PASS after rework: branch_pr, batch, semantic-advance, focused, and critical checks pass at 6141e3600.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T14:18:06.207Z, excerpt_hash=sha256:652b4ebeca3d23477a5f7d18c6209cba69f4a74d077fa1f5fef8c47ae3447428

Details:

Command: bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts
Result: pass
Evidence: 3 files and 26 tests passed at 6141e3600; exact-SHA assertions cover direct lifecycle descendants, branch_pr lifecycle descendants, included-task batches, and later semantic changes
Scope: verification target provenance across direct, branch_pr, batch, stale-record, runtime-evidence, and semantic-advance paths

Command: bun run test:critical
Result: pass
Evidence: 12 of 12 critical CLI chunks passed at 6141e3600
Scope: critical agent-efficiency, replay, exit, Git, protected-path, scope, symlink, and trust-boundary regressions

Command: bun run typecheck and bun run format:check and git diff --check
Result: pass
Evidence: TypeScript build, Prettier check, and diff whitespace validation passed for the reworked source
Scope: static correctness and formatting contract

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311404-P746PE-bind-verification-records-to-semantic-review-tar/.agentplane/tasks/202607311404-P746PE/blueprint/resolved-snapshot.json
- old_digest: d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597
- current_digest: d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607311404-P746PE

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

### 2026-07-31T14:25:12.465Z — VERIFY — ok

By: TESTER

Note: PASS after included-task rework: all provenance, batch, integrate, and critical checks pass at 0af1c1a64.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T14:23:51.266Z, excerpt_hash=sha256:652b4ebeca3d23477a5f7d18c6209cba69f4a74d077fa1f5fef8c47ae3447428

Details:

Command: bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/commands/pr/internal/sync-batch-ownership.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts
Result: pass
Evidence: 5 files and 53 tests passed at 0af1c1a64; primary and included branch_pr tasks both record the original semantic SHA and the included evaluator packet resolves the same SHA
Scope: exact provenance across direct, branch_pr primary, branch_pr included, full batch ownership, semantic advance, evaluator preparation, and integration

Command: bun run test:critical
Result: pass
Evidence: 12 of 12 critical CLI chunks passed at 0af1c1a64
Scope: critical agent-efficiency, replay, exit, Git, protected-path, scope, symlink, and trust-boundary regressions

Command: bun run typecheck and bun run format:check and git diff --check
Result: pass
Evidence: TypeScript build, Prettier check, and diff whitespace validation passed after included-task rework
Scope: static correctness and formatting contract

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311404-P746PE-bind-verification-records-to-semantic-review-tar/.agentplane/tasks/202607311404-P746PE/blueprint/resolved-snapshot.json
- old_digest: d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597
- current_digest: d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607311404-P746PE

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

### 2026-07-31T14:27:16.722Z — VERIFY — ok

By: TESTER

Note: PASS with immutable evidence scope: source and managed task artifacts pass range whitespace validation at 0af1c1a64.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T14:25:13.270Z, excerpt_hash=sha256:652b4ebeca3d23477a5f7d18c6209cba69f4a74d077fa1f5fef8c47ae3447428

Details:

Command: bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/commands/pr/internal/sync-batch-ownership.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts
Result: pass
Evidence: 5 files and 53 tests passed at 0af1c1a64; primary and included branch_pr tasks share exact semantic provenance across verify, evaluator, and integrate
Scope: direct, branch_pr primary, branch_pr included, full batch ownership, semantic advance, evaluator preparation, and integration

Command: bun run test:critical
Result: pass
Evidence: 12 of 12 critical CLI chunks passed at 0af1c1a64
Scope: critical agent-efficiency, replay, exit, Git, protected-path, scope, symlink, and trust-boundary regressions

Command: git diff --check 7f9c6ff8e11c0bbe7dcf9c26beb44240cac5310e 0af1c1a648db15f88a72571b7411cd5ebe8ca7ac -- . :(exclude).agentplane/tasks/202607311404-P746PE/quality/**
Result: pass
Evidence: command exited zero after all source, task README, PR, blueprint, and verification changes were checked; immutable hash-addressed raw evaluator quality artifacts were excluded because rewriting them would invalidate frozen evidence
Scope: final tracked implementation and mutable lifecycle diff; frozen quality evidence retains its original byte content and hashes

Command: bun run typecheck and bun run format:check
Result: pass
Evidence: TypeScript build and Prettier repository check passed after included-task rework
Scope: static correctness and formatting contract

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311404-P746PE-bind-verification-records-to-semantic-review-tar/.agentplane/tasks/202607311404-P746PE/blueprint/resolved-snapshot.json
- old_digest: d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597
- current_digest: d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607311404-P746PE

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

### 2026-07-31T15:31:15.267Z — VERIFY — ok

By: TESTER

Note: PASS: semantic verification target remains stable through full closure history.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T14:29:00.456Z, excerpt_hash=sha256:652b4ebeca3d23477a5f7d18c6209cba69f4a74d077fa1f5fef8c47ae3447428

Details:

Command: bunx vitest run evaluator qualification, closure runtime, and quality-review-target focused checks
Result: pass
Evidence: qualification 1/1, complete pre-merge and included-batch closure 2/2, resolver 14/14 at 9d4b182abb337d2849f7e25760ef4b2ad3d99aa1
Scope: exact semantic target selection across primary, included batch, and qualification dependency history

Command: bunx vitest run seven related evaluator, verification, batch ownership, integration, resolver, and qualification files
Result: pass
Evidence: 7 files and 74 tests passed at 9d4b182abb337d2849f7e25760ef4b2ad3d99aa1
Scope: direct, branch_pr, stale-record, runtime-evidence, batch, integration, and qualification behavior

Command: bun run test:critical
Result: pass
Evidence: 12 of 12 critical CLI chunks passed at 9d4b182abb337d2849f7e25760ef4b2ad3d99aa1
Scope: critical agent-efficiency, replay, exit, Git, protected-path, scope, symlink, and trust-boundary regressions

Command: bun run typecheck; bun run format:check; git diff --check HEAD^ HEAD
Result: pass
Evidence: TypeScript build, repository Prettier check, and final semantic diff whitespace validation passed
Scope: static correctness and formatting contract

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311404-P746PE-bind-verification-records-to-semantic-review-tar/.agentplane/tasks/202607311404-P746PE/blueprint/resolved-snapshot.json
- old_digest: d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597
- current_digest: d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607311404-P746PE

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

Revert the verification-target resolver change and its focused tests. Existing verification records remain readable; no schema or persisted task migration is introduced.

## Findings

- Observation: Qualification dependencies were incorrectly treated as lifecycle-compressible task artifacts, so their quality-review changes could be hidden behind a primary-task README mismatch.
  Impact: A release qualification packet could report an aggregate README mismatch instead of the precise stale dependency review and fail the intended gate.
  Resolution: Lifecycle compression is now scoped to the primary and included batch tasks; qualification dependencies remain semantic review inputs.
