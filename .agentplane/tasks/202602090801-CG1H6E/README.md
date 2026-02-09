---
id: "202602090801-CG1H6E"
title: "CLI: reject duplicate command ids at registry registration"
result_summary: "No-op: already implemented"
status: "DONE"
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
  state: "ok"
  updated_at: "2026-02-09T08:08:34.079Z"
  updated_by: "CODER"
  note: "No-op: duplicate command id registration already fails fast. See packages/agentplane/src/cli/spec/registry.ts (CommandRegistry.register throws CliError E_INTERNAL on duplicate key)."
commit:
  hash: "6a1e1f1a6d684f02b0c1b2420689d9a4eaa54740"
  message: "✅ 94JEFQ close: noop (already implemented)"
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
    at: "2026-02-09T08:08:33.832Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Validate whether planned change is already present in current CLI implementation; close task as no-op if so."
  -
    type: "verify"
    at: "2026-02-09T08:08:34.079Z"
    author: "CODER"
    state: "ok"
    note: "No-op: duplicate command id registration already fails fast. See packages/agentplane/src/cli/spec/registry.ts (CommandRegistry.register throws CliError E_INTERNAL on duplicate key)."
  -
    type: "status"
    at: "2026-02-09T08:08:34.341Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Confirmed current codebase already contains the intended change; no additional implementation required."
doc_version: 2
doc_updated_at: "2026-02-09T08:08:34.341Z"
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

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T08:08:34.079Z — VERIFY — ok

By: CODER

Note: No-op: duplicate command id registration already fails fast. See packages/agentplane/src/cli/spec/registry.ts (CommandRegistry.register throws CliError E_INTERNAL on duplicate key).

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T08:08:33.832Z, excerpt_hash=sha256:d7d9b061984383dd09c06caaf76dfa6094c5fa1efe0b9f6f09066c3b8b16de6d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

git revert соответствующего коммита, затем bun run test:full.
