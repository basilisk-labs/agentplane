---
id: "202603121545-6SZZDM"
title: "Stop doctor from counting satisfied CLI version facts as informational findings"
result_summary: "Doctor now treats a satisfied repository CLI version expectation as clean state instead of an informational finding, so clean runs no longer show misleading info counts."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T15:46:24.967Z"
  updated_by: "ORCHESTRATOR"
  note: "Proceed with the doctor summary cleanup after the emoji task lands."
verification:
  state: "ok"
  updated_at: "2026-03-12T16:04:58.161Z"
  updated_by: "CODER"
  note: "Verified: doctor no longer emits informational findings when the active CLI already satisfies the repository expectation, mismatch warnings remain actionable, and targeted doctor regressions plus lint/build passed."
commit:
  hash: "8c903df498d25245f2f364c300001101079f4adb"
  message: "⚙️ 6SZZDM test: cover clean doctor version expectations"
comments:
  -
    author: "CODER"
    body: "Start: stop counting satisfied CLI version expectations as doctor findings while preserving actionable mismatch warnings."
  -
    author: "CODER"
    body: "Verified: doctor no longer emits informational findings for satisfied CLI version expectations, mismatch warnings remain actionable, and targeted doctor regressions plus lint/build checks passed."
events:
  -
    type: "status"
    at: "2026-03-12T16:01:31.888Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: stop counting satisfied CLI version expectations as doctor findings while preserving actionable mismatch warnings."
  -
    type: "verify"
    at: "2026-03-12T16:04:58.161Z"
    author: "CODER"
    state: "ok"
    note: "Verified: doctor no longer emits informational findings when the active CLI already satisfies the repository expectation, mismatch warnings remain actionable, and targeted doctor regressions plus lint/build passed."
  -
    type: "status"
    at: "2026-03-12T16:07:41.852Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: doctor no longer emits informational findings for satisfied CLI version expectations, mismatch warnings remain actionable, and targeted doctor regressions plus lint/build checks passed."
doc_version: 3
doc_updated_at: "2026-03-12T16:07:41.853Z"
doc_updated_by: "CODER"
description: "Make doctor stop inflating the findings summary when the active CLI already satisfies the repository expectation, so clean runs do not show misleading INFO counts from version-match facts."
id_source: "generated"
---
## Summary

Stop doctor from counting satisfied CLI version facts as informational findings

Make doctor stop inflating the findings summary when the active CLI already satisfies the repository expectation, so clean runs do not show misleading INFO counts from version-match facts.

## Scope

- In scope: Make doctor stop inflating the findings summary when the active CLI already satisfies the repository expectation, so clean runs do not show misleading INFO counts from version-match facts.
- Out of scope: unrelated refactors not required for "Stop doctor from counting satisfied CLI version facts as informational findings".

## Plan

1. Adjust doctor runtime version reporting so satisfied CLI version expectations do not become informational findings in clean runs.
2. Keep actionable WARN/ERROR runtime version diagnostics intact when the active CLI is older than expected or unresolved.
3. Add doctor regressions that distinguish clean version-match output from actionable mismatch output.

## Verify Steps

1. Run doctor command regressions covering clean version-match and actionable version-mismatch cases. Expected: satisfied CLI version does not inflate doctor findings, but mismatch paths still report warnings.
2. Run lint on touched doctor/runtime test files. Expected: no lint failures.
3. Build @agentplaneorg/core and agentplane after the doctor change. Expected: both builds succeed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T16:04:58.161Z — VERIFY — ok

By: CODER

Note: Verified: doctor no longer emits informational findings when the active CLI already satisfies the repository expectation, mismatch warnings remain actionable, and targeted doctor regressions plus lint/build passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T16:01:31.889Z, excerpt_hash=sha256:72d97b9a0aa530098568afcf70f9245e83acb0a836dc407745a2528893b30c62

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
