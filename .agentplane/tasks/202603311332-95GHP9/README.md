---
id: "202603311332-95GHP9"
title: "N4.2 Reuse shared doc mutation primitives inside the local backend and task store"
result_summary: "integrate: squash task/202603311332-95GHP9/reuse-doc-mutation-primitives"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603311332-ACCPE4"
tags:
  - "code"
  - "refactor"
  - "backend"
  - "task-doc"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T17:39:18.082Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T17:48:25.610Z"
  updated_by: "CODER"
  note: "Shared doc mutation primitives now drive local backend doc writes and task-store doc state updates; verified with focused eslint, local-backend/task-store vitest suites, redmine backend regression suite, package build, and diff scope audit against local-backend plus task-store seam changes."
commit:
  hash: "1c5a9480fca234d269b21580511ec1a2214bb283"
  message: "📝 95GHP9 task: finalize PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: move local backend and shared task-store doc writes onto the new core mutation primitives, delete overlapping patch logic, and keep behavior fixed while reducing one more cross-layer seam."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311332-95GHP9/pr."
events:
  -
    type: "status"
    at: "2026-03-31T17:39:53.623Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: move local backend and shared task-store doc writes onto the new core mutation primitives, delete overlapping patch logic, and keep behavior fixed while reducing one more cross-layer seam."
  -
    type: "verify"
    at: "2026-03-31T17:48:25.610Z"
    author: "CODER"
    state: "ok"
    note: "Shared doc mutation primitives now drive local backend doc writes and task-store doc state updates; verified with focused eslint, local-backend/task-store vitest suites, redmine backend regression suite, package build, and diff scope audit against local-backend plus task-store seam changes."
  -
    type: "status"
    at: "2026-03-31T17:49:53.340Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311332-95GHP9/pr."
doc_version: 3
doc_updated_at: "2026-03-31T17:49:53.345Z"
doc_updated_by: "INTEGRATOR"
description: "Implement N4.2 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: those modules stop carrying their own overlapping doc patch application logic. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N4.2 Reuse shared doc mutation primitives inside the local backend and task store
    
    Implement N4.2 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: those modules stop carrying their own overlapping doc patch application logic. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N4.2 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: those modules stop carrying their own overlapping doc patch application logic. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N4.2 Reuse shared doc mutation primitives inside the local backend and task store".
  Plan: |-
    1. Audit `backends/task-backend/local-backend.ts`, `commands/shared/task-store.ts` and isolate the narrowest change set that satisfies N4.2.
    2. Implement reuse shared doc mutation primitives inside the local backend and task store with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `backends/task-backend/local-backend.ts`, `commands/shared/task-store.ts`. Expected: the behavior targeted by N4.2 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-95GHP9. Expected: scope stays anchored to `backends/task-backend/local-backend.ts`, `commands/shared/task-store.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: those modules stop carrying their own overlapping doc patch application logic.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T17:48:25.610Z — VERIFY — ok
    
    By: CODER
    
    Note: Shared doc mutation primitives now drive local backend doc writes and task-store doc state updates; verified with focused eslint, local-backend/task-store vitest suites, redmine backend regression suite, package build, and diff scope audit against local-backend plus task-store seam changes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T17:39:53.641Z, excerpt_hash=sha256:4fcc38cb90f0fea392cd66dde87b0e7863c580318d829b11f5ca0da156f598dd
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N4.2 Reuse shared doc mutation primitives inside the local backend and task store

Implement N4.2 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: those modules stop carrying their own overlapping doc patch application logic. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N4.2 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: those modules stop carrying their own overlapping doc patch application logic. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N4.2 Reuse shared doc mutation primitives inside the local backend and task store".

## Plan

1. Audit `backends/task-backend/local-backend.ts`, `commands/shared/task-store.ts` and isolate the narrowest change set that satisfies N4.2.
2. Implement reuse shared doc mutation primitives inside the local backend and task store with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `backends/task-backend/local-backend.ts`, `commands/shared/task-store.ts`. Expected: the behavior targeted by N4.2 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-95GHP9. Expected: scope stays anchored to `backends/task-backend/local-backend.ts`, `commands/shared/task-store.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: those modules stop carrying their own overlapping doc patch application logic.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T17:48:25.610Z — VERIFY — ok

By: CODER

Note: Shared doc mutation primitives now drive local backend doc writes and task-store doc state updates; verified with focused eslint, local-backend/task-store vitest suites, redmine backend regression suite, package build, and diff scope audit against local-backend plus task-store seam changes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T17:39:53.641Z, excerpt_hash=sha256:4fcc38cb90f0fea392cd66dde87b0e7863c580318d829b11f5ca0da156f598dd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
