---
id: "202601200825-37MWVG"
title: "Auto-refresh recipe bundles in code"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: ["202601200825-9GKTY9", "202601200825-RDDNMZ", "202601200825-P6118N"]
tags: ["recipes", "workflow"]
commit: { hash: "90401fcb0b8a347e9d7ec4d88eea5febb58b3c72", message: "✅ P6118N orchestrator: refresh bundle.json on startup" }
doc_version: 2
doc_updated_at: "2026-01-20T08:30:16+00:00"
doc_updated_by: "agentctl"
description: "Add a recipes.py refresh command, document it, and update ORCHESTRATOR to use it for startup bundle refreshes."
---
## Summary

Ship automatic recipe bundle refresh support in code and docs.

## Context

The user requested auto-refresh of bundle.json at orchestrator start, backed by code and documentation.

## Scope

- Implement recipes.py refresh.
- Document refresh usage in RECIPES.md.
- Update ORCHESTRATOR workflow to prefer refresh with compile fallback.

## Risks

Conflicting instructions could lead to tool execution without explicit confirmation.

## Verify Steps

Review recipes.py, RECIPES.md, and ORCHESTRATOR.json for consistency.

## Rollback Plan

Revert the code and documentation changes.

## Notes

Subtasks: 202601200825-9GKTY9, 202601200825-RDDNMZ, 202601200825-P6118N.

