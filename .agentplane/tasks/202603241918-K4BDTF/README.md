---
id: "202603241918-K4BDTF"
title: "Docs: publish a branch_pr operating guide with remote-check waiting"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603241918-762TM7"
  - "202603241918-W2SFZ6"
tags:
  - "docs"
  - "workflow"
  - "pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T19:57:21.739Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-25T06:13:00.326Z"
  updated_by: "DOCS"
  note: "Reviewed the branch_pr guide text, confirmed the remote-check sequence is concrete, ran prettier on the touched docs, and matched agentplane/gh commands to the installed help surface."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: document the concrete branch_pr operating path for task branches, PR artifacts, remote check waiting, and merge only after GitHub required checks are green."
events:
  -
    type: "status"
    at: "2026-03-25T06:08:19.434Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: document the concrete branch_pr operating path for task branches, PR artifacts, remote check waiting, and merge only after GitHub required checks are green."
  -
    type: "verify"
    at: "2026-03-25T06:13:00.326Z"
    author: "DOCS"
    state: "ok"
    note: "Reviewed the branch_pr guide text, confirmed the remote-check sequence is concrete, ran prettier on the touched docs, and matched agentplane/gh commands to the installed help surface."
doc_version: 3
doc_updated_at: "2026-03-25T06:13:00.327Z"
doc_updated_by: "DOCS"
description: "Document the operational path for task branches, PR opening, waiting for remote checks, and merging only after green so the repository has a concrete remote-green-before-main workflow."
sections:
  Summary: |-
    Docs: publish a branch_pr operating guide with remote-check waiting
    
    Document the operational path for task branches, PR opening, waiting for remote checks, and merging only after green so the repository has a concrete remote-green-before-main workflow.
  Scope: |-
    - In scope: Document the operational path for task branches, PR opening, waiting for remote checks, and merging only after green so the repository has a concrete remote-green-before-main workflow.
    - Out of scope: unrelated refactors not required for "Docs: publish a branch_pr operating guide with remote-check waiting".
  Plan: |-
    1. Publish a user-facing branch_pr operating guide that covers work start, task branch/worktree, PR artifact flow, waiting for remote checks, and merge timing.
    2. Tie the guide to the actual shipped commands (`work start`, `pr open`, `gh pr checks`, `integrate`) instead of generic prose.
    3. Verify the resulting docs give a concrete remote-green-before-main operating path.
  Verify Steps: |-
    1. Review the new branch_pr operating guide text. Expected: it contains a concrete sequence for branch/worktree creation, PR opening, waiting for remote checks, and merge only after green.
    2. Run bunx prettier --check docs/user/*.md docs/developer/*.md. Expected: touched guide files stay formatted.
    3. Compare the documented command sequence against agentplane help output. Expected: commands and flags match the installed CLI surface.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-25T06:13:00.326Z — VERIFY — ok
    
    By: DOCS
    
    Note: Reviewed the branch_pr guide text, confirmed the remote-check sequence is concrete, ran prettier on the touched docs, and matched agentplane/gh commands to the installed help surface.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T06:08:19.435Z, excerpt_hash=sha256:01d7edd121e069e7af87ab448f4ee3104906618ea25ceb05c67c3e891d0c571c
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Docs: publish a branch_pr operating guide with remote-check waiting

Document the operational path for task branches, PR opening, waiting for remote checks, and merging only after green so the repository has a concrete remote-green-before-main workflow.

## Scope

- In scope: Document the operational path for task branches, PR opening, waiting for remote checks, and merging only after green so the repository has a concrete remote-green-before-main workflow.
- Out of scope: unrelated refactors not required for "Docs: publish a branch_pr operating guide with remote-check waiting".

## Plan

1. Publish a user-facing branch_pr operating guide that covers work start, task branch/worktree, PR artifact flow, waiting for remote checks, and merge timing.
2. Tie the guide to the actual shipped commands (`work start`, `pr open`, `gh pr checks`, `integrate`) instead of generic prose.
3. Verify the resulting docs give a concrete remote-green-before-main operating path.

## Verify Steps

1. Review the new branch_pr operating guide text. Expected: it contains a concrete sequence for branch/worktree creation, PR opening, waiting for remote checks, and merge only after green.
2. Run bunx prettier --check docs/user/*.md docs/developer/*.md. Expected: touched guide files stay formatted.
3. Compare the documented command sequence against agentplane help output. Expected: commands and flags match the installed CLI surface.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-25T06:13:00.326Z — VERIFY — ok

By: DOCS

Note: Reviewed the branch_pr guide text, confirmed the remote-check sequence is concrete, ran prettier on the touched docs, and matched agentplane/gh commands to the installed help surface.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T06:08:19.435Z, excerpt_hash=sha256:01d7edd121e069e7af87ab448f4ee3104906618ea25ceb05c67c3e891d0c571c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
