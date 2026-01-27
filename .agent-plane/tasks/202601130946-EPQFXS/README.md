---
id: "202601130946-EPQFXS"
title: "Deduplicate agent JSON rules + batch ops guidance"
status: "DOING"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["agents", "docs", "agentctl"]
comments:
  - { author: "CODER", body: "Start: deduplicate shared guidance in agent JSON files and add batch task add/finish guidance in docs." }
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Trim shared guidance in .agent-plane/agents/*.json to role-specific content and point to AGENTS.md and agentctl.md; update docs to encourage batch task add/finish to reduce backend writes."
---
## Summary

Deduplicate agent JSON instructions to role-specific content and add batch task add/finish guidance.

## Context

Agent JSON files repeated common workflow rules; centralizing shared guidance in AGENTS.md and agentctl.md reduces prompt duplication. Batch task operations encourage write_tasks usage to reduce repeated writes.

## Scope

- Simplify .agent-plane/agents/*.json to role-specific guidance with references to AGENTS.md and .agent-plane/agentctl.md.
- Add batch task add/finish guidance in AGENTS.md and .agent-plane/agentctl.md.

## Risks

Over-trimming could remove role-specific constraints; ensure shared rules remain in AGENTS.md and agentctl.md.

## Verify Steps

Manual: review agent JSONs for role-specific content and confirm batch guidance appears in AGENTS.md and .agent-plane/agentctl.md.

## Rollback Plan

Revert the AGENTS.md, .agent-plane/agentctl.md, and .agent-plane/agents/*.json changes.

## Notes

Documentation-only change; no runtime behavior updates.

