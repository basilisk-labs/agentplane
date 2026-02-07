---
id: "202602071657-B8B59A"
title: "Warn: spike + code/backend/frontend tags"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on:
  - "202602071657-4JSPP2"
tags:
  - "code"
  - "workflow"
verify:
  - "bun run test:agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T17:46:37.957Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T17:47:58.684Z"
  updated_by: "CODER"
  note: "Warn on spike+code/backend/frontend tags in task new and task update; tests: bun run test:agentplane, bun run test:cli:core."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: warn when spike is combined with code/backend/frontend tags to prevent accidental implementation."
doc_version: 2
doc_updated_at: "2026-02-07T17:47:58.686Z"
doc_updated_by: "CODER"
description: "Warn (or gate via config later) when spike is combined with implementation tags."
---
## Summary


## Scope


## Plan

1) Emit a warning when spike tag is combined with implementation tags (code/backend/frontend).
2) Apply warning on task new (and task update if feasible).
3) Run bun run test:agentplane and bun run test:cli:core.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T17:47:58.684Z — VERIFY — ok

By: CODER

Note: Warn on spike+code/backend/frontend tags in task new and task update; tests: bun run test:agentplane, bun run test:cli:core.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Scope

Prevent spikes from becoming hidden implementation by warning on spike+implementation tags.

### Checks

- `agentplane task new ... --tag spike --tag code` prints a warning.
- `agentplane task update <id> --tag spike --tag code` prints a warning (if implemented).

### Evidence / Commands

- bun run test:cli:core

### Pass criteria

- Warning is emitted; command still succeeds.
