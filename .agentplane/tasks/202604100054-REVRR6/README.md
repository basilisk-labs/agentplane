---
id: "202604100054-REVRR6"
title: "Prevent finish from mutating task docs before DONE validation"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-10T00:55:39.085Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-10T00:54:48.139Z"
doc_updated_by: "ORCHESTRATOR"
description: "Fix finish so structured findings do not append to task README before already-DONE and --force validation completes; add regression coverage for failure without mutation and idempotent forced retry."
sections:
  Summary: |-
    Prevent finish from mutating task docs before DONE validation
    
    Fix finish so structured findings do not append to task README before already-DONE and --force validation completes; add regression coverage for failure without mutation and idempotent forced retry.
  Scope: |-
    - In scope: Fix finish so structured findings do not append to task README before already-DONE and --force validation completes; add regression coverage for failure without mutation and idempotent forced retry.
    - Out of scope: unrelated refactors not required for "Prevent finish from mutating task docs before DONE validation".
  Plan: |-
    1. Reproduce finish-on-DONE with structured findings and lock the expected no-mutation behavior.
    2. Move DONE/--force validation ahead of any README/task-doc mutation in finish flow.
    3. Add regression tests for failure without mutation and forced idempotent retry.
    4. Verify with targeted unit tests and hook-safe task lifecycle.
  Verify Steps: |-
    1. Run the finish regression test that exercises `DONE` tasks with structured findings but without `--force`. Expected: the command fails and the task README is byte-for-byte unchanged.
    2. Run the forced retry/idempotence finish test. Expected: `--force` still permits the retry path without duplicating DONE metadata or structured findings.
    3. Inspect the finish flow ordering in code. Expected: DONE/force validation executes before any task-doc mutation helper is called.
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

Prevent finish from mutating task docs before DONE validation

Fix finish so structured findings do not append to task README before already-DONE and --force validation completes; add regression coverage for failure without mutation and idempotent forced retry.

## Scope

- In scope: Fix finish so structured findings do not append to task README before already-DONE and --force validation completes; add regression coverage for failure without mutation and idempotent forced retry.
- Out of scope: unrelated refactors not required for "Prevent finish from mutating task docs before DONE validation".

## Plan

1. Reproduce finish-on-DONE with structured findings and lock the expected no-mutation behavior.
2. Move DONE/--force validation ahead of any README/task-doc mutation in finish flow.
3. Add regression tests for failure without mutation and forced idempotent retry.
4. Verify with targeted unit tests and hook-safe task lifecycle.

## Verify Steps

1. Run the finish regression test that exercises `DONE` tasks with structured findings but without `--force`. Expected: the command fails and the task README is byte-for-byte unchanged.
2. Run the forced retry/idempotence finish test. Expected: `--force` still permits the retry path without duplicating DONE metadata or structured findings.
3. Inspect the finish flow ordering in code. Expected: DONE/force validation executes before any task-doc mutation helper is called.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
