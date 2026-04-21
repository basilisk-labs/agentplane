---
id: "202604211313-G4VHFX"
title: "Split CLI lifecycle mega-test"
result_summary: "Split lifecycle scenarios into focused plan, start-readiness, and start-commit test files with shared test-only helpers excluded from package build."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-04-21T16:17:48.218Z"
  updated_by: "CODER"
  note: "Verified lifecycle test split: focused cli-core lifecycle suite passed (7 files, 26 tests); bun run typecheck passed; bun run hotspots:check passed; full bun run test:project -- cli-unit previously passed on the same split working tree (62 files, 624 tests)."
commit:
  hash: "51e1966068c525c3bf058dde1dc5bdc3ac278311"
  message: "✅ G4VHFX test: split lifecycle scenarios"
comments:
  -
    author: "CODER"
    body: "Start: split the remaining CLI lifecycle mega-test into scenario-family files while preserving behavior."
  -
    author: "CODER"
    body: "Verified: lifecycle mega-test split. Checks: focused cli-core lifecycle suite passed (7 files, 26 tests); bun run typecheck; bun run hotspots:check; full bun run test:project -- cli-unit previously passed on the same split working tree."
events:
  -
    type: "status"
    at: "2026-04-21T16:00:51.755Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split the remaining CLI lifecycle mega-test into scenario-family files while preserving behavior."
  -
    type: "verify"
    at: "2026-04-21T16:17:48.218Z"
    author: "CODER"
    state: "ok"
    note: "Verified lifecycle test split: focused cli-core lifecycle suite passed (7 files, 26 tests); bun run typecheck passed; bun run hotspots:check passed; full bun run test:project -- cli-unit previously passed on the same split working tree (62 files, 624 tests)."
  -
    type: "status"
    at: "2026-04-21T16:17:54.292Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: lifecycle mega-test split. Checks: focused cli-core lifecycle suite passed (7 files, 26 tests); bun run typecheck; bun run hotspots:check; full bun run test:project -- cli-unit previously passed on the same split working tree."
doc_version: 3
doc_updated_at: "2026-04-21T16:17:54.292Z"
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
    ### 2026-04-21T16:17:48.218Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified lifecycle test split: focused cli-core lifecycle suite passed (7 files, 26 tests); bun run typecheck passed; bun run hotspots:check passed; full bun run test:project -- cli-unit previously passed on the same split working tree (62 files, 624 tests).
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:00:51.773Z, excerpt_hash=sha256:77ee4355e7098463ac4354869f49524955d459f733636e1946b89663643a8d05
    
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
### 2026-04-21T16:17:48.218Z — VERIFY — ok

By: CODER

Note: Verified lifecycle test split: focused cli-core lifecycle suite passed (7 files, 26 tests); bun run typecheck passed; bun run hotspots:check passed; full bun run test:project -- cli-unit previously passed on the same split working tree (62 files, 624 tests).

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:00:51.773Z, excerpt_hash=sha256:77ee4355e7098463ac4354869f49524955d459f733636e1946b89663643a8d05

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
