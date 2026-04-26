---
id: "202604261742-XBVYMY"
title: "Harden CLI cold-start guard retries"
result_summary: "Updated bench:cli:cold:check to use warmups=2 and attempts=5, refreshed scripts docs, and recorded verification evidence."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "performance"
  - "tooling"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-26T17:42:16.155Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-26T17:45:23.144Z"
  updated_by: "CODER"
  note: "Validated cold-start guard retry budget update: focused script tests passed, updated bench:cli:cold:check passed with existing thresholds, docs script check passed, format/typecheck/diff checks passed."
commit:
  hash: "bd20eb499bd9df57f6c02e0c7aeed95b344b16a3"
  message: "🚧 XBVYMY task: harden cold-start guard retries"
comments:
  -
    author: "CODER"
    body: "Start: Harden the default CLI cold-start guard retry settings without changing latency thresholds, then refresh scripts docs and verify the guard."
  -
    author: "CODER"
    body: "Verified: cold-start guard retry budget hardened with unchanged latency thresholds; focused script tests, standalone guard, docs script check, format, typecheck, and diff checks passed."
events:
  -
    type: "status"
    at: "2026-04-26T17:42:25.119Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Harden the default CLI cold-start guard retry settings without changing latency thresholds, then refresh scripts docs and verify the guard."
  -
    type: "verify"
    at: "2026-04-26T17:45:23.144Z"
    author: "CODER"
    state: "ok"
    note: "Validated cold-start guard retry budget update: focused script tests passed, updated bench:cli:cold:check passed with existing thresholds, docs script check passed, format/typecheck/diff checks passed."
  -
    type: "status"
    at: "2026-04-26T17:45:52.995Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: cold-start guard retry budget hardened with unchanged latency thresholds; focused script tests, standalone guard, docs script check, format, typecheck, and diff checks passed."
doc_version: 3
doc_updated_at: "2026-04-26T17:45:52.996Z"
doc_updated_by: "CODER"
description: "Make the default bench:cli:cold:check script less flaky in pre-push by increasing warmups and retry attempts without raising latency thresholds."
sections:
  Summary: |-
    Harden CLI cold-start guard retries
    
    Make the default bench:cli:cold:check script less flaky in pre-push by increasing warmups and retry attempts without raising latency thresholds.
  Scope: |-
    - In scope: Make the default bench:cli:cold:check script less flaky in pre-push by increasing warmups and retry attempts without raising latency thresholds.
    - Out of scope: unrelated refactors not required for "Harden CLI cold-start guard retries".
  Plan: |-
    1. Update the default bench:cli:cold:check script to keep the same latency thresholds but use more warmup/retry budget for pre-push stability.
    2. Refresh generated scripts documentation so the npm-script contract stays visible.
    3. Verify with the cold guard script test, standalone cold guard, format/diff checks, and task verification.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-26T17:45:23.144Z — VERIFY — ok
    
    By: CODER
    
    Note: Validated cold-start guard retry budget update: focused script tests passed, updated bench:cli:cold:check passed with existing thresholds, docs script check passed, format/typecheck/diff checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T17:42:25.146Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Harden CLI cold-start guard retries

Make the default bench:cli:cold:check script less flaky in pre-push by increasing warmups and retry attempts without raising latency thresholds.

## Scope

- In scope: Make the default bench:cli:cold:check script less flaky in pre-push by increasing warmups and retry attempts without raising latency thresholds.
- Out of scope: unrelated refactors not required for "Harden CLI cold-start guard retries".

## Plan

1. Update the default bench:cli:cold:check script to keep the same latency thresholds but use more warmup/retry budget for pre-push stability.
2. Refresh generated scripts documentation so the npm-script contract stays visible.
3. Verify with the cold guard script test, standalone cold guard, format/diff checks, and task verification.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-26T17:45:23.144Z — VERIFY — ok

By: CODER

Note: Validated cold-start guard retry budget update: focused script tests passed, updated bench:cli:cold:check passed with existing thresholds, docs script check passed, format/typecheck/diff checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T17:42:25.146Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
