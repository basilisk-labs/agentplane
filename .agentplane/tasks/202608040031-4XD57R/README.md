---
id: "202608040031-4XD57R"
title: "Attribute and remove redundant Git observations from direct supervisor preparation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "performance"
  - "qualification"
  - "supervisor"
  - "v0.7.1"
verify:
  - "The benchmark report must expose bounded deterministic Git command histograms for baseline and candidate samples without adding work inside the timed interval."
  - "The candidate must reduce the measured direct managed-preparation observation count, preserve all route and recovery invariants, and pass the unchanged 20-cold/30-warm +10% median and p95 gate."
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T00:32:00.398Z"
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
    author: "CODER"
    body: "Start: instrument the matched supervisor benchmark and remove only the measured duplicate Git observations."
events:
  -
    type: "status"
    at: "2026-08-04T00:32:15.569Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: instrument the matched supervisor benchmark and remove only the measured duplicate Git observations."
doc_version: 3
doc_updated_at: "2026-08-04T00:32:15.569Z"
doc_updated_by: "CODER"
description: "Extend the packed supervisor benchmark with deterministic per-command Git histograms, use those measurements to identify and remove only duplicated direct-workflow observations whose values are already covered by the same command context or route snapshot, preserve all stale-state and side-effect-safety invariants, and restore every cold and warm median and p95 surface below the unchanged +10% v0.6.26 ceiling."
sections:
  Summary: |-
    Attribute and remove redundant Git observations from direct supervisor preparation

    Extend the packed supervisor benchmark with deterministic per-command Git histograms, use those measurements to identify and remove only duplicated direct-workflow observations whose values are already covered by the same command context or route snapshot, preserve all stale-state and side-effect-safety invariants, and restore every cold and warm median and p95 surface below the unchanged +10% v0.6.26 ceiling.
  Scope: |-
    - In scope: Extend the packed supervisor benchmark with deterministic per-command Git histograms, use those measurements to identify and remove only duplicated direct-workflow observations whose values are already covered by the same command context or route snapshot, preserve all stale-state and side-effect-safety invariants, and restore every cold and warm median and p95 surface below the unchanged +10% v0.6.26 ceiling.
    - Out of scope: unrelated refactors not required for "Attribute and remove redundant Git observations from direct supervisor preparation".
  Plan: "1. Extend the supervisor latency report with bounded exact Git-command histograms aggregated outside the measured interval, and add contract tests for deterministic ordering and sample accounting. 2. Run the instrumented packed v0.6.26 versus current-main comparison to identify the exact two extra managed-preparation commands and any external-path asymmetry; preserve the raw report as task evidence. 3. Remove only observations that duplicate values already proven fresh in the same immutable command context or route snapshot; keep direct and branch_pr checkout identity, HEAD refresh after mutations, fingerprints, approvals, policy, provider, and effect-safety checks unchanged. 4. Add focused invalidation and parity tests, freeze a clean SHA, and require all four 20-cold/30-warm median and p95 surfaces to pass the unchanged +10% gate with a reduced candidate Git-command count. 5. Run critical/static/policy checks, independent evaluation, exact-head hosted review, and integrate through the queue before rebasing release qualification."
  Verify Steps: |-
    1. Run the qualification contract tests for the supervisor latency report. Expected: each baseline/candidate surface contains a deterministic, bounded Git command histogram whose total equals the summed per-sample Git subprocess count; instrumentation occurs after the timed command sequence.
    2. Run the instrumented packed benchmark against v0.6.26 on a clean SHA with at least 20 cold and 30 warm samples. Expected: the report identifies exact repeated command families and preserves raw evidence; no provider call occurs.
    3. Run focused route, task-run-path, supervisor, recovery, stale task/Git/policy/approval, concurrency, crash, and effect-in-doubt suites. Expected: the chosen observation reuse invalidates on every covered state change and no protected side effect can replay.
    4. Re-run node scripts/qualification/measure-v0.7.1-supervisor-latency.mjs --subject <clean-implementation-sha> --out <task-evidence>. Expected: every cold/warm median and p95 is <=10% above v0.6.26; managed candidate Git observations are lower than the blocked 2da557536 count of 8 and external preparation does not regress.
    5. Run bun run typecheck, touched ESLint/Prettier, bun run test:critical, ap doctor, node .agentplane/policy/check-routing.mjs, independent EVALUATOR, exact-head hosted checks, and review-thread audit. Expected: all pass before queue integration and hosted close.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "bae47b05c31e7e489a1c49ce12f7a27d6f44486a"
    version: 1
id_source: "generated"
---
## Summary

Attribute and remove redundant Git observations from direct supervisor preparation

Extend the packed supervisor benchmark with deterministic per-command Git histograms, use those measurements to identify and remove only duplicated direct-workflow observations whose values are already covered by the same command context or route snapshot, preserve all stale-state and side-effect-safety invariants, and restore every cold and warm median and p95 surface below the unchanged +10% v0.6.26 ceiling.

## Scope

- In scope: Extend the packed supervisor benchmark with deterministic per-command Git histograms, use those measurements to identify and remove only duplicated direct-workflow observations whose values are already covered by the same command context or route snapshot, preserve all stale-state and side-effect-safety invariants, and restore every cold and warm median and p95 surface below the unchanged +10% v0.6.26 ceiling.
- Out of scope: unrelated refactors not required for "Attribute and remove redundant Git observations from direct supervisor preparation".

## Plan

1. Extend the supervisor latency report with bounded exact Git-command histograms aggregated outside the measured interval, and add contract tests for deterministic ordering and sample accounting. 2. Run the instrumented packed v0.6.26 versus current-main comparison to identify the exact two extra managed-preparation commands and any external-path asymmetry; preserve the raw report as task evidence. 3. Remove only observations that duplicate values already proven fresh in the same immutable command context or route snapshot; keep direct and branch_pr checkout identity, HEAD refresh after mutations, fingerprints, approvals, policy, provider, and effect-safety checks unchanged. 4. Add focused invalidation and parity tests, freeze a clean SHA, and require all four 20-cold/30-warm median and p95 surfaces to pass the unchanged +10% gate with a reduced candidate Git-command count. 5. Run critical/static/policy checks, independent evaluation, exact-head hosted review, and integrate through the queue before rebasing release qualification.

## Verify Steps

1. Run the qualification contract tests for the supervisor latency report. Expected: each baseline/candidate surface contains a deterministic, bounded Git command histogram whose total equals the summed per-sample Git subprocess count; instrumentation occurs after the timed command sequence.
2. Run the instrumented packed benchmark against v0.6.26 on a clean SHA with at least 20 cold and 30 warm samples. Expected: the report identifies exact repeated command families and preserves raw evidence; no provider call occurs.
3. Run focused route, task-run-path, supervisor, recovery, stale task/Git/policy/approval, concurrency, crash, and effect-in-doubt suites. Expected: the chosen observation reuse invalidates on every covered state change and no protected side effect can replay.
4. Re-run node scripts/qualification/measure-v0.7.1-supervisor-latency.mjs --subject <clean-implementation-sha> --out <task-evidence>. Expected: every cold/warm median and p95 is <=10% above v0.6.26; managed candidate Git observations are lower than the blocked 2da557536 count of 8 and external preparation does not regress.
5. Run bun run typecheck, touched ESLint/Prettier, bun run test:critical, ap doctor, node .agentplane/policy/check-routing.mjs, independent EVALUATOR, exact-head hosted checks, and review-thread audit. Expected: all pass before queue integration and hosted close.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
