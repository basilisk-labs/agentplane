---
id: "202603311332-5K9CNK"
title: "N4.4 Move command handlers and task materialization callers onto the shared doc path"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603311332-95GHP9"
  - "202603311332-V2JXFM"
tags:
  - "code"
  - "refactor"
  - "backend"
  - "task-doc"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T18:01:57.211Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T18:25:30.412Z"
  updated_by: "CODER"
  note: "Moved task doc/plan/verify flows onto applyTaskMutation plus shared doc-state materializers for new/derive/scenario paths; verified with eslint, focused vitest slice (doc/plan/verify/parity/scenario/migrate-doc), and agentplane build."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: move task doc command callers and task materialization paths onto the shared doc mutation/write path, keep conflict/revision behavior unified, and delete now-redundant branching instead of layering more adapters."
events:
  -
    type: "status"
    at: "2026-03-31T18:02:30.610Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: move task doc command callers and task materialization paths onto the shared doc mutation/write path, keep conflict/revision behavior unified, and delete now-redundant branching instead of layering more adapters."
  -
    type: "verify"
    at: "2026-03-31T18:25:30.412Z"
    author: "CODER"
    state: "ok"
    note: "Moved task doc/plan/verify flows onto applyTaskMutation plus shared doc-state materializers for new/derive/scenario paths; verified with eslint, focused vitest slice (doc/plan/verify/parity/scenario/migrate-doc), and agentplane build."
doc_version: 3
doc_updated_at: "2026-03-31T18:25:30.416Z"
doc_updated_by: "CODER"
description: "Implement N4.4 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: these callers no longer rebuild doc mutation logic locally. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N4.4 Move command handlers and task materialization callers onto the shared doc path
    
    Implement N4.4 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: these callers no longer rebuild doc mutation logic locally. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N4.4 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: these callers no longer rebuild doc mutation logic locally. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N4.4 Move command handlers and task materialization callers onto the shared doc path".
  Plan: |-
    1. Audit `task/doc.ts`, `task/plan.ts`, `task/migrate-doc.ts`, `task/verify-record.ts`, runner/task materialization helpers and isolate the narrowest change set that satisfies N4.4.
    2. Implement move command handlers and task materialization callers onto the shared doc path with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `task/doc.ts`, `task/plan.ts`, `task/migrate-doc.ts`, `task/verify-record.ts`, runner/task materialization helpers. Expected: the behavior targeted by N4.4 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-5K9CNK. Expected: scope stays anchored to `task/doc.ts`, `task/plan.ts`, `task/migrate-doc.ts`, `task/verify-record.ts`, runner/task materialization helpers plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: these callers no longer rebuild doc mutation logic locally.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T18:25:30.412Z — VERIFY — ok
    
    By: CODER
    
    Note: Moved task doc/plan/verify flows onto applyTaskMutation plus shared doc-state materializers for new/derive/scenario paths; verified with eslint, focused vitest slice (doc/plan/verify/parity/scenario/migrate-doc), and agentplane build.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T18:02:30.629Z, excerpt_hash=sha256:039bd794bfcbdce2bbd551d30239a44e9d4bfdb0a9b315604ed16d6ecd4f97fd
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N4.4 Move command handlers and task materialization callers onto the shared doc path

Implement N4.4 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: these callers no longer rebuild doc mutation logic locally. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N4.4 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: these callers no longer rebuild doc mutation logic locally. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N4.4 Move command handlers and task materialization callers onto the shared doc path".

## Plan

1. Audit `task/doc.ts`, `task/plan.ts`, `task/migrate-doc.ts`, `task/verify-record.ts`, runner/task materialization helpers and isolate the narrowest change set that satisfies N4.4.
2. Implement move command handlers and task materialization callers onto the shared doc path with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `task/doc.ts`, `task/plan.ts`, `task/migrate-doc.ts`, `task/verify-record.ts`, runner/task materialization helpers. Expected: the behavior targeted by N4.4 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-5K9CNK. Expected: scope stays anchored to `task/doc.ts`, `task/plan.ts`, `task/migrate-doc.ts`, `task/verify-record.ts`, runner/task materialization helpers plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: these callers no longer rebuild doc mutation logic locally.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T18:25:30.412Z — VERIFY — ok

By: CODER

Note: Moved task doc/plan/verify flows onto applyTaskMutation plus shared doc-state materializers for new/derive/scenario paths; verified with eslint, focused vitest slice (doc/plan/verify/parity/scenario/migrate-doc), and agentplane build.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T18:02:30.629Z, excerpt_hash=sha256:039bd794bfcbdce2bbd551d30239a44e9d4bfdb0a9b315604ed16d6ecd4f97fd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
