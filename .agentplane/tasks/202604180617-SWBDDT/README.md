---
id: "202604180617-SWBDDT"
title: "Adopt CommandResult for release and task commands"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "output"
  - "refactor"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-18T07:55:53.750Z"
  updated_by: "CODER"
  note: "Introduced a typed CommandResult contract in cli/output and moved task comment/update/block onto the shared emitter path; typecheck, targeted lint on touched files, and focused unit tests passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: introduce CommandResult contract, move selected release/task commands to renderer-owned output, and verify command-level behavior plus fast CI."
events:
  -
    type: "status"
    at: "2026-04-18T07:43:16.189Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: introduce CommandResult contract, move selected release/task commands to renderer-owned output, and verify command-level behavior plus fast CI."
  -
    type: "verify"
    at: "2026-04-18T07:55:53.750Z"
    author: "CODER"
    state: "ok"
    note: "Introduced a typed CommandResult contract in cli/output and moved task comment/update/block onto the shared emitter path; typecheck, targeted lint on touched files, and focused unit tests passed."
doc_version: 3
doc_updated_at: "2026-04-18T07:55:53.755Z"
doc_updated_by: "CODER"
description: "Introduce a typed command result contract and route selected release/task commands through renderer-owned output so command handlers stop writing output ad hoc."
sections:
  Summary: |-
    Adopt CommandResult for release and task commands
    
    Introduce a typed command result contract and route selected release/task commands through renderer-owned output so command handlers stop writing output ad hoc.
  Scope: |-
    - In scope: Introduce a typed command result contract and route selected release/task commands through renderer-owned output so command handlers stop writing output ad hoc.
    - Out of scope: unrelated refactors not required for "Adopt CommandResult for release and task commands".
  Plan: "1. Introduce a typed CommandResult contract and renderer-owned output helpers. 2. Migrate selected release/task commands from ad-hoc stdout writes to CommandResult. 3. Verify with command-level tests, lint:core, and test:fast."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-18T07:55:53.750Z — VERIFY — ok
    
    By: CODER
    
    Note: Introduced a typed CommandResult contract in cli/output and moved task comment/update/block onto the shared emitter path; typecheck, targeted lint on touched files, and focused unit tests passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-18T07:43:16.195Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Adopt CommandResult for release and task commands

Introduce a typed command result contract and route selected release/task commands through renderer-owned output so command handlers stop writing output ad hoc.

## Scope

- In scope: Introduce a typed command result contract and route selected release/task commands through renderer-owned output so command handlers stop writing output ad hoc.
- Out of scope: unrelated refactors not required for "Adopt CommandResult for release and task commands".

## Plan

1. Introduce a typed CommandResult contract and renderer-owned output helpers. 2. Migrate selected release/task commands from ad-hoc stdout writes to CommandResult. 3. Verify with command-level tests, lint:core, and test:fast.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-18T07:55:53.750Z — VERIFY — ok

By: CODER

Note: Introduced a typed CommandResult contract in cli/output and moved task comment/update/block onto the shared emitter path; typecheck, targeted lint on touched files, and focused unit tests passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-18T07:43:16.195Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
