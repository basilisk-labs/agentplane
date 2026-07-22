---
id: "202607221854-SDPFN0"
title: "Complete CommandSession capability migration"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on:
  - "202607221908-TZTE5V"
  - "202607221908-2NDXVB"
  - "202607221908-YD5J89"
  - "202607221908-RC1DX8"
  - "202607221908-7WV0A7"
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
doc_updated_at: "2026-07-22T19:12:11.396Z"
doc_updated_by: "PLANNER"
description: "RF-24b fan-in: integrate the five independently verified command-family vertical slices, remove the coarse CommandNeeds compatibility layer, and prove every catalog entry has minimal typed capabilities."
sections:
  Summary: |-
    Complete CommandSession capability migration

    Integrate the five independently verified command-family vertical slices, remove the coarse CommandNeeds compatibility layer after zero consumers remain, and prove catalog-wide minimal capability and lazy preparation invariants.
  Scope: |-
    - In scope: integrate the separately verified project/config/help/docs, task/lifecycle/route, context/evaluator, runner/Hermes, and provider/release/ops capability slices; remove the coarse CommandNeeds adapter after zero consumers; validate catalog-wide requirement visibility and lazy preparation profiles.
    - Out of scope: implementing family-specific migrations inside this fan-in task.
  Plan: |-
    1. Confirm all five command-family slice tasks are DONE and based on compatible shared capability contracts.
    2. Integrate their catalog/session changes and resolve only cross-family type or registry conflicts.
    3. Remove the coarse CommandNeeds compatibility adapter when zero production consumers remain.
    4. Run catalog-wide capability, laziness, command snapshot, architecture, and preparation-profile checks.
    5. Record any residual compatibility adapter as a release blocker rather than widening this task.
  Verify Steps: |-
    1. Resolve this task's dependency closure. Expected: all five command-family vertical slices are DONE with independent verification.
    2. Inspect every command catalog entry and handler session type. Expected: granular requirements are explicit and no handler receives undeclared task/Git/provider capabilities.
    3. Search for active coarse CommandNeeds consumers and duplicate loader requirement metadata. Expected: none remain.
    4. Run command/help/JSON snapshots, preparation profiles, `bun run arch:check`, `bun run guards:check`, `bun run ci:contract`, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the fan-in integration commit while leaving independently merged family slices intact.
    - Restore only the explicit coarse compatibility adapter if cross-family integration fails; do not revert family results wholesale.
    - Re-run catalog snapshots, architecture checks, and each family verification before retry.
  Findings: ""
id_source: "generated"
---
## Summary

Complete CommandSession capability migration

Integrate the five independently verified command-family vertical slices, remove the coarse CommandNeeds compatibility layer after zero consumers remain, and prove catalog-wide minimal capability and lazy preparation invariants.

## Scope

- In scope: integrate the separately verified project/config/help/docs, task/lifecycle/route, context/evaluator, runner/Hermes, and provider/release/ops capability slices; remove the coarse CommandNeeds adapter after zero consumers; validate catalog-wide requirement visibility and lazy preparation profiles.
- Out of scope: implementing family-specific migrations inside this fan-in task.

## Plan

1. Confirm all five command-family slice tasks are DONE and based on compatible shared capability contracts.
2. Integrate their catalog/session changes and resolve only cross-family type or registry conflicts.
3. Remove the coarse CommandNeeds compatibility adapter when zero production consumers remain.
4. Run catalog-wide capability, laziness, command snapshot, architecture, and preparation-profile checks.
5. Record any residual compatibility adapter as a release blocker rather than widening this task.

## Verify Steps

1. Resolve this task's dependency closure. Expected: all five command-family vertical slices are DONE with independent verification.
2. Inspect every command catalog entry and handler session type. Expected: granular requirements are explicit and no handler receives undeclared task/Git/provider capabilities.
3. Search for active coarse CommandNeeds consumers and duplicate loader requirement metadata. Expected: none remain.
4. Run command/help/JSON snapshots, preparation profiles, `bun run arch:check`, `bun run guards:check`, `bun run ci:contract`, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the fan-in integration commit while leaving independently merged family slices intact.
- Restore only the explicit coarse compatibility adapter if cross-family integration fails; do not revert family results wholesale.
- Re-run catalog snapshots, architecture checks, and each family verification before retry.

## Findings
