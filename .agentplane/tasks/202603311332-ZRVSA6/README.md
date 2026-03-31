---
id: "202603311332-ZRVSA6"
title: "N6.2 Extract shared output-capture and report-assertion helpers for CLI contract suites"
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
  - "tests"
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
doc_updated_at: "2026-03-31T13:32:42.521Z"
doc_updated_by: "PLANNER"
description: "Implement N6.2 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: output-heavy suites stop re-implementing the same capture/assertion plumbing. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N6.2 Extract shared output-capture and report-assertion helpers for CLI contract suites
    
    Implement N6.2 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: output-heavy suites stop re-implementing the same capture/assertion plumbing. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N6.2 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: output-heavy suites stop re-implementing the same capture/assertion plumbing. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N6.2 Extract shared output-capture and report-assertion helpers for CLI contract suites".
  Plan: |-
    1. Audit `cli/run-cli*.test.ts` helpers and isolate the narrowest change set that satisfies N6.2.
    2. Implement extract shared output-capture and report-assertion helpers for cli contract suites with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `cli/run-cli*.test.ts` helpers. Expected: the behavior targeted by N6.2 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-ZRVSA6. Expected: scope stays anchored to `cli/run-cli*.test.ts` helpers plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: output-heavy suites stop re-implementing the same capture/assertion plumbing.
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

N6.2 Extract shared output-capture and report-assertion helpers for CLI contract suites

Implement N6.2 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: output-heavy suites stop re-implementing the same capture/assertion plumbing. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N6.2 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: output-heavy suites stop re-implementing the same capture/assertion plumbing. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N6.2 Extract shared output-capture and report-assertion helpers for CLI contract suites".

## Plan

1. Audit `cli/run-cli*.test.ts` helpers and isolate the narrowest change set that satisfies N6.2.
2. Implement extract shared output-capture and report-assertion helpers for cli contract suites with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `cli/run-cli*.test.ts` helpers. Expected: the behavior targeted by N6.2 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-ZRVSA6. Expected: scope stays anchored to `cli/run-cli*.test.ts` helpers plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: output-heavy suites stop re-implementing the same capture/assertion plumbing.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
