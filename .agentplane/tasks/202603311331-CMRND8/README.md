---
id: "202603311331-CMRND8"
title: "N3.2 Move `task start`, `task block`, and `task set-status` onto the executor"
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
  updated_at: "2026-03-31T16:20:58.599Z"
  updated_by: "CODER"
  note: "Moved task start, block, and set-status onto applyTaskMutation plus the shared transition executor so handlers keep only command-specific validation and commit plumbing; verified with focused command/shared unit slices, local-vs-remote parity tests, lint, and agentplane build."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: move task start, block, and set-status onto the shared transition executor so those handlers keep only command-specific validation, comment shaping, and commit plumbing while transition orchestration lives in one place."
events:
  -
    type: "status"
    at: "2026-03-31T16:13:52.966Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: move task start, block, and set-status onto the shared transition executor so those handlers keep only command-specific validation, comment shaping, and commit plumbing while transition orchestration lives in one place."
  -
    type: "verify"
    at: "2026-03-31T16:20:58.599Z"
    author: "CODER"
    state: "ok"
    note: "Moved task start, block, and set-status onto applyTaskMutation plus the shared transition executor so handlers keep only command-specific validation and commit plumbing; verified with focused command/shared unit slices, local-vs-remote parity tests, lint, and agentplane build."
doc_version: 3
doc_updated_at: "2026-03-31T16:20:58.601Z"
doc_updated_by: "CODER"
description: "Implement N3.2 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: those handlers become thin command-specific wrappers around the shared transition contract. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N3.2 Move `task start`, `task block`, and `task set-status` onto the executor
    
    Implement N3.2 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: those handlers become thin command-specific wrappers around the shared transition contract. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N3.2 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: those handlers become thin command-specific wrappers around the shared transition contract. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N3.2 Move `task start`, `task block`, and `task set-status` onto the executor".
  Plan: |-
    1. Audit `task/start.ts`, `task/block.ts`, `task/set-status.ts` and isolate the narrowest change set that satisfies N3.2.
    2. Implement move `task start`, `task block`, and `task set-status` onto the executor with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `task/start.ts`, `task/block.ts`, `task/set-status.ts`. Expected: the behavior targeted by N3.2 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-CMRND8. Expected: scope stays anchored to `task/start.ts`, `task/block.ts`, `task/set-status.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: those handlers become thin command-specific wrappers around the shared transition contract.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T16:20:58.599Z — VERIFY — ok
    
    By: CODER
    
    Note: Moved task start, block, and set-status onto applyTaskMutation plus the shared transition executor so handlers keep only command-specific validation and commit plumbing; verified with focused command/shared unit slices, local-vs-remote parity tests, lint, and agentplane build.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T16:13:52.968Z, excerpt_hash=sha256:80fe042e6de07d2a4bd2b0978ab70f58a2461b700e94be37c4100a2f107017b5
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N3.2 Move `task start`, `task block`, and `task set-status` onto the executor

Implement N3.2 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: those handlers become thin command-specific wrappers around the shared transition contract. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N3.2 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: those handlers become thin command-specific wrappers around the shared transition contract. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N3.2 Move `task start`, `task block`, and `task set-status` onto the executor".

## Plan

1. Audit `task/start.ts`, `task/block.ts`, `task/set-status.ts` and isolate the narrowest change set that satisfies N3.2.
2. Implement move `task start`, `task block`, and `task set-status` onto the executor with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `task/start.ts`, `task/block.ts`, `task/set-status.ts`. Expected: the behavior targeted by N3.2 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-CMRND8. Expected: scope stays anchored to `task/start.ts`, `task/block.ts`, `task/set-status.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: those handlers become thin command-specific wrappers around the shared transition contract.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T16:20:58.599Z — VERIFY — ok

By: CODER

Note: Moved task start, block, and set-status onto applyTaskMutation plus the shared transition executor so handlers keep only command-specific validation and commit plumbing; verified with focused command/shared unit slices, local-vs-remote parity tests, lint, and agentplane build.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T16:13:52.968Z, excerpt_hash=sha256:80fe042e6de07d2a4bd2b0978ab70f58a2461b700e94be37c4100a2f107017b5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
