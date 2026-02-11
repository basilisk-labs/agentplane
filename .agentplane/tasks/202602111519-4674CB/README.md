---
id: "202602111519-4674CB"
title: "T11: ANSI-aware box width calculation in init UI"
result_summary: "Init UI box alignment is now ANSI-safe"
risk_level: "low"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "init"
  - "ux"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-11T16:12:01.454Z"
  updated_by: "ORCHESTRATOR"
  note: "Plan approved."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "51ae80e44a293bb7260f740dd6ce6a7de12badfa"
  message: "✅ 4674CB init-ui: make ansi box width alignment robust"
comments:
  -
    author: "CODER"
    body: "Start: make init UI box width ANSI-aware and add regression tests for colored rendering alignment."
  -
    author: "CODER"
    body: "Verified: init UI now calculates box width by visible characters (ANSI stripped), and added regression test confirms border alignment when colors are enabled."
events:
  -
    type: "status"
    at: "2026-02-11T16:12:01.657Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make init UI box width ANSI-aware and add regression tests for colored rendering alignment."
  -
    type: "status"
    at: "2026-02-11T16:13:27.898Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: init UI now calculates box width by visible characters (ANSI stripped), and added regression test confirms border alignment when colors are enabled."
doc_version: 2
doc_updated_at: "2026-02-11T16:13:27.898Z"
doc_updated_by: "CODER"
description: "Fix ui.ts box width/padding for ANSI-colored lines via visible length helper and add tests."
id_source: "generated"
---
## Summary

Исправить расчёт ширины ASCII-рамки в init UI при ANSI-цветах.

## Scope

In-scope: init/ui.ts + unit tests для visible length/padding. Out-of-scope: редизайн самого UI.

## Plan

1) Добавить stripAnsi/visibleLen helper. 2) Пересчитать box width и padding по видимой длине. 3) Добавить тест на цветной контент.

## Risks

Риск: регресс текстового вывода в non-TTY. Смягчение: тест с цветом и обычным режимом.

## Verification


## Rollback Plan

Откатить коммит задачи и вернуть прежнюю реализацию box/padLine.

## Context

Сейчас ширина считается по .length, поэтому при цветных escape-последовательностях рамки плывут.

## Verify Steps

1) bun run test:agentplane -- packages/agentplane/src/cli/run-cli/commands/init/ui.test.ts packages/agentplane/src/cli/run-cli.core.misc.test.ts\n2) bun run --filter=agentplane build

## Notes

### Decisions\n- Видимая ширина должна игнорировать ANSI escape-коды.\n### Implementation Notes\n- Заполнить после реализации.
