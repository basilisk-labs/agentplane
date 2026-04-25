---
id: "202604251748-8CH6NP"
title: "Refactor task intake resolve helpers"
result_summary: "runtime/task-intake/resolve.ts now acts as a small facade over focused normalize/materialize helpers, dropped below hotspot threshold, and task-intake resolution semantics remained green under focused and global checks."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-25T17:59:40.215Z"
  updated_by: "CODER"
  note: "Split runtime/task-intake/resolve.ts into resolve-normalize.ts and resolve-materialize.ts, kept the public factories stable, reduced resolve.ts to 151 lines, and passed focused task-intake tests plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks."
commit:
  hash: "3e94a141fd0d7899793a16beced90c5314a7fc9e"
  message: "♻️ 8CH6NP task: split task intake resolve helpers"
comments:
  -
    author: "CODER"
    body: "Start: Extract task-intake normalization and materialization helpers from runtime/task-intake/resolve.ts into focused sibling modules while preserving public factory APIs and task graph semantics."
  -
    author: "CODER"
    body: "Verified: split task-intake resolve normalization and materialization helpers without changing public factories or task graph behavior; full validation suite passed."
events:
  -
    type: "status"
    at: "2026-04-25T17:49:00.308Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extract task-intake normalization and materialization helpers from runtime/task-intake/resolve.ts into focused sibling modules while preserving public factory APIs and task graph semantics."
  -
    type: "verify"
    at: "2026-04-25T17:59:40.215Z"
    author: "CODER"
    state: "ok"
    note: "Split runtime/task-intake/resolve.ts into resolve-normalize.ts and resolve-materialize.ts, kept the public factories stable, reduced resolve.ts to 151 lines, and passed focused task-intake tests plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks."
  -
    type: "status"
    at: "2026-04-25T17:59:49.211Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: split task-intake resolve normalization and materialization helpers without changing public factories or task graph behavior; full validation suite passed."
doc_version: 3
doc_updated_at: "2026-04-25T17:59:49.213Z"
doc_updated_by: "CODER"
description: "Extract task-intake normalization and materialization helpers from runtime/task-intake/resolve.ts into focused sibling modules while preserving public factories and task graph semantics."
sections:
  Summary: |-
    Refactor task intake resolve helpers
    
    Extract task-intake normalization and materialization helpers from runtime/task-intake/resolve.ts into focused sibling modules while preserving public factories and task graph semantics.
  Scope: |-
    - In scope: Extract task-intake normalization and materialization helpers from runtime/task-intake/resolve.ts into focused sibling modules while preserving public factories and task graph semantics.
    - Out of scope: unrelated refactors not required for "Refactor task intake resolve helpers".
  Plan: "1. Split runtime/task-intake/resolve.ts into focused sibling helpers for normalization and materialization while keeping the exported factories in resolve.ts stable. 2. Preserve task-intake semantics for clarification questions, draft normalization, task-id allocation, and README materialization paths. 3. Run focused task-intake tests plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-25T17:59:40.215Z — VERIFY — ok
    
    By: CODER
    
    Note: Split runtime/task-intake/resolve.ts into resolve-normalize.ts and resolve-materialize.ts, kept the public factories stable, reduced resolve.ts to 151 lines, and passed focused task-intake tests plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T17:49:00.322Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Refactor task intake resolve helpers

Extract task-intake normalization and materialization helpers from runtime/task-intake/resolve.ts into focused sibling modules while preserving public factories and task graph semantics.

## Scope

- In scope: Extract task-intake normalization and materialization helpers from runtime/task-intake/resolve.ts into focused sibling modules while preserving public factories and task graph semantics.
- Out of scope: unrelated refactors not required for "Refactor task intake resolve helpers".

## Plan

1. Split runtime/task-intake/resolve.ts into focused sibling helpers for normalization and materialization while keeping the exported factories in resolve.ts stable. 2. Preserve task-intake semantics for clarification questions, draft normalization, task-id allocation, and README materialization paths. 3. Run focused task-intake tests plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-25T17:59:40.215Z — VERIFY — ok

By: CODER

Note: Split runtime/task-intake/resolve.ts into resolve-normalize.ts and resolve-materialize.ts, kept the public factories stable, reduced resolve.ts to 151 lines, and passed focused task-intake tests plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T17:49:00.322Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
