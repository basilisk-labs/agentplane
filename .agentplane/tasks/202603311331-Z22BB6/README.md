---
id: "202603311331-Z22BB6"
title: "N1.4 Move remaining report-style command families onto the shared emitters"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603311331-VPRQXR"
  - "202603311331-PRG60Z"
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
doc_updated_at: "2026-03-31T13:31:18.418Z"
doc_updated_by: "PLANNER"
description: "Implement N1.4 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: these commands share the same text/json rendering conventions instead of repeating them locally. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N1.4 Move remaining report-style command families onto the shared emitters
    
    Implement N1.4 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: these commands share the same text/json rendering conventions instead of repeating them locally. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N1.4 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: these commands share the same text/json rendering conventions instead of repeating them locally. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N1.4 Move remaining report-style command families onto the shared emitters".
  Plan: |-
    1. Audit `commands/pr/*`, `commands/branch/*`, `commands/backend.ts`, `commands/scenario/impl/commands.ts`, selected release/report modules and isolate the narrowest change set that satisfies N1.4.
    2. Implement move remaining report-style command families onto the shared emitters with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `commands/pr/*`, `commands/branch/*`, `commands/backend.ts`, `commands/scenario/impl/commands.ts`, selected release/report modules. Expected: the behavior targeted by N1.4 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-Z22BB6. Expected: scope stays anchored to `commands/pr/*`, `commands/branch/*`, `commands/backend.ts`, `commands/scenario/impl/commands.ts`, selected release/report modules plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: these commands share the same text/json rendering conventions instead of repeating them locally.
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

N1.4 Move remaining report-style command families onto the shared emitters

Implement N1.4 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: these commands share the same text/json rendering conventions instead of repeating them locally. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N1.4 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: these commands share the same text/json rendering conventions instead of repeating them locally. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N1.4 Move remaining report-style command families onto the shared emitters".

## Plan

1. Audit `commands/pr/*`, `commands/branch/*`, `commands/backend.ts`, `commands/scenario/impl/commands.ts`, selected release/report modules and isolate the narrowest change set that satisfies N1.4.
2. Implement move remaining report-style command families onto the shared emitters with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `commands/pr/*`, `commands/branch/*`, `commands/backend.ts`, `commands/scenario/impl/commands.ts`, selected release/report modules. Expected: the behavior targeted by N1.4 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-Z22BB6. Expected: scope stays anchored to `commands/pr/*`, `commands/branch/*`, `commands/backend.ts`, `commands/scenario/impl/commands.ts`, selected release/report modules plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: these commands share the same text/json rendering conventions instead of repeating them locally.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
