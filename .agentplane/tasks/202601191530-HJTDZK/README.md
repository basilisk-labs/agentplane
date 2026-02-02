---
id: "202601191530-HJTDZK"
title: "Require tags on new tasks"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["agents", "tasks", "workflow"]
verify: []
commit: { hash: "55943b360a037b343be0a24b2514600ba6c63092", message: "✨ HJTDZK require tags on task creation; update agentctl guidance; align orchestrator/planner rules; add task doc" }
comments:
  - { author: "ORCHESTRATOR", body: "verified: not run (doc/guidance updates only) | details: manual review only, no code execution." }
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Ensure task creation enforces non-empty tags and update agent guidance to always pass tags when creating tasks."
---
## Summary

Enforce non-empty tags when creating tasks and document the requirement for agents.

## Scope

Update agentctl task creation validation and adjust agentctl/AGENTS/agent guidance to mention required tags.

## Risks

Task creation without tags will now error, which may break existing automation. Document the requirement and keep the error message clear.

## Verify Steps

1) python .agent-plane/agentctl.py task new --title 'Tmp' --description 'Tmp' --priority low --owner ORCHESTRATOR --depends-on '[]' --tag smoke. 2) python .agent-plane/agentctl.py task new --title 'Tmp2' --description 'Tmp2' --priority low --owner ORCHESTRATOR --depends-on '[]' (expect error for missing tags).

## Rollback Plan

Revert the commit and rerun agentctl task lint if needed.
