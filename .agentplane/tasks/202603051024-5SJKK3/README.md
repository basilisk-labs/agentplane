---
id: "202603051024-5SJKK3"
title: "P1: Slim task index payload + lazy task hydration"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
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
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Optimizing task index/list path to avoid loading full task payloads and reduce memory/CPU overhead."
events:
  -
    type: "status"
    at: "2026-03-05T10:38:05.502Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Optimizing task index/list path to avoid loading full task payloads and reduce memory/CPU overhead."
doc_version: 2
doc_updated_at: "2026-03-05T10:38:05.510Z"
doc_updated_by: "CODER"
description: "Store lightweight index entries for list/next/search and hydrate full task content only for commands that require full README/doc bodies."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- Add explicit checks/commands for this task before approval.

### Evidence / Commands
- Record executed commands and key outputs.

### Pass criteria
- Steps are reproducible and produce expected results.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan
