---
id: "202601200657-W1Y6ND"
title: "Phase 1 migration: planning and analysis recipes"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: ["202601200657-E52CV8"]
tags: ["recipes", "workflow"]
verify: []
commit: { hash: "ce9a0aff3c97eb72fed6c4889ed3000b186ba71b", message: "✨ W1Y6ND add spec-to-tasks recipe" }
comments:
  - { author: "ORCHESTRATOR", body: "verified: close: spec-to-tasks recipe added | details: inventory refreshed." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:59.293Z"
doc_updated_by: "agentplane"
description: "Move planning/analysis helpers (roadmaps, spec drafting, decomposition) into recipes and remove any redundant core logic."
---
## Summary

Added the spec-to-tasks recipe to move spec decomposition into recipes and refreshed the recipes inventory.


## Context

Phase 1 migration aims to move planning/decomposition helpers into recipes rather than core logic.


## Scope

Created the spec-to-tasks recipe (manifest, scenario, inputs, runner) and updated docs/recipes-inventory.json via recipes.py scan.


## Risks

Runner uses heuristic parsing of spec sections; complex specs may require manual refinement of the task draft.


## Verify Steps

Ran python .agent-plane/recipes.py scan --recipes-dir .agent-plane/recipes --output docs/recipes-inventory.json to refresh the catalog.


## Rollback Plan

Revert commit ce9a0aff3c97 to remove the spec-to-tasks recipe and inventory update.


## Notes

Phase 1 now includes roadmap and spec decomposition recipes; further planning recipes can be added as needed.
