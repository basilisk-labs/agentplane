---
id: "202602071657-QF5NDD"
title: "Tests: task scaffold includes Verify Steps + Verification templates"
status: "DONE"
priority: "med"
owner: "TESTER"
depends_on:
  - "202602071657-XK9Q8X"
tags:
  - "code"
  - "testing"
  - "tasks"
verify:
  - "bun run test:agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T18:31:52.706Z"
  updated_by: "USER"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T18:33:21.469Z"
  updated_by: "TESTER"
  note: "Scaffold template assertions added"
commit:
  hash: "933c4cf42de042ea228b78c84de888f211536077"
  message: "✅ QF5NDD testing: assert scaffold Verify Steps template"
comments:
  -
    author: "TESTER"
    body: "Start: extend scaffold tests to assert Verify Steps + Verification templates are present."
  -
    author: "TESTER"
    body: "Verified: task scaffold test now asserts Verify Steps placeholder and Verification markers; bun run test:cli:core and bun run lint passed."
doc_version: 2
doc_updated_at: "2026-02-07T18:33:26.022Z"
doc_updated_by: "TESTER"
description: "Add tests verifying scaffold output contains both sections and placeholder marker."
---
## Summary

Add tests to ensure `agentplane task scaffold` includes `## Verify Steps` (with placeholder marker) and `## Verification` (with result markers).

## Scope


## Plan

1) Extend existing scaffold test to assert Verify Steps section + placeholder marker.\n2) Assert Verification section exists and includes BEGIN/END markers.\n3) Run bun run test:cli:core.

## Risks

- Scaffold template changes could require updating snapshots/assertions.

## Verify Steps

### Evidence / Commands
- bun run test:cli:core

### Pass criteria
- run-cli.core.tasks.test.ts assertions pass.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T18:33:21.469Z — VERIFY — ok

By: TESTER

Note: Scaffold template assertions added

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-07T18:31:58.348Z, excerpt_hash=sha256:e144927fa4ca2de771fdc9088d8bdbdd2b7c7d6a063deb4c08919caa480d6c52

Details:

bun run test:cli:core (pass); bun run lint (pass)

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the test commit for this task.
