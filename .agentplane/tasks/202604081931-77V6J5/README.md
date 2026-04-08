---
id: "202604081931-77V6J5"
title: "Clean base task README after branch_pr work start"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "worktree"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-08T19:48:37.296Z"
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
    body: "Start: remove base-checkout task README duplicates after worktree seeding so future upstream task README tracking does not block git pull."
events:
  -
    type: "status"
    at: "2026-04-08T19:48:41.420Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove base-checkout task README duplicates after worktree seeding so future upstream task README tracking does not block git pull."
doc_version: 3
doc_updated_at: "2026-04-08T19:48:41.431Z"
doc_updated_by: "CODER"
description: "When branch_pr work start seeds task artifacts into a new worktree, remove the duplicate untracked base-checkout task README for that task so later pulls do not fail when the task README becomes tracked upstream."
sections:
  Summary: |-
    Clean base task README after branch_pr work start
    
    When branch_pr work start seeds task artifacts into a new worktree, remove the duplicate untracked base-checkout task README for that task so later pulls do not fail when the task README becomes tracked upstream.
  Scope: |-
    - In scope: When branch_pr work start seeds task artifacts into a new worktree, remove the duplicate untracked base-checkout task README for that task so later pulls do not fail when the task README becomes tracked upstream.
    - Out of scope: unrelated refactors not required for "Clean base task README after branch_pr work start".
  Plan: |-
    1. Implement the change for "Clean base task README after branch_pr work start".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run the `work start` branch_pr integration scenario for seeded local-backend READMEs. Expected: the fresh worktree still receives the task README files it needs.
    2. Confirm the base checkout no longer retains untracked `.agentplane/tasks/<task-id>/README.md` copies after `work start`. Expected: `git status --short --untracked-files=all` does not list those task README paths on the base checkout.
    3. Run the targeted lint and test coverage for the touched `work-start` path. Expected: no regressions in the branch_pr work start flow or its CLI integration test.
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

Clean base task README after branch_pr work start

When branch_pr work start seeds task artifacts into a new worktree, remove the duplicate untracked base-checkout task README for that task so later pulls do not fail when the task README becomes tracked upstream.

## Scope

- In scope: When branch_pr work start seeds task artifacts into a new worktree, remove the duplicate untracked base-checkout task README for that task so later pulls do not fail when the task README becomes tracked upstream.
- Out of scope: unrelated refactors not required for "Clean base task README after branch_pr work start".

## Plan

1. Implement the change for "Clean base task README after branch_pr work start".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run the `work start` branch_pr integration scenario for seeded local-backend READMEs. Expected: the fresh worktree still receives the task README files it needs.
2. Confirm the base checkout no longer retains untracked `.agentplane/tasks/<task-id>/README.md` copies after `work start`. Expected: `git status --short --untracked-files=all` does not list those task README paths on the base checkout.
3. Run the targeted lint and test coverage for the touched `work-start` path. Expected: no regressions in the branch_pr work start flow or its CLI integration test.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
