---
id: "202602111624-PVYP00"
title: "Hook pipeline: remove pre-commit recursion on agentplane commit"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "workflow"
  - "testing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-11T16:24:46.835Z"
  updated_by: "ORCHESTRATOR"
  note: "Plan approved."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split hook-safe pre-commit test profile from hook integration tests to remove recursive commit hook entry."
events:
  -
    type: "status"
    at: "2026-02-11T16:24:47.022Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split hook-safe pre-commit test profile from hook integration tests to remove recursive commit hook entry."
doc_version: 2
doc_updated_at: "2026-02-11T16:24:47.022Z"
doc_updated_by: "CODER"
description: "Split pre-commit test profile to avoid running hook-integration tests that can invoke nested git hooks during agentplane commit."
id_source: "generated"
---
## Summary

Устранить рекурсию pre-commit при agentplane commit через разделение test профилей.

## Scope

In-scope: package.json scripts и lefthook pre-commit command. Out-of-scope: полная переработка hook тестов.

## Plan

1) Ввести script test:fast:hook без hook-integration suites. 2) Переключить lefthook pre-commit на test:fast:hook. 3) Проверить lint и оба тестовых профиля.

## Risks

Риск: ослабить pre-commit coverage. Смягчение: добавить явный test:hooks для CI/manual запуска.

## Verification


## Rollback Plan

Откатить коммит задачи и вернуть прежние scripts/lefthook конфигурации.

## Context

Сейчас pre-commit запускает test:fast, где есть hook-интеграционные тесты, способные вызвать повторный вход в hook pipeline.

## Verify Steps

1) bun run lint\n2) bun run test:fast:hook\n3) bun run test:hooks\n4) bun run --filter=agentplane build

## Notes

### Decisions\n- Pre-commit должен быть быстрым и без self-recursive hook сценариев.\n### Implementation Notes\n- Заполняется после реализации.
