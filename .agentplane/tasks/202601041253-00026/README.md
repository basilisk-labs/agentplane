---
id: "202601041253-00026"
title: "agentctl guard commit: add --auto-allow"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags:
  - "agentctl"
  - "git"
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
  hash: "26eabcc06d63db1b67637df7bc84b849c27e789e"
  message: "Legacy completion (backfill)"
comments: []
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Reduce commit friction by adding --auto-allow to python scripts/agentctl.py guard commit (same behavior as the commit wrapper): infer minimal --allow prefixes from staged files and run the same guard checks. Acceptance: (1) python scripts/agentctl.py guard commit T-### -m MSG --auto-allow works without explicit --allow; (2) keeps existing behavior when --allow is provided; (3) error messages remain actionable; (4) document in .agent-plane/agentctl.md."
id_source: "custom"
dirty: false
---
## Summary


## Scope


## Plan


## Risks


## Verification


## Rollback Plan
