---
id: "202601191414-J99M5D"
title: "Viewer data aggregation"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["ui", "tasks"]
commit: { hash: "3fb91cf7aaed42142d8e706dbda629c54a13b089", message: "✨ 2N28WV J99M5D add dashboard UI and aggregation" }
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Add any backend/API or client aggregation needed for dashboards using tasks.json and agents.json."
---
## Summary

Wire data aggregation for dashboard metrics using existing task fields.

## Context

The viewer can derive counts and breakdowns from tasks.json without new storage, but needs client logic to normalize fields consistently.

## Scope

- Extend normalization to include doc/id_source/dirty metadata.
- Add aggregation helpers and dashboard rendering logic.

## Risks

Risk: missing or inconsistent fields could skew metrics; handle empty values gracefully.

## Verify Steps

- Spot-check dashboard counts against visible task list and filters.

## Rollback Plan

Revert dashboard aggregation logic in `.agent-plane/viewer/tasks.html`.

## Notes

Avoid new API endpoints unless required for performance.

