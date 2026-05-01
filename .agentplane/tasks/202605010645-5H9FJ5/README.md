---
id: "202605010645-5H9FJ5"
title: "AP-15: Factor CI contract and release extras"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605010645-YZ5WV4"
tags:
  - "code"
verify:
  - "bun run workflows:lint && bun run ci:local:fast"
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
doc_updated_at: "2026-05-01T06:45:24.555Z"
doc_updated_by: "CODER"
description: "Split package CI scripts into shared contract, test, and release-extra lanes to reduce ci/release duplication."
sections:
  Summary: |-
    AP-15: Factor CI contract and release extras
    
    Split package CI scripts into shared contract, test, and release-extra lanes to reduce ci/release duplication.
  Scope: |-
    - In scope: Split package CI scripts into shared contract, test, and release-extra lanes to reduce ci/release duplication.
    - Out of scope: unrelated refactors not required for "AP-15: Factor CI contract and release extras".
  Plan: |-
    1. Implement the change for "AP-15: Factor CI contract and release extras".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun run workflows:lint && bun run ci:local:fast`. Expected: it succeeds and confirms the requested outcome for this task.
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

AP-15: Factor CI contract and release extras

Split package CI scripts into shared contract, test, and release-extra lanes to reduce ci/release duplication.

## Scope

- In scope: Split package CI scripts into shared contract, test, and release-extra lanes to reduce ci/release duplication.
- Out of scope: unrelated refactors not required for "AP-15: Factor CI contract and release extras".

## Plan

1. Implement the change for "AP-15: Factor CI contract and release extras".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run workflows:lint && bun run ci:local:fast`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
