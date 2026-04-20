---
id: "202604191640-PEYP4Q"
title: "Use backend registry dispatch instead of task backend switches"
result_summary: "Replaced backend id conditionals in task backend loading with a typed registry of backend loader functions while preserving local fallback behavior."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T08:41:54.136Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T08:47:57.758Z"
  updated_by: "CODER"
  note: "Verified backend loader registry dispatch: task-backend.load/shared focused tests passed (20 tests), agentplane typecheck passed, lint:core passed, prettier check passed, and framework:dev:bootstrap completed."
commit:
  hash: "31b8aa520d13f9855b8fba1e96dc45b0db58f90e"
  message: "♻️ PEYP4Q backend: register task backend loaders"
comments:
  -
    author: "CODER"
    body: "Start: replace task backend kind dispatch with a typed loader registry."
  -
    author: "CODER"
    body: "Verified: task-backend.load/shared focused tests passed (20 tests), typecheck passed, lint:core passed, prettier check passed, and framework:dev:bootstrap completed."
events:
  -
    type: "status"
    at: "2026-04-20T08:41:56.270Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace task backend kind dispatch with a typed loader registry."
  -
    type: "verify"
    at: "2026-04-20T08:47:57.758Z"
    author: "CODER"
    state: "ok"
    note: "Verified backend loader registry dispatch: task-backend.load/shared focused tests passed (20 tests), agentplane typecheck passed, lint:core passed, prettier check passed, and framework:dev:bootstrap completed."
  -
    type: "status"
    at: "2026-04-20T08:48:39.645Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: task-backend.load/shared focused tests passed (20 tests), typecheck passed, lint:core passed, prettier check passed, and framework:dev:bootstrap completed."
doc_version: 3
doc_updated_at: "2026-04-20T08:48:39.646Z"
doc_updated_by: "CODER"
description: "Epic C′ and B′. Replace task backend switch statements with registry-driven dispatch."
sections:
  Summary: |-
    Use backend registry dispatch instead of task backend switches
    
    Epic C′ and B′. Replace task backend switch statements with registry-driven dispatch.
  Scope: |-
    - In scope: Epic C′ and B′. Replace task backend switch statements with registry-driven dispatch.
    - Out of scope: unrelated refactors not required for "Use backend registry dispatch instead of task backend switches".
  Plan: "1. Replace the backendId conditional in backends/task-backend/load.ts with a typed backend loader registry. 2. Keep local as the default/fallback backend and redmine as a registry entry that loads dotenv and constructs its cache. 3. Run task-backend load/shared focused tests plus typecheck, lint:core, prettier check, and framework bootstrap before committing."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T08:47:57.758Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified backend loader registry dispatch: task-backend.load/shared focused tests passed (20 tests), agentplane typecheck passed, lint:core passed, prettier check passed, and framework:dev:bootstrap completed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T08:41:56.297Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Use backend registry dispatch instead of task backend switches

Epic C′ and B′. Replace task backend switch statements with registry-driven dispatch.

## Scope

- In scope: Epic C′ and B′. Replace task backend switch statements with registry-driven dispatch.
- Out of scope: unrelated refactors not required for "Use backend registry dispatch instead of task backend switches".

## Plan

1. Replace the backendId conditional in backends/task-backend/load.ts with a typed backend loader registry. 2. Keep local as the default/fallback backend and redmine as a registry entry that loads dotenv and constructs its cache. 3. Run task-backend load/shared focused tests plus typecheck, lint:core, prettier check, and framework bootstrap before committing.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T08:47:57.758Z — VERIFY — ok

By: CODER

Note: Verified backend loader registry dispatch: task-backend.load/shared focused tests passed (20 tests), agentplane typecheck passed, lint:core passed, prettier check passed, and framework:dev:bootstrap completed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T08:41:56.297Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
