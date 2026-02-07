---
id: "202602071657-R01QJY"
title: "Tests: Plan approve + start gates for Verify Steps"
status: "DONE"
priority: "high"
owner: "TESTER"
depends_on:
  - "202602071657-X6KPJS"
  - "202602071657-8QZ0S3"
tags:
  - "code"
  - "testing"
  - "cli"
verify:
  - "bun run test:agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T18:27:40.640Z"
  updated_by: "USER"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T18:30:04.476Z"
  updated_by: "TESTER"
  note: "CLI gate tests added"
commit:
  hash: "6f6f28ff941719a2f5694d628b8145dc6392a295"
  message: "✅ R01QJY testing: cover Verify Steps gates"
comments:
  -
    author: "TESTER"
    body: "Start: add CLI tests for Verify Steps gating on plan approve and start."
  -
    author: "TESTER"
    body: "Verified: Added lifecycle tests for plan approve/start Verify Steps gates; bun run test:cli:core and bun run lint passed."
doc_version: 2
doc_updated_at: "2026-02-07T18:30:08.761Z"
doc_updated_by: "TESTER"
description: "Add CLI lifecycle tests for approve/start blocking when Verify Steps is empty for verify-required tasks."
---
## Summary

Add CLI lifecycle tests to enforce Verify Steps gates on plan approval and start (when plan approval is disabled).

## Scope

- packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts

## Plan

1) Add CLI tests for plan approve Verify Steps gate.\n2) Add CLI tests for start Verify Steps gate when require_plan=false.\n3) Run bun run test:cli:core.

## Risks


## Verify Steps

### Checks
1) `task plan approve` fails with E_VALIDATION when a verify-required task has missing/empty Verify Steps.
2) `task plan approve` succeeds once Verify Steps is filled.
3) When `agents.approvals.require_plan=false`, `start` fails with E_VALIDATION until Verify Steps is filled.

### Evidence / Commands
- bun run test:cli:core

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T18:30:04.476Z — VERIFY — ok

By: TESTER

Note: CLI gate tests added

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-07T18:27:44.534Z, excerpt_hash=sha256:2ef52d759804e4a67f23bd05b844cab5927a1a7d1553bc143192dafae3751c31

Details:

bun run test:cli:core (pass); bun run lint (pass)

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the test commit for this task.
