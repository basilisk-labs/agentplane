---
id: "202601191449-XTMQRZ"
title: "Set priority for retrospective tasks"
status: "DONE"
priority: "normal"
owner: "PLANNER"
depends_on:
  - "202601191449-YN9FWW"
tags:
  - "tasks"
  - "backlog"
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
  hash: "872134c71b4267716ff48a35bccd34c9b9825c53"
  message: "✨ XTMQRZ normalize task priorities to low/normal/high"
comments:
  -
    author: "PLANNER"
    body: "verified: task priorities normalized to low/normal/high across metadata."
doc_version: 2
doc_updated_at: "2026-02-03T12:08:53.656Z"
doc_updated_by: "agentplane"
description: "Identify retrospective tasks and set their priority consistently via agentctl."
---
## Summary

Normalized priority values across tasks to the standard low/normal/high scheme.

## Context

Priorities were mixed between med/Нормальный and needed a single scheme.

## Scope

- Update all task frontmatter priority values to normal where med/Нормальный appeared.
- Fix any priority mentions in task notes to match the standard labels.

## Risks

- External systems expecting legacy labels may need a refresh.

## Verify Steps

- N/A (data normalization).

## Rollback Plan

- Revert the linked commits to restore legacy priority labels.

## Notes

- Priorities now appear only as low/normal/high in task metadata.

## Plan


## Verification
