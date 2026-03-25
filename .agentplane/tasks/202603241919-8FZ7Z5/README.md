---
id: "202603241919-8FZ7Z5"
title: "Workflow audit: remove remaining direct-main assumptions from integration and release guidance"
result_summary: "integrate: squash task/202603241919-8FZ7Z5/branch-pr-runtime-guidance"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603241918-0799YC"
  - "202603241919-QVGXZ5"
tags:
  - "code"
  - "workflow"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-25T06:26:48.487Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-25T06:30:04.244Z"
  updated_by: "CODER"
  note: "Removed the remaining branch_pr direct-main wording from runtime-generated startup/role guidance, regenerated the bootstrap doc, and verified build/command-guide test/prettier/eslint in touched scope."
commit:
  hash: "4939c723d03e20e4326517109c8dacc6149549d5"
  message: "📝 8FZ7Z5 tasks: persist branch_pr PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: align runtime-generated startup and integration guidance with the branch_pr remote-check gate and keep release-only push paths clearly separate."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603241919-8FZ7Z5/pr."
events:
  -
    type: "status"
    at: "2026-03-25T06:27:13.331Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align runtime-generated startup and integration guidance with the branch_pr remote-check gate and keep release-only push paths clearly separate."
  -
    type: "verify"
    at: "2026-03-25T06:30:04.244Z"
    author: "CODER"
    state: "ok"
    note: "Removed the remaining branch_pr direct-main wording from runtime-generated startup/role guidance, regenerated the bootstrap doc, and verified build/command-guide test/prettier/eslint in touched scope."
  -
    type: "status"
    at: "2026-03-25T06:31:11.133Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603241919-8FZ7Z5/pr."
doc_version: 3
doc_updated_at: "2026-03-25T06:31:11.133Z"
doc_updated_by: "INTEGRATOR"
description: "Audit integration and release surfaces for any remaining assumptions that ordinary task work can push directly to main, and align those surfaces with the branch_pr-first remote-green workflow."
sections:
  Summary: |-
    Workflow audit: remove remaining direct-main assumptions from integration and release guidance
    
    Audit integration and release surfaces for any remaining assumptions that ordinary task work can push directly to main, and align those surfaces with the branch_pr-first remote-green workflow.
  Scope: |-
    - In scope: Audit integration and release surfaces for any remaining assumptions that ordinary task work can push directly to main, and align those surfaces with the branch_pr-first remote-green workflow.
    - Out of scope: unrelated refactors not required for "Workflow audit: remove remaining direct-main assumptions from integration and release guidance".
  Plan: |-
    1. Audit runtime-generated startup and role guidance for branch_pr and remove any remaining assumption that ordinary task work can move main without an explicit remote-check gate.
    2. Update the affected guidance surfaces so branch_pr points to the hosted-check wait helper before integrate/finish, while keeping release-only push paths clearly separate from ordinary task work.
    3. Regenerate any derived docs artifacts and verify the guidance now matches the current branch_pr-first workflow contract.
  Verify Steps: |-
    1. Review the updated branch_pr startup and integration guidance. Expected: ordinary task work no longer reads like a direct-main flow and explicitly references the remote-check gate before integrate or finish.
    2. Regenerate or check the touched derived docs/help surface. Expected: generated guidance stays in sync with the source files.
    3. Run focused validation for the touched code/docs paths. Expected: checks pass in touched scope without regressions.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-25T06:30:04.244Z — VERIFY — ok
    
    By: CODER
    
    Note: Removed the remaining branch_pr direct-main wording from runtime-generated startup/role guidance, regenerated the bootstrap doc, and verified build/command-guide test/prettier/eslint in touched scope.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T06:27:13.332Z, excerpt_hash=sha256:6e12eece93e1f7ec32ac933ca13060b6649b81f376f771cea262fbf24136a0a3
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Workflow audit: remove remaining direct-main assumptions from integration and release guidance

Audit integration and release surfaces for any remaining assumptions that ordinary task work can push directly to main, and align those surfaces with the branch_pr-first remote-green workflow.

## Scope

- In scope: Audit integration and release surfaces for any remaining assumptions that ordinary task work can push directly to main, and align those surfaces with the branch_pr-first remote-green workflow.
- Out of scope: unrelated refactors not required for "Workflow audit: remove remaining direct-main assumptions from integration and release guidance".

## Plan

1. Audit runtime-generated startup and role guidance for branch_pr and remove any remaining assumption that ordinary task work can move main without an explicit remote-check gate.
2. Update the affected guidance surfaces so branch_pr points to the hosted-check wait helper before integrate/finish, while keeping release-only push paths clearly separate from ordinary task work.
3. Regenerate any derived docs artifacts and verify the guidance now matches the current branch_pr-first workflow contract.

## Verify Steps

1. Review the updated branch_pr startup and integration guidance. Expected: ordinary task work no longer reads like a direct-main flow and explicitly references the remote-check gate before integrate or finish.
2. Regenerate or check the touched derived docs/help surface. Expected: generated guidance stays in sync with the source files.
3. Run focused validation for the touched code/docs paths. Expected: checks pass in touched scope without regressions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-25T06:30:04.244Z — VERIFY — ok

By: CODER

Note: Removed the remaining branch_pr direct-main wording from runtime-generated startup/role guidance, regenerated the bootstrap doc, and verified build/command-guide test/prettier/eslint in touched scope.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T06:27:13.332Z, excerpt_hash=sha256:6e12eece93e1f7ec32ac933ca13060b6649b81f376f771cea262fbf24136a0a3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
