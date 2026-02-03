---
id: "202601200743-6CQN5R"
title: "Define Redmine recipe spec"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags: ["recipes", "docs"]
verify: []
commit: { hash: "5d34f59acf32f0143b800f61fbe21adc5514414b", message: "✨ F4TREY scaffold Redmine recipe migration tasks" }
comments:
  - { author: "DOCS", body: "verified: close: redmine recipe spec defined with scenarios, inputs, outputs, and mini-cli contract." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:00.628Z"
doc_updated_by: "agentplane"
description: "Write the Redmine recipe specification: manifest, scenarios, inputs schema, outputs, and mini-CLI contract."
---
## Summary

Specified the Redmine backend recipe structure, scenarios, inputs, outputs, and mini-CLI contract.


## Context

Redmine must be optional and enabled via recipes; the recipe needs a self-contained mini-CLI aligned with agentctl-style outputs.


## Scope

Recipe slug: redmine-backend.\nScenarios: install (copy backend files + set config), disable (switch to local backend), status (show current backend + env), sync-pull (agentctl sync redmine --direction pull), sync-push (agentctl sync redmine --direction push --yes), verify-connection (ping Redmine API).\nInputs schema: redmine_url, api_key, project_id, assignee_id (optional), owner_agent (optional), status_map, custom_fields, cache_dir, conflict_policy, confirm_push.\nOutputs: .agent-plane/backends/redmine/backend.json, .agent-plane/backends/redmine/backend.py, updated .agent-plane/config.json, run artifacts under .agent-plane/.runs/<run_id>/artifacts/*.\nMini-CLI: node or python runner with commands (install|disable|status|sync|verify) and --json output; errors follow RECIPES.md format; exit non-zero on failure.


## Risks

Recipe runner will need network access; misconfiguration of custom fields can corrupt sync. Ensure scenario prompts and inputs validation are strict.


## Verify Steps

Review existing Redmine backend settings and confirm the recipe outputs cover backend.json, backend.py, and config updates.


## Rollback Plan

Keep local backend as default; recipe disable scenario restores config to local backend and removes redmine backend files if needed.


## Notes

Runner should support --json output and emit artifacts list for install/sync actions; use agentctl for task operations.
