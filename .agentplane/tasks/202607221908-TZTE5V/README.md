---
id: "202607221908-TZTE5V"
title: "Migrate project, config, help, and docs command boundaries"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
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
  state: "approved"
  updated_at: "2026-08-01T00:02:03.655Z"
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
    at: "2026-08-01T00:02:27.922Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-01T00:21:05.286Z"
doc_updated_by: "CODER"
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
  Findings: |-
    - Observation: The clean main baseline help registry snapshot did not match the current command catalog.
      Impact: The help snapshot suite failed before this task's implementation could be evaluated.
      Resolution: Reproduced the failure at main commit 0dca3d627916e8c36ecf46bcbbb523a3b0013317 and refreshed only the help snapshot owned by this vertical slice.
      Promotion: incident-candidate
      Fixability: repo-fixable
extensions:
  workflow_route_baseline:
    start_head_sha: "0dca3d627916e8c36ecf46bcbbb523a3b0013317"
    version: 1
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

- Observation: The clean main baseline help registry snapshot did not match the current command catalog.
  Impact: The help snapshot suite failed before this task's implementation could be evaluated.
  Resolution: Reproduced the failure at main commit 0dca3d627916e8c36ecf46bcbbb523a3b0013317 and refreshed only the help snapshot owned by this vertical slice.
  Promotion: incident-candidate
  Fixability: repo-fixable
