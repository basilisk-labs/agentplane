---
id: "202601191443-XS8TD4"
title: "Add view toggle indicator"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags:
  - "workflow"
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
  hash: "ffcdb2da7012172300e53cd8ac5f2d6b412a64f5"
  message: "🐛 XS8TD4 fix view toggle and add order indicator"
comments: []
doc_version: 3
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Add an order direction indicator and harden the board/list toggle behavior in the viewer."
---
## Summary

Add an order direction indicator and fix immediate board/list switching.

## Context

The viewer needs a visible sort direction cue and should switch views without a reload.

## Scope

- Add a direction icon to the order toggle.
- Harden the board/list toggle with explicit view sync.

## Plan


## Verify Steps

- Click BOARD/LIST and confirm the view swaps instantly.
- Click Order and confirm the icon flips and ordering changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the updated toggle and visibility logic in `.agent-plane/viewer/tasks.html`.

## Findings

No backend changes required.

## Risks

Risk: UI regressions if view visibility logic conflicts with CSS; keep changes localized.
