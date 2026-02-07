---
id: "202602070855-CS7KA9"
title: "IO utils: stable JSON + write-if-changed"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "io"
  - "perf"
verify:
  - "bun run typecheck"
  - "bun run test:cli:core"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T09:20:08.000Z"
  updated_by: "USER"
  note: "Approved in chat (2026-02-07)."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement write-if-changed + stable JSON helpers and migrate critical writes to reduce diff-noise and IO."
events: []
doc_version: 2
doc_updated_at: "2026-02-07T09:20:07.768Z"
doc_updated_by: "CODER"
description: "Add writeTextIfChanged (atomic write + compare) and writeJsonStableIfChanged (canonicalize + stable key order + atomic) and switch config/cache/export writes to these helpers."
id_source: "explicit"
---
## Summary


## Scope


## Plan

1. Add shared write-if-changed utilities: writeTextIfChanged(path, content) and writeJsonStableIfChanged(path, obj).
2. Use these utilities for config/cache/export writes (task export snapshot, task index cache, PR meta, recipes cache/signature, ide sync).
3. Add unit tests for stable JSON ordering + no-write when unchanged.
4. Run: bun run typecheck; bun run test:cli:core; bun run lint.

## Risks


## Verification


## Rollback Plan
