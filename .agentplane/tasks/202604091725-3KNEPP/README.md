---
id: "202604091725-3KNEPP"
title: "Keep active branch_pr task README synced into worktree after start-ready"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T17:49:44.745Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T18:02:36.011Z"
  updated_by: "CODER"
  note: "Verified that start-ready keeps the task README synchronized between the active task worktree and the base checkout, with targeted branch_pr lifecycle regression coverage and eslint clean."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: keep the active task README synchronized into the branch_pr worktree after start-ready so the task branch and base projection do not diverge immediately on lifecycle state."
events:
  -
    type: "status"
    at: "2026-04-09T17:50:28.263Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: keep the active task README synchronized into the branch_pr worktree after start-ready so the task branch and base projection do not diverge immediately on lifecycle state."
  -
    type: "verify"
    at: "2026-04-09T18:02:36.011Z"
    author: "CODER"
    state: "ok"
    note: "Verified that start-ready keeps the task README synchronized between the active task worktree and the base checkout, with targeted branch_pr lifecycle regression coverage and eslint clean."
doc_version: 3
doc_updated_at: "2026-04-09T18:02:36.014Z"
doc_updated_by: "CODER"
description: "Ensure the active task README in the task worktree reflects branch_pr status transitions such as task start-ready instead of staying stale relative to the base checkout copy."
sections:
  Summary: |-
    Keep active branch_pr task README synced into worktree after start-ready
    
    Ensure the active task README in the task worktree reflects branch_pr status transitions such as task start-ready instead of staying stale relative to the base checkout copy.
  Scope: |-
    - In scope: Ensure the active task README in the task worktree reflects branch_pr status transitions such as task start-ready instead of staying stale relative to the base checkout copy.
    - Out of scope: unrelated refactors not required for "Keep active branch_pr task README synced into worktree after start-ready".
  Plan: "1. Reproduce the branch_pr README drift between base and worktree after work start plus task start-ready. 2. Update the start-ready path so the active task README is synchronized into the task worktree when that worktree already exists. 3. Add regression coverage for the synchronized task state and verify with targeted tests."
  Verify Steps: |-
    1. Start a branch_pr task from its task worktree and inspect both the base README and the task-worktree README. Expected: both copies show the same DOING status/comment after start-ready.
    2. Run the targeted branch_pr lifecycle regression in run-cli.core.pr-flow.test.ts. Expected: the new start-ready sync scenario passes.
    3. Lint the touched start-ready and pr-flow sources. Expected: eslint exits 0 for the modified files.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T18:02:36.011Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified that start-ready keeps the task README synchronized between the active task worktree and the base checkout, with targeted branch_pr lifecycle regression coverage and eslint clean.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T18:02:15.395Z, excerpt_hash=sha256:f7ff17cc51a9c82aba8536e9f586385edac2d73d17cb880864564f43473291b0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Keep active branch_pr task README synced into worktree after start-ready

Ensure the active task README in the task worktree reflects branch_pr status transitions such as task start-ready instead of staying stale relative to the base checkout copy.

## Scope

- In scope: Ensure the active task README in the task worktree reflects branch_pr status transitions such as task start-ready instead of staying stale relative to the base checkout copy.
- Out of scope: unrelated refactors not required for "Keep active branch_pr task README synced into worktree after start-ready".

## Plan

1. Reproduce the branch_pr README drift between base and worktree after work start plus task start-ready. 2. Update the start-ready path so the active task README is synchronized into the task worktree when that worktree already exists. 3. Add regression coverage for the synchronized task state and verify with targeted tests.

## Verify Steps

1. Start a branch_pr task from its task worktree and inspect both the base README and the task-worktree README. Expected: both copies show the same DOING status/comment after start-ready.
2. Run the targeted branch_pr lifecycle regression in run-cli.core.pr-flow.test.ts. Expected: the new start-ready sync scenario passes.
3. Lint the touched start-ready and pr-flow sources. Expected: eslint exits 0 for the modified files.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T18:02:36.011Z — VERIFY — ok

By: CODER

Note: Verified that start-ready keeps the task README synchronized between the active task worktree and the base checkout, with targeted branch_pr lifecycle regression coverage and eslint clean.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T18:02:15.395Z, excerpt_hash=sha256:f7ff17cc51a9c82aba8536e9f586385edac2d73d17cb880864564f43473291b0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
