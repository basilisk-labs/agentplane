---
id: "202607282053-BYCY0Q"
title: "Charge supervisor wall-time budget from observed execution"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T20:53:38.859Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-28T21:03:41.582Z"
  updated_by: "TESTER"
  note: "Verified: focused supervisor/evaluator regression tests, typecheck, lint, format, policy routing, hotspots, and full test:fast passed on abba7d47a."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-28T21:05:46.036Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 2 typed finding(s)."
  evaluated_sha: "abba7d47a254194a5c0714268ad8c6731be2a4c1"
  blueprint_digest: "9569b35ae52dfba3f86d314fa3810629285946ebdb8bd90e4aa638a96726eaf2"
  evidence_refs:
    - ".agentplane/tasks/202607282053-BYCY0Q/quality/20260728-210406273-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607282053-BYCY0Q/quality/20260728-210406273-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607282053-BYCY0Q/quality/20260728-210406273-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607282053-BYCY0Q/quality/20260728-210406273-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607282053-BYCY0Q/quality/20260728-210406273-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607282053-BYCY0Q/quality/20260728-210406273-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202607282053-BYCY0Q/README.md"
    - ".agentplane/tasks/202607282053-BYCY0Q/quality/20260728-210406273-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607282053-BYCY0Q/quality/20260728-210406273-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607282053-BYCY0Q/quality/20260728-210406273-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Новый расчёт полностью полагается на usage.wall_time_ms, но тест замены вручную записывает длительность неуспешного провайдера и поэтому не проверяет реальный путь provider failure. В рабочем пути завершение после исключения может не передать длительность, из-за чего неуспешный запуск не расходует max_wall_time_ms и замена получает завышенный остаток бюджета."
    - "Замороженное свидетельство проверок содержит только итоговое утверждение TESTER: отсутствуют команды, результаты и записи, подтверждающие заявленные focused tests, typecheck, lint, format и test:fast."
commit:
  hash: "abba7d47a254194a5c0714268ad8c6731be2a4c1"
  message: "🐛 BYCY0Q code: charge wall time from observed execution"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: approved repair for observed active wall-time accounting and bounded evaluator replacement continuation."
  -
    author: "CODER"
    body: "Start: implementation commit abba7d47a charges wall-time only from supervisor-observed provider and runner execution."
events:
  -
    type: "status"
    at: "2026-07-28T20:53:43.149Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: approved repair for observed active wall-time accounting and bounded evaluator replacement continuation."
  -
    type: "status"
    at: "2026-07-28T21:03:15.397Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: implementation commit abba7d47a charges wall-time only from supervisor-observed provider and runner execution."
  -
    type: "verify"
    at: "2026-07-28T21:03:41.582Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: focused supervisor/evaluator regression tests, typecheck, lint, format, policy routing, hotspots, and full test:fast passed on abba7d47a."
doc_version: 3
doc_updated_at: "2026-07-28T21:03:42.207Z"
doc_updated_by: "CODER"
description: "Make max_wall_time_ms charge cumulative supervisor-observed provider or runner duration rather than journal age, so external waits do not consume execution budget. Preserve durable episode history, terminal operation_failed rules, one explicit replacement authorization, and all other budget dimensions. Add deterministic core and evaluator coverage, then validate one post-integration replacement pilot if the journal remains eligible."
sections:
  Summary: |-
    Charge supervisor wall-time budget from observed execution

    Make max_wall_time_ms charge cumulative supervisor-observed provider or runner duration rather than journal age, so external waits do not consume execution budget. Preserve durable episode history, terminal operation_failed rules, one explicit replacement authorization, and all other budget dimensions. Add deterministic core and evaluator coverage, then validate one post-integration replacement pilot if the journal remains eligible.
  Scope: |-
    - In scope: Make max_wall_time_ms charge cumulative supervisor-observed provider or runner duration rather than journal age, so external waits do not consume execution budget. Preserve durable episode history, terminal operation_failed rules, one explicit replacement authorization, and all other budget dimensions. Add deterministic core and evaluator coverage, then validate one post-integration replacement pilot if the journal remains eligible.
    - Out of scope: unrelated refactors not required for "Charge supervisor wall-time budget from observed execution".
  Plan: "1. Define max_wall_time_ms as cumulative supervisor-observed active duration and keep journal age out of its exhaustion calculation. 2. Preserve current terminal operation_failed and replacement CAS semantics, token/run/file/no-progress limits, and stale-state protections. 3. Add core tests for inactive elapsed time versus accumulated active duration and evaluator coverage that an eligible replacement can proceed after external waiting. 4. Run focused and required policy/type checks, independent quality review, hosted CI, integration, then execute the deferred real replacement pilot without retry if its journal is eligible."
  Verify Steps: |-
    1. Run core supervisor episode tests. Expected: inactive elapsed time does not exhaust max_wall_time_ms, while cumulative observed execution time does.
    2. Run evaluator execute tests. Expected: one explicit replacement remains linked to the original failed operation after external waiting, with no retry or duplicate provider start.
    3. Run typecheck, formatting, policy routing, and the relevant fast test gate. Expected: touched contracts and repository gates pass.
    4. After integration, execute the deferred real replacement pilot once. Expected: it either creates one linked completed operation with the original failure retained, or exits before a provider start with a durable, explicit stop reason.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-28T21:03:41.582Z — VERIFY — ok

    By: TESTER

    Note: Verified: focused supervisor/evaluator regression tests, typecheck, lint, format, policy routing, hotspots, and full test:fast passed on abba7d47a.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T21:03:15.397Z, excerpt_hash=sha256:bfbd94761814a2afae09d9d3d2463a551206b67117a7809b549c5115fb933af3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607282053-BYCY0Q-charge-supervisor-wall-time-budget-from-observed/.agentplane/tasks/202607282053-BYCY0Q/blueprint/resolved-snapshot.json
    - old_digest: 9569b35ae52dfba3f86d314fa3810629285946ebdb8bd90e4aa638a96726eaf2
    - current_digest: 9569b35ae52dfba3f86d314fa3810629285946ebdb8bd90e4aa638a96726eaf2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607282053-BYCY0Q

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607282053-BYCY0Q
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Replacement eligibility now charges cumulative observed wall time rather than journal age.
      Impact: External waits no longer exhaust an otherwise unused evaluator episode budget.
      Resolution: Core and evaluator regression coverage preserve terminal failure history and single explicit replacement semantics.
extensions:
  workflow_route_baseline:
    start_head_sha: "d1a9ac4c1ac9aee2e799ff2247b0f369be7f644c"
    version: 1
id_source: "generated"
---
## Summary

Charge supervisor wall-time budget from observed execution

Make max_wall_time_ms charge cumulative supervisor-observed provider or runner duration rather than journal age, so external waits do not consume execution budget. Preserve durable episode history, terminal operation_failed rules, one explicit replacement authorization, and all other budget dimensions. Add deterministic core and evaluator coverage, then validate one post-integration replacement pilot if the journal remains eligible.

## Scope

- In scope: Make max_wall_time_ms charge cumulative supervisor-observed provider or runner duration rather than journal age, so external waits do not consume execution budget. Preserve durable episode history, terminal operation_failed rules, one explicit replacement authorization, and all other budget dimensions. Add deterministic core and evaluator coverage, then validate one post-integration replacement pilot if the journal remains eligible.
- Out of scope: unrelated refactors not required for "Charge supervisor wall-time budget from observed execution".

## Plan

1. Define max_wall_time_ms as cumulative supervisor-observed active duration and keep journal age out of its exhaustion calculation. 2. Preserve current terminal operation_failed and replacement CAS semantics, token/run/file/no-progress limits, and stale-state protections. 3. Add core tests for inactive elapsed time versus accumulated active duration and evaluator coverage that an eligible replacement can proceed after external waiting. 4. Run focused and required policy/type checks, independent quality review, hosted CI, integration, then execute the deferred real replacement pilot without retry if its journal is eligible.

## Verify Steps

1. Run core supervisor episode tests. Expected: inactive elapsed time does not exhaust max_wall_time_ms, while cumulative observed execution time does.
2. Run evaluator execute tests. Expected: one explicit replacement remains linked to the original failed operation after external waiting, with no retry or duplicate provider start.
3. Run typecheck, formatting, policy routing, and the relevant fast test gate. Expected: touched contracts and repository gates pass.
4. After integration, execute the deferred real replacement pilot once. Expected: it either creates one linked completed operation with the original failure retained, or exits before a provider start with a durable, explicit stop reason.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-28T21:03:41.582Z — VERIFY — ok

By: TESTER

Note: Verified: focused supervisor/evaluator regression tests, typecheck, lint, format, policy routing, hotspots, and full test:fast passed on abba7d47a.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T21:03:15.397Z, excerpt_hash=sha256:bfbd94761814a2afae09d9d3d2463a551206b67117a7809b549c5115fb933af3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607282053-BYCY0Q-charge-supervisor-wall-time-budget-from-observed/.agentplane/tasks/202607282053-BYCY0Q/blueprint/resolved-snapshot.json
- old_digest: 9569b35ae52dfba3f86d314fa3810629285946ebdb8bd90e4aa638a96726eaf2
- current_digest: 9569b35ae52dfba3f86d314fa3810629285946ebdb8bd90e4aa638a96726eaf2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607282053-BYCY0Q

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607282053-BYCY0Q
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

- Observation: Replacement eligibility now charges cumulative observed wall time rather than journal age.
  Impact: External waits no longer exhaust an otherwise unused evaluator episode budget.
  Resolution: Core and evaluator regression coverage preserve terminal failure history and single explicit replacement semantics.
