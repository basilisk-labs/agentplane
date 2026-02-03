---
id: "202601131159-4YPF2T"
title: "Auto-commit on finish via config"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["git", "workflow", "config"]
verify: []
commit: { hash: "b893afa5c44be3efa381f3e47a266b032ee39f2a", message: "✨ 4YPF2T auto-commit on finish: add config flag; wire agentctl finish; document behavior" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: add config-driven auto status commit on finish and document the behavior." }
  - { author: "ORCHESTRATOR", body: "Verified: spec-only change; finish auto status commit enabled and no runtime behavior beyond agentctl finish flag." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:44.482Z"
doc_updated_by: "agentplane"
description: "Add a config option to auto-run finish status commits, update agentctl behavior and docs, and enable the setting in config.json."
---
## Summary

Add a config-controlled auto status commit for finish and document the behavior.


## Context

User wants finish to commit task updates automatically when configured.


## Scope

Add a config flag, wire it into agentctl finish, update docs, and enable it in .agent-plane/config.json.


## Risks

Low risk; incorrect config parsing could block finish or trigger unexpected commits.


## Verify Steps

No tests (behavior verified by inspection).


## Rollback Plan

Revert the commit and remove the config flag from config.json.
