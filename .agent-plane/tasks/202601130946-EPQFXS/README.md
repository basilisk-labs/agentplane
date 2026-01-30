---
id: "202601130946-EPQFXS"
title: "Deduplicate agent JSON rules + batch ops guidance"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["agents", "docs", "agentctl"]
commit: { hash: "e558a94abb44db168c91b3382e06004b9ca0312b", message: "✅ GZ15T6 verified: task deemed not актуальна | details: closing without changes." }
comments:
  - { author: "CODER", body: "Start: deduplicate shared guidance in agent JSON files and add batch task add/finish guidance in docs." }
  - { author: "ORCHESTRATOR", body: "verified: task deemed not актуальна | details: closing without changes." }
  - { author: "ORCHESTRATOR", body: "verified: task deemed not актуальна | details: closing without changes." }
  - { author: "ORCHESTRATOR", body: "verified: task deemed not актуальна | details: closing without changes." }
doc_version: 2
doc_updated_at: "2026-01-30T12:22:38+00:00"
doc_updated_by: "agentctl"
description: "Trim shared guidance in .agent-plane/agents/*.json to role-specific content and point to AGENTS.md and agentctl.md; update docs to encourage batch task add/finish to reduce backend writes."
---
## Summary

- Task is no longer актуальна; closing without changes.

## Context

Agent JSON files repeated common workflow rules; centralizing shared guidance in AGENTS.md and agentctl.md reduces prompt duplication. Batch task operations encourage write_tasks usage to reduce repeated writes.

## Scope

- No changes; task closed as obsolete.

## Risks

- Guidance may need revisit if agent JSONs diverge later.

## Verify Steps

- None (task closed as not актуальна).

## Rollback Plan

- Reopen the task if shared guidance needs consolidation.

## Notes

Documentation-only change; no runtime behavior updates.

