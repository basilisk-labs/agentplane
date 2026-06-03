---
id: "202606031744-7N0FHQ"
title: "Support pre-merge branch_pr closure"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-03T17:44:36.974Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-03T18:09:09.759Z"
  updated_by: "CODER"
  note: "Command: timeout 180s bunx vitest run packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts --pool=threads --maxWorkers=1 --testTimeout 120000 --hookTimeout 120000. Result: pass, 3 files and 34 tests passed. Command: bun run typecheck. Result: pass. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: bun run format:changed. Result: pass. Command: bun run docs:cli:check. Result: pass, cli reference up to date. Command: git diff --check. Result: pass. Command: ap doctor. Result: pass with unrelated historical DONE-task warnings 202605221745-8BHZSX and 202606011809-VCQPP7."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing pre-merge branch_pr closure so the task branch can carry the final closure packet before PR merge."
events:
  -
    type: "status"
    at: "2026-06-03T17:44:58.910Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing pre-merge branch_pr closure so the task branch can carry the final closure packet before PR merge."
  -
    type: "verify"
    at: "2026-06-03T18:09:09.759Z"
    author: "CODER"
    state: "ok"
    note: "Command: timeout 180s bunx vitest run packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts --pool=threads --maxWorkers=1 --testTimeout 120000 --hookTimeout 120000. Result: pass, 3 files and 34 tests passed. Command: bun run typecheck. Result: pass. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: bun run format:changed. Result: pass. Command: bun run docs:cli:check. Result: pass, cli reference up to date. Command: git diff --check. Result: pass. Command: ap doctor. Result: pass with unrelated historical DONE-task warnings 202605221745-8BHZSX and 202606011809-VCQPP7."
doc_version: 3
doc_updated_at: "2026-06-03T18:09:09.778Z"
doc_updated_by: "CODER"
description: "Implement a branch_pr closure mode where a task PR can carry a complete pre-merge closure packet in the task branch, making hosted close a no-op/recovery fallback instead of the normal second closure PR."
sections:
  Summary: |-
    Support pre-merge branch_pr closure

    Implement a branch_pr closure mode where a task PR can carry a complete pre-merge closure packet in the task branch, making hosted close a no-op/recovery fallback instead of the normal second closure PR.
  Scope: |-
    - In scope: Implement a branch_pr closure mode where a task PR can carry a complete pre-merge closure packet in the task branch, making hosted close a no-op/recovery fallback instead of the normal second closure PR.
    - Out of scope: unrelated refactors not required for "Support pre-merge branch_pr closure".
  Plan: |-
    1. Inspect branch_pr finish, integrate, hosted-close, and PR artifact code paths that currently require a post-merge close-tail PR.
    2. Add a pre-merge closure path for task worktrees so the task branch can record DONE/closure artifacts against the verified PR head before merge.
    3. Update hosted close/integrate behavior so a task already closed by the merged PR is treated as no-op or metadata-only recovery, not a normal second closure PR.
    4. Update user/internal docs to describe pre-merge closure as the normal one-PR path and post-merge hosted close as fallback.
    5. Add focused unit tests for the new route and run targeted verification plus policy routing/doctor.
  Verify Steps: |-
    1. Run focused unit coverage for branch_pr pre-merge closure and PR metadata behavior.
    2. Run TypeScript typecheck for command wiring and option propagation.
    3. Run policy routing and changed-file formatting checks.
    4. Run `ap doctor` or record the concrete bootstrap blocker if stale-runtime bootstrap cannot complete.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-03T18:09:09.759Z — VERIFY — ok

    By: CODER

    Note: Command: timeout 180s bunx vitest run packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts --pool=threads --maxWorkers=1 --testTimeout 120000 --hookTimeout 120000. Result: pass, 3 files and 34 tests passed. Command: bun run typecheck. Result: pass. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: bun run format:changed. Result: pass. Command: bun run docs:cli:check. Result: pass, cli reference up to date. Command: git diff --check. Result: pass. Command: ap doctor. Result: pass with unrelated historical DONE-task warnings 202605221745-8BHZSX and 202606011809-VCQPP7.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T17:44:58.910Z, excerpt_hash=sha256:234beb9b7ad184a280f0ffc092b5f5a1598a17dc1ee59366c7fe90aede8deae4

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606031744-7N0FHQ-support-pre-merge-branch-pr-closure/.agentplane/tasks/202606031744-7N0FHQ/blueprint/resolved-snapshot.json
    - old_digest: c37e2ecc42e7e2abdb073e1e89923fd79dc61f1ed44ad84cc04ebba1991b5207
    - current_digest: c37e2ecc42e7e2abdb073e1e89923fd79dc61f1ed44ad84cc04ebba1991b5207
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606031744-7N0FHQ

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Support pre-merge branch_pr closure

Implement a branch_pr closure mode where a task PR can carry a complete pre-merge closure packet in the task branch, making hosted close a no-op/recovery fallback instead of the normal second closure PR.

## Scope

- In scope: Implement a branch_pr closure mode where a task PR can carry a complete pre-merge closure packet in the task branch, making hosted close a no-op/recovery fallback instead of the normal second closure PR.
- Out of scope: unrelated refactors not required for "Support pre-merge branch_pr closure".

## Plan

1. Inspect branch_pr finish, integrate, hosted-close, and PR artifact code paths that currently require a post-merge close-tail PR.
2. Add a pre-merge closure path for task worktrees so the task branch can record DONE/closure artifacts against the verified PR head before merge.
3. Update hosted close/integrate behavior so a task already closed by the merged PR is treated as no-op or metadata-only recovery, not a normal second closure PR.
4. Update user/internal docs to describe pre-merge closure as the normal one-PR path and post-merge hosted close as fallback.
5. Add focused unit tests for the new route and run targeted verification plus policy routing/doctor.

## Verify Steps

1. Run focused unit coverage for branch_pr pre-merge closure and PR metadata behavior.
2. Run TypeScript typecheck for command wiring and option propagation.
3. Run policy routing and changed-file formatting checks.
4. Run `ap doctor` or record the concrete bootstrap blocker if stale-runtime bootstrap cannot complete.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-03T18:09:09.759Z — VERIFY — ok

By: CODER

Note: Command: timeout 180s bunx vitest run packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts --pool=threads --maxWorkers=1 --testTimeout 120000 --hookTimeout 120000. Result: pass, 3 files and 34 tests passed. Command: bun run typecheck. Result: pass. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: bun run format:changed. Result: pass. Command: bun run docs:cli:check. Result: pass, cli reference up to date. Command: git diff --check. Result: pass. Command: ap doctor. Result: pass with unrelated historical DONE-task warnings 202605221745-8BHZSX and 202606011809-VCQPP7.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T17:44:58.910Z, excerpt_hash=sha256:234beb9b7ad184a280f0ffc092b5f5a1598a17dc1ee59366c7fe90aede8deae4

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606031744-7N0FHQ-support-pre-merge-branch-pr-closure/.agentplane/tasks/202606031744-7N0FHQ/blueprint/resolved-snapshot.json
- old_digest: c37e2ecc42e7e2abdb073e1e89923fd79dc61f1ed44ad84cc04ebba1991b5207
- current_digest: c37e2ecc42e7e2abdb073e1e89923fd79dc61f1ed44ad84cc04ebba1991b5207
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606031744-7N0FHQ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
