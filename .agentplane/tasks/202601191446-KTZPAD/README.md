---
id: "202601191446-KTZPAD"
title: "Move order toggle to navbar"
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
  hash: "a9e6272ec10cf312be4d2050950a75aab87e2d54"
  message: "🎨 KTZPAD move order toggle to navbar"
comments: []
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Relocate the order direction toggle button to the control deck navbar near Refresh Stream."
---
## Summary

Move the order direction toggle into the control deck navbar for quicker access.

## Context

The order indicator currently sits in the filter grid; the request is to place it near Refresh Stream.

## Scope

- Relocate the order toggle button to the control deck.
- Adjust styling to fit the navbar layout.

## Risks

Risk: layout crowding in the header on narrow widths; keep the button compact.

## Verify Steps

- Confirm the order toggle appears left of Refresh Stream and still flips sorting.

## Rollback Plan

Move the order toggle back to the filter grid in `.agent-plane/viewer/tasks.html`.

## Notes

No behavior changes beyond placement.

## Plan


## Verification
