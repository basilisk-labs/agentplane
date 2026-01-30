---
id: "202601301600-REC123"
title: "Document recipes functionality"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["docs", "recipes", "analysis"]
commit: { hash: "c01f1d72f530d0ba104be3a2c92d91c1dd9645ec", message: "✅ 8D6XRX close: record task doc" }
comments:
  - { author: "ORCHESTRATOR", body: "verified: Not run (documentation-only change) | details: lint/tests skipped by request. Notes: recipes behavior documented from current Node CLI implementation." }
doc_version: 2
doc_updated_at: "2026-01-30T15:33:38+00:00"
doc_updated_by: "agentctl"
description: "Analyze recipes implementation and produce documentation describing how recipes work."
---
## Summary

Documented how recipes work based on the current Node CLI implementation, including install flow, scenario execution, on-disk state, and edge cases.

## Scope

- Added a new Mintlify doc page describing runtime behavior of recipes
- Registered the page in navigation and docs index

## Risks

- Behavior may drift as the CLI evolves; the doc is tied to current code paths in `packages/agentplane/src/run-cli.ts`.

## Verify Steps

- Not run (documentation-only change).

## Rollback Plan

- Remove `docs/recipes-how-it-works.mdx` and revert docs navigation edits.

## Notes

The doc intentionally separates Node CLI recipes from the legacy `.agent-plane/recipes.py` helper.

