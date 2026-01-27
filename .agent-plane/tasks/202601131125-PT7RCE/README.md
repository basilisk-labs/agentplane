---
id: "202601131125-PT7RCE"
title: "Align ORCHESTRATOR/PLANNER with roadmap workflow"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["workflow"]
commit: { hash: "9d4a383c6d1e8a08933180886aba7db8287c30e4", message: "✨ PT7RCE align roadmap workflow: update AGENTS.md orchestration flow; sync ORCHESTRATOR/PLANNER specs; add umbrella-task tracking" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: sync ORCHESTRATOR/PLANNER agent specs with AGENTS.md roadmap and top-level task rules." }
  - { author: "ORCHESTRATOR", body: "Verified: closing as unnecessary; roadmap flow was superseded by BK0QY5 top-level plan + task prompt." }
doc_version: 2
doc_updated_at: "2026-01-13T11:25:51+00:00"
doc_updated_by: "agentctl"
description: "Update ORCHESTRATOR and PLANNER agent specs to enforce top-level task handling, decomposition/CREATOR fallback, explicit plan approval, roadmap creation with epics, offer to convert epics to tasks, and roadmap completion notes."
---
## Summary

Align ORCHESTRATOR and PLANNER agent specs with the roadmap-first workflow and top-level task handling.

## Context

User requested that ORCHESTRATOR always treats the first message as a top-level task, decomposes into atomic tasks or CREATOR, requires approval, and maintains a roadmap with epic completion notes.

## Scope

Update AGENTS.md orchestration rules and sync ORCHESTRATOR/PLANNER JSON workflows; no runtime code changes.

## Risks

Low risk; spec changes could misalign expectations if not mirrored in agent JSON.

## Verify Steps

No tests (spec changes only).

## Rollback Plan

Revert the commit to restore the previous agent specs.

