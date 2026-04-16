---
id: "202604160713-2MVFXY"
title: "Clarify integrate route when run from a task worktree"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-16T07:13:52.050Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-16T07:20:35.216Z"
  updated_by: "CODER"
  note: "Verified integrate wrong-branch diagnostics with focused coverage: bun vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/shared/errors.test.ts packages/agentplane/src/cli/run-cli.core.test.ts"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: refining branch_pr integrate wrong-branch diagnostics so task-worktree misuse points explicitly to the base checkout route."
events:
  -
    type: "status"
    at: "2026-04-16T07:14:11.759Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: refining branch_pr integrate wrong-branch diagnostics so task-worktree misuse points explicitly to the base checkout route."
  -
    type: "verify"
    at: "2026-04-16T07:20:35.216Z"
    author: "CODER"
    state: "ok"
    note: "Verified integrate wrong-branch diagnostics with focused coverage: bun vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/shared/errors.test.ts packages/agentplane/src/cli/run-cli.core.test.ts"
doc_version: 3
doc_updated_at: "2026-04-16T07:20:35.221Z"
doc_updated_by: "CODER"
description: "Make branch_pr integrate report an explicit base-checkout route when the operator runs it from a task branch worktree instead of the base branch checkout."
sections:
  Summary: |-
    Clarify integrate route when run from a task worktree
    
    Make branch_pr integrate report an explicit base-checkout route when the operator runs it from a task branch worktree instead of the base branch checkout.
  Scope: |-
    - In scope: Make branch_pr integrate report an explicit base-checkout route when the operator runs it from a task branch worktree instead of the base branch checkout.
    - Out of scope: unrelated refactors not required for "Clarify integrate route when run from a task worktree".
  Plan: |-
    1. Inspect the current wrong-branch integrate failure path and identify the smallest diagnostic addition that distinguishes task worktree misuse from generic git context failure. -> verify: affected files and assertions mapped before edits
    2. Implement the explicit base-checkout guidance for branch_pr integrate when current branch is not the resolved base branch. -> verify: tests cover stderr/next_action for task-worktree misuse without changing successful integrate paths
    3. Re-run focused checks, then publish the branch and open a PR. -> verify: targeted tests pass, working tree is clean, branch/PR created
  Verify Steps: |-
    1. Review the requested outcome for "Clarify integrate route when run from a task worktree". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-16T07:20:35.216Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified integrate wrong-branch diagnostics with focused coverage: bun vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/shared/errors.test.ts packages/agentplane/src/cli/run-cli.core.test.ts
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-16T07:14:11.775Z, excerpt_hash=sha256:2124dbdd3aa245df78469dc80767052486863c041962ed7910f0a4889f2e3275
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Clarify integrate route when run from a task worktree

Make branch_pr integrate report an explicit base-checkout route when the operator runs it from a task branch worktree instead of the base branch checkout.

## Scope

- In scope: Make branch_pr integrate report an explicit base-checkout route when the operator runs it from a task branch worktree instead of the base branch checkout.
- Out of scope: unrelated refactors not required for "Clarify integrate route when run from a task worktree".

## Plan

1. Inspect the current wrong-branch integrate failure path and identify the smallest diagnostic addition that distinguishes task worktree misuse from generic git context failure. -> verify: affected files and assertions mapped before edits
2. Implement the explicit base-checkout guidance for branch_pr integrate when current branch is not the resolved base branch. -> verify: tests cover stderr/next_action for task-worktree misuse without changing successful integrate paths
3. Re-run focused checks, then publish the branch and open a PR. -> verify: targeted tests pass, working tree is clean, branch/PR created

## Verify Steps

1. Review the requested outcome for "Clarify integrate route when run from a task worktree". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-16T07:20:35.216Z — VERIFY — ok

By: CODER

Note: Verified integrate wrong-branch diagnostics with focused coverage: bun vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/shared/errors.test.ts packages/agentplane/src/cli/run-cli.core.test.ts

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-16T07:14:11.775Z, excerpt_hash=sha256:2124dbdd3aa245df78469dc80767052486863c041962ed7910f0a4889f2e3275

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
