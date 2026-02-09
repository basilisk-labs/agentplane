---
id: "202602090802-SFNBH7"
title: "CLI: introduce unified command catalog"
result_summary: "No-op: already implemented"
status: "DONE"
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
  state: "ok"
  updated_at: "2026-02-09T08:08:54.795Z"
  updated_by: "CODER"
  note: "No-op: unified command catalog already exists at packages/agentplane/src/cli/run-cli/command-catalog.ts and is used by run-cli.ts to route and load handlers lazily."
commit:
  hash: "39b3ce646167c8da794997127c29ca7556ed3d57"
  message: "✅ CG1H6E close: noop (already implemented)"
comments:
  -
    author: "CODER"
    body: "Start: Validate whether planned change is already present in current CLI implementation; close task as no-op if so."
  -
    author: "CODER"
    body: "Verified: Confirmed current codebase already contains the intended change; no additional implementation required."
events:
  -
    type: "status"
    at: "2026-02-09T08:08:54.546Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Validate whether planned change is already present in current CLI implementation; close task as no-op if so."
  -
    type: "verify"
    at: "2026-02-09T08:08:54.795Z"
    author: "CODER"
    state: "ok"
    note: "No-op: unified command catalog already exists at packages/agentplane/src/cli/run-cli/command-catalog.ts and is used by run-cli.ts to route and load handlers lazily."
  -
    type: "status"
    at: "2026-02-09T08:08:55.064Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Confirmed current codebase already contains the intended change; no additional implementation required."
doc_version: 2
doc_updated_at: "2026-02-09T08:08:55.064Z"
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

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T08:08:54.795Z — VERIFY — ok

By: CODER

Note: No-op: unified command catalog already exists at packages/agentplane/src/cli/run-cli/command-catalog.ts and is used by run-cli.ts to route and load handlers lazily.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T08:08:54.546Z, excerpt_hash=sha256:f5457b97e854b607f7ea322044a312d32868d862de5b3039fe24000045b71c1c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

git revert соответствующего коммита, затем bun run test:full.
