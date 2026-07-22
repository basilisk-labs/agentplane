---
id: "202607221908-2NDXVB"
title: "Migrate task, lifecycle, and route command boundaries"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221848-VBV9B1"
  - "202607221848-VC4VVS"
  - "202607221854-RW8CJF"
tags:
  - "milestone-rc2"
  - "refactor"
  - "rf-24"
  - "rf-25"
  - "v0.7"
  - "vertical-slice"
  - "wave-internals"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run guards:check"
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-22T19:08:15.375Z"
doc_updated_by: "PLANNER"
description: "RF-24/RF-25 vertical slice: move task/lifecycle/route commands to granular sessions, typed workflow results, and centralized renderers without reconstructing route state or parsing stdout."
sections:
  Summary: |-
    Migrate task, lifecycle, and route command boundaries

    RF-24/RF-25 vertical slice: move task/lifecycle/route commands to granular sessions, typed workflow results, and centralized renderers without reconstructing route state or parsing stdout.
  Scope: |-
    - In scope: task read/write, plan/start/verify/finish, brief/next-action/status, worktree/PR route projections, granular backend/Git/route/policy capabilities, typed results/errors, and human/JSON compatibility rendering.
    - Out of scope: context, runner/Hermes, and provider/release operation execution.
  Plan: |-
    1. Group task/lifecycle/route handlers by exact capability sets.
    2. Route all decisions through typed WorkflowStep/WorkOrder results.
    3. Extract typed mutations and renderers from command IO.
    4. Remove duplicate route reconstruction and broad session access.
    5. Run lifecycle matrix, local/backend parity, snapshots, and laziness tests.
  Verify Steps: |-
    1. Exercise every lifecycle phase in direct and branch_pr fixtures. Expected: one typed route result supplies compatible outputs and exact capabilities.
    2. Attempt undeclared backend/Git/provider access. Expected: denied before side effects.
    3. Search this family for stdout parsing and independent route classification. Expected: none remain.
    4. Run task/route tests, lifecycle invariants, guards, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert this family to explicit compatibility adapters without changing persisted task truth.
    - Restore the prior renderer only for the affected commands.
    - Re-run lifecycle and backend parity fixtures.
  Findings: ""
id_source: "generated"
---
## Summary

Migrate task, lifecycle, and route command boundaries

RF-24/RF-25 vertical slice: move task/lifecycle/route commands to granular sessions, typed workflow results, and centralized renderers without reconstructing route state or parsing stdout.

## Scope

- In scope: task read/write, plan/start/verify/finish, brief/next-action/status, worktree/PR route projections, granular backend/Git/route/policy capabilities, typed results/errors, and human/JSON compatibility rendering.
- Out of scope: context, runner/Hermes, and provider/release operation execution.

## Plan

1. Group task/lifecycle/route handlers by exact capability sets.
2. Route all decisions through typed WorkflowStep/WorkOrder results.
3. Extract typed mutations and renderers from command IO.
4. Remove duplicate route reconstruction and broad session access.
5. Run lifecycle matrix, local/backend parity, snapshots, and laziness tests.

## Verify Steps

1. Exercise every lifecycle phase in direct and branch_pr fixtures. Expected: one typed route result supplies compatible outputs and exact capabilities.
2. Attempt undeclared backend/Git/provider access. Expected: denied before side effects.
3. Search this family for stdout parsing and independent route classification. Expected: none remain.
4. Run task/route tests, lifecycle invariants, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert this family to explicit compatibility adapters without changing persisted task truth.
- Restore the prior renderer only for the affected commands.
- Re-run lifecycle and backend parity fixtures.

## Findings
