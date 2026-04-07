---
id: "202604070443-CB3N4G"
title: "Prefer fresher branch task snapshots during integrate incident collection"
result_summary: "integrate: squash task/202604070443-CB3N4G/integrate-fresh-task-snapshot"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "incidents"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-07T05:15:26.110Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-07T05:24:19.686Z"
  updated_by: "CODER"
  note: "Focused task-backend/integrate vitest suite and ESLint passed; repo-local bootstrap rebuild passed after touched src changes."
commit:
  hash: "d1fc846add11321d63fe2fa856b08fd9b8213c7c"
  message: "📝 CB3N4G task: record GitHub PR metadata"
comments:
  -
    author: "CODER"
    body: "Start: implement integrate-only preference for fresher branch task snapshots during incident collection."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604070443-CB3N4G/pr."
events:
  -
    type: "status"
    at: "2026-04-07T05:16:49.877Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement integrate-only preference for fresher branch task snapshots during incident collection."
  -
    type: "verify"
    at: "2026-04-07T05:24:19.686Z"
    author: "CODER"
    state: "ok"
    note: "Focused task-backend/integrate vitest suite and ESLint passed; repo-local bootstrap rebuild passed after touched src changes."
  -
    type: "status"
    at: "2026-04-07T05:36:08.813Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604070443-CB3N4G/pr."
doc_version: 3
doc_updated_at: "2026-04-07T05:36:08.831Z"
doc_updated_by: "INTEGRATOR"
description: "Make integrate incident collection prefer a branch-backed task README when it is newer than the stale base snapshot so operator-facing diagnostics reflect the branch being merged."
sections:
  Summary: |-
    Prefer fresher branch task snapshots during integrate incident collection
    
    Make integrate incident collection prefer a branch-backed task README when it is newer than the stale base snapshot so operator-facing diagnostics reflect the branch being merged.
  Scope: |-
    - In scope: Make integrate incident collection prefer a branch-backed task README when it is newer than the stale base snapshot so operator-facing diagnostics reflect the branch being merged.
    - Out of scope: unrelated refactors not required for "Prefer fresher branch task snapshots during integrate incident collection".
  Plan: "1. Trace integrate incident collection call sites and identify where base snapshots override fresher branch task README state. 2. Implement a narrow freshness preference for integrate-time task loading without changing default task resolution for other commands. 3. Add focused tests for task-backend/integrate paths and record verification evidence."
  Verify Steps: |-
    1. Exercise the integrate-time task loading path with a stale base task snapshot plus a newer branch README. Expected: integrate-scoped incident collection uses the fresher branch-backed task state in diagnostics.
    2. Exercise a non-integrate task loading path with the same stale/fresh inputs. Expected: default task resolution remains unchanged outside integrate-specific callers.
    3. Run focused task-backend and integrate tests covering the new precedence rule. Expected: touched tests pass without widening branch precedence globally.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-07T05:24:19.686Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused task-backend/integrate vitest suite and ESLint passed; repo-local bootstrap rebuild passed after touched src changes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T05:16:49.895Z, excerpt_hash=sha256:950d5d6e6de616bb2470c27ac4dfec6b3bdff965d4ac8ecbd3b6c76266637313
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prefer fresher branch task snapshots during integrate incident collection

Make integrate incident collection prefer a branch-backed task README when it is newer than the stale base snapshot so operator-facing diagnostics reflect the branch being merged.

## Scope

- In scope: Make integrate incident collection prefer a branch-backed task README when it is newer than the stale base snapshot so operator-facing diagnostics reflect the branch being merged.
- Out of scope: unrelated refactors not required for "Prefer fresher branch task snapshots during integrate incident collection".

## Plan

1. Trace integrate incident collection call sites and identify where base snapshots override fresher branch task README state. 2. Implement a narrow freshness preference for integrate-time task loading without changing default task resolution for other commands. 3. Add focused tests for task-backend/integrate paths and record verification evidence.

## Verify Steps

1. Exercise the integrate-time task loading path with a stale base task snapshot plus a newer branch README. Expected: integrate-scoped incident collection uses the fresher branch-backed task state in diagnostics.
2. Exercise a non-integrate task loading path with the same stale/fresh inputs. Expected: default task resolution remains unchanged outside integrate-specific callers.
3. Run focused task-backend and integrate tests covering the new precedence rule. Expected: touched tests pass without widening branch precedence globally.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-07T05:24:19.686Z — VERIFY — ok

By: CODER

Note: Focused task-backend/integrate vitest suite and ESLint passed; repo-local bootstrap rebuild passed after touched src changes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T05:16:49.895Z, excerpt_hash=sha256:950d5d6e6de616bb2470c27ac4dfec6b3bdff965d4ac8ecbd3b6c76266637313

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
