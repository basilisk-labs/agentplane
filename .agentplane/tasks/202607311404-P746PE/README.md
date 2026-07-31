---
id: "202607311404-P746PE"
title: "Bind verification records to semantic review targets"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-31T14:05:33.609Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-31T14:05:33.609Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the verification-target resolver change and its focused tests. Existing verification records remain readable; no schema or persisted task migration is introduced.

## Findings
