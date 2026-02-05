---
id: "202602051050-W39G86"
title: "Epic E: schema as source of truth (Ajv + defaults)"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["epic-e", "schema", "validation"]
verify: []
commit: null
comments:
  - { author: "CODER", body: "Start: Epic E schema as source of truth (Ajv defaults)." }
doc_version: 2
doc_updated_at: "2026-02-05T11:40:12.353Z"
doc_updated_by: "CODER"
description: "Implement Epic E: schema drives runtime validation with Ajv and defaults; update tests and docs."
id_source: "generated"
---
## Summary

Made config schema the source of truth with Ajv validation + defaults, updated tests and docs, and aligned schema draft to 07 for Ajv core.

## Scope

Updated config schema defaults, switched schema draft to 07, wired Ajv validation/defaults in core config loader, adjusted config tests for new error shapes/defaults, and documented schema-based validation.

## Risks

Defaults are now applied during validation; callers relying on missing fields may see filled values. Ajv error wording changed, which could affect tests expecting exact messages.

## Verify Steps

./node_modules/.bin/tsc -p tsconfig.eslint.json --noEmit\nbun run lint\nbun run test:fast\n./node_modules/.bin/lefthook run pre-commit

## Rollback Plan

Revert the Epic E commit to restore prior config validation behavior and schema draft.
