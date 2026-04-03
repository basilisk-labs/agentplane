---
id: "202604030442-YD0K3G"
title: "F-004 Introduce precedence core"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604030441-AQRVW4"
  - "202604030442-9CJTSA"
tags:
  - "code"
  - "framework"
  - "behavior"
verify:
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T04:42:02.328Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from framework roadmap and explicit user execution request"
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-03T04:42:02.088Z"
doc_updated_by: "PLANNER"
description: "Formalize framework-level behavior precedence and traceable conflict resolution."
sections:
  Summary: |-
    F-004 Introduce precedence core
    
    Formalize framework-level behavior precedence and traceable conflict resolution.
  Scope: |-
    - In scope: Formalize framework-level behavior precedence and traceable conflict resolution.
    - Out of scope: unrelated refactors not required for "F-004 Introduce precedence core".
  Plan: |-
    1. Define the precedence order harness -> extension layer -> user rules -> builtin defaults in framework code.
    2. Build a reusable resolver with trace output for conflicts and winning inputs.
    3. Connect the first runtime call sites so later recipe integration can plug into the core model unchanged.
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
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

F-004 Introduce precedence core

Formalize framework-level behavior precedence and traceable conflict resolution.

## Scope

- In scope: Formalize framework-level behavior precedence and traceable conflict resolution.
- Out of scope: unrelated refactors not required for "F-004 Introduce precedence core".

## Plan

1. Define the precedence order harness -> extension layer -> user rules -> builtin defaults in framework code.
2. Build a reusable resolver with trace output for conflicts and winning inputs.
3. Connect the first runtime call sites so later recipe integration can plug into the core model unchanged.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
