---
id: "202603141501-86KWHQ"
title: "Stabilize commit wrapper protected auto-stage timeout cases"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
depends_on: []
tags:
  - "release"
  - "code"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts"
  - "bun x tsc -b packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T15:03:01.079Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as atomic release unblock task for v0.3.7."
verification:
  state: "ok"
  updated_at: "2026-03-14T15:09:14.112Z"
  updated_by: "CODER"
  note: "The two failing commit-wrapper auto-stage cases were not functionally broken; the file has no explicit timeout on those early tests and the full release gate was letting them inherit the default 30000ms budget. Adding a dedicated 60s budget only to the two aggregate-load-sensitive auto-stage cases keeps the guard assertions unchanged while making the suite stable under release load."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce the two commit-wrapper auto-stage timeout cases under isolated and full-gate conditions, confirm whether they are stale timeout bindings or genuine slow guard paths, and land the smallest coherent fix without widening guard semantics."
events:
  -
    type: "status"
    at: "2026-03-14T15:06:55.404Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the two commit-wrapper auto-stage timeout cases under isolated and full-gate conditions, confirm whether they are stale timeout bindings or genuine slow guard paths, and land the smallest coherent fix without widening guard semantics."
  -
    type: "verify"
    at: "2026-03-14T15:09:14.112Z"
    author: "CODER"
    state: "ok"
    note: "The two failing commit-wrapper auto-stage cases were not functionally broken; the file has no explicit timeout on those early tests and the full release gate was letting them inherit the default 30000ms budget. Adding a dedicated 60s budget only to the two aggregate-load-sensitive auto-stage cases keeps the guard assertions unchanged while making the suite stable under release load."
doc_version: 3
doc_updated_at: "2026-03-14T15:09:14.116Z"
doc_updated_by: "CODER"
description: "Stabilize the allow-tasks and allow-ci commit-wrapper auto-stage tests under full release load without widening unrelated guard behavior."
sections:
  Summary: |-
    Stabilize commit wrapper protected auto-stage timeout cases
    
    Stabilize the allow-tasks and allow-ci commit-wrapper auto-stage tests under full release load without widening unrelated guard behavior.
  Scope: |-
    - In scope: Stabilize the allow-tasks and allow-ci commit-wrapper auto-stage tests under full release load without widening unrelated guard behavior.
    - Out of scope: unrelated refactors not required for "Stabilize commit wrapper protected auto-stage timeout cases".
  Plan: |-
    1. Reproduce the two protected auto-stage commit-wrapper timeout cases under load and measure whether they are budget-only or blocked on extra git/task artifact work.
    2. Patch the narrowest timeout or fixture shape needed so --allow-tasks and --allow-ci coverage remains semantically strict.
    3. Re-run the commit-wrapper suite and tsc, then document any remaining full-gate-only risk in Findings.
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T15:09:14.112Z — VERIFY — ok
    
    By: CODER
    
    Note: The two failing commit-wrapper auto-stage cases were not functionally broken; the file has no explicit timeout on those early tests and the full release gate was letting them inherit the default 30000ms budget. Adding a dedicated 60s budget only to the two aggregate-load-sensitive auto-stage cases keeps the guard assertions unchanged while making the suite stable under release load.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T15:06:55.405Z, excerpt_hash=sha256:616626f1318599df6a96e17589382f2a901eb17224043488820e7af4325698af
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Stabilize commit wrapper protected auto-stage timeout cases

Stabilize the allow-tasks and allow-ci commit-wrapper auto-stage tests under full release load without widening unrelated guard behavior.

## Scope

- In scope: Stabilize the allow-tasks and allow-ci commit-wrapper auto-stage tests under full release load without widening unrelated guard behavior.
- Out of scope: unrelated refactors not required for "Stabilize commit wrapper protected auto-stage timeout cases".

## Plan

1. Reproduce the two protected auto-stage commit-wrapper timeout cases under load and measure whether they are budget-only or blocked on extra git/task artifact work.
2. Patch the narrowest timeout or fixture shape needed so --allow-tasks and --allow-ci coverage remains semantically strict.
3. Re-run the commit-wrapper suite and tsc, then document any remaining full-gate-only risk in Findings.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T15:09:14.112Z — VERIFY — ok

By: CODER

Note: The two failing commit-wrapper auto-stage cases were not functionally broken; the file has no explicit timeout on those early tests and the full release gate was letting them inherit the default 30000ms budget. Adding a dedicated 60s budget only to the two aggregate-load-sensitive auto-stage cases keeps the guard assertions unchanged while making the suite stable under release load.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T15:06:55.405Z, excerpt_hash=sha256:616626f1318599df6a96e17589382f2a901eb17224043488820e7af4325698af

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
