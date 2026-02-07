---
id: "202602070855-ZXJ9M4"
title: "CommandContext: single bootstrap + memoization"
status: "DOING"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Refactor CLI dispatch to build a single CommandContext per invocation, remove repeated backend/config resolution, and add memoization for task list."
events:
  -
    type: "status"
    at: "2026-02-07T11:02:19.985Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Refactor CLI dispatch to build a single CommandContext per invocation, remove repeated backend/config resolution, and add memoization for task list."
doc_version: 2
doc_updated_at: "2026-02-07T11:02:19.985Z"
doc_updated_by: "CODER"
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


## Rollback Plan
