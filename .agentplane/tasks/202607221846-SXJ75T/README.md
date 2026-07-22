---
id: "202607221846-SXJ75T"
title: "Capture 0.6.24 compatibility and agent-efficiency baselines"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 10
origin:
  system: "manual"
depends_on:
  - "202607221838-SD1W93"
tags:
  - "benchmark"
  - "milestone-alpha1"
  - "quality"
  - "refactor"
  - "rf-04"
  - "v0.7"
  - "wave-trust"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "performance.benchmark"
verify:
  - "bun run ci:contract"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-22T21:03:14.285Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-22T21:10:18.962Z"
  updated_by: "TESTER"
  note: "Commit 08ff471fb. Baseline: published v0.6.24 tag 30f62b82 and task-parent main 1a702e160. Method: deterministic Git-derived compatibility snapshot plus 10 RF-04 scenarios with provenance-aware structural, quality, safety, timing, token, retrieval, and evidence cells. Runs: compatibility 2/2 byte-identical SHA-256 29fa03085735dd881e7f2101a84766169c43f1397fd3fff1134a61fe30ff913b; efficiency 2/2 byte-identical raw measurement SHA-256 2debb54bab58acd9180ae424fc5f945ab9deadcb2635de8919979b2148a58286; structural SHA-256 a9b855c5887f697c21690d7386c627c555f8d46d7b083cab8c54636411e47351. Threshold: exact compatibility; 10% structural-cost ratchet only at equivalent quality/safety; latency diagnostic. Verdict: local pass. Quality: targeted critical 6/6, typecheck, formatting, ESLint, workflow/route, architecture and repository guards pass; broad Node-runnable Vitest 2177/2186 pass, with all 9 failures caused by missing Bun."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-22T21:12:58.682Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed."
  evaluated_sha: "6f383355ebf903b15bae31ec3a17476274384445"
  blueprint_digest: "951c6e55158c0aa74ab50e606b77d63d4ff422bc3efc0e9c9e1d582d7a1dca21"
  evidence_refs:
    - ".agentplane/tasks/202607221846-SXJ75T/README.md"
    - ".agentplane/tasks/202607221846-SXJ75T/quality/20260722-211258682-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221846-SXJ75T/quality/20260722-211258682-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221846-SXJ75T/quality/20260722-211258682-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221846-SXJ75T/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings."
commit: null
comments:
  -
    author: "TESTER"
    body: "Start: capture deterministic 0.6.24 compatibility and provenance-safe agent-efficiency observability baselines without changing product behavior."
events:
  -
    type: "status"
    at: "2026-07-22T21:05:12.027Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: capture deterministic 0.6.24 compatibility and provenance-safe agent-efficiency observability baselines without changing product behavior."
  -
    type: "verify"
    at: "2026-07-22T21:10:18.962Z"
    author: "TESTER"
    state: "ok"
    note: "Commit 08ff471fb. Baseline: published v0.6.24 tag 30f62b82 and task-parent main 1a702e160. Method: deterministic Git-derived compatibility snapshot plus 10 RF-04 scenarios with provenance-aware structural, quality, safety, timing, token, retrieval, and evidence cells. Runs: compatibility 2/2 byte-identical SHA-256 29fa03085735dd881e7f2101a84766169c43f1397fd3fff1134a61fe30ff913b; efficiency 2/2 byte-identical raw measurement SHA-256 2debb54bab58acd9180ae424fc5f945ab9deadcb2635de8919979b2148a58286; structural SHA-256 a9b855c5887f697c21690d7386c627c555f8d46d7b083cab8c54636411e47351. Threshold: exact compatibility; 10% structural-cost ratchet only at equivalent quality/safety; latency diagnostic. Verdict: local pass. Quality: targeted critical 6/6, typecheck, formatting, ESLint, workflow/route, architecture and repository guards pass; broad Node-runnable Vitest 2177/2186 pass, with all 9 failures caused by missing Bun."
doc_version: 3
doc_updated_at: "2026-07-22T21:10:19.077Z"
doc_updated_by: "TESTER"
description: "RF-04: freeze the pre-refactor public contract and measure agent cognitive, token, orchestration, latency, and evidence-provenance costs on deterministic golden scenarios."
sections:
  Summary: |-
    Capture 0.6.24 compatibility and agent-efficiency baselines

    RF-04: freeze the pre-refactor public contract and measure agent cognitive, token, orchestration, latency, and evidence-provenance costs on deterministic golden scenarios.
  Scope: |-
    - In scope: deterministic golden scenarios for direct, branch_pr, context assimilation, stale state, approvals, missing knowledge, evaluator rework, scope violation, adapter failure, and one-step Hermes supervision; normalized CLI/schema/package/engine snapshots; runner token, byte, episode, lifecycle-call, latency, rework, and observed-versus-claimed evidence metrics.
    - Out of scope: changing production behavior or declaring improvement from token count alone.
  Plan: |-
    1. Define reproducible fixtures and normalization rules for the ten approved golden scenarios.
    2. Snapshot the 0.6.24 command/options, JSON/casing, exit/error, workflow schema, package export, engine, and tarball surfaces.
    3. Wire deterministic metric collection for prompt bytes, duplicate bytes, role episodes, lifecycle calls, preparation latency, retrieval latency, rework/context-gap outcomes, and evidence provenance.
    4. Persist reviewed baselines and comparison tooling without unstable wall-clock gates.
    5. Prove repeatability and document uncontrolled variables.
  Verify Steps: |-
    1. Run the baseline harness twice against the same fixtures. Expected: normalized contract snapshots and structural metrics are byte-stable; timing is reported statistically rather than asserted from one run.
    2. Inspect every golden scenario. Expected: success/rework/safety outcomes are captured as control variables alongside token and latency costs.
    3. Run `bun run test:critical` and `bun run typecheck`. Expected: metric collection and fixtures pass without changing product behavior.
    4. Run `bun run ci:contract`. Expected: baseline artifacts, generated surfaces, schemas, and repository guards remain synchronized.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-22T21:10:18.962Z — VERIFY — ok

    By: TESTER

    Note: Commit 08ff471fb. Baseline: published v0.6.24 tag 30f62b82 and task-parent main 1a702e160. Method: deterministic Git-derived compatibility snapshot plus 10 RF-04 scenarios with provenance-aware structural, quality, safety, timing, token, retrieval, and evidence cells. Runs: compatibility 2/2 byte-identical SHA-256 29fa03085735dd881e7f2101a84766169c43f1397fd3fff1134a61fe30ff913b; efficiency 2/2 byte-identical raw measurement SHA-256 2debb54bab58acd9180ae424fc5f945ab9deadcb2635de8919979b2148a58286; structural SHA-256 a9b855c5887f697c21690d7386c627c555f8d46d7b083cab8c54636411e47351. Threshold: exact compatibility; 10% structural-cost ratchet only at equivalent quality/safety; latency diagnostic. Verdict: local pass. Quality: targeted critical 6/6, typecheck, formatting, ESLint, workflow/route, architecture and repository guards pass; broad Node-runnable Vitest 2177/2186 pass, with all 9 failures caused by missing Bun.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-22T21:05:12.027Z, excerpt_hash=sha256:115a52f4694781f560b24166747866d83462403e3c174df58d3031f94fd64aff

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-SXJ75T-capture-0-6-24-compatibility-and-agent-efficienc/.agentplane/tasks/202607221846-SXJ75T/blueprint/resolved-snapshot.json
    - old_digest: 951c6e55158c0aa74ab50e606b77d63d4ff422bc3efc0e9c9e1d582d7a1dca21
    - current_digest: 951c6e55158c0aa74ab50e606b77d63d4ff422bc3efc0e9c9e1d582d7a1dca21
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221846-SXJ75T

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607221846-SXJ75T
    - diagnostic_command: agentplane pr check 202607221846-SXJ75T
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) without changing unrelated task state.
    - Restore the previous persisted contract or schema version where applicable.
    - Re-run the task-specific checks and record any data requiring explicit migration repair.
  Findings: |-
    - Observation: Local Bun is unavailable, and the historical main anchor exposes only 10/170 scalar cells, 0/70 observed outcomes, 0/27 token cells, one timing sample, and two artifact-backed scenarios.
      Impact: Exact Bun wrappers and npm-pack remain hosted-only; this baseline proves compatibility, structural costs, and observability gaps but cannot yet prove lower cognitive or token cost per verified result.
      Resolution: Require stable hosted Bun checks before merge and add an anchored replay/instrumentation task as a mandatory alpha.1 dependency before any efficiency-improvement claim.
id_source: "generated"
---
## Summary

Capture 0.6.24 compatibility and agent-efficiency baselines

RF-04: freeze the pre-refactor public contract and measure agent cognitive, token, orchestration, latency, and evidence-provenance costs on deterministic golden scenarios.

## Scope

- In scope: deterministic golden scenarios for direct, branch_pr, context assimilation, stale state, approvals, missing knowledge, evaluator rework, scope violation, adapter failure, and one-step Hermes supervision; normalized CLI/schema/package/engine snapshots; runner token, byte, episode, lifecycle-call, latency, rework, and observed-versus-claimed evidence metrics.
- Out of scope: changing production behavior or declaring improvement from token count alone.

## Plan

1. Define reproducible fixtures and normalization rules for the ten approved golden scenarios.
2. Snapshot the 0.6.24 command/options, JSON/casing, exit/error, workflow schema, package export, engine, and tarball surfaces.
3. Wire deterministic metric collection for prompt bytes, duplicate bytes, role episodes, lifecycle calls, preparation latency, retrieval latency, rework/context-gap outcomes, and evidence provenance.
4. Persist reviewed baselines and comparison tooling without unstable wall-clock gates.
5. Prove repeatability and document uncontrolled variables.

## Verify Steps

1. Run the baseline harness twice against the same fixtures. Expected: normalized contract snapshots and structural metrics are byte-stable; timing is reported statistically rather than asserted from one run.
2. Inspect every golden scenario. Expected: success/rework/safety outcomes are captured as control variables alongside token and latency costs.
3. Run `bun run test:critical` and `bun run typecheck`. Expected: metric collection and fixtures pass without changing product behavior.
4. Run `bun run ci:contract`. Expected: baseline artifacts, generated surfaces, schemas, and repository guards remain synchronized.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-22T21:10:18.962Z — VERIFY — ok

By: TESTER

Note: Commit 08ff471fb. Baseline: published v0.6.24 tag 30f62b82 and task-parent main 1a702e160. Method: deterministic Git-derived compatibility snapshot plus 10 RF-04 scenarios with provenance-aware structural, quality, safety, timing, token, retrieval, and evidence cells. Runs: compatibility 2/2 byte-identical SHA-256 29fa03085735dd881e7f2101a84766169c43f1397fd3fff1134a61fe30ff913b; efficiency 2/2 byte-identical raw measurement SHA-256 2debb54bab58acd9180ae424fc5f945ab9deadcb2635de8919979b2148a58286; structural SHA-256 a9b855c5887f697c21690d7386c627c555f8d46d7b083cab8c54636411e47351. Threshold: exact compatibility; 10% structural-cost ratchet only at equivalent quality/safety; latency diagnostic. Verdict: local pass. Quality: targeted critical 6/6, typecheck, formatting, ESLint, workflow/route, architecture and repository guards pass; broad Node-runnable Vitest 2177/2186 pass, with all 9 failures caused by missing Bun.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-22T21:05:12.027Z, excerpt_hash=sha256:115a52f4694781f560b24166747866d83462403e3c174df58d3031f94fd64aff

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-SXJ75T-capture-0-6-24-compatibility-and-agent-efficienc/.agentplane/tasks/202607221846-SXJ75T/blueprint/resolved-snapshot.json
- old_digest: 951c6e55158c0aa74ab50e606b77d63d4ff422bc3efc0e9c9e1d582d7a1dca21
- current_digest: 951c6e55158c0aa74ab50e606b77d63d4ff422bc3efc0e9c9e1d582d7a1dca21
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221846-SXJ75T

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607221846-SXJ75T
- diagnostic_command: agentplane pr check 202607221846-SXJ75T
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) without changing unrelated task state.
- Restore the previous persisted contract or schema version where applicable.
- Re-run the task-specific checks and record any data requiring explicit migration repair.

## Findings

- Observation: Local Bun is unavailable, and the historical main anchor exposes only 10/170 scalar cells, 0/70 observed outcomes, 0/27 token cells, one timing sample, and two artifact-backed scenarios.
  Impact: Exact Bun wrappers and npm-pack remain hosted-only; this baseline proves compatibility, structural costs, and observability gaps but cannot yet prove lower cognitive or token cost per verified result.
  Resolution: Require stable hosted Bun checks before merge and add an anchored replay/instrumentation task as a mandatory alpha.1 dependency before any efficiency-improvement claim.
