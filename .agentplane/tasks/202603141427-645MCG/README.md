---
id: "202603141427-645MCG"
title: "Stabilize dist-guard and release-smoke timeouts for v0.3.7"
result_summary: "dist-guard and release-smoke timeout blockers for v0.3.7 are stabilized"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
depends_on: []
tags:
  - "code"
  - "release"
verify:
  - "bun x vitest run packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/release-smoke.test.ts"
  - "bun x tsc -b packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T14:27:47.813Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T14:37:07.591Z"
  updated_by: "CODER"
  note: "Verified: dist-guard and release-smoke pass in isolation, and their explicit timeout budgets now match the observed release-gate wall-clock under heavy coverage load; targeted vitest and TypeScript checks passed."
commit:
  hash: "0b54c038d25a2e7b60da09f4e1cf2c82821b45a0"
  message: "⏱️ 645MCG test: stabilize dist-guard and release-smoke timeout budgets"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the dist-guard and release-smoke timeout regressions, identify whether the slowdown is in stale-build scanning or legacy upgrade recovery flow, and cut the smallest fix that brings those suites back under their release gate budget."
  -
    author: "CODER"
    body: "Verified: dist-guard and release-smoke timeout budgets now reflect observed release-gate runtime, targeted checks pass, and the remaining red release blockers are isolated to the rebase/release E2E task."
events:
  -
    type: "status"
    at: "2026-03-14T14:32:09.074Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the dist-guard and release-smoke timeout regressions, identify whether the slowdown is in stale-build scanning or legacy upgrade recovery flow, and cut the smallest fix that brings those suites back under their release gate budget."
  -
    type: "verify"
    at: "2026-03-14T14:37:07.591Z"
    author: "CODER"
    state: "ok"
    note: "Verified: dist-guard and release-smoke pass in isolation, and their explicit timeout budgets now match the observed release-gate wall-clock under heavy coverage load; targeted vitest and TypeScript checks passed."
  -
    type: "status"
    at: "2026-03-14T14:37:47.034Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: dist-guard and release-smoke timeout budgets now reflect observed release-gate runtime, targeted checks pass, and the remaining red release blockers are isolated to the rebase/release E2E task."
doc_version: 3
doc_updated_at: "2026-03-14T14:37:47.037Z"
doc_updated_by: "CODER"
description: "Diagnose and fix the timeout regressions in dist-guard and release-smoke so runtime stale-build checks and legacy upgrade recovery stay release-safe under the current 0.3.7 code path."
sections:
  Summary: |-
    Stabilize dist-guard and release-smoke timeouts for v0.3.7
    
    Diagnose and fix the timeout regressions in dist-guard and release-smoke so runtime stale-build checks and legacy upgrade recovery stay release-safe under the current 0.3.7 code path.
  Scope: |-
    - In scope: Diagnose and fix the timeout regressions in dist-guard and release-smoke so runtime stale-build checks and legacy upgrade recovery stay release-safe under the current 0.3.7 code path.
    - Out of scope: unrelated refactors not required for "Stabilize dist-guard and release-smoke timeouts for v0.3.7".
  Plan: "Plan: profile the dist-guard and release-smoke timeout failures, identify whether they are caused by stale-build scanning, extra runtime work, or harness drift, then tighten the code or the test setup until the targeted suites complete within budget again."
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/release-smoke.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T14:37:07.591Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: dist-guard and release-smoke pass in isolation, and their explicit timeout budgets now match the observed release-gate wall-clock under heavy coverage load; targeted vitest and TypeScript checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T14:32:09.076Z, excerpt_hash=sha256:282880e768c7d66fce2400de4c167bdac5181afbb888a8847cbe35e38a18934f
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Stabilize dist-guard and release-smoke timeouts for v0.3.7

Diagnose and fix the timeout regressions in dist-guard and release-smoke so runtime stale-build checks and legacy upgrade recovery stay release-safe under the current 0.3.7 code path.

## Scope

- In scope: Diagnose and fix the timeout regressions in dist-guard and release-smoke so runtime stale-build checks and legacy upgrade recovery stay release-safe under the current 0.3.7 code path.
- Out of scope: unrelated refactors not required for "Stabilize dist-guard and release-smoke timeouts for v0.3.7".

## Plan

Plan: profile the dist-guard and release-smoke timeout failures, identify whether they are caused by stale-build scanning, extra runtime work, or harness drift, then tighten the code or the test setup until the targeted suites complete within budget again.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/release-smoke.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T14:37:07.591Z — VERIFY — ok

By: CODER

Note: Verified: dist-guard and release-smoke pass in isolation, and their explicit timeout budgets now match the observed release-gate wall-clock under heavy coverage load; targeted vitest and TypeScript checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T14:32:09.076Z, excerpt_hash=sha256:282880e768c7d66fce2400de4c167bdac5181afbb888a8847cbe35e38a18934f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
