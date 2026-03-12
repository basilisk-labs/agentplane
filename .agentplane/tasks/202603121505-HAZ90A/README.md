---
id: "202603121505-HAZ90A"
title: "Cover semantic patch conflicts and merge behavior"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on:
  - "202603121504-QCBVJX"
  - "202603121504-WMQ876"
tags:
  - "code"
  - "cli"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T15:34:23.790Z"
  updated_by: "ORCHESTRATOR"
  note: "Proceed with targeted regressions for semantic patch conflicts and merge behavior."
verification:
  state: "ok"
  updated_at: "2026-03-12T15:40:47.577Z"
  updated_by: "CODER"
  note: "Semantic patch regression coverage checks passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add targeted semantic patch conflict and merge regressions for task commands."
events:
  -
    type: "status"
    at: "2026-03-12T15:37:32.595Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add targeted semantic patch conflict and merge regressions for task commands."
  -
    type: "verify"
    at: "2026-03-12T15:40:47.577Z"
    author: "CODER"
    state: "ok"
    note: "Semantic patch regression coverage checks passed."
doc_version: 3
doc_updated_at: "2026-03-12T15:40:47.579Z"
doc_updated_by: "CODER"
description: "Add regression coverage and documentation sync for the TaskStore semantic patch layer, including same-section conflicts, append-safe merges, lifecycle behavior, and user-facing help/reference updates."
id_source: "generated"
---
## Summary

Cover semantic patch conflicts and merge behavior

Add regression coverage and documentation sync for the TaskStore semantic patch layer, including same-section conflicts, append-safe merges, lifecycle behavior, and user-facing help/reference updates.

## Scope

- In scope: Add regression coverage and documentation sync for the TaskStore semantic patch layer, including same-section conflicts, append-safe merges, lifecycle behavior, and user-facing help/reference updates.
- Out of scope: unrelated refactors not required for "Cover semantic patch conflicts and merge behavior".

## Plan

1. Add regression coverage for same-section conflicts, append-safe merges, and retry behavior across the semantic patch layer.
2. Sync user-facing help and generated CLI reference if the patch-layer work changes any command wording or operational guidance.
3. Run the final focused verification matrix and record residual tradeoffs in task findings.

## Verify Steps

1. Run the semantic patch regression matrix, including TaskStore tests, task command tests, lifecycle CLI suites, and any help/docs checks touched by the change. Expected: conflicts and merge-safe paths behave as designed end to end.
2. Run lint on all touched runtime/spec/test files. Expected: no new lint violations.
3. Build @agentplaneorg/core and agentplane after the final patch-layer integration. Expected: both builds succeed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T15:40:47.577Z — VERIFY — ok

By: CODER

Note: Semantic patch regression coverage checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T15:40:47.431Z, excerpt_hash=sha256:2829747c39ce0b15fb10daf85de997d810519a78eff7328cd8461b74b71cd7a5

Details:

Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts
Result: pass
Evidence: eslint exited 0 across touched semantic patch regression files.
Scope: new store-level and command-level regression coverage.

Command: bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/workflow.task-doc.test.ts packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts --hookTimeout 60000 --testTimeout 60000
Result: pass
Evidence: 132 tests passed across store, command-unit, task-doc, and lifecycle CLI suites.
Scope: semantic patch conflicts, merge-safe retries, and lifecycle behavior.

Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
Result: pass
Evidence: both package builds exited 0 after the final semantic patch regression additions.
Scope: compile safety for final integrated patch-layer state.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Added a TaskStore regression for full-doc replace conflicts so expectedCurrentDoc preconditions are covered alongside section-level conflicts.
- Added command-level regressions proving task doc set and task plan set surface semantic section-conflict reason codes instead of collapsing them into generic backend I/O failures.
- Confirmed no help or generated CLI reference changes were needed because the patch-layer work did not alter command wording or flags.
