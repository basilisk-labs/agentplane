---
id: "202603081145-TFHVGW"
title: "Preserve README v3 doc_version through task store updates and export"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T11:46:18.526Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T11:49:09.918Z"
  updated_by: "CODER"
  note: "Task-store writes now preserve doc_version=3 instead of normalizing migrated task READMEs back to v2; focused task-store/tasks-export tests passed, agentplane task migrate-doc --all plus task export now leave the repository on README v3, and doctor no longer reports a false active legacy README v2 warning."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fix the task-store write/export path so README v3 doc_version survives updates, task export, and doctor diagnostics."
events:
  -
    type: "status"
    at: "2026-03-08T11:46:19.111Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix the task-store write/export path so README v3 doc_version survives updates, task export, and doctor diagnostics."
  -
    type: "verify"
    at: "2026-03-08T11:49:09.918Z"
    author: "CODER"
    state: "ok"
    note: "Task-store writes now preserve doc_version=3 instead of normalizing migrated task READMEs back to v2; focused task-store/tasks-export tests passed, agentplane task migrate-doc --all plus task export now leave the repository on README v3, and doctor no longer reports a false active legacy README v2 warning."
doc_version: 3
doc_updated_at: "2026-03-08T11:49:09.920Z"
doc_updated_by: "CODER"
description: "Fix task store update/export paths so migrated README v3 tasks keep doc_version=3 in frontmatter snapshots, task export, and doctor diagnostics instead of being normalized back to legacy v2."
id_source: "generated"
---
## Summary

Preserve README v3 doc_version through task store updates and export

Fix task store update/export paths so migrated README v3 tasks keep doc_version=3 in frontmatter snapshots, task export, and doctor diagnostics instead of being normalized back to legacy v2.

## Scope

- In scope: Fix task store update/export paths so migrated README v3 tasks keep doc_version=3 in frontmatter snapshots, task export, and doctor diagnostics instead of being normalized back to legacy v2..
- Out of scope: unrelated refactors not required for "Preserve README v3 doc_version through task store updates and export".

## Plan

1. Reproduce where README v3 doc_version is lost during task-store writes and export, using the current repository migration state plus a focused regression test. 2. Fix the task-store write path so doc_version=3 is preserved when README docs are updated, while legacy v2 compatibility remains intact for unchanged legacy tasks. 3. Re-run the focused task-store/task-export checks, then resume the archive migration flow on top of the fixed runtime behavior.

## Verify Steps

1. Reproduce the failing path in a focused test or fixture. Expected: README v3 tasks keep doc_version=3 instead of being normalized back to doc_version=2 during task-store updates. 2. Run focused task-store and tasks-export tests. Expected: task updates preserve doc_version=3 and exported snapshots reflect the same version. 3. Re-run the archive migration follow-up checks. Expected: doctor and task export can observe migrated task docs without a false active legacy v2 warning.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T11:49:09.918Z — VERIFY — ok

By: CODER

Note: Task-store writes now preserve doc_version=3 instead of normalizing migrated task READMEs back to v2; focused task-store/tasks-export tests passed, agentplane task migrate-doc --all plus task export now leave the repository on README v3, and doctor no longer reports a false active legacy README v2 warning.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T11:46:19.111Z, excerpt_hash=sha256:3fb63e3f15b43ac4b2ade8f810b4feb67607df2471b50bd64c6946726910f46e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
