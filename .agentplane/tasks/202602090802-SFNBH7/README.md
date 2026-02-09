---
id: "202602090802-SFNBH7"
title: "CLI: introduce unified command catalog"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on:
  - "202602090801-CG1H6E"
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
doc_updated_at: "2026-02-09T08:03:56.173Z"
doc_updated_by: "CODER"
description: "Create a single source of truth for command specs/registrations and build both help and run registries from it to remove duplicated lists."
id_source: "generated"
---
## Summary

Ввести единый каталог команд (единый источник правды) и строить help/run registry из него, убрав ручное дублирование списков.

## Scope

packages/agentplane/src/cli/run-cli/*
packages/agentplane/src/cli/run-cli/command-catalog.ts (новый)
tests: packages/agentplane/src/cli/run-cli.core.help-contract.test.ts и др.

## Plan

1. Создать command-catalog.ts со списком команд (spec + registration).
2. Переписать buildRegistry/buildHelpFastRegistry, чтобы они строились из каталога.
3. Убедиться, что контракты help не изменились.

## Risks

Риск: изменение порядка регистрации и следом порядок help/матчинга.
Митигация: сохранять существующий порядок в каталоге; прогон help снапшотов.

## Verify Steps

1. bun run lint
2. bun run test:full
3. bun run coverage

## Verification

Pending.

## Rollback Plan

git revert соответствующего коммита, затем bun run test:full.
