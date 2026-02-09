---
id: "202602090801-349KZ4"
title: "CLI refactor: command catalog + fast help groundwork"
status: "TODO"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "cli"
  - "refactor"
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
doc_updated_at: "2026-02-09T08:03:15.446Z"
doc_updated_by: "ORCHESTRATOR"
description: "Tracking task for initial CLI refactor steps: fix json error-mode edge case; add registry consistency guards; introduce a single command catalog; split help/run registries to avoid heavy imports."
id_source: "generated"
---
## Summary

Цель: выполнить стартовый пакет рефакторинга CLI (шаги 1–5) с минимальными UX-изменениями: исправить edge-case JSON-ошибок, добавить предохранители на реестры команд, убрать дублирование списков и сделать «fast help» реально легким по импортам.

Успех: все тесты проходят; состав команд не расходится между help/run; help-путь не тянет тяжелые импорты статически.

## Scope

In-scope:
- packages/agentplane/src/cli/run-cli.ts
- packages/agentplane/src/cli/run-cli/registry.ts (и замена на новые модули)
- packages/agentplane/src/cli/spec/* (если понадобится)
- tests: packages/agentplane/src/cli/*

Out-of-scope (на этом этапе):
- массовое разделение spec/handler
- lazy import обработчиков
- редизайн UX флагов (кроме точечного bugfix)

## Plan

1. Выполнить зависимые задачи: TCX3SJ -> 94JEFQ -> CG1H6E -> SFNBH7 -> H3DVFH.
2. После каждого шага прогонять lint + test:full.
3. В конце прогнать coverage и проверить, что help-снапшоты/контракты не изменились неожиданно.

## Risks

Риск: изменение help-вывода (порядок/формат/набор команд).
Митигация: существующие help снапшот/контракт тесты; добавить тест равенства наборов команд help/run.

Риск: регрессия в роутинге/матчинге команд из-за правок реестра.
Митигация: cli-smoke + test:full.

## Verify Steps

1. bun run lint
2. bun run test:full
3. bun run coverage

## Verification

Pending.

## Rollback Plan

Откат: git revert коммитов задач в обратном порядке, затем bun run test:full.

## Context

Основание: текущая архитектура CLI держит два вручную поддерживаемых списка команд и статически импортирует обработчики в registry.ts, из-за чего help-ветка не выигрывает по cold start. Также найден баг: глобальный флаг --json не применяется к ошибкам, возникающим до успешного parseGlobalArgs.

## Notes

### Tasks
- 202602090801-TCX3SJ
- 202602090801-94JEFQ
- 202602090801-CG1H6E
- 202602090802-SFNBH7
- 202602090802-H3DVFH

### Approvals / Overrides
- require_plan=false, require_verify=false (см. config).
