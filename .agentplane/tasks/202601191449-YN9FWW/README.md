---
id: "202601191449-YN9FWW"
title: "Normalize task status indicators + retro priorities"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["docs", "tasks", "workflow"]
verify: []
commit: { hash: "f72d05f1fd746c863a8e97171f24019448684567", message: "✨ XTMQRZ normalize priority reference in task notes" }
comments:
  - { author: "ORCHESTRATOR", body: "verified: status wording aligned and priorities normalized to standard labels." }
doc_version: 2
doc_updated_at: "2026-01-19T14:58:36+00:00"
doc_updated_by: "agentctl"
description: "Normalize status indicators across docs and set priority on retrospective tasks; track downstream doc and backlog updates."
---
## Summary

Normalized task priority indicators and aligned status wording in docs.

## Context

Priority indicators were inconsistent (med/Нормальный) and docs used mixed status labels.

## Scope

- Standardize priorities to low/normal/high across tasks.
- Update docs to reference TODO instead of Backlog in workflow wording.

## Risks

- Consumers relying on legacy labels may need to update their expectations.

## Verify Steps

- N/A (documentation and metadata normalization).

## Rollback Plan

- Revert commits in task metadata to restore the previous labels.

## Notes

- No task status changes were made; only labels were normalized.
