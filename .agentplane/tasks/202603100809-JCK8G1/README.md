---
id: "202603100809-JCK8G1"
title: "Recipes v1: make scenario CLI a validating placeholder over resolver surface"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on:
  - "202603100808-FKN7RT"
  - "202603100808-ZCCV0Z"
  - "202603100816-BRJSBM"
tags:
  - "code"
  - "recipes"
  - "cli"
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
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-03-10T08:09:04.589Z"
doc_updated_by: "CODER"
description: "Rework scenario list/info/run to use manifest-level descriptors and resolver outputs, with scenario run limited to validation and prepared run-plan output until orchestration runtime exists."
id_source: "generated"
---
## Summary

Recipes v1: align scenario CLI with manifest-driven recipe surface

Keep scenario discovery and info manifest-driven for project-local recipes, and reduce scenario run to a placeholder that only validates recipe/scenario references until orchestration runtime is designed.

## Scope

- In scope: Keep scenario discovery and info manifest-driven for project-local recipes, and reduce scenario run to a placeholder that only validates recipe/scenario references until orchestration runtime is designed.
- Out of scope: unrelated refactors not required for "Recipes v1: align scenario CLI with manifest-driven recipe surface".

## Plan

1. Implement the change for "Recipes v1: align scenario CLI with manifest-driven recipe surface".
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
