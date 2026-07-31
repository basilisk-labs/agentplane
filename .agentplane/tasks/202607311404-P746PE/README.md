---
id: "202607311404-P746PE"
title: "Bind verification records to semantic review targets"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
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
  updated_at: "2026-07-31T14:10:23.126Z"
  updated_by: "TESTER"
  note: "PASS: semantic verification provenance is exact and all focused plus critical checks pass at 58d0fc2a6."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-31T14:14:54.257Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 1 typed finding(s)."
  evaluated_sha: "58d0fc2a61fddfe924885cac410bfcfc7d27616c"
  blueprint_digest: "d2deec83c68155c5716653708b093e245feaa5c8cd4e93a0c6a6b23bef802597"
  evidence_refs:
    - ".agentplane/tasks/202607311404-P746PE/quality/20260731-141311911-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607311404-P746PE/quality/20260731-141311911-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607311404-P746PE/quality/20260731-141311911-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607311404-P746PE/quality/20260731-141311911-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607311404-P746PE/quality/20260731-141311911-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607311404-P746PE/quality/20260731-141311911-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202607311404-P746PE/README.md"
    - ".agentplane/tasks/202607311404-P746PE/quality/20260731-141311911-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607311404-P746PE/quality/20260731-141311911-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607311404-P746PE/verification/20260731141023126-d38fcecccff2d826.json"
    - ".agentplane/tasks/202607311404-P746PE/quality/20260731-141311911-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Regression coverage does not prove the new verification-target binding across the required branch_pr and batch-task paths."
commit:
  hash: "58d0fc2a61fddfe924885cac410bfcfc7d27616c"
  message: "🚧 P746PE code: Align verification target SHA"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: resolve verification provenance through the semantic review target and assert exact evaluator SHA parity."
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
doc_version: 3
doc_updated_at: "2026-07-31T14:10:23.877Z"
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

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the verification-target resolver change and its focused tests. Existing verification records remain readable; no schema or persisted task migration is introduced."
  Findings: ""
extensions:
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

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the verification-target resolver change and its focused tests. Existing verification records remain readable; no schema or persisted task migration is introduced.

## Findings
