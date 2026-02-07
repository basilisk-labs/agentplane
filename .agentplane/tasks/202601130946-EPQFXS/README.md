---
id: "202601130946-EPQFXS"
title: "Deduplicate agent JSON rules + batch ops guidance"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags:
  - "agents"
  - "docs"
  - "agentctl"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "56784335a5f6585a0d8cdd34dfb579aa79a6ac1b"
  message: "✅ TNM8G3 close: record finish status for prod-v1.0 policy update"
comments:
  -
    author: "CODER"
    body: "Start: deduplicate shared guidance in agent JSON files and add batch task add/finish guidance in docs."
  -
    author: "ORCHESTRATOR"
    body: "verified: task deemed not актуальна | details: closing without changes."
  -
    author: "ORCHESTRATOR"
    body: "verified: task deemed not актуальна | details: closing without changes."
  -
    author: "ORCHESTRATOR"
    body: "verified: task deemed not актуальна | details: closing without changes."
  -
    author: "ORCHESTRATOR"
    body: "verified: task deemed not актуальна | details: closing without changes."
doc_version: 2
doc_updated_at: "2026-02-03T12:08:42.878Z"
doc_updated_by: "agentplane"
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

## Plan


## Verification
