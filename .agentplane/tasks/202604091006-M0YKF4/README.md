---
id: "202604091006-M0YKF4"
title: "Point DONE PR-artifact drift recovery at targeted normalize"
result_summary: "integrate: squash task/202604091006-M0YKF4/done-pr-drift-guidance"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "ux"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T10:14:17.813Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T10:16:49.332Z"
  updated_by: "REVIEWER"
  note: "doctor.command tests passed with the updated DONE drift guidance and eslint passed on touched doctor files after framework bootstrap."
commit:
  hash: "6207bbe144dae4b3096eed2185004423d1be742b"
  message: "🧩 M0YKF4 integrate: workflow/ux: Point DONE PR-artifact drift recovery at targeted normalize"
comments:
  -
    author: "CODER"
    body: "Start: fix DONE branch_pr drift guidance so operators are pointed at the targeted normalize recovery path instead of a read-only PR check."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604091006-M0YKF4/pr."
events:
  -
    type: "status"
    at: "2026-04-09T10:14:20.066Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix DONE branch_pr drift guidance so operators are pointed at the targeted normalize recovery path instead of a read-only PR check."
  -
    type: "verify"
    at: "2026-04-09T10:16:49.332Z"
    author: "REVIEWER"
    state: "ok"
    note: "doctor.command tests passed with the updated DONE drift guidance and eslint passed on touched doctor files after framework bootstrap."
  -
    type: "status"
    at: "2026-04-09T10:36:24.951Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604091006-M0YKF4/pr."
doc_version: 3
doc_updated_at: "2026-04-09T10:36:24.965Z"
doc_updated_by: "INTEGRATOR"
description: "Update diagnostics and docs so DONE branch_pr tasks with stale OPEN PR artifacts recommend the actual recovery path: task normalize --sync-hosted-merges --task-id <task-id>, not pr check."
sections:
  Summary: |-
    Point DONE PR-artifact drift recovery at targeted normalize
    
    Update diagnostics and docs so DONE branch_pr tasks with stale OPEN PR artifacts recommend the actual recovery path: task normalize --sync-hosted-merges --task-id <task-id>, not pr check.
  Scope: |-
    - In scope: update doctor/help guidance for DONE branch_pr tasks with stale OPEN PR artifacts; add focused regression coverage.
    - Out of scope: unrelated doctor diagnostics or new reconcile commands beyond the existing targeted normalize path.
  Plan: "1. Reproduce the current doctor/help guidance for DONE branch_pr tasks whose PR artifacts still say OPEN after shipment. 2. Update the diagnostic next action to point at the existing targeted recovery path task normalize --sync-hosted-merges --task-id <task-id>. 3. Verify with focused doctor/help tests and touched lint/test checks."
  Verify Steps: |-
    1. Run the focused doctor/diagnostic regression test for DONE branch_pr tasks with stale OPEN PR artifacts. Expected: the recommended next action points at task normalize --sync-hosted-merges --task-id <task-id>.
    2. Run touched doctor/help tests. Expected: diagnostics and user-facing guidance stay consistent.
    3. Run lint or equivalent checks on touched files. Expected: no new lint failures in changed scope.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T10:16:49.332Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: doctor.command tests passed with the updated DONE drift guidance and eslint passed on touched doctor files after framework bootstrap.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T10:14:20.083Z, excerpt_hash=sha256:e1b65bd386480e2b130768686087877bcaeffded0915cd68955ff803528172bd
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Point DONE PR-artifact drift recovery at targeted normalize

Update diagnostics and docs so DONE branch_pr tasks with stale OPEN PR artifacts recommend the actual recovery path: task normalize --sync-hosted-merges --task-id <task-id>, not pr check.

## Scope

- In scope: update doctor/help guidance for DONE branch_pr tasks with stale OPEN PR artifacts; add focused regression coverage.
- Out of scope: unrelated doctor diagnostics or new reconcile commands beyond the existing targeted normalize path.

## Plan

1. Reproduce the current doctor/help guidance for DONE branch_pr tasks whose PR artifacts still say OPEN after shipment. 2. Update the diagnostic next action to point at the existing targeted recovery path task normalize --sync-hosted-merges --task-id <task-id>. 3. Verify with focused doctor/help tests and touched lint/test checks.

## Verify Steps

1. Run the focused doctor/diagnostic regression test for DONE branch_pr tasks with stale OPEN PR artifacts. Expected: the recommended next action points at task normalize --sync-hosted-merges --task-id <task-id>.
2. Run touched doctor/help tests. Expected: diagnostics and user-facing guidance stay consistent.
3. Run lint or equivalent checks on touched files. Expected: no new lint failures in changed scope.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T10:16:49.332Z — VERIFY — ok

By: REVIEWER

Note: doctor.command tests passed with the updated DONE drift guidance and eslint passed on touched doctor files after framework bootstrap.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T10:14:20.083Z, excerpt_hash=sha256:e1b65bd386480e2b130768686087877bcaeffded0915cd68955ff803528172bd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
