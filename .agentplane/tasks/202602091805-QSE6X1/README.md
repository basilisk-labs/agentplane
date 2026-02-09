---
id: "202602091805-QSE6X1"
title: "Direct mode: single-stream work start"
result_summary: "Direct-mode work start is single-stream (no task branches) and help/tests are updated."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "workflow"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T18:06:19.321Z"
  updated_by: "TESTER"
  note: "Verified: bun run lint and bun run test:full pass."
commit:
  hash: "bcf80596979a7305b9683e29e742c44c26d40609"
  message: "✅ QSE6X1 workflow: direct mode work start without branches"
comments:
  -
    author: "CODER"
    body: "Start: switch direct-mode work start to single-stream (no task branches) and update docs/tests accordingly."
  -
    author: "CODER"
    body: "Verified: bun run lint and bun run test:full pass; direct mode work start no longer creates task branches and records an active-task lock."
events:
  -
    type: "status"
    at: "2026-02-09T18:05:50.205Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: switch direct-mode work start to single-stream (no task branches) and update docs/tests accordingly."
  -
    type: "verify"
    at: "2026-02-09T18:06:19.321Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bun run lint and bun run test:full pass."
  -
    type: "status"
    at: "2026-02-09T18:07:13.450Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint and bun run test:full pass; direct mode work start no longer creates task branches and records an active-task lock."
doc_version: 2
doc_updated_at: "2026-02-09T18:07:13.450Z"
doc_updated_by: "CODER"
description: "Change work start behavior in workflow_mode=direct to avoid creating task branches; record an active-task lock and update help/docs/tests."
id_source: "generated"
---
## Summary

In workflow_mode=direct, make work start single-stream on the current branch (no task branches) by recording an active-task lock; update docs/help/tests accordingly.

## Scope

In scope: work start behavior in direct mode, direct-mode lock file, clearing lock on finish, help/command guide/AGENTS.md updates, tests and snapshots. Out of scope: branch_pr worktree workflow, remote branch cleanup.

## Plan

1) Update work start: in direct mode, do not create/check out task branches; enforce single-stream via a lock under .agentplane/cache; require clean tree except task artifacts.\n2) Clear the lock on finish in direct mode.\n3) Update CLI help/command guide + shipped AGENTS.md to match behavior.\n4) Update and add tests; update snapshots.\n5) Verify: bun run lint and bun run test:full.

## Risks

Risk: breaking change for users relying on task branches in direct mode. Mitigation: keep branch_pr unchanged; keep work start output explicit; add tests and help text.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T18:06:19.321Z — VERIFY — ok

By: TESTER

Note: Verified: bun run lint and bun run test:full pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T18:05:50.205Z, excerpt_hash=sha256:b1c0b70f1d34c90da71779587c3cd50a8f706cb5646069c8a11489209697a440

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the implementation and snapshot updates; restore the previous direct-mode branch creation behavior.

## Context

Direct mode is intended to be a simple one-checkout workflow. Creating per-task branches adds cognitive overhead and leaves branch cleanup to the user.

## Verify Steps

- bun run lint\n- bun run test:full
