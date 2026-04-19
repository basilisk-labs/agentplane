---
id: "202604191832-4F4P7G"
title: "Fix direct finish close commit after verify incident sync"
result_summary: "Direct finish/close can now coexist with incident policy writes without manual git cleanup."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "git"
  - "workflow"
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
commit:
  hash: "0a27965d0eed5fb837dc4359161917b41900d9d4"
  message: "🔧 4F4P7G workflow: stage policy mirrors in close commits"
comments:
  -
    author: "CODER"
    body: "Start: reproducing the direct-mode finish conflict where verify writes incidents artifacts and the deterministic close commit then aborts on a dirty tree."
  -
    author: "CODER"
    body: "Verified: deterministic close commits now stage policy mirrors with the task README when policy writes are part of the close payload, and the close path was validated both by unit test and by the real STZFC6 residue."
events:
  -
    type: "status"
    at: "2026-04-19T18:32:19.432Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproducing the direct-mode finish conflict where verify writes incidents artifacts and the deterministic close commit then aborts on a dirty tree."
  -
    type: "status"
    at: "2026-04-19T18:36:37.671Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: deterministic close commits now stage policy mirrors with the task README when policy writes are part of the close payload, and the close path was validated both by unit test and by the real STZFC6 residue."
doc_version: 3
doc_updated_at: "2026-04-19T18:36:37.672Z"
doc_updated_by: "CODER"
description: "Resolve the direct workflow conflict where verify updates incidents artifacts and finish/close then fails because the working tree is dirty."
sections:
  Summary: |-
    Fix direct finish close commit after verify incident sync
    
    Resolve the direct workflow conflict where verify updates incidents artifacts and finish/close then fails because the working tree is dirty.
  Scope: |-
    - In scope: Resolve the direct workflow conflict where verify updates incidents artifacts and finish/close then fails because the working tree is dirty.
    - Out of scope: unrelated refactors not required for "Fix direct finish close commit after verify incident sync".
  Plan: "1. Trace the direct finish path around verification/incident promotion and deterministic close commits to pinpoint why incident registry writes make the close route fail on a dirty tree. 2. Adjust the finish/close flow so verified incident promotions and the deterministic close commit can coexist in one direct-mode completion path without manual git cleanup. 3. Add focused tests for the regression and verify the repaired finish route before resuming the remaining epic tasks."
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

Fix direct finish close commit after verify incident sync

Resolve the direct workflow conflict where verify updates incidents artifacts and finish/close then fails because the working tree is dirty.

## Scope

- In scope: Resolve the direct workflow conflict where verify updates incidents artifacts and finish/close then fails because the working tree is dirty.
- Out of scope: unrelated refactors not required for "Fix direct finish close commit after verify incident sync".

## Plan

1. Trace the direct finish path around verification/incident promotion and deterministic close commits to pinpoint why incident registry writes make the close route fail on a dirty tree. 2. Adjust the finish/close flow so verified incident promotions and the deterministic close commit can coexist in one direct-mode completion path without manual git cleanup. 3. Add focused tests for the regression and verify the repaired finish route before resuming the remaining epic tasks.

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
