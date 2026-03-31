---
id: "202603311332-WJM993"
title: "N5.1 Split `cli/run-cli/commands/core.ts` by subcommand/report concern"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603311331-C3JHD2"
tags:
  - "code"
  - "refactor"
  - "cli"
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
doc_updated_at: "2026-03-31T13:32:37.014Z"
doc_updated_by: "PLANNER"
description: "Implement N5.1 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: core CLI command routing no longer shares one file with unrelated report renderers and helpers. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N5.1 Split `cli/run-cli/commands/core.ts` by subcommand/report concern
    
    Implement N5.1 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: core CLI command routing no longer shares one file with unrelated report renderers and helpers. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N5.1 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: core CLI command routing no longer shares one file with unrelated report renderers and helpers. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N5.1 Split `cli/run-cli/commands/core.ts` by subcommand/report concern".
  Plan: |-
    1. Audit the scoped modules named by this refactor item and isolate the narrowest change set that satisfies N5.1.
    2. Implement split `cli/run-cli/commands/core.ts` by subcommand/report concern with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering the scoped modules named by this refactor item. Expected: the behavior targeted by N5.1 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-WJM993. Expected: scope stays anchored to the scoped modules named by this refactor item plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: core CLI command routing no longer shares one file with unrelated report renderers and helpers.
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

N5.1 Split `cli/run-cli/commands/core.ts` by subcommand/report concern

Implement N5.1 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: core CLI command routing no longer shares one file with unrelated report renderers and helpers. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N5.1 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: core CLI command routing no longer shares one file with unrelated report renderers and helpers. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N5.1 Split `cli/run-cli/commands/core.ts` by subcommand/report concern".

## Plan

1. Audit the scoped modules named by this refactor item and isolate the narrowest change set that satisfies N5.1.
2. Implement split `cli/run-cli/commands/core.ts` by subcommand/report concern with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering the scoped modules named by this refactor item. Expected: the behavior targeted by N5.1 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-WJM993. Expected: scope stays anchored to the scoped modules named by this refactor item plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: core CLI command routing no longer shares one file with unrelated report renderers and helpers.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
