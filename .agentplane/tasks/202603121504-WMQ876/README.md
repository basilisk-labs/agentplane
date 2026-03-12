---
id: "202603121504-WMQ876"
title: "Adopt semantic patch operations across task commands"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202603121504-QCBVJX"
tags:
  - "code"
  - "cli"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T15:17:31.043Z"
  updated_by: "ORCHESTRATOR"
  note: "Proceed with task-command migration onto the new semantic patch layer."
verification:
  state: "ok"
  updated_at: "2026-03-12T15:36:47.325Z"
  updated_by: "CODER"
  note: "Semantic patch command migration checks passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: migrate task lifecycle commands onto semantic TaskStore patch operations."
events:
  -
    type: "status"
    at: "2026-03-12T15:17:36.825Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate task lifecycle commands onto semantic TaskStore patch operations."
  -
    type: "verify"
    at: "2026-03-12T15:36:47.325Z"
    author: "CODER"
    state: "ok"
    note: "Semantic patch command migration checks passed."
doc_version: 3
doc_updated_at: "2026-03-12T15:36:47.327Z"
doc_updated_by: "CODER"
description: "Migrate task doc/plan/verify/comment/start/block/set-status/finish/close flows to the TaskStore semantic patch API so append-safe operations merge cleanly and section writes stop building ad-hoc full task payloads."
id_source: "generated"
---
## Summary

Adopt semantic patch operations across task commands

Migrate task doc/plan/verify/comment/start/block/set-status/finish/close flows to the TaskStore semantic patch API so append-safe operations merge cleanly and section writes stop building ad-hoc full task payloads.

## Scope

- In scope: Migrate task doc/plan/verify/comment/start/block/set-status/finish/close flows to the TaskStore semantic patch API so append-safe operations merge cleanly and section writes stop building ad-hoc full task payloads.
- Out of scope: unrelated refactors not required for "Adopt semantic patch operations across task commands".

## Plan

1. Migrate task doc, task plan, and verify flows to TaskStore semantic patch operations instead of hand-building full next-task payloads.
2. Migrate comment, start, block, set-status, finish, and close flows to append/status/meta patch operations that merge safely against fresh state.
3. Keep command-level behavior stable while removing duplicated ad-hoc merge logic from individual task commands.

## Verify Steps

1. Run focused command/unit regressions for doc, plan, verify, comment, start, set-status, finish, and close flows after the patch-layer migration. Expected: section writes use semantic conflicts and append/status operations still merge cleanly.
2. Run CLI regression suites covering lifecycle and task command behavior. Expected: external command contracts remain stable.
3. Run lint and both package builds after command migration. Expected: no lint failures and both builds succeed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T15:36:47.325Z — VERIFY — ok

By: CODER

Note: Semantic patch command migration checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T15:36:47.118Z, excerpt_hash=sha256:d8956706be1e56ddecf2d4bda0819d2b1892885621c510806ffe234b3b28033b

Details:

Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/task/doc.ts packages/agentplane/src/commands/task/plan.ts packages/agentplane/src/commands/task/comment.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/commands/task/start.ts packages/agentplane/src/commands/task/block.ts packages/agentplane/src/commands/task/set-status.ts packages/agentplane/src/commands/task/close-shared.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts
Result: pass
Evidence: eslint exited 0 across migrated task commands and updated unit suites.
Scope: semantic patch runtime paths plus test doubles.

Command: bun x vitest run packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/workflow.task-doc.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts --hookTimeout 60000 --testTimeout 60000
Result: pass
Evidence: 174 tests passed across command-unit, workflow, task-doc, tasks, and lifecycle suites.
Scope: migrated doc/plan/verify/comment/start/block/set-status/finish/close contracts.

Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
Result: pass
Evidence: both package builds exited 0 after semantic patch command migration.
Scope: compile safety for shared core and CLI runtime.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Migrated doc/plan writes to TaskStore.patch() with stable section/doc preconditions so retries preserve unrelated fresh sections and surface same-section conflicts.
- Migrated verify/comment/start/block/set-status/finish/close flows to append/task/docMeta patch intents so comments, events, and status updates merge against fresh task state instead of rebuilding full task payloads.
- Updated command unit-test doubles to emulate semantic patch application rather than legacy store.update() semantics.
