---
id: "202608022324-Y26ENH"
title: "Restore supervisor orchestration latency to the v0.6 baseline"
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
  - "supervisor"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "performance.benchmark"
verify:
  - "Run matched warm and cold supervisor benchmarks with confidence intervals and require setup latency and time-to-verified to be no worse than the approved baseline tolerance."
  - "Run task advance/run parity, stale-state, recovery, test:critical, typecheck, lint:core, Knip, and policy gates."
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T23:27:24.456Z"
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
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-03T01:51:46.120Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-03T01:51:46.120Z"
doc_updated_by: "CODER"
description: "Profile the canonical task advance and task run preparation paths, remove redundant repository scans, CLI bootstraps, context preparation, and route recomputation where state fingerprints permit safe reuse, and establish release gates that prevent setup latency or time-to-verified regressions relative to the matched v0.6 baseline without weakening correctness or evidence."
sections:
  Summary: |-
    Restore supervisor orchestration latency to the v0.6 baseline

    Profile the canonical task advance and task run preparation paths, remove redundant repository scans, CLI bootstraps, context preparation, and route recomputation where state fingerprints permit safe reuse, and establish release gates that prevent setup latency or time-to-verified regressions relative to the matched v0.6 baseline without weakening correctness or evidence.
  Scope: |-
    - In scope: Profile the canonical task advance and task run preparation paths, remove redundant repository scans, CLI bootstraps, context preparation, and route recomputation where state fingerprints permit safe reuse, and establish release gates that prevent setup latency or time-to-verified regressions relative to the matched v0.6 baseline without weakening correctness or evidence.
    - Out of scope: unrelated refactors not required for "Restore supervisor orchestration latency to the v0.6 baseline".
  Plan: "1. Establish matched v0.6.26 and current-main cold/warm profiles for task creation, task advance preparation, task run dry-run, and end-to-end verified completion; separate process startup, repository scans, context preparation, route computation, checks, and provider wait. 2. Remove redundant work only at deterministic boundaries: share immutable per-process repository/config/catalog state, reuse content-addressed preparation artifacts while fingerprints match, avoid duplicate remote/local route probes, and preserve invalidation on every state-changing input. 3. Add benchmark gates and regression fixtures proving caches cannot hide stale task, Git, policy, approval, or provider state and cannot replay side effects. 4. Require median setup latency and time-to-verified to return within the approved v0.6.26 tolerance while preserving the v0.7 token, verified-success, scope, and golden-output gains. 5. Run focused performance/recovery suites plus critical/static/size/policy gates and record the exact before/after distributions for final qualification."
  Verify Steps: "1. Run the matched deterministic latency harness against v0.6.26 and the candidate for at least 10 cold and 30 warm repetitions per task advance and task run preparation path. Expected: report median, p95, confidence interval, subprocess count, repository scans, prepared-context bytes, and cache hit/miss state; candidate median setup latency is no worse than 10% above v0.6.26 and shows a material improvement over the current v0.7.0 baseline. 2. Run matched end-to-end verified-task fixtures. Expected: time-to-verified returns within 10% of v0.6.26 while verified success, scope violations, golden-output mismatch, rework, and token metrics do not regress beyond the v0.7 qualification thresholds. 3. Run stale task/Git/policy/approval/provider, crash recovery, concurrent execution, and effect-in-doubt fixtures. Expected: every changed fingerprint invalidates reused preparation and no protected effect is replayed. 4. Run bun run typecheck, bun run lint:core, bun run knip:check, bun run hotspots:check, node .agentplane/policy/check-routing.mjs, and bun run test:critical. Expected: all gates pass without baseline growth."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "f073d4b9fbe13ab18db54ad14741651f0403b0a7"
    version: 1
id_source: "generated"
---
## Summary

Restore supervisor orchestration latency to the v0.6 baseline

Profile the canonical task advance and task run preparation paths, remove redundant repository scans, CLI bootstraps, context preparation, and route recomputation where state fingerprints permit safe reuse, and establish release gates that prevent setup latency or time-to-verified regressions relative to the matched v0.6 baseline without weakening correctness or evidence.

## Scope

- In scope: Profile the canonical task advance and task run preparation paths, remove redundant repository scans, CLI bootstraps, context preparation, and route recomputation where state fingerprints permit safe reuse, and establish release gates that prevent setup latency or time-to-verified regressions relative to the matched v0.6 baseline without weakening correctness or evidence.
- Out of scope: unrelated refactors not required for "Restore supervisor orchestration latency to the v0.6 baseline".

## Plan

1. Establish matched v0.6.26 and current-main cold/warm profiles for task creation, task advance preparation, task run dry-run, and end-to-end verified completion; separate process startup, repository scans, context preparation, route computation, checks, and provider wait. 2. Remove redundant work only at deterministic boundaries: share immutable per-process repository/config/catalog state, reuse content-addressed preparation artifacts while fingerprints match, avoid duplicate remote/local route probes, and preserve invalidation on every state-changing input. 3. Add benchmark gates and regression fixtures proving caches cannot hide stale task, Git, policy, approval, or provider state and cannot replay side effects. 4. Require median setup latency and time-to-verified to return within the approved v0.6.26 tolerance while preserving the v0.7 token, verified-success, scope, and golden-output gains. 5. Run focused performance/recovery suites plus critical/static/size/policy gates and record the exact before/after distributions for final qualification.

## Verify Steps

1. Run the matched deterministic latency harness against v0.6.26 and the candidate for at least 10 cold and 30 warm repetitions per task advance and task run preparation path. Expected: report median, p95, confidence interval, subprocess count, repository scans, prepared-context bytes, and cache hit/miss state; candidate median setup latency is no worse than 10% above v0.6.26 and shows a material improvement over the current v0.7.0 baseline. 2. Run matched end-to-end verified-task fixtures. Expected: time-to-verified returns within 10% of v0.6.26 while verified success, scope violations, golden-output mismatch, rework, and token metrics do not regress beyond the v0.7 qualification thresholds. 3. Run stale task/Git/policy/approval/provider, crash recovery, concurrent execution, and effect-in-doubt fixtures. Expected: every changed fingerprint invalidates reused preparation and no protected effect is replayed. 4. Run bun run typecheck, bun run lint:core, bun run knip:check, bun run hotspots:check, node .agentplane/policy/check-routing.mjs, and bun run test:critical. Expected: all gates pass without baseline growth.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
