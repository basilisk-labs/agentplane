---
id: "202601191446-6CXD6R"
title: "Remove rounded corners from viewer"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["ui", "tasks"]
commit: { hash: "9be13a57b69bfa60ade046c26dadea809c971aba", message: "🎨 6CXD6R remove rounded corners" }
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Update the viewer UI to avoid rounded corners across controls and cards."
---
## Summary

Remove rounded corners from the viewer UI to match the requested sharp-edged style.

## Context

The current cyberpunk UI uses rounded corners across panels, cards, and controls. The request is to eliminate rounding.

## Scope

- Set border-radius values to 0 for viewer UI elements.
- Keep layout, spacing, and colors unchanged.

## Risks

Risk: Some elements may look harsh on small screens; keep spacing intact.

## Verify Steps

- Open the viewer and confirm panels, buttons, cards, and tables have square corners.

## Rollback Plan

Revert the border-radius changes in `.agent-plane/viewer/tasks.html`.

## Notes

Apply consistently across dashboard and task views.

