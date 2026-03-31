---
id: "202603311332-ACCPE4"
title: "N4.1 Define the shared doc mutation contract"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603311331-QDTKY4"
tags:
  - "code"
  - "refactor"
  - "backend"
  - "task-doc"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T17:21:30.646Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T17:36:44.911Z"
  updated_by: "CODER"
  note: "Shared doc mutation contract verified with focused eslint, core/shared task-store vitest suites, package builds, bootstrap, diff scope audit, and an explicit no-dist lint check; doc replacement, section replacement, and doc-meta touch now share one pure core mutation model, and workspace path resolution no longer depends on stale core dist during integrate."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: define one pure shared doc mutation contract in core, keep the first diff limited to contract extraction plus the earliest safe adopters, and avoid pulling local-backend orchestration into this task before the seam is proven."
events:
  -
    type: "status"
    at: "2026-03-31T17:22:14.998Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: define one pure shared doc mutation contract in core, keep the first diff limited to contract extraction plus the earliest safe adopters, and avoid pulling local-backend orchestration into this task before the seam is proven."
  -
    type: "verify"
    at: "2026-03-31T17:31:10.504Z"
    author: "CODER"
    state: "ok"
    note: "Shared doc mutation contract verified with focused eslint, core/shared task-store vitest suites, package builds, bootstrap, and diff scope audit; doc replacement, section replacement, and doc-meta touch now flow through one pure core mutation model."
  -
    type: "verify"
    at: "2026-03-31T17:36:44.911Z"
    author: "CODER"
    state: "ok"
    note: "Shared doc mutation contract verified with focused eslint, core/shared task-store vitest suites, package builds, bootstrap, diff scope audit, and an explicit no-dist lint check; doc replacement, section replacement, and doc-meta touch now share one pure core mutation model, and workspace path resolution no longer depends on stale core dist during integrate."
doc_version: 3
doc_updated_at: "2026-03-31T17:36:44.916Z"
doc_updated_by: "CODER"
description: "Implement N4.1 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: section replacement, full-doc replacement, and doc-meta touch share one explicit mutation model. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N4.1 Define the shared doc mutation contract
    
    Implement N4.1 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: section replacement, full-doc replacement, and doc-meta touch share one explicit mutation model. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N4.1 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: section replacement, full-doc replacement, and doc-meta touch share one explicit mutation model. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N4.1 Define the shared doc mutation contract".
  Plan: |-
    1. Audit `packages/core/src/tasks/*`, `packages/agentplane/src/commands/shared/task-store.ts` and isolate the narrowest change set that satisfies N4.1.
    2. Implement define the shared doc mutation contract with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/core/src/tasks/*`, `packages/agentplane/src/commands/shared/task-store.ts`. Expected: the behavior targeted by N4.1 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-ACCPE4. Expected: scope stays anchored to `packages/core/src/tasks/*`, `packages/agentplane/src/commands/shared/task-store.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: section replacement, full-doc replacement, and doc-meta touch share one explicit mutation model.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T17:31:10.504Z — VERIFY — ok
    
    By: CODER
    
    Note: Shared doc mutation contract verified with focused eslint, core/shared task-store vitest suites, package builds, bootstrap, and diff scope audit; doc replacement, section replacement, and doc-meta touch now flow through one pure core mutation model.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T17:22:15.016Z, excerpt_hash=sha256:1ef843bb44d461acaaf30cb52e8bb78325709f3ac199792b0ee5e194707392da
    
    ### 2026-03-31T17:36:44.911Z — VERIFY — ok
    
    By: CODER
    
    Note: Shared doc mutation contract verified with focused eslint, core/shared task-store vitest suites, package builds, bootstrap, diff scope audit, and an explicit no-dist lint check; doc replacement, section replacement, and doc-meta touch now share one pure core mutation model, and workspace path resolution no longer depends on stale core dist during integrate.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T17:31:10.534Z, excerpt_hash=sha256:1ef843bb44d461acaaf30cb52e8bb78325709f3ac199792b0ee5e194707392da
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N4.1 Define the shared doc mutation contract

Implement N4.1 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: section replacement, full-doc replacement, and doc-meta touch share one explicit mutation model. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N4.1 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: section replacement, full-doc replacement, and doc-meta touch share one explicit mutation model. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N4.1 Define the shared doc mutation contract".

## Plan

1. Audit `packages/core/src/tasks/*`, `packages/agentplane/src/commands/shared/task-store.ts` and isolate the narrowest change set that satisfies N4.1.
2. Implement define the shared doc mutation contract with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `packages/core/src/tasks/*`, `packages/agentplane/src/commands/shared/task-store.ts`. Expected: the behavior targeted by N4.1 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-ACCPE4. Expected: scope stays anchored to `packages/core/src/tasks/*`, `packages/agentplane/src/commands/shared/task-store.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: section replacement, full-doc replacement, and doc-meta touch share one explicit mutation model.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T17:31:10.504Z — VERIFY — ok

By: CODER

Note: Shared doc mutation contract verified with focused eslint, core/shared task-store vitest suites, package builds, bootstrap, and diff scope audit; doc replacement, section replacement, and doc-meta touch now flow through one pure core mutation model.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T17:22:15.016Z, excerpt_hash=sha256:1ef843bb44d461acaaf30cb52e8bb78325709f3ac199792b0ee5e194707392da

### 2026-03-31T17:36:44.911Z — VERIFY — ok

By: CODER

Note: Shared doc mutation contract verified with focused eslint, core/shared task-store vitest suites, package builds, bootstrap, diff scope audit, and an explicit no-dist lint check; doc replacement, section replacement, and doc-meta touch now share one pure core mutation model, and workspace path resolution no longer depends on stale core dist during integrate.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T17:31:10.534Z, excerpt_hash=sha256:1ef843bb44d461acaaf30cb52e8bb78325709f3ac199792b0ee5e194707392da

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
