---
id: "202601191414-4ZX6FD"
title: "Expand viewer dashboards"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: ["202601191414-2N28WV", "202601191414-J99M5D", "202601191414-WP4B8E"]
tags: ["ui", "tasks"]
verify: []
commit: { hash: "3fb91cf7aaed42142d8e706dbda629c54a13b089", message: "✨ 2N28WV J99M5D add dashboard UI and aggregation" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Add cyberpunk dashboards and additional viewer functionality based on available repo data, with supporting backend/API updates and verification."
---
## Summary

Plan and track the viewer dashboard expansion, covering UI, data aggregation, and verification.

## Context

The current viewer already provides task lists, agents, and system tabs using tasks.json and agents.json. We want a dashboard layer using only available repo data and keep the cyberpunk visual language.

## Scope

- Add a dashboard tab with KPI cards and breakdowns derived from tasks.json.
- Add filter presets and drill-down interactions within the viewer.
- If needed, add API helpers in the viewer server to support dashboards.
- Run a smoke-check for the new dashboard UX and document verify steps.

## Risks

Risk: aggregations may be misleading if fields are missing or inconsistent, so the UI should handle empty/unknown values gracefully.

## Verify Steps

- Open the viewer and confirm dashboard KPIs render and presets filter tasks.
- Spot-check counts against visible task list for accuracy.

## Rollback Plan

Revert changes to `.agent-plane/viewer/tasks.html` and `.agent-plane/viewer/tasks_server.py`.

## Notes

Use only task fields present in `.agent-plane/tasks.json` and agent definitions in `.agent-plane/agents/*.json`.
