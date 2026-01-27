---
id: "202601191438-731GGJ"
title: "Add sort reverse toggle"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["workflow"]
commit: { hash: "8ec4f84a917d8c4664d3ce47c5d3dbdb72755645", message: "✨ 731GGJ add sort order toggle" }
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Add a UI control to flip task list sort order between normal and reverse in the viewer."
---
## Summary

Add a reverse-sort toggle to the task list UI so users can flip ordering without reloading.

## Context

Sorting currently supports asc/desc internally but lacks a control in the cyberpunk UI.

## Scope

- Add a reverse-sort toggle near the sort dropdown.
- Wire the toggle to ORDER_MODE and refresh rendering.

## Risks

Risk: UI clutter; keep the control compact.

## Verify Steps

- Click the reverse-sort toggle and ensure tasks reorder immediately.

## Rollback Plan

Revert the toggle control and handler changes in `.agent-plane/viewer/tasks.html`.

## Notes

Reuse existing ORDER_MODE state and updateOrderToggle behavior.

