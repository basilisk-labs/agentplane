---
id: "202601200542-5Z2HCA"
title: "Overhaul roadmap recipe and documentation"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["recipes", "workflow"]
verify: []
commit: { hash: "cdb841383165163e845dc4204580b8f052c3d08c", message: "✨ 202601200542-534F3X implement roadmap recipe runner" }
comments:
  - { author: "ORCHESTRATOR", body: "Subtasks: 202601200542-E5CDTX (docs updates), 202601200542-534F3X (runner/manifest updates)." }
  - { author: "ORCHESTRATOR", body: "verified: close: roadmap recipe overhaul complete | details: docs and schemas aligned; runner and manifest updated; inventory refreshed." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:57.090Z"
doc_updated_by: "agentplane"
description: "Update the recipe catalog and docs, standardize recipe file formats, switch the feature-spec-to-tasks recipe to English-only, remove CYBOS env var names, and make the recipe produce a full roadmap from a top-level task."
---
## Summary

Delivered the roadmap recipe overhaul, including English docs, standardized inputs/outputs, a working runner, and refreshed recipe inventory.


## Context

Required to formalize recipe formats and ensure the roadmap recipe truly generates detailed roadmap artifacts with standard env vars.


## Scope

Coordinated doc/schema updates, manifest and runner implementation, and recipe catalog refresh across the roadmap recipe.


## Risks

Recipe documentation can drift as formats evolve; inventory must be regenerated after manifest changes.


## Verify Steps

Reviewed subtask outputs; ran recipes scan and the roadmap runner with sample inputs to validate artifact creation.


## Rollback Plan

Revert commits f91c90b84720 and cdb841383165 to undo the docs and runner changes; regenerate the inventory as needed.


## Notes

Subtasks completed: 202601200542-E5CDTX (docs), 202601200542-534F3X (runner and manifest).
