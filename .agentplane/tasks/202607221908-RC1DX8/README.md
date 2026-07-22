---
id: "202607221908-RC1DX8"
title: "Migrate runner and Hermes command boundaries"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221850-R7WS01"
  - "202607221852-71SCSW"
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
doc_updated_at: "2026-07-22T19:08:20.915Z"
doc_updated_by: "PLANNER"
description: "RF-24/RF-25 vertical slice: move runner/Hermes surfaces onto minimal session capabilities, shared supervisor use cases, typed episode results, and compatibility renderers."
sections:
  Summary: |-
    Migrate runner and Hermes command boundaries

    RF-24/RF-25 vertical slice: move runner/Hermes surfaces onto minimal session capabilities, shared supervisor use cases, typed episode results, and compatibility renderers.
  Scope: |-
    - In scope: task run/bootstrap/status/insights and Hermes projection/supervision commands, runner/process/Git/policy/knowledge capability sets, typed results/errors, human/JSON renderers, and removal of internal AgentPlane subprocess parsing.
    - Out of scope: provider release operations and context/evaluator commands.
  Plan: |-
    1. Declare runner/Hermes capabilities by preparation and execution phase.
    2. Call shared WorkOrder, supervisor, runner receipt, and evaluator use cases in-process.
    3. Centralize output, error, metrics, and exit rendering.
    4. Remove shell route parsing and broad session construction.
    5. Run adapter, episode, supervision, snapshot, and capability tests.
  Verify Steps: |-
    1. Run direct and branch_pr runner/Hermes fixtures. Expected: typed in-process results, minimal capabilities, and no lifecycle command parsing.
    2. Render human/JSON/insights outputs. Expected: compatibility and provenance are preserved.
    3. Attempt cross-phase or undeclared provider/lifecycle access. Expected: typed denial.
    4. Run runner/Hermes tests, lifecycle invariants, guards, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert runner/Hermes surfaces to explicit typed compatibility adapters without discarding receipts or work orders.
    - Do not restore raw shell route execution.
    - Re-run adapter and supervision fixtures.
  Findings: ""
id_source: "generated"
---
## Summary

Migrate runner and Hermes command boundaries

RF-24/RF-25 vertical slice: move runner/Hermes surfaces onto minimal session capabilities, shared supervisor use cases, typed episode results, and compatibility renderers.

## Scope

- In scope: task run/bootstrap/status/insights and Hermes projection/supervision commands, runner/process/Git/policy/knowledge capability sets, typed results/errors, human/JSON renderers, and removal of internal AgentPlane subprocess parsing.
- Out of scope: provider release operations and context/evaluator commands.

## Plan

1. Declare runner/Hermes capabilities by preparation and execution phase.
2. Call shared WorkOrder, supervisor, runner receipt, and evaluator use cases in-process.
3. Centralize output, error, metrics, and exit rendering.
4. Remove shell route parsing and broad session construction.
5. Run adapter, episode, supervision, snapshot, and capability tests.

## Verify Steps

1. Run direct and branch_pr runner/Hermes fixtures. Expected: typed in-process results, minimal capabilities, and no lifecycle command parsing.
2. Render human/JSON/insights outputs. Expected: compatibility and provenance are preserved.
3. Attempt cross-phase or undeclared provider/lifecycle access. Expected: typed denial.
4. Run runner/Hermes tests, lifecycle invariants, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert runner/Hermes surfaces to explicit typed compatibility adapters without discarding receipts or work orders.
- Do not restore raw shell route execution.
- Re-run adapter and supervision fixtures.

## Findings
