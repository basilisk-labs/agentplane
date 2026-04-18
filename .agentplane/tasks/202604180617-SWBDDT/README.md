---
id: "202604180617-SWBDDT"
title: "Adopt CommandResult for release and task commands"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 2
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-18T06:18:07.921Z"
doc_updated_by: "PLANNER"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
