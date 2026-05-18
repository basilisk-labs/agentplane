---
id: "202605181904-RC91FT"
title: "Fix v0.6 follow-up GitHub issues"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "ci"
  - "code"
  - "context"
  - "deps"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-18T19:06:04.842Z"
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
    body: "Start: Implement approved batch fixes for GitHub issues #3907-#3912 in the dedicated branch_pr worktree, preserving unrelated base task artifact drift."
events:
  -
    type: "status"
    at: "2026-05-18T19:07:51.582Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved batch fixes for GitHub issues #3907-#3912 in the dedicated branch_pr worktree, preserving unrelated base task artifact drift."
doc_version: 3
doc_updated_at: "2026-05-18T19:07:51.582Z"
doc_updated_by: "CODER"
description: "Implement and merge the code fixes for GitHub issues #3907, #3908, #3909, #3910, #3911, and #3912 in one branch_pr batch worktree, then close the issues after merge."
sections:
  Summary: |-
    Fix v0.6 follow-up GitHub issues

    Implement and merge the code fixes for GitHub issues #3907, #3908, #3909, #3910, #3911, and #3912 in one branch_pr batch worktree, then close the issues after merge.
  Scope: |-
    - In scope: Implement and merge the code fixes for GitHub issues #3907, #3908, #3909, #3910, #3911, and #3912 in one branch_pr batch worktree, then close the issues after merge.
    - Out of scope: unrelated refactors not required for "Fix v0.6 follow-up GitHub issues".
  Plan: "Primary batch task for issues #3907-#3912. Plan: 1. Start a dedicated branch_pr worktree and keep base checkout changes limited to task lifecycle artifacts. 2. Fix context wiki scaffold lint so fresh init plus whole-tree lint passes without weakening real content validation. 3. Harden task README scanning so invalid legacy frontmatter yields actionable diagnostics without hiding unrelated tasks. 4. Add a bounded stale-upstream diagnostic for read-heavy task/startup surfaces. 5. Make TypeScript 6, ESLint 10/eslint-plugin-n 18, and Zod 4 dependency upgrade paths pass their focused checks by updating code/config/schema generation deliberately. 6. Verify targeted tests plus lint/build/schema/policy checks, open/update PR, merge through GitHub, then close #3907-#3912 with PR evidence."
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
id_source: "generated"
---
## Summary

Fix v0.6 follow-up GitHub issues

Implement and merge the code fixes for GitHub issues #3907, #3908, #3909, #3910, #3911, and #3912 in one branch_pr batch worktree, then close the issues after merge.

## Scope

- In scope: Implement and merge the code fixes for GitHub issues #3907, #3908, #3909, #3910, #3911, and #3912 in one branch_pr batch worktree, then close the issues after merge.
- Out of scope: unrelated refactors not required for "Fix v0.6 follow-up GitHub issues".

## Plan

Primary batch task for issues #3907-#3912. Plan: 1. Start a dedicated branch_pr worktree and keep base checkout changes limited to task lifecycle artifacts. 2. Fix context wiki scaffold lint so fresh init plus whole-tree lint passes without weakening real content validation. 3. Harden task README scanning so invalid legacy frontmatter yields actionable diagnostics without hiding unrelated tasks. 4. Add a bounded stale-upstream diagnostic for read-heavy task/startup surfaces. 5. Make TypeScript 6, ESLint 10/eslint-plugin-n 18, and Zod 4 dependency upgrade paths pass their focused checks by updating code/config/schema generation deliberately. 6. Verify targeted tests plus lint/build/schema/policy checks, open/update PR, merge through GitHub, then close #3907-#3912 with PR evidence.

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
