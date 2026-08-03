---
id: "202608021232-6BTB6D"
title: "Capture exact v0.7.1 semantic efficiency evidence"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202608021231-BPMM04"
  - "202608021231-PZGG3V"
  - "202608021231-SHYJGK"
  - "202608021232-53WJMN"
  - "202608021534-YN84E1"
  - "202608021534-J5G235"
  - "202608021535-CNQKXP"
  - "202608021535-9EWFAB"
tags:
  - "provider-qualification"
  - "v0.7.1"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "network"
blueprint_request: "quality.regression"
verify:
  - "bun run e2e:v0.7.1:gate"
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T20:39:38.829Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit:
  hash: "b371c1a118907b2cdd5823764500fdcb71169149"
  message: "🧪 6BTB6D task: anchor qualification plan"
comments:
  -
    author: "TESTER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-03T20:39:56.002Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-03T23:13:46.578Z"
    author: "TESTER"
    from: "DOING"
    to: "DOING"
doc_version: 3
doc_updated_at: "2026-08-03T23:13:46.578Z"
doc_updated_by: "TESTER"
description: "After all candidate fixes land, execute exactly one no-retry 50-run and 55-provider-episode qualification generation against the exact candidate SHA, verify quality parity, context correctness, token savings, lifecycle latency, and provenance, and classify every failed episode before any replacement generation."
sections:
  Summary: "Produce a release-blocking, reproducible qualification record for the final v0.7.1 implementation subject. The record must cover deterministic lifecycle, context, recovery, packaging, hosted, latency, and tooling scenarios before exactly one no-retry Codex provider generation captures 50 runs across 10 scenarios and 55 provider episodes. The evidence must prove semantic quality parity, at least 20% total provider-token reduction, exact provenance, and explicit classification of every failure."
  Scope: |-
    - In scope: freeze one exact implementation subject SHA and Codex CLI version; execute the versioned v0.7.1 qualification matrix; capture deterministic and provider evidence; verify lifecycle/context/recovery/packaging/hosted coverage; measure matched CLI and supervisor latency; validate token and outcome thresholds; preserve raw logs and a classified defect ledger; obtain an independent EVALUATOR verdict.
    - Provider boundary: run the 10-scenario x 5-run capture exactly once, yielding 50 runs and 55 provider episodes, with no retry, replacement, or selective rerun. A failed episode remains failed evidence.
    - Stop before provider execution if deterministic audit has any blocking failure, the candidate SHA or Codex version changes, an existing capture generation is present, the tracked tree is dirty, or a GitHub release-blocking defect changes package/source content.
    - Out of scope: fixing discovered product defects inside this evidence task, dependency upgrades from PR #4752, branch cleanup, version bump, npm publication, and unrelated refactors. Discovered blocking defects require a separate executable task and a newly versioned candidate generation after repair.
  Plan: |-
    1. Confirm every implementation dependency is DONE, GitHub has no open release-blocking issue or PR, the tracked candidate tree is clean, and freeze the exact implementation subject SHA plus exact Codex CLI version. Record that PR #4752 is a deferred grouped dependency update, not candidate code.
    2. Validate the qualification harness and dry-run command graph, then execute the full deterministic audit without provider access. Stop before provider execution on any blocking defect; preserve the report and defect ledger and route product fixes through separate tasks.
    3. Review deterministic evidence for complete direct/branch_pr task management, managed/external supervisor parity, automatic context freshness/conflict/provenance/token-budget behavior, interruption and side-effect recovery, packaged install/migration, hosted boundaries, TypeScript 7, doctor legacy, coverage, and matched latency.
    4. With the frozen subject unchanged and no existing generation, execute exactly one full gate using Codex CLI 0.146.0. The provider scenario must run 10 scenarios x 5 runs, producing exactly 50 runs and 55 provider episodes with no retry or replacement.
    5. Validate the captured measurement: exact subject/runtime/hash provenance, at least 20% total provider-token reduction, no provider-token field regression, verified success no worse than baseline, rework/scope-violation/golden-mismatch counts no worse than baseline, and latency diagnostics retained without rewriting failed observations.
    6. Classify every failed scenario or provider episode in defects.md with observation, impact, attributable boundary, proposed fix, owner task, and release disposition. A blocking failure keeps this task in rework and forbids release publication.
    7. Generate and verify the task evidence bundle, record all checks against the frozen implementation subject, obtain an independent EVALUATOR pass, publish the evidence-only task PR, wait for hosted checks, integrate it, and clean its merged branch/worktree.
  Verify Steps: |-
    1. Run bun run e2e:v0.7.1:check and inspect the full dry-run selection. Expected: the versioned manifest/report tests pass; gate selection is full and provider-qualified; every required coverage dimension maps to at least one scenario.
    2. Run node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --subject <frozen-sha> --out-dir <task-evidence-audit-dir>. Expected: every non-provider scenario executes, the report has zero blocking defects, and no provider evidence directory is created.
    3. Confirm the tracked tree, frozen SHA, Codex CLI 0.146.0, candidate cache target, and GitHub blocker audit immediately before provider execution. Expected: subject identity is unchanged, no previous generation exists, no open Issue is release-blocking, and deferred PR #4752 is not part of the candidate.
    4. Run exactly once: node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode gate --profile full --provider --subject <frozen-sha> --codex-version 0.146.0 --out-dir <task-evidence-gate-dir>. Expected: 10 scenarios x 5 runs = 50 runs, exactly 55 provider episodes, no retry/replacement, complete raw telemetry, and zero blocking qualification defects.
    5. Inspect efficiency-evidence.json and the raw candidate measurement. Expected: subject and runtime provenance match; all required hashes are present; total provider tokens improve by at least 20%; every token field is no worse; verified_success is no worse; rework_required, scope_violation, and golden mismatch counts are no worse than baseline.
    6. Inspect report.json, defects.md, matched-cli-latency.json, and supervisor-latency.json. Expected: direct and branch_pr, all task states, managed and external frontends, all context conditions, semantic stops, recovery states, packaged migration, hosted boundaries, TypeScript/tooling, doctor, coverage, and latency are evidenced; every failure is classified and no blocking item is waived.
    7. Verify the task evidence bundle, run node .agentplane/policy/check-routing.mjs, obtain an independent EVALUATOR pass against the frozen implementation subject and approved scope, and record git status --short --untracked-files=all. Expected: evidence is complete and immutable, routing passes, only the known preserved integration-worktrees directory remains untracked in the base checkout, and the evidence-only task PR passes hosted checks.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "c0a1a703a165740ef01e1c5524fcc5bd69020ecf"
    version: 1
id_source: "generated"
---
## Summary

Produce a release-blocking, reproducible qualification record for the final v0.7.1 implementation subject. The record must cover deterministic lifecycle, context, recovery, packaging, hosted, latency, and tooling scenarios before exactly one no-retry Codex provider generation captures 50 runs across 10 scenarios and 55 provider episodes. The evidence must prove semantic quality parity, at least 20% total provider-token reduction, exact provenance, and explicit classification of every failure.

## Scope

- In scope: freeze one exact implementation subject SHA and Codex CLI version; execute the versioned v0.7.1 qualification matrix; capture deterministic and provider evidence; verify lifecycle/context/recovery/packaging/hosted coverage; measure matched CLI and supervisor latency; validate token and outcome thresholds; preserve raw logs and a classified defect ledger; obtain an independent EVALUATOR verdict.
- Provider boundary: run the 10-scenario x 5-run capture exactly once, yielding 50 runs and 55 provider episodes, with no retry, replacement, or selective rerun. A failed episode remains failed evidence.
- Stop before provider execution if deterministic audit has any blocking failure, the candidate SHA or Codex version changes, an existing capture generation is present, the tracked tree is dirty, or a GitHub release-blocking defect changes package/source content.
- Out of scope: fixing discovered product defects inside this evidence task, dependency upgrades from PR #4752, branch cleanup, version bump, npm publication, and unrelated refactors. Discovered blocking defects require a separate executable task and a newly versioned candidate generation after repair.

## Plan

1. Confirm every implementation dependency is DONE, GitHub has no open release-blocking issue or PR, the tracked candidate tree is clean, and freeze the exact implementation subject SHA plus exact Codex CLI version. Record that PR #4752 is a deferred grouped dependency update, not candidate code.
2. Validate the qualification harness and dry-run command graph, then execute the full deterministic audit without provider access. Stop before provider execution on any blocking defect; preserve the report and defect ledger and route product fixes through separate tasks.
3. Review deterministic evidence for complete direct/branch_pr task management, managed/external supervisor parity, automatic context freshness/conflict/provenance/token-budget behavior, interruption and side-effect recovery, packaged install/migration, hosted boundaries, TypeScript 7, doctor legacy, coverage, and matched latency.
4. With the frozen subject unchanged and no existing generation, execute exactly one full gate using Codex CLI 0.146.0. The provider scenario must run 10 scenarios x 5 runs, producing exactly 50 runs and 55 provider episodes with no retry or replacement.
5. Validate the captured measurement: exact subject/runtime/hash provenance, at least 20% total provider-token reduction, no provider-token field regression, verified success no worse than baseline, rework/scope-violation/golden-mismatch counts no worse than baseline, and latency diagnostics retained without rewriting failed observations.
6. Classify every failed scenario or provider episode in defects.md with observation, impact, attributable boundary, proposed fix, owner task, and release disposition. A blocking failure keeps this task in rework and forbids release publication.
7. Generate and verify the task evidence bundle, record all checks against the frozen implementation subject, obtain an independent EVALUATOR pass, publish the evidence-only task PR, wait for hosted checks, integrate it, and clean its merged branch/worktree.

## Verify Steps

1. Run bun run e2e:v0.7.1:check and inspect the full dry-run selection. Expected: the versioned manifest/report tests pass; gate selection is full and provider-qualified; every required coverage dimension maps to at least one scenario.
2. Run node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --subject <frozen-sha> --out-dir <task-evidence-audit-dir>. Expected: every non-provider scenario executes, the report has zero blocking defects, and no provider evidence directory is created.
3. Confirm the tracked tree, frozen SHA, Codex CLI 0.146.0, candidate cache target, and GitHub blocker audit immediately before provider execution. Expected: subject identity is unchanged, no previous generation exists, no open Issue is release-blocking, and deferred PR #4752 is not part of the candidate.
4. Run exactly once: node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode gate --profile full --provider --subject <frozen-sha> --codex-version 0.146.0 --out-dir <task-evidence-gate-dir>. Expected: 10 scenarios x 5 runs = 50 runs, exactly 55 provider episodes, no retry/replacement, complete raw telemetry, and zero blocking qualification defects.
5. Inspect efficiency-evidence.json and the raw candidate measurement. Expected: subject and runtime provenance match; all required hashes are present; total provider tokens improve by at least 20%; every token field is no worse; verified_success is no worse; rework_required, scope_violation, and golden mismatch counts are no worse than baseline.
6. Inspect report.json, defects.md, matched-cli-latency.json, and supervisor-latency.json. Expected: direct and branch_pr, all task states, managed and external frontends, all context conditions, semantic stops, recovery states, packaged migration, hosted boundaries, TypeScript/tooling, doctor, coverage, and latency are evidenced; every failure is classified and no blocking item is waived.
7. Verify the task evidence bundle, run node .agentplane/policy/check-routing.mjs, obtain an independent EVALUATOR pass against the frozen implementation subject and approved scope, and record git status --short --untracked-files=all. Expected: evidence is complete and immutable, routing passes, only the known preserved integration-worktrees directory remains untracked in the base checkout, and the evidence-only task PR passes hosted checks.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
