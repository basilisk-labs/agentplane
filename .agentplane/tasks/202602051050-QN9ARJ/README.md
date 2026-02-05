---
id: "202602051050-QN9ARJ"
title: "Fix warnings across packages"
status: "DONE"
priority: "high"
owner: "TESTER"
depends_on: []
tags: ["warnings", "lint"]
verify: []
commit: { hash: "7c983814dca0f4daaa477c702080ceb00c0cbd8c", message: "🧪 QN9ARJ tests" }
comments:
  - { author: "TESTER", body: "Start: resolve TypeScript warnings in tests and mocks across packages." }
  - { author: "TESTER", body: "Verified: ./node_modules/.bin/tsc -p tsconfig.eslint.json --noEmit; bun run format:check; bun run lint; bun run test:fast. Commit: 7c983814dca0." }
doc_version: 2
doc_updated_at: "2026-02-05T11:03:09.601Z"
doc_updated_by: "TESTER"
description: "Identify and resolve 46 warnings (TypeScript/ESLint/test) across packages."
id_source: "generated"
---
## Summary

Resolved TypeScript diagnostics in tests (command-guide, workflow, run-cli, task-backend, tasks-lint).

## Scope

Test-only updates to align typings and mocks with TS/ESLint rules.

## Risks

Low risk; test-only change.

## Verify Steps

./node_modules/.bin/tsc -p tsconfig.eslint.json --noEmit\nbun run format:check\nbun run lint\nbun run test:fast

## Rollback Plan

Revert commit 7c983814dca0 if test typing adjustments are unwanted.
