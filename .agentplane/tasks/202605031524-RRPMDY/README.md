---
id: "202605031524-RRPMDY"
title: "Harden branch_pr worktree ownership for batch tasks"
result_summary: "Merged via PR #834."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605031524-BDT05P"
tags:
  - "code"
  - "workflow"
  - "worktree"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T15:24:53.081Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T16:05:41.590Z"
  updated_by: "CODER"
  note: "work start now rejects duplicate active branch ownership for a task."
commit:
  hash: "8823fc10d2fb6c9e4457da0266ac02b0214db0c1"
  message: "Merge pull request #834 from basilisk-labs/task/202605031524-RRPMDY/batch-worktree-ownership"
comments:
  -
    author: "CODER"
    body: "Start: harden branch_pr worktree ownership for batch tasks."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #834 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-03T16:01:56.151Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: harden branch_pr worktree ownership for batch tasks."
  -
    type: "verify"
    at: "2026-05-03T16:05:41.590Z"
    author: "CODER"
    state: "ok"
    note: "work start now rejects duplicate active branch ownership for a task."
  -
    type: "status"
    at: "2026-05-03T16:08:46.662Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #834 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-03T16:08:46.667Z"
doc_updated_by: "INTEGRATOR"
description: "Ensure batch worktrees have explicit ownership of all included task README artifacts and prevent multiple active primary branches from owning the same included task."
sections:
  Summary: |-
    Harden branch_pr worktree ownership for batch tasks
    
    Ensure batch worktrees have explicit ownership of all included task README artifacts and prevent multiple active primary branches from owning the same included task.
  Scope: |-
    - In scope: Ensure batch worktrees have explicit ownership of all included task README artifacts and prevent multiple active primary branches from owning the same included task.
    - Out of scope: unrelated refactors not required for "Harden branch_pr worktree ownership for batch tasks".
  Plan: "Depends on BDT05P. Scope: harden worktree ownership for batch tasks. Ensure a primary batch worktree can own all included task README artifacts and prevent two active primary branches from claiming the same included task. Acceptance: worktree/materialization tests cover included README handoff and duplicate active ownership rejection."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T16:05:41.590Z — VERIFY — ok
    
    By: CODER
    
    Note: work start now rejects duplicate active branch ownership for a task.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T16:01:56.151Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: branch_pr work start checks existing task branches for the same task id before creating another worktree branch with a different slug.
      Impact: Parallel agents cannot silently create multiple active task worktrees that each claim ownership of the same task README.
      Resolution: Verification: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --test-name-pattern 'duplicate branch ownership'; bun run typecheck; bun run format:check; bun run check:types-files; git diff --check; node .agentplane/policy/check-routing.mjs.
id_source: "generated"
---
## Summary

Harden branch_pr worktree ownership for batch tasks

Ensure batch worktrees have explicit ownership of all included task README artifacts and prevent multiple active primary branches from owning the same included task.

## Scope

- In scope: Ensure batch worktrees have explicit ownership of all included task README artifacts and prevent multiple active primary branches from owning the same included task.
- Out of scope: unrelated refactors not required for "Harden branch_pr worktree ownership for batch tasks".

## Plan

Depends on BDT05P. Scope: harden worktree ownership for batch tasks. Ensure a primary batch worktree can own all included task README artifacts and prevent two active primary branches from claiming the same included task. Acceptance: worktree/materialization tests cover included README handoff and duplicate active ownership rejection.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T16:05:41.590Z — VERIFY — ok

By: CODER

Note: work start now rejects duplicate active branch ownership for a task.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T16:01:56.151Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: branch_pr work start checks existing task branches for the same task id before creating another worktree branch with a different slug.
  Impact: Parallel agents cannot silently create multiple active task worktrees that each claim ownership of the same task README.
  Resolution: Verification: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --test-name-pattern 'duplicate branch ownership'; bun run typecheck; bun run format:check; bun run check:types-files; git diff --check; node .agentplane/policy/check-routing.mjs.
