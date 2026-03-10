---
id: "202603100816-BRJSBM"
title: "Recipes v1: add deterministic resolver and run-profile selection"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on:
  - "202603100808-FKN7RT"
  - "202603100808-ZCCV0Z"
tags:
  - "code"
  - "recipes"
  - "resolver"
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
doc_updated_at: "2026-03-10T08:16:42.611Z"
doc_updated_by: "CODER"
description: "Introduce a recipe resolver layer that scans project-local recipes, validates manifest compatibility, resolves scenario selection, and produces a deterministic run profile without implementing orchestration execution."
id_source: "generated"
---
## Summary

Recipes v1: add deterministic resolver and run-profile selection

Introduce a recipe resolver layer that scans project-local recipes, validates manifest compatibility, resolves scenario selection, and produces a deterministic run profile without implementing orchestration execution.

## Scope

- In scope: Introduce a recipe resolver layer that scans project-local recipes, validates manifest compatibility, resolves scenario selection, and produces a deterministic run profile without implementing orchestration execution.
- Out of scope: unrelated refactors not required for "Recipes v1: add deterministic resolver and run-profile selection".

## Plan

1. Implement the change for "Recipes v1: add deterministic resolver and run-profile selection".
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
