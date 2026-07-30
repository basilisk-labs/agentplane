---
id: "202607221852-ADC3A5"
title: "Query context projections with SQLite FTS5 and BM25"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on:
  - "202607221846-SXJ75T"
  - "202607221852-J910P6"
tags:
  - "context"
  - "fts5"
  - "milestone-beta2"
  - "performance"
  - "refactor"
  - "rf-14"
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
  updated_at: "2026-07-30T07:50:56.329Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-30T08:15:01.897Z"
  updated_by: "TESTER"
  note: "Verified SQLite FTS5/BM25 retrieval: 32 focused context tests, typecheck, compatibility ratchet, benchmark, and the 12-chunk critical CLI suite passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-30T08:22:14.441Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 2 typed finding(s)."
  evaluated_sha: "3893e0be01a8b4a5ed2bd6d8163d0532936af114"
  blueprint_digest: "d1e3ca0318d6cf5a7b138bb1c2754a3e555a93a3f782af0113df153ba431de2e"
  evidence_refs:
    - ".agentplane/tasks/202607221852-ADC3A5/quality/20260730-082214226-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221852-ADC3A5/quality/20260730-082214226-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221852-ADC3A5/quality/20260730-082214226-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221852-ADC3A5/quality/20260730-082214226-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221852-ADC3A5/quality/20260730-082214226-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221852-ADC3A5/README.md"
    - ".agentplane/tasks/202607221852-ADC3A5/quality/20260730-082214226-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221852-ADC3A5/quality/20260730-082214226-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221852-ADC3A5/quality/20260730-082214226-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The moved test preserves the same stable-ref pagination and no-fallback assertions; product code and benchmark evidence are unchanged."
    - "The source test file is now 999 lines and the new focused file is 62 lines, so the previous hotspot baseline remains at 10 oversized files."
commit:
  hash: "b7860bab46d9001e31c46d5adf8aaba8423b48b7"
  message: "🚀 ADC3A5 context: query projections with FTS5 and BM25"
comments:
  -
    author: "CODER"
    body: "Start: implement the approved FTS5/BM25 retrieval slice in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: SQLite FTS5/BM25 retrieval committed in b7860bab46d9001e31c46d5adf8aaba8423b48b7; focused tests and benchmark completed."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-30T07:51:18.700Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved FTS5/BM25 retrieval slice in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-30T08:13:42.259Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: SQLite FTS5/BM25 retrieval committed in b7860bab46d9001e31c46d5adf8aaba8423b48b7; focused tests and benchmark completed."
  -
    type: "verify"
    at: "2026-07-30T08:15:01.897Z"
    author: "TESTER"
    state: "ok"
    note: "Verified SQLite FTS5/BM25 retrieval: 32 focused context tests, typecheck, compatibility ratchet, benchmark, and the 12-chunk critical CLI suite passed."
  -
    type: "status"
    at: "2026-07-30T08:16:00.946Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-30T08:16:00.947Z"
doc_updated_by: "CODER"
description: "RF-14: use the existing FTS5 index for MATCH/BM25 search with filters, top-k, pagination, stable refs, snippets, truthful strategy output, and bounded live fallback."
sections:
  Summary: |-
    Query context projections with SQLite FTS5 and BM25

    RF-14: use the existing FTS5 index for MATCH/BM25 search with filters, top-k, pagination, stable refs, snippets, truthful strategy output, and bounded live fallback.
  Scope: |-
    - In scope: SQLite search API, MATCH/BM25 ranking, path/scope/kind filters, stable pagination, snippets/highlights, canonical dedupe, adapter/strategy receipts, recall fixtures, and p95 benchmark.
    - Out of scope: semantic ranking; live filesystem scan remains only a missing/stale-index fallback.
  Plan: |-
    1. Add typed FTS query/filter/pagination APIs over the versioned projections.
    2. Route indexed context search through MATCH/BM25 and remove duplicate JS row plus filesystem scans.
    3. Keep a bounded explicit fallback for missing/stale/unindexed sources.
    4. Emit actual adapter, strategy, index digest, and fallback reasons.
    5. Build known-ref recall and scaled-corpus latency benchmarks.
  Verify Steps: |-
    1. Search the known-ref corpus. Expected: every target appears within its declared top-k and carries a stable canonical ref and snippet.
    2. Inspect indexed query execution. Expected: no full projection-row iteration or duplicate live result path.
    3. Remove or stale the index. Expected: JSON reports the bounded fallback and its reason.
    4. Compare p50/p95 against the 0.6.24 baseline on the same corpus. Expected: statistically supported improvement without recall regression.
    5. Run focused search/SQLite tests and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-30T08:15:01.897Z — VERIFY — ok

    By: TESTER

    Note: Verified SQLite FTS5/BM25 retrieval: 32 focused context tests, typecheck, compatibility ratchet, benchmark, and the 12-chunk critical CLI suite passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T08:13:42.259Z, excerpt_hash=sha256:2c4139b1e980415caefc3735e1ac117c071c7d5323ca2dbdb167cb40784ea9fb

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-ADC3A5-query-context-projections-with-sqlite-fts5-and-b/.agentplane/tasks/202607221852-ADC3A5/blueprint/resolved-snapshot.json
    - old_digest: d1e3ca0318d6cf5a7b138bb1c2754a3e555a93a3f782af0113df153ba431de2e
    - current_digest: d1e3ca0318d6cf5a7b138bb1c2754a3e555a93a3f782af0113df153ba431de2e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221852-ADC3A5

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221852-ADC3A5
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
    - Observation: Indexed queries use FTS5/BM25 with stable scope filters, pagination and highlights; stale or unavailable indexes return a bounded fallback receipt.
      Impact: The prior linear projection scan is removed from the valid-index command path without changing the public CLI topology.
      Resolution: Benchmark artifact reports 24/24 recall and 93.5% p95 improvement on the reproducible synthetic indexed corpus.
extensions:
  workflow_route_baseline:
    start_head_sha: "5300e2fc75a17b15aaa0c0ff9fc1edbebadba163"
    version: 1
id_source: "generated"
---
## Summary

Query context projections with SQLite FTS5 and BM25

RF-14: use the existing FTS5 index for MATCH/BM25 search with filters, top-k, pagination, stable refs, snippets, truthful strategy output, and bounded live fallback.

## Scope

- In scope: SQLite search API, MATCH/BM25 ranking, path/scope/kind filters, stable pagination, snippets/highlights, canonical dedupe, adapter/strategy receipts, recall fixtures, and p95 benchmark.
- Out of scope: semantic ranking; live filesystem scan remains only a missing/stale-index fallback.

## Plan

1. Add typed FTS query/filter/pagination APIs over the versioned projections.
2. Route indexed context search through MATCH/BM25 and remove duplicate JS row plus filesystem scans.
3. Keep a bounded explicit fallback for missing/stale/unindexed sources.
4. Emit actual adapter, strategy, index digest, and fallback reasons.
5. Build known-ref recall and scaled-corpus latency benchmarks.

## Verify Steps

1. Search the known-ref corpus. Expected: every target appears within its declared top-k and carries a stable canonical ref and snippet.
2. Inspect indexed query execution. Expected: no full projection-row iteration or duplicate live result path.
3. Remove or stale the index. Expected: JSON reports the bounded fallback and its reason.
4. Compare p50/p95 against the 0.6.24 baseline on the same corpus. Expected: statistically supported improvement without recall regression.
5. Run focused search/SQLite tests and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-30T08:15:01.897Z — VERIFY — ok

By: TESTER

Note: Verified SQLite FTS5/BM25 retrieval: 32 focused context tests, typecheck, compatibility ratchet, benchmark, and the 12-chunk critical CLI suite passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T08:13:42.259Z, excerpt_hash=sha256:2c4139b1e980415caefc3735e1ac117c071c7d5323ca2dbdb167cb40784ea9fb

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-ADC3A5-query-context-projections-with-sqlite-fts5-and-b/.agentplane/tasks/202607221852-ADC3A5/blueprint/resolved-snapshot.json
- old_digest: d1e3ca0318d6cf5a7b138bb1c2754a3e555a93a3f782af0113df153ba431de2e
- current_digest: d1e3ca0318d6cf5a7b138bb1c2754a3e555a93a3f782af0113df153ba431de2e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221852-ADC3A5

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221852-ADC3A5
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

- Observation: Indexed queries use FTS5/BM25 with stable scope filters, pagination and highlights; stale or unavailable indexes return a bounded fallback receipt.
  Impact: The prior linear projection scan is removed from the valid-index command path without changing the public CLI topology.
  Resolution: Benchmark artifact reports 24/24 recall and 93.5% p95 improvement on the reproducible synthetic indexed corpus.
