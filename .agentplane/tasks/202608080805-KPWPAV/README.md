---
id: "202608080805-KPWPAV"
title: "Allow explicit replacement after failed task advance operation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
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
  updated_at: "2026-08-08T08:34:45.339Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-08T08:36:29.832Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 4 typed finding(s)."
  evaluated_sha: "0caa5838bb36e58165a19215f6bd16ea39673ac0"
  blueprint_digest: "73e526b4dc469052abfe576ce64fa57a536cec2ab2b00ef508904629d13d0ba5"
  evidence_refs:
    - ".agentplane/tasks/202608080805-KPWPAV/quality/20260808-083453599-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608080805-KPWPAV/quality/20260808-083453599-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608080805-KPWPAV/quality/objects/sha256/e497f6fa0821b229135697729c61b96b091c677549a8e91fecfec42e6e632761.md"
    - ".agentplane/tasks/202608080805-KPWPAV/quality/20260808-083453599-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608080805-KPWPAV/quality/20260808-083453599-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608080805-KPWPAV/quality/20260808-083453599-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608080805-KPWPAV/README.md"
    - ".agentplane/tasks/202608080805-KPWPAV/quality/objects/sha256/f4b9cd76f6c65fa3fd5b5ef29645a3f9a11241d5acb4cecbe30580587816c3dc.patch"
    - ".agentplane/tasks/202608080805-KPWPAV/quality/objects/sha256/da3bab6dfd54c4de579050c78744248f71e588fec112176cd002b555290b5b35.json"
    - ".agentplane/tasks/202608080805-KPWPAV/verification/20260808083445339-dcf089b32ca3a5d5.json"
    - ".agentplane/tasks/202608080805-KPWPAV/quality/objects/sha256/53e6d28c284158271b14a21b0326bced25eab10452d4d6f223e15ed9ed871bea.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.release.md"
  findings:
    - "The replacement preparation uses the core exact-failed-operation primitive and a journal CAS, then propagates replacement_of_operation_key into every successor start used by task advance."
    - "The replacement flag is rejected without a terminal operation_failed journal and when combined with a semantic result."
    - "The real task recovered its own failed verification journal through --replacement and reached a fresh semantic boundary, demonstrating the end-to-end path."
    - "Focused recovery tests, the critical suite, typecheck, and the full contract suite passed on implementation commit 0caa5838bb36e58165a19215f6bd16ea39673ac0."
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
  -
    type: "verify"
    at: "2026-08-08T08:34:45.339Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
doc_version: 3
doc_updated_at: "2026-08-08T08:34:46.411Z"
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

    ### 2026-08-08T08:34:45.339Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T08:31:30.277Z, excerpt_hash=sha256:fae92571cbd16678a5608352c61596708e0d7118146fca9cb39936d01aeae5aa

    Details:

    Command: bun run test:critical
    Result: pass
    Evidence: .agentplane/tasks/202608080805-KPWPAV/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608080805-KPWPAV declared verification

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608080805-KPWPAV/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608080805-KPWPAV declared verification

    Command: bun run ci:contract
    Result: pass
    Evidence: .agentplane/tasks/202608080805-KPWPAV/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608080805-KPWPAV declared verification

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

### 2026-08-08T08:34:45.339Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T08:31:30.277Z, excerpt_hash=sha256:fae92571cbd16678a5608352c61596708e0d7118146fca9cb39936d01aeae5aa

Details:

Command: bun run test:critical
Result: pass
Evidence: .agentplane/tasks/202608080805-KPWPAV/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608080805-KPWPAV declared verification

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608080805-KPWPAV/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608080805-KPWPAV declared verification

Command: bun run ci:contract
Result: pass
Evidence: .agentplane/tasks/202608080805-KPWPAV/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608080805-KPWPAV declared verification

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
