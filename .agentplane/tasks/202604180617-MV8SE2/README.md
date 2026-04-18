---
id: "202604180617-MV8SE2"
title: "Introduce command-layer backend capability helpers"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "backend"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-18T06:18:22.343Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-18T06:39:23.410Z"
  updated_by: "CODER"
  note: "Backend capability facade now drives local-task-store routing in shared task command paths; focused and full fast-suite verification passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add a command/shared backend capability facade so task-store and task-mutation helpers stop branching directly on backendId and local backend type checks."
events:
  -
    type: "status"
    at: "2026-04-18T06:18:30.489Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a command/shared backend capability facade so task-store and task-mutation helpers stop branching directly on backendId and local backend type checks."
  -
    type: "verify"
    at: "2026-04-18T06:39:23.410Z"
    author: "CODER"
    state: "ok"
    note: "Backend capability facade now drives local-task-store routing in shared task command paths; focused and full fast-suite verification passed."
doc_version: 3
doc_updated_at: "2026-04-18T06:39:23.422Z"
doc_updated_by: "CODER"
description: "Add a command/shared capability facade over task backend traits so command services stop branching on backendId/local-backend checks directly."
sections:
  Summary: |-
    Introduce command-layer backend capability helpers
    
    Add a command/shared capability facade over task backend traits so command services stop branching on backendId/local-backend checks directly.
  Scope: |-
    - In scope: Add a command/shared capability facade over task backend traits so command services stop branching on backendId/local-backend checks directly.
    - Out of scope: unrelated refactors not required for "Introduce command-layer backend capability helpers".
  Plan: "1. Introduce command/shared backend capability helpers that expose task-readme, local-store, projection-refresh, and snapshot-export decisions without direct backendId/local-backend checks. 2. Migrate the shared task storage and mutation helpers onto that facade while preserving behavior. 3. Verify with lint:core, test:fast, and focused backend/task command review for removed backendId branching."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-18T06:39:23.410Z — VERIFY — ok
    
    By: CODER
    
    Note: Backend capability facade now drives local-task-store routing in shared task command paths; focused and full fast-suite verification passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-18T06:18:30.498Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Introduce command-layer backend capability helpers

Add a command/shared capability facade over task backend traits so command services stop branching on backendId/local-backend checks directly.

## Scope

- In scope: Add a command/shared capability facade over task backend traits so command services stop branching on backendId/local-backend checks directly.
- Out of scope: unrelated refactors not required for "Introduce command-layer backend capability helpers".

## Plan

1. Introduce command/shared backend capability helpers that expose task-readme, local-store, projection-refresh, and snapshot-export decisions without direct backendId/local-backend checks. 2. Migrate the shared task storage and mutation helpers onto that facade while preserving behavior. 3. Verify with lint:core, test:fast, and focused backend/task command review for removed backendId branching.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-18T06:39:23.410Z — VERIFY — ok

By: CODER

Note: Backend capability facade now drives local-task-store routing in shared task command paths; focused and full fast-suite verification passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-18T06:18:30.498Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
