---
id: "202602090801-TCX3SJ"
title: "CLI: fix --json errors on global parse failure"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "bug"
  - "testing"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 2
doc_updated_at: "2026-02-09T08:03:50.777Z"
doc_updated_by: "CODER"
description: "When parseGlobalArgs throws before globals are returned, --json should still force JSON error output. Implement an argv prescan and add regression test."
id_source: "generated"
---
## Summary

Исправить поведение CLI: если parseGlobalArgs падает до возврата globals, наличие --json в argv должно включать JSON-формат ошибок. Добавить регрессионный тест.

## Scope

packages/agentplane/src/cli/run-cli.ts
packages/agentplane/src/cli/run-cli.global-args.ts (если нужно)
packages/agentplane/src/cli/run-cli.core.test.ts (или новый unit test рядом)

## Plan

1. Добавить легкий прескан argv на --json до parseGlobalArgs.
2. Прокинуть результат в обработчик ошибок (jsonErrors).
3. Добавить тест: agentplane --json --root (без значения) возвращает JSON error.

## Risks

Риск: прескан ошибочно интерпретирует --json после id команды.
Митигация: сканировать только «глобальную зону» до --/команды или следовать текущей семантике parseGlobalArgs.

## Verify Steps

1. bun run lint
2. bun run test:full
3. bun run coverage

## Verification

Pending.

## Rollback Plan

git revert соответствующего коммита, затем bun run test:full.
