---
id: "202604270852-PR9VMK"
title: "Introduce branch_pr lifecycle context resolver"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "workflow"
verify:
  - "bun run typecheck"
  - "bun test packages/agentplane/src/commands/pr-flow* packages/agentplane/src/commands/branch/work-start*"
plan_approval:
  state: "approved"
  updated_at: "2026-04-27T08:55:49.636Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-27T09:27:22.852Z"
  updated_by: "CODER"
  note: "Verified branch_pr lifecycle context resolver extraction: focused work-start/integrate tests passed, prepare unit tests passed under Vitest, typecheck passed, prettier/eslint passed on touched files. The original Verify Step glob for packages/agentplane/src/commands/pr-flow* does not match existing test files under zsh/bun, so equivalent current test paths were used."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement shared branch_pr lifecycle context resolver in a task worktree, keeping command behavior compatible and verification focused on branch/worktree/PR route invariants."
events:
  -
    type: "status"
    at: "2026-04-27T09:15:52.150Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement shared branch_pr lifecycle context resolver in a task worktree, keeping command behavior compatible and verification focused on branch/worktree/PR route invariants."
  -
    type: "verify"
    at: "2026-04-27T09:27:22.852Z"
    author: "CODER"
    state: "ok"
    note: "Verified branch_pr lifecycle context resolver extraction: focused work-start/integrate tests passed, prepare unit tests passed under Vitest, typecheck passed, prettier/eslint passed on touched files. The original Verify Step glob for packages/agentplane/src/commands/pr-flow* does not match existing test files under zsh/bun, so equivalent current test paths were used."
doc_version: 3
doc_updated_at: "2026-04-27T09:27:22.868Z"
doc_updated_by: "CODER"
description: "Create a shared resolver for branch_pr task route context: base checkout, task branch, worktree path, PR artifact paths, head SHA, freshness state, and allowed mutation route. Keep behavior-compatible and wire only low-risk consumers if needed for validation."
sections:
  Summary: |-
    Introduce branch_pr lifecycle context resolver
    
    Create a shared resolver for branch_pr task route context: base checkout, task branch, worktree path, PR artifact paths, head SHA, freshness state, and allowed mutation route. Keep behavior-compatible and wire only low-risk consumers if needed for validation.
  Scope: |-
    - In scope: Create a shared resolver for branch_pr task route context: base checkout, task branch, worktree path, PR artifact paths, head SHA, freshness state, and allowed mutation route. Keep behavior-compatible and wire only low-risk consumers if needed for validation.
    - Out of scope: unrelated refactors not required for "Introduce branch_pr lifecycle context resolver".
  Plan: "1. Inspect current branch_pr route resolution in work start, pr sync, integrate, verify, finish, and hosted-close flows. 2. Add a shared resolver module that returns typed route context without changing command behavior. 3. Wire the safest read-only or validation consumers to the resolver only where it reduces duplication without expanding behavior. 4. Add focused unit/CLI coverage for base checkout, task worktree, missing branch, stale PR artifact, and protected-base route cases. 5. Verify with focused tests, typecheck, lint or targeted eslint, and doctor if runtime output changes."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/pr-flow* packages/agentplane/src/commands/branch/work-start*`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-27T09:27:22.852Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified branch_pr lifecycle context resolver extraction: focused work-start/integrate tests passed, prepare unit tests passed under Vitest, typecheck passed, prettier/eslint passed on touched files. The original Verify Step glob for packages/agentplane/src/commands/pr-flow* does not match existing test files under zsh/bun, so equivalent current test paths were used.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T09:15:52.180Z, excerpt_hash=sha256:87e9ca8117b97b9a00539702f8b59ff89f792353bd43bc845415d2d564f6215a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Introduce branch_pr lifecycle context resolver

Create a shared resolver for branch_pr task route context: base checkout, task branch, worktree path, PR artifact paths, head SHA, freshness state, and allowed mutation route. Keep behavior-compatible and wire only low-risk consumers if needed for validation.

## Scope

- In scope: Create a shared resolver for branch_pr task route context: base checkout, task branch, worktree path, PR artifact paths, head SHA, freshness state, and allowed mutation route. Keep behavior-compatible and wire only low-risk consumers if needed for validation.
- Out of scope: unrelated refactors not required for "Introduce branch_pr lifecycle context resolver".

## Plan

1. Inspect current branch_pr route resolution in work start, pr sync, integrate, verify, finish, and hosted-close flows. 2. Add a shared resolver module that returns typed route context without changing command behavior. 3. Wire the safest read-only or validation consumers to the resolver only where it reduces duplication without expanding behavior. 4. Add focused unit/CLI coverage for base checkout, task worktree, missing branch, stale PR artifact, and protected-base route cases. 5. Verify with focused tests, typecheck, lint or targeted eslint, and doctor if runtime output changes.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/pr-flow* packages/agentplane/src/commands/branch/work-start*`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-27T09:27:22.852Z — VERIFY — ok

By: CODER

Note: Verified branch_pr lifecycle context resolver extraction: focused work-start/integrate tests passed, prepare unit tests passed under Vitest, typecheck passed, prettier/eslint passed on touched files. The original Verify Step glob for packages/agentplane/src/commands/pr-flow* does not match existing test files under zsh/bun, so equivalent current test paths were used.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T09:15:52.180Z, excerpt_hash=sha256:87e9ca8117b97b9a00539702f8b59ff89f792353bd43bc845415d2d564f6215a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
