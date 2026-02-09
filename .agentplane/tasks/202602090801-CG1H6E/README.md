---
id: "202602090801-CG1H6E"
title: "CLI: reject duplicate command ids at registry registration"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on:
  - "202602090801-94JEFQ"
tags:
  - "cli"
  - "refactor"
  - "testing"
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
doc_updated_at: "2026-02-09T08:03:54.376Z"
doc_updated_by: "CODER"
description: "Add a safety check in CommandRegistry.register to throw on duplicate id registration so behavior is deterministic and fails fast."
id_source: "generated"
---
## Summary

Добавить защиту в CommandRegistry.register: при попытке зарегистрировать дубликат id бросать ошибку сразу.

## Scope

packages/agentplane/src/cli/spec/registry.ts
packages/agentplane/src/cli/spec/registry.test.ts

## Plan

1. В register() проверять, что id.join(" ") не встречался ранее.
2. Бросать CliError(E_INTERNAL) с указанием id и конфликтующих команд.
3. Добавить тест на дубликат.

## Risks

Риск: сломать существующие тесты/код, если где-то есть реальные дубликаты.
Митигация: сначала прогон test:full, при обнаружении дубликата устранить на месте.

## Verify Steps

1. bun run lint
2. bun run test:full

## Verification

Pending.

## Rollback Plan

git revert соответствующего коммита, затем bun run test:full.
