---
id: "202604220257-F79BSN"
title: "Harden CLI cold-start baseline statistics"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 12
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
  state: "ok"
  updated_at: "2026-04-22T09:06:41.439Z"
  updated_by: "CODER"
  note: "Verified: cold-start guard now enforces median_ms with p95 diagnostics, repeated bench:cli:cold:check runs passed, focused tests passed, and bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: replace fragile average-based CLI cold-start guard with robust median-based baseline statistics, update measurement payloads/tests, and verify repeated cold baseline stability."
events:
  -
    type: "status"
    at: "2026-04-22T08:59:24.538Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace fragile average-based CLI cold-start guard with robust median-based baseline statistics, update measurement payloads/tests, and verify repeated cold baseline stability."
  -
    type: "verify"
    at: "2026-04-22T09:06:41.439Z"
    author: "CODER"
    state: "ok"
    note: "Verified: cold-start guard now enforces median_ms with p95 diagnostics, repeated bench:cli:cold:check runs passed, focused tests passed, and bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check passed."
doc_version: 3
doc_updated_at: "2026-04-22T09:06:41.446Z"
doc_updated_by: "CODER"
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
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T09:06:41.439Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: cold-start guard now enforces median_ms with p95 diagnostics, repeated bench:cli:cold:check runs passed, focused tests passed, and bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T08:59:24.546Z, excerpt_hash=sha256:f56ee167199450e581dfb4abcc26413f31371696a440ce42d335370af5e913a3
    
    <!-- END VERIFICATION RESULTS -->
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

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T09:06:41.439Z — VERIFY — ok

By: CODER

Note: Verified: cold-start guard now enforces median_ms with p95 diagnostics, repeated bench:cli:cold:check runs passed, focused tests passed, and bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T08:59:24.546Z, excerpt_hash=sha256:f56ee167199450e581dfb4abcc26413f31371696a440ce42d335370af5e913a3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore average-based check and previous baseline file format.

## Findings

None yet.
