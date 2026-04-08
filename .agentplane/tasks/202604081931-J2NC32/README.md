---
id: "202604081931-J2NC32"
title: "Add explicit verify incident collection path"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "incidents"
  - "ux"
verify: []
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
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-08T19:39:44.588Z"
doc_updated_by: "PLANNER"
description: "Add an explicit verify flag that records structured findings and immediately runs incidents collection so operators can update incidents.md in one command when desired."
sections:
  Summary: |-
    Add explicit verify incident collection path

    Add an explicit verify flag that records structured findings and immediately runs incidents collection so operators can update incidents.md in one command when desired.
  Scope: |-
    - In scope: Add an explicit verify flag that records structured findings and immediately runs incidents collection so operators can update incidents.md in one command when desired.
    - Out of scope: unrelated refactors not required for "Add explicit verify incident collection path".
  Plan: |-
    1. Add an explicit verify flag that runs incidents collection after the verification record is written.
    2. Keep the default verify behavior unchanged when the new flag is absent.
    3. Add focused coverage for verify plus collect in one command, then validate docs/spec output in touched scope.
  Verify Steps: |-
    1. Run the `verify/incidents` focused test suite. Expected: verify with the new explicit flag updates `incidents.md` immediately, while the default verify path stays unchanged.
    2. Run eslint on touched verify/incidents files. Expected: no lint violations in the modified scope.
    3. Re-check command help/spec output in touched files. Expected: the new flag is documented without changing unrelated lifecycle semantics.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add explicit verify incident collection path

Add an explicit verify flag that records structured findings and immediately runs incidents collection so operators can update incidents.md in one command when desired.

## Scope

- In scope: Add an explicit verify flag that records structured findings and immediately runs incidents collection so operators can update incidents.md in one command when desired.
- Out of scope: unrelated refactors not required for "Add explicit verify incident collection path".

## Plan

1. Add an explicit verify flag that runs incidents collection after the verification record is written.
2. Keep the default verify behavior unchanged when the new flag is absent.
3. Add focused coverage for verify plus collect in one command, then validate docs/spec output in touched scope.

## Verify Steps

1. Run the `verify/incidents` focused test suite. Expected: verify with the new explicit flag updates `incidents.md` immediately, while the default verify path stays unchanged.
2. Run eslint on touched verify/incidents files. Expected: no lint violations in the modified scope.
3. Re-check command help/spec output in touched files. Expected: the new flag is documented without changing unrelated lifecycle semantics.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
