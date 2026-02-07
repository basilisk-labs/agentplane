---
id: "202602051050-WWYE65"
title: "Restructure package directories"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "refactor"
  - "structure"
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
commit:
  hash: "7d1a2099737cbfd0030a5c33a2adde43d3e9c6b1"
  message: "♻️ WWYE65 refactor"
comments:
  -
    author: "CODER"
    body: "Start: restructure packages/* for clearer navigation and maintainability."
  -
    author: "CODER"
    body: "Verified: ./node_modules/.bin/tsc -p tsconfig.eslint.json --noEmit; bun run format:check; bun run lint; bun run test:fast. Commit: 7d1a2099737c."
doc_version: 2
doc_updated_at: "2026-02-05T11:21:07.778Z"
doc_updated_by: "CODER"
description: "Refactor packages/* folder structure for clarity and navigation with minimal regressions."
id_source: "generated"
---
## Summary

Reorganized packages/agentplane and packages/core source trees into domain folders (cli/agents/backends/shared, config/git/tasks, etc.) and updated imports, scripts, and docs.

## Scope

Moved files under packages/agentplane/src and packages/core/src, adjusted imports, test paths, and updated docs/ROADMAP references.

## Risks

Medium risk: large file moves may break paths if any import was missed; mitigated by lint and test runs.

## Verify Steps

./node_modules/.bin/tsc -p tsconfig.eslint.json --noEmit
bun run format:check
bun run lint
bun run test:fast

## Rollback Plan

Revert commit 7d1a2099737c to restore original structure.

## Plan


## Verification
