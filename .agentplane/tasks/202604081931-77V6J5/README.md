---
id: "202604081931-77V6J5"
title: "Clean base task README after branch_pr work start"
result_summary: "Merged via local task branch commit e820c9f93593."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-04-08T19:54:41.280Z"
  updated_by: "REVIEWER"
  note: "The fresh branch_pr worktree still seeds local-backend task READMEs; the base checkout no longer retains untracked task README copies after work start; targeted lint and the seeded-worktree integration test passed in the task worktree after bootstrap."
commit:
  hash: "e820c9f935932fb1f09dfd88f502a684379f6cbf"
  message: "🧩 77V6J5 task: prune base-side task README duplicates after worktree seeding"
comments:
  -
    author: "CODER"
    body: "Start: remove base-checkout task README duplicates after worktree seeding so future upstream task README tracking does not block git pull."
  -
    author: "INTEGRATOR"
    body: "Verified: branch_pr worktree seeding keeps README copies in the task worktree and removes the base-side untracked duplicates so later pulls do not fail."
events:
  -
    type: "status"
    at: "2026-04-08T19:48:41.420Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove base-checkout task README duplicates after worktree seeding so future upstream task README tracking does not block git pull."
  -
    type: "verify"
    at: "2026-04-08T19:54:41.280Z"
    author: "REVIEWER"
    state: "ok"
    note: "The fresh branch_pr worktree still seeds local-backend task READMEs; the base checkout no longer retains untracked task README copies after work start; targeted lint and the seeded-worktree integration test passed in the task worktree after bootstrap."
  -
    type: "status"
    at: "2026-04-08T19:54:48.146Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: branch_pr worktree seeding keeps README copies in the task worktree and removes the base-side untracked duplicates so later pulls do not fail."
doc_version: 3
doc_updated_at: "2026-04-08T19:54:48.147Z"
doc_updated_by: "INTEGRATOR"
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
    ### 2026-04-08T19:54:41.280Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: The fresh branch_pr worktree still seeds local-backend task READMEs; the base checkout no longer retains untracked task README copies after work start; targeted lint and the seeded-worktree integration test passed in the task worktree after bootstrap.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T19:48:41.431Z, excerpt_hash=sha256:7ef955b9c1ea7d4ff27d2d15939b542f995717614a08e276dc6c1b43f2526244
    
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
### 2026-04-08T19:54:41.280Z — VERIFY — ok

By: REVIEWER

Note: The fresh branch_pr worktree still seeds local-backend task READMEs; the base checkout no longer retains untracked task README copies after work start; targeted lint and the seeded-worktree integration test passed in the task worktree after bootstrap.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T19:48:41.431Z, excerpt_hash=sha256:7ef955b9c1ea7d4ff27d2d15939b542f995717614a08e276dc6c1b43f2526244

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
