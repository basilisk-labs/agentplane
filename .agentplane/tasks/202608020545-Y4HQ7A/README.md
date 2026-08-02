---
id: "202608020545-Y4HQ7A"
title: "Freeze qualification metric policy and verification evidence"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "quality"
  - "release-gate"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "Run TypeScript typecheck and release-critical tests. Expected: compiler and milestone lifecycle contracts pass without widening qualification-task source scope."
  - "Run evaluator evidence tests. Expected: qualification review freezes the verification record selected by the packet implementation SHA and rejects mismatched records."
  - "Run focused qualification-packet tests. Expected: diagnostic timing failures are explicitly non-blocking, unclassified failures remain blocking, and the packet exposes both sets."
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T05:46:12.534Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-02T05:57:21.351Z"
  updated_by: "TESTER"
  note: "Verified qualification gate classification and frozen verification provenance on implementation SHA 98f9f6edd. Raw RF-04 latency failures remain visible and non-publishing, blocking failures stop packet construction, and evaluator evidence now includes the packet-selected verification record."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-02T05:59:00.282Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "98f9f6eddf07875fcc41893cb4d48586739a42ee"
  blueprint_digest: "d4c657b73e3cd568e9448c86101dcd64dec629ad8a74c48d3445646109c610b4"
  evidence_refs:
    - ".agentplane/tasks/202608020545-Y4HQ7A/quality/20260802-055808971-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608020545-Y4HQ7A/quality/20260802-055808971-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608020545-Y4HQ7A/quality/20260802-055808971-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608020545-Y4HQ7A/quality/20260802-055808971-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608020545-Y4HQ7A/quality/20260802-055808971-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608020545-Y4HQ7A/README.md"
    - ".agentplane/tasks/202608020545-Y4HQ7A/quality/20260802-055808971-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202608020545-Y4HQ7A/quality/20260802-055808971-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202608020545-Y4HQ7A/quality/20260802-055808971-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The implementation preserves raw RF-04 failures, deterministically separates policy-authorized diagnostic latency failures from blocking failures, rejects unclassified failures, and selects qualification verification records using the packet implementation SHA while retaining the evaluated evidence SHA as the reviewed head."
commit:
  hash: "98f9f6eddf07875fcc41893cb4d48586739a42ee"
  message: "🛡️ Y4HQ7A quality: freeze qualification gate evidence"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: preserved raw RF-04 candidate failures, classified diagnostic timing separately from blocking failures, rejected unclassified blockers, and bound frozen verification records to the qualification implementation SHA."
events:
  -
    type: "status"
    at: "2026-08-02T05:46:59.630Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-02T05:56:31.887Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: preserved raw RF-04 candidate failures, classified diagnostic timing separately from blocking failures, rejected unclassified blockers, and bound frozen verification records to the qualification implementation SHA."
  -
    type: "verify"
    at: "2026-08-02T05:57:21.351Z"
    author: "TESTER"
    state: "ok"
    note: "Verified qualification gate classification and frozen verification provenance on implementation SHA 98f9f6edd. Raw RF-04 latency failures remain visible and non-publishing, blocking failures stop packet construction, and evaluator evidence now includes the packet-selected verification record."
doc_version: 3
doc_updated_at: "2026-08-02T05:57:22.113Z"
doc_updated_by: "CODER"
description: "Make milestone qualification packets distinguish diagnostic-only RF-04 timing failures from blocking metric failures, and make evaluator preparation freeze the packet-selected verification record against the qualified implementation SHA. Preserve raw failures, reject unclassified blocking regressions, and keep qualification tasks evidence-only."
sections:
  Summary: |-
    Freeze qualification metric policy and verification evidence

    Make milestone qualification packets distinguish diagnostic-only RF-04 timing failures from blocking metric failures, and make evaluator preparation freeze the packet-selected verification record against the qualified implementation SHA. Preserve raw failures, reject unclassified blocking regressions, and keep qualification tasks evidence-only.
  Scope: |-
    - In scope: Make milestone qualification packets distinguish diagnostic-only RF-04 timing failures from blocking metric failures, and make evaluator preparation freeze the packet-selected verification record against the qualified implementation SHA. Preserve raw failures, reject unclassified blocking regressions, and keep qualification tasks evidence-only.
    - Out of scope: unrelated refactors not required for "Freeze qualification metric policy and verification evidence".
  Plan: "1. Reproduce both evaluator findings with focused tests: diagnostic RF-04 failures are not explicitly classified in the packet, and qualification verification records are filtered against the evidence commit instead of the packet implementation SHA. 2. Extend the RF-04 packet with a deterministic gate classification derived from the frozen comparison policy, preserving raw candidate verdicts and separating diagnostic from blocking failure IDs. 3. Make evaluator review resolve accepted verification records against the qualification packet implementation SHA while keeping the evidence commit as the reviewed artifact head. 4. Add positive and negative tests for both boundaries. 5. Run focused tests, TypeScript typecheck, release-critical checks, independent verification, evaluator review, and branch_pr integration. The rc.2 task remains evidence-only and consumes the merged fix afterward."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts`. Expected: packets preserve raw RF-04 failures, expose diagnostic versus blocking failure IDs, and reject unclassified blocking regressions.
    2. Run focused evaluator evidence tests covering qualification records. Expected: evaluator preparation freezes the packet-selected verification record against the qualified implementation SHA and still rejects mismatched records.
    3. Run the AgentPlane TypeScript typecheck and release-critical test suite. Expected: the native TypeScript 7 contract and milestone lifecycle gates pass.
    4. Inspect the resulting evaluator observed-checks fixture. Expected: `verification_records` is non-empty for a valid qualification packet, raw latency failures remain visible, and no publication eligibility is inferred from diagnostic metrics.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-02T05:57:21.351Z — VERIFY — ok

    By: TESTER

    Note: Verified qualification gate classification and frozen verification provenance on implementation SHA 98f9f6edd. Raw RF-04 latency failures remain visible and non-publishing, blocking failures stop packet construction, and evaluator evidence now includes the packet-selected verification record.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T05:56:31.887Z, excerpt_hash=sha256:5679ad53a4b7ec1a1c1d67ba63c69a4b7755d5163471cae7559d834a60f82831

    Details:

    Command: inspect .agentplane/tasks/202607221908-83Y4AF/quality/20260802-054101413-recovery-context/evaluator-result.json
    Result: pass
    Evidence: reproduced RF04-LATENCY-REGRESSIONS and DETERMINISTIC-EVIDENCE-NOT-FROZEN against the pre-fix qualification packet
    Scope: original failure and deterministic reproduction

    Command: bun test packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts
    Result: pass
    Evidence: 7/7 tests and 45 assertions passed, including diagnostic latency classification, blocking-failure rejection, and non-empty qualification verification_records
    Scope: focused qualification producer and frozen evaluator consumer regression

    Command: bun test packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts
    Result: pass
    Evidence: 7/7 tests and 33 assertions passed across lifecycle, branch_pr, base-sync, batch, and provenance cases
    Scope: evaluator verification-record and runtime-evidence matrix

    Command: bun run typecheck and bun run test:release:critical
    Result: pass
    Evidence: native TypeScript build passed; release-critical 4 files, 16/16 tests
    Scope: compiler and milestone lifecycle contract

    Command: bun run test:critical
    Result: pass
    Evidence: critical-cli 12/12 chunks passed
    Scope: RF-04, trust-boundary, protected-path, and CLI critical regression matrix

    Command: bun run ci:contract
    Result: pass
    Evidence: formatting, schemas, policy routing, RF-04 50-run replay, TypeScript toolchain 7.0.2/6.0.3, guards, lint, architecture, clone, knip, and coverage thresholds passed
    Scope: full non-heavy repository contract on implementation SHA 98f9f6edd

    Command: first bun run ci:contract attempt
    Result: fail_then_pass
    Evidence: first attempt stopped only on Prettier for the new test; one-file deterministic formatting repair made the complete rerun pass
    Scope: flake classification as deterministic authoring defect, not runtime or test flakiness

    Command: git diff --check and implementation commit review
    Result: pass
    Evidence: no whitespace errors; implementation commit 98f9f6edd changes only the task artifacts and three approved qualification/evaluator files
    Scope: task scope, commit, and residual-risk review

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608020545-Y4HQ7A-freeze-qualification-metric-policy-and-verificat/.agentplane/tasks/202608020545-Y4HQ7A/blueprint/resolved-snapshot.json
    - old_digest: d4c657b73e3cd568e9448c86101dcd64dec629ad8a74c48d3445646109c610b4
    - current_digest: d4c657b73e3cd568e9448c86101dcd64dec629ad8a74c48d3445646109c610b4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608020545-Y4HQ7A

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608020545-Y4HQ7A
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
    - Observation: Qualification packets exposed raw candidate failures but did not materialize the frozen timing policy, while evaluator preparation matched verification records against the evidence commit rather than the packet implementation SHA.
      Impact: Evaluators could interpret diagnostic latency as a hidden release blocker and could not independently freeze the successful verification record, forcing rework despite valid implementation evidence.
      Resolution: Added a policy-derived qualification_gate with raw, diagnostic, and blocking failure IDs; reject any blocking IDs; and resolve qualification verification records against packet.implementation_sha while retaining the evidence commit as the reviewed artifact head.
extensions:
  workflow_route_baseline:
    start_head_sha: "82905f817ef1ca58f17e3fb31ba55564435fb277"
    version: 1
id_source: "generated"
---
## Summary

Freeze qualification metric policy and verification evidence

Make milestone qualification packets distinguish diagnostic-only RF-04 timing failures from blocking metric failures, and make evaluator preparation freeze the packet-selected verification record against the qualified implementation SHA. Preserve raw failures, reject unclassified blocking regressions, and keep qualification tasks evidence-only.

## Scope

- In scope: Make milestone qualification packets distinguish diagnostic-only RF-04 timing failures from blocking metric failures, and make evaluator preparation freeze the packet-selected verification record against the qualified implementation SHA. Preserve raw failures, reject unclassified blocking regressions, and keep qualification tasks evidence-only.
- Out of scope: unrelated refactors not required for "Freeze qualification metric policy and verification evidence".

## Plan

1. Reproduce both evaluator findings with focused tests: diagnostic RF-04 failures are not explicitly classified in the packet, and qualification verification records are filtered against the evidence commit instead of the packet implementation SHA. 2. Extend the RF-04 packet with a deterministic gate classification derived from the frozen comparison policy, preserving raw candidate verdicts and separating diagnostic from blocking failure IDs. 3. Make evaluator review resolve accepted verification records against the qualification packet implementation SHA while keeping the evidence commit as the reviewed artifact head. 4. Add positive and negative tests for both boundaries. 5. Run focused tests, TypeScript typecheck, release-critical checks, independent verification, evaluator review, and branch_pr integration. The rc.2 task remains evidence-only and consumes the merged fix afterward.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts`. Expected: packets preserve raw RF-04 failures, expose diagnostic versus blocking failure IDs, and reject unclassified blocking regressions.
2. Run focused evaluator evidence tests covering qualification records. Expected: evaluator preparation freezes the packet-selected verification record against the qualified implementation SHA and still rejects mismatched records.
3. Run the AgentPlane TypeScript typecheck and release-critical test suite. Expected: the native TypeScript 7 contract and milestone lifecycle gates pass.
4. Inspect the resulting evaluator observed-checks fixture. Expected: `verification_records` is non-empty for a valid qualification packet, raw latency failures remain visible, and no publication eligibility is inferred from diagnostic metrics.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-02T05:57:21.351Z — VERIFY — ok

By: TESTER

Note: Verified qualification gate classification and frozen verification provenance on implementation SHA 98f9f6edd. Raw RF-04 latency failures remain visible and non-publishing, blocking failures stop packet construction, and evaluator evidence now includes the packet-selected verification record.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T05:56:31.887Z, excerpt_hash=sha256:5679ad53a4b7ec1a1c1d67ba63c69a4b7755d5163471cae7559d834a60f82831

Details:

Command: inspect .agentplane/tasks/202607221908-83Y4AF/quality/20260802-054101413-recovery-context/evaluator-result.json
Result: pass
Evidence: reproduced RF04-LATENCY-REGRESSIONS and DETERMINISTIC-EVIDENCE-NOT-FROZEN against the pre-fix qualification packet
Scope: original failure and deterministic reproduction

Command: bun test packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts
Result: pass
Evidence: 7/7 tests and 45 assertions passed, including diagnostic latency classification, blocking-failure rejection, and non-empty qualification verification_records
Scope: focused qualification producer and frozen evaluator consumer regression

Command: bun test packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts
Result: pass
Evidence: 7/7 tests and 33 assertions passed across lifecycle, branch_pr, base-sync, batch, and provenance cases
Scope: evaluator verification-record and runtime-evidence matrix

Command: bun run typecheck and bun run test:release:critical
Result: pass
Evidence: native TypeScript build passed; release-critical 4 files, 16/16 tests
Scope: compiler and milestone lifecycle contract

Command: bun run test:critical
Result: pass
Evidence: critical-cli 12/12 chunks passed
Scope: RF-04, trust-boundary, protected-path, and CLI critical regression matrix

Command: bun run ci:contract
Result: pass
Evidence: formatting, schemas, policy routing, RF-04 50-run replay, TypeScript toolchain 7.0.2/6.0.3, guards, lint, architecture, clone, knip, and coverage thresholds passed
Scope: full non-heavy repository contract on implementation SHA 98f9f6edd

Command: first bun run ci:contract attempt
Result: fail_then_pass
Evidence: first attempt stopped only on Prettier for the new test; one-file deterministic formatting repair made the complete rerun pass
Scope: flake classification as deterministic authoring defect, not runtime or test flakiness

Command: git diff --check and implementation commit review
Result: pass
Evidence: no whitespace errors; implementation commit 98f9f6edd changes only the task artifacts and three approved qualification/evaluator files
Scope: task scope, commit, and residual-risk review

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608020545-Y4HQ7A-freeze-qualification-metric-policy-and-verificat/.agentplane/tasks/202608020545-Y4HQ7A/blueprint/resolved-snapshot.json
- old_digest: d4c657b73e3cd568e9448c86101dcd64dec629ad8a74c48d3445646109c610b4
- current_digest: d4c657b73e3cd568e9448c86101dcd64dec629ad8a74c48d3445646109c610b4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608020545-Y4HQ7A

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608020545-Y4HQ7A
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

- Observation: Qualification packets exposed raw candidate failures but did not materialize the frozen timing policy, while evaluator preparation matched verification records against the evidence commit rather than the packet implementation SHA.
  Impact: Evaluators could interpret diagnostic latency as a hidden release blocker and could not independently freeze the successful verification record, forcing rework despite valid implementation evidence.
  Resolution: Added a policy-derived qualification_gate with raw, diagnostic, and blocking failure IDs; reject any blocking IDs; and resolve qualification verification records against packet.implementation_sha while retaining the evidence commit as the reviewed artifact head.
