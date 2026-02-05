---
id: "202601111125-KZKBQ7"
title: "Normalize Redmine owners to agent"
status: "DONE"
priority: "low"
owner: "CODER"
depends_on: []
tags: ["redmine", "ownership"]
verify: []
commit: { hash: "06b37cfa276ad12ffb3b691248f750a2f873dbb2", message: "♻️ KZKBQ7 fill task doc sections" }
comments:
  - { author: "CODER", body: "Verified: owner mapping now uses configured agent (default REDMINE); updated six tasks to REDMINE owner; ran python -m py_compile .agent-plane/backends/redmine/backend.py." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:39.905Z"
doc_updated_by: "agentplane"
description: "Ensure Redmine-backed tasks use a configured agent owner (REDMINE) and retag existing tasks."
---
## Summary

Ensure Redmine tasks map owner to configured agent (default REDMINE) and clean existing tasks.

## Context

- Some tasks imported from Redmine were assigned to the assignee name (Via Mentis Assistant) instead of an agent id.
- We want owner fields to always be agent ids; the Redmine executor is effectively the API key owner.

## Scope

- Add owner_agent setting to Redmine backend (env override allowed) and default to REDMINE.
- Map owner from Redmine issues to the configured agent when listing.
- Update existing local task READMEs that used the assignee name to use REDMINE.

## Risks

- Changing owner mapping could surprise consumers expecting assignee names.
- Legacy exports may still contain old owners until refreshed.

## Verify Steps

- python -m py_compile .agent-plane/backends/redmine/backend.py
- python .agent-plane/agentctl.py task list --owner REDMINE

## Rollback Plan

- Revert .agent-plane/backends/redmine/backend.py and the adjusted task READMEs.
