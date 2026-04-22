---
id: "202604220257-F79BSN"
title: "Harden CLI cold-start baseline statistics"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on:
  - "202604220257-687JQA"
tags:
  - "ci"
  - "perf"
  - "tooling"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:13.252Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-22T02:57:51.870Z"
doc_updated_by: "PLANNER"
description: "Replace fragile average-of-three cold-start guard with a robust metric resistant to transient process-load outliers."
sections:
  Summary: "Make cold-start regression checks reliable enough for CI and local developer machines."
  Scope: "Cold-start benchmark/check scripts, baseline docs, and tests. Keep thresholds explicit and documented."
  Plan: |-
    1. Review current benchmark result schema and observed outlier behavior.
    2. Use median, min-of-N, p95, or trimmed mean with explicit rationale.
    3. Update baseline check script/tests/docs.
    4. Verify repeated check runs are stable locally.
  Verify Steps: "Run bench:cli:cold, bench:cli:cold:check multiple times, fast CI, scripts docs check if docs changed."
  Verification: "Pending implementation."
  Rollback Plan: "Restore average-based check and previous baseline file format."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Make cold-start regression checks reliable enough for CI and local developer machines.

## Scope

Cold-start benchmark/check scripts, baseline docs, and tests. Keep thresholds explicit and documented.

## Plan

1. Review current benchmark result schema and observed outlier behavior.
2. Use median, min-of-N, p95, or trimmed mean with explicit rationale.
3. Update baseline check script/tests/docs.
4. Verify repeated check runs are stable locally.

## Verify Steps

Run bench:cli:cold, bench:cli:cold:check multiple times, fast CI, scripts docs check if docs changed.

## Verification

Pending implementation.

## Rollback Plan

Restore average-based check and previous baseline file format.

## Findings

None yet.
