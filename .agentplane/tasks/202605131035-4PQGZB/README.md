---
id: "202605131035-4PQGZB"
title: "Improve provider-neutral PR flow observability"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T10:35:18.964Z"
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
    author: "CODER"
    body: "Start: Implement provider-neutral PR flow observability, stable remote-check waiting, and clearer close-tail diagnostics in the dedicated branch_pr worktree without adding a gh-based merge wrapper."
events:
  -
    type: "status"
    at: "2026-05-13T10:36:04.908Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement provider-neutral PR flow observability, stable remote-check waiting, and clearer close-tail diagnostics in the dedicated branch_pr worktree without adding a gh-based merge wrapper."
doc_version: 3
doc_updated_at: "2026-05-13T10:36:04.908Z"
doc_updated_by: "CODER"
description: "Add provider-neutral PR flow status and stricter close/check diagnostics without implementing merge-through-gh; GitHub is the first provider but interfaces should leave room for GitLab and other git servers."
sections:
  Summary: |-
    Improve provider-neutral PR flow observability
    
    Add provider-neutral PR flow status and stricter close/check diagnostics without implementing merge-through-gh; GitHub is the first provider but interfaces should leave room for GitLab and other git servers.
  Scope: |-
    - In scope: Add provider-neutral PR flow status and stricter close/check diagnostics without implementing merge-through-gh; GitHub is the first provider but interfaces should leave room for GitLab and other git servers.
    - Out of scope: unrelated refactors not required for "Improve provider-neutral PR flow observability".
  Plan: "Implement the next PR Flow improvement slice: add a provider-neutral flow status surface for branch_pr tasks, improve hosted-close/finish diagnostics so close-tail state is explicit, and make remote check waiting require a stable quiet period after late checks appear. Do not implement merge-through-gh; any merge/provider boundary should remain compatible with a future GitHub API provider and later GitLab/other providers. Verify with focused CLI/unit tests, policy routing, typecheck/lint where relevant, and task verification evidence."
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

Improve provider-neutral PR flow observability

Add provider-neutral PR flow status and stricter close/check diagnostics without implementing merge-through-gh; GitHub is the first provider but interfaces should leave room for GitLab and other git servers.

## Scope

- In scope: Add provider-neutral PR flow status and stricter close/check diagnostics without implementing merge-through-gh; GitHub is the first provider but interfaces should leave room for GitLab and other git servers.
- Out of scope: unrelated refactors not required for "Improve provider-neutral PR flow observability".

## Plan

Implement the next PR Flow improvement slice: add a provider-neutral flow status surface for branch_pr tasks, improve hosted-close/finish diagnostics so close-tail state is explicit, and make remote check waiting require a stable quiet period after late checks appear. Do not implement merge-through-gh; any merge/provider boundary should remain compatible with a future GitHub API provider and later GitLab/other providers. Verify with focused CLI/unit tests, policy routing, typecheck/lint where relevant, and task verification evidence.

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
