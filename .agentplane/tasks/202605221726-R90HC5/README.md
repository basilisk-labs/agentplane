---
id: "202605221726-R90HC5"
title: "Enforce batch primary task artifact scaffold"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "tasks"
  - "workflow"
verify:
  - "Confirm included tasks point to a valid primary task before start-ready."
  - "Run batch worktree scaffold tests for primary README and included-task manifest."
  - "Run task scanner tests for unreadable primary batch task diagnostics."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:26:40.882Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T18:26:24.720Z"
  updated_by: "CODER"
  note: "Verified: batch ownership metadata is written for primary and included tasks during pr open/update; included task route/status can resolve the primary PR branch from extensions.branch_pr_batch. Checks passed: targeted hosted-close batch test, batch validation/pr-meta/task-hosted-close tests, and bun run typecheck."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the batch primary scaffold guard in a dedicated worktree, focused on readable primary README validation and included-task ownership metadata before branch_pr execution."
events:
  -
    type: "status"
    at: "2026-05-22T18:21:30.246Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the batch primary scaffold guard in a dedicated worktree, focused on readable primary README validation and included-task ownership metadata before branch_pr execution."
  -
    type: "verify"
    at: "2026-05-22T18:26:24.720Z"
    author: "CODER"
    state: "ok"
    note: "Verified: batch ownership metadata is written for primary and included tasks during pr open/update; included task route/status can resolve the primary PR branch from extensions.branch_pr_batch. Checks passed: targeted hosted-close batch test, batch validation/pr-meta/task-hosted-close tests, and bun run typecheck."
doc_version: 3
doc_updated_at: "2026-05-22T18:26:24.734Z"
doc_updated_by: "CODER"
description: "Prevent shared batch worktrees from referencing a primary task that lacks a readable task README and explicit included-task manifest."
sections:
  Summary: |-
    Enforce batch primary task artifact scaffold

    Prevent shared batch worktrees from referencing a primary task that lacks a readable task README and explicit included-task manifest.
  Scope: |-
    - In scope: Prevent shared batch worktrees from referencing a primary task that lacks a readable task README and explicit included-task manifest.
    - Out of scope: unrelated refactors not required for "Enforce batch primary task artifact scaffold".
  Plan: "Add validation and repair guidance for batch worktrees so the primary task always has a readable README, approved plan, included task ids, and batch ownership metadata before included tasks are started. Detect missing primary artifacts during task list/status and work resume."
  Verify Steps: |-
    1. Run batch worktree scaffold tests for primary README and included-task manifest.
    2. Run task scanner tests for unreadable primary batch task diagnostics.
    3. Confirm included tasks point to a valid primary task before start-ready.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T18:26:24.720Z — VERIFY — ok

    By: CODER

    Note: Verified: batch ownership metadata is written for primary and included tasks during pr open/update; included task route/status can resolve the primary PR branch from extensions.branch_pr_batch. Checks passed: targeted hosted-close batch test, batch validation/pr-meta/task-hosted-close tests, and bun run typecheck.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T18:21:30.246Z, excerpt_hash=sha256:9d90f14064ed7eb2cd7bb8adc15372ee75d6fb0b919e9288ca614a1d830e25aa

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-R90HC5-batch-ownership-scaffold/.agentplane/tasks/202605221726-R90HC5/blueprint/resolved-snapshot.json
    - old_digest: d4fc3f9f7d78c29fade38585a7a20ff05ad4bfe2fbd05699c0f02981d596a517
    - current_digest: d4fc3f9f7d78c29fade38585a7a20ff05ad4bfe2fbd05699c0f02981d596a517
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221726-R90HC5

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Enforce batch primary task artifact scaffold

Prevent shared batch worktrees from referencing a primary task that lacks a readable task README and explicit included-task manifest.

## Scope

- In scope: Prevent shared batch worktrees from referencing a primary task that lacks a readable task README and explicit included-task manifest.
- Out of scope: unrelated refactors not required for "Enforce batch primary task artifact scaffold".

## Plan

Add validation and repair guidance for batch worktrees so the primary task always has a readable README, approved plan, included task ids, and batch ownership metadata before included tasks are started. Detect missing primary artifacts during task list/status and work resume.

## Verify Steps

1. Run batch worktree scaffold tests for primary README and included-task manifest.
2. Run task scanner tests for unreadable primary batch task diagnostics.
3. Confirm included tasks point to a valid primary task before start-ready.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T18:26:24.720Z — VERIFY — ok

By: CODER

Note: Verified: batch ownership metadata is written for primary and included tasks during pr open/update; included task route/status can resolve the primary PR branch from extensions.branch_pr_batch. Checks passed: targeted hosted-close batch test, batch validation/pr-meta/task-hosted-close tests, and bun run typecheck.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T18:21:30.246Z, excerpt_hash=sha256:9d90f14064ed7eb2cd7bb8adc15372ee75d6fb0b919e9288ca614a1d830e25aa

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-R90HC5-batch-ownership-scaffold/.agentplane/tasks/202605221726-R90HC5/blueprint/resolved-snapshot.json
- old_digest: d4fc3f9f7d78c29fade38585a7a20ff05ad4bfe2fbd05699c0f02981d596a517
- current_digest: d4fc3f9f7d78c29fade38585a7a20ff05ad4bfe2fbd05699c0f02981d596a517
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221726-R90HC5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
