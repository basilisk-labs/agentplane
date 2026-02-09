---
id: "202602090802-H3DVFH"
title: "CLI: split registry modules so help path stays light"
status: "TODO"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 2
doc_updated_at: "2026-02-09T08:03:57.971Z"
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

## Rollback Plan

git revert соответствующего коммита, затем bun run test:full.
