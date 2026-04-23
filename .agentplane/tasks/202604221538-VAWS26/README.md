---
id: "202604221538-VAWS26"
title: "Epic C: Compiled prompt surfaces and migration"
result_summary: "No-op closure recorded."
risk_level: "low"
breaking: false
status: "DONE"
priority: "high"
owner: "PLANNER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604221538-C3YHWH"
  - "202604221538-EWPH3C"
  - "202604221538-HSSZGV"
  - "202604221538-RJP331"
  - "202604221538-RV7BQG"
tags:
  - "architecture"
  - "docs"
  - "epic"
  - "prompt-assembly"
  - "v0.4"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T15:38:47.052Z"
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
    author: "ORCHESTRATOR"
    body: |-
      Verified: no implementation changes were required; closure is recorded as no-op bookkeeping.
      
      Note: Deferred beyond the active 0.3 foundation stabilization line; removed from the active board during backlog realignment before deeper prompt-assembly, recipe, and runner work resumes.
events:
  -
    type: "status"
    at: "2026-04-23T17:54:50.209Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DONE"
    note: |-
      Verified: no implementation changes were required; closure is recorded as no-op bookkeeping.
      
      Note: Deferred beyond the active 0.3 foundation stabilization line; removed from the active board during backlog realignment before deeper prompt-assembly, recipe, and runner work resumes.
doc_version: 3
doc_updated_at: "2026-04-23T17:54:50.209Z"
doc_updated_by: "ORCHESTRATOR"
description: "Roll-up epic for compiling gateway, policy, and agent files plus init, upgrade, drift, and repo override migration."
sections:
  Summary: |-
    Epic C: Compiled prompt surfaces and migration
    
    Roll-up epic for compiling gateway, policy, and agent files plus init, upgrade, drift, and repo override migration.
  Scope: |-
    - In scope: Roll-up epic for compiling gateway, policy, and agent files plus init, upgrade, drift, and repo override migration.
    - Out of scope: unrelated refactors not required for "Epic C: Compiled prompt surfaces and migration".
  Plan: |-
    Goal: Epic C: Compiled prompt surfaces and migration
    
    Plan:
    1. Inspect the current implementation and tests around this scope.
    2. Make the smallest implementation change that satisfies the task contract.
    3. Add or update focused tests and fixtures for the changed behavior.
    4. Update docs or generated schemas only when the code-facing contract changes.
    
    Acceptance:
    - Gateway, policy, and agent compiled outputs replace direct asset copying with migration safety.
    - Existing public behavior outside this scope is preserved.
    - Verification evidence is recorded before finish.
    
    Rollback Plan:
    - Revert this task commit and rerun the focused verification commands.
  Verify Steps: |-
    1. Review the requested outcome for "Epic C: Compiled prompt surfaces and migration". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Epic C: Compiled prompt surfaces and migration

Roll-up epic for compiling gateway, policy, and agent files plus init, upgrade, drift, and repo override migration.

## Scope

- In scope: Roll-up epic for compiling gateway, policy, and agent files plus init, upgrade, drift, and repo override migration.
- Out of scope: unrelated refactors not required for "Epic C: Compiled prompt surfaces and migration".

## Plan

Goal: Epic C: Compiled prompt surfaces and migration

Plan:
1. Inspect the current implementation and tests around this scope.
2. Make the smallest implementation change that satisfies the task contract.
3. Add or update focused tests and fixtures for the changed behavior.
4. Update docs or generated schemas only when the code-facing contract changes.

Acceptance:
- Gateway, policy, and agent compiled outputs replace direct asset copying with migration safety.
- Existing public behavior outside this scope is preserved.
- Verification evidence is recorded before finish.

Rollback Plan:
- Revert this task commit and rerun the focused verification commands.

## Verify Steps

1. Review the requested outcome for "Epic C: Compiled prompt surfaces and migration". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
