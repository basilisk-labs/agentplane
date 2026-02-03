---
id: "202601200752-XT2XQH"
title: "Clarify backend routing and recipe bundle refresh"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["recipes", "workflow"]
verify: []
commit: { hash: "ec30cb74b634231a4b8b3b5bc27b72537f056ad8", message: "✅ H5S8KV orchestrator: refresh recipe bundle.json at run start" }
comments:
  - { author: "ORCHESTRATOR", body: "Subtasks: 202601200752-GSWYEG (docs routing), 202601200752-H5S8KV (orchestrator bundle refresh)." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:01.271Z"
doc_updated_by: "agentplane"
description: "Update docs for backend routing (local base + optional Redmine via recipes) and update ORCHESTRATOR to refresh recipe bundles at run start."
---
## Summary

Clarify backend routing and ensure recipes bundle refresh is part of orchestrator startup.


## Context

User wants local backend to remain the base store, with Redmine and other remotes as optional add-ons, plus an orchestrator workflow that refreshes recipe bundles at run start.


## Scope

- Update docs/07 and docs/12 to describe routing and Redmine enable/disable behavior.
- Update ORCHESTRATOR workflow to refresh recipes inventory and bundle.json before execution (with confirmation).


## Risks

Ambiguous wording could lead to tool execution without explicit confirmation.


## Verify Steps

Review docs/07, docs/12, and ORCHESTRATOR.json for accuracy and consistency.


## Rollback Plan

Revert the documentation and workflow changes.


## Notes

No code execution changes beyond documentation updates.
