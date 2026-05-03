---
id: "202605031908-Z2FSSG"
title: "T02: Add ACR example fixture"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605031908-6V1G82"
tags:
  - "code"
  - "schemas"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:08:12.584Z"
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
doc_updated_at: "2026-05-03T19:08:12.074Z"
doc_updated_by: "PLANNER"
description: "Add a canonical schema-valid packages/spec/examples/acr.json and wire it into spec examples validation."
sections:
  Summary: |-
    T02: Add ACR example fixture

    Add a canonical schema-valid packages/spec/examples/acr.json and wire it into spec examples validation.
  Scope: |-
    - In scope: Add a canonical schema-valid packages/spec/examples/acr.json and wire it into spec examples validation.
    - Out of scope: unrelated refactors not required for "T02: Add ACR example fixture".
  Plan: "Create the ACR fixture following existing spec example patterns, add it to the spec examples check, and run bun run spec:examples:check."
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

T02: Add ACR example fixture

Add a canonical schema-valid packages/spec/examples/acr.json and wire it into spec examples validation.

## Scope

- In scope: Add a canonical schema-valid packages/spec/examples/acr.json and wire it into spec examples validation.
- Out of scope: unrelated refactors not required for "T02: Add ACR example fixture".

## Plan

Create the ACR fixture following existing spec example patterns, add it to the spec examples check, and run bun run spec:examples:check.

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
