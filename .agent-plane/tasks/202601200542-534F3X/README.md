---
id: "202601200542-534F3X"
title: "Implement roadmap recipe runner"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags: ["recipes"]
commit: { hash: "cdb841383165163e845dc4204580b8f052c3d08c", message: "✨ 202601200542-534F3X implement roadmap recipe runner" }
comments:
  - { author: "CODER", body: "verified: close: roadmap runner generates roadmap, plan, and task draft | details: manifest outputs updated; recipe inventory refreshed." }
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Update the recipe manifest and runner script to generate a complete roadmap from a top-level task, rename env vars away from CYBOS, and refresh the recipes inventory output."
---
## Summary

Updated the recipe manifest and runner to generate a full roadmap, plus refreshed the recipe inventory output.

## Context

The roadmap recipe needed a real end-to-end runner that emits roadmap, plan, and tasks draft artifacts with RECIPE_* env vars.

## Scope

Updated the manifest outputs and tool env vars; rewrote run-feature.js to generate roadmap markdown, milestones, and task draft; regenerated docs/recipes-inventory.json.

## Risks

The generated roadmap is heuristic and may need manual adjustment for complex tasks; changes to outputs require inventory refresh.

## Verify Steps

Ran python .agent-plane/recipes.py scan --recipes-dir .agent-plane/recipes --output docs/recipes-inventory.json; ran the runner with sample inputs to confirm roadmap and artifacts are created.

## Rollback Plan

Revert commit cdb841383165 to restore the previous runner, manifest, and inventory.

## Notes

Runner remains local-only and deterministic with no network access.

