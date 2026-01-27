---
id: "202601200917-0V45NT"
title: "Global recipes bundle with context"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: ["202601200917-MMT18V", "202601200917-3FGMJZ", "202601200917-FQRW89"]
tags: ["recipes", "workflow"]
commit: { hash: "36dea396b5c5d9e3c99d19c2782c6941c987cb6d", message: "✅ FQRW89 orchestrator: refresh global recipes bundle" }
doc_version: 2
doc_updated_at: "2026-01-20T09:18:20+00:00"
doc_updated_by: "agentctl"
description: "Ship a global recipes bundle, its CLI views, and orchestrator refresh guidance."
---
## Summary

Ship a global recipes bundle with context and CLI viewing modes.

## Context

Agents should load a single bundle that describes all recipes, allowed commands, and documentation.

## Scope

- Implement bundle build/show in recipes.py.
- Document bundle format and CLI usage.
- Update ORCHESTRATOR workflow to refresh the bundle.

## Risks

Bundle could be large; enforce context limits and avoid network access.

## Verify Steps

Review recipes.py, RECIPES.md, and ORCHESTRATOR.json for consistency.

## Rollback Plan

Revert code and docs changes.

## Notes

Subtasks: 202601200917-MMT18V, 202601200917-3FGMJZ, 202601200917-FQRW89.

