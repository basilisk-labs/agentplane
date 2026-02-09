---
id: "202602090742-8V16N7"
title: "Coverage: add unit tests for task verify-record"
status: "DOING"
priority: "high"
owner: "TESTER"
depends_on: []
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
  state: "ok"
  updated_at: "2026-02-09T07:49:24.448Z"
  updated_by: "TESTER"
  note: "verify-record.unit tests added; bun run lint PASS; bun run test:full PASS; bun run coverage PASS (branches 72.43%)."
commit: null
comments:
  -
    author: "TESTER"
    body: "Start: Add unit tests for verify-record to cover key branches and reduce missed coverage in core task lifecycle paths."
events:
  -
    type: "status"
    at: "2026-02-09T07:44:23.016Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add unit tests for verify-record to cover key branches and reduce missed coverage in core task lifecycle paths."
  -
    type: "verify"
    at: "2026-02-09T07:49:24.448Z"
    author: "TESTER"
    state: "ok"
    note: "verify-record.unit tests added; bun run lint PASS; bun run test:full PASS; bun run coverage PASS (branches 72.43%)."
doc_version: 2
doc_updated_at: "2026-02-09T07:49:24.449Z"
doc_updated_by: "TESTER"
description: "Add focused unit tests for packages/agentplane/src/commands/task/verify-record.ts to reduce missed branches and lock down semantics."
id_source: "generated"
---
## Summary

Add unit tests for task verification recording (cmdTaskVerifyRecord*) to cover key branches and lock down error/validation semantics.

## Scope

- packages/agentplane/src/commands/task/verify-record.ts\n- packages/agentplane/src/commands/task/verify-record.unit.test.ts (new)

## Plan

1. Проанализировать missed branches в packages/agentplane/src/commands/task/verify-record.ts.\n2. Добавить unit-тесты, закрывающие: валидацию флагов, сбор note/author, ветки ok/rework, записи в backend/store, и маппинг ошибок.\n3. Прогнать bun run lint, bun run test:full, bun run coverage.

## Risks

- Риск: хрупкие тесты из-за времени/форматирования. Митигация: стабить Date/выходы и проверять инварианты вместо полного текста.\n- Риск: тяжёлые интеграции с backend. Митигация: юнит-тесты через мок TaskBackend/CommandContext.

## Verify Steps

### Scope\n- verify-record unit tests\n\n### Checks\n- bun run lint\n- bun run test:full\n- bun run coverage\n\n### Evidence / Commands\n- bun run coverage (record branch % and ensure exit 0)\n\n### Pass criteria\n- lint passes\n- all tests pass\n- coverage passes global thresholds

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T07:49:24.448Z — VERIFY — ok

By: TESTER

Note: verify-record.unit tests added; bun run lint PASS; bun run test:full PASS; bun run coverage PASS (branches 72.43%).

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T07:44:23.016Z, excerpt_hash=sha256:62c8068549ed1dba86d4ccd774ce21589586fee72c33a48021d82e8ee9893d52

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

git revert <commit> для коммита задачи; удалить добавленные тесты при необходимости.
