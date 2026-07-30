---
id: "202607300246-Q3RDCW"
title: "Fix diverged-head recovery upstream binding"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "followup"
  - "recovery"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T02:48:57.625Z"
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
    author: "ORCHESTRATOR"
    body: "Start: reproduce the unbound remote-tracking recovery path, apply only the bounded upstream fix, and preserve all fail-closed recovery guarantees."
events:
  -
    type: "status"
    at: "2026-07-30T02:49:03.365Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the unbound remote-tracking recovery path, apply only the bounded upstream fix, and preserve all fail-closed recovery guarantees."
doc_version: 3
doc_updated_at: "2026-07-30T02:49:03.365Z"
doc_updated_by: "ORCHESTRATOR"
description: "Correct the recovery command so its fetched provider tracking ref is bound as a valid upstream before the bounded hard reset. Preserve the archive-first and fail-closed guarantees; add a regression test that exercises the exact remote-tracking ref form observed in the beta.1 recovery."
sections:
  Summary: |-
    Fix diverged-head recovery upstream binding

    Correct the recovery command so its fetched provider tracking ref is bound as a valid upstream before the bounded hard reset. Preserve the archive-first and fail-closed guarantees; add a regression test that exercises the exact remote-tracking ref form observed in the beta.1 recovery.
  Scope: |-
    - In scope: Correct the recovery command so its fetched provider tracking ref is bound as a valid upstream before the bounded hard reset. Preserve the archive-first and fail-closed guarantees; add a regression test that exercises the exact remote-tracking ref form observed in the beta.1 recovery.
    - Out of scope: unrelated refactors not required for "Fix diverged-head recovery upstream binding".
  Plan: "1. Reproduce recovery from a branch with no configured upstream and only a raw fetched provider tracking ref. 2. Bind the recovery worktree to the exact refs/remotes/origin provider ref before the bounded reset; preserve archive-first validation and all fail-closed checks. 3. Add regression coverage for the exact binding form and retain stale-head/collision guarantees. 4. Run focused recovery tests, declared verification review, and the contract gate; publish through the branch_pr lifecycle."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

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
extensions:
  workflow_route_baseline:
    start_head_sha: "ee5ea7178ba961f1e17ae3a925cb6b81469c41d7"
    version: 1
id_source: "generated"
---
## Summary

Fix diverged-head recovery upstream binding

Correct the recovery command so its fetched provider tracking ref is bound as a valid upstream before the bounded hard reset. Preserve the archive-first and fail-closed guarantees; add a regression test that exercises the exact remote-tracking ref form observed in the beta.1 recovery.

## Scope

- In scope: Correct the recovery command so its fetched provider tracking ref is bound as a valid upstream before the bounded hard reset. Preserve the archive-first and fail-closed guarantees; add a regression test that exercises the exact remote-tracking ref form observed in the beta.1 recovery.
- Out of scope: unrelated refactors not required for "Fix diverged-head recovery upstream binding".

## Plan

1. Reproduce recovery from a branch with no configured upstream and only a raw fetched provider tracking ref. 2. Bind the recovery worktree to the exact refs/remotes/origin provider ref before the bounded reset; preserve archive-first validation and all fail-closed checks. 3. Add regression coverage for the exact binding form and retain stale-head/collision guarantees. 4. Run focused recovery tests, declared verification review, and the contract gate; publish through the branch_pr lifecycle.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

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
