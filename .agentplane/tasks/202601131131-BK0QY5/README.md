---
id: "202601131131-BK0QY5"
title: "Replace roadmap flow with top-level plan + task proposal"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["tasks"]
verify: []
commit: { hash: "59702a9703596bd4a062f967ec69b24a452d5315", message: "✨ BK0QY5 replace roadmap flow: update AGENTS.md orchestration; sync ORCHESTRATOR/PLANNER specs; adjust umbrella task guidance" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: replace roadmap flow with top-level plan and task proposal." }
  - { author: "ORCHESTRATOR", body: "Verified: not run (spec-only updates); no executable changes or tests required in this task." }
doc_version: 2
doc_updated_at: "2026-01-13T11:32:23+00:00"
doc_updated_by: "agentctl"
description: "Revise ORCHESTRATOR/PLANNER specs and AGENTS.md to treat each request as a top-level plan, then prompt the user to create one or more tasks instead of maintaining docs/ROADMAP.md."
---
## Summary

Replace roadmap-specific orchestration with top-level plan and task proposal flow.

## Context

User prefers a top-level plan per request and a prompt to create one or more tasks, rather than maintaining docs/ROADMAP.md.

## Scope

Update AGENTS.md and ORCHESTRATOR/PLANNER JSON workflows to remove roadmap steps and require a post-plan task-creation prompt.

## Risks

Low risk; aligns agent expectations but must stay consistent across AGENTS.md and agent JSON.

## Verify Steps

No tests (spec changes only).

## Rollback Plan

Revert the commit to restore the prior roadmap workflow.
