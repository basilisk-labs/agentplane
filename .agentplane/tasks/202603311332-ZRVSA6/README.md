---
id: "202603311332-ZRVSA6"
title: "N6.2 Extract shared output-capture and report-assertion helpers for CLI contract suites"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
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
  state: "approved"
  updated_at: "2026-03-31T18:50:51.188Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T19:07:44.518Z"
  updated_by: "CODER"
  note: "Shared CLI output helpers are extracted; optional doc sections now write correctly for doc and runner flows; verified with eslint, build, shared/doc unit tests, and CLI contract suites for core/doc-write/tasks.query."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extract shared CLI output-capture and report-assertion helpers from the existing contract suites, keep the helper surface narrow, and delete duplicated parsing/assertion plumbing instead of inventing a test framework."
events:
  -
    type: "status"
    at: "2026-03-31T18:51:31.389Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract shared CLI output-capture and report-assertion helpers from the existing contract suites, keep the helper surface narrow, and delete duplicated parsing/assertion plumbing instead of inventing a test framework."
  -
    type: "verify"
    at: "2026-03-31T19:07:44.518Z"
    author: "CODER"
    state: "ok"
    note: "Shared CLI output helpers are extracted; optional doc sections now write correctly for doc and runner flows; verified with eslint, build, shared/doc unit tests, and CLI contract suites for core/doc-write/tasks.query."
doc_version: 3
doc_updated_at: "2026-03-31T19:07:44.522Z"
doc_updated_by: "CODER"
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
    ### 2026-03-31T19:07:44.518Z — VERIFY — ok
    
    By: CODER
    
    Note: Shared CLI output helpers are extracted; optional doc sections now write correctly for doc and runner flows; verified with eslint, build, shared/doc unit tests, and CLI contract suites for core/doc-write/tasks.query.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T18:51:31.407Z, excerpt_hash=sha256:29ce126b1f4791f4ad642883f2b77e8b6ddef69750ce868a67c0774f305da052
    
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
### 2026-03-31T19:07:44.518Z — VERIFY — ok

By: CODER

Note: Shared CLI output helpers are extracted; optional doc sections now write correctly for doc and runner flows; verified with eslint, build, shared/doc unit tests, and CLI contract suites for core/doc-write/tasks.query.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T18:51:31.407Z, excerpt_hash=sha256:29ce126b1f4791f4ad642883f2b77e8b6ddef69750ce868a67c0774f305da052

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
