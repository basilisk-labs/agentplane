---
id: "202602071657-AJX423"
title: "Tests: spike derive creates depends_on and shows deps"
status: "DONE"
priority: "med"
owner: "TESTER"
depends_on:
  - "202602071657-T6K9D6"
tags:
  - "code"
  - "testing"
  - "tasks"
verify:
  - "bun run test:agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T18:34:41.064Z"
  updated_by: "USER"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T18:36:39.275Z"
  updated_by: "TESTER"
  note: "Derive deps tests added"
commit:
  hash: "2e9e8564c5e56ad542309d1fcef501fca9a974b0"
  message: "✅ AJX423 testing: cover task derive deps"
comments:
  -
    author: "TESTER"
    body: "Start: add tests for task derive depends_on and task list deps summary."
  -
    author: "TESTER"
    body: "Verified: Added task derive tests for depends_on and deps=wait:<spike-id> in task list; bun run test:cli:core and bun run lint passed."
doc_version: 2
doc_updated_at: "2026-02-07T18:36:44.825Z"
doc_updated_by: "TESTER"
description: "Add tests for task derive: depends_on includes spike id and list shows deps state."
---
## Summary

Add tests for `agentplane task derive`: new task depends_on includes spike id, and `task list` shows deps=wait:<spike-id> until spike is DONE.

## Scope


## Plan

1) Add CLI test: task derive creates depends_on=[spikeId].\n2) Assert task list prints deps=wait:<spikeId> until spike is DONE.\n3) Run bun run test:cli:core.

## Risks

- Assertions may be brittle if task list formatting changes.

## Verify Steps

### Evidence / Commands
- bun run test:cli:core

### Pass criteria
- Derive test passes and asserts depends_on and deps summary.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T18:36:39.275Z — VERIFY — ok

By: TESTER

Note: Derive deps tests added

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-07T18:34:47.485Z, excerpt_hash=sha256:07aeab14562ca7e6f6ceabd90ce0451e9726ffdd5a6b4e1d52e4d662f58e5ff3

Details:

bun run test:cli:core (pass); bun run lint (pass)

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the test commit for this task.
