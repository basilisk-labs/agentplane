---
id: "202601041253-0002N"
title: "agentctl work start: idempotent scaffold"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags:
  - "agentctl"
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
  hash: "e6d312e0b441b0deedf3c89c159fca9d9b4c09cb"
  message: "Legacy completion (backfill)"
comments: []
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Fix python scripts/agentctl.py work start to be idempotent in branch_pr: if docs/workflow/T-###/README.md already exists in the new worktree (from the planning commit), do not fail or re-scaffold unless --overwrite is provided. This prevents frequent \\\"File already exists\\\" errors now that agents default to work start."
id_source: "custom"
dirty: false
---
## Summary


## Scope


## Plan


## Risks


## Verification


## Rollback Plan
