---
id: "202604170647-AXJYWC"
title: "Split recipes cache from project vendor store"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recipes"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T06:48:40.346Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T07:24:23.337Z"
  updated_by: "TESTER"
  note: "Global cache commands now operate without a project checkout and no longer mutate project-local recipe state. Verified with @agentplaneorg/recipes build, typecheck, and focused recipes CLI/list/help tests."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split global recipes cache from project vendored store paths, readers, and cache-facing commands without pulling in vendoring, registry, or runtime-authority changes from later epics."
events:
  -
    type: "status"
    at: "2026-04-17T06:49:10.496Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split global recipes cache from project vendored store paths, readers, and cache-facing commands without pulling in vendoring, registry, or runtime-authority changes from later epics."
  -
    type: "verify"
    at: "2026-04-17T07:24:23.337Z"
    author: "TESTER"
    state: "ok"
    note: "Global cache commands now operate without a project checkout and no longer mutate project-local recipe state. Verified with @agentplaneorg/recipes build, typecheck, and focused recipes CLI/list/help tests."
doc_version: 3
doc_updated_at: "2026-04-17T07:24:23.342Z"
doc_updated_by: "CODER"
description: "Separate global recipes cache from project vendored recipes so install/list/info stop acting as project-runtime mutations."
sections:
  Summary: |-
    Split recipes cache from project vendor store
    
    Separate global recipes cache from project vendored recipes so install/list/info stop acting as project-runtime mutations.
  Scope: |-
    - In scope: Separate global recipes cache from project vendored recipes so install/list/info stop acting as project-runtime mutations.
    - Out of scope: unrelated refactors not required for "Split recipes cache from project vendor store".
  Plan: "1. Move install/list/info semantics onto the home-cache store only. 2. Split path helpers and readers so project vendored recipes stop sharing cache readers. 3. Verify cache commands no longer mutate project-local recipes state."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T07:24:23.337Z — VERIFY — ok
    
    By: TESTER
    
    Note: Global cache commands now operate without a project checkout and no longer mutate project-local recipe state. Verified with @agentplaneorg/recipes build, typecheck, and focused recipes CLI/list/help tests.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T06:49:10.515Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The recipes package exports are consumed through dist, so changing package-level constants requires a real package build before repo-local runtime and CLI tests see the new cache path semantics.
      Impact: Without rebuilding @agentplaneorg/recipes, targeted tests would continue reading the stale global recipes directory name and report false path failures despite the source changes being correct.
      Resolution: Added @agentplaneorg/recipes build to the verification path for this task before typecheck and targeted vitest coverage, then reran the focused test surface on the rebuilt runtime.
id_source: "generated"
---
## Summary

Split recipes cache from project vendor store

Separate global recipes cache from project vendored recipes so install/list/info stop acting as project-runtime mutations.

## Scope

- In scope: Separate global recipes cache from project vendored recipes so install/list/info stop acting as project-runtime mutations.
- Out of scope: unrelated refactors not required for "Split recipes cache from project vendor store".

## Plan

1. Move install/list/info semantics onto the home-cache store only. 2. Split path helpers and readers so project vendored recipes stop sharing cache readers. 3. Verify cache commands no longer mutate project-local recipes state.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T07:24:23.337Z — VERIFY — ok

By: TESTER

Note: Global cache commands now operate without a project checkout and no longer mutate project-local recipe state. Verified with @agentplaneorg/recipes build, typecheck, and focused recipes CLI/list/help tests.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T06:49:10.515Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The recipes package exports are consumed through dist, so changing package-level constants requires a real package build before repo-local runtime and CLI tests see the new cache path semantics.
  Impact: Without rebuilding @agentplaneorg/recipes, targeted tests would continue reading the stale global recipes directory name and report false path failures despite the source changes being correct.
  Resolution: Added @agentplaneorg/recipes build to the verification path for this task before typecheck and targeted vitest coverage, then reran the focused test surface on the rebuilt runtime.
