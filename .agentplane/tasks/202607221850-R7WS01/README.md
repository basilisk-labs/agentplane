---
id: "202607221850-R7WS01"
title: "Return typed runner lifecycle results"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on:
  - "202607221846-Y89CFB"
  - "202607221848-VC4VVS"
  - "202607221850-9C9WBP"
  - "202607221850-DRWR0V"
  - "202607242158-QV09NA"
tags:
  - "milestone-beta1"
  - "refactor"
  - "rf-25"
  - "runner"
  - "use-case"
  - "v0.7"
  - "wave-supervisor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T01:55:33.967Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-28T02:26:16.727Z"
  updated_by: "TESTER"
  note: "PASS: typed runner lifecycle results stay in-process through task CLI and Hermes; human and JSON renderers preserve effect authority, observed evidence, claim generation, and operator-resolution provenance."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-28T02:26:58.563Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 1 typed finding(s)."
  evaluated_sha: "3f11077e583fb131713af53835139885b4406b60"
  blueprint_digest: "97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328"
  evidence_refs:
    - ".agentplane/tasks/202607221850-R7WS01/quality/20260728-022658471-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221850-R7WS01/quality/20260728-022658471-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221850-R7WS01/quality/20260728-022658471-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221850-R7WS01/quality/20260728-022658471-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221850-R7WS01/quality/20260728-022658471-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221850-R7WS01/quality/20260728-022658471-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202607221850-R7WS01/README.md"
    - ".agentplane/tasks/202607221850-R7WS01/quality/20260728-022658471-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221850-R7WS01/quality/20260728-022658471-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221850-R7WS01/quality/20260728-022658471-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "executeHermesWorkflowOperation marks an execution with active_claim_cleanup as failed but currently forwards executed.result.exit_code, which can still be 0. This splits supervisor semantics from task-run's typed exit mapping."
commit:
  hash: "3f11077e583fb131713af53835139885b4406b60"
  message: "✨ R7WS01 runner: return typed lifecycle results"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: 3f11077e5. Typed lifecycle result, renderers, Hermes in-process projection, and effect identity coverage are ready for TESTER verification."
events:
  -
    type: "status"
    at: "2026-07-28T01:55:50.050Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-28T02:22:27.906Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 3f11077e5. Typed lifecycle result, renderers, Hermes in-process projection, and effect identity coverage are ready for TESTER verification."
  -
    type: "verify"
    at: "2026-07-28T02:26:16.727Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: typed runner lifecycle results stay in-process through task CLI and Hermes; human and JSON renderers preserve effect authority, observed evidence, claim generation, and operator-resolution provenance."
doc_version: 3
doc_updated_at: "2026-07-28T02:26:17.333Z"
doc_updated_by: "CODER"
description: "RF-25d: make runner preparation, invocation, observation, evaluation, and lifecycle operations return typed in-process results with compatibility renderers instead of stdout parsing."
sections:
  Summary: |-
    Return typed runner lifecycle results

    RF-25d: make runner preparation, invocation, observation, evaluation, and lifecycle operations return typed in-process results with compatibility renderers instead of stdout parsing.
  Scope: |-
    - In scope: typed runner use-case results, adapter ports, error/result union, human/JSON renderers, compatibility snapshots, and supervisor invocation without subprocess/stdout capture.
    - Consume the durable effect-resolution contract as typed `effect_in_doubt`, `applied` and `not_applied` states, preserving resolution provenance, authority/evidence identity and claim generation in every in-process result and renderer.
    - An unresolved `effect_in_doubt` result is terminally blocked for generic retry, replay, resume and restart paths; only the explicit resolution protocol from task 202607242158-QV09NA may transition it to `applied` or `not_applied`.
    - Out of scope: automating the complete direct route, delivered by the next task.
  Plan: |-
    1. Define typed results for runner preparation, invocation, observation, evaluation handoff, and terminal outcomes.
    2. Separate rendering/exit mapping from use-case logic.
    3. Call runner phases in-process from the supervisor.
    4. Map durable journal/resolution input to typed `effect_in_doubt`, `applied` and `not_applied` outcomes with resolution provenance, and reject any generic retry path for unresolved effects.
    5. Preserve documented human and JSON output through compatibility renderers without dropping resolution provenance.
    6. Add result/renderer parity, adapter error, cancellation, timeout, stale-work-order and effect-resolution transition tests.
  Verify Steps: |-
    1. Invoke each runner phase in-process. Expected: structured results carry work-order/fingerprint/receipt identities without reading stdout.
    2. Render the same result to human and JSON formats. Expected: compatibility snapshots and exit codes remain stable.
    3. Feed durable journal states for `effect_in_doubt`, operator-resolved `applied` and operator-resolved `not_applied` into each runner/supervisor entry point. Expected: typed results and both renderers preserve the state, operator-supplied resolution provenance, evidence/authority digests and claim generation without stdout parsing.
    4. Invoke generic retry, replay, resume and restart against unresolved `effect_in_doubt`. Expected: every path returns the typed blocked outcome, performs no adapter invocation and directs callers only to the explicit operator-resolution protocol; no generic retry can reinterpret the effect as `not_applied`.
    5. Exercise cancellation, timeout, adapter crash, stale input, and policy denial. Expected: typed outcomes and observed receipts remain complete.
    6. Run runner/supervisor/lifecycle tests and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-28T02:26:16.727Z — VERIFY — ok

    By: TESTER

    Note: PASS: typed runner lifecycle results stay in-process through task CLI and Hermes; human and JSON renderers preserve effect authority, observed evidence, claim generation, and operator-resolution provenance.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T02:22:27.906Z, excerpt_hash=sha256:02a389ca089e360cf76ff483bd84febcf2d5924eaa0f09fb89eb4a0ab64c794d

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607221850-R7WS01-return-typed-runner-lifecycle-results/.agentplane/tasks/202607221850-R7WS01/blueprint/resolved-snapshot.json
    - old_digest: 97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328
    - current_digest: 97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221850-R7WS01

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221850-R7WS01
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
    - Preserve `effect_in_doubt`, `applied` and `not_applied` states plus resolution provenance in any compatibility boundary; do not restore a generic retry path for unresolved effects.
    - Restore the previous compatibility path only when it cannot bypass the explicit operator-resolution protocol or invoke the adapter for unresolved `effect_in_doubt`.
    - Re-run lifecycle, focused, and type checks before resuming dependent work.
  Findings: |-
    - Observation: Focused runner/supervisor/lifecycle suite passed; critical-cli passed 11/11 files (72 tests) in canonical Node mode; lifecycle invariants, typecheck, lint, and routing checks passed.
      Impact: No stdout parsing or generic replay path was reintroduced for effect_in_doubt.
      Resolution: Approve branch for PR update and hosted validation.
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-28T01:56:04.216Z"
        authorityDigest: "sha256:1a9163585644b8044fd2623ebaae04eaa5ff72007319049788e911b2d0a8c050"
        digest: "sha256:bb166118ccb9d0ee8a50c75fcf8950df306b9378527648dc7a9c5e66e2c16206"
        operationDigest: "sha256:926afbf65c3bb7e5beecf6a240900f188305b43ba476802772444569bc54f1fd"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:62937b83576dd303313dfc83af04e7e3d0efff9106778d0bff0de00fcea2cf6f"
    grants:
      -
        actor: "USER"
        digest: "sha256:1a9163585644b8044fd2623ebaae04eaa5ff72007319049788e911b2d0a8c050"
        expiresAt: "2026-07-28T02:11:04.216Z"
        id: "authority-c43fa0c7-9d23-4abf-9b92-7214c7b1d03e"
        issuedAt: "2026-07-28T01:56:04.216Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:926afbf65c3bb7e5beecf6a240900f188305b43ba476802772444569bc54f1fd"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:62937b83576dd303313dfc83af04e7e3d0efff9106778d0bff0de00fcea2cf6f"
        stateScopeDigest: "sha256:193bc7d44785382c8251ed54e1158f5778d84d491257d68adc3646854e5b28bc"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "a27841b280b516dfb52d900db5559ba87adc4224"
    version: 1
id_source: "generated"
---
## Summary

Return typed runner lifecycle results

RF-25d: make runner preparation, invocation, observation, evaluation, and lifecycle operations return typed in-process results with compatibility renderers instead of stdout parsing.

## Scope

- In scope: typed runner use-case results, adapter ports, error/result union, human/JSON renderers, compatibility snapshots, and supervisor invocation without subprocess/stdout capture.
- Consume the durable effect-resolution contract as typed `effect_in_doubt`, `applied` and `not_applied` states, preserving resolution provenance, authority/evidence identity and claim generation in every in-process result and renderer.
- An unresolved `effect_in_doubt` result is terminally blocked for generic retry, replay, resume and restart paths; only the explicit resolution protocol from task 202607242158-QV09NA may transition it to `applied` or `not_applied`.
- Out of scope: automating the complete direct route, delivered by the next task.

## Plan

1. Define typed results for runner preparation, invocation, observation, evaluation handoff, and terminal outcomes.
2. Separate rendering/exit mapping from use-case logic.
3. Call runner phases in-process from the supervisor.
4. Map durable journal/resolution input to typed `effect_in_doubt`, `applied` and `not_applied` outcomes with resolution provenance, and reject any generic retry path for unresolved effects.
5. Preserve documented human and JSON output through compatibility renderers without dropping resolution provenance.
6. Add result/renderer parity, adapter error, cancellation, timeout, stale-work-order and effect-resolution transition tests.

## Verify Steps

1. Invoke each runner phase in-process. Expected: structured results carry work-order/fingerprint/receipt identities without reading stdout.
2. Render the same result to human and JSON formats. Expected: compatibility snapshots and exit codes remain stable.
3. Feed durable journal states for `effect_in_doubt`, operator-resolved `applied` and operator-resolved `not_applied` into each runner/supervisor entry point. Expected: typed results and both renderers preserve the state, operator-supplied resolution provenance, evidence/authority digests and claim generation without stdout parsing.
4. Invoke generic retry, replay, resume and restart against unresolved `effect_in_doubt`. Expected: every path returns the typed blocked outcome, performs no adapter invocation and directs callers only to the explicit operator-resolution protocol; no generic retry can reinterpret the effect as `not_applied`.
5. Exercise cancellation, timeout, adapter crash, stale input, and policy denial. Expected: typed outcomes and observed receipts remain complete.
6. Run runner/supervisor/lifecycle tests and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-28T02:26:16.727Z — VERIFY — ok

By: TESTER

Note: PASS: typed runner lifecycle results stay in-process through task CLI and Hermes; human and JSON renderers preserve effect authority, observed evidence, claim generation, and operator-resolution provenance.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T02:22:27.906Z, excerpt_hash=sha256:02a389ca089e360cf76ff483bd84febcf2d5924eaa0f09fb89eb4a0ab64c794d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607221850-R7WS01-return-typed-runner-lifecycle-results/.agentplane/tasks/202607221850-R7WS01/blueprint/resolved-snapshot.json
- old_digest: 97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328
- current_digest: 97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221850-R7WS01

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221850-R7WS01
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
- Preserve `effect_in_doubt`, `applied` and `not_applied` states plus resolution provenance in any compatibility boundary; do not restore a generic retry path for unresolved effects.
- Restore the previous compatibility path only when it cannot bypass the explicit operator-resolution protocol or invoke the adapter for unresolved `effect_in_doubt`.
- Re-run lifecycle, focused, and type checks before resuming dependent work.

## Findings

- Observation: Focused runner/supervisor/lifecycle suite passed; critical-cli passed 11/11 files (72 tests) in canonical Node mode; lifecycle invariants, typecheck, lint, and routing checks passed.
  Impact: No stdout parsing or generic replay path was reintroduced for effect_in_doubt.
  Resolution: Approve branch for PR update and hosted validation.
