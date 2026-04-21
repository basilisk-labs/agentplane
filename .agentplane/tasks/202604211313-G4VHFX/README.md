---
id: "202604211313-G4VHFX"
title: "Split CLI lifecycle mega-test"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604211313-RE08PF"
tags:
  - "code"
  - "refactor"
  - "testing"
verify:
  - "bun run hotspots:check"
  - "bun run lint:core"
  - "bun run test:project -- cli-core"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:13:31.820Z"
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
    body: "Start: split the remaining CLI lifecycle mega-test into scenario-family files while preserving behavior."
events:
  -
    type: "status"
    at: "2026-04-21T16:00:51.755Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split the remaining CLI lifecycle mega-test into scenario-family files while preserving behavior."
doc_version: 3
doc_updated_at: "2026-04-21T16:00:51.773Z"
doc_updated_by: "CODER"
description: "Decompose the large run-cli lifecycle test file into focused lifecycle scenario files using shared fixtures where appropriate."
sections:
  Summary: |-
    Split CLI lifecycle mega-test
    
    Decompose the large run-cli lifecycle test file into focused lifecycle scenario files using shared fixtures where appropriate.
  Scope: |-
    - In scope: Decompose the large run-cli lifecycle test file into focused lifecycle scenario files using shared fixtures where appropriate.
    - Out of scope: unrelated refactors not required for "Split CLI lifecycle mega-test".
  Plan: "Scope: reduce the second large CLI test hotspot. Steps: 1. Partition lifecycle scenarios by command/state transition family. 2. Reuse or extract fixtures to avoid copy-paste setup. 3. Keep each resulting file under the threshold. Acceptance: cli-core tests pass and debugging can target scenario-family files."
  Verify Steps: |-
    1. Run `bun run test:project -- cli-core`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run hotspots:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Split CLI lifecycle mega-test

Decompose the large run-cli lifecycle test file into focused lifecycle scenario files using shared fixtures where appropriate.

## Scope

- In scope: Decompose the large run-cli lifecycle test file into focused lifecycle scenario files using shared fixtures where appropriate.
- Out of scope: unrelated refactors not required for "Split CLI lifecycle mega-test".

## Plan

Scope: reduce the second large CLI test hotspot. Steps: 1. Partition lifecycle scenarios by command/state transition family. 2. Reuse or extract fixtures to avoid copy-paste setup. 3. Keep each resulting file under the threshold. Acceptance: cli-core tests pass and debugging can target scenario-family files.

## Verify Steps

1. Run `bun run test:project -- cli-core`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run hotspots:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
