---
id: "202602090801-TCX3SJ"
title: "CLI: fix --json errors on global parse failure"
result_summary: "No-op: already implemented"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "bug"
  - "testing"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T08:06:40.895Z"
  updated_by: "CODER"
  note: "No-op: behavior already implemented (prescanJsonErrors in run-cli.ts) and covered by run-cli.core.test.ts (\"prints json error when --json is set and --root is missing a value\")."
commit:
  hash: "0d23cc67e60a6f7fd89e7ff5415e4a09047a70c9"
  message: "✅ 349KZ4 chore: scaffold cli refactor tasks"
comments:
  -
    author: "CODER"
    body: "Start: Fix --json to force JSON error output even when global arg parsing fails early; add regression test."
  -
    author: "CODER"
    body: "Verified: Confirmed --json error-mode is honored even when global arg parsing fails early; existing regression test covers missing --root value."
events:
  -
    type: "status"
    at: "2026-02-09T08:05:21.751Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix --json to force JSON error output even when global arg parsing fails early; add regression test."
  -
    type: "verify"
    at: "2026-02-09T08:06:40.895Z"
    author: "CODER"
    state: "ok"
    note: "No-op: behavior already implemented (prescanJsonErrors in run-cli.ts) and covered by run-cli.core.test.ts (\"prints json error when --json is set and --root is missing a value\")."
  -
    type: "status"
    at: "2026-02-09T08:06:46.080Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Confirmed --json error-mode is honored even when global arg parsing fails early; existing regression test covers missing --root value."
doc_version: 2
doc_updated_at: "2026-02-09T08:06:46.080Z"
doc_updated_by: "CODER"
description: "When parseGlobalArgs throws before globals are returned, --json should still force JSON error output. Implement an argv prescan and add regression test."
id_source: "generated"
---
## Summary

Исправить поведение CLI: если parseGlobalArgs падает до возврата globals, наличие --json в argv должно включать JSON-формат ошибок. Добавить регрессионный тест.

## Scope

packages/agentplane/src/cli/run-cli.ts
packages/agentplane/src/cli/run-cli.global-args.ts (если нужно)
packages/agentplane/src/cli/run-cli.core.test.ts (или новый unit test рядом)

## Plan

1. Добавить легкий прескан argv на --json до parseGlobalArgs.
2. Прокинуть результат в обработчик ошибок (jsonErrors).
3. Добавить тест: agentplane --json --root (без значения) возвращает JSON error.

## Risks

Риск: прескан ошибочно интерпретирует --json после id команды.
Митигация: сканировать только «глобальную зону» до --/команды или следовать текущей семантике parseGlobalArgs.

## Verify Steps

1. bun run lint
2. bun run test:full
3. bun run coverage

## Verification

Pending.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T08:06:40.895Z — VERIFY — ok

By: CODER

Note: No-op: behavior already implemented (prescanJsonErrors in run-cli.ts) and covered by run-cli.core.test.ts ("prints json error when --json is set and --root is missing a value").

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T08:05:21.751Z, excerpt_hash=sha256:f5457b97e854b607f7ea322044a312d32868d862de5b3039fe24000045b71c1c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

git revert соответствующего коммита, затем bun run test:full.
