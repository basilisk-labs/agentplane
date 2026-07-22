---
id: "202607221908-TZTE5V"
title: "Migrate project, config, help, and docs command boundaries"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
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
  - "bun run docs:cli:check"
  - "bun run guards:check"
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
doc_updated_at: "2026-07-22T19:08:12.619Z"
doc_updated_by: "PLANNER"
description: "RF-24/RF-25 vertical slice: give project/config/help/docs commands minimal typed session capabilities and typed results with centralized compatibility renderers."
sections:
  Summary: |-
    Migrate project, config, help, and docs command boundaries

    RF-24/RF-25 vertical slice: give project/config/help/docs commands minimal typed session capabilities and typed results with centralized compatibility renderers.
  Scope: |-
    - In scope: project/config/runtime explain/help/docs command catalog requirements, lazy session preparation, typed use-case result/error unions, human/JSON renderers, help/docs generation parity, and removal of direct stdout/business coupling in this family.
    - Out of scope: task, context, runner, provider, or release command families.
  Plan: |-
    1. Inventory the family commands and declare minimal project/config/output capabilities.
    2. Extract typed results/errors from command handlers.
    3. Centralize human/JSON/help rendering and exit mapping.
    4. Remove eager task/Git/provider preparation and duplicate loader metadata.
    5. Run family snapshots, docs generation, laziness, and denial tests.
  Verify Steps: |-
    1. Execute project/config/help/docs fixtures. Expected: no task/Git/provider capability loads and typed results render compatible human/JSON output.
    2. Attempt undeclared session access. Expected: compile-time or typed boundary failure.
    3. Regenerate CLI/docs surfaces. Expected: no output/reference drift.
    4. Run family tests, docs CLI check, guards, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert only this command family to the explicit legacy session/result adapter.
    - Preserve the shared capability and renderer contracts for other slices.
    - Re-run family snapshots and docs generation.
  Findings: ""
id_source: "generated"
---
## Summary

Migrate project, config, help, and docs command boundaries

RF-24/RF-25 vertical slice: give project/config/help/docs commands minimal typed session capabilities and typed results with centralized compatibility renderers.

## Scope

- In scope: project/config/runtime explain/help/docs command catalog requirements, lazy session preparation, typed use-case result/error unions, human/JSON renderers, help/docs generation parity, and removal of direct stdout/business coupling in this family.
- Out of scope: task, context, runner, provider, or release command families.

## Plan

1. Inventory the family commands and declare minimal project/config/output capabilities.
2. Extract typed results/errors from command handlers.
3. Centralize human/JSON/help rendering and exit mapping.
4. Remove eager task/Git/provider preparation and duplicate loader metadata.
5. Run family snapshots, docs generation, laziness, and denial tests.

## Verify Steps

1. Execute project/config/help/docs fixtures. Expected: no task/Git/provider capability loads and typed results render compatible human/JSON output.
2. Attempt undeclared session access. Expected: compile-time or typed boundary failure.
3. Regenerate CLI/docs surfaces. Expected: no output/reference drift.
4. Run family tests, docs CLI check, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert only this command family to the explicit legacy session/result adapter.
- Preserve the shared capability and renderer contracts for other slices.
- Re-run family snapshots and docs generation.

## Findings
