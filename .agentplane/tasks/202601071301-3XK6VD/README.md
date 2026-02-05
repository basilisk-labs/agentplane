---
id: "202601071301-3XK6VD"
title: "Centralize commit format rules in agentctl"
status: "DONE"
priority: "normal"
owner: "PLANNER"
depends_on: []
tags: ["agents", "docs"]
verify: []
commit: { hash: "3ad71a3bcebb400acf2b8204c490415b406511b4", message: "🧩 3XK6VD centralize commit format: define canonical format in agentctl; replace per-agent format rules with agentctl reference; align AGENTS commit rule to agentctl" }
comments:
  - { author: "ORCHESTRATOR", body: "Verified: not run; doc/instruction edits only, no runtime impact." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:33.392Z"
doc_updated_by: "agentplane"
description: "Make agentctl.md the single source of truth for commit format; update AGENTS.md + agent JSONs to reference agentctl instead of duplicating detailed rules/examples. Update any remaining commit examples to follow the new detailed-changelog format."
---
## Summary

- Centralized commit format rules in @.agent-plane/agentctl.md.
- Replaced per-agent commit format instructions with a single agentctl reference.
- Aligned AGENTS.md commit guidance to the agentctl format source of truth.

## Goal

- Ensure commit formatting is defined in one place and referenced everywhere else.

## Scope

- @.agent-plane/agentctl.md
- @AGENTS.md
- @.agent-plane/agents/*.json

## Risks

- Low: format changes now require updates only in agentctl.

## Verify Steps

- None (doc/instruction changes only).

## Rollback Plan

- Revert commit `3ad71a3bcebb`.
