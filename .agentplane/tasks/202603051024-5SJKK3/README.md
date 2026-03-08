---
id: "202603051024-5SJKK3"
title: "P1: Slim task index payload + lazy task hydration"
result_summary: "Task index cache now stores compact task payloads without doc/comments/events."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-05T10:39:27.121Z"
  updated_by: "CODER"
  note: "Compacted indexed TaskData by dropping doc/comments/events for cache entries; backend/task tests pass."
commit:
  hash: "63e6f988721936dd7ca004db849e94046dc00f79"
  message: "🚧 5SJKK3 backend: compact task index payload"
comments:
  -
    author: "CODER"
    body: "Start: Optimizing task index/list path to avoid loading full task payloads and reduce memory/CPU overhead."
  -
    author: "CODER"
    body: "Verified: Index entries now keep lean task payloads for listing paths while preserving task metadata needed by commands."
events:
  -
    type: "status"
    at: "2026-03-05T10:38:05.502Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Optimizing task index/list path to avoid loading full task payloads and reduce memory/CPU overhead."
  -
    type: "verify"
    at: "2026-03-05T10:39:27.121Z"
    author: "CODER"
    state: "ok"
    note: "Compacted indexed TaskData by dropping doc/comments/events for cache entries; backend/task tests pass."
  -
    type: "status"
    at: "2026-03-05T10:39:33.800Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Index entries now keep lean task payloads for listing paths while preserving task metadata needed by commands."
doc_version: 3
doc_updated_at: "2026-03-05T10:39:33.800Z"
doc_updated_by: "CODER"
description: "Store lightweight index entries for list/next/search and hydrate full task content only for commands that require full README/doc bodies."
id_source: "generated"
---
## Summary


## Scope


## Plan


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

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-05T10:39:27.121Z — VERIFY — ok

By: CODER

Note: Compacted indexed TaskData by dropping doc/comments/events for cache entries; backend/task tests pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-05T10:38:05.510Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Findings


## Risks
