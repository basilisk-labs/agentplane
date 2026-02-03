---
id: "202601200743-NNSHSS"
title: "Phase Redmine backend to recipe"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: ["202601200743-6CQN5R"]
tags: ["recipes", "planning"]
verify: []
commit: { hash: "b09bec2ae55a0afa1f5864ffd4cbdc133a73b55d", message: "✅ 6CQN5R verified: close: redmine recipe spec defined with scenarios, inputs, outputs, and mini-cli contract." }
comments:
  - { author: "ORCHESTRATOR", body: "verified: close: redmine migration steps and dependencies recorded." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:00.897Z"
doc_updated_by: "agentplane"
description: "Define the migration steps and dependencies for replacing the Redmine backend with a recipe-driven integration."
---
## Summary

Defined migration steps and dependencies for moving Redmine backend functionality into a recipe.


## Context

We want optional Redmine integration without core backend coupling, using recipe-managed enable/disable flows.


## Scope

1) Extract redmine backend files into recipe payload (backend.py, backend.json).\n2) Add recipe runner (mini-CLI) with install/disable/status/sync/verify commands.\n3) Update docs to point to recipe enable/disable and remove redmine backend from core listing.\n4) Validate that local backend remains default; update config via agentctl during install/disable.\n5) Add recipe to inventory and provide sample inputs schema.\nDependencies: recipe spec (202601200743-6CQN5R) before implementation; docs update after runner is in place.


## Risks

Migration can break existing Redmine users if install/disable flows are not robust; ensure fallback to local backend is reversible and documented.


## Verify Steps

Review the migration steps with the recipe spec to ensure all required backend behaviors are covered.


## Rollback Plan

Keep core local backend untouched; re-enable local backend via recipe disable command or config reset if migration fails.


## Notes

Implementation task should include updating docs/12-redmine.md to point to the recipe enable/disable workflow.
