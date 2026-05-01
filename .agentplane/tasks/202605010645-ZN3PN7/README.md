---
id: "202605010645-ZN3PN7"
title: "AP-16: Validate spec examples as mirrors"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605010645-5H9FJ5"
tags:
  - "code"
verify:
  - "bun run schemas:check && node scripts/check-spec-examples.mjs"
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
doc_updated_at: "2026-05-01T06:45:26.779Z"
doc_updated_by: "CODER"
description: "Validate packages/spec examples against generated schemas without making spec the source of truth."
sections:
  Summary: |-
    AP-16: Validate spec examples as mirrors
    
    Validate packages/spec examples against generated schemas without making spec the source of truth.
  Scope: |-
    - In scope: Validate packages/spec examples against generated schemas without making spec the source of truth.
    - Out of scope: unrelated refactors not required for "AP-16: Validate spec examples as mirrors".
  Plan: |-
    1. Implement the change for "AP-16: Validate spec examples as mirrors".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun run schemas:check && node scripts/check-spec-examples.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

AP-16: Validate spec examples as mirrors

Validate packages/spec examples against generated schemas without making spec the source of truth.

## Scope

- In scope: Validate packages/spec examples against generated schemas without making spec the source of truth.
- Out of scope: unrelated refactors not required for "AP-16: Validate spec examples as mirrors".

## Plan

1. Implement the change for "AP-16: Validate spec examples as mirrors".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run schemas:check && node scripts/check-spec-examples.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
