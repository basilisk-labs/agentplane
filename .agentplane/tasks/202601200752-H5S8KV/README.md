---
id: "202601200752-H5S8KV"
title: "Update ORCHESTRATOR recipe bundle refresh"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["agents", "recipes", "workflow"]
verify: []
commit: { hash: "ec30cb74b634231a4b8b3b5bc27b72537f056ad8", message: "✅ H5S8KV orchestrator: refresh recipe bundle.json at run start" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-24T18:16:18+00:00"
doc_updated_by: "agentctl"
description: "Require ORCHESTRATOR to refresh recipes inventory and bundle.json at run start when recipes are involved (after plan approval)."
---
## Summary

Update ORCHESTRATOR workflow to refresh recipe bundle.json at run start with explicit confirmation.

## Context

User expects the orchestrator to keep recipe bundles fresh while still honoring the rule that tool execution requires confirmation.

## Scope

- Update .agent-plane/agents/ORCHESTRATOR.json workflow to include recipes.py scan and compile before execution.
- Reference bundle.json location under .agent-plane/.runs/<run-id>/.

## Risks

The new step could be misread as an implicit tool run; it must explicitly require confirmation.

## Verify Steps

Review ORCHESTRATOR.json to confirm the added workflow step is accurate and constrained.

## Rollback Plan

Revert the JSON change.

## Notes

No runtime behavior changes implemented in code.
