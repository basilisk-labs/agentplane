---
id: "202603251538-VJ5GHJ"
title: "Unify CLI registry, routing, and bootstrap metadata"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202603251538-Y8DE9D"
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
doc_updated_at: "2026-03-25T15:38:39.376Z"
doc_updated_by: "CODER"
description: "Replace duplicated command catalog and registry matching with one canonical CLI registry that owns command matching, bootstrap requirements, metadata, and help/spec generation, while keeping business logic outside the CLI glue layer."
sections:
  Summary: |-
    Unify CLI registry, routing, and bootstrap metadata
    
    Replace duplicated command catalog and registry matching with one canonical CLI registry that owns command matching, bootstrap requirements, metadata, and help/spec generation, while keeping business logic outside the CLI glue layer.
  Scope: |-
    - In scope: Replace duplicated command catalog and registry matching with one canonical CLI registry that owns command matching, bootstrap requirements, metadata, and help/spec generation, while keeping business logic outside the CLI glue layer.
    - Out of scope: unrelated refactors not required for "Unify CLI registry, routing, and bootstrap metadata".
  Plan: |-
    1. Implement the change for "Unify CLI registry, routing, and bootstrap metadata".
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

Unify CLI registry, routing, and bootstrap metadata

Replace duplicated command catalog and registry matching with one canonical CLI registry that owns command matching, bootstrap requirements, metadata, and help/spec generation, while keeping business logic outside the CLI glue layer.

## Scope

- In scope: Replace duplicated command catalog and registry matching with one canonical CLI registry that owns command matching, bootstrap requirements, metadata, and help/spec generation, while keeping business logic outside the CLI glue layer.
- Out of scope: unrelated refactors not required for "Unify CLI registry, routing, and bootstrap metadata".

## Plan

1. Implement the change for "Unify CLI registry, routing, and bootstrap metadata".
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
