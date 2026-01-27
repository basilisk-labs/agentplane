---
id: "202601041529-CYHJZB"
title: "Redmine sync: enrich metadata"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["sync", "redmine"]
verify: null
commit: { hash: "4d57b45688484f8e5db8ee6ba9eed44a541fe4d0", message: "Legacy completion (backfill)" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Extend Redmine sync to include additional local metadata (done ratio, start date, assignee) when pushing tasks."
dirty: false
id_source: "custom"
---
## Summary

Improve Redmine sync to include more local metadata when pushing tasks, such as done ratio, start date, and optional assignee mapping.

## Scope

- Map local DONE status to `done_ratio` in Redmine.
- Derive `start_date` from task id timestamp.
- Allow optional assignee via env var to map local owner to Redmine user id.
- Update `.env.example` with any new env vars.

## Risks

- Incorrect mapping could overwrite existing issue fields in Redmine.
- Assignee id mismatch may cause API errors or assign to the wrong user.

## Verify Steps

- `bash check_redmine.sh`
- `set -a; source .env; set +a; python3 .agent-plane/agentctl.py sync redmine --direction push`

## Rollback Plan

- Revert the commit for this task and re-sync from local cache if needed.

