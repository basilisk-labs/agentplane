---
id: "202605030530-TB2GDS"
title: "Prepare next patch release after task cleanup"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "frontend"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T05:30:26.766Z"
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
    body: "Start: recovering pending release and recipes trust deltas on a fresh branch_pr worktree before preparing the next patch release candidate."
events:
  -
    type: "status"
    at: "2026-05-03T05:31:08.916Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: recovering pending release and recipes trust deltas on a fresh branch_pr worktree before preparing the next patch release candidate."
doc_version: 3
doc_updated_at: "2026-05-03T05:31:08.916Z"
doc_updated_by: "CODER"
description: "Recover the useful pending branch deltas, confirm recipe listing behavior, and prepare the next patch release candidate."
sections:
  Summary: |-
    Prepare next patch release after task cleanup
    
    Recover the useful pending branch deltas, confirm recipe listing behavior, and prepare the next patch release candidate.
  Scope: |-
    - In scope: Recover the useful pending branch deltas, confirm recipe listing behavior, and prepare the next patch release candidate.
    - Out of scope: unrelated refactors not required for "Prepare next patch release after task cleanup".
  Plan: "1. Start from current main after task-close PR #784. 2. Recover only useful pending deltas from old work branches: recipes 2026-06 trust key and release distribution metadata, excluding stale homepage regressions. 3. Verify public website recipes listing still renders remote catalog cards. 4. Run targeted release/recipes checks. 5. Prepare next patch release candidate using branch_pr release flow."
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

Prepare next patch release after task cleanup

Recover the useful pending branch deltas, confirm recipe listing behavior, and prepare the next patch release candidate.

## Scope

- In scope: Recover the useful pending branch deltas, confirm recipe listing behavior, and prepare the next patch release candidate.
- Out of scope: unrelated refactors not required for "Prepare next patch release after task cleanup".

## Plan

1. Start from current main after task-close PR #784. 2. Recover only useful pending deltas from old work branches: recipes 2026-06 trust key and release distribution metadata, excluding stale homepage regressions. 3. Verify public website recipes listing still renders remote catalog cards. 4. Run targeted release/recipes checks. 5. Prepare next patch release candidate using branch_pr release flow.

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
