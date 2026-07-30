---
id: "202607221852-J910P6"
title: "Separate indexed search text from preview snippets"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on:
  - "202607300553-CR9VTJ"
tags:
  - "context"
  - "milestone-beta2"
  - "projection"
  - "refactor"
  - "rf-16"
  - "search"
  - "v0.7"
  - "wave-retrieval"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T07:16:36.624Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved under the user-authorized v0.7 controlled-wave plan after source inspection: schema v2, rebuild compatibility, exact refs, bounded previews, and measurable projection budgets."
verification:
  state: "ok"
  updated_at: "2026-07-30T07:34:02.279Z"
  updated_by: "TESTER"
  note: "Verified projection schema v2 against all four task criteria: long markdown tail remains searchable with bounded exact section preview; JSONL/JSON units retain stable refs and digests; metrics expose source/search/preview bytes with explicit 20-line/2048-byte and <2000ms fixture budgets; focused tests, typecheck, critical CLI suite, and ci:local:fast passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-30T07:34:55.135Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 2 typed finding(s)."
  evaluated_sha: "9d682177db11508e776d619e7e3d6f0a59fd1c7b"
  blueprint_digest: "627704d0f5043b3c40622b89a861bc0f6e493433abf749abe3645bae0c12093f"
  evidence_refs:
    - ".agentplane/tasks/202607221852-J910P6/quality/20260730-073455035-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221852-J910P6/quality/20260730-073455035-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221852-J910P6/quality/20260730-073455035-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221852-J910P6/quality/20260730-073455035-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221852-J910P6/quality/20260730-073455035-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221852-J910P6/README.md"
    - ".agentplane/tasks/202607221852-J910P6/quality/20260730-073455035-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221852-J910P6/quality/20260730-073455035-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221852-J910P6/quality/20260730-073455035-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Reviewed commit 9d682177: SQLite stores and FTS-indexes search_text, while previews are independently capped at 20 lines and 2048 UTF-8 bytes."
    - "Markdown sections, JSONL rows, and JSON line windows retain deterministic refs; search recomputes the exact current projection unit before accepting cached results."
commit:
  hash: "9d682177db11508e776d619e7e3d6f0a59fd1c7b"
  message: "🚧 J910P6 context: separate search text from previews"
comments:
  -
    author: "CODER"
    body: "Start: implement projection schema v2 with full search text, bounded previews, exact source refs, and rebuild compatibility in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implemented: projection schema v2 separates complete search text from bounded previews; preserves section/window/row refs; invalidates v1 cache for full rebuild; focused tests, typecheck, changed-file lint, and critical CLI suite passed."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-30T07:16:50.145Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement projection schema v2 with full search text, bounded previews, exact source refs, and rebuild compatibility in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-30T07:28:34.167Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implemented: projection schema v2 separates complete search text from bounded previews; preserves section/window/row refs; invalidates v1 cache for full rebuild; focused tests, typecheck, changed-file lint, and critical CLI suite passed."
  -
    type: "verify"
    at: "2026-07-30T07:34:02.279Z"
    author: "TESTER"
    state: "ok"
    note: "Verified projection schema v2 against all four task criteria: long markdown tail remains searchable with bounded exact section preview; JSONL/JSON units retain stable refs and digests; metrics expose source/search/preview bytes with explicit 20-line/2048-byte and <2000ms fixture budgets; focused tests, typecheck, critical CLI suite, and ci:local:fast passed."
  -
    type: "status"
    at: "2026-07-30T07:35:20.135Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-30T07:35:20.135Z"
doc_updated_by: "CODER"
description: "RF-16: index complete section/window/row content while keeping bounded previews and precise source spans for markdown, JSONL, and structured context files."
sections:
  Summary: |-
    Separate indexed search text from preview snippets

    RF-16: index complete section/window/row content while keeping bounded previews and precise source spans for markdown, JSONL, and structured context files.
  Scope: |-
    - In scope: versioned projection units, full search_text, bounded preview_text, markdown section/window splitting, JSONL row units, structured-field units, exact line/section/entity refs, and size/latency instrumentation.
    - Out of scope: FTS query execution or incremental update logic.
  Plan: |-
    1. Introduce projection schema v2 with complete `search_text`, UTF-8-bounded `preview_text`, stable source refs, and persisted byte/latency metrics.
    2. Project markdown sections and plain-text windows without searchable-tail truncation; retain bounded file previews only for canonical whole-file refs.
    3. Project JSONL rows and structured JSON units with deterministic selectors or line spans, preserving canonical refs and item digests.
    4. Make search rank/match full `search_text` but render `preview_text`; recompute selector freshness from the current projected unit.
    5. Treat v1 SQLite/legacy projections as rebuild-required, add focused schema/projection/search tests plus a scalable fixture with explicit preview-size and projection-latency budgets.
  Verify Steps: |-
    1. Index a long markdown page with a unique tail term. Expected: the term is searchable in projection data while the preview remains bounded and points to the exact section/lines.
    2. Project JSONL and structured fixtures. Expected: row/entity boundaries and canonical refs are stable and reproducible.
    3. Compare old/new index size and build latency. Expected: measured results and explicit budgets, not an assumed improvement.
    4. Run focused projection/search tests and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-30T07:34:02.279Z — VERIFY — ok

    By: TESTER

    Note: Verified projection schema v2 against all four task criteria: long markdown tail remains searchable with bounded exact section preview; JSONL/JSON units retain stable refs and digests; metrics expose source/search/preview bytes with explicit 20-line/2048-byte and <2000ms fixture budgets; focused tests, typecheck, critical CLI suite, and ci:local:fast passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T07:28:34.167Z, excerpt_hash=sha256:cac0e2ebef08220d49be203fa6e924241dd5f9276277f44601d8450f65312bcd

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-J910P6-separate-indexed-search-text-from-preview-snippe/.agentplane/tasks/202607221852-J910P6/blueprint/resolved-snapshot.json
    - old_digest: 627704d0f5043b3c40622b89a861bc0f6e493433abf749abe3645bae0c12093f
    - current_digest: 627704d0f5043b3c40622b89a861bc0f6e493433abf749abe3645bae0c12093f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221852-J910P6

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221852-J910P6
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
    - Implemented projection schema v2: complete `search_text` is independent from UTF-8-bounded `preview_text`; SQLite FTS indexes `search_text`.
    - Projection units preserve markdown section and line refs, JSONL rows, and structured JSON line windows. Search freshness now recomputes the exact current projection unit.
    - v1 projections are rebuild-required; `agentplane context reindex` recreates the cache and emits source/search/preview byte metrics plus projection latency.
    - Explicit budgets verified on a scalable fixture: preview <= 20 lines and <= 2048 UTF-8 bytes per row; projection fixture completes in < 2000 ms.
    - Local evidence: typecheck, changed-file lint, focused projection/search/SQLite tests (25 tests) passed.
extensions:
  workflow_route_baseline:
    start_head_sha: "b8dbca7245172f6b85d5431960a90debbc274c9d"
    version: 1
id_source: "generated"
---
## Summary

Separate indexed search text from preview snippets

RF-16: index complete section/window/row content while keeping bounded previews and precise source spans for markdown, JSONL, and structured context files.

## Scope

- In scope: versioned projection units, full search_text, bounded preview_text, markdown section/window splitting, JSONL row units, structured-field units, exact line/section/entity refs, and size/latency instrumentation.
- Out of scope: FTS query execution or incremental update logic.

## Plan

1. Introduce projection schema v2 with complete `search_text`, UTF-8-bounded `preview_text`, stable source refs, and persisted byte/latency metrics.
2. Project markdown sections and plain-text windows without searchable-tail truncation; retain bounded file previews only for canonical whole-file refs.
3. Project JSONL rows and structured JSON units with deterministic selectors or line spans, preserving canonical refs and item digests.
4. Make search rank/match full `search_text` but render `preview_text`; recompute selector freshness from the current projected unit.
5. Treat v1 SQLite/legacy projections as rebuild-required, add focused schema/projection/search tests plus a scalable fixture with explicit preview-size and projection-latency budgets.

## Verify Steps

1. Index a long markdown page with a unique tail term. Expected: the term is searchable in projection data while the preview remains bounded and points to the exact section/lines.
2. Project JSONL and structured fixtures. Expected: row/entity boundaries and canonical refs are stable and reproducible.
3. Compare old/new index size and build latency. Expected: measured results and explicit budgets, not an assumed improvement.
4. Run focused projection/search tests and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-30T07:34:02.279Z — VERIFY — ok

By: TESTER

Note: Verified projection schema v2 against all four task criteria: long markdown tail remains searchable with bounded exact section preview; JSONL/JSON units retain stable refs and digests; metrics expose source/search/preview bytes with explicit 20-line/2048-byte and <2000ms fixture budgets; focused tests, typecheck, critical CLI suite, and ci:local:fast passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T07:28:34.167Z, excerpt_hash=sha256:cac0e2ebef08220d49be203fa6e924241dd5f9276277f44601d8450f65312bcd

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-J910P6-separate-indexed-search-text-from-preview-snippe/.agentplane/tasks/202607221852-J910P6/blueprint/resolved-snapshot.json
- old_digest: 627704d0f5043b3c40622b89a861bc0f6e493433abf749abe3645bae0c12093f
- current_digest: 627704d0f5043b3c40622b89a861bc0f6e493433abf749abe3645bae0c12093f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221852-J910P6

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221852-J910P6
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

- Implemented projection schema v2: complete `search_text` is independent from UTF-8-bounded `preview_text`; SQLite FTS indexes `search_text`.
- Projection units preserve markdown section and line refs, JSONL rows, and structured JSON line windows. Search freshness now recomputes the exact current projection unit.
- v1 projections are rebuild-required; `agentplane context reindex` recreates the cache and emits source/search/preview byte metrics plus projection latency.
- Explicit budgets verified on a scalable fixture: preview <= 20 lines and <= 2048 UTF-8 bytes per row; projection fixture completes in < 2000 ms.
- Local evidence: typecheck, changed-file lint, focused projection/search/SQLite tests (25 tests) passed.
