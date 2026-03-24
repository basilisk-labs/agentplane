---
id: "202603241429-Q1P5CJ"
title: "Stabilize flaky process supervision trace test under fast CI"
result_summary: "The last pre-push blocker was a CI-only race in process-supervision.test.ts; the test is now deterministic under repeated local runs."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "test"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T14:30:25.173Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T14:32:39.586Z"
  updated_by: "CODER"
  note: "Confirmed the failure was a CI-only race in process-supervision.test.ts. The first trace assertion now has more timing headroom, and the test always awaits the supervised child in a finally block so temp-dir cleanup no longer races pending trace writes."
commit:
  hash: "84955a920b071280f09899b26cad128db8bfd644"
  message: "✅ Q1P5CJ code: done"
comments:
  -
    author: "CODER"
    body: "Start: stabilize the remaining flaky trace-streaming test and then retry the blocked push."
  -
    author: "CODER"
    body: "Verified: stabilized the remaining flaky trace-streaming test by increasing timing headroom and always awaiting the supervised child before temp-dir cleanup. Re-ran the targeted suite five times plus a fresh build."
events:
  -
    type: "status"
    at: "2026-03-24T14:30:42.577Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: stabilize the remaining flaky trace-streaming test and then retry the blocked push."
  -
    type: "verify"
    at: "2026-03-24T14:32:39.586Z"
    author: "CODER"
    state: "ok"
    note: "Confirmed the failure was a CI-only race in process-supervision.test.ts. The first trace assertion now has more timing headroom, and the test always awaits the supervised child in a finally block so temp-dir cleanup no longer races pending trace writes."
  -
    type: "status"
    at: "2026-03-24T14:35:33.618Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: stabilized the remaining flaky trace-streaming test by increasing timing headroom and always awaiting the supervised child before temp-dir cleanup. Re-ran the targeted suite five times plus a fresh build."
doc_version: 3
doc_updated_at: "2026-03-24T14:35:33.621Z"
doc_updated_by: "CODER"
description: "Fix the remaining flaky race in process-supervision.test.ts so the trace-streaming assertion does not intermittently miss early output under fast CI load, and ensure the child process is awaited even when an early assertion fails to avoid temp-dir ENOENT noise."
sections:
  Summary: |-
    Stabilize flaky process supervision trace test under fast CI
    
    Fix the remaining flaky race in process-supervision.test.ts so the trace-streaming assertion does not intermittently miss early output under fast CI load, and ensure the child process is awaited even when an early assertion fails to avoid temp-dir ENOENT noise.
  Scope: |-
    - In scope: Fix the remaining flaky race in process-supervision.test.ts so the trace-streaming assertion does not intermittently miss early output under fast CI load, and ensure the child process is awaited even when an early assertion fails to avoid temp-dir ENOENT noise.
    - Out of scope: unrelated refactors not required for "Stabilize flaky process supervision trace test under fast CI".
  Plan: |-
    1. Reproduce the flaky timing path in process-supervision trace streaming test and identify why the partial trace assertion can observe an empty file under fast CI load.
    2. Make the test deterministic by giving the child process more timing headroom and ensuring the background run is always awaited even if an early assertion fails.
    3. Re-run the targeted Vitest suite and then retry the blocked push.
  Verify Steps: |-
    1. bunx vitest run packages/agentplane/src/runner/process-supervision.test.ts
    2. bun run --filter=agentplane build
    3. Retry git push origin main and confirm origin/main advances to HEAD
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T14:32:39.586Z — VERIFY — ok
    
    By: CODER
    
    Note: Confirmed the failure was a CI-only race in process-supervision.test.ts. The first trace assertion now has more timing headroom, and the test always awaits the supervised child in a finally block so temp-dir cleanup no longer races pending trace writes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T14:30:42.582Z, excerpt_hash=sha256:abeaf32c0898414b3911e05d4ebadd7ee32638ecdf3a8a30924ee14b536ff350
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Stabilize flaky process supervision trace test under fast CI

Fix the remaining flaky race in process-supervision.test.ts so the trace-streaming assertion does not intermittently miss early output under fast CI load, and ensure the child process is awaited even when an early assertion fails to avoid temp-dir ENOENT noise.

## Scope

- In scope: Fix the remaining flaky race in process-supervision.test.ts so the trace-streaming assertion does not intermittently miss early output under fast CI load, and ensure the child process is awaited even when an early assertion fails to avoid temp-dir ENOENT noise.
- Out of scope: unrelated refactors not required for "Stabilize flaky process supervision trace test under fast CI".

## Plan

1. Reproduce the flaky timing path in process-supervision trace streaming test and identify why the partial trace assertion can observe an empty file under fast CI load.
2. Make the test deterministic by giving the child process more timing headroom and ensuring the background run is always awaited even if an early assertion fails.
3. Re-run the targeted Vitest suite and then retry the blocked push.

## Verify Steps

1. bunx vitest run packages/agentplane/src/runner/process-supervision.test.ts
2. bun run --filter=agentplane build
3. Retry git push origin main and confirm origin/main advances to HEAD

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T14:32:39.586Z — VERIFY — ok

By: CODER

Note: Confirmed the failure was a CI-only race in process-supervision.test.ts. The first trace assertion now has more timing headroom, and the test always awaits the supervised child in a finally block so temp-dir cleanup no longer races pending trace writes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T14:30:42.582Z, excerpt_hash=sha256:abeaf32c0898414b3911e05d4ebadd7ee32638ecdf3a8a30924ee14b536ff350

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
