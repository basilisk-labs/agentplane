---
id: "202605230831-R45MPG"
title: "Persist and clean branch_pr batch ownership"
result_summary: "Merged via PR #4083."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-23T08:31:22.973Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T08:46:21.002Z"
  updated_by: "CODER"
  note: "Commands: bun test packages/agentplane/src/commands/pr/internal/sync-batch-ownership.test.ts; bun test packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bun run lint:core; bun run hotspots:check. Result: pass. Evidence: batch ownership test 1 pass/22 expects; hosted-close suite 5 pass/89 expects; lint clean; oversized test baseline OK. Scope: branch_pr batch ownership persistence, route fallback, stale cleanup, lint/static hotspot gates."
  attempts: 0
commit:
  hash: "fed48719d00aceaaa48e9b7cc1d0915e31a94571"
  message: "Merge pull request #4083 from basilisk-labs/task/202605230831-R45MPG/batch-ownership-cleanup"
comments:
  -
    author: "CODER"
    body: "Start: implement branch_pr batch ownership persistence and stale cleanup from a fresh main worktree, with regression coverage for removed and changed include-task sets."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4083 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-23T08:31:33.976Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement branch_pr batch ownership persistence and stale cleanup from a fresh main worktree, with regression coverage for removed and changed include-task sets."
  -
    type: "verify"
    at: "2026-05-23T08:36:23.323Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts. Result: pass. Evidence: 5 pass, 0 fail, 89 expect calls. Scope: branch_pr batch ownership persistence, included-task route fallback, hosted-close batch closure, and stale ownership cleanup."
  -
    type: "verify"
    at: "2026-05-23T08:46:21.002Z"
    author: "CODER"
    state: "ok"
    note: "Commands: bun test packages/agentplane/src/commands/pr/internal/sync-batch-ownership.test.ts; bun test packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bun run lint:core; bun run hotspots:check. Result: pass. Evidence: batch ownership test 1 pass/22 expects; hosted-close suite 5 pass/89 expects; lint clean; oversized test baseline OK. Scope: branch_pr batch ownership persistence, route fallback, stale cleanup, lint/static hotspot gates."
  -
    type: "status"
    at: "2026-05-23T09:31:18.617Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4083 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-23T09:31:18.624Z"
doc_updated_by: "INTEGRATOR"
description: "Carry forward the useful PR #4027 batch ownership idea from current main, including cleanup when include-task changes or becomes empty."
sections:
  Summary: |-
    Persist and clean branch_pr batch ownership

    Carry forward the useful PR #4027 batch ownership idea from current main, including cleanup when include-task changes or becomes empty.
  Scope: |-
    - In scope: Carry forward the useful PR #4027 batch ownership idea from current main, including cleanup when include-task changes or becomes empty.
    - Out of scope: unrelated refactors not required for "Persist and clean branch_pr batch ownership".
  Plan: "Plan: implement branch_pr_batch task extension persistence from current main; clear stale ownership on primary and previously included tasks when include-task is empty or changes; use the extension only as fallback route metadata; add regression coverage for include-task removal and changed include sets."
  Verify Steps: "1. Run bun test packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts. Expected: branch_pr batch ownership persistence, fallback route status, hosted close, and stale cleanup regressions pass."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T08:36:23.323Z — VERIFY — ok

    By: CODER

    Note: Command: bun test packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts. Result: pass. Evidence: 5 pass, 0 fail, 89 expect calls. Scope: branch_pr batch ownership persistence, included-task route fallback, hosted-close batch closure, and stale ownership cleanup.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T08:36:16.731Z, excerpt_hash=sha256:25860bc2354b95c89421b8d944b39750a640dd07cdfc53d68d3c1cc795985f71

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230831-R45MPG-batch-ownership-cleanup/.agentplane/tasks/202605230831-R45MPG/blueprint/resolved-snapshot.json
    - old_digest: a14234bab4468051d602c0f771b00fd5ac299b960683da2c59fbd1b2c1914b2a
    - current_digest: a14234bab4468051d602c0f771b00fd5ac299b960683da2c59fbd1b2c1914b2a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605230831-R45MPG

    ### 2026-05-23T08:46:21.002Z — VERIFY — ok

    By: CODER

    Note: Commands: bun test packages/agentplane/src/commands/pr/internal/sync-batch-ownership.test.ts; bun test packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bun run lint:core; bun run hotspots:check. Result: pass. Evidence: batch ownership test 1 pass/22 expects; hosted-close suite 5 pass/89 expects; lint clean; oversized test baseline OK. Scope: branch_pr batch ownership persistence, route fallback, stale cleanup, lint/static hotspot gates.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T08:36:23.339Z, excerpt_hash=sha256:25860bc2354b95c89421b8d944b39750a640dd07cdfc53d68d3c1cc795985f71

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230831-R45MPG-batch-ownership-cleanup/.agentplane/tasks/202605230831-R45MPG/blueprint/resolved-snapshot.json
    - old_digest: a14234bab4468051d602c0f771b00fd5ac299b960683da2c59fbd1b2c1914b2a
    - current_digest: a14234bab4468051d602c0f771b00fd5ac299b960683da2c59fbd1b2c1914b2a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605230831-R45MPG

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Persist and clean branch_pr batch ownership

Carry forward the useful PR #4027 batch ownership idea from current main, including cleanup when include-task changes or becomes empty.

## Scope

- In scope: Carry forward the useful PR #4027 batch ownership idea from current main, including cleanup when include-task changes or becomes empty.
- Out of scope: unrelated refactors not required for "Persist and clean branch_pr batch ownership".

## Plan

Plan: implement branch_pr_batch task extension persistence from current main; clear stale ownership on primary and previously included tasks when include-task is empty or changes; use the extension only as fallback route metadata; add regression coverage for include-task removal and changed include sets.

## Verify Steps

1. Run bun test packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts. Expected: branch_pr batch ownership persistence, fallback route status, hosted close, and stale cleanup regressions pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T08:36:23.323Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts. Result: pass. Evidence: 5 pass, 0 fail, 89 expect calls. Scope: branch_pr batch ownership persistence, included-task route fallback, hosted-close batch closure, and stale ownership cleanup.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T08:36:16.731Z, excerpt_hash=sha256:25860bc2354b95c89421b8d944b39750a640dd07cdfc53d68d3c1cc795985f71

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230831-R45MPG-batch-ownership-cleanup/.agentplane/tasks/202605230831-R45MPG/blueprint/resolved-snapshot.json
- old_digest: a14234bab4468051d602c0f771b00fd5ac299b960683da2c59fbd1b2c1914b2a
- current_digest: a14234bab4468051d602c0f771b00fd5ac299b960683da2c59fbd1b2c1914b2a
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605230831-R45MPG

### 2026-05-23T08:46:21.002Z — VERIFY — ok

By: CODER

Note: Commands: bun test packages/agentplane/src/commands/pr/internal/sync-batch-ownership.test.ts; bun test packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bun run lint:core; bun run hotspots:check. Result: pass. Evidence: batch ownership test 1 pass/22 expects; hosted-close suite 5 pass/89 expects; lint clean; oversized test baseline OK. Scope: branch_pr batch ownership persistence, route fallback, stale cleanup, lint/static hotspot gates.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T08:36:23.339Z, excerpt_hash=sha256:25860bc2354b95c89421b8d944b39750a640dd07cdfc53d68d3c1cc795985f71

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230831-R45MPG-batch-ownership-cleanup/.agentplane/tasks/202605230831-R45MPG/blueprint/resolved-snapshot.json
- old_digest: a14234bab4468051d602c0f771b00fd5ac299b960683da2c59fbd1b2c1914b2a
- current_digest: a14234bab4468051d602c0f771b00fd5ac299b960683da2c59fbd1b2c1914b2a
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605230831-R45MPG

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
