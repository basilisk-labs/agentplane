---
id: "202601300859-7DK2JB"
title: "Add agent behavior toggles to config + init dialog"
status: "DOING"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: ["202601131236-DBW16S"]
tags: ["config", "agents", "init", "cli"]
comments:
  - { author: "ORCHESTRATOR", body: "Start: add minor agent behavior toggles to config and wire into init prompts; document defaults." }
doc_version: 2
doc_updated_at: "2026-01-30T09:00:53+00:00"
doc_updated_by: "agentctl"
description: "Move minor agent behavior toggles (e.g., approvals for plan/network) into config.json, wire them into agentplane init interactive prompts, and document defaults (default agent remains ORCHESTRATOR; paths remain backend-defined)."
---
## Summary

Add minor agent behavior toggles to config.json (plan/network approvals) and surface them in agentplane init prompts; document defaults and scope boundaries.

## Context

User decision: core agent behavior stays in AGENTS.md + agent JSONs; only minor toggles (e.g., approvals.require_plan, approvals.require_network) move to config.json. init should prompt for these. default_agent stays ORCHESTRATOR. Paths remain backend-defined and not user-configured in init.

## Scope

- Extend config schema and defaults with agents.approvals.require_plan and agents.approvals.require_network.
- Update agentplane init interactive prompts to capture these values.
- Ensure init writes these values into .agentplane/config.json.
- Update docs (AGENTS.md and agentctl/commands docs) to reflect the contract.
- Keep default_agent fixed to ORCHESTRATOR; do not add user-facing override in init.
- Do not change backend path resolution; paths remain derived from backend choice.

## Risks

- Adding new config keys requires schema updates and could break older tooling if not backward-compatible.
- init prompt changes must preserve non-interactive flags behavior.

## Verify Steps

bun run ci:agentplane

## Rollback Plan

Revert the commits for this task; config.json and init prompts return to previous defaults.

