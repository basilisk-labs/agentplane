---
id: "202602111631-XV07Z9"
title: "T2: Add AGENTPLANE_HOOK_MODE test guard for side-effect suites"
result_summary: "Hook mode now skips side-effect test suites deterministically"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "TESTER"
depends_on:
  - "202602111631-2S7HGD"
tags:
  - "testing"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-11T16:33:51.479Z"
  updated_by: "ORCHESTRATOR"
  note: "Plan approved."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "be85de119d8b565d4e8e8046d7eb82dc17ad5d19"
  message: "✅ XV07Z9 tests: guard side-effect suites in hook mode"
comments:
  -
    author: "TESTER"
    body: "Start: add AGENTPLANE_HOOK_MODE guards to side-effect heavy test suites for deterministic hook operation."
  -
    author: "TESTER"
    body: "Verified: release/upgrade side-effect suites now skip under AGENTPLANE_HOOK_MODE=1; normal fast suite still passes and hook-mode run is deterministic."
events:
  -
    type: "status"
    at: "2026-02-11T16:33:51.660Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: add AGENTPLANE_HOOK_MODE guards to side-effect heavy test suites for deterministic hook operation."
  -
    type: "status"
    at: "2026-02-11T16:35:11.721Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: release/upgrade side-effect suites now skip under AGENTPLANE_HOOK_MODE=1; normal fast suite still passes and hook-mode run is deterministic."
doc_version: 2
doc_updated_at: "2026-02-11T16:35:11.721Z"
doc_updated_by: "TESTER"
description: "When AGENTPLANE_HOOK_MODE=1, skip or stub tests that create commit/release/upgrade side effects to keep hook path deterministic."
id_source: "generated"
---
## Summary

Добавить режим AGENTPLANE_HOOK_MODE=1 для пропуска side-effect тестов в hook-контуре.

## Scope

In-scope: side-effect suites в командах release/upgrade/recipes. Out-of-scope: изменение производственного кода CLI.

## Plan

1) Добавить env guard на уровне describe в side-effect test files. 2) Проверить нормальный запуск без guard и skip-поведение с guard.

## Risks

Риск: случайно скрыть полезные тесты в CI. Смягчение: guard активируется только при AGENTPLANE_HOOK_MODE=1.

## Verification


## Rollback Plan

Откатить изменения в test files и убрать guard.

## Context

Даже при allowlist важно защититься от случайного запуска тестов с git/release/upgrade side-effects.

## Verify Steps

1) bun run test:fast\n2) AGENTPLANE_HOOK_MODE=1 bun run test:fast:hook\n3) bun run --filter=agentplane build

## Notes

### Decisions\n- Guard только для тестов с побочными эффектами.\n### Implementation Notes\n- Заполняется после реализации.
