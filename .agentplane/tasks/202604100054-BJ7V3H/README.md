---
id: "202604100054-BJ7V3H"
title: "Make fresh branch_pr worktrees runnable before repo-local PR commands"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-10T00:55:39.773Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-10T01:11:06.441Z"
  updated_by: "CODER"
  note: "bootstrap: bun run framework:dev:bootstrap; runtime: agentplane runtime explain; vitest: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts -t 'work start makes a fresh framework worktree immediately runnable for repo-local commands'; eslint: bun x eslint packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-04-10T01:11:06.441Z"
    author: "CODER"
    state: "ok"
    note: "bootstrap: bun run framework:dev:bootstrap; runtime: agentplane runtime explain; vitest: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts -t 'work start makes a fresh framework worktree immediately runnable for repo-local commands'; eslint: bun x eslint packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
doc_version: 3
doc_updated_at: "2026-04-10T01:11:06.443Z"
doc_updated_by: "CODER"
description: "Let a fresh framework worktree run repo-local commands like pr open without requiring a manual framework:dev:bootstrap step."
sections:
  Summary: |-
    Make fresh branch_pr worktrees runnable before repo-local PR commands
    
    Let a fresh framework worktree run repo-local commands like pr open without requiring a manual framework:dev:bootstrap step.
  Scope: |-
    - In scope: Let a fresh framework worktree run repo-local commands like pr open without requiring a manual framework:dev:bootstrap step.
    - Out of scope: unrelated refactors not required for "Make fresh branch_pr worktrees runnable before repo-local PR commands".
  Plan: |-
    1. Reproduce the fresh framework worktree failure before manual bootstrap.
    2. Fix the worktree/runtime/bootstrap path so repo-local commands can start immediately after work start --worktree.
    3. Add regression coverage for a fresh worktree invoking a repo-local PR command.
    4. Verify with targeted tests and a framework-worktree smoke path if needed.
  Verify Steps: |-
    1. Create or simulate a fresh branch_pr framework worktree and run the relevant repo-local command. Expected: it no longer fails with a manual bootstrap requirement.
    2. Run the new bootstrap/runtime regression test. Expected: the repo-local command path succeeds without unexpected installs or dependency errors.
    3. Inspect the runtime/bootstrap branch. Expected: common-root reuse remains safe and existing bootstrap guidance still works for genuinely missing dependencies.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-10T01:11:06.441Z — VERIFY — ok
    
    By: CODER
    
    Note: bootstrap: bun run framework:dev:bootstrap; runtime: agentplane runtime explain; vitest: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts -t 'work start makes a fresh framework worktree immediately runnable for repo-local commands'; eslint: bun x eslint packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T00:55:39.548Z, excerpt_hash=sha256:e4f95c9c4881b6e259a12fb9b3bedef950a0c513b7fa1f2f65cd916b987d8cf8
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make fresh branch_pr worktrees runnable before repo-local PR commands

Let a fresh framework worktree run repo-local commands like pr open without requiring a manual framework:dev:bootstrap step.

## Scope

- In scope: Let a fresh framework worktree run repo-local commands like pr open without requiring a manual framework:dev:bootstrap step.
- Out of scope: unrelated refactors not required for "Make fresh branch_pr worktrees runnable before repo-local PR commands".

## Plan

1. Reproduce the fresh framework worktree failure before manual bootstrap.
2. Fix the worktree/runtime/bootstrap path so repo-local commands can start immediately after work start --worktree.
3. Add regression coverage for a fresh worktree invoking a repo-local PR command.
4. Verify with targeted tests and a framework-worktree smoke path if needed.

## Verify Steps

1. Create or simulate a fresh branch_pr framework worktree and run the relevant repo-local command. Expected: it no longer fails with a manual bootstrap requirement.
2. Run the new bootstrap/runtime regression test. Expected: the repo-local command path succeeds without unexpected installs or dependency errors.
3. Inspect the runtime/bootstrap branch. Expected: common-root reuse remains safe and existing bootstrap guidance still works for genuinely missing dependencies.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-10T01:11:06.441Z — VERIFY — ok

By: CODER

Note: bootstrap: bun run framework:dev:bootstrap; runtime: agentplane runtime explain; vitest: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts -t 'work start makes a fresh framework worktree immediately runnable for repo-local commands'; eslint: bun x eslint packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T00:55:39.548Z, excerpt_hash=sha256:e4f95c9c4881b6e259a12fb9b3bedef950a0c513b7fa1f2f65cd916b987d8cf8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
