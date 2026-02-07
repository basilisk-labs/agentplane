---
id: "202601191459-ZG4320"
title: "Show priority as icons in viewer"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "ui"
  - "tasks"
  - "viewer"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "968b221a08b4b7a7832f87404f1b6db5195351d2"
  message: "✨ 202601191459-ZG4320 show priority icons in viewer"
comments: []
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Replace textual low/normal/high priority labels in the task viewer with icon-based indicators for cards, tables, tooltips, and drawer."
---
## Summary

Replace priority text labels in the task viewer with icon indicators for low/normal/high.

## Context

The viewer currently renders priority as plain text across cards, table rows, tooltips, and the drawer.

## Scope

Introduce priority icon styles and SVGs, then swap priority renderers to show icons in the viewer UI.

## Risks

Icons could be unclear without hover context; include title/aria labels to preserve meaning.

## Verify Steps

Run ./viewer.sh, open the viewer, and confirm priority renders as icons in kanban cards, table rows, tooltips, and the drawer.

## Rollback Plan

Revert the changes in .agent-plane/viewer/tasks.html and reload the viewer.

## Plan


## Verification
