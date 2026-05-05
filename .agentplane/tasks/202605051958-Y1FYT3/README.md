---
id: "202605051958-Y1FYT3"
title: "Surface blueprint evidence in task verification"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "code"
  - "rc1"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T19:58:49.654Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T20:44:44.256Z"
  updated_by: "CODER"
  note: "Verify-show blueprint evidence verified: task verify-show appends resolved blueprint route and required evidence without executing blueprint nodes. Checks: task verify-show smoke; typecheck; lint:core; ci:local:fast."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Surfacing resolved blueprint evidence in task verification output while preserving existing task lifecycle semantics."
events:
  -
    type: "status"
    at: "2026-05-05T20:26:00.396Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Surfacing resolved blueprint evidence in task verification output while preserving existing task lifecycle semantics."
  -
    type: "verify"
    at: "2026-05-05T20:44:44.256Z"
    author: "CODER"
    state: "ok"
    note: "Verify-show blueprint evidence verified: task verify-show appends resolved blueprint route and required evidence without executing blueprint nodes. Checks: task verify-show smoke; typecheck; lint:core; ci:local:fast."
doc_version: 3
doc_updated_at: "2026-05-05T20:44:44.278Z"
doc_updated_by: "CODER"
description: "Add resolved blueprint expected evidence to task verify-show and optionally write a task-local blueprint.json snapshot without changing task execution semantics."
sections:
  Summary: |-
    Surface blueprint evidence in task verification
    
    Add resolved blueprint expected evidence to task verify-show and optionally write a task-local blueprint.json snapshot without changing task execution semantics.
  Scope: |-
    - In scope: Add resolved blueprint expected evidence to task verify-show and optionally write a task-local blueprint.json snapshot without changing task execution semantics.
    - Out of scope: unrelated refactors not required for "Surface blueprint evidence in task verification".
  Plan: "Surface resolved blueprint evidence in task verification. Scope: enhance task verify-show with resolved blueprint expected evidence and, if practical within scope, add task-local blueprint.json snapshot generation. Must not execute blueprint nodes or force CI/PR expectations onto non-code tasks. Depends on 202605051957-5WRJZK."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T20:44:44.256Z — VERIFY — ok
    
    By: CODER
    
    Note: Verify-show blueprint evidence verified: task verify-show appends resolved blueprint route and required evidence without executing blueprint nodes. Checks: task verify-show smoke; typecheck; lint:core; ci:local:fast.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T20:26:00.396Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Surface blueprint evidence in task verification

Add resolved blueprint expected evidence to task verify-show and optionally write a task-local blueprint.json snapshot without changing task execution semantics.

## Scope

- In scope: Add resolved blueprint expected evidence to task verify-show and optionally write a task-local blueprint.json snapshot without changing task execution semantics.
- Out of scope: unrelated refactors not required for "Surface blueprint evidence in task verification".

## Plan

Surface resolved blueprint evidence in task verification. Scope: enhance task verify-show with resolved blueprint expected evidence and, if practical within scope, add task-local blueprint.json snapshot generation. Must not execute blueprint nodes or force CI/PR expectations onto non-code tasks. Depends on 202605051957-5WRJZK.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T20:44:44.256Z — VERIFY — ok

By: CODER

Note: Verify-show blueprint evidence verified: task verify-show appends resolved blueprint route and required evidence without executing blueprint nodes. Checks: task verify-show smoke; typecheck; lint:core; ci:local:fast.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T20:26:00.396Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
