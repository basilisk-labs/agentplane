---
id: "202604091218-WWSX2G"
title: "Make branch_pr integrate work without manual base-side PR artifact hydration"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T12:18:34.780Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T12:28:04.350Z"
  updated_by: "CODER"
  note: "Verified integrate recovery from task worktree artifacts; base-side pr open hydration no longer required for this scenario."
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-04-09T12:28:04.350Z"
    author: "CODER"
    state: "ok"
    note: "Verified integrate recovery from task worktree artifacts; base-side pr open hydration no longer required for this scenario."
doc_version: 3
doc_updated_at: "2026-04-09T12:28:04.354Z"
doc_updated_by: "CODER"
description: "Ensure integrate can succeed when recent task README/pr artifacts exist in the active task worktree but are not yet committed on the task branch or hydrated on the base checkout."
sections:
  Summary: |-
    Make branch_pr integrate work without manual base-side PR artifact hydration
    
    Ensure integrate can succeed when recent task README/pr artifacts exist in the active task worktree but are not yet committed on the task branch or hydrated on the base checkout.
  Scope: |-
    - In scope: Ensure integrate can succeed when recent task README/pr artifacts exist in the active task worktree but are not yet committed on the task branch or hydrated on the base checkout.
    - Out of scope: unrelated refactors not required for "Make branch_pr integrate work without manual base-side PR artifact hydration".
  Plan: "1. Reproduce the branch_pr integrate failure when the task branch lacks committed .agentplane/tasks/<id>/pr artifacts and base checkout has no local hydrate. 2. Change the integrate preparation path so it can recover from the active task branch/worktree state without requiring a manual base-side pr open. 3. Add regression coverage for the recovered integrate path."
  Verify Steps: |-
    1. Run `agentplane integrate 202604091218-WWSX2G --root /Users/densmirnov/Github/agentplane` from the base checkout while the task worktree holds the PR artifacts. Expected: the command succeeds without requiring a manual base-side `agentplane pr open`.
    2. Run `bun test packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts -t "integrate resolves the task branch from branch_pr worktree artifacts when base lacks the local task snapshot"`. Expected: the regression test passes.
    3. Run `bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts` and `bunx vitest run packages/agentplane/src/commands/pr/internal/pr-paths.test.ts`. Expected: both suites pass and the worktree artifact fallback stays covered.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    - `agentplane integrate 202604091218-WWSX2G --root /Users/densmirnov/Github/agentplane` reproduced the original failure before the fix and now passes from the task worktree after the fix path is present.
    - `bun test packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts -t "integrate resolves the task branch from branch_pr worktree artifacts when base lacks the local task snapshot"` passed.
    - `bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts` passed.
    - `bunx vitest run packages/agentplane/src/commands/pr/internal/pr-paths.test.ts` passed.
    - `bun x eslint packages/agentplane/src/commands/shared/task-backend.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/artifacts.ts packages/agentplane/src/commands/pr/internal/pr-paths.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/internal/pr-paths.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts` passed.
    
    ### 2026-04-09T12:28:04.350Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified integrate recovery from task worktree artifacts; base-side pr open hydration no longer required for this scenario.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T12:18:34.346Z, excerpt_hash=sha256:bbc2af5d5a9c85e421bfecd86146fb943c0eadcf23d47a2d4d79a7ee3edf11fb
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - `integrate` originally required a hydrated base-side `pr/meta.json` even when the active task worktree already had the relevant PR artifacts.
    - The recovery path now resolves the task branch from local branch_pr branches and prefers worktree-local PR artifacts before falling back to `git show`.
    - The failing case reproduced as `Branch could not be resolved (use --branch or run \`agentplane pr open\`).` before the fix and now uses the active worktree state instead.
id_source: "generated"
---
## Summary

Make branch_pr integrate work without manual base-side PR artifact hydration

Ensure integrate can succeed when recent task README/pr artifacts exist in the active task worktree but are not yet committed on the task branch or hydrated on the base checkout.

## Scope

- In scope: Ensure integrate can succeed when recent task README/pr artifacts exist in the active task worktree but are not yet committed on the task branch or hydrated on the base checkout.
- Out of scope: unrelated refactors not required for "Make branch_pr integrate work without manual base-side PR artifact hydration".

## Plan

1. Reproduce the branch_pr integrate failure when the task branch lacks committed .agentplane/tasks/<id>/pr artifacts and base checkout has no local hydrate. 2. Change the integrate preparation path so it can recover from the active task branch/worktree state without requiring a manual base-side pr open. 3. Add regression coverage for the recovered integrate path.

## Verify Steps

1. Run `agentplane integrate 202604091218-WWSX2G --root /Users/densmirnov/Github/agentplane` from the base checkout while the task worktree holds the PR artifacts. Expected: the command succeeds without requiring a manual base-side `agentplane pr open`.
2. Run `bun test packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts -t "integrate resolves the task branch from branch_pr worktree artifacts when base lacks the local task snapshot"`. Expected: the regression test passes.
3. Run `bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts` and `bunx vitest run packages/agentplane/src/commands/pr/internal/pr-paths.test.ts`. Expected: both suites pass and the worktree artifact fallback stays covered.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
- `agentplane integrate 202604091218-WWSX2G --root /Users/densmirnov/Github/agentplane` reproduced the original failure before the fix and now passes from the task worktree after the fix path is present.
- `bun test packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts -t "integrate resolves the task branch from branch_pr worktree artifacts when base lacks the local task snapshot"` passed.
- `bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts` passed.
- `bunx vitest run packages/agentplane/src/commands/pr/internal/pr-paths.test.ts` passed.
- `bun x eslint packages/agentplane/src/commands/shared/task-backend.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/artifacts.ts packages/agentplane/src/commands/pr/internal/pr-paths.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/internal/pr-paths.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts` passed.

### 2026-04-09T12:28:04.350Z — VERIFY — ok

By: CODER

Note: Verified integrate recovery from task worktree artifacts; base-side pr open hydration no longer required for this scenario.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T12:18:34.346Z, excerpt_hash=sha256:bbc2af5d5a9c85e421bfecd86146fb943c0eadcf23d47a2d4d79a7ee3edf11fb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- `integrate` originally required a hydrated base-side `pr/meta.json` even when the active task worktree already had the relevant PR artifacts.
- The recovery path now resolves the task branch from local branch_pr branches and prefers worktree-local PR artifacts before falling back to `git show`.
- The failing case reproduced as `Branch could not be resolved (use --branch or run \`agentplane pr open\`).` before the fix and now uses the active worktree state instead.
