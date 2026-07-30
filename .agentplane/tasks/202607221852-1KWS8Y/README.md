---
id: "202607221852-1KWS8Y"
title: "Batch context freshness and incrementally update projections"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on:
  - "202607221852-ADC3A5"
  - "202607221852-J910P6"
tags:
  - "context"
  - "index"
  - "milestone-beta2"
  - "performance"
  - "refactor"
  - "rf-15"
  - "v0.7"
  - "wave-retrieval"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "performance.benchmark"
verify:
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T08:42:47.429Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-30T09:11:46.641Z"
  updated_by: "TESTER"
  note: "RF-15 verification passed: source-query cache, no-op, delta equivalence, FTS continuity, version/corruption recovery, and benchmark threshold are covered."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-30T09:22:21.188Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 2 typed finding(s)."
  evaluated_sha: "efadd7678c8ed997024f51fb7f3c79eaa42ba0d3"
  blueprint_digest: "990a68eab3e06df2e77bcc94c4d6ddb89b2ada9f8a6c643c1fbe52b39f9ec1c4"
  evidence_refs:
    - ".agentplane/tasks/202607221852-1KWS8Y/quality/20260730-092221002-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221852-1KWS8Y/quality/20260730-092221002-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221852-1KWS8Y/quality/20260730-092221002-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221852-1KWS8Y/quality/20260730-092221002-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221852-1KWS8Y/quality/20260730-092221002-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221852-1KWS8Y/README.md"
    - ".agentplane/tasks/202607221852-1KWS8Y/quality/20260730-092221002-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221852-1KWS8Y/quality/20260730-092221002-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221852-1KWS8Y/quality/20260730-092221002-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Current-head review: source manifests, transactional source replacement, FTS external-content triggers, and full-rebuild fallback preserve search continuity across add/change/delete and corrupt or obsolete indexes."
    - "Performance evidence: the declared 600-source benchmark satisfies the p95 threshold (0.422 observed <= 0.8 required); the result correctly scopes the remaining all-source snapshot cost."
commit:
  hash: "abc4f54a011accd37989dd8f0ab8efe7de7c7a6a"
  message: "🔎 1KWS8Y task: refresh quality review"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: b6faeb4c76fb24259727170f1a20a979db3eb70c. RF-15 adds source-identity deltas, no-op/incremental/full-rebuild receipts, query-local freshness reuse, deterministic recovery coverage, and the benchmark artifact."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-30T08:43:03.409Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-30T09:11:22.983Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: b6faeb4c76fb24259727170f1a20a979db3eb70c. RF-15 adds source-identity deltas, no-op/incremental/full-rebuild receipts, query-local freshness reuse, deterministic recovery coverage, and the benchmark artifact."
  -
    type: "verify"
    at: "2026-07-30T09:11:46.641Z"
    author: "TESTER"
    state: "ok"
    note: "RF-15 verification passed: source-query cache, no-op, delta equivalence, FTS continuity, version/corruption recovery, and benchmark threshold are covered."
  -
    type: "status"
    at: "2026-07-30T09:12:51.369Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-30T09:23:27.444Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-30T09:23:27.444Z"
doc_updated_by: "CODER"
description: "RF-15: compute freshness once per source/query, dedupe canonical refs, upsert changed paths, delete removed paths, preserve unchanged rows, and recover corruption with a controlled full rebuild."
sections:
  Summary: |-
    Batch context freshness and incrementally update projections

    RF-15: compute freshness once per source/query, dedupe canonical refs, upsert changed paths, delete removed paths, preserve unchanged rows, and recover corruption with a controlled full rebuild.
  Scope: |-
    - In scope: per-query stat/hash/parse cache, canonical dedupe, changed/removed/unchanged detection, transactional incremental upsert/delete, projection-version migrations, equivalence tests, no-change behavior, corruption repair, and benchmarks.
    - Out of scope: semantic decisions or hidden stale reuse.
  Plan: "1. Version the SQLite projection schema to retain source identities and apply transactional per-source upsert/delete while keeping FTS rows synchronized. 2. Refactor reindex to capture each eligible file's stat, text, hash, and projection at most once; derive added, changed, removed, and unchanged sources without materializing the old corpus. 3. Return explicit no-op, incremental, and controlled full-rebuild receipts; force full rebuild for reset, integrity failure, projection-version mismatch, or index-scope changes. 4. Add deterministic tests for deduplication, no-change zero-write behavior, add/change/delete equivalence, corruption/version recovery, and FTS search continuity. 5. Add a reproducible scaled benchmark and record method, threshold, comparison, and residual scope; run focused checks, typecheck, critical CLI checks, hotspot, and Knip gates."
  Verify Steps: |-
    1. Query repeated matches from one source. Expected: one stat/hash/parse operation and deduplicated canonical results.
    2. Run no-change reindex. Expected: zero corpus rewrite and a truthful no-op receipt.
    3. Modify, add, and delete sources. Expected: incremental results equal a clean full rebuild byte-for-byte after normalization.
    4. Corrupt the index or change projection version. Expected: controlled repair/full rebuild with no silent partial results.
    5. Run focused index tests and scaled benchmarks.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-30T09:11:46.641Z — VERIFY — ok

    By: TESTER

    Note: RF-15 verification passed: source-query cache, no-op, delta equivalence, FTS continuity, version/corruption recovery, and benchmark threshold are covered.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T09:11:22.983Z, excerpt_hash=sha256:a31ed258641329805b571a4d1287187b15b770490a0483ef60099cbc5ac56e7a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-1KWS8Y-batch-context-freshness-and-incrementally-update/.agentplane/tasks/202607221852-1KWS8Y/blueprint/resolved-snapshot.json
    - old_digest: 990a68eab3e06df2e77bcc94c4d6ddb89b2ada9f8a6c643c1fbe52b39f9ec1c4
    - current_digest: 990a68eab3e06df2e77bcc94c4d6ddb89b2ada9f8a6c643c1fbe52b39f9ec1c4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221852-1KWS8Y

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221852-1KWS8Y
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
    - Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
    - Re-run equivalence, recall, lifecycle, and type checks.
  Findings: |-
    - Observation: Focused Vitest: 4 files/26 tests; broader context matrix: 4 files/31 tests; critical CLI: 12/12 chunks passed; typecheck, format, lint, hotspot, and Knip passed. Benchmark: 600 files, 15 runs, p95 52.557 ms incremental versus 124.49 ms full rebuild (ratio 0.422 <= 0.8).
      Impact: The projection keeps unchanged source rows and FTS entries, while one search query reads and projects each source once.
      Resolution: Verified the committed RF-15 implementation b6faeb4c76fb24259727170f1a20a979db3eb70c; remaining scope is intentionally all-source enumeration and hashing.
extensions:
  implementation_commit:
    hash: "efadd7678c8ed997024f51fb7f3c79eaa42ba0d3"
    message: "🔧 1KWS8Y context: fix static lint"
  workflow_route_baseline:
    start_head_sha: "45b38ab477c3511ae7395f9b221495527888bf7e"
    version: 1
id_source: "generated"
---
## Summary

Batch context freshness and incrementally update projections

RF-15: compute freshness once per source/query, dedupe canonical refs, upsert changed paths, delete removed paths, preserve unchanged rows, and recover corruption with a controlled full rebuild.

## Scope

- In scope: per-query stat/hash/parse cache, canonical dedupe, changed/removed/unchanged detection, transactional incremental upsert/delete, projection-version migrations, equivalence tests, no-change behavior, corruption repair, and benchmarks.
- Out of scope: semantic decisions or hidden stale reuse.

## Plan

1. Version the SQLite projection schema to retain source identities and apply transactional per-source upsert/delete while keeping FTS rows synchronized. 2. Refactor reindex to capture each eligible file's stat, text, hash, and projection at most once; derive added, changed, removed, and unchanged sources without materializing the old corpus. 3. Return explicit no-op, incremental, and controlled full-rebuild receipts; force full rebuild for reset, integrity failure, projection-version mismatch, or index-scope changes. 4. Add deterministic tests for deduplication, no-change zero-write behavior, add/change/delete equivalence, corruption/version recovery, and FTS search continuity. 5. Add a reproducible scaled benchmark and record method, threshold, comparison, and residual scope; run focused checks, typecheck, critical CLI checks, hotspot, and Knip gates.

## Verify Steps

1. Query repeated matches from one source. Expected: one stat/hash/parse operation and deduplicated canonical results.
2. Run no-change reindex. Expected: zero corpus rewrite and a truthful no-op receipt.
3. Modify, add, and delete sources. Expected: incremental results equal a clean full rebuild byte-for-byte after normalization.
4. Corrupt the index or change projection version. Expected: controlled repair/full rebuild with no silent partial results.
5. Run focused index tests and scaled benchmarks.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-30T09:11:46.641Z — VERIFY — ok

By: TESTER

Note: RF-15 verification passed: source-query cache, no-op, delta equivalence, FTS continuity, version/corruption recovery, and benchmark threshold are covered.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T09:11:22.983Z, excerpt_hash=sha256:a31ed258641329805b571a4d1287187b15b770490a0483ef60099cbc5ac56e7a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-1KWS8Y-batch-context-freshness-and-incrementally-update/.agentplane/tasks/202607221852-1KWS8Y/blueprint/resolved-snapshot.json
- old_digest: 990a68eab3e06df2e77bcc94c4d6ddb89b2ada9f8a6c643c1fbe52b39f9ec1c4
- current_digest: 990a68eab3e06df2e77bcc94c4d6ddb89b2ada9f8a6c643c1fbe52b39f9ec1c4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221852-1KWS8Y

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221852-1KWS8Y
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
- Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
- Re-run equivalence, recall, lifecycle, and type checks.

## Findings

- Observation: Focused Vitest: 4 files/26 tests; broader context matrix: 4 files/31 tests; critical CLI: 12/12 chunks passed; typecheck, format, lint, hotspot, and Knip passed. Benchmark: 600 files, 15 runs, p95 52.557 ms incremental versus 124.49 ms full rebuild (ratio 0.422 <= 0.8).
  Impact: The projection keeps unchanged source rows and FTS entries, while one search query reads and projects each source once.
  Resolution: Verified the committed RF-15 implementation b6faeb4c76fb24259727170f1a20a979db3eb70c; remaining scope is intentionally all-source enumeration and hashing.
