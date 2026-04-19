---
id: "202604191639-Z4DA83"
title: "Modularize task finish workflow"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "task"
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
events: []
doc_version: 3
doc_updated_at: "2026-04-19T16:39:46.957Z"
doc_updated_by: "CODER"
description: "Epic C′. Split task finish into validation, artifact, commit, and post-effect phases."
sections:
  Summary: |-
    Modularize task finish workflow
    
    Epic C′. Split task finish into validation, artifact, commit, and post-effect phases.
  Scope: |-
    - In scope: Epic C′. Split task finish into validation, artifact, commit, and post-effect phases.
    - Out of scope: unrelated refactors not required for "Modularize task finish workflow".
  Plan: |-
    1. Implement the change for "Modularize task finish workflow".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
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

Modularize task finish workflow

Epic C′. Split task finish into validation, artifact, commit, and post-effect phases.

## Scope

- In scope: Epic C′. Split task finish into validation, artifact, commit, and post-effect phases.
- Out of scope: unrelated refactors not required for "Modularize task finish workflow".

## Plan

1. Implement the change for "Modularize task finish workflow".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

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
