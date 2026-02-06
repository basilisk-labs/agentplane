---
id: "202602061915-KNHP1Y"
title: "P3: Распил run-cli.ts / recipes.ts / task-backend.ts"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T20:16:13.129Z"
  updated_by: "USER"
  note: "Approved by user in chat on 2026-02-06; proceed with refactors, no backward compatibility required."
verification:
  state: "ok"
  updated_at: "2026-02-06T20:27:58.516Z"
  updated_by: "TESTER"
  note: "Verified locally on 2026-02-06: scenario command extracted to its own module, git log hash/subject parsing made colon-safe; bun run lint, bun run test:agentplane, and bun run test:cli pass."
commit:
  hash: "44068eea70533c28c83b8aa859dde0fc86f28b98"
  message: "✨ KNHP1Y refactor"
comments:
  -
    author: "CODER"
    body: "Start: Split monolithic modules and centralize small helpers (recipes/scenario split, git log parsing, backend guard utils) to reduce duplication and improve testability."
  -
    author: "CODER"
    body: "Verified: Split scenario command implementation into its own module, extracted colon-safe git log hash/subject parsing, and reduced duplicated helper usage in task-backend; ran bun run lint, bun run test:agentplane, and bun run test:cli."
doc_version: 2
doc_updated_at: "2026-02-06T20:28:45.820Z"
doc_updated_by: "CODER"
description: "(Tracking=202602061915-XCPF92; depends_on=202602061915-RNTNEP,202602061915-DH1CKG) Разнести монолиты по доменным модулям, убрать локальные утилиты, упростить тестирование; без сохранения старых внутренних API, если не требуется."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Split commands/recipes.ts into focused modules (recipes vs scenario) while keeping run-cli wiring intact.
2) Extract colon-safe git log parsing into a shared helper and update all %H:%s call sites.
3) Remove a few duplicated micro-utils from backends/task-backend.ts by importing shared helpers (start with isRecord).
4) Run bun run lint + bun run test:cli + bun run test:agentplane.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T20:27:58.516Z — VERIFY — ok

By: TESTER

Note: Verified locally on 2026-02-06: scenario command extracted to its own module, git log hash/subject parsing made colon-safe; bun run lint, bun run test:agentplane, and bun run test:cli pass.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
