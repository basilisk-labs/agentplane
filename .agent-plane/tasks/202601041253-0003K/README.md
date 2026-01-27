---
id: "202601041253-0003K"
title: "agentctl: migrate tasks.json to local backend"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["agentctl", "tasks"]
verify: null
commit: { hash: "3d8cd6dd2137ee90f303f6ca13d2f0f13cd412a6", message: "Legacy completion (backfill)" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Add a migration/export command to seed .agent-plane/tasks from tasks.json and set tasks_backend.config_path to the local backend."
dirty: false
id_source: "custom"
---
# 202601041253-0003K: agentctl: migrate tasks.json to local backend

## Summary

- Add a migration command to seed `.agent-plane/tasks/` from `.agent-plane/tasks.json`.
- Point `tasks_backend.config_path` to the local backend plugin.

## Goal

- Make local backend the default canonical store while keeping a one-time migration path from tasks.json.

## Scope

- Add `agentctl task migrate` (reads tasks.json, writes via configured backend).
- Update `.agent-plane/config.json` to use `.agent-plane/backends/local/backend.json`.

## Risks

- Migration may overwrite tasks if run repeatedly without checks.
- Tasks with unexpected schemas may fail to serialize into frontmatter.

## Verify Steps

- `python3 .agent-plane/agentctl.py task migrate`
- `python3 .agent-plane/agentctl.py task list`
- `python3 .agent-plane/agentctl.py task export --out .agent-plane/tasks.json`

## Rollback Plan

- Revert `.agent-plane/config.json` and remove the migrate command.

## Changes Summary (auto)

<!-- BEGIN AUTO SUMMARY -->
- `.agent-plane/agentctl.py`: add `task migrate` command for seeding backend from tasks.json.
- `.agent-plane/config.json`: set `tasks_backend.config_path` to local backend plugin.
<!-- END AUTO SUMMARY -->

