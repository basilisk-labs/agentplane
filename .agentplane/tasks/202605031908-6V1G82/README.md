---
id: "202605031908-6V1G82"
title: "T01: Resolve ACR schema domain"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "schemas"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:08:09.023Z"
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
    body: "Start: executing this approved launch backlog atom inside the primary ACR launch branch_pr worktree with scoped verification evidence."
events:
  -
    type: "status"
    at: "2026-05-03T19:30:06.508Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: executing this approved launch backlog atom inside the primary ACR launch branch_pr worktree with scoped verification evidence."
doc_version: 3
doc_updated_at: "2026-05-03T19:30:06.508Z"
doc_updated_by: "CODER"
description: "Choose and apply the canonical ACR schema id domain across schema files and ACR URL constants."
sections:
  Summary: |-
    T01: Resolve ACR schema domain

    Choose and apply the canonical ACR schema id domain across schema files and ACR URL constants.
  Scope: |-
    - In scope: Choose and apply the canonical ACR schema id domain across schema files and ACR URL constants.
    - Out of scope: unrelated refactors not required for "T01: Resolve ACR schema domain".
  Plan: "Inspect all ACR schema URL occurrences, switch stale agentplane.dev references to the canonical agentplane.org schema URL unless a live .dev schema is deliberately retained, and verify schema checks plus grep evidence."
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

T01: Resolve ACR schema domain

Choose and apply the canonical ACR schema id domain across schema files and ACR URL constants.

## Scope

- In scope: Choose and apply the canonical ACR schema id domain across schema files and ACR URL constants.
- Out of scope: unrelated refactors not required for "T01: Resolve ACR schema domain".

## Plan

Inspect all ACR schema URL occurrences, switch stale agentplane.dev references to the canonical agentplane.org schema URL unless a live .dev schema is deliberately retained, and verify schema checks plus grep evidence.

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
