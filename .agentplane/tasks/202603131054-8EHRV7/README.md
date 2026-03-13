---
id: "202603131054-8EHRV7"
title: "Fix remaining lifecycle stale-snapshot races"
result_summary: "The remaining local-file lifecycle stale-snapshot class is closed for block, task set-status, finish, plan approve, and start."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "task-doc"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T10:55:10.970Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T11:06:23.284Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 75/75 tests passed. Scope: remaining lifecycle stale-snapshot regressions across block, set-status, finish, workflow, and CLI lifecycle paths. Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/task/block.ts packages/agentplane/src/commands/task/set-status.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts; Result: pass; Evidence: no lint errors. Scope: touched runtime and regression files. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both builds exited 0. Scope: repo-local CLI runtime build surfaces."
commit:
  hash: "1578877d8202bb2aead62ff79b53185b6849298c"
  message: "🩹 8EHRV7 task: fix remaining lifecycle stale-snapshot races"
comments:
  -
    author: "CODER"
    body: "Start: audit and fix the remaining lifecycle stale-snapshot races in local-file task commands."
  -
    author: "CODER"
    body: "Verified: block, set-status, and finish now derive lifecycle validation and commit metadata from the current local task state instead of stale initial snapshots."
events:
  -
    type: "status"
    at: "2026-03-13T10:55:11.904Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: audit and fix the remaining lifecycle stale-snapshot races in local-file task commands."
  -
    type: "verify"
    at: "2026-03-13T11:06:23.284Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 75/75 tests passed. Scope: remaining lifecycle stale-snapshot regressions across block, set-status, finish, workflow, and CLI lifecycle paths. Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/task/block.ts packages/agentplane/src/commands/task/set-status.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts; Result: pass; Evidence: no lint errors. Scope: touched runtime and regression files. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both builds exited 0. Scope: repo-local CLI runtime build surfaces."
  -
    type: "status"
    at: "2026-03-13T11:06:42.587Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: block, set-status, and finish now derive lifecycle validation and commit metadata from the current local task state instead of stale initial snapshots."
doc_version: 3
doc_updated_at: "2026-03-13T11:06:42.588Z"
doc_updated_by: "CODER"
description: "Audit and fix remaining local-file task lifecycle commands that still derive validation or status-commit metadata from stale initial snapshots before store-backed mutations."
id_source: "generated"
---
## Summary

Fix remaining lifecycle stale-snapshot races

Audit and fix remaining local-file task lifecycle commands that still derive validation or status-commit metadata from stale initial snapshots before store-backed mutations.

## Scope

- In scope: Audit and fix remaining local-file task lifecycle commands that still derive validation or status-commit metadata from stale initial snapshots before store-backed mutations.
- Out of scope: unrelated refactors not required for "Fix remaining lifecycle stale-snapshot races".

## Plan

1. Audit remaining lifecycle commands for stale initial snapshot reads before store-backed mutations.
2. Fix local-file `block`, `task set-status`, and `finish` to derive validation and status-commit metadata from current store-backed state.
3. Add focused regression coverage for each remaining stale-snapshot path.
4. Verify with targeted unit, CLI lifecycle, and build checks.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T11:06:23.284Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 75/75 tests passed. Scope: remaining lifecycle stale-snapshot regressions across block, set-status, finish, workflow, and CLI lifecycle paths. Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/task/block.ts packages/agentplane/src/commands/task/set-status.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts; Result: pass; Evidence: no lint errors. Scope: touched runtime and regression files. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both builds exited 0. Scope: repo-local CLI runtime build surfaces.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T11:06:12.416Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Remaining local-file stale-snapshot decisions were in `block`, `task set-status`, and `finish`.
- `block` and `set-status` now capture `statusFrom` and `primaryTag` from `current` inside `store.patch`, not from the first `store.get()` snapshot.
- `task set-status` also re-checks dependency readiness from the current task state inside the patch path.
- `finish` now validates `assertTaskCanFinish(...)` against the current local task state and captures status-commit metadata from that same state.
- Residual class left: generic race-free merge of independent non-doc task fields is still handled by retry + current-state patching, not by a broader transaction system.
