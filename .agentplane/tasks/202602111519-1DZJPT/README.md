---
id: "202602111519-1DZJPT"
title: "T9: init --backend redmine generates .env.example contract"
result_summary: "Init redmine flow now uses .env.example contract with optional .env seeding"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602111519-3TDCPX"
  - "202602111519-C4SP3F"
tags:
  - "cli"
  - "init"
  - "redmine"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-11T16:07:22.216Z"
  updated_by: "ORCHESTRATOR"
  note: "Plan approved."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "8b031790036c730a93cf18016ddf81710b76dd8f"
  message: "✅ 1DZJPT init: generate redmine env.example contract"
comments:
  -
    author: "CODER"
    body: "Start: adjust init redmine flow to generate a commit-safe .env.example contract and align tests/docs accordingly."
  -
    author: "CODER"
    body: "Verified: init now writes a Redmine .env.example contract, seeds .env only when absent, preserves existing .env values, and updated init backend tests/build pass."
events:
  -
    type: "status"
    at: "2026-02-11T16:07:22.395Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: adjust init redmine flow to generate a commit-safe .env.example contract and align tests/docs accordingly."
  -
    type: "status"
    at: "2026-02-11T16:10:00.543Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: init now writes a Redmine .env.example contract, seeds .env only when absent, preserves existing .env values, and updated init backend tests/build pass."
doc_version: 2
doc_updated_at: "2026-02-11T16:10:00.543Z"
doc_updated_by: "CODER"
description: "Switch init redmine env template generation to .env.example (optionally seed .env), ensure gitignore and flow consistency."
id_source: "generated"
---
## Summary

Сделать redmine init контрактным: генерировать коммитимый .env.example и не хранить секреты в backend settings.

## Scope

In-scope: init redmine env template output, сопутствующие тесты/доки. Out-of-scope: изменение runtime redmine parser beyond init flow.

## Plan

1) Изменить init генерацию на .env.example. 2) При необходимости создать .env из шаблона (если отсутствует). 3) Обновить тесты init и документацию.

## Risks

Риск: нарушить ожидаемое поведение существующих init-тестов и оставить грязное дерево. Смягчение: добавить явные assertions по файлам и gitignore.

## Verification


## Rollback Plan

Откатить коммит задачи и вернуть прежний init redmine flow генерации env файлов.

## Context

Требование: env-first setup, где .env.example — шаблон контракта, .env — локальный файл пользователя.

## Verify Steps

1) bun run test:agentplane -- packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts packages/agentplane/src/cli/run-cli.core.misc.test.ts\n2) bun run --filter=agentplane build

## Notes

### Decisions\n- .env.example должен быть каноническим шаблоном для redmine.\n### Implementation Notes\n- Заполнить после реализации.
