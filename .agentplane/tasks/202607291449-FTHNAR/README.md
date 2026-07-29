---
id: "202607291449-FTHNAR"
title: "Permit evidence refresh after evaluator review gaps"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evaluator"
  - "recovery"
  - "refactor"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-29T14:49:52.020Z"
  updated_by: "USER"
  note: "Standing approval granted by the user for the AgentPlane 0.7 refactor and recovery work."
verification:
  state: "ok"
  updated_at: "2026-07-29T15:01:06.145Z"
  updated_by: "TESTER"
  note: "Verified bounded evidence-refresh routing and protected quality-review handoff."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-29T15:02:56.646Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 2 typed finding(s)."
  evaluated_sha: "425cc4268bb9ce250abf7ed0d19d1017cae0954b"
  blueprint_digest: "2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e"
  evidence_refs:
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-150152622-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-150152622-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-150152622-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-150152622-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-150152622-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-150152622-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202607291449-FTHNAR/README.md"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-150152622-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-150152622-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607291449-FTHNAR/verification/20260729150106145-8b2f0cc0ece7db0c.json"
    - ".agentplane/tasks/202607291449-FTHNAR/quality/20260729-150152622-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The recovery predicate does not establish that the evaluator block was caused only by missing deterministic verification evidence. Any current evaluator-supplied blocked review with a finding and quality-report reference is delegated to TESTER, including unrelated semantic or scope blocks."
    - "The predicate contains no verification-versus-review freshness comparison. After TESTER records refreshed evidence without changing the reviewed SHA, the same blocked review can still satisfy the predicate and select another evidence-refresh episode instead of returning control to EVALUATOR."
commit:
  hash: "425cc4268bb9ce250abf7ed0d19d1017cae0954b"
  message: "fix(route): refresh evidence after evaluator block"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: added the bounded TESTER evidence-refresh route for current EVALUATOR blocks and its regression coverage."
events:
  -
    type: "status"
    at: "2026-07-29T14:50:37.293Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-29T15:00:05.355Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: added the bounded TESTER evidence-refresh route for current EVALUATOR blocks and its regression coverage."
  -
    type: "verify"
    at: "2026-07-29T15:01:06.145Z"
    author: "TESTER"
    state: "ok"
    note: "Verified bounded evidence-refresh routing and protected quality-review handoff."
doc_version: 3
doc_updated_at: "2026-07-29T15:01:09.227Z"
doc_updated_by: "CODER"
description: "Restore a bounded recovery route when an evaluator blocks a task only because frozen deterministic verification evidence is missing. The CLI must permit the declared verification refresh, preserve semantic review ownership with EVALUATOR, and require a new review before publication."
sections:
  Summary: |-
    Permit evidence refresh after evaluator review gaps

    Restore a bounded recovery route when an evaluator blocks a task only because frozen deterministic verification evidence is missing. The CLI must permit the declared verification refresh, preserve semantic review ownership with EVALUATOR, and require a new review before publication.
  Scope: |-
    - In scope: Restore a bounded recovery route when an evaluator blocks a task only because frozen deterministic verification evidence is missing. The CLI must permit the declared verification refresh, preserve semantic review ownership with EVALUATOR, and require a new review before publication.
    - Out of scope: unrelated refactors not required for "Permit evidence refresh after evaluator review gaps".
  Plan: |-
    1. Identify the blocked-quality-review route that prevents a task from refreshing deterministic evidence requested by EVALUATOR.
    2. Add a bounded recovery transition that permits only task verification; preserve EVALUATOR as the sole semantic verdict owner and require a fresh quality review before PR publication.
    3. Add regression coverage for the blocked-to-verification route and verify that unrelated quality-review blocks remain non-mutating.
    4. Run the focused tests, policy routing validation, and doctor; record exact results.
    5. Obtain an independent EVALUATOR verdict, publish the narrow PR, wait for hosted checks, then integrate before resuming the beta.1 gate task.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/shared/workflow-step.test.ts`. Expected: the current EVALUATOR-blocked review route delegates only to TESTER evidence refresh.
    2. Run `bun test packages/agentplane/src/commands/shared/route-decision-next-action.test.ts`. Expected: existing stale-quality-review routing remains protected from PR publication.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid after the command-route change.
    4. Run `node packages/agentplane/bin/agentplane.js doctor`. Expected: no new workflow health errors.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-29T15:01:06.145Z — VERIFY — ok

    By: TESTER

    Note: Verified bounded evidence-refresh routing and protected quality-review handoff.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T15:00:05.355Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

    Details:

    Command: bun test packages/agentplane/src/commands/shared/workflow-step.test.ts
    Result: pass
    Evidence: 22 pass; includes current EVALUATOR-blocked evidence-refresh route.
    Scope: route reducer and execution-packet behavior.

    Command: bun test packages/agentplane/src/commands/shared/route-decision-next-action.test.ts
    Result: pass
    Evidence: 10 pass; stale quality review remains ahead of PR-head publication.
    Scope: branch_pr publication safety.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: policy gateway compatibility.

    Command: node packages/agentplane/bin/agentplane.js doctor
    Result: pass
    Evidence: 0 errors; two historical DONE-task commit warnings outside this task.
    Scope: repository workflow health.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291449-FTHNAR-permit-evidence-refresh-after-evaluator-review-g/.agentplane/tasks/202607291449-FTHNAR/blueprint/resolved-snapshot.json
    - old_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
    - current_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607291449-FTHNAR

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607291449-FTHNAR
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
    start_head_sha: "d0b9d694451714a0cbd5a01cdfb8db1faffee6aa"
    version: 1
id_source: "generated"
---
## Summary

Permit evidence refresh after evaluator review gaps

Restore a bounded recovery route when an evaluator blocks a task only because frozen deterministic verification evidence is missing. The CLI must permit the declared verification refresh, preserve semantic review ownership with EVALUATOR, and require a new review before publication.

## Scope

- In scope: Restore a bounded recovery route when an evaluator blocks a task only because frozen deterministic verification evidence is missing. The CLI must permit the declared verification refresh, preserve semantic review ownership with EVALUATOR, and require a new review before publication.
- Out of scope: unrelated refactors not required for "Permit evidence refresh after evaluator review gaps".

## Plan

1. Identify the blocked-quality-review route that prevents a task from refreshing deterministic evidence requested by EVALUATOR.
2. Add a bounded recovery transition that permits only task verification; preserve EVALUATOR as the sole semantic verdict owner and require a fresh quality review before PR publication.
3. Add regression coverage for the blocked-to-verification route and verify that unrelated quality-review blocks remain non-mutating.
4. Run the focused tests, policy routing validation, and doctor; record exact results.
5. Obtain an independent EVALUATOR verdict, publish the narrow PR, wait for hosted checks, then integrate before resuming the beta.1 gate task.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/shared/workflow-step.test.ts`. Expected: the current EVALUATOR-blocked review route delegates only to TESTER evidence refresh.
2. Run `bun test packages/agentplane/src/commands/shared/route-decision-next-action.test.ts`. Expected: existing stale-quality-review routing remains protected from PR publication.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid after the command-route change.
4. Run `node packages/agentplane/bin/agentplane.js doctor`. Expected: no new workflow health errors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-29T15:01:06.145Z — VERIFY — ok

By: TESTER

Note: Verified bounded evidence-refresh routing and protected quality-review handoff.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T15:00:05.355Z, excerpt_hash=sha256:ff7e31f8837a558320bd524bae30097f4fec3337b777fdba73addd370a35ae90

Details:

Command: bun test packages/agentplane/src/commands/shared/workflow-step.test.ts
Result: pass
Evidence: 22 pass; includes current EVALUATOR-blocked evidence-refresh route.
Scope: route reducer and execution-packet behavior.

Command: bun test packages/agentplane/src/commands/shared/route-decision-next-action.test.ts
Result: pass
Evidence: 10 pass; stale quality review remains ahead of PR-head publication.
Scope: branch_pr publication safety.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy gateway compatibility.

Command: node packages/agentplane/bin/agentplane.js doctor
Result: pass
Evidence: 0 errors; two historical DONE-task commit warnings outside this task.
Scope: repository workflow health.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291449-FTHNAR-permit-evidence-refresh-after-evaluator-review-g/.agentplane/tasks/202607291449-FTHNAR/blueprint/resolved-snapshot.json
- old_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
- current_digest: 2a14be3b05294f60e8e70e7ff63a2409a1c966bcb676b70a74c5254a3573587e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607291449-FTHNAR

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607291449-FTHNAR
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
