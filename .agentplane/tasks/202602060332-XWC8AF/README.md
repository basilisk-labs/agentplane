---
id: "202602060332-XWC8AF"
title: "AP-BR-01 Remove base_branch from config"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["config"]
verify: []
commit: null
comments:
  - { author: "CODER", body: "Start: remove base_branch from config schema/types, add compat ignore warning, update tests/docs." }
doc_version: 2
doc_updated_at: "2026-02-06T04:08:06.129Z"
doc_updated_by: "CODER"
description: "Remove base_branch from config schema/examples/types; ignore if present with warning for compatibility; ensure base comes only from git config/--base. Include tests and docs updates."
id_source: "generated"
---
## Summary

Removed base_branch from config schema/examples/types and ignore legacy values with a warning.

## Scope

Config schema/examples, config validation/sanitization, init config writing, and related tests.

## Risks

Legacy configs relying on base_branch may be surprised; warning added to surface ignored field.

## Verify Steps

bun run test:core; bun run test:cli:core.

## Verification

bun run test:core; bun run test:cli:core.

## Rollback Plan

Revert config schema/type changes and init/config handling updates; restore prior tests.
