---
id: "202607221854-SDPFN0"
title: "Migrate command families to granular session capabilities"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221854-RW8CJF"
tags:
  - "cli"
  - "command-session"
  - "migration"
  - "milestone-rc2"
  - "refactor"
  - "rf-24"
  - "v0.7"
  - "wave-internals"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run arch:check"
  - "bun run ci:contract"
  - "bun run guards:check"
  - "bun run test:critical"
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
doc_updated_at: "2026-07-22T18:54:20.483Z"
doc_updated_by: "PLANNER"
description: "RF-24b: move all remaining public and internal command families onto the granular CommandSession model by vertical slice without eager project/task/Git/provider preparation."
sections:
  Summary: |-
    Migrate command families to granular session capabilities

    RF-24b: move all remaining public and internal command families onto the granular CommandSession model by vertical slice without eager project/task/Git/provider preparation.
  Scope: |-
    - In scope: lifecycle, evaluator, context, runner, Hermes, release/ops, docs/help, and remaining command loaders/catalog entries; deletion of coarse requirements after parity; preparation profiles and compatibility snapshots.
    - Out of scope: changing user-visible command behavior except documented v0.7 contract migrations.
  Plan: |-
    1. Inventory remaining commands and group migrations by shared capability boundary.
    2. Migrate each family with typed result/renderer and lazy resolver parity.
    3. Remove manual loader/session wiring made redundant by declarative manifests where safe.
    4. Delete coarse CommandNeeds only after zero consumers remain.
    5. Compare startup/preparation profiles and full command snapshots.
  Verify Steps: |-
    1. Inspect every command catalog entry. Expected: granular requirements are explicit and no handler receives a broader session than declared.
    2. Run command/help/JSON snapshot suites. Expected: compatibility holds except approved v0.7 migrations.
    3. Profile simple and complex commands. Expected: unused project/task/Git/provider nodes are absent and preparation cost is attributable.
    4. Search for coarse CommandNeeds and manual duplicate loader metadata. Expected: no active production consumer remains.
    5. Run critical tests, arch/guard checks, contract CI, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert one vertical slice at a time to the explicit compatibility adapter.
    - Do not restore removed coarse APIs without updating the architecture baseline and dependent task plans.
    - Re-run full command snapshots and contract checks.
  Findings: ""
id_source: "generated"
---
## Summary

Migrate command families to granular session capabilities

RF-24b: move all remaining public and internal command families onto the granular CommandSession model by vertical slice without eager project/task/Git/provider preparation.

## Scope

- In scope: lifecycle, evaluator, context, runner, Hermes, release/ops, docs/help, and remaining command loaders/catalog entries; deletion of coarse requirements after parity; preparation profiles and compatibility snapshots.
- Out of scope: changing user-visible command behavior except documented v0.7 contract migrations.

## Plan

1. Inventory remaining commands and group migrations by shared capability boundary.
2. Migrate each family with typed result/renderer and lazy resolver parity.
3. Remove manual loader/session wiring made redundant by declarative manifests where safe.
4. Delete coarse CommandNeeds only after zero consumers remain.
5. Compare startup/preparation profiles and full command snapshots.

## Verify Steps

1. Inspect every command catalog entry. Expected: granular requirements are explicit and no handler receives a broader session than declared.
2. Run command/help/JSON snapshot suites. Expected: compatibility holds except approved v0.7 migrations.
3. Profile simple and complex commands. Expected: unused project/task/Git/provider nodes are absent and preparation cost is attributable.
4. Search for coarse CommandNeeds and manual duplicate loader metadata. Expected: no active production consumer remains.
5. Run critical tests, arch/guard checks, contract CI, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert one vertical slice at a time to the explicit compatibility adapter.
- Do not restore removed coarse APIs without updating the architecture baseline and dependent task plans.
- Re-run full command snapshots and contract checks.

## Findings
