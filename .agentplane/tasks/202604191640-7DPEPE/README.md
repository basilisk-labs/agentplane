---
id: "202604191640-7DPEPE"
title: "Reduce shared directory to justified cross-cutting helpers"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T21:01:36.710Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: classify shared-root files by real consumers, move non-cross-cutting helpers into domain-local modules, and leave only justified repo-wide utilities in packages/agentplane/src/shared."
events:
  -
    type: "status"
    at: "2026-04-19T21:01:37.226Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: classify shared-root files by real consumers, move non-cross-cutting helpers into domain-local modules, and leave only justified repo-wide utilities in packages/agentplane/src/shared."
doc_version: 3
doc_updated_at: "2026-04-19T21:01:37.232Z"
doc_updated_by: "CODER"
description: "Epic B′. Remove or relocate leftover shared helpers so only justified cross-cutting files remain."
sections:
  Summary: |-
    Reduce shared directory to justified cross-cutting helpers
    
    Epic B′. Remove or relocate leftover shared helpers so only justified cross-cutting files remain.
  Scope: |-
    - In scope: Epic B′. Remove or relocate leftover shared helpers so only justified cross-cutting files remain.
    - Out of scope: unrelated refactors not required for "Reduce shared directory to justified cross-cutting helpers".
  Plan: "1. Inventory packages/agentplane/src/shared by actual import graph and classify each file as true cross-cutting, CLI-only, runtime-only, command-only, or meta-only. 2. Relocate non-cross-cutting helpers next to their dominant consumers instead of preserving a broad shared bucket. 3. Update imports/tests, then verify the shared root shrinks materially while touched suites stay green. 4. Finish the task with traceable evidence and use the result to close epic B-prime."
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

Reduce shared directory to justified cross-cutting helpers

Epic B′. Remove or relocate leftover shared helpers so only justified cross-cutting files remain.

## Scope

- In scope: Epic B′. Remove or relocate leftover shared helpers so only justified cross-cutting files remain.
- Out of scope: unrelated refactors not required for "Reduce shared directory to justified cross-cutting helpers".

## Plan

1. Inventory packages/agentplane/src/shared by actual import graph and classify each file as true cross-cutting, CLI-only, runtime-only, command-only, or meta-only. 2. Relocate non-cross-cutting helpers next to their dominant consumers instead of preserving a broad shared bucket. 3. Update imports/tests, then verify the shared root shrinks materially while touched suites stay green. 4. Finish the task with traceable evidence and use the result to close epic B-prime.

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
