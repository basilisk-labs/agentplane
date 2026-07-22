---
id: "202607221908-PWFH5K"
title: "Enforce mandatory release dependency closure"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221854-K7799B"
tags:
  - "graph"
  - "guard"
  - "milestone-rc2"
  - "release"
  - "rf-27"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run guards:check"
  - "bun run task-state:check"
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
doc_updated_at: "2026-07-22T19:08:26.450Z"
doc_updated_by: "PLANNER"
description: "RF-27 release guard: automatically prove that every required open v0.7 implementation, migration, documentation, and gate task is an ancestor of the final 0.7.0 release task."
sections:
  Summary: |-
    Enforce mandatory release dependency closure

    RF-27 release guard: automatically prove that every required open v0.7 implementation, migration, documentation, and gate task is an ancestor of the final 0.7.0 release task.
  Scope: |-
    - In scope: a generic task-DAG closure checker, required/optional release-task classification, cycle/missing/non-ancestor diagnostics, tests including RF-02/RF-20 omissions, and release/contract CI integration.
    - Out of scope: inferring semantic completion from tags alone; the final release plan declares the required root and allowed optional tasks.
  Plan: |-
    1. Define explicit metadata/config for final release root and optional prerelease/backport tasks.
    2. Traverse the canonical task dependency DAG and require every mandatory v0.7 leaf to reach the release root.
    3. Report missing, cyclic, unknown, and accidentally optional nodes with paths.
    4. Add positive/negative fixtures for the planning graph and known omission cases.
    5. Integrate the guard into task-state/release readiness checks.
  Verify Steps: |-
    1. Run the checker on the corrected v0.7 graph. Expected: every mandatory leaf has a dependency path to final 0.7.0.
    2. Remove RF-02 and RF-20 edges in fixtures. Expected: both are named as release-blocking non-ancestors.
    3. Add a cycle, unknown dependency, and optional prerelease task. Expected: precise errors for the first two and explicit acceptance only for declared optional nodes.
    4. Run guards, task-state, focused tests, and release readiness.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the checker and its CI hook together without changing task dependencies.
    - Preserve the corrected release fan-in in task documents.
    - Re-run the previous task-state check and manually record closure evidence until the guard is restored.
  Findings: ""
id_source: "generated"
---
## Summary

Enforce mandatory release dependency closure

RF-27 release guard: automatically prove that every required open v0.7 implementation, migration, documentation, and gate task is an ancestor of the final 0.7.0 release task.

## Scope

- In scope: a generic task-DAG closure checker, required/optional release-task classification, cycle/missing/non-ancestor diagnostics, tests including RF-02/RF-20 omissions, and release/contract CI integration.
- Out of scope: inferring semantic completion from tags alone; the final release plan declares the required root and allowed optional tasks.

## Plan

1. Define explicit metadata/config for final release root and optional prerelease/backport tasks.
2. Traverse the canonical task dependency DAG and require every mandatory v0.7 leaf to reach the release root.
3. Report missing, cyclic, unknown, and accidentally optional nodes with paths.
4. Add positive/negative fixtures for the planning graph and known omission cases.
5. Integrate the guard into task-state/release readiness checks.

## Verify Steps

1. Run the checker on the corrected v0.7 graph. Expected: every mandatory leaf has a dependency path to final 0.7.0.
2. Remove RF-02 and RF-20 edges in fixtures. Expected: both are named as release-blocking non-ancestors.
3. Add a cycle, unknown dependency, and optional prerelease task. Expected: precise errors for the first two and explicit acceptance only for declared optional nodes.
4. Run guards, task-state, focused tests, and release readiness.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the checker and its CI hook together without changing task dependencies.
- Preserve the corrected release fan-in in task documents.
- Re-run the previous task-state check and manually record closure evidence until the guard is restored.

## Findings
