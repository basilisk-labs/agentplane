---
id: "202607221846-SXJ75T"
title: "Capture 0.6.24 compatibility and agent-efficiency baselines"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 7
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
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
doc_version: 3
doc_updated_at: "2026-07-22T21:05:12.027Z"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) without changing unrelated task state.
    - Restore the previous persisted contract or schema version where applicable.
    - Re-run the task-specific checks and record any data requiring explicit migration repair.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) without changing unrelated task state.
- Restore the previous persisted contract or schema version where applicable.
- Re-run the task-specific checks and record any data requiring explicit migration repair.

## Findings
