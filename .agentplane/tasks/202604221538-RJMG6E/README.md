---
id: "202604221538-RJMG6E"
title: "Define prompt mutation and binding contracts"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604221538-Y7ES2P"
tags:
  - "architecture"
  - "code"
  - "prompt-assembly"
  - "recipes"
  - "v0.4"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T15:38:12.485Z"
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
doc_updated_at: "2026-04-22T15:38:12.284Z"
doc_updated_by: "PLANNER"
description: "Add typed contracts for recipe prompt mutations and bindings, including add, patch, replace, disable, bind, validator operations, and condition matching."
sections:
  Summary: |-
    Define prompt mutation and binding contracts

    Add typed contracts for recipe prompt mutations and bindings, including add, patch, replace, disable, bind, validator operations, and condition matching.
  Scope: |-
    - In scope: Add typed contracts for recipe prompt mutations and bindings, including add, patch, replace, disable, bind, validator operations, and condition matching.
    - Out of scope: unrelated refactors not required for "Define prompt mutation and binding contracts".
  Plan: |-
    Goal: Define prompt mutation and binding contracts

    Plan:
    1. Inspect the current implementation and tests around this scope.
    2. Make the smallest implementation change that satisfies the task contract.
    3. Add or update focused tests and fixtures for the changed behavior.
    4. Update docs or generated schemas only when the code-facing contract changes.

    Acceptance:
    - Mutation and binding contracts reject raw text patches and model explicit targets, slots, ordering, and when predicates.
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

Define prompt mutation and binding contracts

Add typed contracts for recipe prompt mutations and bindings, including add, patch, replace, disable, bind, validator operations, and condition matching.

## Scope

- In scope: Add typed contracts for recipe prompt mutations and bindings, including add, patch, replace, disable, bind, validator operations, and condition matching.
- Out of scope: unrelated refactors not required for "Define prompt mutation and binding contracts".

## Plan

Goal: Define prompt mutation and binding contracts

Plan:
1. Inspect the current implementation and tests around this scope.
2. Make the smallest implementation change that satisfies the task contract.
3. Add or update focused tests and fixtures for the changed behavior.
4. Update docs or generated schemas only when the code-facing contract changes.

Acceptance:
- Mutation and binding contracts reject raw text patches and model explicit targets, slots, ordering, and when predicates.
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
