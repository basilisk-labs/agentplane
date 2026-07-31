---
id: "202607221908-2NDXVB"
title: "Migrate task, lifecycle, and route command boundaries"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
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
  state: "approved"
  updated_at: "2026-07-31T22:59:56.898Z"
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
    at: "2026-07-31T23:00:26.665Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-31T23:26:56.376Z"
doc_updated_by: "CODER"
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
  Findings: |-
    - Observation: Granular task and lifecycle requirements still resolve to the shared CommandContext compatibility value.
      Impact: Session access, provider laziness, and catalog requirements are enforced now, but field-level context isolation cannot be removed until the other four command-family slices converge.
      Resolution: Keep the compatibility value explicit in this slice; remove it in RF-24 fan-in after all family loaders use CommandSession profiles.
extensions:
  workflow_route_baseline:
    start_head_sha: "68b71790527489b13f868deede5a8de4552117cb"
    version: 1
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

- Observation: Granular task and lifecycle requirements still resolve to the shared CommandContext compatibility value.
  Impact: Session access, provider laziness, and catalog requirements are enforced now, but field-level context isolation cannot be removed until the other four command-family slices converge.
  Resolution: Keep the compatibility value explicit in this slice; remove it in RF-24 fan-in after all family loaders use CommandSession profiles.
