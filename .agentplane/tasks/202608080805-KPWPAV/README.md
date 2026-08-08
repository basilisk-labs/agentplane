---
id: "202608080805-KPWPAV"
title: "Allow explicit replacement after failed task advance operation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "release"
  - "supervisor"
verify:
  - "bun run test:critical"
  - "bun run typecheck"
  - "bun run ci:contract"
plan_approval:
  state: "approved"
  updated_at: "2026-08-08T08:05:11.934Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-08T08:23:24.502Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
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
  hash: "0caa5838bb36e58165a19215f6bd16ea39673ac0"
  message: "🚧 KPWPAV task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: f559a5b1fc5a. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 0caa5838bb36. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-08T08:05:29.344Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-08T08:22:39.161Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: f559a5b1fc5a. CLI accepted one state-bound external-agent semantic result."
    commit: "f559a5b1fc5ad58c390645d05375caff21d21d60"
  -
    type: "verify"
    at: "2026-08-08T08:23:14.425Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  -
    type: "verify"
    at: "2026-08-08T08:23:24.502Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  -
    type: "status"
    at: "2026-08-08T08:31:30.277Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 0caa5838bb36. CLI accepted one state-bound external-agent semantic result."
    commit: "0caa5838bb36e58165a19215f6bd16ea39673ac0"
doc_version: 3
doc_updated_at: "2026-08-08T08:31:30.277Z"
doc_updated_by: "SUPERVISOR"
description: "Expose a guarded task advance replacement path for a terminal operation_failed supervisor journal so a newly recomputed route can continue without retrying the failed effect."
sections:
  Summary: |-
    Allow explicit replacement after failed task advance operation

    Expose a guarded task advance replacement path for a terminal operation_failed supervisor journal so a newly recomputed route can continue without retrying the failed effect.
  Scope: |-
    - In scope: Expose a guarded task advance replacement path for a terminal operation_failed supervisor journal so a newly recomputed route can continue without retrying the failed effect.
    - Out of scope: unrelated refactors not required for "Allow explicit replacement after failed task advance operation".
  Plan: "1. Add an explicit --replacement flag to task advance. 2. When and only when that flag is present, reopen a stopped operation_failed supervisor journal through the core exact-key replacement primitive before issuing the recomputed semantic episode. 3. Reject replacement outside the terminal failed-operation state and preserve effect_in_doubt/budget guards. 4. Add parser, supervisor, negative, and CLI recovery regressions. 5. Pass focused, critical, type, contract, evaluator, hosted, and integration gates."
  Verify Steps: |-
    PLANNER fallback scaffold for "Allow explicit replacement after failed task advance operation". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Allow explicit replacement after failed task advance operation". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-08T08:23:14.425Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T08:22:39.161Z, excerpt_hash=sha256:fae92571cbd16678a5608352c61596708e0d7118146fca9cb39936d01aeae5aa

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608080805-KPWPAV-allow-task-advance-replacement/.agentplane/tasks/202608080805-KPWPAV/blueprint/resolved-snapshot.json
    - old_digest: 73e526b4dc469052abfe576ce64fa57a536cec2ab2b00ef508904629d13d0ba5
    - current_digest: 73e526b4dc469052abfe576ce64fa57a536cec2ab2b00ef508904629d13d0ba5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608080805-KPWPAV

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608080805-KPWPAV
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-08T08:23:24.502Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T08:23:15.367Z, excerpt_hash=sha256:fae92571cbd16678a5608352c61596708e0d7118146fca9cb39936d01aeae5aa

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608080805-KPWPAV-allow-task-advance-replacement/.agentplane/tasks/202608080805-KPWPAV/blueprint/resolved-snapshot.json
    - old_digest: 73e526b4dc469052abfe576ce64fa57a536cec2ab2b00ef508904629d13d0ba5
    - current_digest: 73e526b4dc469052abfe576ce64fa57a536cec2ab2b00ef508904629d13d0ba5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608080805-KPWPAV

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608080805-KPWPAV
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
    start_head_sha: "f90a67a282234a4f42b5e3721e416f31e7f0be9b"
    version: 1
id_source: "generated"
---
## Summary

Allow explicit replacement after failed task advance operation

Expose a guarded task advance replacement path for a terminal operation_failed supervisor journal so a newly recomputed route can continue without retrying the failed effect.

## Scope

- In scope: Expose a guarded task advance replacement path for a terminal operation_failed supervisor journal so a newly recomputed route can continue without retrying the failed effect.
- Out of scope: unrelated refactors not required for "Allow explicit replacement after failed task advance operation".

## Plan

1. Add an explicit --replacement flag to task advance. 2. When and only when that flag is present, reopen a stopped operation_failed supervisor journal through the core exact-key replacement primitive before issuing the recomputed semantic episode. 3. Reject replacement outside the terminal failed-operation state and preserve effect_in_doubt/budget guards. 4. Add parser, supervisor, negative, and CLI recovery regressions. 5. Pass focused, critical, type, contract, evaluator, hosted, and integration gates.

## Verify Steps

PLANNER fallback scaffold for "Allow explicit replacement after failed task advance operation". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Allow explicit replacement after failed task advance operation". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-08T08:23:14.425Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T08:22:39.161Z, excerpt_hash=sha256:fae92571cbd16678a5608352c61596708e0d7118146fca9cb39936d01aeae5aa

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608080805-KPWPAV-allow-task-advance-replacement/.agentplane/tasks/202608080805-KPWPAV/blueprint/resolved-snapshot.json
- old_digest: 73e526b4dc469052abfe576ce64fa57a536cec2ab2b00ef508904629d13d0ba5
- current_digest: 73e526b4dc469052abfe576ce64fa57a536cec2ab2b00ef508904629d13d0ba5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608080805-KPWPAV

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608080805-KPWPAV
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-08T08:23:24.502Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T08:23:15.367Z, excerpt_hash=sha256:fae92571cbd16678a5608352c61596708e0d7118146fca9cb39936d01aeae5aa

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608080805-KPWPAV-allow-task-advance-replacement/.agentplane/tasks/202608080805-KPWPAV/blueprint/resolved-snapshot.json
- old_digest: 73e526b4dc469052abfe576ce64fa57a536cec2ab2b00ef508904629d13d0ba5
- current_digest: 73e526b4dc469052abfe576ce64fa57a536cec2ab2b00ef508904629d13d0ba5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608080805-KPWPAV

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608080805-KPWPAV
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
