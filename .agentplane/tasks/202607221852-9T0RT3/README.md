---
id: "202607221852-9T0RT3"
title: "Build deterministic task knowledge retrieval"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on:
  - "202607221848-ER5H6N"
  - "202607221848-VC4VVS"
  - "202607221852-1KWS8Y"
  - "202607221852-YP9QCH"
tags:
  - "context"
  - "milestone-beta2"
  - "refactor"
  - "retrieval"
  - "rf-19"
  - "v0.7"
  - "wave-retrieval"
  - "work-order"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T10:59:02.025Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-30T11:52:33.137Z"
  updated_by: "TESTER"
  note: "Passed: deterministic retrieval fixture covers exact, FTS, alias, graph, dependency output, and prior finding; work-order integration 7/7; typecheck and lint pass; test:critical completed 12/12 chunks."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-30T11:53:16.904Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 2 typed finding(s)."
  evaluated_sha: "a53a24b50edf52a22ee3884d3c7062980113b33d"
  blueprint_digest: "b4de788bbd37dcd3b697503ffb19cd646d3e0ab1f1d209574ffec8ebd6cf8408"
  evidence_refs:
    - ".agentplane/tasks/202607221852-9T0RT3/quality/20260730-115316785-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221852-9T0RT3/quality/20260730-115316785-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221852-9T0RT3/quality/20260730-115316785-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221852-9T0RT3/quality/20260730-115316785-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221852-9T0RT3/quality/20260730-115316785-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221852-9T0RT3/README.md"
    - ".agentplane/tasks/202607221852-9T0RT3/quality/20260730-115316785-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221852-9T0RT3/quality/20260730-115316785-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221852-9T0RT3/quality/20260730-115316785-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Exact, FTS, alias, and graph candidates retain retrieval reasons and explicit omission receipts."
    - "Structured path, dependency-output, and evaluator-finding signals are quota-protected before narrative expansion."
commit:
  hash: "a53a24b50edf52a22ee3884d3c7062980113b33d"
  message: "🚧 9T0RT3 task: preserve structured retrieval signals"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: deterministic retrieval prepares exact, FTS, alias, and graph evidence with bounded receipts; targeted retrieval test, typecheck, and lint passed."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-30T10:59:23.864Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-30T11:42:20.822Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: deterministic retrieval prepares exact, FTS, alias, and graph evidence with bounded receipts; targeted retrieval test, typecheck, and lint passed."
  -
    type: "verify"
    at: "2026-07-30T11:52:33.137Z"
    author: "TESTER"
    state: "ok"
    note: "Passed: deterministic retrieval fixture covers exact, FTS, alias, graph, dependency output, and prior finding; work-order integration 7/7; typecheck and lint pass; test:critical completed 12/12 chunks."
  -
    type: "status"
    at: "2026-07-30T11:53:48.455Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-30T11:53:48.456Z"
doc_updated_by: "CODER"
description: "RF-19a: derive exact/FTS/alias/graph queries from task intent, paths/symbols, blueprint, dependencies, and evaluator findings; attach bounded refs, excerpts, and a retrieval receipt to AgentWorkOrder."
sections:
  Summary: |-
    Build deterministic task knowledge retrieval

    RF-19a: derive exact/FTS/alias/graph queries from task intent, paths/symbols, blueprint, dependencies, and evaluator findings; attach bounded refs, excerpts, and a retrieval receipt to AgentWorkOrder.
  Scope: |-
    - In scope: deterministic query planning, exact/FTS/alias/graph retrieval, scoring/reasons, budgets, prepared excerpts, missing/omitted receipt, work-order integration, relevance fixtures, and metrics.
    - Out of scope: always-on CURATOR or semantic reranking.
  Plan: |-
    1. Build structured retrieval intent from task/acceptance, affected paths/symbols, blueprint/tags, dependency outputs, and evaluator findings.
    2. Resolve through exact, FTS, alias, and graph adapters under explicit budgets.
    3. Select refs/excerpts deterministically with reasons and coverage/omission receipt.
    4. Embed results in AgentWorkOrder and fingerprint the knowledge projection.
    5. Compare retrieval hits/gaps and executor repo-discovery probes to baseline scenarios.
  Verify Steps: |-
    1. Run fixed task fixtures twice. Expected: identical queries, refs, excerpts, scores/reasons, budgets, and retrieval receipt.
    2. Exercise path, symbol, dependency, and prior-finding signals. Expected: each contributes only when present and is auditable.
    3. Remove required knowledge or exceed budget. Expected: an explicit missing/omitted receipt, never fabricated context.
    4. Compare executor broad-discovery probes and verified success to baseline. Expected: fewer redundant probes without quality regression.
    5. Run work-order/retrieval tests and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-30T11:52:33.137Z — VERIFY — ok

    By: TESTER

    Note: Passed: deterministic retrieval fixture covers exact, FTS, alias, graph, dependency output, and prior finding; work-order integration 7/7; typecheck and lint pass; test:critical completed 12/12 chunks.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T11:42:20.822Z, excerpt_hash=sha256:87ed15263a2f5f035f42a831a0aefa6c1b3a7d79e4cf3a4dd351495390992992

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-9T0RT3-build-deterministic-task-knowledge-retrieval/.agentplane/tasks/202607221852-9T0RT3/blueprint/resolved-snapshot.json
    - old_digest: b4de788bbd37dcd3b697503ffb19cd646d3e0ab1f1d209574ffec8ebd6cf8408
    - current_digest: b4de788bbd37dcd3b697503ffb19cd646d3e0ab1f1d209574ffec8ebd6cf8408
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221852-9T0RT3

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221852-9T0RT3
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
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "2872d82ce71ecfa658dc9686ed1d36bb101f9278"
    version: 1
id_source: "generated"
---
## Summary

Build deterministic task knowledge retrieval

RF-19a: derive exact/FTS/alias/graph queries from task intent, paths/symbols, blueprint, dependencies, and evaluator findings; attach bounded refs, excerpts, and a retrieval receipt to AgentWorkOrder.

## Scope

- In scope: deterministic query planning, exact/FTS/alias/graph retrieval, scoring/reasons, budgets, prepared excerpts, missing/omitted receipt, work-order integration, relevance fixtures, and metrics.
- Out of scope: always-on CURATOR or semantic reranking.

## Plan

1. Build structured retrieval intent from task/acceptance, affected paths/symbols, blueprint/tags, dependency outputs, and evaluator findings.
2. Resolve through exact, FTS, alias, and graph adapters under explicit budgets.
3. Select refs/excerpts deterministically with reasons and coverage/omission receipt.
4. Embed results in AgentWorkOrder and fingerprint the knowledge projection.
5. Compare retrieval hits/gaps and executor repo-discovery probes to baseline scenarios.

## Verify Steps

1. Run fixed task fixtures twice. Expected: identical queries, refs, excerpts, scores/reasons, budgets, and retrieval receipt.
2. Exercise path, symbol, dependency, and prior-finding signals. Expected: each contributes only when present and is auditable.
3. Remove required knowledge or exceed budget. Expected: an explicit missing/omitted receipt, never fabricated context.
4. Compare executor broad-discovery probes and verified success to baseline. Expected: fewer redundant probes without quality regression.
5. Run work-order/retrieval tests and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-30T11:52:33.137Z — VERIFY — ok

By: TESTER

Note: Passed: deterministic retrieval fixture covers exact, FTS, alias, graph, dependency output, and prior finding; work-order integration 7/7; typecheck and lint pass; test:critical completed 12/12 chunks.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T11:42:20.822Z, excerpt_hash=sha256:87ed15263a2f5f035f42a831a0aefa6c1b3a7d79e4cf3a4dd351495390992992

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-9T0RT3-build-deterministic-task-knowledge-retrieval/.agentplane/tasks/202607221852-9T0RT3/blueprint/resolved-snapshot.json
- old_digest: b4de788bbd37dcd3b697503ffb19cd646d3e0ab1f1d209574ffec8ebd6cf8408
- current_digest: b4de788bbd37dcd3b697503ffb19cd646d3e0ab1f1d209574ffec8ebd6cf8408
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221852-9T0RT3

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221852-9T0RT3
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
