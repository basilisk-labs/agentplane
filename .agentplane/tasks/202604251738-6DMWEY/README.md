---
id: "202604251738-6DMWEY"
title: "Refactor runner task state helpers"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-25T17:38:48.183Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Extract runner outcome history, projection, and rendering helpers from runner/task-state.ts without changing task README mutation behavior or runner history semantics."
events:
  -
    type: "status"
    at: "2026-04-25T17:38:49.037Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extract runner outcome history, projection, and rendering helpers from runner/task-state.ts without changing task README mutation behavior or runner history semantics."
doc_version: 3
doc_updated_at: "2026-04-25T17:38:49.061Z"
doc_updated_by: "CODER"
description: "Extract runner outcome rendering and projection helpers from runner/task-state.ts into focused modules while preserving task README mutation behavior and runner history semantics."
sections:
  Summary: |-
    Refactor runner task state helpers
    
    Extract runner outcome rendering and projection helpers from runner/task-state.ts into focused modules while preserving task README mutation behavior and runner history semantics.
  Scope: |-
    - In scope: Extract runner outcome rendering and projection helpers from runner/task-state.ts into focused modules while preserving task README mutation behavior and runner history semantics.
    - Out of scope: unrelated refactors not required for "Refactor runner task state helpers".
  Plan: |-
    1. Extract runner outcome history/projection/render helpers from runner/task-state.ts into focused sibling modules while preserving persistRunnerOutcomeToTask behavior.
    2. Keep task README mutation semantics, runner history truncation, and observation-section rendering unchanged.
    3. Run focused runner task-state/result-manifest/custom tests plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks.
    4. Record any remaining runner-task-state follow-up if one helper cluster still remains too large after the first extraction.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Refactor runner task state helpers

Extract runner outcome rendering and projection helpers from runner/task-state.ts into focused modules while preserving task README mutation behavior and runner history semantics.

## Scope

- In scope: Extract runner outcome rendering and projection helpers from runner/task-state.ts into focused modules while preserving task README mutation behavior and runner history semantics.
- Out of scope: unrelated refactors not required for "Refactor runner task state helpers".

## Plan

1. Extract runner outcome history/projection/render helpers from runner/task-state.ts into focused sibling modules while preserving persistRunnerOutcomeToTask behavior.
2. Keep task README mutation semantics, runner history truncation, and observation-section rendering unchanged.
3. Run focused runner task-state/result-manifest/custom tests plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks.
4. Record any remaining runner-task-state follow-up if one helper cluster still remains too large after the first extraction.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
