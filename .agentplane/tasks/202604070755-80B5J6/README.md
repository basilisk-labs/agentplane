---
id: "202604070755-80B5J6"
title: "Fix gh auth propagation in agentplane pr close"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-07T08:10:28.124Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-07T08:14:10.341Z"
  updated_by: "CODER"
  note: "Verified: pr close now invokes gh with auth-bearing parent env while stripping git worktree overrides, targeted runCli and input-validation tests pass, and eslint passes for the touched pr close files."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce the gh 401 seen by agentplane pr close, inspect the gh invocation environment and repo resolution path, then fix the smallest auth propagation bug with focused tests."
events:
  -
    type: "status"
    at: "2026-04-07T08:10:56.187Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the gh 401 seen by agentplane pr close, inspect the gh invocation environment and repo resolution path, then fix the smallest auth propagation bug with focused tests."
  -
    type: "verify"
    at: "2026-04-07T08:14:10.341Z"
    author: "CODER"
    state: "ok"
    note: "Verified: pr close now invokes gh with auth-bearing parent env while stripping git worktree overrides, targeted runCli and input-validation tests pass, and eslint passes for the touched pr close files."
doc_version: 3
doc_updated_at: "2026-04-07T08:14:10.343Z"
doc_updated_by: "CODER"
description: "Ensure the CLI can invoke gh with the same working authentication and environment that succeeds in the user shell, so pr close works from inside agentplane."
sections:
  Summary: |-
    Fix gh auth propagation in agentplane pr close
    
    Ensure the CLI can invoke gh with the same working authentication and environment that succeeds in the user shell, so pr close works from inside agentplane.
  Scope: |-
    - In scope: Ensure the CLI can invoke gh with the same working authentication and environment that succeeds in the user shell, so pr close works from inside agentplane.
    - Out of scope: unrelated refactors not required for "Fix gh auth propagation in agentplane pr close".
  Plan: "1. Reproduce why direct shell gh auth works while agentplane pr close sees gh 401. 2. Inspect gh invocation/env plumbing in the pr close path and fix the smallest coherent auth propagation bug. 3. Add targeted tests that prove agentplane pr close passes through the expected environment and still handles failure paths. 4. Verify with focused tests and a CLI-level reproduction."
  Verify Steps: |-
    - Add or update focused tests around gh invocation/env propagation in pr close.
    - Reproduce that agentplane pr close no longer drops working gh auth under the same shell session assumptions.
    - Run the focused test and lint commands for the touched files and record the results.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-07T08:14:10.341Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: pr close now invokes gh with auth-bearing parent env while stripping git worktree overrides, targeted runCli and input-validation tests pass, and eslint passes for the touched pr close files.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T08:10:56.193Z, excerpt_hash=sha256:f26f79b81895d6c2c2d038089dc558eadfecef6c500afe7d4d39f9068ead4dc2
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix gh auth propagation in agentplane pr close

Ensure the CLI can invoke gh with the same working authentication and environment that succeeds in the user shell, so pr close works from inside agentplane.

## Scope

- In scope: Ensure the CLI can invoke gh with the same working authentication and environment that succeeds in the user shell, so pr close works from inside agentplane.
- Out of scope: unrelated refactors not required for "Fix gh auth propagation in agentplane pr close".

## Plan

1. Reproduce why direct shell gh auth works while agentplane pr close sees gh 401. 2. Inspect gh invocation/env plumbing in the pr close path and fix the smallest coherent auth propagation bug. 3. Add targeted tests that prove agentplane pr close passes through the expected environment and still handles failure paths. 4. Verify with focused tests and a CLI-level reproduction.

## Verify Steps

- Add or update focused tests around gh invocation/env propagation in pr close.
- Reproduce that agentplane pr close no longer drops working gh auth under the same shell session assumptions.
- Run the focused test and lint commands for the touched files and record the results.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-07T08:14:10.341Z — VERIFY — ok

By: CODER

Note: Verified: pr close now invokes gh with auth-bearing parent env while stripping git worktree overrides, targeted runCli and input-validation tests pass, and eslint passes for the touched pr close files.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T08:10:56.193Z, excerpt_hash=sha256:f26f79b81895d6c2c2d038089dc558eadfecef6c500afe7d4d39f9068ead4dc2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
