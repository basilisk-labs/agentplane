---
id: "202602070855-ZXJ9M4"
title: "CommandContext: single bootstrap + memoization"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602070855-CS7KA9"
tags:
  - "code"
  - "cli"
  - "perf"
verify:
  - "bun run typecheck"
  - "bun run test:cli:core"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T11:02:09.871Z"
  updated_by: "USER"
  note: "Approved in chat (2026-02-07)."
verification:
  state: "ok"
  updated_at: "2026-02-07T11:37:45.092Z"
  updated_by: "CODEX"
  note: "bun run typecheck; bun run test:cli:core; bun run lint"
commit:
  hash: "4b3463b366e70b6a571c739d4931d84ded8f9f63"
  message: "✅ ZXJ9M4 cli: bootstrap CommandContext and memoize loads"
comments:
  -
    author: "CODER"
    body: "Start: Refactor CLI dispatch to build a single CommandContext per invocation, remove repeated backend/config resolution, and add memoization for task list."
  -
    author: "CODEX"
    body: "Verified: bun run typecheck; bun run test:cli:core; bun run lint."
events:
  -
    type: "status"
    at: "2026-02-07T11:02:19.985Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Refactor CLI dispatch to build a single CommandContext per invocation, remove repeated backend/config resolution, and add memoization for task list."
  -
    type: "verify"
    at: "2026-02-07T11:37:45.092Z"
    author: "CODEX"
    state: "ok"
    note: "bun run typecheck; bun run test:cli:core; bun run lint"
  -
    type: "status"
    at: "2026-02-07T11:37:50.628Z"
    author: "CODEX"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run typecheck; bun run test:cli:core; bun run lint."
doc_version: 2
doc_updated_at: "2026-02-07T11:37:50.628Z"
doc_updated_by: "CODEX"
description: "Refactor CLI dispatch to create CommandContext once per command; remove repeated resolveProject/loadConfig/loadTaskBackend calls; add ctx.memo for taskList/changedPaths/headCommit and route all repeats through it."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Extend CommandContext to be the single per-command container (resolvedProject, config, taskBackend, memo).
2. Refactor run-cli dispatch to create CommandContext once and pass it into command entrypoints.
3. Migrate task and guard commands to accept ctx and stop calling resolveProject/loadConfig/loadTaskBackend directly.
4. Add ctx.memo.taskList (Promise<TaskData[]>) and route repeated listTasks calls through it.
5. Run: bun run typecheck; bun run test:cli:core; bun run lint.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T11:37:45.092Z — VERIFY — ok

By: CODEX

Note: bun run typecheck; bun run test:cli:core; bun run lint

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
