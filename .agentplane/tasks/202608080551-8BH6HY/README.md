---
id: "202608080551-8BH6HY"
title: "Accept external task-worktree resolution results"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "supervisor"
verify:
  - "bun run vitest packages/agentplane/src/commands/task/external-agent-purpose.test.ts"
  - "bun run typecheck"
  - "bun run ci:contract"
plan_approval:
  state: "approved"
  updated_at: "2026-08-08T05:51:44.551Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "repository"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "4ed5744750085850923f144349bb2aa705950c82"
  message: "🚧 8BH6HY task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 4ed574475008. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-08T05:52:09.094Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-08T05:54:02.796Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 4ed574475008. CLI accepted one state-bound external-agent semantic result."
doc_version: 3
doc_updated_at: "2026-08-08T05:54:02.796Z"
doc_updated_by: "SUPERVISOR"
description: "Fix task advance so a state-bound task_worktree_resolution episode can return a completed result after the CODER commits intended changes, without being rejected as an unsupported or stale read-only purpose; add focused regression coverage."
sections:
  Summary: |-
    Accept external task-worktree resolution results

    Fix task advance so a state-bound task_worktree_resolution episode can return a completed result after the CODER commits intended changes, without being rejected as an unsupported or stale read-only purpose; add focused regression coverage.
  Scope: |-
    - In scope: Fix task advance so a state-bound task_worktree_resolution episode can return a completed result after the CODER commits intended changes, without being rejected as an unsupported or stale read-only purpose; add focused regression coverage.
    - Out of scope: unrelated refactors not required for "Accept external task-worktree resolution results".
  Plan: "1. Classify task_worktree_resolution as an external implementation-authority purpose so result acceptance tolerates the expected supervisor-owned commit transition. 2. Reuse one shared purpose predicate for application and freshness behavior. 3. Add focused regression tests for implementation, implementation_rework, task_worktree_resolution, and read-only purposes. 4. Run focused tests, typecheck, and contract checks; obtain evaluator pass and integrate before resuming the release task."
  Verify Steps: |-
    PLANNER fallback scaffold for "Accept external task-worktree resolution results". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Accept external task-worktree resolution results". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "26da24fb37b41e318ad175676ed13a5b125293da"
    version: 1
id_source: "generated"
---
## Summary

Accept external task-worktree resolution results

Fix task advance so a state-bound task_worktree_resolution episode can return a completed result after the CODER commits intended changes, without being rejected as an unsupported or stale read-only purpose; add focused regression coverage.

## Scope

- In scope: Fix task advance so a state-bound task_worktree_resolution episode can return a completed result after the CODER commits intended changes, without being rejected as an unsupported or stale read-only purpose; add focused regression coverage.
- Out of scope: unrelated refactors not required for "Accept external task-worktree resolution results".

## Plan

1. Classify task_worktree_resolution as an external implementation-authority purpose so result acceptance tolerates the expected supervisor-owned commit transition. 2. Reuse one shared purpose predicate for application and freshness behavior. 3. Add focused regression tests for implementation, implementation_rework, task_worktree_resolution, and read-only purposes. 4. Run focused tests, typecheck, and contract checks; obtain evaluator pass and integrate before resuming the release task.

## Verify Steps

PLANNER fallback scaffold for "Accept external task-worktree resolution results". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Accept external task-worktree resolution results". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
