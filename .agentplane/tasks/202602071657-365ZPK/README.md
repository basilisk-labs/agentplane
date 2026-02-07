---
id: "202602071657-365ZPK"
title: "UX: Add command to print Verify Steps"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202602071657-KAQA47"
tags:
  - "code"
  - "cli"
  - "ux"
verify:
  - "bun run test:agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T17:35:56.602Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T17:37:44.753Z"
  updated_by: "CODER"
  note: "Added task verify-show command to print Verify Steps; covered by bun run test:cli:core."
commit:
  hash: "855043e1d5906f0ea827288f31d30380ff4d206d"
  message: "✅ 365ZPK cli: add task verify-show"
comments:
  -
    author: "CODER"
    body: "Start: add a task verify-show command to print Verify Steps for verifiers."
  -
    author: "CODER"
    body: "Verified: added task verify-show shortcut to print Verify Steps for verifiers; bun run test:cli:core passed."
doc_version: 2
doc_updated_at: "2026-02-07T17:38:35.857Z"
doc_updated_by: "CODER"
description: "Add a read-only command/flag to print the Verify Steps section in stdout."
---
## Summary


## Scope


## Plan

1) Add a read-only shortcut command to print Verify Steps to stdout: `agentplane task verify-show <task-id>`.
2) Implement as an alias to `task doc show --section "Verify Steps"`.
3) Add a CLI test for the new command.
4) Run bun run test:cli:core.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T17:37:44.753Z — VERIFY — ok

By: CODER

Note: Added task verify-show command to print Verify Steps; covered by bun run test:cli:core.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Scope

Expose Verify Steps for verifiers via a single, obvious CLI command.

### Checks

- `agentplane task verify-show <id>` prints the Verify Steps section content to stdout.

### Evidence / Commands

- bun run test:cli:core

### Pass criteria

- Command works and is covered by a unit/integration test.
