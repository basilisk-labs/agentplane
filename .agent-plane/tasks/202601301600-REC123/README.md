---
id: "202601301600-REC123"
title: "Document recipes functionality"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["docs", "recipes", "analysis"]
commit: { hash: "b4c70ce1d0ca7c8c3052d568952ffb1b299660de", message: "✨ REC123 document recipes behavior" }
comments:
  - { author: "ORCHESTRATOR", body: "verified: Not run (documentation-only change) | details: lint/tests skipped by request. Notes: recipes behavior documented from current Node CLI implementation." }
  - { author: "ORCHESTRATOR", body: "verified: Not run (documentation-only change). Notes: lint/tests skipped | details: behavior documented from current Node CLI implementation." }
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

