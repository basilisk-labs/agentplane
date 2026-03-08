---
id: "202603081422-MYT5TP"
title: "Raise legacy README migration integration test timeout budget"
result_summary: "The legacy README migration scenario no longer fails CI because its timeout budget was smaller than its real integration runtime."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202603081422-5XXATM"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T14:30:23.265Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T14:31:15.218Z"
  updated_by: "CODER"
  note: "Verified: the isolated legacy README v2 recovery scenario passes in about 6.5 seconds, lint is clean for the touched test file, and the test now has an explicit integration timeout budget that matches its real runtime on slower CI runners."
commit:
  hash: "777bc2d0b6f35611774f83b313e72edb4dbb8ff7"
  message: "🧪 MYT5TP test: raise legacy migration timeout budget"
comments:
  -
    author: "CODER"
    body: "Start: treating the CI failure as a timeout-budget mismatch first, not as a migration logic regression, and narrowing the fix to the slow legacy recovery integration scenario."
  -
    author: "CODER"
    body: "Verified: the isolated legacy README v2 recovery scenario still passes, its measured runtime is about 6.5 seconds, lint is clean for the touched test file, and the scenario now carries an explicit integration timeout budget instead of relying on the default 5000ms limit."
events:
  -
    type: "status"
    at: "2026-03-08T14:30:23.617Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: treating the CI failure as a timeout-budget mismatch first, not as a migration logic regression, and narrowing the fix to the slow legacy recovery integration scenario."
  -
    type: "verify"
    at: "2026-03-08T14:31:15.218Z"
    author: "CODER"
    state: "ok"
    note: "Verified: the isolated legacy README v2 recovery scenario passes in about 6.5 seconds, lint is clean for the touched test file, and the test now has an explicit integration timeout budget that matches its real runtime on slower CI runners."
  -
    type: "status"
    at: "2026-03-08T14:31:31.622Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the isolated legacy README v2 recovery scenario still passes, its measured runtime is about 6.5 seconds, lint is clean for the touched test file, and the scenario now carries an explicit integration timeout budget instead of relying on the default 5000ms limit."
doc_version: 3
doc_updated_at: "2026-03-08T14:31:31.622Z"
doc_updated_by: "CODER"
description: "Fix the CI-only failure where the legacy README v2 recovery scenario times out after 5000ms even though the scenario completes correctly on slower runners; give the test an explicit integration timeout that matches its real runtime."
id_source: "generated"
---
## Summary

- Problem: the legacy README v2 recovery integration scenario is functionally correct but exceeds the default 5000ms timeout on slower CI runners.
- Target outcome: the scenario keeps its current behavior but runs under an explicit integration timeout budget that matches real execution time.
- Constraint: do not weaken the scenario assertions or remove recovery coverage.

## Scope

### In scope
- confirm the timeout mismatch on the existing legacy migration scenario
- add an explicit per-test timeout budget
- rerun the targeted test path and record the result

### Out of scope
- refactoring the entire integration suite
- changing recovery semantics
- unrelated upgrade or doctor behavior changes

## Plan

1. Confirm the scenario is timing out because of budget, not because of a functional failure.
2. Add an explicit integration timeout to the legacy recovery test.
3. Re-run the targeted test and close the task with traceable verification.

## Verify Steps

1. Run the isolated legacy recovery test. Expected: the scenario passes and its runtime exceeds or approaches the previous 5000ms budget.
2. Run the touched init/upgrade backend test path after the timeout change. Expected: the scenario passes without timing out.
3. Run `bun run lint:core -- <touched test file>`. Expected: the touched test file lint cleanly.

## Rollback Plan

1. Revert the timeout-budget change.
2. Re-run the isolated test to confirm the previous failure mode returns only if explicitly needed for comparison.

## Findings


## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T14:31:15.218Z — VERIFY — ok

By: CODER

Note: Verified: the isolated legacy README v2 recovery scenario passes in about 6.5 seconds, lint is clean for the touched test file, and the test now has an explicit integration timeout budget that matches its real runtime on slower CI runners.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T14:30:23.617Z, excerpt_hash=sha256:b0e335d81ce7d9c61a2d0b73518379fd991dc3dd0a682d78ac43e01146f89a23

<!-- END VERIFICATION RESULTS -->
