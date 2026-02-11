---
id: "202602111631-2S7HGD"
title: "T1: Add deterministic test:precommit allowlist and wire lefthook"
result_summary: "Pre-commit now uses deterministic allowlisted test profile"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "testing"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-11T16:32:12.274Z"
  updated_by: "ORCHESTRATOR"
  note: "Plan approved."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "3ad6650bca2267ab1daec6fa35209112f7fb0722"
  message: "✅ 2S7HGD hooks: add deterministic test:precommit allowlist"
comments:
  -
    author: "CODER"
    body: "Start: implement deterministic test:precommit allowlist and switch pre-commit hook execution to it."
  -
    author: "CODER"
    body: "Verified: pre-commit now executes deterministic test:precommit allowlist, hook integration remains in test:hooks, and lint/tests/build pass."
events:
  -
    type: "status"
    at: "2026-02-11T16:32:12.459Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement deterministic test:precommit allowlist and switch pre-commit hook execution to it."
  -
    type: "status"
    at: "2026-02-11T16:33:18.996Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-commit now executes deterministic test:precommit allowlist, hook integration remains in test:hooks, and lint/tests/build pass."
doc_version: 2
doc_updated_at: "2026-02-11T16:33:18.996Z"
doc_updated_by: "CODER"
description: "Create a strict test:precommit script with explicit test file allowlist (no hook/release side effects) and switch lefthook pre-commit to use it."
id_source: "generated"
---
## Summary

Ввести детерминированный pre-commit тест-профиль на явном allowlist и убрать нестабильные side-effect тесты из hook-пути.

## Scope

In-scope: package.json scripts и lefthook.yml. Out-of-scope: изменение логики самих тестов.

## Plan

1) Добавить script test:precommit с явным списком unit/safe тестов. 2) Перевести lefthook pre-commit на этот скрипт. 3) Проверить lint + test:precommit + test:hooks + build.

## Risks

Риск: снизить coverage pre-commit. Смягчение: hook-интеграционные тесты остаются в отдельном test:hooks и CI.

## Verification


## Rollback Plan

Откатить коммит задачи и вернуть pre-commit на прежний test профиль.

## Context

Текущий pre-commit использует широкий профиль, который иногда приводит к нестабильности/шуму. Нужен короткий и предсказуемый набор тестов.

## Verify Steps

1) bun run lint\n2) bun run test:precommit\n3) bun run test:hooks\n4) bun run --filter=agentplane build

## Notes

### Decisions\n- Pre-commit profile должен быть фиксированным и коротким.\n### Implementation Notes\n- Заполняется после реализации.
