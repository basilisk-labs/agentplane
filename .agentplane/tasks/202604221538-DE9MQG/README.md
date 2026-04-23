---
id: "202604221538-DE9MQG"
title: "Extend recipe manifest for prompt modules"
result_summary: "No-op closure recorded."
risk_level: "low"
breaking: false
status: "DONE"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604221538-P6WRV2"
  - "202604221538-RJMG6E"
  - "202604221538-Y7ES2P"
tags:
  - "code"
  - "prompt-assembly"
  - "recipes"
  - "schemas"
  - "v0.4"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T15:38:30.238Z"
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
    at: "2026-04-23T17:54:37.946Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DONE"
    note: |-
      Verified: no implementation changes were required; closure is recorded as no-op bookkeeping.
      
      Note: Deferred beyond the active 0.3 foundation stabilization line; removed from the active board during backlog realignment before deeper prompt-assembly, recipe, and runner work resumes.
doc_version: 3
doc_updated_at: "2026-04-23T17:54:37.946Z"
doc_updated_by: "ORCHESTRATOR"
description: "Extend recipe manifest parsing and schemas with modules, mutations, bindings, validators, templates, and compatibility metadata for v0.4 prompt assembly."
sections:
  Summary: |-
    Extend recipe manifest for prompt modules
    
    Extend recipe manifest parsing and schemas with modules, mutations, bindings, validators, templates, and compatibility metadata for v0.4 prompt assembly.
  Scope: |-
    - In scope: Extend recipe manifest parsing and schemas with modules, mutations, bindings, validators, templates, and compatibility metadata for v0.4 prompt assembly.
    - Out of scope: unrelated refactors not required for "Extend recipe manifest for prompt modules".
  Plan: |-
    Goal: Extend recipe manifest for prompt modules
    
    Plan:
    1. Inspect the current implementation and tests around this scope.
    2. Make the smallest implementation change that satisfies the task contract.
    3. Add or update focused tests and fixtures for the changed behavior.
    4. Update docs or generated schemas only when the code-facing contract changes.
    
    Acceptance:
    - Recipe manifests can declare module assets and mutations without breaking existing project_overlay recipes.
    - Existing public behavior outside this scope is preserved.
    - Verification evidence is recorded before finish.
    
    Rollback Plan:
    - Revert this task commit and rerun the focused verification commands.
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

Extend recipe manifest for prompt modules

Extend recipe manifest parsing and schemas with modules, mutations, bindings, validators, templates, and compatibility metadata for v0.4 prompt assembly.

## Scope

- In scope: Extend recipe manifest parsing and schemas with modules, mutations, bindings, validators, templates, and compatibility metadata for v0.4 prompt assembly.
- Out of scope: unrelated refactors not required for "Extend recipe manifest for prompt modules".

## Plan

Goal: Extend recipe manifest for prompt modules

Plan:
1. Inspect the current implementation and tests around this scope.
2. Make the smallest implementation change that satisfies the task contract.
3. Add or update focused tests and fixtures for the changed behavior.
4. Update docs or generated schemas only when the code-facing contract changes.

Acceptance:
- Recipe manifests can declare module assets and mutations without breaking existing project_overlay recipes.
- Existing public behavior outside this scope is preserved.
- Verification evidence is recorded before finish.

Rollback Plan:
- Revert this task commit and rerun the focused verification commands.

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
