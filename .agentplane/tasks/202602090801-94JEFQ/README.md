---
id: "202602090801-94JEFQ"
title: "CLI: test guard help registry matches run registry"
status: "TODO"
priority: "high"
owner: "TESTER"
depends_on:
  - "202602090801-TCX3SJ"
tags:
  - "cli"
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
doc_updated_at: "2026-02-09T08:03:52.576Z"
doc_updated_by: "TESTER"
description: "Add a unit test that asserts buildHelpFastRegistry and buildRegistry expose the same command id set, to prevent drift."
id_source: "generated"
---
## Summary

Добавить тест-предохранитель: набор command ids в help registry должен совпадать с набором в run registry.

## Scope

packages/agentplane/src/cli/run-cli/registry.ts
packages/agentplane/src/cli/run-cli.core.help-contract.test.ts (или новый test-файл рядом)

## Plan

1. В тесте собрать множества id (spec.id.join(" ")).
2. Сравнить множества buildHelpFastRegistry().list() и buildRegistry(() => ctx).list().
3. Убедиться, что тест падает при расхождении.

## Risks

Риск: buildRegistry требует контекст/проект и тест станет flaky.
Митигация: использовать минимальный getCtx mock, который не трогает fs/git.

## Verify Steps

1. bun run lint
2. bun run test:full

## Verification

Pending.

## Rollback Plan

git revert соответствующего коммита, затем bun run test:full.
