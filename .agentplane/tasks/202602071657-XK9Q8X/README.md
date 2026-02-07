---
id: "202602071657-XK9Q8X"
title: "Scaffold: Add Verify Steps placeholder marker"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071657-PA43CW"
tags:
  - "code"
  - "tasks"
  - "template"
verify:
  - "bun run test:agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T17:12:55.408Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T17:13:19.654Z"
  updated_by: "CODER"
  note: "Scaffold Verify Steps now includes a strict placeholder marker; bun run test:agentplane."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add a strict placeholder marker to scaffolded Verify Steps so gates can detect unfilled templates."
doc_version: 2
doc_updated_at: "2026-02-07T17:13:19.657Z"
doc_updated_by: "CODER"
description: "Ensure new scaffold includes a strict placeholder marker to detect unfilled Verify Steps."
---
## Summary


## Scope


## Plan

1) Add a strict placeholder marker in scaffolded ## Verify Steps to enable filled/unfilled gating.
2) Ensure placeholder is present in all new scaffolds.
3) Run bun run test:agentplane.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T17:13:19.654Z — VERIFY — ok

By: CODER

Note: Scaffold Verify Steps now includes a strict placeholder marker; bun run test:agentplane.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
