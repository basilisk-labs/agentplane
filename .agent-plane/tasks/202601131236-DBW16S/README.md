---
id: "202601131236-DBW16S"
title: "Analyze config.json candidates for agent settings"
status: "TODO"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["config", "agentctl"]
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Review repo configs and agent guidance to propose settings that belong in config.json and how agentctl should toggle them."
---
## Summary

Propose config.json additions (verify requirements, task doc sections, comment requirements, branch/worktree paths, commit guard tuning, base_branch) plus agentctl toggles to switch them.

## Context

User asked to analyze the repo and suggest which settings should move into config.json so agents can honor them and switch them via agentctl.

## Scope

Reviewed config usage in .agent-plane/config.json, .agent-plane/agentctl.py, AGENTS.md, and key docs; produced a prioritized list of candidate config keys and example agentctl toggles. No code changes.

## Risks

Recommendations require agentctl changes; too many knobs may drift from AGENTS.md if not kept in sync.

## Verify Steps

rg -n "VERIFY_REQUIRED_TAGS|TASK_DOC_REQUIRED_SECTIONS|WORKTREES_DIRNAME|GENERIC_COMMIT_TOKENS" .agent-plane/agentctl.py
rg -n "workflow_mode|config.json" AGENTS.md README.md docs/08-branching-and-pr-artifacts.md

## Rollback Plan

No code changes; revert this task README or delete the task if the analysis is no longer needed.

## Notes

Inspected agentctl constants (VERIFY_REQUIRED_TAGS, TASK_DOC_REQUIRED_SECTIONS, WORKTREES_DIRNAME, GENERIC_COMMIT_TOKENS) and docs that describe workflow_mode and config.json usage.

