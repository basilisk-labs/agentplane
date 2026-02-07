---
id: "202602071040-KBKDVP"
title: "Guard --require-clean: ignore untracked + rebuild dist"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T10:40:55.112Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved by USER in chat (2026-02-07)."
verification:
  state: "ok"
  updated_at: "2026-02-07T10:45:48.804Z"
  updated_by: "ORCHESTRATOR"
  note: "Tests + dist build"
commit:
  hash: "79d83b850721035039a32f990950f03d8528f768"
  message: "✅ KBKDVP workflow: require-clean ignores untracked"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Align --require-clean semantics with AGENTS.md clean definition; rebuild dist to keep repo-local CLI output consistent."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run build + bun run test:cli:core + bun run test:core; require-clean now ignores untracked files per AGENTS.md clean definition."
events:
  -
    type: "status"
    at: "2026-02-07T10:40:59.652Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Align --require-clean semantics with AGENTS.md clean definition; rebuild dist to keep repo-local CLI output consistent."
  -
    type: "verify"
    at: "2026-02-07T10:45:48.804Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Tests + dist build"
  -
    type: "status"
    at: "2026-02-07T10:47:39.272Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run build + bun run test:cli:core + bun run test:core; require-clean now ignores untracked files per AGENTS.md clean definition."
doc_version: 2
doc_updated_at: "2026-02-07T10:47:39.272Z"
doc_updated_by: "ORCHESTRATOR"
description: "Fix mismatch between policy definition of clean (ignores untracked) and guard/ensureGitClean behavior; rebuild TypeScript dist so repo-local CLI output matches src changes (help/quickstart/work start)."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Добавить в core утилиту для “tracked-only” dirty check (без untracked).
2) Перевести guard commit --require-clean и ensureGitClean на tracked-only проверку, чтобы соответствовать AGENTS.md (clean = без untracked).
3) Пересобрать dist (bun run build), чтобы node packages/agentplane/bin/agentplane.js отражал изменения src (help/quickstart/work start).
4) Прогнать тесты: bun run test:cli:core (минимум) + при необходимости test:core.
5) Обновить Verification и закрыть задачу; экспортировать snapshot (task export) если требуется.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T10:45:48.804Z — VERIFY — ok

By: ORCHESTRATOR

Note: Tests + dist build

Details:

- bun run build (tsc -b)\n- bun run test:cli:core: PASS\n- bun run test:core: PASS\n- CLI help now shows: work start ... [--worktree]

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
