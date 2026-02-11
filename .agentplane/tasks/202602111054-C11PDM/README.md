---
id: "202602111054-C11PDM"
title: "Init backend install: only selected backend"
result_summary: "Backend initialization respects selected backend and tests were updated/passed."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602111054-ZNST44"
tags:
  - "cli"
  - "init"
  - "code"
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
commit:
  hash: "16e1fcc971fa557e665eb80c6b54b2593909542e"
  message: "✅ C11PDM task: init now writes backend artifacts only for the selected backend and no longer creates both local and redmine stubs"
comments:
  -
    author: "CODER"
    body: "Start: ensure init writes backend artifacts only for the selected backend"
  -
    author: "CODER"
    body: "Verified: init now writes backend artifacts only for the selected backend and no longer creates both local and redmine stubs"
events:
  -
    type: "status"
    at: "2026-02-11T10:57:22.550Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: ensure init writes backend artifacts only for the selected backend"
  -
    type: "status"
    at: "2026-02-11T10:59:19.882Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: init now writes backend artifacts only for the selected backend and no longer creates both local and redmine stubs"
doc_version: 2
doc_updated_at: "2026-02-11T10:59:20.158Z"
doc_updated_by: "CODER"
description: "Fix init so it installs only chosen backend artifacts (local OR redmine), not both."
id_source: "generated"
---
## Summary

Исправить init: создавать только выбранный backend (local или redmine).

## Scope

In scope: init backend path/stub generation и тесты init --backend. Out of scope: runtime backend switching.

## Plan

1) Локализовать writeBackendStubs. 2) Создавать директории/файлы только под выбранный backend. 3) Обновить тесты.

## Risks

Риск: сломать ожидаемую структуру .agentplane/backends. Смягчение: сохранить корневую папку backends, но создавать только выбранный stub.

## Verify Steps

- bun run test:cli:core -- packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts
- bun run lint -- packages/agentplane/src/cli/run-cli/commands/init.ts packages/agentplane/src/cli/run-cli/commands/init/write-config.ts

## Verification

При init --backend local существует только local/backend.json; при redmine — только redmine/backend.json.

## Rollback Plan

Откатить изменения init backend generation и тестов.
