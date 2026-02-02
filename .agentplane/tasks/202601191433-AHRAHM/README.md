---
id: "202601191433-AHRAHM"
title: "Fix viewer board/list toggle"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["ui", "tasks"]
verify: []
commit: { hash: "85e3a6149c131b329fea8576cf49bda4d86bec9f", message: "🐛 AHRAHM fix board/list toggle" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Ensure the board/list toggle switches views immediately without requiring a page reload."
---
## Summary

Fix the board/list toggle so switching views updates immediately.

## Context

The current toggle updates only after a reload. We need to force the DOM display state to update on click.

## Scope

- Adjust view toggle logic in `.agent-plane/viewer/tasks.html`.

## Risks

Risk: display logic could conflict with existing CSS; ensure both hidden and display attributes align.

## Verify Steps

- Click BOARD/LIST in the viewer and confirm the view switches immediately.

## Rollback Plan

Revert the toggle logic in `.agent-plane/viewer/tasks.html`.

## Notes

Keep the change small and localized to the view mode handler.
