---
id: "202602071657-NN3DSJ"
title: "CLI: Warn on verify-required tasks about filling Verify Steps"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071657-94AHEC"
tags:
  - "code"
  - "cli"
  - "tasks"
verify:
  - "bun run test:agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T17:28:15.893Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T17:29:17.514Z"
  updated_by: "CODER"
  note: "task new now warns (stderr) for verify-required tags about filling Verify Steps before plan approval; tests: bun run test:agentplane, bun run test:cli:core."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add stderr warning on task new for verify-required tags about filling Verify Steps before approving plan."
doc_version: 2
doc_updated_at: "2026-02-07T17:29:17.518Z"
doc_updated_by: "CODER"
description: "Emit stderr warning in task new when tags imply Verify Steps must be filled before plan approve."
---
## Summary


## Scope


## Plan

1) In task new, emit a warning (stderr) when tags imply Verify Steps gating is required.
2) Keep exit code 0; do not require frontmatter verify commands.
3) Run bun run test:agentplane and bun run test:cli:core.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T17:29:17.514Z — VERIFY — ok

By: CODER

Note: task new now warns (stderr) for verify-required tags about filling Verify Steps before plan approval; tests: bun run test:agentplane, bun run test:cli:core.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Scope

Warn users at creation time that Verify Steps must be filled before plan approval for verify-required tasks.

### Checks

- `agentplane task new ... --tag code` prints a warning to stderr about filling Verify Steps in README.
- Exit code remains 0 and task is created.

### Evidence / Commands

- bun run test:agentplane
- bun run test:cli:core

### Pass criteria

- Warning is emitted only as a warning; no hard failure.
