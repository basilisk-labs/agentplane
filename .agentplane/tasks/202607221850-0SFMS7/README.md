---
id: "202607221850-0SFMS7"
title: "Supervise direct task execution end to end"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on:
  - "202607221846-9XC1H0"
  - "202607221849-8YYZ9X"
  - "202607221850-8HBF4J"
  - "202607221850-DRWR0V"
  - "202607221850-R7WS01"
  - "202607242236-1BFWEY"
tags:
  - "direct"
  - "milestone-beta1"
  - "refactor"
  - "rf-10"
  - "supervisor"
  - "v0.7"
  - "wave-supervisor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run coverage:workflow-suite"
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-07-29T01:35:28.740Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-07-29T02:26:54.848Z"
  updated_by: "TESTER"
  note: "Independent EVALUATOR returned rework: RC-001 finalization is journal-only, RC-002 verification lacks declared-check evidence, RC-003 lacks golden-path metrics and stale-route coverage."
  attempts: 1
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-29T03:01:44.808Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 3 typed finding(s)."
  evaluated_sha: "da88b1ed4305b3a70bf39633cf3739fb5e4f4609"
  blueprint_digest: "ac660021630860db841d7e1292a7cccc7c99fc11e6ba3e0e2e37a54231d72ab2"
  evidence_refs:
    - ".agentplane/tasks/202607221850-0SFMS7/quality/20260729-030035577-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221850-0SFMS7/quality/20260729-030035577-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221850-0SFMS7/quality/20260729-030035577-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221850-0SFMS7/quality/20260729-030035577-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221850-0SFMS7/quality/20260729-030035577-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221850-0SFMS7/quality/20260729-030035577-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202607221850-0SFMS7/README.md"
    - ".agentplane/tasks/202607221850-0SFMS7/quality/20260729-030035577-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221850-0SFMS7/quality/20260729-030035577-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221850-0SFMS7/quality/20260729-030035577-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Committed out-of-scope EXECUTOR changes are accepted as the implementation commit. The finalization guard rejects only dirty non-task paths, then accepts any changed HEAD without inspecting the committed path set against the approved scope."
    - "The required comparison with the 0.6.24 baseline is still absent. The implementation reports provider episode count, lifecycle-event delta, and declared-check count, but supplies no lifecycle-call, tool-call, or duplicate-context baseline values and no pass/fail comparison."
    - "The frozen check evidence contains no runner history or verification records for the evaluated SHA, so none of the four declared checks is demonstrated to have run on this revision."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implemented: direct CLI supervision in 8bfdaa6b53fd; focused, workflow, lifecycle, critical, and fast checks passed. ci:contract is blocked only by pre-existing clone-baseline drift with no RF-10a clone cluster."
events:
  -
    type: "status"
    at: "2026-07-29T01:35:45.315Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-29T02:24:57.738Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implemented: direct CLI supervision in 8bfdaa6b53fd; focused, workflow, lifecycle, critical, and fast checks passed. ci:contract is blocked only by pre-existing clone-baseline drift with no RF-10a clone cluster."
  -
    type: "verify"
    at: "2026-07-29T02:26:54.848Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Independent EVALUATOR returned rework: RC-001 finalization is journal-only, RC-002 verification lacks declared-check evidence, RC-003 lacks golden-path metrics and stale-route coverage."
doc_version: 3
doc_updated_at: "2026-07-29T02:26:55.481Z"
doc_updated_by: "CODER"
description: "RF-10a: implement the direct golden path from approved state through safe pre-operations, EXECUTOR work order, observed receipt, evaluator, post-operations, and typed approval/wait/human stops."
sections:
  Summary: |-
    Supervise direct task execution end to end

    RF-10a: implement the direct golden path from approved state through safe pre-operations, EXECUTOR work order, observed receipt, evaluator, post-operations, and typed approval/wait/human stops.
  Scope: |-
    - In scope: direct workflow lifecycle automation, state refresh after each operation, zero EXECUTOR lifecycle calls, start/check/evaluate/finalize operations, retries, approvals, waits, human input, and golden scenario metrics.
    - Out of scope: branch_pr provider/PR/merge integration.
  Plan: |-
    1. Map the direct lifecycle onto typed supervisor operations and episode boundaries.
    2. Prepare a role-specific EXECUTOR work order and launch through typed runner results.
    3. Observe process/Git/check/artifact evidence and run the EVALUATOR episode.
    4. Apply safe post-operations until terminal or an approval/wait/human step.
    5. Compare golden-path quality and orchestration cost to the 0.6.24 baseline.
  Verify Steps: |-
    1. Run the approved direct golden task. Expected: EXECUTOR performs zero AgentPlane lifecycle calls; supervisor starts, observes, evaluates, verifies, and finalizes.
    2. Change route state after every operation fixture. Expected: the supervisor recomputes from fresh state and never executes a stale next step.
    3. Exercise approval required, missing knowledge, evaluator rework, out-of-scope write, and adapter crash. Expected: bounded typed stops/retries with no synthesized semantic summary.
    4. Compare baseline metrics. Expected: lifecycle/tool/duplicate-context cost decreases without lower verified success or safety.
    5. Run direct workflow coverage, lifecycle invariants, contract CI, and focused tests.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-29T02:26:54.848Z — VERIFY — needs_rework

    By: TESTER

    Note: Independent EVALUATOR returned rework: RC-001 finalization is journal-only, RC-002 verification lacks declared-check evidence, RC-003 lacks golden-path metrics and stale-route coverage.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T02:24:57.738Z, excerpt_hash=sha256:6a6cea835f394ba6c184a4b98fbce30cefe999093db0c907abe0c855cb37daac

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607221850-0SFMS7-supervise-direct-task-execution-end-to-end/.agentplane/tasks/202607221850-0SFMS7/blueprint/resolved-snapshot.json
    - old_digest: ac660021630860db841d7e1292a7cccc7c99fc11e6ba3e0e2e37a54231d72ab2
    - current_digest: ac660021630860db841d7e1292a7cccc7c99fc11e6ba3e0e2e37a54231d72ab2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221850-0SFMS7

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221850-0SFMS7
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
    - Restore the previous compatibility path behind an explicit feature/compatibility boundary.
    - Re-run lifecycle, focused, and type checks before resuming dependent work.
  Findings: |-
    - Observation: quality/20260729-022523522-recovery-context/evaluator-result.json
      Impact: The direct supervisor cannot claim verified finalization safely.
      Resolution: Implement real CLI finish, gate verification on declared checks, and add end-to-end stale-route and metrics coverage before replacement evaluation.
extensions:
  workflow_route_baseline:
    start_head_sha: "950e9cd2f222c12d16e930bdb8a3e39237659651"
    version: 1
id_source: "generated"
---
## Summary

Supervise direct task execution end to end

RF-10a: implement the direct golden path from approved state through safe pre-operations, EXECUTOR work order, observed receipt, evaluator, post-operations, and typed approval/wait/human stops.

## Scope

- In scope: direct workflow lifecycle automation, state refresh after each operation, zero EXECUTOR lifecycle calls, start/check/evaluate/finalize operations, retries, approvals, waits, human input, and golden scenario metrics.
- Out of scope: branch_pr provider/PR/merge integration.

## Plan

1. Map the direct lifecycle onto typed supervisor operations and episode boundaries.
2. Prepare a role-specific EXECUTOR work order and launch through typed runner results.
3. Observe process/Git/check/artifact evidence and run the EVALUATOR episode.
4. Apply safe post-operations until terminal or an approval/wait/human step.
5. Compare golden-path quality and orchestration cost to the 0.6.24 baseline.

## Verify Steps

1. Run the approved direct golden task. Expected: EXECUTOR performs zero AgentPlane lifecycle calls; supervisor starts, observes, evaluates, verifies, and finalizes.
2. Change route state after every operation fixture. Expected: the supervisor recomputes from fresh state and never executes a stale next step.
3. Exercise approval required, missing knowledge, evaluator rework, out-of-scope write, and adapter crash. Expected: bounded typed stops/retries with no synthesized semantic summary.
4. Compare baseline metrics. Expected: lifecycle/tool/duplicate-context cost decreases without lower verified success or safety.
5. Run direct workflow coverage, lifecycle invariants, contract CI, and focused tests.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-29T02:26:54.848Z — VERIFY — needs_rework

By: TESTER

Note: Independent EVALUATOR returned rework: RC-001 finalization is journal-only, RC-002 verification lacks declared-check evidence, RC-003 lacks golden-path metrics and stale-route coverage.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T02:24:57.738Z, excerpt_hash=sha256:6a6cea835f394ba6c184a4b98fbce30cefe999093db0c907abe0c855cb37daac

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607221850-0SFMS7-supervise-direct-task-execution-end-to-end/.agentplane/tasks/202607221850-0SFMS7/blueprint/resolved-snapshot.json
- old_digest: ac660021630860db841d7e1292a7cccc7c99fc11e6ba3e0e2e37a54231d72ab2
- current_digest: ac660021630860db841d7e1292a7cccc7c99fc11e6ba3e0e2e37a54231d72ab2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221850-0SFMS7

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221850-0SFMS7
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
- Restore the previous compatibility path behind an explicit feature/compatibility boundary.
- Re-run lifecycle, focused, and type checks before resuming dependent work.

## Findings

- Observation: quality/20260729-022523522-recovery-context/evaluator-result.json
  Impact: The direct supervisor cannot claim verified finalization safely.
  Resolution: Implement real CLI finish, gate verification on declared checks, and add end-to-end stale-route and metrics coverage before replacement evaluation.
