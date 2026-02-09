---
id: "202602090742-FJZ0AS"
title: "Coverage: add unit tests for task finish"
status: "TODO"
priority: "high"
owner: "TESTER"
depends_on:
  - "202602090742-8V16N7"
tags:
  - "code"
  - "testing"
  - "coverage"
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
doc_updated_at: "2026-02-09T07:44:17.752Z"
doc_updated_by: "TESTER"
description: "Add focused unit tests for packages/agentplane/src/commands/task/finish.ts to reduce missed branches and lock down edge-case semantics."
id_source: "generated"
---
## Summary

Add unit tests for task finish command implementation to cover key branches (commit metadata, verify gates, error paths) and stabilize semantics.

## Scope

- packages/agentplane/src/commands/task/finish.ts\n- packages/agentplane/src/commands/task/finish.unit.test.ts (new)

## Plan

1. Проанализировать missed branches в packages/agentplane/src/commands/task/finish.ts.\n2. Добавить unit-тесты на ветки: валидация args/флагов, обработка commit/close metadata, enforce verify gates и ошибки.\n3. Прогнать bun run lint, bun run test:full, bun run coverage.

## Risks

- Риск: тесты будут слишком тесно зависеть от формата сообщений. Митигация: проверять коды/инварианты, а не целиком строки.\n- Риск: мок git/TaskBackend. Митигация: изолировать через CommandContext + TaskBackend doubles.

## Verify Steps

### Scope\n- finish unit tests\n\n### Checks\n- bun run lint\n- bun run test:full\n- bun run coverage\n\n### Evidence / Commands\n- bun run coverage (record branch % and ensure exit 0)\n\n### Pass criteria\n- lint passes\n- all tests pass\n- coverage passes global thresholds

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

git revert <commit> для коммита задачи; удалить добавленные тесты при необходимости.
