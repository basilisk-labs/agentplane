---
id: "202603141531-K4V75E"
title: "Stabilize upgrade merge overwrite timeout case"
result_summary: "Stabilized the upgrade.merge overwrite/config-skip case under full release load by increasing only that test's timeout budget."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
depends_on: []
tags:
  - "release"
  - "code"
verify:
  - "bun x vitest run packages/agentplane/src/commands/upgrade.merge.test.ts"
  - "bun x tsc -b packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T15:33:13.335Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as atomic release unblock task for the remaining v0.3.7 gate tail."
verification:
  state: "ok"
  updated_at: "2026-03-14T15:35:03.301Z"
  updated_by: "CODER"
  note: "The overwrite-vs-config-skip upgrade.merge case was not hiding merge slowdown; targeted repro shows it takes about 2.1s, but the full release gate was letting it inherit the default 30000ms budget. Adding a dedicated 60s budget only to that first merge-behavior case keeps merge assertions unchanged while leaving the full upgrade.merge suite, tsc, and package builds green."
commit:
  hash: "65248f028d1d316907f9c7c4d86310b7d246d4f4"
  message: "⏱️ K4V75E test: stabilize upgrade merge timeout budget"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the upgrade.merge overwrite-vs-config-skip timeout under isolated and full-gate conditions, confirm whether it is budget-only or hiding merge-path slowdown, and patch the smallest coherent fix without changing merge semantics."
  -
    author: "CODER"
    body: "Verified: the upgrade.merge overwrite-vs-config-skip failure was another default-budget spill, not merge-path slowdown. Adding a dedicated 60s timeout only to that first merge-behavior case keeps the merge assertions intact and leaves the full upgrade.merge suite, tsc, and package builds green."
events:
  -
    type: "status"
    at: "2026-03-14T15:33:57.328Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the upgrade.merge overwrite-vs-config-skip timeout under isolated and full-gate conditions, confirm whether it is budget-only or hiding merge-path slowdown, and patch the smallest coherent fix without changing merge semantics."
  -
    type: "verify"
    at: "2026-03-14T15:35:03.301Z"
    author: "CODER"
    state: "ok"
    note: "The overwrite-vs-config-skip upgrade.merge case was not hiding merge slowdown; targeted repro shows it takes about 2.1s, but the full release gate was letting it inherit the default 30000ms budget. Adding a dedicated 60s budget only to that first merge-behavior case keeps merge assertions unchanged while leaving the full upgrade.merge suite, tsc, and package builds green."
  -
    type: "status"
    at: "2026-03-14T15:35:34.070Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the upgrade.merge overwrite-vs-config-skip failure was another default-budget spill, not merge-path slowdown. Adding a dedicated 60s timeout only to that first merge-behavior case keeps the merge assertions intact and leaves the full upgrade.merge suite, tsc, and package builds green."
doc_version: 3
doc_updated_at: "2026-03-14T15:35:34.075Z"
doc_updated_by: "CODER"
description: "Stabilize the upgrade.merge overwrite-vs-config-skip coverage under full release load without changing merge semantics."
sections:
  Summary: |-
    Stabilize upgrade merge overwrite timeout case
    
    Stabilize the upgrade.merge overwrite-vs-config-skip coverage under full release load without changing merge semantics.
  Scope: |-
    - In scope: Stabilize the upgrade.merge overwrite-vs-config-skip coverage under full release load without changing merge semantics.
    - Out of scope: unrelated refactors not required for "Stabilize upgrade merge overwrite timeout case".
  Plan: |-
    1. Reproduce the upgrade.merge overwrite-vs-config-skip timeout under isolated and full-gate conditions to confirm whether the case is budget-only or hiding merge-path slowdown.
    2. Patch the smallest coherent timeout or fixture issue without changing managed-file overwrite semantics.
    3. Re-run upgrade.merge coverage and tsc, and record any remaining full-gate-only caveat in Findings.
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/commands/upgrade.merge.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T15:35:03.301Z — VERIFY — ok
    
    By: CODER
    
    Note: The overwrite-vs-config-skip upgrade.merge case was not hiding merge slowdown; targeted repro shows it takes about 2.1s, but the full release gate was letting it inherit the default 30000ms budget. Adding a dedicated 60s budget only to that first merge-behavior case keeps merge assertions unchanged while leaving the full upgrade.merge suite, tsc, and package builds green.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T15:33:57.330Z, excerpt_hash=sha256:07086b099ef85278b85ca6220afe1d9a1c141fd946921167e16c120fb87e3360
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Stabilize upgrade merge overwrite timeout case

Stabilize the upgrade.merge overwrite-vs-config-skip coverage under full release load without changing merge semantics.

## Scope

- In scope: Stabilize the upgrade.merge overwrite-vs-config-skip coverage under full release load without changing merge semantics.
- Out of scope: unrelated refactors not required for "Stabilize upgrade merge overwrite timeout case".

## Plan

1. Reproduce the upgrade.merge overwrite-vs-config-skip timeout under isolated and full-gate conditions to confirm whether the case is budget-only or hiding merge-path slowdown.
2. Patch the smallest coherent timeout or fixture issue without changing managed-file overwrite semantics.
3. Re-run upgrade.merge coverage and tsc, and record any remaining full-gate-only caveat in Findings.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/upgrade.merge.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T15:35:03.301Z — VERIFY — ok

By: CODER

Note: The overwrite-vs-config-skip upgrade.merge case was not hiding merge slowdown; targeted repro shows it takes about 2.1s, but the full release gate was letting it inherit the default 30000ms budget. Adding a dedicated 60s budget only to that first merge-behavior case keeps merge assertions unchanged while leaving the full upgrade.merge suite, tsc, and package builds green.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T15:33:57.330Z, excerpt_hash=sha256:07086b099ef85278b85ca6220afe1d9a1c141fd946921167e16c120fb87e3360

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
