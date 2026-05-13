---
id: "202605131043-GD7RJJ"
title: "Reorganize repository scripts by ownership"
status: "TODO"
priority: "med"
owner: "PLANNER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
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
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-13T10:45:19.852Z"
doc_updated_by: "PLANNER"
description: "Split the root scripts directory into purpose-owned groups such as checks, generate, bench, release, workflow, and shared lib, updating package scripts and compatibility surfaces safely."
sections:
  Summary: |-
    Reorganize repository scripts by ownership
    
    Split the root scripts directory into purpose-owned groups such as checks, generate, bench, release, workflow, and shared lib, updating package scripts and compatibility surfaces safely.
  Scope: |-
    - In scope: Split the root scripts directory into purpose-owned groups such as checks, generate, bench, release, workflow, and shared lib, updating package scripts and compatibility surfaces safely.
    - Out of scope: unrelated refactors not required for "Reorganize repository scripts by ownership".
  Plan: |-
    1. Inventory root scripts by purpose and current package.json callers.
    2. Move scripts into scripts/checks, scripts/generate, scripts/bench, scripts/release, scripts/workflow, and scripts/lib with compatibility wrappers only where needed.
    3. Update package scripts, docs, CI references, and tests in one controlled sweep.
    4. Verify scripts README generation, package scripts, and selected CI/check commands.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Reorganize repository scripts by ownership

Split the root scripts directory into purpose-owned groups such as checks, generate, bench, release, workflow, and shared lib, updating package scripts and compatibility surfaces safely.

## Scope

- In scope: Split the root scripts directory into purpose-owned groups such as checks, generate, bench, release, workflow, and shared lib, updating package scripts and compatibility surfaces safely.
- Out of scope: unrelated refactors not required for "Reorganize repository scripts by ownership".

## Plan

1. Inventory root scripts by purpose and current package.json callers.
2. Move scripts into scripts/checks, scripts/generate, scripts/bench, scripts/release, scripts/workflow, and scripts/lib with compatibility wrappers only where needed.
3. Update package scripts, docs, CI references, and tests in one controlled sweep.
4. Verify scripts README generation, package scripts, and selected CI/check commands.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
