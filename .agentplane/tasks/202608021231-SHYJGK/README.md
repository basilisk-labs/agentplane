---
id: "202608021231-SHYJGK"
title: "Remove the v0.7.1 matched CLI latency regression"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "performance"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "performance.benchmark"
verify:
  - "bun run typecheck"
  - "node scripts/qualification/measure-v0.7.1-matched-cli-latency.mjs --subject HEAD --out .agentplane/cache/v0.7.1-matched-cli-latency.json"
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T15:35:25.204Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-08-02T15:34:27.628Z"
doc_updated_by: "PLANNER"
description: "Profile the packed v0.7.1 candidate against published 0.6.26 on identical fixtures and remove duplicated startup, repository, task-index, and context preparation work until every release-gated command has a non-regressing interleaved median without weakening correctness."
sections:
  Summary: |-
    Remove the v0.7.1 matched CLI latency regression

    Profile the packed v0.7.1 candidate against published 0.6.26 on identical fixtures and remove duplicated startup, repository, task-index, and context preparation work until every release-gated command has a non-regressing interleaved median without weakening correctness.
  Scope: |-
    - In scope: Profile the packed v0.7.1 candidate against published 0.6.26 on identical fixtures and remove duplicated startup, repository, task-index, and context preparation work until every release-gated command has a non-regressing interleaved median without weakening correctness.
    - Out of scope: unrelated refactors not required for "Remove the v0.7.1 matched CLI latency regression".
  Plan: |-
    1. Freeze the v0.6.24 and current v0.7.1 matched CLI setup and time-to-verified baselines with warm and cold repetitions, separating harness cost from provider cost.
    2. Repair the five reproducible full-suite defects discovered during supervisor qualification: update stale interactive-init answer fixtures and resolve the sibling-task worktree expectation against the minimal-context product contract.
    3. Profile the deterministic task advance/task run hot path and remove redundant filesystem, route, schema, and process work until matched setup overhead returns to the accepted baseline without weakening fingerprints, authority, evidence, recovery, or evaluator separation.
    4. Add a release E2E/full-suite gate and regression thresholds for median, p95, verified success, scope violations, token usage, and packet size.
    5. Run exact-SHA deterministic verification, independent EVALUATOR review, hosted checks, and branch_pr integration.
  Verify Steps: |-
    1. Run the focused interactive-init and branch worktree runtime tests with no retry. Expected: all previously reproduced failures pass and assertions match the current evaluator-skepticism and minimal-context contracts.
    2. Run bun run ci:test with the normal release configuration. Expected: every maintained test file and test passes; the replay-security test also passes in isolation without relying on a retry.
    3. Run the matched CLI latency harness with at least 20 warm and 20 cold repetitions per candidate and baseline. Expected: deterministic setup median is no slower than the accepted v0.6.24 baseline, p95 is within 10%, and time-to-verified does not regress after excluding provider variance.
    4. Run v0.7 supervisor, lifecycle, recovery, product-contract, efficiency-evidence, test:critical, typecheck, workflow coverage, ci:contract, task-state, doctor, and policy routing gates. Expected: all pass while verified success, scope, token, packet-size, and lifecycle-ownership invariants remain at least as strong as the current candidate.
    5. Run an independent EVALUATOR review against the exact implementation SHA, then require all hosted checks before integration.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove the v0.7.1 matched CLI latency regression

Profile the packed v0.7.1 candidate against published 0.6.26 on identical fixtures and remove duplicated startup, repository, task-index, and context preparation work until every release-gated command has a non-regressing interleaved median without weakening correctness.

## Scope

- In scope: Profile the packed v0.7.1 candidate against published 0.6.26 on identical fixtures and remove duplicated startup, repository, task-index, and context preparation work until every release-gated command has a non-regressing interleaved median without weakening correctness.
- Out of scope: unrelated refactors not required for "Remove the v0.7.1 matched CLI latency regression".

## Plan

1. Freeze the v0.6.24 and current v0.7.1 matched CLI setup and time-to-verified baselines with warm and cold repetitions, separating harness cost from provider cost.
2. Repair the five reproducible full-suite defects discovered during supervisor qualification: update stale interactive-init answer fixtures and resolve the sibling-task worktree expectation against the minimal-context product contract.
3. Profile the deterministic task advance/task run hot path and remove redundant filesystem, route, schema, and process work until matched setup overhead returns to the accepted baseline without weakening fingerprints, authority, evidence, recovery, or evaluator separation.
4. Add a release E2E/full-suite gate and regression thresholds for median, p95, verified success, scope violations, token usage, and packet size.
5. Run exact-SHA deterministic verification, independent EVALUATOR review, hosted checks, and branch_pr integration.

## Verify Steps

1. Run the focused interactive-init and branch worktree runtime tests with no retry. Expected: all previously reproduced failures pass and assertions match the current evaluator-skepticism and minimal-context contracts.
2. Run bun run ci:test with the normal release configuration. Expected: every maintained test file and test passes; the replay-security test also passes in isolation without relying on a retry.
3. Run the matched CLI latency harness with at least 20 warm and 20 cold repetitions per candidate and baseline. Expected: deterministic setup median is no slower than the accepted v0.6.24 baseline, p95 is within 10%, and time-to-verified does not regress after excluding provider variance.
4. Run v0.7 supervisor, lifecycle, recovery, product-contract, efficiency-evidence, test:critical, typecheck, workflow coverage, ci:contract, task-state, doctor, and policy routing gates. Expected: all pass while verified success, scope, token, packet-size, and lifecycle-ownership invariants remain at least as strong as the current candidate.
5. Run an independent EVALUATOR review against the exact implementation SHA, then require all hosted checks before integration.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
