---
id: "202604062024-AEVV0A"
title: "Infer task context for commit-msg hook from task branch"
status: "TODO"
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
  updated_at: "2026-04-06T20:24:25.948Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-06T20:28:16.807Z"
  updated_by: "CODER"
  note: "Commit-msg hook now infers task context from task branches when AGENTPLANE_TASK_ID is unset; targeted hook vitest and eslint passed."
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-04-06T20:28:16.807Z"
    author: "CODER"
    state: "ok"
    note: "Commit-msg hook now infers task context from task branches when AGENTPLANE_TASK_ID is unset; targeted hook vitest and eslint passed."
doc_version: 3
doc_updated_at: "2026-04-06T20:28:16.812Z"
doc_updated_by: "CODER"
description: "Let task-like commit subjects pass in task branches/worktrees even when AGENTPLANE_TASK_ID is unset by deriving the task id from the current branch or workspace context."
sections:
  Summary: |-
    Infer task context for commit-msg hook from task branch
    
    Let task-like commit subjects pass in task branches/worktrees even when AGENTPLANE_TASK_ID is unset by deriving the task id from the current branch or workspace context.
  Scope: |-
    - In scope: Let task-like commit subjects pass in task branches/worktrees even when AGENTPLANE_TASK_ID is unset by deriving the task id from the current branch or workspace context.
    - Out of scope: unrelated refactors not required for "Infer task context for commit-msg hook from task branch".
  Plan: "1. Trace how commit-msg validation resolves task context today and where it hard-requires AGENTPLANE_TASK_ID. 2. Add a safe inference path from the current task branch/worktree context when the env var is absent. 3. Lock the behavior with hook or commit-subject regression tests. 4. Verify with targeted tests and one real hook-path check if feasible."
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts -t "hooks run commit-msg"`. Expected: commit-msg hook accepts task-like subjects on task branches when env is unset and still rejects them on non-task branches.
    2. Run `bun x eslint packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts`. Expected: lint exits 0.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T20:28:16.807Z — VERIFY — ok
    
    By: CODER
    
    Note: Commit-msg hook now infers task context from task branches when AGENTPLANE_TASK_ID is unset; targeted hook vitest and eslint passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T20:28:14.603Z, excerpt_hash=sha256:73c6c2ba0a920efc5b6c7de05c6188a7dcdee9726241f20a20676396afd763ae
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Root cause: commit-msg validation depended exclusively on `AGENTPLANE_TASK_ID`, even though task branch context was already available locally through git.
    - Impact: manual task-scoped commits in task worktrees failed unless the caller knew to inject hook context env manually.
    - Resolution: infer task context from `task/<id>/...` or `task-close/<id>/...` branch names before treating the subject as a non-task commit.
id_source: "generated"
---
## Summary

Infer task context for commit-msg hook from task branch

Let task-like commit subjects pass in task branches/worktrees even when AGENTPLANE_TASK_ID is unset by deriving the task id from the current branch or workspace context.

## Scope

- In scope: Let task-like commit subjects pass in task branches/worktrees even when AGENTPLANE_TASK_ID is unset by deriving the task id from the current branch or workspace context.
- Out of scope: unrelated refactors not required for "Infer task context for commit-msg hook from task branch".

## Plan

1. Trace how commit-msg validation resolves task context today and where it hard-requires AGENTPLANE_TASK_ID. 2. Add a safe inference path from the current task branch/worktree context when the env var is absent. 3. Lock the behavior with hook or commit-subject regression tests. 4. Verify with targeted tests and one real hook-path check if feasible.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts -t "hooks run commit-msg"`. Expected: commit-msg hook accepts task-like subjects on task branches when env is unset and still rejects them on non-task branches.
2. Run `bun x eslint packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts`. Expected: lint exits 0.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T20:28:16.807Z — VERIFY — ok

By: CODER

Note: Commit-msg hook now infers task context from task branches when AGENTPLANE_TASK_ID is unset; targeted hook vitest and eslint passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T20:28:14.603Z, excerpt_hash=sha256:73c6c2ba0a920efc5b6c7de05c6188a7dcdee9726241f20a20676396afd763ae

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Root cause: commit-msg validation depended exclusively on `AGENTPLANE_TASK_ID`, even though task branch context was already available locally through git.
- Impact: manual task-scoped commits in task worktrees failed unless the caller knew to inject hook context env manually.
- Resolution: infer task context from `task/<id>/...` or `task-close/<id>/...` branch names before treating the subject as a non-task commit.
