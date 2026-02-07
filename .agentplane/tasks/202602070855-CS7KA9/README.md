---
id: "202602070855-CS7KA9"
title: "IO utils: stable JSON + write-if-changed"
status: "DONE"
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
  state: "ok"
  updated_at: "2026-02-07T09:21:21.681Z"
  updated_by: "CODER"
  note: "Ran bun run typecheck; bun run test:cli:core; bun run lint. All passed; commit=f5bb1c9755bc."
commit:
  hash: "f5bb1c9755bcf78d59e38542451cd464120f9122"
  message: "✅ CS7KA9 io: stable write-if-changed helpers"
comments:
  -
    author: "CODER"
    body: "Start: Implement write-if-changed + stable JSON helpers and migrate critical writes to reduce diff-noise and IO."
  -
    author: "CODER"
    body: "Verified: Added shared write-if-changed helpers (text + stable JSON) and migrated export/index/pr meta/recipes cache/ide sync writes; ran typecheck, cli:core tests, and lint; commit=f5bb1c9755bc."
events:
  -
    type: "verify"
    at: "2026-02-07T09:21:21.681Z"
    author: "CODER"
    state: "ok"
    note: "Ran bun run typecheck; bun run test:cli:core; bun run lint. All passed; commit=f5bb1c9755bc."
  -
    type: "status"
    at: "2026-02-07T09:21:32.272Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Added shared write-if-changed helpers (text + stable JSON) and migrated export/index/pr meta/recipes cache/ide sync writes; ran typecheck, cli:core tests, and lint; commit=f5bb1c9755bc."
doc_version: 2
doc_updated_at: "2026-02-07T09:21:32.272Z"
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

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T09:21:21.681Z — VERIFY — ok

By: CODER

Note: Ran bun run typecheck; bun run test:cli:core; bun run lint. All passed; commit=f5bb1c9755bc.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
