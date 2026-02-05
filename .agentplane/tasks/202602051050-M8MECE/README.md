---
id: "202602051050-M8MECE"
title: "Coverage, warnings, restructure, Epic E"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["epic-e", "refactor", "coverage", "warnings"]
verify: []
commit: null
comments:
  - { author: "ORCHESTRATOR", body: "Start: coverage check, warnings cleanup, package restructure, Epic E implementation." }
doc_version: 2
doc_updated_at: "2026-02-05T11:43:25.971Z"
doc_updated_by: "ORCHESTRATOR"
description: "Run coverage (>=75%), close remaining coverage task, fix warnings, restructure packages, and implement Epic E schema-as-source-of-truth."
id_source: "generated"
---
## Summary

Closed Epic E with schema-based config validation/defaults, adjusted tests and docs, and kept coverage/warnings work tracked under this umbrella.

## Scope

Epic E implementation (schema defaults + Ajv validation + docs/test updates) plus tracking for coverage/warnings/structure tasks already completed under this umbrella.

## Risks

Config validation behavior now applies defaults during validation; downstream tooling relying on missing fields may see populated values.

## Verify Steps

./node_modules/.bin/tsc -p tsconfig.eslint.json --noEmit\nbun run lint\nbun run test:fast\n./node_modules/.bin/lefthook run pre-commit

## Rollback Plan

Revert the Epic E commit(s) to restore previous config validation and schema draft.
