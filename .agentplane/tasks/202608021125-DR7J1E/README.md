---
id: "202608021125-DR7J1E"
title: "Build the v0.7.1 end-to-end release qualification suite"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 16
origin:
  system: "manual"
depends_on: []
tags:
  - "agent-efficiency"
  - "code"
  - "context"
  - "e2e"
  - "release-gate"
  - "v0.7.1"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T12:05:48.899Z"
  updated_by: "ORCHESTRATOR"
  note: "Reapproved after separating harness acceptance from final release acceptance."
verification:
  state: "needs_rework"
  updated_at: "2026-08-02T12:04:56.261Z"
  updated_by: "TESTER"
  note: "Rework the task verification contract: the harness correctly emits release-blocking defects, but current Verify Steps incorrectly require the not-yet-fixed candidate to pass the final product gate before the harness can be integrated."
  attempts: 1
commit:
  hash: "5881186a69c595777e39496e1e4899ef45011d8c"
  message: "🧪 DR7J1E task: refine qualification verification"
comments:
  -
    author: "TESTER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation recorded: added the versioned v0.7.1 qualification manifest, audit/gate runner, classified defect ledger, focused lifecycle/context/supervisor/recovery/hosted suites, exact-subject efficiency checks, packed install coverage, and an interleaved 0.6.26 matched CLI benchmark. Verified: e2e:v0.7.1:check and ci:contract pass; full local audit completed with classified release blockers."
  -
    author: "CODER"
    body: "Rework completed: separated harness acceptance from final release acceptance, preserved fail-closed product and performance gates, and added the interleaved published-0.6.26 matched latency scenario to the full profile."
events:
  -
    type: "status"
    at: "2026-08-02T11:27:47.041Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-02T12:04:14.764Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation recorded: added the versioned v0.7.1 qualification manifest, audit/gate runner, classified defect ledger, focused lifecycle/context/supervisor/recovery/hosted suites, exact-subject efficiency checks, packed install coverage, and an interleaved 0.6.26 matched CLI benchmark. Verified: e2e:v0.7.1:check and ci:contract pass; full local audit completed with classified release blockers."
  -
    type: "verify"
    at: "2026-08-02T12:04:56.261Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework the task verification contract: the harness correctly emits release-blocking defects, but current Verify Steps incorrectly require the not-yet-fixed candidate to pass the final product gate before the harness can be integrated."
  -
    type: "status"
    at: "2026-08-02T12:06:19.128Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Rework completed: separated harness acceptance from final release acceptance, preserved fail-closed product and performance gates, and added the interleaved published-0.6.26 matched latency scenario to the full profile."
doc_version: 3
doc_updated_at: "2026-08-02T12:06:19.128Z"
doc_updated_by: "CODER"
description: "Specify and implement a deterministic E2E and benchmark matrix for every supported task lifecycle, automatic context preparation, managed and external-agent supervisor frontends, failure recovery, hosted integration, token efficiency, latency, and release acceptance. The suite must run against the candidate build, preserve observed evidence, compare to the v0.6 baseline, and emit an actionable defect ledger without claiming speed or token gains that are not measured."
sections:
  Summary: |-
    Build the v0.7.1 end-to-end release qualification suite

    Specify and implement a deterministic E2E and benchmark matrix for every supported task lifecycle, automatic context preparation, managed and external-agent supervisor frontends, failure recovery, hosted integration, token efficiency, latency, and release acceptance. The suite must run against the candidate build, preserve observed evidence, compare to the v0.6 baseline, and emit an actionable defect ledger without claiming speed or token gains that are not measured.
  Scope: "In scope: the complete public task lifecycle in direct and branch_pr modes; managed runner and external-agent supervisor paths; automatic task/context/knowledge preparation; authority and fingerprint boundaries; verification and evaluator outcomes; PR synchronization, hosted checks, integration and cleanup; failure recovery; context packet size; command count; provider and evaluator token usage; latency; scope correctness; benchmark comparison; CI and release evidence. The user-provided architecture audit and the current v0.7.0 qualification artifacts are input evidence. Out of scope for this task: implementing every discovered product fix. Each confirmed release-blocking defect that cannot be fixed without materially widening this task becomes a separate executable task before release."
  Plan: |-
    1. Inventory the candidate command, lifecycle, runner, context, benchmark, and release surfaces and map every supported use case to a deterministic E2E scenario.
    2. Define a versioned E2E manifest with direct and branch_pr flows, managed and external-agent frontends, approvals, human input, rework, evaluator, external wait, effect-in-doubt, crash/restart, stale state, context cold/warm/stale/provenance cases, and hosted integration boundaries.
    3. Build hermetic scenario drivers that use the packaged candidate binary, isolated repositories, deterministic fixtures, recorded provider episodes only where semantics are required, and machine-readable receipts for correctness, calls, tokens, packet size, wall time, scope, and recovery.
    4. Add matched baseline versus candidate qualification with explicit statistical aggregation and gates: zero unexpected lifecycle errors, no trust-boundary or scope regressions, no token regression and a material matched token saving, compact external-agent packets, at most two canonical external-agent operations for the normal flow, and setup/time-to-verified at or below the declared baseline.
    5. Execute the full local matrix and bounded provider replay against the candidate, classify every failure as product, contract, infrastructure, or diagnostic, and produce a release-blocking defect ledger with reproduction commands and proposed fixes.
    6. Integrate the suite into CI/release qualification, document local and hosted execution, run all declared checks, obtain independent evaluator review, and merge through the guarded branch_pr lane.
  Verify Steps: |-
    1. Run e2e:v0.7.1:check; require the versioned manifest to cover every declared workflow mode, supervisor frontend, lifecycle state, context condition, semantic stop, recovery state, and hosted boundary, and require unit coverage for manifest validation, audit-versus-gate exit behavior, exact-subject efficiency thresholds, and matched latency thresholds.
    2. Run the core and full audit profiles; require every selected scenario to execute, every non-zero result to become a classified defect with reproduction and evidence, audit mode to exit zero after writing a valid report even when the candidate is blocked, and partial selections never to claim readiness.
    3. Run the packed-candidate install scenario in an isolated temporary repository; require install, init, context ingest/search, lifecycle policy failures, migration coverage, and cleanup to complete without unexpected exits, invariant violations, leaked writes, or stale-state acceptance.
    4. Run the lifecycle, context, supervisor-parity, recovery, and hosted focused suites; require them to pass and preserve deterministic context freshness, provenance, budget, state fingerprint, authority, replay, effect-in-doubt, hosted wait, and cleanup behavior.
    5. Run the external product-contract probe; require it to encode the final release acceptance contract of task creation plus task advance --agent-json, no manual Git/worktree/PR/verify/finish/integrate/cleanup choreography, one compact representation per field, and a packet no larger than 2048 bytes. For this harness task, a missing product capability must be reported as a release-blocking defect rather than treated as a harness failure.
    6. Run the managed-runner parity suite; require shared supervisor state and evidence projections to pass. The final release gate, not this harness integration task, requires the external product-contract probe itself to pass.
    7. Run the historical efficiency evidence checker and the matched v0.6.26 CLI benchmark; require complete metrics and stable hashes, require unsupported exact-SHA or latency claims to fail closed, and require the report to preserve measured token reduction separately from release-blocking latency or provenance failures.
    8. Run failure/recovery scenarios for interruption, process loss, provider ambiguity, effect-in-doubt, replay, duplicate side effects, stale fingerprints, evaluator rework, approval expiry, hosted wait, and cleanup races; require deterministic safe stops and recoverable next actions.
    9. Run focused tests, critical CLI, typecheck, workflow coverage, full ci:contract, task-state check, doctor, and policy routing; require all harness and unchanged product contracts to pass.
    10. Validate the qualification report and defect ledger: every failure has classification, reproduction, evidence, impact, proposed fix, owner task, and release disposition; no speed or token-saving claim is emitted without matched evidence.
    11. Dry-run the provider selection and require the final gate to reject execution unless --provider, exact subject, and exact Codex version are supplied. The final release task must run the bounded 50-run and 55-provider-episode matrix once with no hidden retry; this harness task must not spend provider episodes on a known-blocked, non-final SHA.
    12. Run independent EVALUATOR review on the exact harness implementation revision and require pass before integration.
  Verification: |-
    Pending execution. Evidence will include a versioned scenario manifest, machine-readable per-run receipts, matched baseline comparison, context-quality report, latency attribution, provider usage summary, and a release-blocking defect ledger.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-02T12:04:56.261Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework the task verification contract: the harness correctly emits release-blocking defects, but current Verify Steps incorrectly require the not-yet-fixed candidate to pass the final product gate before the harness can be integrated.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T12:04:14.764Z, excerpt_hash=sha256:a075e5fdf1c30131bd3e8d8a69fc7bac30b159a48b09cca80f9f40f6d9c02730

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021125-DR7J1E-build-the-v0-7-1-end-to-end-release-qualificatio/.agentplane/tasks/202608021125-DR7J1E/blueprint/resolved-snapshot.json
    - old_digest: ccf061c335181ec612f926f1ff052ce04e841c7941b97908835e61ffe27da85a
    - current_digest: ccf061c335181ec612f926f1ff052ce04e841c7941b97908835e61ffe27da85a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608021125-DR7J1E

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608021125-DR7J1E
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task implementation commit and remove only newly added E2E/qualification registrations and generated candidate artifacts. Preserve prior v0.7 compatibility and RF-04 baselines. Never overwrite published baseline evidence; new baselines require a separately reviewed approval record."
  Findings: |-
    Initial audit risks to test, not assume: the supervised core is stronger than the default UX; README and quickstart still recommend task begin/task complete; task run is hidden; the external-agent path exposes manual lifecycle mechanics; tokens improve while setup and time-to-verified regress; CodeQL JavaScript/TypeScript took about twenty minutes on PR #4742; historical evidence may inflate repository and analysis cost.

    - Observation: The first full local qualification audit passed 13 of 16 selected phases. Packed install, lifecycle, context, supervisor parity, recovery, hosted boundaries, ci:contract, critical CLI, typecheck, workflow coverage, doctor, and task-state all passed. The external supervisor/onboarding contract and exact-subject efficiency evidence remained release-blocking; the historical absolute CLI guard also failed.
      Impact: The test architecture is executable and continues after failures, but v0.7.1 is not release-ready. The successful core matrices isolate the remaining work to product UX/supervisor and performance/evidence rather than general lifecycle correctness.
      Resolution: Keep audit mode non-blocking for classified collection, keep gate mode fail-closed, and create separate executable fix tasks for supervisor unification and performance before the provider gate.

    - Observation: An interleaved matched benchmark on the same host and Node runtime compared published 0.6.26 with the packed 0.7.0 candidate over seven samples per command. All seven measured CLI commands were slower: median regressions ranged from 19.6 percent to 31.1 percent.
      Impact: The startup and formal preparation latency regression is product-attributable rather than only drift in the May absolute threshold; release acceleration criteria are not met.
      Resolution: Use the per-command matched artifact to optimize shared startup and task-read paths, then rerun the exact same matched benchmark with zero median-regression allowance.

    - Observation: The versioned audit runner and self-tests pass, while expected product and performance scenarios fail with classified defects. Verify Steps 4 through 7 and 11 currently conflate harness acceptance with final v0.7.1 release acceptance.
      Impact: Recording OK now would be false; keeping the conflated contract would prevent merging the tool needed to drive the follow-up fixes.
      Resolution: Split audit-harness acceptance from final gate acceptance: this task must prove complete execution, classification, fail-closed gate behavior, and evidence integrity; the release task later requires every blocking scenario plus provider evidence to pass.
extensions:
  workflow_route_baseline:
    start_head_sha: "6e8723251676578cedc8ef8d53b76e3da06833f6"
    version: 1
id_source: "generated"
---
## Summary

Build the v0.7.1 end-to-end release qualification suite

Specify and implement a deterministic E2E and benchmark matrix for every supported task lifecycle, automatic context preparation, managed and external-agent supervisor frontends, failure recovery, hosted integration, token efficiency, latency, and release acceptance. The suite must run against the candidate build, preserve observed evidence, compare to the v0.6 baseline, and emit an actionable defect ledger without claiming speed or token gains that are not measured.

## Scope

In scope: the complete public task lifecycle in direct and branch_pr modes; managed runner and external-agent supervisor paths; automatic task/context/knowledge preparation; authority and fingerprint boundaries; verification and evaluator outcomes; PR synchronization, hosted checks, integration and cleanup; failure recovery; context packet size; command count; provider and evaluator token usage; latency; scope correctness; benchmark comparison; CI and release evidence. The user-provided architecture audit and the current v0.7.0 qualification artifacts are input evidence. Out of scope for this task: implementing every discovered product fix. Each confirmed release-blocking defect that cannot be fixed without materially widening this task becomes a separate executable task before release.

## Plan

1. Inventory the candidate command, lifecycle, runner, context, benchmark, and release surfaces and map every supported use case to a deterministic E2E scenario.
2. Define a versioned E2E manifest with direct and branch_pr flows, managed and external-agent frontends, approvals, human input, rework, evaluator, external wait, effect-in-doubt, crash/restart, stale state, context cold/warm/stale/provenance cases, and hosted integration boundaries.
3. Build hermetic scenario drivers that use the packaged candidate binary, isolated repositories, deterministic fixtures, recorded provider episodes only where semantics are required, and machine-readable receipts for correctness, calls, tokens, packet size, wall time, scope, and recovery.
4. Add matched baseline versus candidate qualification with explicit statistical aggregation and gates: zero unexpected lifecycle errors, no trust-boundary or scope regressions, no token regression and a material matched token saving, compact external-agent packets, at most two canonical external-agent operations for the normal flow, and setup/time-to-verified at or below the declared baseline.
5. Execute the full local matrix and bounded provider replay against the candidate, classify every failure as product, contract, infrastructure, or diagnostic, and produce a release-blocking defect ledger with reproduction commands and proposed fixes.
6. Integrate the suite into CI/release qualification, document local and hosted execution, run all declared checks, obtain independent evaluator review, and merge through the guarded branch_pr lane.

## Verify Steps

1. Run e2e:v0.7.1:check; require the versioned manifest to cover every declared workflow mode, supervisor frontend, lifecycle state, context condition, semantic stop, recovery state, and hosted boundary, and require unit coverage for manifest validation, audit-versus-gate exit behavior, exact-subject efficiency thresholds, and matched latency thresholds.
2. Run the core and full audit profiles; require every selected scenario to execute, every non-zero result to become a classified defect with reproduction and evidence, audit mode to exit zero after writing a valid report even when the candidate is blocked, and partial selections never to claim readiness.
3. Run the packed-candidate install scenario in an isolated temporary repository; require install, init, context ingest/search, lifecycle policy failures, migration coverage, and cleanup to complete without unexpected exits, invariant violations, leaked writes, or stale-state acceptance.
4. Run the lifecycle, context, supervisor-parity, recovery, and hosted focused suites; require them to pass and preserve deterministic context freshness, provenance, budget, state fingerprint, authority, replay, effect-in-doubt, hosted wait, and cleanup behavior.
5. Run the external product-contract probe; require it to encode the final release acceptance contract of task creation plus task advance --agent-json, no manual Git/worktree/PR/verify/finish/integrate/cleanup choreography, one compact representation per field, and a packet no larger than 2048 bytes. For this harness task, a missing product capability must be reported as a release-blocking defect rather than treated as a harness failure.
6. Run the managed-runner parity suite; require shared supervisor state and evidence projections to pass. The final release gate, not this harness integration task, requires the external product-contract probe itself to pass.
7. Run the historical efficiency evidence checker and the matched v0.6.26 CLI benchmark; require complete metrics and stable hashes, require unsupported exact-SHA or latency claims to fail closed, and require the report to preserve measured token reduction separately from release-blocking latency or provenance failures.
8. Run failure/recovery scenarios for interruption, process loss, provider ambiguity, effect-in-doubt, replay, duplicate side effects, stale fingerprints, evaluator rework, approval expiry, hosted wait, and cleanup races; require deterministic safe stops and recoverable next actions.
9. Run focused tests, critical CLI, typecheck, workflow coverage, full ci:contract, task-state check, doctor, and policy routing; require all harness and unchanged product contracts to pass.
10. Validate the qualification report and defect ledger: every failure has classification, reproduction, evidence, impact, proposed fix, owner task, and release disposition; no speed or token-saving claim is emitted without matched evidence.
11. Dry-run the provider selection and require the final gate to reject execution unless --provider, exact subject, and exact Codex version are supplied. The final release task must run the bounded 50-run and 55-provider-episode matrix once with no hidden retry; this harness task must not spend provider episodes on a known-blocked, non-final SHA.
12. Run independent EVALUATOR review on the exact harness implementation revision and require pass before integration.

## Verification

Pending execution. Evidence will include a versioned scenario manifest, machine-readable per-run receipts, matched baseline comparison, context-quality report, latency attribution, provider usage summary, and a release-blocking defect ledger.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-02T12:04:56.261Z — VERIFY — needs_rework

By: TESTER

Note: Rework the task verification contract: the harness correctly emits release-blocking defects, but current Verify Steps incorrectly require the not-yet-fixed candidate to pass the final product gate before the harness can be integrated.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T12:04:14.764Z, excerpt_hash=sha256:a075e5fdf1c30131bd3e8d8a69fc7bac30b159a48b09cca80f9f40f6d9c02730

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021125-DR7J1E-build-the-v0-7-1-end-to-end-release-qualificatio/.agentplane/tasks/202608021125-DR7J1E/blueprint/resolved-snapshot.json
- old_digest: ccf061c335181ec612f926f1ff052ce04e841c7941b97908835e61ffe27da85a
- current_digest: ccf061c335181ec612f926f1ff052ce04e841c7941b97908835e61ffe27da85a
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608021125-DR7J1E

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608021125-DR7J1E
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task implementation commit and remove only newly added E2E/qualification registrations and generated candidate artifacts. Preserve prior v0.7 compatibility and RF-04 baselines. Never overwrite published baseline evidence; new baselines require a separately reviewed approval record.

## Findings

Initial audit risks to test, not assume: the supervised core is stronger than the default UX; README and quickstart still recommend task begin/task complete; task run is hidden; the external-agent path exposes manual lifecycle mechanics; tokens improve while setup and time-to-verified regress; CodeQL JavaScript/TypeScript took about twenty minutes on PR #4742; historical evidence may inflate repository and analysis cost.

- Observation: The first full local qualification audit passed 13 of 16 selected phases. Packed install, lifecycle, context, supervisor parity, recovery, hosted boundaries, ci:contract, critical CLI, typecheck, workflow coverage, doctor, and task-state all passed. The external supervisor/onboarding contract and exact-subject efficiency evidence remained release-blocking; the historical absolute CLI guard also failed.
  Impact: The test architecture is executable and continues after failures, but v0.7.1 is not release-ready. The successful core matrices isolate the remaining work to product UX/supervisor and performance/evidence rather than general lifecycle correctness.
  Resolution: Keep audit mode non-blocking for classified collection, keep gate mode fail-closed, and create separate executable fix tasks for supervisor unification and performance before the provider gate.

- Observation: An interleaved matched benchmark on the same host and Node runtime compared published 0.6.26 with the packed 0.7.0 candidate over seven samples per command. All seven measured CLI commands were slower: median regressions ranged from 19.6 percent to 31.1 percent.
  Impact: The startup and formal preparation latency regression is product-attributable rather than only drift in the May absolute threshold; release acceleration criteria are not met.
  Resolution: Use the per-command matched artifact to optimize shared startup and task-read paths, then rerun the exact same matched benchmark with zero median-regression allowance.

- Observation: The versioned audit runner and self-tests pass, while expected product and performance scenarios fail with classified defects. Verify Steps 4 through 7 and 11 currently conflate harness acceptance with final v0.7.1 release acceptance.
  Impact: Recording OK now would be false; keeping the conflated contract would prevent merging the tool needed to drive the follow-up fixes.
  Resolution: Split audit-harness acceptance from final gate acceptance: this task must prove complete execution, classification, fail-closed gate behavior, and evidence integrity; the release task later requires every blocking scenario plus provider evidence to pass.
