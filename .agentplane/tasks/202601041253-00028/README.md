---
id: "202601041253-00028"
title: "agentctl task add: default depends_on to []"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags:
  - "agentctl"
  - "tasks"
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
  hash: "10b4ffcce3069a858b32580fe7247a1bb8a824a5"
  message: "Legacy completion (backfill)"
comments: []
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Make the pipeline rule enforceable: update python scripts/agentctl.py task add to always write an explicit depends_on list (empty by default) so new tasks never omit the field. Also adjust AGENTS.md wording to clarify this requirement applies on task creation (legacy tasks may omit depends_on until updated)."
id_source: "custom"
dirty: false
---
## Summary


## Scope


## Plan


## Risks


## Verification


## Rollback Plan
