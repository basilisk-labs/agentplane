---
id: "202605171630-FBWA1N"
title: "Fix pr open publishing to inherited upstream"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-05-17T16:41:41.932Z"
  updated_by: "CODER"
  note: "Focused PR-open publishing regression passed: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts completed with 6 pass / 0 fail and covers inherited origin/main upstream publishing."
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
  -
    type: "verify"
    at: "2026-05-17T16:41:41.932Z"
    author: "CODER"
    state: "ok"
    note: "Focused PR-open publishing regression passed: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts completed with 6 pass / 0 fail and covers inherited origin/main upstream publishing."
doc_version: 3
doc_updated_at: "2026-05-17T16:41:41.937Z"
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
    ### 2026-05-17T16:41:41.932Z — VERIFY — ok

    By: CODER

    Note: Focused PR-open publishing regression passed: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts completed with 6 pass / 0 fail and covers inherited origin/main upstream publishing.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T16:38:58.039Z, excerpt_hash=sha256:1d61d7e8e181d530031531bfb01a2513d5f5419d902fad32b0f4dbdf74be52d1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171630-FBWA1N-pr-open-publish-transaction/.agentplane/tasks/202605171630-FBWA1N/blueprint/resolved-snapshot.json
    - old_digest: e51cfc2cca962c9a8631fd6df88e4fa3150ba22d6735eaeebb387318f9787f8e
    - current_digest: e51cfc2cca962c9a8631fd6df88e4fa3150ba22d6735eaeebb387318f9787f8e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171630-FBWA1N

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts
      Impact: Result: pass; Scope: pr open branch publishing and existing publish regressions.
      Resolution: Implemented explicit task-branch ref publishing and regression coverage.
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
### 2026-05-17T16:41:41.932Z — VERIFY — ok

By: CODER

Note: Focused PR-open publishing regression passed: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts completed with 6 pass / 0 fail and covers inherited origin/main upstream publishing.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T16:38:58.039Z, excerpt_hash=sha256:1d61d7e8e181d530031531bfb01a2513d5f5419d902fad32b0f4dbdf74be52d1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171630-FBWA1N-pr-open-publish-transaction/.agentplane/tasks/202605171630-FBWA1N/blueprint/resolved-snapshot.json
- old_digest: e51cfc2cca962c9a8631fd6df88e4fa3150ba22d6735eaeebb387318f9787f8e
- current_digest: e51cfc2cca962c9a8631fd6df88e4fa3150ba22d6735eaeebb387318f9787f8e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171630-FBWA1N

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts
  Impact: Result: pass; Scope: pr open branch publishing and existing publish regressions.
  Resolution: Implemented explicit task-branch ref publishing and regression coverage.
