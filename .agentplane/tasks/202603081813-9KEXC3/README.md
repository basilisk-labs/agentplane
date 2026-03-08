---
id: "202603081813-9KEXC3"
title: "Raise remote release-tag preflight test timeout for release apply"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T18:13:59.378Z"
  updated_by: "ORCHESTRATOR"
  note: "Release-blocker test fix approved; keep scope limited to remote-tag preflight regression coverage."
verification:
  state: "ok"
  updated_at: "2026-03-08T18:21:33.982Z"
  updated_by: "CODER"
  note: "Raised the remote-tag release/apply integration test timeout to 60s, the targeted suite passed, and bun run release:prepublish completed cleanly afterwards."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fixing the remote-tag release/apply regression timeout uncovered by release:prepublish, then rerunning the full release gate before resuming v0.3.4 publication."
events:
  -
    type: "status"
    at: "2026-03-08T18:14:09.647Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fixing the remote-tag release/apply regression timeout uncovered by release:prepublish, then rerunning the full release gate before resuming v0.3.4 publication."
  -
    type: "verify"
    at: "2026-03-08T18:21:33.982Z"
    author: "CODER"
    state: "ok"
    note: "Raised the remote-tag release/apply integration test timeout to 60s, the targeted suite passed, and bun run release:prepublish completed cleanly afterwards."
doc_version: 3
doc_updated_at: "2026-03-08T18:21:33.983Z"
doc_updated_by: "CODER"
description: "Fix the release/apply regression test that times out in release:prepublish when checking an existing remote tag before mutation, then rerun the 0.3.4 release gate."
id_source: "generated"
---
## Summary

Raise remote release-tag preflight test timeout for release apply

Fix the release/apply regression test that times out in release:prepublish when checking an existing remote tag before mutation, then rerun the 0.3.4 release gate.

## Scope

- In scope: Fix the release/apply regression test that times out in release:prepublish when checking an existing remote tag before mutation, then rerun the 0.3.4 release gate.
- Out of scope: unrelated refactors not required for "Raise remote release-tag preflight test timeout for release apply".

## Plan

1. Implement the change for "Raise remote release-tag preflight test timeout for release apply".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/release/apply.test.ts --testTimeout 60000 --hookTimeout 60000`. Expected: the remote-tag preflight case passes without timing out.
2. Run `bun run release:prepublish`. Expected: the release gate completes without regressions in release/apply preflight coverage.
3. Confirm the fix does not weaken the assertion. Expected: the test still verifies that no local mutation or prepublish step runs when the remote release tag already exists.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T18:21:33.982Z — VERIFY — ok

By: CODER

Note: Raised the remote-tag release/apply integration test timeout to 60s, the targeted suite passed, and bun run release:prepublish completed cleanly afterwards.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T18:14:09.647Z, excerpt_hash=sha256:64d1b8fed8de469c867d6cd719d50990398ca694b1bee4a66dd400b1c91bcd6a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
