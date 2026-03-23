---
id: "202603231736-WZPA48"
title: "Make finish transactionally persist task closure"
result_summary: "finish: deterministic commit provenance and preflight gating"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T17:39:28.832Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T17:55:21.336Z"
  updated_by: "CODER"
  note: "Implemented deterministic finish provenance and preflight gating; verified with targeted finish/workflow vitest slices, source builds, and doctor."
commit:
  hash: "b9cc816520ff9e96a1b3424f832fdece247ed5a8"
  message: "✅ WZPA48 code: done"
comments:
  -
    author: "CODER"
    body: "Start: refactor finish into explicit preflight, commit, persist, and amend phases so DONE and commit metadata are written only after git side effects succeed and failure paths do not leave partial closure state."
  -
    author: "CODER"
    body: "Verified: Refactored finish preflight to reject implicit HEAD fallback, require deterministic implementation commit provenance, and pass the updated finish contract through workflow, readiness, smoke, and integrate flows."
events:
  -
    type: "status"
    at: "2026-03-23T17:39:37.513Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: refactor finish into explicit preflight, commit, persist, and amend phases so DONE and commit metadata are written only after git side effects succeed and failure paths do not leave partial closure state."
  -
    type: "verify"
    at: "2026-03-23T17:55:21.336Z"
    author: "CODER"
    state: "ok"
    note: "Implemented deterministic finish provenance and preflight gating; verified with targeted finish/workflow vitest slices, source builds, and doctor."
  -
    type: "status"
    at: "2026-03-23T17:56:12.598Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Refactored finish preflight to reject implicit HEAD fallback, require deterministic implementation commit provenance, and pass the updated finish contract through workflow, readiness, smoke, and integrate flows."
doc_version: 3
doc_updated_at: "2026-03-23T17:56:12.598Z"
doc_updated_by: "CODER"
description: "Split finish into preflight, commit, persist, and amend phases so policy gates and commit metadata stay consistent without partial DONE state writes."
sections:
  Summary: |-
    Make finish transactionally persist task closure
    
    Split finish into preflight, commit, persist, and amend phases so policy gates and commit metadata stay consistent without partial DONE state writes.
  Scope: |-
    - In scope: Split finish into preflight, commit, persist, and amend phases so policy gates and commit metadata stay consistent without partial DONE state writes.
    - Out of scope: unrelated refactors not required for "Make finish transactionally persist task closure".
  Plan: |-
    1. Refactor finish into explicit preflight, git side-effect, task persist, and README amend phases with no DONE transition before all gates pass.
    2. Remove fallback recording of arbitrary HEAD for implementation commit metadata and require deterministic commit provenance for finish paths.
    3. Expand lifecycle tests around commit-from-comment, status-commit, and failure rollback so finish leaves no partial task state on git errors.
  Verify Steps: |-
    1. Run targeted finish lifecycle tests covering commit-from-comment and status-commit failure paths. Expected: no path leaves the task in DONE before git side effects succeed.
    2. Reproduce a commit failure in an isolated test repo. Expected: task state remains pre-finish and commit metadata does not record arbitrary HEAD.
    3. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: lifecycle refactor stays source-build clean.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T17:55:21.336Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented deterministic finish provenance and preflight gating; verified with targeted finish/workflow vitest slices, source builds, and doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T17:39:37.514Z, excerpt_hash=sha256:6b196938f3c4eec2e9a2f197ba2c779412e328980a41046650d83b14fe7de998
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make finish transactionally persist task closure

Split finish into preflight, commit, persist, and amend phases so policy gates and commit metadata stay consistent without partial DONE state writes.

## Scope

- In scope: Split finish into preflight, commit, persist, and amend phases so policy gates and commit metadata stay consistent without partial DONE state writes.
- Out of scope: unrelated refactors not required for "Make finish transactionally persist task closure".

## Plan

1. Refactor finish into explicit preflight, git side-effect, task persist, and README amend phases with no DONE transition before all gates pass.
2. Remove fallback recording of arbitrary HEAD for implementation commit metadata and require deterministic commit provenance for finish paths.
3. Expand lifecycle tests around commit-from-comment, status-commit, and failure rollback so finish leaves no partial task state on git errors.

## Verify Steps

1. Run targeted finish lifecycle tests covering commit-from-comment and status-commit failure paths. Expected: no path leaves the task in DONE before git side effects succeed.
2. Reproduce a commit failure in an isolated test repo. Expected: task state remains pre-finish and commit metadata does not record arbitrary HEAD.
3. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: lifecycle refactor stays source-build clean.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T17:55:21.336Z — VERIFY — ok

By: CODER

Note: Implemented deterministic finish provenance and preflight gating; verified with targeted finish/workflow vitest slices, source builds, and doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T17:39:37.514Z, excerpt_hash=sha256:6b196938f3c4eec2e9a2f197ba2c779412e328980a41046650d83b14fe7de998

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
