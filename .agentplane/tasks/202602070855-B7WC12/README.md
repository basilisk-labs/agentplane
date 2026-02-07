---
id: "202602070855-B7WC12"
title: "TaskStore: cached get/update/list + migrate status commands"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602070855-JBHZSB"
tags:
  - "code"
  - "tasks"
  - "perf"
verify:
  - "bun run typecheck"
  - "bun run test:agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T11:53:28.524Z"
  updated_by: "CODEX"
  note: "Approved by user in chat (2026-02-07)."
verification:
  state: "ok"
  updated_at: "2026-02-07T12:15:44.581Z"
  updated_by: "CODEX"
  note: "Verified: bun run typecheck; bun run lint; bun run test:agentplane"
commit:
  hash: "45d5e4dfc4b626b164f225ff21a4818419cf163e"
  message: "✅ B7WC12 tasks: use TaskStore.update for status/doc/plan/verify"
comments:
  -
    author: "CODEX"
    body: "start: add TaskStore cache layer and migrate status commands to update()"
  -
    author: "CODEX"
    body: "Verified: bun run typecheck; bun run lint; bun run test:agentplane. Summary: migrate task status/doc/plan/verify writes to TaskStore.update (cached read/parse + write-if-changed). Implementation: 45d5e4dfc4b6."
events:
  -
    type: "status"
    at: "2026-02-07T11:53:32.523Z"
    author: "CODEX"
    from: "TODO"
    to: "DOING"
    note: "start: add TaskStore cache layer and migrate status commands to update()"
doc_version: 2
doc_updated_at: "2026-02-07T12:16:15.482Z"
doc_updated_by: "CODEX"
description: "Add TaskStore layer per command to avoid read/parse/write duplication; implement update(taskId, updater) with mtime guard + writeIfChanged; migrate start/block/finish/verify/doc ops to TaskStore.update."
id_source: "explicit"
---
## Summary


## Scope


## Plan

1) Introduce TaskStore (per-command) that wraps ctx.taskBackend and caches task reads/parse by taskId/readmePath.
2) Implement TaskStore.get(taskId) reading + parsing once.
3) Implement TaskStore.update(taskId, updater): read+parse once, apply patch, render stable, write via write-if-changed, with mtime guard (detect concurrent modifications).
4) Implement TaskStore.list(): rely on backend list index without reading every README; allow lazy loads only when required.
5) Migrate lifecycle/status commands (start/block/finish/verify-record/task doc) from getTask+writeTask multi-step to TaskStore.update.
6) Run verify: bun run typecheck; bun run test:agentplane.
7) Commit with tight allowlist; finish task.

Risks:
- mtime guard correctness on different filesystems.
- accidental updated_at/doc_updated_at noise when content unchanged.

Rollback:
- revert TaskStore wiring and keep direct backend.getTask/writeTask flows.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T12:15:44.581Z — VERIFY — ok

By: CODEX

Note: Verified: bun run typecheck; bun run lint; bun run test:agentplane

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
