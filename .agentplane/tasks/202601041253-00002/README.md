---
id: "202601041253-00002"
title: "Restructure agent registry into JSON files"
status: "DONE"
priority: "normal"
owner: "REDMINE"
depends_on: []
tags: ["agents"]
verify: []
commit: { hash: "b086a09a601ccc90ba7c91fda3bb1317e3485419", message: "✅ Y0P8RY verified: Phase 2 migration complete | details: no additional core cleanup changes required at this stage." }
comments:
  - { author: "ORCHESTRATOR", body: "verified: agent registry is already JSON under .agent-plane/agents | details: closing legacy backfill." }
doc_version: 2
doc_updated_at: "2026-01-30T12:12:28+00:00"
doc_updated_by: "agentctl"
description: "Split every reusable agent prompt into a dedicated JSON file under .AGENTS for easier maintenance."
dirty: false
id_source: "custom"
---
## Summary

- Confirmed agent registry lives under .agent-plane/agents as JSON.\n- Closed the legacy backfill task to match current state.

## Scope

- Verify agent registry uses JSON files under .agent-plane/agents.\n- Close the legacy task with updated documentation.

## Risks

- If agent definitions are moved again, this task may need re-opening.\n- Closing a legacy task could mask future regressions if owners change.

## Verify Steps

- ls .agent-plane/agents

## Rollback Plan

- Reopen the task if agent registry needs restructuring.\n- Audit agent files and update docs accordingly.
