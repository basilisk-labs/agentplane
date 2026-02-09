---
id: "202602090802-H3DVFH"
title: "CLI: split registry modules so help path stays light"
result_summary: "No-op: already implemented"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602090802-SFNBH7"
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
  updated_at: "2026-02-09T08:09:15.560Z"
  updated_by: "CODER"
  note: "No-op: registry is already split; runtime registry lives in packages/agentplane/src/cli/run-cli/registry.run.ts and runCli uses command-catalog + lazy imports rather than a monolithic registry module."
commit:
  hash: "19a08b3bb827bc6a81b36eb7537e01c9a83df50a"
  message: "✅ SFNBH7 close: noop (already implemented)"
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
    at: "2026-02-09T08:09:15.313Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Validate whether planned change is already present in current CLI implementation; close task as no-op if so."
  -
    type: "verify"
    at: "2026-02-09T08:09:15.560Z"
    author: "CODER"
    state: "ok"
    note: "No-op: registry is already split; runtime registry lives in packages/agentplane/src/cli/run-cli/registry.run.ts and runCli uses command-catalog + lazy imports rather than a monolithic registry module."
  -
    type: "status"
    at: "2026-02-09T08:09:15.832Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Confirmed current codebase already contains the intended change; no additional implementation required."
doc_version: 2
doc_updated_at: "2026-02-09T08:09:15.832Z"
doc_updated_by: "CODER"
description: "Move buildHelpFastRegistry and buildRegistry into separate modules and adjust runCli imports to avoid statically importing all handlers in the help path."
id_source: "generated"
---
## Summary

Разнести buildHelpFastRegistry и buildRegistry по разным модулям, чтобы help-ветка не тянула run-ветку и тяжелые импорты статически.

## Scope

packages/agentplane/src/cli/run-cli/registry.help.ts (новый)
packages/agentplane/src/cli/run-cli/registry.run.ts (новый)
packages/agentplane/src/cli/run-cli.ts

## Plan

1. Вынести help и run registry в отдельные модули без общего файла с импортами хендлеров.
2. В run-cli.ts импортировать help registry только в help-ветке (предпочтительно через import()).
3. Прогнать cli-smoke и help снапшоты.

## Risks

Риск: изменение времени/порядка импортов может вскрыть циклы.
Митигация: incremental changes + test:full.

## Verify Steps

1. bun run lint
2. bun run test:full
3. bun run coverage

## Verification

Pending.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T08:09:15.560Z — VERIFY — ok

By: CODER

Note: No-op: registry is already split; runtime registry lives in packages/agentplane/src/cli/run-cli/registry.run.ts and runCli uses command-catalog + lazy imports rather than a monolithic registry module.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T08:09:15.313Z, excerpt_hash=sha256:f5457b97e854b607f7ea322044a312d32868d862de5b3039fe24000045b71c1c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

git revert соответствующего коммита, затем bun run test:full.
