---
id: "202607221850-8HBF4J"
title: "Supervise context assimilation post-processing"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on:
  - "202607221848-ER5H6N"
  - "202607221849-8YYZ9X"
  - "202607221850-DRWR0V"
  - "202607221850-WM9X1G"
  - "202607242236-1BFWEY"
tags:
  - "context"
  - "curator"
  - "milestone-beta1"
  - "refactor"
  - "rf-11"
  - "rf-25"
  - "supervisor"
  - "v0.7"
  - "wave-supervisor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run coverage:workflow-suite"
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T13:53:03.642Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit:
  hash: "47c01f6c33ca35c36d7b53d4d5a03d891384c1e3"
  message: "Implement supervised context assimilation post-processing"
comments:
  -
    author: "CODER"
    body: "Start: implement the supervised, resumable mechanical post-processing for context assimilation while preserving CURATOR semantic ownership."
  -
    author: "CODER"
    body: "Implemented: supervised context assimilation post-processing; CURATOR emits only semantic SGR while CLI journals resumable mechanical phases and bounded evaluator rework. Local checks: typecheck; focused core/context tests (43); workflow coverage (52); compatibility contract; formatting and lint."
events:
  -
    type: "status"
    at: "2026-07-28T13:53:08.890Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the supervised, resumable mechanical post-processing for context assimilation while preserving CURATOR semantic ownership."
  -
    type: "status"
    at: "2026-07-28T14:48:51.340Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implemented: supervised context assimilation post-processing; CURATOR emits only semantic SGR while CLI journals resumable mechanical phases and bounded evaluator rework. Local checks: typecheck; focused core/context tests (43); workflow coverage (52); compatibility contract; formatting and lint."
doc_version: 3
doc_updated_at: "2026-07-28T14:48:51.340Z"
doc_updated_by: "CODER"
description: "RF-11/RF-25b: after the CURATOR semantic result, let the supervisor validate/apply, reindex, build/lint wiki, validate graph, run coverage/checks, evaluate, create ACR, and finalize with resumable mechanical operations."
sections:
  Summary: |-
    Supervise context assimilation post-processing

    RF-11/RF-25b: after the CURATOR semantic result, let the supervisor validate/apply, reindex, build/lint wiki, validate graph, run coverage/checks, evaluate, create ACR, and finalize with resumable mechanical operations.
  Scope: |-
    - In scope: typed in-process context use-case results, supervisor operation registry for every mechanical assimilation phase, separate CURATOR rework work orders, retry from failed operation, and removal of lifecycle command lists from CURATOR prompts.
    - Out of scope: changing the CURATOR's semantic identity, synthesis, or ambiguity decisions.
  Plan: |-
    1. Convert context apply/reindex/wiki/graph/coverage/check/evaluate/ACR/finalize commands into typed idempotent operations.
    2. Execute them through the common supervisor and ingestion journal.
    3. Reduce CURATOR input/output to semantic responsibilities and the typed result contract.
    4. Return mechanical failures as operation failures and semantic failures as a new CURATOR work order.
    5. Add complete, crash/retry, validation-failure, evaluator-rework, and stale-result scenarios.
  Verify Steps: "1. Inspect the generated CURATOR work order. Expected: no list of mechanical completion commands; semantic responsibilities, evidence, output schema, budget reference, and stop rules remain. 2. Run a successful assimilation fixture. Expected: every mechanical phase is CLI-observed, journaled, bounded by 202607242236-1BFWEY, and finalized without CURATOR lifecycle calls. 3. Fail each mechanical gate in turn and restart after each durable phase. Expected: retry resumes that operation without new reasoning, duplicate apply, replayed CURATOR work, or lost budget usage. 4. Return evaluator semantic rework repeatedly. Expected: each separate CURATOR work order receives only bounded feedback, shares the durable episode budget/cursor, and terminates at the episode/token/no-progress limit. 5. Run focused context/supervisor tests, workflow coverage, lifecycle invariants, guards, and typecheck."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
    - Restore the previous compatibility path behind an explicit feature/compatibility boundary.
    - Re-run lifecycle, focused, and type checks before resuming dependent work.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "322533fd11f322aadf4e77a44d4343c0c6c19341"
    version: 1
id_source: "generated"
---
## Summary

Supervise context assimilation post-processing

RF-11/RF-25b: after the CURATOR semantic result, let the supervisor validate/apply, reindex, build/lint wiki, validate graph, run coverage/checks, evaluate, create ACR, and finalize with resumable mechanical operations.

## Scope

- In scope: typed in-process context use-case results, supervisor operation registry for every mechanical assimilation phase, separate CURATOR rework work orders, retry from failed operation, and removal of lifecycle command lists from CURATOR prompts.
- Out of scope: changing the CURATOR's semantic identity, synthesis, or ambiguity decisions.

## Plan

1. Convert context apply/reindex/wiki/graph/coverage/check/evaluate/ACR/finalize commands into typed idempotent operations.
2. Execute them through the common supervisor and ingestion journal.
3. Reduce CURATOR input/output to semantic responsibilities and the typed result contract.
4. Return mechanical failures as operation failures and semantic failures as a new CURATOR work order.
5. Add complete, crash/retry, validation-failure, evaluator-rework, and stale-result scenarios.

## Verify Steps

1. Inspect the generated CURATOR work order. Expected: no list of mechanical completion commands; semantic responsibilities, evidence, output schema, budget reference, and stop rules remain. 2. Run a successful assimilation fixture. Expected: every mechanical phase is CLI-observed, journaled, bounded by 202607242236-1BFWEY, and finalized without CURATOR lifecycle calls. 3. Fail each mechanical gate in turn and restart after each durable phase. Expected: retry resumes that operation without new reasoning, duplicate apply, replayed CURATOR work, or lost budget usage. 4. Return evaluator semantic rework repeatedly. Expected: each separate CURATOR work order receives only bounded feedback, shares the durable episode budget/cursor, and terminates at the episode/token/no-progress limit. 5. Run focused context/supervisor tests, workflow coverage, lifecycle invariants, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
- Restore the previous compatibility path behind an explicit feature/compatibility boundary.
- Re-run lifecycle, focused, and type checks before resuming dependent work.

## Findings
