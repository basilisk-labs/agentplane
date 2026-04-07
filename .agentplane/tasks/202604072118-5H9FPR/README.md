---
id: "202604072118-5H9FPR"
title: "Promote incidents during hosted merge reconciliation"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 7
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
  updated_at: "2026-04-07T21:18:58.016Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-07T21:39:08.621Z"
  updated_by: "CODER"
  note: "Repo-local bootstrap refreshed; targeted normalize-migrate vitest passed with hosted/local incident promotion coverage; focused eslint on normalize/test files passed."
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-04-07T21:35:58.696Z"
    author: "CODER"
    state: "ok"
    note: "Targeted normalize-migrate vitest passed with hosted/local incident promotion coverage; focused eslint on normalize/test files passed."
  -
    type: "verify"
    at: "2026-04-07T21:37:25.196Z"
    author: "CODER"
    state: "ok"
    note: "Repo-local bootstrap refreshed; targeted normalize-migrate vitest passed with hosted/local incident promotion coverage; focused eslint on normalize/test files passed."
  -
    type: "verify"
    at: "2026-04-07T21:39:08.621Z"
    author: "CODER"
    state: "ok"
    note: "Repo-local bootstrap refreshed; targeted normalize-migrate vitest passed with hosted/local incident promotion coverage; focused eslint on normalize/test files passed."
doc_version: 3
doc_updated_at: "2026-04-07T21:39:08.631Z"
doc_updated_by: "CODER"
description: "Make branch_pr hosted/local reconcile paths update incidents.md when DONE task findings contain promotable external incident entries, instead of only updating task projection metadata."
sections:
  Summary: |-
    Promote incidents during hosted merge reconciliation
    
    Make branch_pr hosted/local reconcile paths update incidents.md when DONE task findings contain promotable external incident entries, instead of only updating task projection metadata.
  Scope: |-
    - In scope: Make branch_pr hosted/local reconcile paths update incidents.md when DONE task findings contain promotable external incident entries, instead of only updating task projection metadata.
    - Out of scope: unrelated refactors not required for "Promote incidents during hosted merge reconciliation".
  Plan: "1. Inspect hosted/local branch_pr reconciliation paths and identify where DONE-state sync updates task metadata without collecting incidents. 2. Reuse the existing incidents collection helper in those reconciliation paths so promotable external Findings update .agentplane/policy/incidents.md and its asset mirror during reconcile. 3. Add focused regression coverage for hosted merge sync and local shipped-state sync proving both task status and incidents registry update together. 4. Verify with targeted vitest, eslint, and a fresh framework bootstrap if touched runtime snapshots require it."
  Verify Steps: "1. Run targeted hosted/local reconcile tests. Expected: reconcile marks the task DONE and promotes any promotable external Findings into .agentplane/policy/incidents.md. 2. Run a negative coverage slice. Expected: reconcile still leaves incidents.md unchanged when there are no structured promotable findings. 3. Run focused eslint on touched reconcile/incidents files. Expected: new shared promotion path stays lint-clean."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-07T21:35:58.696Z — VERIFY — ok
    
    By: CODER
    
    Note: Targeted normalize-migrate vitest passed with hosted/local incident promotion coverage; focused eslint on normalize/test files passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T21:18:57.561Z, excerpt_hash=sha256:fcb2a43d9f33433b389cc3ddf09f60cf03cc3c983cdeb6baf2a7ec9871368f21
    
    ### 2026-04-07T21:37:25.196Z — VERIFY — ok
    
    By: CODER
    
    Note: Repo-local bootstrap refreshed; targeted normalize-migrate vitest passed with hosted/local incident promotion coverage; focused eslint on normalize/test files passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T21:35:58.700Z, excerpt_hash=sha256:fcb2a43d9f33433b389cc3ddf09f60cf03cc3c983cdeb6baf2a7ec9871368f21
    
    ### 2026-04-07T21:39:08.621Z — VERIFY — ok
    
    By: CODER
    
    Note: Repo-local bootstrap refreshed; targeted normalize-migrate vitest passed with hosted/local incident promotion coverage; focused eslint on normalize/test files passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T21:37:25.202Z, excerpt_hash=sha256:fcb2a43d9f33433b389cc3ddf09f60cf03cc3c983cdeb6baf2a7ec9871368f21
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Promote incidents during hosted merge reconciliation

Make branch_pr hosted/local reconcile paths update incidents.md when DONE task findings contain promotable external incident entries, instead of only updating task projection metadata.

## Scope

- In scope: Make branch_pr hosted/local reconcile paths update incidents.md when DONE task findings contain promotable external incident entries, instead of only updating task projection metadata.
- Out of scope: unrelated refactors not required for "Promote incidents during hosted merge reconciliation".

## Plan

1. Inspect hosted/local branch_pr reconciliation paths and identify where DONE-state sync updates task metadata without collecting incidents. 2. Reuse the existing incidents collection helper in those reconciliation paths so promotable external Findings update .agentplane/policy/incidents.md and its asset mirror during reconcile. 3. Add focused regression coverage for hosted merge sync and local shipped-state sync proving both task status and incidents registry update together. 4. Verify with targeted vitest, eslint, and a fresh framework bootstrap if touched runtime snapshots require it.

## Verify Steps

1. Run targeted hosted/local reconcile tests. Expected: reconcile marks the task DONE and promotes any promotable external Findings into .agentplane/policy/incidents.md. 2. Run a negative coverage slice. Expected: reconcile still leaves incidents.md unchanged when there are no structured promotable findings. 3. Run focused eslint on touched reconcile/incidents files. Expected: new shared promotion path stays lint-clean.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-07T21:35:58.696Z — VERIFY — ok

By: CODER

Note: Targeted normalize-migrate vitest passed with hosted/local incident promotion coverage; focused eslint on normalize/test files passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T21:18:57.561Z, excerpt_hash=sha256:fcb2a43d9f33433b389cc3ddf09f60cf03cc3c983cdeb6baf2a7ec9871368f21

### 2026-04-07T21:37:25.196Z — VERIFY — ok

By: CODER

Note: Repo-local bootstrap refreshed; targeted normalize-migrate vitest passed with hosted/local incident promotion coverage; focused eslint on normalize/test files passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T21:35:58.700Z, excerpt_hash=sha256:fcb2a43d9f33433b389cc3ddf09f60cf03cc3c983cdeb6baf2a7ec9871368f21

### 2026-04-07T21:39:08.621Z — VERIFY — ok

By: CODER

Note: Repo-local bootstrap refreshed; targeted normalize-migrate vitest passed with hosted/local incident promotion coverage; focused eslint on normalize/test files passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T21:37:25.202Z, excerpt_hash=sha256:fcb2a43d9f33433b389cc3ddf09f60cf03cc3c983cdeb6baf2a7ec9871368f21

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
