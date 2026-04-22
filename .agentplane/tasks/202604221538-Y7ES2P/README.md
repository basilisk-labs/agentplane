---
id: "202604221538-Y7ES2P"
title: "Define prompt module domain contracts"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "code"
  - "prompt-assembly"
  - "v0.4"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T15:38:11.036Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-22T15:38:10.836Z"
doc_updated_by: "PLANNER"
description: "Add v0.4 domain types for prompt modules, module ownership, surfaces, targets, slots, mutability, load conditions, merge policy, and provenance."
sections:
  Summary: |-
    Define prompt module domain contracts
    
    Add v0.4 domain types for prompt modules, module ownership, surfaces, targets, slots, mutability, load conditions, merge policy, and provenance.
  Scope: |-
    - In scope: Add v0.4 domain types for prompt modules, module ownership, surfaces, targets, slots, mutability, load conditions, merge policy, and provenance.
    - Out of scope: unrelated refactors not required for "Define prompt module domain contracts".
  Plan: |-
    Goal: Define prompt module domain contracts
    
    Plan:
    1. Inspect the current implementation and tests around this scope.
    2. Make the smallest implementation change that satisfies the task contract.
    3. Add or update focused tests and fixtures for the changed behavior.
    4. Update docs or generated schemas only when the code-facing contract changes.
    
    Acceptance:
    - Module contracts cover gateway, policy, agent, runner, validator, and template surfaces with typed ids and provenance.
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

Define prompt module domain contracts

Add v0.4 domain types for prompt modules, module ownership, surfaces, targets, slots, mutability, load conditions, merge policy, and provenance.

## Scope

- In scope: Add v0.4 domain types for prompt modules, module ownership, surfaces, targets, slots, mutability, load conditions, merge policy, and provenance.
- Out of scope: unrelated refactors not required for "Define prompt module domain contracts".

## Plan

Goal: Define prompt module domain contracts

Plan:
1. Inspect the current implementation and tests around this scope.
2. Make the smallest implementation change that satisfies the task contract.
3. Add or update focused tests and fixtures for the changed behavior.
4. Update docs or generated schemas only when the code-facing contract changes.

Acceptance:
- Module contracts cover gateway, policy, agent, runner, validator, and template surfaces with typed ids and provenance.
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
