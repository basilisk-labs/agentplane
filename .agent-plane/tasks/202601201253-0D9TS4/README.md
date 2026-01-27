---
id: "202601201253-0D9TS4"
title: "Ignore untracked files in agent behavior"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["agents", "workflow"]
commit: { hash: "50d8ca97ab3fbd10d3a49bc149523701321904b9", message: "✨ 0D9TS4 normalize task doc headings" }
doc_version: 2
doc_updated_at: "2026-01-20T12:55:13+00:00"
doc_updated_by: "agentctl"
description: "Update agent instructions so new/untracked repo files are ignored and only task-owned changes are committed."
---
## Summary
Ensure agents ignore new/untracked repository files and commit only their own changes.

## Context
Current guidance can treat unexpected files as blockers, causing agents to stop or react to unrelated additions.

## Scope
- Update shared agent guidance to ignore untracked/new files created by others.
- Clarify that clean status requirements exclude unrelated untracked files.
- Reinforce commit discipline to stage/commit only task-owned files.

## Risks
- Agents might overlook a relevant new file if it is actually part of their task.

## Verify Steps
- Review updated AGENTS.md guidance for the new rule.

## Rollback Plan
- Revert the AGENTS.md edits.

## Notes
- No code behavior changes; documentation-only.

