---
id: "202602061055-3YT8H7"
title: "Release v0.1.8"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "release"
  - "versioning"
  - "git"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T10:56:20.233Z"
  updated_by: "USER"
  note: "Approved: ship 0.1.8"
verification:
  state: "ok"
  updated_at: "2026-02-06T11:00:59.525Z"
  updated_by: "ORCHESTRATOR"
  note: "Release 0.1.8 verified: format:check, lint, test:fast, test:cli:core all green; version bumps + release notes present; tag v0.1.8 created."
commit:
  hash: "b07ab88f8ac3af8fb50390ed7b1016a4b9c60d63"
  message: "🚀 3YT8H7 release"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Preparing v0.1.8 release: notes + version bumps + test updates + tag/push, with full lint/format/tests before tagging."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Released v0.1.8 with notes, package version bumps, and updated CLI version expectations. Tagged v0.1.8 after passing format:check, lint, test:fast, and test:cli:core."
doc_version: 2
doc_updated_at: "2026-02-06T11:01:05.237Z"
doc_updated_by: "ORCHESTRATOR"
description: "Release 0.1.8: add release notes, bump package versions, update CLI version expectations, tag and push."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Добавить release notes: docs/releases/v0.1.8.md (по TEMPLATE.md, только по-английски).
2) Обновить версии до 0.1.8: packages/core/package.json, packages/agentplane/package.json (+ dependency @agentplaneorg/core).
3) Обновить тест-ожидания, где проверяется строка версии CLI.
4) Прогнать quality gates: bun run format:check, bun run lint, bun run test:fast, bun run test:cli:core.
5) Сделать release commit через agentplane guard commit с allowlist.
6) Поставить git tag v0.1.8 на release commit.
7) Записать verify (ok) и finish с --commit на release commit; сделать close commit (README).
8) Запушить main и tag v0.1.8 в origin.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T11:00:59.525Z — VERIFY — ok

By: ORCHESTRATOR

Note: Release 0.1.8 verified: format:check, lint, test:fast, test:cli:core all green; version bumps + release notes present; tag v0.1.8 created.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
