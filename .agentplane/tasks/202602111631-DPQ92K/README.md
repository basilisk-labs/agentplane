---
id: "202602111631-DPQ92K"
title: "T3: Improve agentplane commit pre-commit failure summary"
result_summary: "Added concise summarized diagnostics for commit hook failures."
risk_level: "low"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202602111631-2S7HGD"
tags:
  - "cli"
  - "ux"
  - "testing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-11T16:35:36.852Z"
  updated_by: "ORCHESTRATOR"
  note: "Plan approved."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "039b48283ae5f313722701a5a8fbe38b65e9f69f"
  message: "✅ DPQ92K commit: summarize pre-commit failures"
comments:
  -
    author: "CODER"
    body: "Start: add concise pre-commit failure summary in commit wrapper error path."
  -
    author: "CODER"
    body: "Verified: bunx vitest run packages/agentplane/src/cli/run-cli.core.guard.test.ts; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build."
events:
  -
    type: "status"
    at: "2026-02-11T16:35:37.033Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add concise pre-commit failure summary in commit wrapper error path."
  -
    type: "status"
    at: "2026-02-11T16:41:19.870Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bunx vitest run packages/agentplane/src/cli/run-cli.core.guard.test.ts; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build."
doc_version: 2
doc_updated_at: "2026-02-11T16:41:19.870Z"
doc_updated_by: "CODER"
description: "Emit concise root-cause diagnostics for pre-commit failures (failed command + first relevant lines), reducing noise from huge hook logs."
id_source: "generated"
---
## Summary

Сделать краткий root-cause summary при падении pre-commit в agentplane commit.

## Scope

In-scope: обработка ошибок commit wrapper. Out-of-scope: изменение поведения самих hooks.

## Plan

1) Перехватить stderr/stdout ошибки git commit. 2) Выделить короткую summary-часть (failed hook/command + первые релевантные строки). 3) Добавить/обновить тест на формат ошибки.

## Risks

Риск: потерять полезные детали. Смягчение: сохранить полный текст в debug/доп.поле, но показывать короткий summary в основной ошибке.

## Verification


## Rollback Plan

Откатить изменения commit wrapper и вернуть прежний формат ошибок.

## Context

Сейчас при падении git commit через hooks пользователь получает очень длинный лог и теряет главную причину.

## Verify Steps

1) bun run test:agentplane -- packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts\n2) bun run --filter=agentplane build

## Notes

### Decisions\n- Сначала показываем короткий корень причины, затем hint на полный лог.\n### Implementation Notes\n- Заполняется после реализации.
