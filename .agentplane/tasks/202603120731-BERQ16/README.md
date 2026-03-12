---
id: "202603120731-BERQ16"
title: "Patch stabilization: simplify task-doc write surface and outcome reporting"
result_summary: "stable task-doc outcome reporting"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "tasks"
verify:
  - "bun x vitest run packages/core/src/tasks/task-doc.test.ts packages/core/src/tasks/task-readme-io.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts --hookTimeout 60000 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T07:31:40.450Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved in chat for the next patch stabilization task graph."
verification:
  state: "ok"
  updated_at: "2026-03-12T07:56:44.161Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/core/src/tasks/task-doc.test.ts packages/core/src/tasks/task-readme-io.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 3 files, 81 tests passed after lint-clean retry, including stable section/full-doc/no-change outcomes and a true no-op path without redundant README rewrites; Scope: task-doc write outcome reporting and no-op semantics."
commit:
  hash: "87508eaac4e40e9941ce815e939d20aef4a1e581"
  message: "✨ BERQ16 task-doc: stabilize doc set outcomes"
comments:
  -
    author: "CODER"
    body: "Start: simplify task-doc write behavior so section updates and no-op/full-doc outcomes are easier to understand without weakening the README contract."
  -
    author: "CODER"
    body: "Verified: task doc set now reports stable section/full-doc/no-change outcomes and skips redundant README rewrites on semantic no-op updates."
events:
  -
    type: "status"
    at: "2026-03-12T07:48:55.372Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: simplify task-doc write behavior so section updates and no-op/full-doc outcomes are easier to understand without weakening the README contract."
  -
    type: "verify"
    at: "2026-03-12T07:54:56.669Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/core/src/tasks/task-doc.test.ts packages/core/src/tasks/task-readme-io.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 3 files, 81 tests passed, including stable section/full-doc/no-change outcomes and a true no-op path without redundant README rewrites; Scope: task-doc write outcome reporting and no-op semantics."
  -
    type: "verify"
    at: "2026-03-12T07:56:44.161Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/core/src/tasks/task-doc.test.ts packages/core/src/tasks/task-readme-io.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 3 files, 81 tests passed after lint-clean retry, including stable section/full-doc/no-change outcomes and a true no-op path without redundant README rewrites; Scope: task-doc write outcome reporting and no-op semantics."
  -
    type: "status"
    at: "2026-03-12T07:58:25.108Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: task doc set now reports stable section/full-doc/no-change outcomes and skips redundant README rewrites on semantic no-op updates."
doc_version: 3
doc_updated_at: "2026-03-12T07:58:25.108Z"
doc_updated_by: "CODER"
description: "Reduce confusing task-doc write modes and make task-doc outcomes more directly legible without changing the README contract."
id_source: "generated"
---
## Summary

Simplify the task-doc write surface so common task README updates are easier to reason about and command outcomes are more directly legible.

## Scope

In scope: task-doc command behavior, outcome reporting, and low-risk simplifications that preserve the README v3 contract. Out of scope: a broader task workflow redesign or policy changes unrelated to task-doc writes.

## Plan

1. Audit the current task-doc write modes and identify the highest-confusion paths that still exist after recent fixes.\n2. Simplify or tighten the default happy path without breaking the active README contract.\n3. Extend task-doc tests so the new behavior is explicit and regression-resistant.

## Verify Steps

1. Run `bun x vitest run packages/core/src/tasks/task-doc.test.ts packages/core/src/tasks/task-readme-io.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: task-doc and task CLI tests pass with the simplified outcome behavior.
2. Review representative `task doc` outcomes in tests. Expected: the command makes it obvious whether it updated the target section, rewrote the full doc, or made no effective change.

## Verification

Pending implementation. Verification evidence will be recorded after the declared checks run.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T07:54:56.669Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/core/src/tasks/task-doc.test.ts packages/core/src/tasks/task-readme-io.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 3 files, 81 tests passed, including stable section/full-doc/no-change outcomes and a true no-op path without redundant README rewrites; Scope: task-doc write outcome reporting and no-op semantics.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T07:48:55.372Z, excerpt_hash=sha256:131e727d0292d06db323260662f4eadcf97013cd189c46490f069847bbe7a4ab

#### 2026-03-12T07:56:44.161Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/core/src/tasks/task-doc.test.ts packages/core/src/tasks/task-readme-io.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 3 files, 81 tests passed after lint-clean retry, including stable section/full-doc/no-change outcomes and a true no-op path without redundant README rewrites; Scope: task-doc write outcome reporting and no-op semantics.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T07:54:56.670Z, excerpt_hash=sha256:131e727d0292d06db323260662f4eadcf97013cd189c46490f069847bbe7a4ab

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task-doc behavior and related tests so command semantics return to the prior multi-mode surface if the simplification breaks existing task README update flows.

## Findings
