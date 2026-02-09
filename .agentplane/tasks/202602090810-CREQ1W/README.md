---
id: "202602090810-CREQ1W"
title: "CLI UX: introduce --json-errors to disambiguate --json"
result_summary: "Added --json-errors"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "ux"
  - "refactor"
  - "testing"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T08:13:55.903Z"
  updated_by: "CODER"
  note: "Implemented --json-errors scoped global flag for JSON error output; kept existing --json behavior. Added run-cli.core.test coverage for --json-errors; bun run lint PASS; bun run test:full PASS; bun run coverage PASS."
commit:
  hash: "b44c8fdb248ead603c236f4cc91d47d08778da43"
  message: "✅ CREQ1W cli: add --json-errors global flag"
comments:
  -
    author: "CODER"
    body: "Start: Add --json-errors global flag for JSON error output; keep help --json for JSON help; update prescan/parser and tests."
  -
    author: "CODER"
    body: "Verified: Added --json-errors as an explicit (scoped-global) flag for JSON error output; kept existing --json behavior for backwards compatibility and help --json. Updated run-cli.core.test coverage; lint/test:full/coverage pass."
events:
  -
    type: "status"
    at: "2026-02-09T08:11:08.119Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add --json-errors global flag for JSON error output; keep help --json for JSON help; update prescan/parser and tests."
  -
    type: "verify"
    at: "2026-02-09T08:13:55.903Z"
    author: "CODER"
    state: "ok"
    note: "Implemented --json-errors scoped global flag for JSON error output; kept existing --json behavior. Added run-cli.core.test coverage for --json-errors; bun run lint PASS; bun run test:full PASS; bun run coverage PASS."
  -
    type: "status"
    at: "2026-02-09T08:14:41.793Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Added --json-errors as an explicit (scoped-global) flag for JSON error output; kept existing --json behavior for backwards compatibility and help --json. Updated run-cli.core.test coverage; lint/test:full/coverage pass."
doc_version: 2
doc_updated_at: "2026-02-09T08:14:41.793Z"
doc_updated_by: "CODER"
description: "Implement a dedicated global flag --json-errors for machine-readable error output, keep help --json semantics for JSON help output, and update tests/docs accordingly."
id_source: "generated"
---
## Summary

Добавить глобальный флаг --json-errors для машинно-читабельного вывода ошибок и убрать двусмысленность --json (который должен оставаться для JSON-успешного вывода команд вроде help).

Успех: agentplane --json-errors ... печатает JSON ошибки, agentplane help --json продолжает печатать JSON help; тесты обновлены.

## Scope

In-scope:
- packages/agentplane/src/cli/run-cli.ts (глобальные флаги + prescan)
- tests: packages/agentplane/src/cli/run-cli.core.test.ts, help snapshot/contract tests при необходимости

Out-of-scope:
- Глобальный редизайн области видимости всех флагов
- Унификация approvals / boolean parser

## Plan

1. Добавить поддержку --json-errors в prescanJsonErrors и parseGlobalArgs.
2. Сохранить текущую семантику help --json (JSON успешного help).
3. Определить поведение alias: --json до id команды продолжает включать jsonErrors (без warning, чтобы не ломать machine output).
4. Обновить/добавить тесты на --json-errors и на alias.
5. Прогнать bun run lint и bun run test:full.

## Risks

Риск: изменение поведения существующих скриптов, которые полагаются на --json как на JSON ошибок.
Митигация: оставить --json как alias для jsonErrors в scoped global зоне; добавить тест на обратную совместимость.

## Verify Steps

1. bun run lint
2. bun run test:full
3. bun run coverage

## Verification

Pending.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T08:13:55.903Z — VERIFY — ok

By: CODER

Note: Implemented --json-errors scoped global flag for JSON error output; kept existing --json behavior. Added run-cli.core.test coverage for --json-errors; bun run lint PASS; bun run test:full PASS; bun run coverage PASS.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T08:11:08.119Z, excerpt_hash=sha256:f5457b97e854b607f7ea322044a312d32868d862de5b3039fe24000045b71c1c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

git revert коммита с вводом --json-errors; bun run test:full.

## Context

Сейчас --json имеет разные значения в зависимости от позиции (глобально: JSON ошибок; в help: JSON успешной справки). Это трудно предсказать и плохо для UX/автоматизации.

## Notes

### Decision
--json-errors вводится как недвусмысленный глобальный флаг для ошибок.
--json остается поддержанным alias для jsonErrors только в scoped global зоне, без предупреждений, чтобы не добавлять шум в stderr при JSON-ошибках.
