---
id: "202603091235-NBMVGA"
title: "Stabilize CLI smoke timeout in release prepublish"
result_summary: "Stabilized the cli-smoke release-prepublish path by moving the smoke flow into the dedicated release-critical layer while preserving the same end-to-end assertions."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T12:41:42.633Z"
  updated_by: "ORCHESTRATOR"
  note: "Timeout stabilization plan approved for the cli-smoke release-prepublish path."
verification:
  state: "ok"
  updated_at: "2026-03-09T12:54:00.104Z"
  updated_by: "CODER"
  note: "The dedicated cli-smoke suite passed under its explicit 60s budget, and the full release:ci-check stayed green after moving smoke into the isolated release-critical layer."
commit:
  hash: "33f4abacb965368cc007c0bf30445b085c56c73f"
  message: "🐛 K467VB release: isolate timeout-sensitive prepublish suites"
comments:
  -
    author: "CODER"
    body: "Start: isolating the cli-smoke timeout path and keeping the end-to-end coverage intact while stabilizing slower hosts."
  -
    author: "CODER"
    body: "Verified: the cli-smoke end-to-end flow now runs in an isolated release-critical layer, so release:ci-check no longer depends on the broad full-suite scheduler to preserve its time budget."
events:
  -
    type: "status"
    at: "2026-03-09T12:41:43.055Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: isolating the cli-smoke timeout path and keeping the end-to-end coverage intact while stabilizing slower hosts."
  -
    type: "verify"
    at: "2026-03-09T12:54:00.104Z"
    author: "CODER"
    state: "ok"
    note: "The dedicated cli-smoke suite passed under its explicit 60s budget, and the full release:ci-check stayed green after moving smoke into the isolated release-critical layer."
  -
    type: "status"
    at: "2026-03-09T12:54:00.663Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the cli-smoke end-to-end flow now runs in an isolated release-critical layer, so release:ci-check no longer depends on the broad full-suite scheduler to preserve its time budget."
doc_version: 3
doc_updated_at: "2026-03-09T12:54:00.663Z"
doc_updated_by: "CODER"
description: "Investigate and fix the timeout-sensitive cli-smoke integration test so release:prepublish remains reliable on slower hosts without weakening the end-to-end contract."
id_source: "generated"
---
## Summary

Stabilize CLI smoke timeout in release prepublish

Investigate and fix the timeout-sensitive cli-smoke integration test so release:prepublish remains reliable on slower hosts without weakening the end-to-end contract.

## Scope

- In scope: Investigate and fix the timeout-sensitive cli-smoke integration test so release:prepublish remains reliable on slower hosts without weakening the end-to-end contract.
- Out of scope: unrelated refactors not required for "Stabilize CLI smoke timeout in release prepublish".

## Plan

1. Reproduce the cli-smoke timeout-sensitive path in isolation and identify the slowest step in the end-to-end flow.
2. Fix the regression by reducing avoidable overhead or raising the timeout budget only where the end-to-end contract truly requires it.
3. Re-run the targeted smoke and release checks, record findings, and close with the implementation commit.

## Verify Steps

1. Run bun run test:cli:smoke. Expected: the smoke flow passes on the current host within the explicit suite budget.
2. Run the narrow release gate that exercises the same path. Expected: the cli-smoke suite no longer times out inside the release prepublish path.
3. Review the end-to-end assertions. Expected: the smoke scenario still covers init, task lifecycle, recipe install, mode switch, and work start without weakening coverage.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T12:54:00.104Z — VERIFY — ok

By: CODER

Note: The dedicated cli-smoke suite passed under its explicit 60s budget, and the full release:ci-check stayed green after moving smoke into the isolated release-critical layer.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T12:53:00.923Z, excerpt_hash=sha256:a4f0dadb78cce664c0377a461e5d36f253eabae591b11de892a8badc5c2fa93d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: cli-smoke already had an explicit 60s per-test budget, but release:ci-check still embedded it inside the broad full-suite, so the slow end-to-end path was competing with the entire regression sweep instead of running as an isolated release-critical check.
  Impact: release:prepublish could fail on slower hosts for scheduler reasons rather than real smoke regressions.
  Resolution: route release:ci-check through a base full-suite that excludes cli-smoke.test.ts and run cli-smoke separately via test:release:critical, preserving the same smoke assertions while isolating its time budget.
  Promotion: tooling
