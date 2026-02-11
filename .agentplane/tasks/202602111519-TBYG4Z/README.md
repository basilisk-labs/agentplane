---
id: "202602111519-TBYG4Z"
title: "T10: Deduplicate execution presets via core builder"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "config"
  - "refactor"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-11T16:10:52.394Z"
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
    body: "Start: replace duplicated init execution presets with core buildExecutionProfile integration."
events:
  -
    type: "status"
    at: "2026-02-11T16:10:52.571Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace duplicated init execution presets with core buildExecutionProfile integration."
doc_version: 2
doc_updated_at: "2026-02-11T16:10:52.571Z"
doc_updated_by: "CODER"
description: "Remove init-local execution preset builder and reuse @agentplaneorg/core buildExecutionProfile."
id_source: "generated"
---
## Summary

Убрать дублирование execution preset-ов в init и использовать единый builder из core.

## Scope

In-scope: init.ts wiring на core buildExecutionProfile и связанные тесты. Out-of-scope: изменение самих preset-значений.

## Plan

1) Удалить локальный builder в init.ts. 2) Импортировать buildExecutionProfile из core. 3) Прогнать init regression tests и сборку.

## Risks

Риск: незаметное расхождение типов execution в write-config. Смягчение: компиляция и init-тесты.

## Verification


## Rollback Plan

Откатить коммит задачи и вернуть локальный builder в init.ts.

## Context

Сейчас init хранит локальную копию profile preset-ов, что создаёт риск дрифта.

## Verify Steps

1) bun run test:agentplane -- packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts\n2) bun run --filter=@agentplaneorg/core build\n3) bun run --filter=agentplane build

## Notes

### Decisions\n- Источник истины для execution preset-ов: @agentplaneorg/core.\n### Implementation Notes\n- Заполнить после реализации.
