---
id: "202604191814-E7VNEK"
title: "Standardize task-scoped commit message routing"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "git"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T18:15:55.975Z"
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
    author: "CODER"
    body: "Start: inspecting commit message template generation and direct-workflow routing so task-scoped commits stop degrading into non-task subjects, then standardizing the current branch history to the canonical format."
events:
  -
    type: "status"
    at: "2026-04-19T18:15:56.904Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspecting commit message template generation and direct-workflow routing so task-scoped commits stop degrading into non-task subjects, then standardizing the current branch history to the canonical format."
doc_version: 3
doc_updated_at: "2026-04-19T18:15:56.916Z"
doc_updated_by: "CODER"
description: "Inspect commit message template generation and commit policy routing, explain why task-scoped commits were accepted as non-task commits, fix the source of drift, and standardize the current branch commit messages to the canonical format."
sections:
  Summary: |-
    Standardize task-scoped commit message routing
    
    Inspect commit message template generation and commit policy routing, explain why task-scoped commits were accepted as non-task commits, fix the source of drift, and standardize the current branch commit messages to the canonical format.
  Scope: |-
    - In scope: Inspect commit message template generation and commit policy routing, explain why task-scoped commits were accepted as non-task commits, fix the source of drift, and standardize the current branch commit messages to the canonical format.
    - Out of scope: unrelated refactors not required for "Standardize task-scoped commit message routing".
  Plan: "1. Trace the canonical task-scoped and non-task commit message templates, then pinpoint why direct-workflow commits on the current branch bypassed the task-scoped form. 2. Fix the repository source of ambiguity with the smallest coherent change and lock it with targeted tests. 3. Rewrite the current branch commit subjects to the canonical task-scoped or canonical non-task form, verify policy/tests, and continue from the standardized history."
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

Standardize task-scoped commit message routing

Inspect commit message template generation and commit policy routing, explain why task-scoped commits were accepted as non-task commits, fix the source of drift, and standardize the current branch commit messages to the canonical format.

## Scope

- In scope: Inspect commit message template generation and commit policy routing, explain why task-scoped commits were accepted as non-task commits, fix the source of drift, and standardize the current branch commit messages to the canonical format.
- Out of scope: unrelated refactors not required for "Standardize task-scoped commit message routing".

## Plan

1. Trace the canonical task-scoped and non-task commit message templates, then pinpoint why direct-workflow commits on the current branch bypassed the task-scoped form. 2. Fix the repository source of ambiguity with the smallest coherent change and lock it with targeted tests. 3. Rewrite the current branch commit subjects to the canonical task-scoped or canonical non-task form, verify policy/tests, and continue from the standardized history.

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
