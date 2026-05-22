---
id: "202605221726-R90HC5"
title: "Enforce batch primary task artifact scaffold"
result_summary: "Merged via PR #4025."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit:
  hash: "2af1dc2325ea7d7818f285890f163aae46cc1b0f"
  message: "Merge pull request #4025 from basilisk-labs/task/202605221726-R90HC5/register-open-backlog"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4025 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-22T18:21:30.242Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: PR #4025 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-22T18:21:30.247Z"
doc_updated_by: "INTEGRATOR"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
