---
id: "202603311331-NERBXG"
title: "N3.3 Move `finish`, `finish-shared`, `close-shared`, and `verify-record` onto the executor"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202603311331-EBQZAP"
tags:
  - "code"
  - "refactor"
  - "workflow"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T16:29:14.764Z"
  updated_by: "CODER"
  note: "Moved terminal lifecycle writes onto shared transition executors: finish/close now reuse the shared DONE transition executor and verify-record uses a shared verification executor; verified with focused finish/verify/close/shared unit suites, local-vs-remote parity, lint, and agentplane build."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: move finish, finish-shared, close-shared, and verify-record onto the shared transition executor so terminal lifecycle transitions stop carrying their own duplicated status and transition orchestration before comment-commit convergence lands."
events:
  -
    type: "status"
    at: "2026-03-31T16:24:31.822Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: move finish, finish-shared, close-shared, and verify-record onto the shared transition executor so terminal lifecycle transitions stop carrying their own duplicated status and transition orchestration before comment-commit convergence lands."
  -
    type: "verify"
    at: "2026-03-31T16:29:14.764Z"
    author: "CODER"
    state: "ok"
    note: "Moved terminal lifecycle writes onto shared transition executors: finish/close now reuse the shared DONE transition executor and verify-record uses a shared verification executor; verified with focused finish/verify/close/shared unit suites, local-vs-remote parity, lint, and agentplane build."
doc_version: 3
doc_updated_at: "2026-03-31T16:29:14.766Z"
doc_updated_by: "CODER"
description: "Implement N3.3 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: terminal lifecycle transitions no longer duplicate the same orchestration in separate modules. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N3.3 Move `finish`, `finish-shared`, `close-shared`, and `verify-record` onto the executor
    
    Implement N3.3 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: terminal lifecycle transitions no longer duplicate the same orchestration in separate modules. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N3.3 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: terminal lifecycle transitions no longer duplicate the same orchestration in separate modules. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N3.3 Move `finish`, `finish-shared`, `close-shared`, and `verify-record` onto the executor".
  Plan: |-
    1. Audit `task/finish.ts`, `task/finish-shared.ts`, `task/close-shared.ts`, `task/verify-record.ts` and isolate the narrowest change set that satisfies N3.3.
    2. Implement move `finish`, `finish-shared`, `close-shared`, and `verify-record` onto the executor with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `task/finish.ts`, `task/finish-shared.ts`, `task/close-shared.ts`, `task/verify-record.ts`. Expected: the behavior targeted by N3.3 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-NERBXG. Expected: scope stays anchored to `task/finish.ts`, `task/finish-shared.ts`, `task/close-shared.ts`, `task/verify-record.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: terminal lifecycle transitions no longer duplicate the same orchestration in separate modules.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T16:29:14.764Z — VERIFY — ok
    
    By: CODER
    
    Note: Moved terminal lifecycle writes onto shared transition executors: finish/close now reuse the shared DONE transition executor and verify-record uses a shared verification executor; verified with focused finish/verify/close/shared unit suites, local-vs-remote parity, lint, and agentplane build.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T16:24:31.832Z, excerpt_hash=sha256:f5e774b1d0e830465ebf51d1fa75338153a072435eaa4056b0a73f87fb2a66ee
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N3.3 Move `finish`, `finish-shared`, `close-shared`, and `verify-record` onto the executor

Implement N3.3 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: terminal lifecycle transitions no longer duplicate the same orchestration in separate modules. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N3.3 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: terminal lifecycle transitions no longer duplicate the same orchestration in separate modules. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N3.3 Move `finish`, `finish-shared`, `close-shared`, and `verify-record` onto the executor".

## Plan

1. Audit `task/finish.ts`, `task/finish-shared.ts`, `task/close-shared.ts`, `task/verify-record.ts` and isolate the narrowest change set that satisfies N3.3.
2. Implement move `finish`, `finish-shared`, `close-shared`, and `verify-record` onto the executor with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `task/finish.ts`, `task/finish-shared.ts`, `task/close-shared.ts`, `task/verify-record.ts`. Expected: the behavior targeted by N3.3 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-NERBXG. Expected: scope stays anchored to `task/finish.ts`, `task/finish-shared.ts`, `task/close-shared.ts`, `task/verify-record.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: terminal lifecycle transitions no longer duplicate the same orchestration in separate modules.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T16:29:14.764Z — VERIFY — ok

By: CODER

Note: Moved terminal lifecycle writes onto shared transition executors: finish/close now reuse the shared DONE transition executor and verify-record uses a shared verification executor; verified with focused finish/verify/close/shared unit suites, local-vs-remote parity, lint, and agentplane build.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T16:24:31.832Z, excerpt_hash=sha256:f5e774b1d0e830465ebf51d1fa75338153a072435eaa4056b0a73f87fb2a66ee

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
