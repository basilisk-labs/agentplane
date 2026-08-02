---
id: "202608021231-PZGG3V"
title: "Unify the v0.7.1 task supervisor and external advance protocol"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "supervisor"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:critical"
  - "bun run typecheck"
  - "node scripts/qualification/check-v0.7.1-product-contract.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T13:20:21.380Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-02T14:22:45.910Z"
  updated_by: "TESTER"
  note: "Fresh SHA-bound deterministic evidence recorded for implementation 06582bde1138360f789c18399c86df20279bafee; all supervisor-scope and maintained repository gates passed."
  attempts: 0
quality_review:
  state: "blocked"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-02T14:19:15.425Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned blocked with 1 typed finding(s)."
  evaluated_sha: "06582bde1138360f789c18399c86df20279bafee"
  blueprint_digest: "1be3dfb8268d4740f319a064ba784ff7284c5752a8c3f64b544adcdc574337e9"
  evidence_refs:
    - ".agentplane/tasks/202608021231-PZGG3V/quality/20260802-141833116-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608021231-PZGG3V/quality/20260802-141833116-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608021231-PZGG3V/quality/20260802-141833116-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608021231-PZGG3V/quality/20260802-141833116-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608021231-PZGG3V/quality/20260802-141833116-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608021231-PZGG3V/quality/20260802-141833116-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608021231-PZGG3V/README.md"
    - ".agentplane/tasks/202608021231-PZGG3V/quality/20260802-141833116-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202608021231-PZGG3V/quality/20260802-141833116-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202608021231-PZGG3V/quality/20260802-141833116-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The frozen evidence contains only a narrative verification note; it contains no deterministic check records, runner history, or runtime evidence for the evaluated SHA."
  recovery_reason: "deterministic_evidence_gap"
commit:
  hash: "06582bde1138360f789c18399c86df20279bafee"
  message: "✨ PZGG3V task: unify supervisor frontends"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed at 06582bde1138360f789c18399c86df20279bafee. Local product, supervisor, lifecycle, recovery, critical, type, policy, and repository contract checks passed; independent verification remains with TESTER."
events:
  -
    type: "status"
    at: "2026-08-02T13:20:44.053Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-02T14:11:49.069Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed at 06582bde1138360f789c18399c86df20279bafee. Local product, supervisor, lifecycle, recovery, critical, type, policy, and repository contract checks passed; independent verification remains with TESTER."
  -
    type: "verify"
    at: "2026-08-02T14:17:44.239Z"
    author: "TESTER"
    state: "ok"
    note: "PASS for implementation 06582bde1138360f789c18399c86df20279bafee: product contract, v0.7 supervisor 134, lifecycle 113, recovery 86, critical CLI, TypeScript, workflow coverage, ci:contract, task-state, doctor, and policy routing passed. Core qualification passed 6/7; the exact-SHA efficiency evidence gap is assigned to release task 202608021232-6BTB6D and is outside this supervisor change."
  -
    type: "verify"
    at: "2026-08-02T14:22:45.910Z"
    author: "TESTER"
    state: "ok"
    note: "Fresh SHA-bound deterministic evidence recorded for implementation 06582bde1138360f789c18399c86df20279bafee; all supervisor-scope and maintained repository gates passed."
doc_version: 3
doc_updated_at: "2026-08-02T14:22:47.029Z"
doc_updated_by: "CODER"
description: "Expose one compact task advance --agent-json command over the canonical supervisor state machine, make managed and external execution produce equivalent transitions and evidence, cap executor packets at 2048 bytes, and remove semantic lifecycle shortcuts from default onboarding."
sections:
  Summary: |-
    Unify the v0.7.1 task supervisor and external advance protocol

    Expose one compact task advance --agent-json command over the canonical supervisor state machine, make managed and external execution produce equivalent transitions and evidence, cap executor packets at 2048 bytes, and remove semantic lifecycle shortcuts from default onboarding.
  Scope: |-
    - In scope: Expose one compact task advance --agent-json command over the canonical supervisor state machine, make managed and external execution produce equivalent transitions and evidence, cap executor packets at 2048 bytes, and remove semantic lifecycle shortcuts from default onboarding.
    - Out of scope: unrelated refactors not required for "Unify the v0.7.1 task supervisor and external advance protocol".
  Plan: |-
    1. Map the existing managed task-run and route-decision state machines, then define the smallest shared typed transition/projection boundary for managed and external frontends.
    2. Add `task advance <task-id> --agent-json` as the external frontend. It must emit one next action, current state fingerprint, bounded context references, explicit stop/authority state, and no shell choreography.
    3. Route managed `task run` and external `task advance` through the same transition semantics and evidence projection, including approval, evaluator rework, hosted wait, stale state, and recovery cases.
    4. Replace default onboarding/help guidance that promotes `task begin` and `task complete` with the canonical supervisor route while retaining compatibility commands outside the default path.
    5. Add focused contract, parity, packet-size, idempotency, and lifecycle/recovery tests; run critical CLI, typecheck, v0.7 qualification probes, workflow coverage, and ci:contract.
  Verify Steps: |-
    1. Run `node scripts/qualification/check-v0.7.1-product-contract.mjs`; require public `task advance --agent-json`, a valid packet no larger than 2048 bytes, no duplicated semantic fields, no Git/worktree/PR/verify/finish/integrate/cleanup choreography, and canonical onboarding.
    2. Run the focused v0.7 supervisor, lifecycle, and recovery suites; require managed and external frontends to produce equivalent typed transitions, state fingerprints, evidence outcomes, safe stops, and replay behavior.
    3. Exercise direct and branch_pr fixtures through planned, doing, approval-required, evaluator-rework, hosted-wait, done, blocked, stale-fingerprint, and effect-in-doubt states; require one deterministic next action and no hidden side effects from `--agent-json`.
    4. Run `bun run test:critical`, `bun run typecheck`, `bun run coverage:workflow-suite`, `bun run ci:contract`, task-state validation, doctor, and policy routing; require all maintained gates to pass.
    5. Run an independent EVALUATOR review against the exact implementation SHA before PR integration.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-02T14:17:44.239Z — VERIFY — ok

    By: TESTER

    Note: PASS for implementation 06582bde1138360f789c18399c86df20279bafee: product contract, v0.7 supervisor 134, lifecycle 113, recovery 86, critical CLI, TypeScript, workflow coverage, ci:contract, task-state, doctor, and policy routing passed. Core qualification passed 6/7; the exact-SHA efficiency evidence gap is assigned to release task 202608021232-6BTB6D and is outside this supervisor change.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T14:11:49.069Z, excerpt_hash=sha256:b3e05c44062c7dd9b930664b0d062a4d2f1fd159dae50d58044419d5b06a8bb3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021231-PZGG3V-unify-the-v0-7-1-task-supervisor-and-external-ad/.agentplane/tasks/202608021231-PZGG3V/blueprint/resolved-snapshot.json
    - old_digest: 1be3dfb8268d4740f319a064ba784ff7284c5752a8c3f64b544adcdc574337e9
    - current_digest: 1be3dfb8268d4740f319a064ba784ff7284c5752a8c3f64b544adcdc574337e9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608021231-PZGG3V

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608021231-PZGG3V
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-02T14:22:45.910Z — VERIFY — ok

    By: TESTER

    Note: Fresh SHA-bound deterministic evidence recorded for implementation 06582bde1138360f789c18399c86df20279bafee; all supervisor-scope and maintained repository gates passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T14:17:45.319Z, excerpt_hash=sha256:b3e05c44062c7dd9b930664b0d062a4d2f1fd159dae50d58044419d5b06a8bb3

    Details:

    Command: node scripts/qualification/check-v0.7.1-product-contract.mjs
    Result: pass
    Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
    Scope: compact external packet, managed runner frontend, packet size, no lifecycle choreography, and canonical onboarding

    Command: node scripts/checks/run-vitest-suite.mjs v0.7-supervisor
    Result: pass
    Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
    Scope: shared supervisor transitions, fingerprints, parity, packet projection, and safe semantic stops

    Command: node scripts/checks/run-vitest-suite.mjs v0.7-lifecycle
    Result: pass
    Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
    Scope: direct and branch_pr lifecycle states, approval gates, evaluator rework, hosted wait, and closure routing

    Command: node scripts/checks/run-vitest-suite.mjs v0.7-recovery
    Result: pass
    Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
    Scope: stale fingerprints, replay, concurrency, cancellation, effect in doubt, and recovery behavior

    Command: bun run test:critical
    Result: pass
    Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
    Scope: release-critical CLI, compatibility, replay, trust boundary, and protected path regressions

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
    Scope: workspace compile-time contract on TypeScript 7 typecheck

    Command: bun run coverage:workflow-suite
    Result: pass
    Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
    Scope: workflow runtime transitions, restore behavior, and harness coverage contract

    Command: bun run ci:contract
    Result: pass
    Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
    Scope: full maintained repository contract gate

    Command: bun run task-state:check
    Result: pass
    Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
    Scope: task projection and release-closure state

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
    Scope: policy gateway routing

    Command: ap doctor
    Result: pass
    Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
    Scope: workflow contract, workspace, branch_pr drift, runtime source, blueprints, prompt graph, and historical task metadata

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021231-PZGG3V-unify-the-v0-7-1-task-supervisor-and-external-ad/.agentplane/tasks/202608021231-PZGG3V/blueprint/resolved-snapshot.json
    - old_digest: 1be3dfb8268d4740f319a064ba784ff7284c5752a8c3f64b544adcdc574337e9
    - current_digest: 1be3dfb8268d4740f319a064ba784ff7284c5752a8c3f64b544adcdc574337e9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608021231-PZGG3V

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608021231-PZGG3V
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
    start_head_sha: "db3c1a42c1bf3caeaf3dba6d019116925a25b99b"
    version: 1
id_source: "generated"
---
## Summary

Unify the v0.7.1 task supervisor and external advance protocol

Expose one compact task advance --agent-json command over the canonical supervisor state machine, make managed and external execution produce equivalent transitions and evidence, cap executor packets at 2048 bytes, and remove semantic lifecycle shortcuts from default onboarding.

## Scope

- In scope: Expose one compact task advance --agent-json command over the canonical supervisor state machine, make managed and external execution produce equivalent transitions and evidence, cap executor packets at 2048 bytes, and remove semantic lifecycle shortcuts from default onboarding.
- Out of scope: unrelated refactors not required for "Unify the v0.7.1 task supervisor and external advance protocol".

## Plan

1. Map the existing managed task-run and route-decision state machines, then define the smallest shared typed transition/projection boundary for managed and external frontends.
2. Add `task advance <task-id> --agent-json` as the external frontend. It must emit one next action, current state fingerprint, bounded context references, explicit stop/authority state, and no shell choreography.
3. Route managed `task run` and external `task advance` through the same transition semantics and evidence projection, including approval, evaluator rework, hosted wait, stale state, and recovery cases.
4. Replace default onboarding/help guidance that promotes `task begin` and `task complete` with the canonical supervisor route while retaining compatibility commands outside the default path.
5. Add focused contract, parity, packet-size, idempotency, and lifecycle/recovery tests; run critical CLI, typecheck, v0.7 qualification probes, workflow coverage, and ci:contract.

## Verify Steps

1. Run `node scripts/qualification/check-v0.7.1-product-contract.mjs`; require public `task advance --agent-json`, a valid packet no larger than 2048 bytes, no duplicated semantic fields, no Git/worktree/PR/verify/finish/integrate/cleanup choreography, and canonical onboarding.
2. Run the focused v0.7 supervisor, lifecycle, and recovery suites; require managed and external frontends to produce equivalent typed transitions, state fingerprints, evidence outcomes, safe stops, and replay behavior.
3. Exercise direct and branch_pr fixtures through planned, doing, approval-required, evaluator-rework, hosted-wait, done, blocked, stale-fingerprint, and effect-in-doubt states; require one deterministic next action and no hidden side effects from `--agent-json`.
4. Run `bun run test:critical`, `bun run typecheck`, `bun run coverage:workflow-suite`, `bun run ci:contract`, task-state validation, doctor, and policy routing; require all maintained gates to pass.
5. Run an independent EVALUATOR review against the exact implementation SHA before PR integration.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-02T14:17:44.239Z — VERIFY — ok

By: TESTER

Note: PASS for implementation 06582bde1138360f789c18399c86df20279bafee: product contract, v0.7 supervisor 134, lifecycle 113, recovery 86, critical CLI, TypeScript, workflow coverage, ci:contract, task-state, doctor, and policy routing passed. Core qualification passed 6/7; the exact-SHA efficiency evidence gap is assigned to release task 202608021232-6BTB6D and is outside this supervisor change.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T14:11:49.069Z, excerpt_hash=sha256:b3e05c44062c7dd9b930664b0d062a4d2f1fd159dae50d58044419d5b06a8bb3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021231-PZGG3V-unify-the-v0-7-1-task-supervisor-and-external-ad/.agentplane/tasks/202608021231-PZGG3V/blueprint/resolved-snapshot.json
- old_digest: 1be3dfb8268d4740f319a064ba784ff7284c5752a8c3f64b544adcdc574337e9
- current_digest: 1be3dfb8268d4740f319a064ba784ff7284c5752a8c3f64b544adcdc574337e9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608021231-PZGG3V

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608021231-PZGG3V
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-02T14:22:45.910Z — VERIFY — ok

By: TESTER

Note: Fresh SHA-bound deterministic evidence recorded for implementation 06582bde1138360f789c18399c86df20279bafee; all supervisor-scope and maintained repository gates passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T14:17:45.319Z, excerpt_hash=sha256:b3e05c44062c7dd9b930664b0d062a4d2f1fd159dae50d58044419d5b06a8bb3

Details:

Command: node scripts/qualification/check-v0.7.1-product-contract.mjs
Result: pass
Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
Scope: compact external packet, managed runner frontend, packet size, no lifecycle choreography, and canonical onboarding

Command: node scripts/checks/run-vitest-suite.mjs v0.7-supervisor
Result: pass
Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
Scope: shared supervisor transitions, fingerprints, parity, packet projection, and safe semantic stops

Command: node scripts/checks/run-vitest-suite.mjs v0.7-lifecycle
Result: pass
Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
Scope: direct and branch_pr lifecycle states, approval gates, evaluator rework, hosted wait, and closure routing

Command: node scripts/checks/run-vitest-suite.mjs v0.7-recovery
Result: pass
Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
Scope: stale fingerprints, replay, concurrency, cancellation, effect in doubt, and recovery behavior

Command: bun run test:critical
Result: pass
Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
Scope: release-critical CLI, compatibility, replay, trust boundary, and protected path regressions

Command: bun run typecheck
Result: pass
Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
Scope: workspace compile-time contract on TypeScript 7 typecheck

Command: bun run coverage:workflow-suite
Result: pass
Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
Scope: workflow runtime transitions, restore behavior, and harness coverage contract

Command: bun run ci:contract
Result: pass
Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
Scope: full maintained repository contract gate

Command: bun run task-state:check
Result: pass
Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
Scope: task projection and release-closure state

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
Scope: policy gateway routing

Command: ap doctor
Result: pass
Evidence: .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json
Scope: workflow contract, workspace, branch_pr drift, runtime source, blueprints, prompt graph, and historical task metadata

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021231-PZGG3V-unify-the-v0-7-1-task-supervisor-and-external-ad/.agentplane/tasks/202608021231-PZGG3V/blueprint/resolved-snapshot.json
- old_digest: 1be3dfb8268d4740f319a064ba784ff7284c5752a8c3f64b544adcdc574337e9
- current_digest: 1be3dfb8268d4740f319a064ba784ff7284c5752a8c3f64b544adcdc574337e9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608021231-PZGG3V

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608021231-PZGG3V
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
