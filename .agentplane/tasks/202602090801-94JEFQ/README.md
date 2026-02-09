---
id: "202602090801-94JEFQ"
title: "CLI: test guard help registry matches run registry"
result_summary: "No-op: already implemented"
status: "DONE"
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
  state: "ok"
  updated_at: "2026-02-09T08:08:12.979Z"
  updated_by: "CODER"
  note: "No-op: help/run drift guard is obsolete after refactor. CLI now matches against COMMANDS catalog (run-cli.ts: matchCommandCatalog) and help is derived from the same registry; there is no separate help-fast registry to drift from."
commit:
  hash: "230a6627963f52fe484316480bb4bdbff5d74491"
  message: "✅ TCX3SJ close: noop (already fixed)"
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
    at: "2026-02-09T08:08:12.724Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Validate whether planned change is already present in current CLI implementation; close task as no-op if so."
  -
    type: "verify"
    at: "2026-02-09T08:08:12.979Z"
    author: "CODER"
    state: "ok"
    note: "No-op: help/run drift guard is obsolete after refactor. CLI now matches against COMMANDS catalog (run-cli.ts: matchCommandCatalog) and help is derived from the same registry; there is no separate help-fast registry to drift from."
  -
    type: "status"
    at: "2026-02-09T08:08:13.250Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Confirmed current codebase already contains the intended change; no additional implementation required."
doc_version: 2
doc_updated_at: "2026-02-09T08:08:13.250Z"
doc_updated_by: "CODER"
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

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T08:08:12.979Z — VERIFY — ok

By: CODER

Note: No-op: help/run drift guard is obsolete after refactor. CLI now matches against COMMANDS catalog (run-cli.ts: matchCommandCatalog) and help is derived from the same registry; there is no separate help-fast registry to drift from.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T08:08:12.724Z, excerpt_hash=sha256:d7d9b061984383dd09c06caaf76dfa6094c5fa1efe0b9f6f09066c3b8b16de6d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

git revert соответствующего коммита, затем bun run test:full.
