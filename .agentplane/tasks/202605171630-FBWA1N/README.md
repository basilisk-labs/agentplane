---
id: "202605171630-FBWA1N"
title: "Fix pr open publishing to inherited upstream"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T16:30:36.794Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing pr open publish hardening in batch with 202605171630-CXZJS8; first task owns the branch/worktree and will carry the combined PR artifact."
events:
  -
    type: "status"
    at: "2026-05-17T16:31:17.813Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing pr open publish hardening in batch with 202605171630-CXZJS8; first task owns the branch/worktree and will carry the combined PR artifact."
doc_version: 3
doc_updated_at: "2026-05-17T16:38:58.039Z"
doc_updated_by: "CODER"
description: "Prevent agentplane pr open from publishing task worktree HEAD to an inherited upstream such as origin/main; it must push explicitly to the requested task branch ref."
sections:
  Summary: |-
    Fix pr open publishing to inherited upstream

    Prevent agentplane pr open from publishing task worktree HEAD to an inherited upstream such as origin/main; it must push explicitly to the requested task branch ref.
  Scope: |-
    - In scope: Prevent agentplane pr open from publishing task worktree HEAD to an inherited upstream such as origin/main; it must push explicitly to the requested task branch ref.
    - Out of scope: unrelated refactors not required for "Fix pr open publishing to inherited upstream".
  Plan: "Batch implementation with 202605171630-CXZJS8 in one branch_pr worktree. Scope: inspect pr open publish path, change task branch push so it ignores inherited upstreams that do not match the requested task branch, add regression coverage for branch with upstream origin/main, verify focused PR-flow tests and policy routing."
  Verify Steps: "Run bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts. Expected: pr open publishes task branch HEAD to the task branch remote ref even when local upstream points at origin/main, and all existing pr-open publish regressions stay green."
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

Fix pr open publishing to inherited upstream

Prevent agentplane pr open from publishing task worktree HEAD to an inherited upstream such as origin/main; it must push explicitly to the requested task branch ref.

## Scope

- In scope: Prevent agentplane pr open from publishing task worktree HEAD to an inherited upstream such as origin/main; it must push explicitly to the requested task branch ref.
- Out of scope: unrelated refactors not required for "Fix pr open publishing to inherited upstream".

## Plan

Batch implementation with 202605171630-CXZJS8 in one branch_pr worktree. Scope: inspect pr open publish path, change task branch push so it ignores inherited upstreams that do not match the requested task branch, add regression coverage for branch with upstream origin/main, verify focused PR-flow tests and policy routing.

## Verify Steps

Run bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts. Expected: pr open publishes task branch HEAD to the task branch remote ref even when local upstream points at origin/main, and all existing pr-open publish regressions stay green.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
