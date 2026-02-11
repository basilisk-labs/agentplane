---
id: "202602111519-C4SP3F"
title: "T8: Redmine missing-vs-invalid env error separation"
result_summary: "Redmine env errors now explicitly distinguish missing and invalid keys"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602111519-3TDCPX"
tags:
  - "backend"
  - "redmine"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-11T16:01:37.506Z"
  updated_by: "ORCHESTRATOR"
  note: "Plan approved for implementation."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "cf0f6ddeacbc4b9f3e2f10e86fe1291853658c2f"
  message: "✅ C4SP3F redmine: split missing vs invalid env diagnostics"
comments:
  -
    author: "CODER"
    body: "Start: implement explicit missing-vs-invalid Redmine env diagnostics and update backend call-sites to use env key names."
  -
    author: "CODER"
    body: "Verified: Redmine env diagnostics now distinguish missing keys from invalid values, backend call-sites point to explicit AGENTPLANE_REDMINE_* keys, and focused backend tests/build passed."
events:
  -
    type: "status"
    at: "2026-02-11T16:01:37.694Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement explicit missing-vs-invalid Redmine env diagnostics and update backend call-sites to use env key names."
  -
    type: "status"
    at: "2026-02-11T16:06:36.597Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Redmine env diagnostics now distinguish missing keys from invalid values, backend call-sites point to explicit AGENTPLANE_REDMINE_* keys, and focused backend tests/build passed."
doc_version: 2
doc_updated_at: "2026-02-11T16:06:36.597Z"
doc_updated_by: "CODER"
description: "Split Redmine env errors into missing/invalid with exact env key and expected format; remove backend.json guidance for custom_fields."
id_source: "generated"
---
## Summary

Разделить ошибки конфигурации Redmine на два типа: отсутствующий env-ключ и невалидное env-значение.

## Scope

In-scope: redmine env parser/messages и связанные call-site в backend. Out-of-scope: изменение схемы backend settings.

## Plan

1) Вынести отдельные helpers для missing/invalid env. 2) Обновить env parser и redmine-backend call-site. 3) Обновить тесты на тексты ошибок.

## Risks

Риск: поломать текущие ожидания тестов и совместимость текстов ошибок. Смягчение: обновить только целевые regex-проверки.

## Verification


## Rollback Plan

Откатить коммит задачи; восстановить единый redmineConfigMissingMessage и прежние call-site.

## Context

После перехода на env-first конфиг нужен точный диагноз по ключам, без ссылок на backend.json для custom fields.

## Verify Steps

1) bun run test:agentplane -- packages/agentplane/src/backends/task-backend/redmine/env.test.ts packages/agentplane/src/backends/task-backend.test.ts\n2) bun run --filter=agentplane build

## Notes

### Decisions\n- Ошибки должны ссылаться на конкретные AGENTPLANE_REDMINE_* ключи.\n### Implementation Notes\n- Заполняется после реализации.
