---
id: "202608021125-DR7J1E"
title: "Build the v0.7.1 end-to-end release qualification suite"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 11
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
  updated_at: "2026-08-02T11:26:57.210Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "TESTER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-02T11:27:47.041Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-02T12:00:43.091Z"
doc_updated_by: "TESTER"
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
    1. Run the E2E manifest schema and scenario coverage checker; every declared lifecycle state, supported workflow mode, supervisor frontend, context condition, semantic stop, recovery state, and hosted boundary must map to at least one executable scenario.
    2. Run all hermetic E2E scenarios against the packed candidate binary in isolated temporary repositories; require zero unexpected exits, invariant violations, leaked writes, stale-state acceptance, or unclassified failures.
    3. Run context-layer E2E scenarios for fresh, warm, stale, missing, conflicting, provenance-restricted, and token-budgeted inputs; validate deterministic manifests, minimal sufficient context, source attribution, and fail-closed behavior.
    4. Run matched baseline-versus-candidate efficiency qualification with repeated deterministic samples; require complete token cells, complete scalar cells, stable structural hashes, candidate total tokens no worse than baseline in any mandatory cell, and at least 20 percent aggregate token reduction without lower verified-success quality.
    5. Run external-agent protocol acceptance; require task creation plus one canonical advance loop, no manual Git/worktree/PR/verify/finish/integrate/cleanup operations in the normal branch_pr path, one representation per compact field, and a normal agent packet no larger than 2048 bytes.
    6. Run managed-runner parity acceptance; require managed and external frontends to traverse the same supervisor state machine and yield equivalent lifecycle/evidence outcomes for matched scenarios.
    7. Run latency qualification; require setup overhead and time-to-verified at or below the declared v0.6 baseline, or fail the release gate with attributed phase-level timings and a release-blocking defect.
    8. Run failure/recovery scenarios for interruption, process loss, provider ambiguity, effect-in-doubt, replay, duplicate side effects, stale fingerprints, evaluator rework, approval expiry, hosted wait, and cleanup races; require deterministic safe stops and recoverable next actions.
    9. Run focused tests, critical CLI, typecheck, workflow/lifecycle guards, full ci:contract, task-state check, doctor, and policy routing.
    10. Validate the generated qualification report and defect ledger: every failure has classification, reproduction, evidence, impact, proposed fix, owner task, and release disposition; no claim of speed or token saving is emitted without matched evidence.
    11. Run the bounded semantic provider matrix with the approved Codex authentication and no hidden retry of failed semantic episodes; record provider episode counts and token usage.
    12. Run independent EVALUATOR review on the exact implementation revision and require pass before PR publication.
  Verification: "Pending execution. Evidence will include a versioned scenario manifest, machine-readable per-run receipts, matched baseline comparison, context-quality report, latency attribution, provider usage summary, and a release-blocking defect ledger."
  Rollback Plan: "Revert the task implementation commit and remove only newly added E2E/qualification registrations and generated candidate artifacts. Preserve prior v0.7 compatibility and RF-04 baselines. Never overwrite published baseline evidence; new baselines require a separately reviewed approval record."
  Findings: |-
    Initial audit risks to test, not assume: the supervised core is stronger than the default UX; README and quickstart still recommend task begin/task complete; task run is hidden; the external-agent path exposes manual lifecycle mechanics; tokens improve while setup and time-to-verified regress; CodeQL JavaScript/TypeScript took about twenty minutes on PR #4742; historical evidence may inflate repository and analysis cost.

    - Observation: The first full local qualification audit passed 13 of 16 selected phases. Packed install, lifecycle, context, supervisor parity, recovery, hosted boundaries, ci:contract, critical CLI, typecheck, workflow coverage, doctor, and task-state all passed. The external supervisor/onboarding contract and exact-subject efficiency evidence remained release-blocking; the historical absolute CLI guard also failed.
      Impact: The test architecture is executable and continues after failures, but v0.7.1 is not release-ready. The successful core matrices isolate the remaining work to product UX/supervisor and performance/evidence rather than general lifecycle correctness.
      Resolution: Keep audit mode non-blocking for classified collection, keep gate mode fail-closed, and create separate executable fix tasks for supervisor unification and performance before the provider gate.

    - Observation: An interleaved matched benchmark on the same host and Node runtime compared published 0.6.26 with the packed 0.7.0 candidate over seven samples per command. All seven measured CLI commands were slower: median regressions ranged from 19.6 percent to 31.1 percent.
      Impact: The startup and formal preparation latency regression is product-attributable rather than only drift in the May absolute threshold; release acceleration criteria are not met.
      Resolution: Use the per-command matched artifact to optimize shared startup and task-read paths, then rerun the exact same matched benchmark with zero median-regression allowance.
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

1. Run the E2E manifest schema and scenario coverage checker; every declared lifecycle state, supported workflow mode, supervisor frontend, context condition, semantic stop, recovery state, and hosted boundary must map to at least one executable scenario.
2. Run all hermetic E2E scenarios against the packed candidate binary in isolated temporary repositories; require zero unexpected exits, invariant violations, leaked writes, stale-state acceptance, or unclassified failures.
3. Run context-layer E2E scenarios for fresh, warm, stale, missing, conflicting, provenance-restricted, and token-budgeted inputs; validate deterministic manifests, minimal sufficient context, source attribution, and fail-closed behavior.
4. Run matched baseline-versus-candidate efficiency qualification with repeated deterministic samples; require complete token cells, complete scalar cells, stable structural hashes, candidate total tokens no worse than baseline in any mandatory cell, and at least 20 percent aggregate token reduction without lower verified-success quality.
5. Run external-agent protocol acceptance; require task creation plus one canonical advance loop, no manual Git/worktree/PR/verify/finish/integrate/cleanup operations in the normal branch_pr path, one representation per compact field, and a normal agent packet no larger than 2048 bytes.
6. Run managed-runner parity acceptance; require managed and external frontends to traverse the same supervisor state machine and yield equivalent lifecycle/evidence outcomes for matched scenarios.
7. Run latency qualification; require setup overhead and time-to-verified at or below the declared v0.6 baseline, or fail the release gate with attributed phase-level timings and a release-blocking defect.
8. Run failure/recovery scenarios for interruption, process loss, provider ambiguity, effect-in-doubt, replay, duplicate side effects, stale fingerprints, evaluator rework, approval expiry, hosted wait, and cleanup races; require deterministic safe stops and recoverable next actions.
9. Run focused tests, critical CLI, typecheck, workflow/lifecycle guards, full ci:contract, task-state check, doctor, and policy routing.
10. Validate the generated qualification report and defect ledger: every failure has classification, reproduction, evidence, impact, proposed fix, owner task, and release disposition; no claim of speed or token saving is emitted without matched evidence.
11. Run the bounded semantic provider matrix with the approved Codex authentication and no hidden retry of failed semantic episodes; record provider episode counts and token usage.
12. Run independent EVALUATOR review on the exact implementation revision and require pass before PR publication.

## Verification

Pending execution. Evidence will include a versioned scenario manifest, machine-readable per-run receipts, matched baseline comparison, context-quality report, latency attribution, provider usage summary, and a release-blocking defect ledger.

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
