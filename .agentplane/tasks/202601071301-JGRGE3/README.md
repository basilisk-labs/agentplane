---
id: "202601071301-JGRGE3"
title: "Deduplicate workflow_mode, handoff, and terminology rules"
status: "DONE"
priority: "normal"
owner: "PLANNER"
depends_on: []
tags: ["agents", "docs"]
verify: []
commit: { hash: "1b7c1e37569071a725602a2ac9b7a1904de7e834", message: "🧭 JGRGE3 dedupe workflow and terms: unify workflow_mode guidance; standardize task-id references; switch handoff notes to agentctl pr note; remove snapshot filename mentions" }
comments:
  - { author: "ORCHESTRATOR", body: "Verified: not run; doc/instruction edits only, no runtime impact." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:33.717Z"
doc_updated_by: "agentplane"
description: "Reduce duplicated workflow_mode and handoff guidance across agent JSONs/AGENTS.md by pointing to agentctl.md. Unify task-id/suffix terminology in agent instructions and docs."
---
## Summary

- Consolidated workflow_mode guidance to reference @.agent-plane/agentctl.md.
- Standardized task-id placeholders to `<task-id>` across agents and docs.
- Switched handoff instructions to `agentctl pr note` and removed repeated snapshot filename mentions.

## Goal

- Reduce duplicated workflow rules and normalize terminology across agent instructions.

## Scope

- @AGENTS.md
- @.agent-plane/agentctl.md
- @.agent-plane/agents/*.json

## Risks

- Low: terminology updates could require follow-up if other docs expect old placeholders.

## Verify Steps

- None (doc/instruction changes only).

## Rollback Plan

- Revert commit `1b7c1e375690`.
