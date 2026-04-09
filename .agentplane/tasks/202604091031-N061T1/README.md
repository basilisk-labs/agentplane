---
id: "202604091031-N061T1"
title: "Repair malformed task directories blocking reconcile"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "tasks"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T10:31:19.721Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: repair malformed task directories on the base checkout so strict task scans stop blocking integrate, while preserving live branch_pr task state and deleting only abandoned empty scaffolds."
events:
  -
    type: "status"
    at: "2026-04-09T10:33:37.136Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair malformed task directories on the base checkout so strict task scans stop blocking integrate, while preserving live branch_pr task state and deleting only abandoned empty scaffolds."
doc_version: 3
doc_updated_at: "2026-04-09T10:33:37.147Z"
doc_updated_by: "CODER"
description: "Restore or remove empty .agentplane/tasks/<id> directories without README.md so strict task scans stop blocking integrate and other mutating branch_pr commands."
sections:
  Summary: |-
    Repair malformed task directories blocking reconcile
    
    Restore or remove empty .agentplane/tasks/<id> directories without README.md so strict task scans stop blocking integrate and other mutating branch_pr commands.
  Scope: |-
    - In scope: Restore or remove empty .agentplane/tasks/<id> directories without README.md so strict task scans stop blocking integrate and other mutating branch_pr commands.
    - Out of scope: unrelated refactors not required for "Repair malformed task directories blocking reconcile".
  Plan: "1. Enumerate every .agentplane/tasks directory missing README.md and classify each as live task, duplicate task, or abandoned scaffold. 2. Restore canonical README artifacts for live tasks from their task worktrees and remove empty abandoned directories that have no legitimate task state. 3. Verify strict task scans pass and that branch_pr integrate is unblocked for the active shipment tasks."
  Verify Steps: |-
    1. Run `agentplane task list --strict-read`. Expected: the command completes without skipped or unreadable task README warnings.
    2. Run `agentplane pr check 202604091006-7HAZ1F`. Expected: task scan preflight passes and the command reads PR artifacts instead of failing on malformed task directories.
    3. Inspect `git status --short --untracked-files=all`. Expected: only intentional repair-task files remain, with no new malformed `.agentplane/tasks/<id>` directories.
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

Repair malformed task directories blocking reconcile

Restore or remove empty .agentplane/tasks/<id> directories without README.md so strict task scans stop blocking integrate and other mutating branch_pr commands.

## Scope

- In scope: Restore or remove empty .agentplane/tasks/<id> directories without README.md so strict task scans stop blocking integrate and other mutating branch_pr commands.
- Out of scope: unrelated refactors not required for "Repair malformed task directories blocking reconcile".

## Plan

1. Enumerate every .agentplane/tasks directory missing README.md and classify each as live task, duplicate task, or abandoned scaffold. 2. Restore canonical README artifacts for live tasks from their task worktrees and remove empty abandoned directories that have no legitimate task state. 3. Verify strict task scans pass and that branch_pr integrate is unblocked for the active shipment tasks.

## Verify Steps

1. Run `agentplane task list --strict-read`. Expected: the command completes without skipped or unreadable task README warnings.
2. Run `agentplane pr check 202604091006-7HAZ1F`. Expected: task scan preflight passes and the command reads PR artifacts instead of failing on malformed task directories.
3. Inspect `git status --short --untracked-files=all`. Expected: only intentional repair-task files remain, with no new malformed `.agentplane/tasks/<id>` directories.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
