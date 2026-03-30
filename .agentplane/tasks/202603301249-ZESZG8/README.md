---
id: "202603301249-ZESZG8"
title: "Make pr check prefer local artifacts before branch fallback"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "branch_pr"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-30T13:15:24.868Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-30T14:50:35.738Z"
  updated_by: "CODER"
  note: "OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts -t 'pr check passes when artifacts exist|pr check falls back to PR artifacts committed on the task branch|pr check prefers local PR artifacts when multiple task branches match|pr check still reports multiple task branches when fallback is required' --hookTimeout 60000 --testTimeout 60000; local pr-check logic now prefers active-worktree artifacts and preserves multiple-branch validation only for true fallback cases."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce the confirmed pr check ambiguity in a clean task worktree, change artifact resolution so local pr files win over branch fallback, and lock the fix with targeted PR-flow tests before reopening the command in the same reproduced state."
events:
  -
    type: "status"
    at: "2026-03-30T14:05:35.387Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the confirmed pr check ambiguity in a clean task worktree, change artifact resolution so local pr files win over branch fallback, and lock the fix with targeted PR-flow tests before reopening the command in the same reproduced state."
  -
    type: "verify"
    at: "2026-03-30T14:50:35.738Z"
    author: "CODER"
    state: "ok"
    note: "OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts -t 'pr check passes when artifacts exist|pr check falls back to PR artifacts committed on the task branch|pr check prefers local PR artifacts when multiple task branches match|pr check still reports multiple task branches when fallback is required' --hookTimeout 60000 --testTimeout 60000; local pr-check logic now prefers active-worktree artifacts and preserves multiple-branch validation only for true fallback cases."
doc_version: 3
doc_updated_at: "2026-03-30T14:50:35.749Z"
doc_updated_by: "CODER"
description: "Fix branch_pr PR checking so  reads local  artifacts first and only falls back to task-branch discovery when local artifacts are absent, avoiding false  failures in active worktrees."
sections:
  Summary: |-
    Make pr check prefer local artifacts before branch fallback
    
    Fix branch_pr PR checking so  reads local  artifacts first and only falls back to task-branch discovery when local artifacts are absent, avoiding false  failures in active worktrees.
  Scope: |-
    - In scope: Fix branch_pr PR checking so  reads local  artifacts first and only falls back to task-branch discovery when local artifacts are absent, avoiding false  failures in active worktrees.
    - Out of scope: unrelated refactors not required for "Make pr check prefer local artifacts before branch fallback".
  Plan: "1. Reproduce the current  failure when multiple local task branches match the same task id even though local  artifacts exist in the active worktree. 2. Update the PR-check artifact resolution flow so local artifacts are validated first and task-branch discovery is used only as a fallback when local files are absent. 3. Add targeted tests for local-artifact preference and multi-branch fallback behavior, then verify the fix with narrow PR-flow coverage."
  Verify Steps: |-
    1. Reproduce the active-worktree case with local PR artifacts and more than one local task branch for the same task id. Expected: pr check uses local artifacts instead of failing on branch ambiguity.
    2. Run targeted PR-flow tests for the touched check logic. Expected: updated tests pass.
    3. Re-run pr check in the reproduced worktree after the fix. Expected: the command no longer reports Multiple task branches match when local artifacts are present.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-30T14:50:35.738Z — VERIFY — ok
    
    By: CODER
    
    Note: OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts -t 'pr check passes when artifacts exist|pr check falls back to PR artifacts committed on the task branch|pr check prefers local PR artifacts when multiple task branches match|pr check still reports multiple task branches when fallback is required' --hookTimeout 60000 --testTimeout 60000; local pr-check logic now prefers active-worktree artifacts and preserves multiple-branch validation only for true fallback cases.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T14:05:35.394Z, excerpt_hash=sha256:6456640e85e22016be178576b7f009b0095679f60cdd715969e989cff174cb2b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make pr check prefer local artifacts before branch fallback

Fix branch_pr PR checking so  reads local  artifacts first and only falls back to task-branch discovery when local artifacts are absent, avoiding false  failures in active worktrees.

## Scope

- In scope: Fix branch_pr PR checking so  reads local  artifacts first and only falls back to task-branch discovery when local artifacts are absent, avoiding false  failures in active worktrees.
- Out of scope: unrelated refactors not required for "Make pr check prefer local artifacts before branch fallback".

## Plan

1. Reproduce the current  failure when multiple local task branches match the same task id even though local  artifacts exist in the active worktree. 2. Update the PR-check artifact resolution flow so local artifacts are validated first and task-branch discovery is used only as a fallback when local files are absent. 3. Add targeted tests for local-artifact preference and multi-branch fallback behavior, then verify the fix with narrow PR-flow coverage.

## Verify Steps

1. Reproduce the active-worktree case with local PR artifacts and more than one local task branch for the same task id. Expected: pr check uses local artifacts instead of failing on branch ambiguity.
2. Run targeted PR-flow tests for the touched check logic. Expected: updated tests pass.
3. Re-run pr check in the reproduced worktree after the fix. Expected: the command no longer reports Multiple task branches match when local artifacts are present.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-30T14:50:35.738Z — VERIFY — ok

By: CODER

Note: OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts -t 'pr check passes when artifacts exist|pr check falls back to PR artifacts committed on the task branch|pr check prefers local PR artifacts when multiple task branches match|pr check still reports multiple task branches when fallback is required' --hookTimeout 60000 --testTimeout 60000; local pr-check logic now prefers active-worktree artifacts and preserves multiple-branch validation only for true fallback cases.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T14:05:35.394Z, excerpt_hash=sha256:6456640e85e22016be178576b7f009b0095679f60cdd715969e989cff174cb2b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
