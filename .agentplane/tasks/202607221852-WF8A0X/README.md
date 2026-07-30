---
id: "202607221852-WF8A0X"
title: "Create CURATOR-gated post-task knowledge proposals"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202607221848-1HWR0R"
  - "202607221850-8HBF4J"
  - "202607221852-9T0RT3"
tags:
  - "context"
  - "curator"
  - "knowledge"
  - "milestone-beta2"
  - "refactor"
  - "rf-20"
  - "v0.7"
  - "wave-retrieval"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run task-state:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T16:06:55.177Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-30T16:46:49.107Z"
  updated_by: "TESTER"
  note: "Verified RF-20: proposal collection writes no wiki/fact/graph artifacts; duplicate/consolidation evidence is recorded before exact CURATOR selection; CLI builds the bounded source/canonical/SGR work pack and retains apply ownership. Checks: typecheck; focused harvest tasks 9/9; Knip baseline; CLI docs freshness; targeted ESLint; diff check."
  attempts: 0
commit:
  hash: "5dec70046e5b4006ffa4b78593154ad3409ad764"
  message: "🚧 WF8A0X task: gate task knowledge proposals"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: replaced task-history fact/wiki promotion with source-backed knowledge proposals, exact CURATOR selection receipts, and CLI-built semantic work packs. Local checks: typecheck, focused harvest tests (9 passed), targeted lint, Knip, CLI docs freshness, diff check."
events:
  -
    type: "status"
    at: "2026-07-30T16:07:19.854Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-30T16:45:44.406Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: replaced task-history fact/wiki promotion with source-backed knowledge proposals, exact CURATOR selection receipts, and CLI-built semantic work packs. Local checks: typecheck, focused harvest tests (9 passed), targeted lint, Knip, CLI docs freshness, diff check."
  -
    type: "verify"
    at: "2026-07-30T16:46:49.107Z"
    author: "TESTER"
    state: "ok"
    note: "Verified RF-20: proposal collection writes no wiki/fact/graph artifacts; duplicate/consolidation evidence is recorded before exact CURATOR selection; CLI builds the bounded source/canonical/SGR work pack and retains apply ownership. Checks: typecheck; focused harvest tasks 9/9; Knip baseline; CLI docs freshness; targeted ESLint; diff check."
doc_version: 3
doc_updated_at: "2026-07-30T16:46:52.338Z"
doc_updated_by: "CODER"
description: "RF-20: collect source-backed durable-knowledge candidates after tasks but publish nothing automatically; route selected proposals through a separate CURATOR task with dedupe and consolidation checks."
sections:
  Summary: |-
    Create CURATOR-gated post-task knowledge proposals

    RF-20: collect source-backed durable-knowledge candidates after tasks but publish nothing automatically; route selected proposals through a separate CURATOR task with dedupe and consolidation checks.
  Scope: |-
    - In scope: deterministic proposal signals for ADR/public API/stable rule/recurring finding/resolved conflict/task decision, source refs, selection gate, duplicate/consolidation checks, CURATOR task creation, and publication audit.
    - Out of scope: automatic wiki writes or publishing transient implementation details.
  Plan: |-
    1. Define proposal schema and source-backed deterministic candidate signals.
    2. Filter transient/noisy items and attach exact task/PR/diff/evaluator refs.
    3. Run duplicate and consolidation checks against current knowledge.
    4. Create a separate CURATOR work order/task only for selected proposals.
    5. Apply durable updates through the existing transactional context path and record provenance.
  Verify Steps: |-
    1. Complete fixtures containing durable and transient changes. Expected: only source-backed durable candidates are proposed; no wiki file changes automatically.
    2. Submit duplicate and conflicting proposals. Expected: dedupe/consolidation evidence precedes CURATOR selection.
    3. Select a proposal. Expected: a separate exact-id CURATOR task/work order owns semantic publication.
    4. Trace a published item. Expected: source refs, task/PR decision, CURATOR result, and apply receipt are complete.
    5. Run proposal/context/task-state tests.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-30T16:46:49.107Z — VERIFY — ok

    By: TESTER

    Note: Verified RF-20: proposal collection writes no wiki/fact/graph artifacts; duplicate/consolidation evidence is recorded before exact CURATOR selection; CLI builds the bounded source/canonical/SGR work pack and retains apply ownership. Checks: typecheck; focused harvest tasks 9/9; Knip baseline; CLI docs freshness; targeted ESLint; diff check.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T16:45:44.406Z, excerpt_hash=sha256:2c6461cba2f778022162c9c1a87b5a99f55c4b41bc5ba8bcbb37a548d5103444

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-WF8A0X-create-curator-gated-post-task-knowledge-proposa/.agentplane/tasks/202607221852-WF8A0X/blueprint/resolved-snapshot.json
    - old_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
    - current_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221852-WF8A0X

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221852-WF8A0X
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
    start_head_sha: "12115a42325bb38de85f15df89b96b2675b595cb"
    version: 1
id_source: "generated"
---
## Summary

Create CURATOR-gated post-task knowledge proposals

RF-20: collect source-backed durable-knowledge candidates after tasks but publish nothing automatically; route selected proposals through a separate CURATOR task with dedupe and consolidation checks.

## Scope

- In scope: deterministic proposal signals for ADR/public API/stable rule/recurring finding/resolved conflict/task decision, source refs, selection gate, duplicate/consolidation checks, CURATOR task creation, and publication audit.
- Out of scope: automatic wiki writes or publishing transient implementation details.

## Plan

1. Define proposal schema and source-backed deterministic candidate signals.
2. Filter transient/noisy items and attach exact task/PR/diff/evaluator refs.
3. Run duplicate and consolidation checks against current knowledge.
4. Create a separate CURATOR work order/task only for selected proposals.
5. Apply durable updates through the existing transactional context path and record provenance.

## Verify Steps

1. Complete fixtures containing durable and transient changes. Expected: only source-backed durable candidates are proposed; no wiki file changes automatically.
2. Submit duplicate and conflicting proposals. Expected: dedupe/consolidation evidence precedes CURATOR selection.
3. Select a proposal. Expected: a separate exact-id CURATOR task/work order owns semantic publication.
4. Trace a published item. Expected: source refs, task/PR decision, CURATOR result, and apply receipt are complete.
5. Run proposal/context/task-state tests.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-30T16:46:49.107Z — VERIFY — ok

By: TESTER

Note: Verified RF-20: proposal collection writes no wiki/fact/graph artifacts; duplicate/consolidation evidence is recorded before exact CURATOR selection; CLI builds the bounded source/canonical/SGR work pack and retains apply ownership. Checks: typecheck; focused harvest tasks 9/9; Knip baseline; CLI docs freshness; targeted ESLint; diff check.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T16:45:44.406Z, excerpt_hash=sha256:2c6461cba2f778022162c9c1a87b5a99f55c4b41bc5ba8bcbb37a548d5103444

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-WF8A0X-create-curator-gated-post-task-knowledge-proposa/.agentplane/tasks/202607221852-WF8A0X/blueprint/resolved-snapshot.json
- old_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
- current_digest: 0c96a75b3c97a38dc41f0a58424c1833887cb8e29959bca451a7e5c65645de01
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221852-WF8A0X

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221852-WF8A0X
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
