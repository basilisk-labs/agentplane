---
id: "202601041253-0001K"
title: "Remove legacy tasks.py + migrate docs to agentctl"
status: "DONE"
priority: "normal"
owner: "REDMINE"
depends_on: []
tags:
  - "docs"
  - "agentctl"
  - "tasks"
verify:
  - "python scripts/agentctl.py task lint"
  - "python scripts/agentctl.py agents"
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
  hash: "d6517d61191b4d80e80acc63117b6e55ba02c557"
  message: "Legacy completion (backfill)"
comments:
  -
    author: "PLANNER"
    body: "Planned: remove legacy tasks.py + update docs to agentctl; Constraints: no manual tasks.json edits; keep guidance consistent across repo."
  -
    author: "CODER"
    body: "Start: remove scripts/tasks.py; update README + other docs to new agentctl workflow; Constraints: no manual tasks.json edits; keep changes minimal and consistent."
  -
    author: "REVIEWER"
    body: "Verified: scripts/tasks.py removed; README.md and GUIDELINE.md updated to agentctl-based task lifecycle (ready/start/block/task/verify/guard/finish); agentctl task lint passes; Limitations: existing CODEX owner warnings remain."
doc_version: 2
doc_updated_at: "2026-02-03T12:08:21.342Z"
doc_updated_by: "agentplane"
description: "Delete scripts/tasks.py and update README.md + any other docs/configs that mention the old tasks.py/status-board flow, replacing it with the agentctl CLI workflow (ready/start/block/task/verify/guard/finish)."
id_source: "custom"
dirty: false
---
## Summary

Test doc round-trip from Redmine.

## Context

Validate custom field storage for task docs.

## Scope

Ensure doc payload can be written and read via agentctl.

## Risks

None.

## Verify Steps

- n/a

## Rollback Plan

Delete the test doc payload in Redmine.

## Notes

Test-only content.

## Plan


## Verification
