---
id: "202601271042-1NGG54"
title: "Fix Mintlify docs.json theme validation"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags: ["docs", "mintlify"]
commit: { hash: "3b2e5c64642f138018b80646ba5a21a42a843cc9", message: "🐛 1NGG54 mintlify: set valid docs.json theme" }
comments:
  - { author: "DOCS", body: "Start: Fix Mintlify docs/docs.json theme discriminator validation error." }
  - { author: "DOCS", body: "verified: Mintlify docs/docs.json uses a valid theme discriminator value | details: Mintlify schema validation should pass." }
doc_version: 2
doc_updated_at: "2026-01-27T10:45:06+00:00"
doc_updated_by: "agentctl"
description: "Set a valid docs/docs.json theme value so Mintlify schema validation passes."
---
## Summary

Fix Mintlify docs/docs.json validation by setting a supported theme value.

## Scope

- Update docs/docs.json to use a valid theme discriminator value

## Risks

- None (docs-only configuration change).

## Verify Steps

- Re-run Mintlify preview/build and confirm docs/docs.json no longer errors on #.theme discriminator

## Rollback Plan

- Revert commit 3b2e5c64642f

