---
id: "202603251538-CMY5ZN"
title: "Extract recipe domain into packages/recipes and narrow scenario coupling"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202603251538-NQSPGC"
tags:
  - "code"
  - "architecture"
  - "refactor"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
comments: []
doc_version: 3
doc_updated_at: "2026-03-25T15:38:57.760Z"
doc_updated_by: "CODER"
description: "Move recipe schema parsing, installed-state logic, compatibility resolution, and catalog/runtime helpers into packages/recipes, then reduce scenario execution glue so delivery concerns no longer own the recipe domain directly."
sections:
  Summary: |-
    Extract recipe domain into packages/recipes and narrow scenario coupling
    
    Move recipe schema parsing, installed-state logic, compatibility resolution, and catalog/runtime helpers into packages/recipes, then reduce scenario execution glue so delivery concerns no longer own the recipe domain directly.
  Scope: |-
    - In scope: Move recipe schema parsing, installed-state logic, compatibility resolution, and catalog/runtime helpers into packages/recipes, then reduce scenario execution glue so delivery concerns no longer own the recipe domain directly.
    - Out of scope: unrelated refactors not required for "Extract recipe domain into packages/recipes and narrow scenario coupling".
  Plan: |-
    1. Implement the change for "Extract recipe domain into packages/recipes and narrow scenario coupling".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. Review the changed artifact or behavior. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched scope.
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

Extract recipe domain into packages/recipes and narrow scenario coupling

Move recipe schema parsing, installed-state logic, compatibility resolution, and catalog/runtime helpers into packages/recipes, then reduce scenario execution glue so delivery concerns no longer own the recipe domain directly.

## Scope

- In scope: Move recipe schema parsing, installed-state logic, compatibility resolution, and catalog/runtime helpers into packages/recipes, then reduce scenario execution glue so delivery concerns no longer own the recipe domain directly.
- Out of scope: unrelated refactors not required for "Extract recipe domain into packages/recipes and narrow scenario coupling".

## Plan

1. Implement the change for "Extract recipe domain into packages/recipes and narrow scenario coupling".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. Review the changed artifact or behavior. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
