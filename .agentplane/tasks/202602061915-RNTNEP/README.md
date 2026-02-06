---
id: "202602061915-RNTNEP"
title: "P0: CommandContext для CLI команд"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "refactor"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T19:17:32.421Z"
  updated_by: "USER"
  note: "Approved by user on 2026-02-06: proceed with FIX2.md implementation; no backward-compat required."
verification:
  state: "ok"
  updated_at: "2026-02-06T19:19:26.497Z"
  updated_by: "TESTER"
  note: "bun run test:agentplane (vitest) passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement command-level context (resolved+config+backend) to remove repeated resolveProject/loadConfig/loadTaskBackend; add ctx-aware task loader and migrate call sites."
doc_version: 2
doc_updated_at: "2026-02-06T19:19:26.500Z"
doc_updated_by: "CODER"
description: "(Tracking=202602061915-XCPF92) Ввести единый Execution/CommandContext (resolved+config+backend) на вызов команды; дать API для загрузки задач из контекста; убрать повторные resolveProject/loadConfig/loadTaskBackend."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Add CommandContext builder that loads resolved+config+backend once per command.\n2) Add ctx-aware helpers to load tasks without reloading backend.\n3) Migrate a small initial call site to validate wiring.\n4) Add/adjust tests for context builder.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T19:19:26.497Z — VERIFY — ok

By: TESTER

Note: bun run test:agentplane (vitest) passed.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
