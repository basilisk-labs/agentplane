---
id: "202605060829-WRTQP0"
title: "Enforce task-bound mutating commits"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hooks"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T08:29:43.535Z"
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
    body: "Start: implement task-bound hook enforcement for mutating paths, preserving docs-only task flow, lifecycle close commits, and explicit emergency backfill handling."
events:
  -
    type: "status"
    at: "2026-05-06T08:29:58.718Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement task-bound hook enforcement for mutating paths, preserving docs-only task flow, lifecycle close commits, and explicit emergency backfill handling."
doc_version: 3
doc_updated_at: "2026-05-06T08:29:58.718Z"
doc_updated_by: "CODER"
description: "Harden commit hooks so mutating changes require an active task or valid task id, docs-only changes align with docs/content tasks, and emergency hotfixes require backfill evidence."
sections:
  Summary: |-
    Enforce task-bound mutating commits
    
    Harden commit hooks so mutating changes require an active task or valid task id, docs-only changes align with docs/content tasks, and emergency hotfixes require backfill evidence.
  Scope: |-
    - In scope: Harden commit hooks so mutating changes require an active task or valid task id, docs-only changes align with docs/content tasks, and emergency hotfixes require backfill evidence.
    - Out of scope: unrelated refactors not required for "Enforce task-bound mutating commits".
  Plan: "Plan: (1) Add a shared hook path classifier that separates docs-only, task artifacts, protected/policy/config/hook/ci, and mutating implementation paths. (2) Teach pre-commit to require an active task from AGENTPLANE_TASK_ID or task branch for staged mutating paths, while allowing docs-only only for docs/content-style task intent. (3) Teach commit-msg/pre-push to reject mutating commits without a valid task id unless they use an explicit emergency hotfix marker with required backfill evidence. (4) Preserve lifecycle automation paths for task-close/branch_pr close commits. (5) Cover the behavior with focused hook policy tests and run policy/doctor checks."
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

Enforce task-bound mutating commits

Harden commit hooks so mutating changes require an active task or valid task id, docs-only changes align with docs/content tasks, and emergency hotfixes require backfill evidence.

## Scope

- In scope: Harden commit hooks so mutating changes require an active task or valid task id, docs-only changes align with docs/content tasks, and emergency hotfixes require backfill evidence.
- Out of scope: unrelated refactors not required for "Enforce task-bound mutating commits".

## Plan

Plan: (1) Add a shared hook path classifier that separates docs-only, task artifacts, protected/policy/config/hook/ci, and mutating implementation paths. (2) Teach pre-commit to require an active task from AGENTPLANE_TASK_ID or task branch for staged mutating paths, while allowing docs-only only for docs/content-style task intent. (3) Teach commit-msg/pre-push to reject mutating commits without a valid task id unless they use an explicit emergency hotfix marker with required backfill evidence. (4) Preserve lifecycle automation paths for task-close/branch_pr close commits. (5) Cover the behavior with focused hook policy tests and run policy/doctor checks.

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
