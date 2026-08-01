---
id: "202607221854-TE9ZJ5"
title: "Instrument preparation graph nodes and invalidation inputs"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on:
  - "202607221846-SXJ75T"
  - "202607221848-0ZAB1F"
  - "202607221852-9T0RT3"
  - "202607221854-PGPR3J"
  - "202607221854-RW8CJF"
tags:
  - "instrumentation"
  - "milestone-rc2"
  - "performance"
  - "preparation"
  - "refactor"
  - "rf-26"
  - "v0.7"
  - "wave-internals"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "performance.benchmark"
verify:
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T14:42:47.960Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-01T15:38:00.639Z"
  updated_by: "TESTER"
  note: "PASS: 16 focused trace/CLI/fingerprint tests and TypeScript 7 typecheck passed after commit; full test:fast (3612 tests), ci:contract, clone/knip/hotspot guards, and paired overhead benchmark passed before commit with identical stdout. Median traced ratios: simple 0.990, branch route 1.022, next-action 1.079 against <=1.15 threshold."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-01T15:39:18.841Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 3 typed finding(s)."
  evaluated_sha: "9c4be64354a1b8e615e706813decb374ecc05598"
  blueprint_digest: "deb12ca385281047ce9539b468e69ff737e90b682d3c984c59866da6ebaaefc9"
  evidence_refs:
    - ".agentplane/tasks/202607221854-TE9ZJ5/quality/20260801-153918719-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221854-TE9ZJ5/quality/20260801-153918719-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221854-TE9ZJ5/quality/20260801-153918719-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221854-TE9ZJ5/quality/20260801-153918719-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221854-TE9ZJ5/quality/20260801-153918719-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221854-TE9ZJ5/README.md"
    - ".agentplane/tasks/202607221854-TE9ZJ5/quality/20260801-153918719-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221854-TE9ZJ5/quality/20260801-153918719-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221854-TE9ZJ5/quality/20260801-153918719-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The trace contract is deterministic: sorted inputs, SHA-256 digests, explicit dependency edges, byte counts, status, cacheability, and named invalidation reasons are emitted without raw fingerprint values."
    - "Route authority and evaluator artifact preparation remain non-cacheable; provider state is only a TTL candidate with mandatory live revalidation before side effects."
    - "The benchmark compares paired trace-disabled/enabled runs with exact stdout equality and selects candidates from measured latency/size rather than enabling speculative caches."
commit:
  hash: "9c4be64354a1b8e615e706813decb374ecc05598"
  message: "🚧 TE9ZJ5 task: Instrument preparation graph traces"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: deterministic preparation graph traces, invalidation evidence, cache policy boundaries, and benchmark report."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-01T14:43:14.954Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-01T15:37:22.991Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: deterministic preparation graph traces, invalidation evidence, cache policy boundaries, and benchmark report."
  -
    type: "verify"
    at: "2026-08-01T15:38:00.639Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: 16 focused trace/CLI/fingerprint tests and TypeScript 7 typecheck passed after commit; full test:fast (3612 tests), ci:contract, clone/knip/hotspot guards, and paired overhead benchmark passed before commit with identical stdout. Median traced ratios: simple 0.990, branch route 1.022, next-action 1.079 against <=1.15 threshold."
  -
    type: "status"
    at: "2026-08-01T15:40:10.677Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-08-01T15:40:10.677Z"
doc_updated_by: "CODER"
description: "RF-26a: measure task/backend read, Git snapshot, provider state, blueprint, policy/authority, knowledge retrieval, prompt compilation, and rendering nodes with exact fingerprint and invalidation provenance."
sections:
  Summary: |-
    Instrument preparation graph nodes and invalidation inputs

    RF-26a: measure task/backend read, Git snapshot, provider state, blueprint, policy/authority, knowledge retrieval, prompt compilation, and rendering nodes with exact fingerprint and invalidation provenance.
  Scope: |-
    - In scope: preparation DAG trace model, node inputs/outputs, latency, bytes, fingerprint components, dependency edges, invalidation reasons, cacheability classification, and representative cold/warm scenario reports.
    - Out of scope: enabling caches before evidence identifies worthwhile nodes.
  Plan: |-
    1. Define a deterministic trace/result contract for preparation nodes.
    2. Instrument each expensive structured preparation boundary without timing semantic reasoning as cacheable work.
    3. Record fingerprint, dependency, bytes, latency, and invalidation inputs.
    4. Profile golden scenarios across cold/repeated/stale states.
    5. Select cache candidates only from measured cost and correctness constraints.
  Verify Steps: |-
    1. Run preparation traces for simple CLI, direct, branch_pr, and context scenarios. Expected: each node exposes latency, bytes, dependencies, fingerprint inputs, and invalidation reasons.
    2. Repeat unchanged and independently stale scenarios. Expected: trace identifies exactly which nodes could be reused or must invalidate.
    3. Inspect semantic decisions. Expected: they are marked non-cacheable unless provenance and invalidation are explicit.
    4. Compare trace overhead to baseline. Expected: bounded overhead and no changed functional outcome.
    5. Run focused trace tests and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-01T15:38:00.639Z — VERIFY — ok

    By: TESTER

    Note: PASS: 16 focused trace/CLI/fingerprint tests and TypeScript 7 typecheck passed after commit; full test:fast (3612 tests), ci:contract, clone/knip/hotspot guards, and paired overhead benchmark passed before commit with identical stdout. Median traced ratios: simple 0.990, branch route 1.022, next-action 1.079 against <=1.15 threshold.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T15:37:22.991Z, excerpt_hash=sha256:00c60277a7e4cf5e47d702a0f85173ae9661a4ac0f70dd69676d1a35b5303048

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-TE9ZJ5-instrument-preparation-graph-nodes-and-invalidat/.agentplane/tasks/202607221854-TE9ZJ5/blueprint/resolved-snapshot.json
    - old_digest: deb12ca385281047ce9539b468e69ff737e90b682d3c984c59866da6ebaaefc9
    - current_digest: deb12ca385281047ce9539b468e69ff737e90b682d3c984c59866da6ebaaefc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221854-TE9ZJ5

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221854-TE9ZJ5
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert instrumentation hooks while preserving baseline artifacts and public behavior.
    - Remove only generated trace data, not task/context source data.
    - Re-run golden scenarios to confirm no functional dependency on instrumentation.
  Findings: |-
    - Observation: Preparation traces expose bytes, dependencies, digested fingerprint inputs, invalidation reasons, and cacheability; semantic policy/authority nodes remain non-cacheable.
      Impact: RF26b can enable only measured deterministic candidates while preserving provider freshness and semantic authority.
      Resolution: Verified implementation commit 9c4be64354a1b8e615e706813decb374ecc05598 and benchmark-report.json evidence.
extensions:
  workflow_route_baseline:
    start_head_sha: "fa0eae41849fc8e339543f3c41dfc81b2d05c82d"
    version: 1
id_source: "generated"
---
## Summary

Instrument preparation graph nodes and invalidation inputs

RF-26a: measure task/backend read, Git snapshot, provider state, blueprint, policy/authority, knowledge retrieval, prompt compilation, and rendering nodes with exact fingerprint and invalidation provenance.

## Scope

- In scope: preparation DAG trace model, node inputs/outputs, latency, bytes, fingerprint components, dependency edges, invalidation reasons, cacheability classification, and representative cold/warm scenario reports.
- Out of scope: enabling caches before evidence identifies worthwhile nodes.

## Plan

1. Define a deterministic trace/result contract for preparation nodes.
2. Instrument each expensive structured preparation boundary without timing semantic reasoning as cacheable work.
3. Record fingerprint, dependency, bytes, latency, and invalidation inputs.
4. Profile golden scenarios across cold/repeated/stale states.
5. Select cache candidates only from measured cost and correctness constraints.

## Verify Steps

1. Run preparation traces for simple CLI, direct, branch_pr, and context scenarios. Expected: each node exposes latency, bytes, dependencies, fingerprint inputs, and invalidation reasons.
2. Repeat unchanged and independently stale scenarios. Expected: trace identifies exactly which nodes could be reused or must invalidate.
3. Inspect semantic decisions. Expected: they are marked non-cacheable unless provenance and invalidation are explicit.
4. Compare trace overhead to baseline. Expected: bounded overhead and no changed functional outcome.
5. Run focused trace tests and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-01T15:38:00.639Z — VERIFY — ok

By: TESTER

Note: PASS: 16 focused trace/CLI/fingerprint tests and TypeScript 7 typecheck passed after commit; full test:fast (3612 tests), ci:contract, clone/knip/hotspot guards, and paired overhead benchmark passed before commit with identical stdout. Median traced ratios: simple 0.990, branch route 1.022, next-action 1.079 against <=1.15 threshold.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T15:37:22.991Z, excerpt_hash=sha256:00c60277a7e4cf5e47d702a0f85173ae9661a4ac0f70dd69676d1a35b5303048

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-TE9ZJ5-instrument-preparation-graph-nodes-and-invalidat/.agentplane/tasks/202607221854-TE9ZJ5/blueprint/resolved-snapshot.json
- old_digest: deb12ca385281047ce9539b468e69ff737e90b682d3c984c59866da6ebaaefc9
- current_digest: deb12ca385281047ce9539b468e69ff737e90b682d3c984c59866da6ebaaefc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221854-TE9ZJ5

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221854-TE9ZJ5
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert instrumentation hooks while preserving baseline artifacts and public behavior.
- Remove only generated trace data, not task/context source data.
- Re-run golden scenarios to confirm no functional dependency on instrumentation.

## Findings

- Observation: Preparation traces expose bytes, dependencies, digested fingerprint inputs, invalidation reasons, and cacheability; semantic policy/authority nodes remain non-cacheable.
  Impact: RF26b can enable only measured deterministic candidates while preserving provider freshness and semantic authority.
  Resolution: Verified implementation commit 9c4be64354a1b8e615e706813decb374ecc05598 and benchmark-report.json evidence.
