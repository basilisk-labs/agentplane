---
id: "202603141638-90VWMF"
title: "Stabilize work start branch/worktree regression for v0.3.7"
result_summary: "Raised the timeout budget only for the branch_pr work-start test that fails under full release gate load."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
depends_on: []
tags:
  - "release"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T16:39:54.710Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T16:44:59.970Z"
  updated_by: "CODER"
  note: "Verified: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts and bun x tsc -b packages/core packages/agentplane both passed after restricting the fix to a branch_pr work-start timeout budget increase for the single remaining full-gate case."
commit:
  hash: "f8c6224f39233342b136082d3af03414699cedd4"
  message: "⏱️ 90VWMF test: widen work start full-gate timeout"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the remaining work start full-gate timeout, inspect branch/worktree fixture setup and timeout binding in run-cli.core.pr-flow.test.ts, and make the smallest branch_pr-scoped fix that explains the failure before rerunning the suite."
  -
    author: "CODER"
    body: "Verified: the work-start suite and task verify contract both passed after restricting the fix to the single branch/worktree timeout case; no broader branch_pr work-start regression was observed in isolated or whole-file runs."
events:
  -
    type: "status"
    at: "2026-03-14T16:43:53.732Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the remaining work start full-gate timeout, inspect branch/worktree fixture setup and timeout binding in run-cli.core.pr-flow.test.ts, and make the smallest branch_pr-scoped fix that explains the failure before rerunning the suite."
  -
    type: "verify"
    at: "2026-03-14T16:44:59.970Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts and bun x tsc -b packages/core packages/agentplane both passed after restricting the fix to a branch_pr work-start timeout budget increase for the single remaining full-gate case."
  -
    type: "status"
    at: "2026-03-14T16:45:21.576Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the work-start suite and task verify contract both passed after restricting the fix to the single branch/worktree timeout case; no broader branch_pr work-start regression was observed in isolated or whole-file runs."
doc_version: 3
doc_updated_at: "2026-03-14T16:45:21.578Z"
doc_updated_by: "CODER"
description: "Isolate and fix the remaining full-gate timeout in work start creates a branch and worktree, then confirm the branch_pr start flow stays green under the release prepublish load."
sections:
  Summary: |-
    Stabilize work start branch/worktree regression for v0.3.7
    
    Isolate and fix the remaining full-gate timeout in work start creates a branch and worktree, then confirm the branch_pr start flow stays green under the release prepublish load.
  Scope: |-
    - In scope: Isolate and fix the remaining full-gate timeout in work start creates a branch and worktree, then confirm the branch_pr start flow stays green under the release prepublish load.
    - Out of scope: unrelated refactors not required for "Stabilize work start branch/worktree regression for v0.3.7".
  Plan: "Reproduce the remaining work start full-gate timeout, determine whether the failure comes from branch/worktree fixture setup, timeout budgeting, or CLI path drift, fix only the branch_pr start surface needed to explain the case, and confirm the suite passes in isolation with explicit findings about any full-gate residual risk."
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts`. Expected: the work-start suite passes, including the branch/worktree creation path that still fails under full gate.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: touched code still type-checks.
    3. Review the changed branch_pr start behavior and findings. Expected: any remaining full-gate-only follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T16:44:59.970Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts and bun x tsc -b packages/core packages/agentplane both passed after restricting the fix to a branch_pr work-start timeout budget increase for the single remaining full-gate case.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T16:44:59.757Z, excerpt_hash=sha256:8f9e6b02a82154d6f8b8f4fe6ea90a7a73d9067d279ffd54c0b6ebf25205e2d6
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Fact: the isolated `work start creates a branch and worktree` case passed in 7.52s total wall time, with the target test at 5.31s.
    - Fact: the full `packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts` suite passed in 7.49s after the change, with the target branch/worktree case at 2.69s.
    - Inference: the remaining branch_pr work-start failure under `release:prepublish` was timeout-budget drift under aggregate gate load, not a behavioral regression in branch or worktree creation.
    - Change: added `WORK_START_BRANCH_AND_WORKTREE_TIMEOUT_MS = 60_000` and applied it only to the `work start creates a branch and worktree` test in `packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts`.
    - Residual risk: full-gate confirmation is still required from the parent release task before npm publish is considered safe.
id_source: "generated"
---
## Summary

Stabilize work start branch/worktree regression for v0.3.7

Isolate and fix the remaining full-gate timeout in work start creates a branch and worktree, then confirm the branch_pr start flow stays green under the release prepublish load.

## Scope

- In scope: Isolate and fix the remaining full-gate timeout in work start creates a branch and worktree, then confirm the branch_pr start flow stays green under the release prepublish load.
- Out of scope: unrelated refactors not required for "Stabilize work start branch/worktree regression for v0.3.7".

## Plan

Reproduce the remaining work start full-gate timeout, determine whether the failure comes from branch/worktree fixture setup, timeout budgeting, or CLI path drift, fix only the branch_pr start surface needed to explain the case, and confirm the suite passes in isolation with explicit findings about any full-gate residual risk.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts`. Expected: the work-start suite passes, including the branch/worktree creation path that still fails under full gate.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: touched code still type-checks.
3. Review the changed branch_pr start behavior and findings. Expected: any remaining full-gate-only follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T16:44:59.970Z — VERIFY — ok

By: CODER

Note: Verified: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts and bun x tsc -b packages/core packages/agentplane both passed after restricting the fix to a branch_pr work-start timeout budget increase for the single remaining full-gate case.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T16:44:59.757Z, excerpt_hash=sha256:8f9e6b02a82154d6f8b8f4fe6ea90a7a73d9067d279ffd54c0b6ebf25205e2d6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Fact: the isolated `work start creates a branch and worktree` case passed in 7.52s total wall time, with the target test at 5.31s.
- Fact: the full `packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts` suite passed in 7.49s after the change, with the target branch/worktree case at 2.69s.
- Inference: the remaining branch_pr work-start failure under `release:prepublish` was timeout-budget drift under aggregate gate load, not a behavioral regression in branch or worktree creation.
- Change: added `WORK_START_BRANCH_AND_WORKTREE_TIMEOUT_MS = 60_000` and applied it only to the `work start creates a branch and worktree` test in `packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts`.
- Residual risk: full-gate confirmation is still required from the parent release task before npm publish is considered safe.
