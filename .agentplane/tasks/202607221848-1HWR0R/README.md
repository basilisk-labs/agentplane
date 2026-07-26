---
id: "202607221848-1HWR0R"
title: "Return typed task mutation results"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202607221848-0ZAB1F"
tags:
  - "milestone-alpha2"
  - "mutation"
  - "refactor"
  - "rf-07"
  - "tasks"
  - "v0.7"
  - "wave-contracts"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run task-state:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-26T08:10:29.107Z"
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
    at: "2026-07-26T08:11:00.044Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-26T08:11:00.044Z"
doc_updated_by: "CODER"
description: "RF-07: make create and mutation use cases return exact task id, revision, backend identity, artifact paths, and recovery data instead of list-before/list-after discovery."
sections:
  Summary: |-
    Return typed task mutation results

    RF-07: make create and mutation use cases return exact task id, revision, backend identity, artifact paths, and recovery data instead of list-before/list-after discovery.
  Scope: |-
    - In scope: typed results for task creation and relevant mutations, local/backend parity, context ingest and batch harvesting callers, concurrency tests, and partial-failure recovery identifiers.
    - Out of scope: changing task identity format or introducing cross-system distributed transactions.
  Plan: |-
    1. Define TaskCreationResult and shared mutation result contracts.
    2. Return them from local and backend implementations through the common mutation executor.
    3. Remove list-before/list-after task-id discovery from context and batch callers.
    4. Persist exact recovery identifiers before subsequent filesystem phases.
    5. Add concurrent creation, backend parity, idempotency, and partial-failure tests.
  Verify Steps: |-
    1. Create tasks concurrently through local and backend fixtures. Expected: each caller receives its exact id/revision/backend/artifact set with no registry diff scan.
    2. Inject a failure after task creation. Expected: retry resumes from the returned identity and does not create a duplicate.
    3. Search context ingest and batch harvesting for list-before/list-after discovery. Expected: migrated paths use typed results only.
    4. Run focused task/context tests, `bun run task-state:check`, and `bun run typecheck`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) while preserving unrelated task and migration state.
    - Restore the previous compatibility view or persisted contract version.
    - Re-run focused contract, migration, and type checks.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "5b5d36e5363277b35b80ece2dc4f70927e4ce00e"
    version: 1
id_source: "generated"
---
## Summary

Return typed task mutation results

RF-07: make create and mutation use cases return exact task id, revision, backend identity, artifact paths, and recovery data instead of list-before/list-after discovery.

## Scope

- In scope: typed results for task creation and relevant mutations, local/backend parity, context ingest and batch harvesting callers, concurrency tests, and partial-failure recovery identifiers.
- Out of scope: changing task identity format or introducing cross-system distributed transactions.

## Plan

1. Define TaskCreationResult and shared mutation result contracts.
2. Return them from local and backend implementations through the common mutation executor.
3. Remove list-before/list-after task-id discovery from context and batch callers.
4. Persist exact recovery identifiers before subsequent filesystem phases.
5. Add concurrent creation, backend parity, idempotency, and partial-failure tests.

## Verify Steps

1. Create tasks concurrently through local and backend fixtures. Expected: each caller receives its exact id/revision/backend/artifact set with no registry diff scan.
2. Inject a failure after task creation. Expected: retry resumes from the returned identity and does not create a duplicate.
3. Search context ingest and batch harvesting for list-before/list-after discovery. Expected: migrated paths use typed results only.
4. Run focused task/context tests, `bun run task-state:check`, and `bun run typecheck`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) while preserving unrelated task and migration state.
- Restore the previous compatibility view or persisted contract version.
- Re-run focused contract, migration, and type checks.

## Findings
