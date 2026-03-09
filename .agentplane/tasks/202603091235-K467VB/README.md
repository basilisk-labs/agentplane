---
id: "202603091235-K467VB"
title: "Stabilize release recovery regression timeout in release prepublish"
result_summary: "Stabilized the release-recovery regression by isolating it from the broad release full-suite and validating it through a dedicated release-critical script."
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
  updated_at: "2026-03-09T12:41:27.664Z"
  updated_by: "ORCHESTRATOR"
  note: "Timeout stabilization plan approved for isolated release-recovery suite investigation."
verification:
  state: "ok"
  updated_at: "2026-03-09T12:53:47.060Z"
  updated_by: "CODER"
  note: "Targeted release-recovery suite passed under an explicit 60s budget, and the full release:ci-check passed after the suite was isolated from the monolithic full run."
commit:
  hash: "33f4abacb965368cc007c0bf30445b085c56c73f"
  message: "🐛 K467VB release: isolate timeout-sensitive prepublish suites"
comments:
  -
    author: "CODER"
    body: "Start: investigating the release-recovery timeout path in isolation before changing any timeout or assertion contract."
  -
    author: "CODER"
    body: "Verified: the release-recovery regression is now exercised through a dedicated release-critical path with explicit time budgets, and the full release gate completed without the earlier timeout failure."
events:
  -
    type: "status"
    at: "2026-03-09T12:41:28.090Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: investigating the release-recovery timeout path in isolation before changing any timeout or assertion contract."
  -
    type: "verify"
    at: "2026-03-09T12:53:47.060Z"
    author: "CODER"
    state: "ok"
    note: "Targeted release-recovery suite passed under an explicit 60s budget, and the full release:ci-check passed after the suite was isolated from the monolithic full run."
  -
    type: "status"
    at: "2026-03-09T12:53:47.627Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the release-recovery regression is now exercised through a dedicated release-critical path with explicit time budgets, and the full release gate completed without the earlier timeout failure."
doc_version: 3
doc_updated_at: "2026-03-09T12:53:47.627Z"
doc_updated_by: "CODER"
description: "Investigate and fix the timeout-sensitive release-recovery-script integration test so release:prepublish stays green on slower hosts without masking real failures."
id_source: "generated"
---
## Summary

Stabilize release recovery regression timeout in release prepublish

Investigate and fix the timeout-sensitive release-recovery-script integration test so release:prepublish stays green on slower hosts without masking real failures.

## Scope

- In scope: Investigate and fix the timeout-sensitive release-recovery-script integration test so release:prepublish stays green on slower hosts without masking real failures.
- Out of scope: unrelated refactors not required for "Stabilize release recovery regression timeout in release prepublish".

## Plan

1. Reproduce the release-recovery timeout-sensitive test in isolation and measure where it spends time.
2. Fix the regression by tightening the test contract or timeout budget without weakening the recovery assertions.
3. Re-run targeted release checks, record findings, and close with the implementation commit.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/cli/release-recovery-script.test.ts --hookTimeout 60000 --testTimeout 60000. Expected: all release recovery checks pass on the current host.
2. Run the narrow release gate that exercises the same path. Expected: the release-recovery suite no longer times out inside the release prepublish path.
3. Review the assertions. Expected: the fix preserves the exact recovery diagnosis and does not weaken failure detection.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T12:53:47.060Z — VERIFY — ok

By: CODER

Note: Targeted release-recovery suite passed under an explicit 60s budget, and the full release:ci-check passed after the suite was isolated from the monolithic full run.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T12:53:00.510Z, excerpt_hash=sha256:0b059318f4ee2670df384e1ccffaf26c35a9c68e183ed9d3eaf5567c81caa5b3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: the release-recovery suite was still running inside the monolithic release full-suite with the default per-test budget when invoked through release:ci-check, so slower hosts could hit the generic 5s timeout before the dedicated script contract applied.
  Impact: release:prepublish could fail on timing drift even when the recovery assertions were correct.
  Resolution: route release:ci-check through a base full-suite that excludes release-recovery-script.test.ts and run that suite separately via test:release:recovery with explicit 60s time budgets; also make the file itself timeout-aware.
  Promotion: incident-candidate
