---
id: "202608080551-8BH6HY"
title: "Accept external task-worktree resolution results"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "supervisor"
verify:
  - "bun run test:critical"
  - "bun run typecheck"
  - "bun run ci:contract"
plan_approval:
  state: "approved"
  updated_at: "2026-08-08T05:51:44.551Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-08-08T06:18:57.190Z"
  updated_by: "SUPERVISOR"
  note: "Rework: Unsupported declared check: bun run vitest packages/agentplane/src/commands/task/external-agent-purpose.test.ts"
  attempts: 1
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-08T05:58:50.900Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 1 typed finding(s)."
  evaluated_sha: "4ed5744750085850923f144349bb2aa705950c82"
  blueprint_digest: "f838ddb45c74406d87ad39a2b037d6fe7c88d657a5b7b4059642578ee7641be4"
  evidence_refs:
    - ".agentplane/tasks/202608080551-8BH6HY/quality/20260808-055812835-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608080551-8BH6HY/quality/20260808-055812835-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608080551-8BH6HY/quality/objects/sha256/55ddf88d25dcea0ac9b07fa45498d63857fa322682c395c514c6c853d8182831.md"
    - ".agentplane/tasks/202608080551-8BH6HY/quality/20260808-055812835-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608080551-8BH6HY/quality/20260808-055812835-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608080551-8BH6HY/quality/20260808-055812835-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608080551-8BH6HY/quality/20260808-055812835-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608080551-8BH6HY/README.md"
    - ".agentplane/tasks/202608080551-8BH6HY/quality/objects/sha256/159b3156259d89a0cff246ab3d120d23b41c3c76c39b7935b9bf8a7f831c2d73.patch"
    - ".agentplane/tasks/202608080551-8BH6HY/quality/objects/sha256/c64a0ad3cb0d9a182e46a9188a94d670578ae46298329b92cbe1bab5cbbacd7c.json"
    - ".agentplane/tasks/202608080551-8BH6HY/quality/objects/sha256/9bdf501920399d2009207ee356cca9d401dd0ad0bfd8caf494e54982108db83a.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Regression coverage tests only the purpose predicate; it does not exercise acceptance of a completed task_worktree_resolution result after the expected supervisor-owned commit transition."
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "repository"
  schema_version: 1
  selected_mode: "branch_pr"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 4ed574475008. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: b12f7e828635. CLI accepted one state-bound external-agent semantic result."
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
  -
    type: "verify"
    at: "2026-08-08T05:57:57.178Z"
    author: "TESTER"
    state: "ok"
    note: "Focused protocol coverage, typecheck, and the full contract gate pass on the exact implementation; external task-worktree resolution now follows implementation authority."
  -
    type: "status"
    at: "2026-08-08T06:18:50.236Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: b12f7e828635. CLI accepted one state-bound external-agent semantic result."
  -
    type: "verify"
    at: "2026-08-08T06:18:57.190Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Unsupported declared check: bun run vitest packages/agentplane/src/commands/task/external-agent-purpose.test.ts"
doc_version: 3
doc_updated_at: "2026-08-08T06:18:58.315Z"
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
    ### 2026-08-08T05:57:57.178Z — VERIFY — ok

    By: TESTER

    Note: Focused protocol coverage, typecheck, and the full contract gate pass on the exact implementation; external task-worktree resolution now follows implementation authority.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T05:54:02.796Z, excerpt_hash=sha256:5dfd6100a2b4d23e6f30dc43602bad090a9a87e1241cec1817c520633709aed3

    Details:

    Observed verification on implementation commit 4ed574475 and task evidence head 32a10b189:

    - bun run vitest packages/agentplane/src/commands/task/external-agent-purpose.test.ts
      Result: pass (1 file, 6 tests).
    - bun run typecheck
      Result: pass.
    - bun run ci:contract
      Result: pass, including formatting, schemas, policy routing, compatibility/replay baselines, lifecycle invariants, lint, architecture, clone, Knip, and coverage guards.
    - bunx prettier --check and bunx eslint on the touched modules
      Result: pass.
    - git diff --check
      Result: pass.

    The regression is classified as deterministic protocol routing: task_worktree_resolution was omitted from both external implementation application and freshness exceptions.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608080551-8BH6HY-accept-external-task-worktree-resolution-results/.agentplane/tasks/202608080551-8BH6HY/blueprint/resolved-snapshot.json
    - old_digest: f838ddb45c74406d87ad39a2b037d6fe7c88d657a5b7b4059642578ee7641be4
    - current_digest: f838ddb45c74406d87ad39a2b037d6fe7c88d657a5b7b4059642578ee7641be4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608080551-8BH6HY

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608080551-8BH6HY
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-08T06:18:57.190Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Unsupported declared check: bun run vitest packages/agentplane/src/commands/task/external-agent-purpose.test.ts
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T06:18:50.236Z, excerpt_hash=sha256:5dfd6100a2b4d23e6f30dc43602bad090a9a87e1241cec1817c520633709aed3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608080551-8BH6HY-accept-external-task-worktree-resolution-results/.agentplane/tasks/202608080551-8BH6HY/blueprint/resolved-snapshot.json
    - old_digest: f838ddb45c74406d87ad39a2b037d6fe7c88d657a5b7b4059642578ee7641be4
    - current_digest: f838ddb45c74406d87ad39a2b037d6fe7c88d657a5b7b4059642578ee7641be4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608080551-8BH6HY

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608080551-8BH6HY
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

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
### 2026-08-08T05:57:57.178Z — VERIFY — ok

By: TESTER

Note: Focused protocol coverage, typecheck, and the full contract gate pass on the exact implementation; external task-worktree resolution now follows implementation authority.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T05:54:02.796Z, excerpt_hash=sha256:5dfd6100a2b4d23e6f30dc43602bad090a9a87e1241cec1817c520633709aed3

Details:

Observed verification on implementation commit 4ed574475 and task evidence head 32a10b189:

- bun run vitest packages/agentplane/src/commands/task/external-agent-purpose.test.ts
  Result: pass (1 file, 6 tests).
- bun run typecheck
  Result: pass.
- bun run ci:contract
  Result: pass, including formatting, schemas, policy routing, compatibility/replay baselines, lifecycle invariants, lint, architecture, clone, Knip, and coverage guards.
- bunx prettier --check and bunx eslint on the touched modules
  Result: pass.
- git diff --check
  Result: pass.

The regression is classified as deterministic protocol routing: task_worktree_resolution was omitted from both external implementation application and freshness exceptions.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608080551-8BH6HY-accept-external-task-worktree-resolution-results/.agentplane/tasks/202608080551-8BH6HY/blueprint/resolved-snapshot.json
- old_digest: f838ddb45c74406d87ad39a2b037d6fe7c88d657a5b7b4059642578ee7641be4
- current_digest: f838ddb45c74406d87ad39a2b037d6fe7c88d657a5b7b4059642578ee7641be4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608080551-8BH6HY

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608080551-8BH6HY
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-08T06:18:57.190Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Unsupported declared check: bun run vitest packages/agentplane/src/commands/task/external-agent-purpose.test.ts
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T06:18:50.236Z, excerpt_hash=sha256:5dfd6100a2b4d23e6f30dc43602bad090a9a87e1241cec1817c520633709aed3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608080551-8BH6HY-accept-external-task-worktree-resolution-results/.agentplane/tasks/202608080551-8BH6HY/blueprint/resolved-snapshot.json
- old_digest: f838ddb45c74406d87ad39a2b037d6fe7c88d657a5b7b4059642578ee7641be4
- current_digest: f838ddb45c74406d87ad39a2b037d6fe7c88d657a5b7b4059642578ee7641be4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608080551-8BH6HY

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608080551-8BH6HY
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
