---
id: "202603311332-3Z2AQ7"
title: "N5.2 Split `backends/task-backend/local-backend.ts` by read, doc, and write concerns"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603311331-81NZD4"
  - "202603311332-95GHP9"
tags:
  - "code"
  - "refactor"
  - "backend"
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
doc_updated_at: "2026-03-31T13:32:37.933Z"
doc_updated_by: "PLANNER"
description: "Implement N5.2 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: local backend read/index/doc/write responsibilities are separated behind small internal modules. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N5.2 Split `backends/task-backend/local-backend.ts` by read, doc, and write concerns
    
    Implement N5.2 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: local backend read/index/doc/write responsibilities are separated behind small internal modules. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N5.2 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: local backend read/index/doc/write responsibilities are separated behind small internal modules. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N5.2 Split `backends/task-backend/local-backend.ts` by read, doc, and write concerns".
  Plan: |-
    1. Audit the scoped modules named by this refactor item and isolate the narrowest change set that satisfies N5.2.
    2. Implement split `backends/task-backend/local-backend.ts` by read, doc, and write concerns with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering the scoped modules named by this refactor item. Expected: the behavior targeted by N5.2 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-3Z2AQ7. Expected: scope stays anchored to the scoped modules named by this refactor item plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: local backend read/index/doc/write responsibilities are separated behind small internal modules.
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

N5.2 Split `backends/task-backend/local-backend.ts` by read, doc, and write concerns

Implement N5.2 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: local backend read/index/doc/write responsibilities are separated behind small internal modules. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N5.2 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: local backend read/index/doc/write responsibilities are separated behind small internal modules. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N5.2 Split `backends/task-backend/local-backend.ts` by read, doc, and write concerns".

## Plan

1. Audit the scoped modules named by this refactor item and isolate the narrowest change set that satisfies N5.2.
2. Implement split `backends/task-backend/local-backend.ts` by read, doc, and write concerns with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering the scoped modules named by this refactor item. Expected: the behavior targeted by N5.2 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-3Z2AQ7. Expected: scope stays anchored to the scoped modules named by this refactor item plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: local backend read/index/doc/write responsibilities are separated behind small internal modules.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
