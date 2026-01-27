---
id: "202601131304-E1625C"
title: "Optimize AGENTS and agent JSON instructions"
status: "DONE"
priority: "normal"
owner: "DOCS"
depends_on: ["202601131304-D4ZA6S", "202601131304-7JXJF7"]
tags: ["agents"]
commit: { hash: "af6584106ff4d2f06a3bface18236931e53a5c66", message: "✨ E1625C align AGENTS guidance with config-driven rules" }
comments:
  - { author: "DOCS", body: "Verified: ran rg checks for config references in AGENTS.md and agent JSONs; changes align guidance to config-driven branch/worktree rules." }
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Run UPDATER audit and apply the recommended optimizations to AGENTS.md and relevant .agent-plane/agents/*.json."
---
## Summary

Optimized AGENTS.md and agent JSONs to reference config-driven settings and CLI config show/set.

## Context

New config keys required agent guidance to point to config management and parametrize branch/worktree paths.

## Scope

Updated AGENTS.md, .agent-plane/agents/ORCHESTRATOR.json, .agent-plane/agents/DOCS.json, and .agent-plane/agents/INTEGRATOR.json.

## Risks

Instruction-only changes; risk is outdated guidance if config keys change.

## Verify Steps

rg -n "config show|config set|branch\.task_prefix|paths\.worktrees_dir" AGENTS.md .agent-plane/agents/ORCHESTRATOR.json .agent-plane/agents/DOCS.json .agent-plane/agents/INTEGRATOR.json

## Rollback Plan

Revert changes in AGENTS.md and the updated agent JSON files.

## Notes

UPDATER audit focus: replace hardcoded branch/worktree strings with placeholders and add config CLI guidance.

