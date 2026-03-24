---
id: "202603241418-T7997M"
title: "Stabilize process-supervision trace and timeout fast tests"
result_summary: "packages/agentplane/src/runner/process-supervision.test.ts is now stable under the fast pre-push suite again."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T14:19:05.849Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T14:21:15.487Z"
  updated_by: "CODER"
  note: "ok: packages/agentplane/src/runner/process-supervision.test.ts passes after stabilizing the trace timing window and the timeout signal expectation."
commit:
  hash: "93dcc4b87646d95161b5324b5982d305c63da6be"
  message: "✅ T7997M code: done"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the process-supervision fast-test failures, stabilize the trace and timeout behavior with the smallest viable fix, and retry the blocked push once the focused suite is green."
  -
    author: "CODER"
    body: "Verified: stabilized the process-supervision fast tests by widening the trace timing window and by making the wall-timeout assertion accept either SIGTERM or SIGKILL once force-kill escalation has been recorded."
events:
  -
    type: "status"
    at: "2026-03-24T14:19:17.908Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the process-supervision fast-test failures, stabilize the trace and timeout behavior with the smallest viable fix, and retry the blocked push once the focused suite is green."
  -
    type: "verify"
    at: "2026-03-24T14:21:15.487Z"
    author: "CODER"
    state: "ok"
    note: "ok: packages/agentplane/src/runner/process-supervision.test.ts passes after stabilizing the trace timing window and the timeout signal expectation."
  -
    type: "status"
    at: "2026-03-24T14:21:45.784Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: stabilized the process-supervision fast tests by widening the trace timing window and by making the wall-timeout assertion accept either SIGTERM or SIGKILL once force-kill escalation has been recorded."
doc_version: 3
doc_updated_at: "2026-03-24T14:21:45.785Z"
doc_updated_by: "CODER"
description: "Fix the fast-CI failures in packages/agentplane/src/runner/process-supervision.test.ts so pre-push passes again. Current failures are the raw trace stream not being visible early enough and a wall-timeout expectation assuming SIGKILL when the process can still exit on SIGTERM during escalation."
sections:
  Summary: |-
    Stabilize process-supervision trace and timeout fast tests
    
    Fix the fast-CI failures in packages/agentplane/src/runner/process-supervision.test.ts so pre-push passes again. Current failures are the raw trace stream not being visible early enough and a wall-timeout expectation assuming SIGKILL when the process can still exit on SIGTERM during escalation.
  Scope: |-
    - In scope: Fix the fast-CI failures in packages/agentplane/src/runner/process-supervision.test.ts so pre-push passes again. Current failures are the raw trace stream not being visible early enough and a wall-timeout expectation assuming SIGKILL when the process can still exit on SIGTERM during escalation.
    - Out of scope: unrelated refactors not required for "Stabilize process-supervision trace and timeout fast tests".
  Plan: |-
    1. Reproduce the two failing process-supervision fast tests locally.
    2. Fix the trace-stream visibility race and the over-strict wall-timeout signal expectation with the smallest coherent diff.
    3. Re-run the focused test file and then retry git push origin main.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/runner/process-supervision.test.ts and confirm the file passes.
    2. Re-run git push origin main and confirm the pre-push fast suite no longer fails on process-supervision.
    3. Confirm the working tree is clean after the push attempt.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T14:21:15.487Z — VERIFY — ok
    
    By: CODER
    
    Note: ok: packages/agentplane/src/runner/process-supervision.test.ts passes after stabilizing the trace timing window and the timeout signal expectation.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T14:21:14.662Z, excerpt_hash=sha256:ef873cebe70afccd951e0375b80e88ed34a10cecaf7cfeeb945206f235e69022
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    1. The partial-trace failure was a timing race in the test: the child could still be starting while the assertion only waited 500ms, and a failure there also explained the later ENOENT during cleanup.
    2. The wall-timeout test assumed SIGKILL, but with zero grace the process can still exit on SIGTERM before the force-kill lands; the test now asserts the escalation bookkeeping and accepts either terminal signal.
id_source: "generated"
---
## Summary

Stabilize process-supervision trace and timeout fast tests

Fix the fast-CI failures in packages/agentplane/src/runner/process-supervision.test.ts so pre-push passes again. Current failures are the raw trace stream not being visible early enough and a wall-timeout expectation assuming SIGKILL when the process can still exit on SIGTERM during escalation.

## Scope

- In scope: Fix the fast-CI failures in packages/agentplane/src/runner/process-supervision.test.ts so pre-push passes again. Current failures are the raw trace stream not being visible early enough and a wall-timeout expectation assuming SIGKILL when the process can still exit on SIGTERM during escalation.
- Out of scope: unrelated refactors not required for "Stabilize process-supervision trace and timeout fast tests".

## Plan

1. Reproduce the two failing process-supervision fast tests locally.
2. Fix the trace-stream visibility race and the over-strict wall-timeout signal expectation with the smallest coherent diff.
3. Re-run the focused test file and then retry git push origin main.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/runner/process-supervision.test.ts and confirm the file passes.
2. Re-run git push origin main and confirm the pre-push fast suite no longer fails on process-supervision.
3. Confirm the working tree is clean after the push attempt.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T14:21:15.487Z — VERIFY — ok

By: CODER

Note: ok: packages/agentplane/src/runner/process-supervision.test.ts passes after stabilizing the trace timing window and the timeout signal expectation.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T14:21:14.662Z, excerpt_hash=sha256:ef873cebe70afccd951e0375b80e88ed34a10cecaf7cfeeb945206f235e69022

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. The partial-trace failure was a timing race in the test: the child could still be starting while the assertion only waited 500ms, and a failure there also explained the later ENOENT during cleanup.
2. The wall-timeout test assumed SIGKILL, but with zero grace the process can still exit on SIGTERM before the force-kill lands; the test now asserts the escalation bookkeeping and accepts either terminal signal.
