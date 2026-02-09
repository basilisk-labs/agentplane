---
id: "202602091019-F3GHJH"
title: "Fix flaky run-cli.core.boot test timeout"
result_summary: "Boot tests no longer flake under pre-push"
status: "DONE"
priority: "high"
owner: "TESTER"
depends_on: []
tags:
  - "testing"
  - "cli"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T10:20:04.703Z"
  updated_by: "TESTER"
  note: "bunx vitest run packages/agentplane/src/cli/run-cli.core.boot.test.ts"
commit:
  hash: "e65ab11f865898a7bfaf39bb508d7b045aeed4d2"
  message: "✅ F3GHJH tests: increase boot test timeouts"
comments:
  -
    author: "TESTER"
    body: "Start: Fix pre-push flake by increasing timeout in run-cli.core.boot.test.ts; verify with targeted vitest run."
  -
    author: "TESTER"
    body: "Verified: bunx vitest run packages/agentplane/src/cli/run-cli.core.boot.test.ts; increased per-test timeouts to avoid pre-push failures."
events:
  -
    type: "status"
    at: "2026-02-09T10:19:46.140Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix pre-push flake by increasing timeout in run-cli.core.boot.test.ts; verify with targeted vitest run."
  -
    type: "verify"
    at: "2026-02-09T10:20:04.703Z"
    author: "TESTER"
    state: "ok"
    note: "bunx vitest run packages/agentplane/src/cli/run-cli.core.boot.test.ts"
  -
    type: "status"
    at: "2026-02-09T10:21:11.648Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bunx vitest run packages/agentplane/src/cli/run-cli.core.boot.test.ts; increased per-test timeouts to avoid pre-push failures."
doc_version: 2
doc_updated_at: "2026-02-09T10:21:11.648Z"
doc_updated_by: "TESTER"
description: "Pre-push hook intermittently fails due to 5s timeout in run-cli.core.boot.test.ts; increase per-test timeout to avoid release/push failures."
id_source: "generated"
---
## Summary

Raise the timeout for runCli bootstrapping unit tests to avoid flaky failures during pre-push test-full.

## Scope


## Plan

1. Increase per-test timeout for the boot tests (quickstart/role).\n2. Run targeted vitest for the file.\n3. Commit and close the task.

## Risks

- Masking legitimate hangs: mitigated by keeping timeout bounded (20s) and retaining strict mocks that fail if project/config resolution occurs.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T10:20:04.703Z — VERIFY — ok

By: TESTER

Note: bunx vitest run packages/agentplane/src/cli/run-cli.core.boot.test.ts

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T10:19:46.140Z, excerpt_hash=sha256:4e4c4c97cd240dca32df42ca843ff807f845d76c5a4bcda260a02f5ec1642d4f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

Commands:\n- bunx vitest run packages/agentplane/src/cli/run-cli.core.boot.test.ts\n\nPass criteria:\n- Tests pass consistently.
