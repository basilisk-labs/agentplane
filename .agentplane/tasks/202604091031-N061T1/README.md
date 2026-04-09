---
id: "202604091031-N061T1"
title: "Repair malformed task directories blocking reconcile"
result_summary: "Restored malformed live task README artifacts and removed the abandoned empty scaffold that blocked reconcile."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-04-09T10:45:48.364Z"
  updated_by: "REVIEWER"
  note: "Strict task scans now pass after restoring canonical task README artifacts for live worktrees and pruning the abandoned empty scaffold; pr check for 7HAZ1F also passes again, so branch_pr integrate is unblocked."
commit:
  hash: "3c7228ffcdfd18b1133af3a7c8db5aef1d8f6967"
  message: "🧩 N061T1 task: restore malformed task readmes"
comments:
  -
    author: "CODER"
    body: "Start: repair malformed task directories on the base checkout so strict task scans stop blocking integrate, while preserving live branch_pr task state and deleting only abandoned empty scaffolds."
  -
    author: "INTEGRATOR"
    body: "Verified: strict task scans and branch_pr pr-check preflight are healthy again after restoring canonical task README artifacts and removing the abandoned empty scaffold."
events:
  -
    type: "status"
    at: "2026-04-09T10:33:37.136Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair malformed task directories on the base checkout so strict task scans stop blocking integrate, while preserving live branch_pr task state and deleting only abandoned empty scaffolds."
  -
    type: "verify"
    at: "2026-04-09T10:45:48.364Z"
    author: "REVIEWER"
    state: "ok"
    note: "Strict task scans now pass after restoring canonical task README artifacts for live worktrees and pruning the abandoned empty scaffold; pr check for 7HAZ1F also passes again, so branch_pr integrate is unblocked."
  -
    type: "status"
    at: "2026-04-09T10:45:52.958Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: strict task scans and branch_pr pr-check preflight are healthy again after restoring canonical task README artifacts and removing the abandoned empty scaffold."
doc_version: 3
doc_updated_at: "2026-04-09T10:45:52.959Z"
doc_updated_by: "INTEGRATOR"
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
    ### 2026-04-09T10:45:48.364Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: Strict task scans now pass after restoring canonical task README artifacts for live worktrees and pruning the abandoned empty scaffold; pr check for 7HAZ1F also passes again, so branch_pr integrate is unblocked.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T10:33:37.147Z, excerpt_hash=sha256:31285102b08d5ed9bcb2b31dde4fc867db2c914877506bb0c3cb08e1e763e0bc
    
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
### 2026-04-09T10:45:48.364Z — VERIFY — ok

By: REVIEWER

Note: Strict task scans now pass after restoring canonical task README artifacts for live worktrees and pruning the abandoned empty scaffold; pr check for 7HAZ1F also passes again, so branch_pr integrate is unblocked.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T10:33:37.147Z, excerpt_hash=sha256:31285102b08d5ed9bcb2b31dde4fc867db2c914877506bb0c3cb08e1e763e0bc

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
