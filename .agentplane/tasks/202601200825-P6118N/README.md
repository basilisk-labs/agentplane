---
id: "202601200825-P6118N"
title: "Update ORCHESTRATOR to use bundle refresh"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["agents", "recipes"]
verify: []
commit: { hash: "90401fcb0b8a347e9d7ec4d88eea5febb58b3c72", message: "✅ P6118N orchestrator: refresh bundle.json on startup" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-20T08:30:07+00:00"
doc_updated_by: "agentctl"
description: "Revise ORCHESTRATOR workflow to use recipes.py refresh when a bundle exists, falling back to scan/compile otherwise."
---
## Summary

Update ORCHESTRATOR workflow to refresh bundles via recipes.py refresh when a bundle exists.

## Context

Auto-refresh should be explicit and code-backed, without implying implicit tool execution.

## Scope

- Replace scan+compile-only guidance with scan+refresh (fallback to compile).
- Keep confirmation requirement for any tool execution.

## Risks

The workflow change could be misread as implicit execution; wording must remain explicit.

## Verify Steps

Review ORCHESTRATOR.json for the updated refresh guidance.

## Rollback Plan

Revert ORCHESTRATOR.json.

## Notes

No runtime behavior changes beyond documented workflow.
