---
id: "202605150544-4PRV43"
title: "Fix issue #3781 snapshot hook rejection"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-15T05:44:24.107Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproducing hook rejection around blueprint resolved-snapshot artifact and implementing deterministic committable policy for normal task lifecycle without override flags."
events:
  -
    type: "status"
    at: "2026-05-15T05:44:50.647Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproducing hook rejection around blueprint resolved-snapshot artifact and implementing deterministic committable policy for normal task lifecycle without override flags."
doc_version: 3
doc_updated_at: "2026-05-15T05:44:50.647Z"
doc_updated_by: "CODER"
description: "Resolve hook/task artifact mismatch when resolved-snapshot.json is generated under blueprint."
sections:
  Summary: |-
    Fix issue #3781 snapshot hook rejection
    
    Resolve hook/task artifact mismatch when resolved-snapshot.json is generated under blueprint.
  Scope: |-
    - In scope: Resolve hook/task artifact mismatch when resolved-snapshot.json is generated under blueprint.
    - Out of scope: unrelated refactors not required for "Fix issue #3781 snapshot hook rejection".
  Plan: "1) Reproduce issue #3781 with current hook/task flow and locate rejection path for blueprint/resolved-snapshot.json. 2) Implement deterministic snapshot policy in commit/hook validation so normal task flow is committable without special overrides. 3) Add/adjust tests for the intended policy and run targeted verification. 4) Document behavior if needed and link evidence to issue context."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix issue #3781 snapshot hook rejection". Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the requested outcome for "Fix issue #3781 snapshot hook rejection". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

Fix issue #3781 snapshot hook rejection

Resolve hook/task artifact mismatch when resolved-snapshot.json is generated under blueprint.

## Scope

- In scope: Resolve hook/task artifact mismatch when resolved-snapshot.json is generated under blueprint.
- Out of scope: unrelated refactors not required for "Fix issue #3781 snapshot hook rejection".

## Plan

1) Reproduce issue #3781 with current hook/task flow and locate rejection path for blueprint/resolved-snapshot.json. 2) Implement deterministic snapshot policy in commit/hook validation so normal task flow is committable without special overrides. 3) Add/adjust tests for the intended policy and run targeted verification. 4) Document behavior if needed and link evidence to issue context.

## Verify Steps

PLANNER fallback scaffold for "Fix issue #3781 snapshot hook rejection". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix issue #3781 snapshot hook rejection". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
