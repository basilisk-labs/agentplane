---
id: "202608040021-RWW0ND"
title: "Remove redundant direct-workflow checkout discovery from supervisor preparation"
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
verify:
  - "Direct-workflow route preparation must use the current resolved project checkout without a worktree-list Git scan while branch_pr routing remains unchanged."
  - "Focused route, task-run, stale-state, recovery, and packed supervisor benchmark checks must pass; cold and warm median and p95 remain within +10% of v0.6.26 with at least 20 cold and 30 warm samples."
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T00:21:46.673Z"
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
    at: "2026-08-04T00:22:06.242Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-04T00:22:06.242Z"
doc_updated_by: "CODER"
description: "Eliminate the unnecessary worktree lookup performed while building a direct-workflow route, preserve authoritative checkout identity and stale-state invalidation, expose enough deterministic evidence to attribute the Git observation reduction, and restore cold managed task-run p95 below the unchanged +10% v0.6.26 release ceiling."
sections:
  Summary: |-
    Remove redundant direct-workflow checkout discovery from supervisor preparation

    Eliminate the unnecessary worktree lookup performed while building a direct-workflow route, preserve authoritative checkout identity and stale-state invalidation, expose enough deterministic evidence to attribute the Git observation reduction, and restore cold managed task-run p95 below the unchanged +10% v0.6.26 release ceiling.
  Scope: |-
    - In scope: Eliminate the unnecessary worktree lookup performed while building a direct-workflow route, preserve authoritative checkout identity and stale-state invalidation, expose enough deterministic evidence to attribute the Git observation reduction, and restore cold managed task-run p95 below the unchanged +10% v0.6.26 release ceiling.
    - Out of scope: unrelated refactors not required for "Remove redundant direct-workflow checkout discovery from supervisor preparation".
  Plan: "1. Reproduce the blocked cold managed-preparation result from the preserved 2da557536 evidence and attribute the direct-workflow route's repository observations. 2. Make base-checkout resolution workflow-aware: direct mode must reuse the already resolved project Git root, while branch_pr continues to discover the recorded base worktree; do not change HEAD freshness, fingerprint, approval, policy, or side-effect-authority checks. 3. Add focused tests proving direct mode does not invoke worktree discovery and branch_pr still does, then run supervisor, recovery, and task-run regression suites. 4. Freeze a clean implementation SHA and run the packed v0.6.26 comparison with 20 cold and 30 warm samples; require all four median and p95 surfaces to remain within the unchanged +10% ceiling and record repository-scan counts. 5. Run typecheck, touched lint/format, critical CLI, doctor, routing policy, independent evaluator, hosted PR checks, and merge through the integration queue."
  Verify Steps: |-
    1. Run the focused route base-checkout resolver tests plus the v0.7 supervisor, recovery, and task-run-path suites. Expected: direct mode returns the resolved project checkout without calling worktree discovery; branch_pr still resolves the base worktree; stale task, Git, policy, approval, crash-recovery, concurrency, and effect-in-doubt protections remain green.
    2. Run node scripts/qualification/measure-v0.7.1-supervisor-latency.mjs --subject <clean-implementation-sha> --out .agentplane/tasks/202608040021-RWW0ND/evidence/supervisor-latency-<sha>.json. Expected: at least 20 cold and 30 warm samples per side; every median and p95 comparison is <=10% above v0.6.26; direct managed preparation records one fewer repository scan than the blocked 2da557536 evidence.
    3. Run bun run typecheck, ESLint and Prettier on touched files, bun run test:critical, ap doctor, and node .agentplane/policy/check-routing.mjs. Expected: all checks pass without baseline growth or policy findings.
    4. Obtain an independent EVALUATOR pass, publish the exact reviewed head, require all hosted checks and review threads green/resolved, then integrate through the AgentPlane queue and hosted-close workflow.
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

Remove redundant direct-workflow checkout discovery from supervisor preparation

Eliminate the unnecessary worktree lookup performed while building a direct-workflow route, preserve authoritative checkout identity and stale-state invalidation, expose enough deterministic evidence to attribute the Git observation reduction, and restore cold managed task-run p95 below the unchanged +10% v0.6.26 release ceiling.

## Scope

- In scope: Eliminate the unnecessary worktree lookup performed while building a direct-workflow route, preserve authoritative checkout identity and stale-state invalidation, expose enough deterministic evidence to attribute the Git observation reduction, and restore cold managed task-run p95 below the unchanged +10% v0.6.26 release ceiling.
- Out of scope: unrelated refactors not required for "Remove redundant direct-workflow checkout discovery from supervisor preparation".

## Plan

1. Reproduce the blocked cold managed-preparation result from the preserved 2da557536 evidence and attribute the direct-workflow route's repository observations. 2. Make base-checkout resolution workflow-aware: direct mode must reuse the already resolved project Git root, while branch_pr continues to discover the recorded base worktree; do not change HEAD freshness, fingerprint, approval, policy, or side-effect-authority checks. 3. Add focused tests proving direct mode does not invoke worktree discovery and branch_pr still does, then run supervisor, recovery, and task-run regression suites. 4. Freeze a clean implementation SHA and run the packed v0.6.26 comparison with 20 cold and 30 warm samples; require all four median and p95 surfaces to remain within the unchanged +10% ceiling and record repository-scan counts. 5. Run typecheck, touched lint/format, critical CLI, doctor, routing policy, independent evaluator, hosted PR checks, and merge through the integration queue.

## Verify Steps

1. Run the focused route base-checkout resolver tests plus the v0.7 supervisor, recovery, and task-run-path suites. Expected: direct mode returns the resolved project checkout without calling worktree discovery; branch_pr still resolves the base worktree; stale task, Git, policy, approval, crash-recovery, concurrency, and effect-in-doubt protections remain green.
2. Run node scripts/qualification/measure-v0.7.1-supervisor-latency.mjs --subject <clean-implementation-sha> --out .agentplane/tasks/202608040021-RWW0ND/evidence/supervisor-latency-<sha>.json. Expected: at least 20 cold and 30 warm samples per side; every median and p95 comparison is <=10% above v0.6.26; direct managed preparation records one fewer repository scan than the blocked 2da557536 evidence.
3. Run bun run typecheck, ESLint and Prettier on touched files, bun run test:critical, ap doctor, and node .agentplane/policy/check-routing.mjs. Expected: all checks pass without baseline growth or policy findings.
4. Obtain an independent EVALUATOR pass, publish the exact reviewed head, require all hosted checks and review threads green/resolved, then integrate through the AgentPlane queue and hosted-close workflow.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
