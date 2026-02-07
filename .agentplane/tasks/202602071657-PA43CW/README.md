---
id: "202602071657-PA43CW"
title: "Scaffold: Add structured Verify Steps template"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071657-ZHA9GP"
tags:
  - "code"
  - "tasks"
  - "template"
verify:
  - "bun run test:agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T17:10:35.124Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T17:11:09.510Z"
  updated_by: "CODER"
  note: "Scaffold now includes structured Verify Steps section before Verification; bun run test:agentplane."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: updating task scaffold README template to include a structured Verify Steps section."
doc_version: 2
doc_updated_at: "2026-02-07T17:11:09.512Z"
doc_updated_by: "CODER"
description: "Update task scaffold README template to include a structured, initially-empty ## Verify Steps block."
---
## Summary


## Scope


## Plan

1) Update task scaffold template to include a structured ## Verify Steps section.
2) Ensure Verify Steps appears before ## Verification in the scaffolded README.
3) Add/adjust tests as needed.
4) Run bun run test:agentplane.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T17:11:09.510Z — VERIFY — ok

By: CODER

Note: Scaffold now includes structured Verify Steps section before Verification; bun run test:agentplane.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
