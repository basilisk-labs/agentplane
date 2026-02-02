---
id: "202601051338-8DGWPT"
title: "Redmine doc metadata + task_id enforcement"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["redmine", "backend", "docs"]
verify: ["echo docs-only"]
commit: { hash: "095a9428549afe10ccf9d4e078cdc6c48d78b0f9", message: "🧩 8DGWPT redmine doc metadata" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Add doc metadata storage via custom field, enforce valid task_id on Redmine, export tasks.json deterministically, and document new commands/behavior."
---
## Summary

- Store task doc metadata in Redmine via a dedicated custom field and expose read/write commands.
- Enforce valid `task_id` values in Redmine and export a deterministic `tasks.json`.

## Scope

- Add `doc` storage for Redmine and local backends, plus agentctl `task doc show|set`.
- Require valid `task_id` for Redmine issues, auto-fill missing/invalid IDs, and detect duplicates.
- Update docs for backend behavior and new commands.

## Risks

- Redmine custom fields must be configured correctly or doc updates will fail.
- Auto-filled `task_id` values in Redmine could surprise users if they expected manual IDs.

## Verify Steps

- `python3 .agent-plane/agentctl.py task doc show 202601051338-8DGWPT`
- `python3 .agent-plane/agentctl.py task doc set 202601051338-8DGWPT --text "## Summary\n\n- doc sync check"`

## Rollback Plan

- Revert the commit and remove the Redmine `doc` custom field mapping if needed.
