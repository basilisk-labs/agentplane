---
id: "202604260911-Y0FDNG"
title: "Align doctor tests with stderr writer"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "push-blocker"
  - "refactor"
  - "test"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-26T09:12:15.962Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-26T09:13:59.399Z"
  updated_by: "CODER"
  note: "Aligned doctor tests with process.stderr.write diagnostics."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: repair stale doctor test stderr capture so pre-push can validate the current output contract."
events:
  -
    type: "status"
    at: "2026-04-26T09:12:19.828Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair stale doctor test stderr capture so pre-push can validate the current output contract."
  -
    type: "verify"
    at: "2026-04-26T09:13:59.399Z"
    author: "CODER"
    state: "ok"
    note: "Aligned doctor tests with process.stderr.write diagnostics."
doc_version: 3
doc_updated_at: "2026-04-26T09:13:59.403Z"
doc_updated_by: "CODER"
description: "Repair pre-push doctor test expectations after diagnostics moved through process.stderr.write rather than console.error."
sections:
  Summary: |-
    Align doctor tests with stderr writer
    
    Repair pre-push doctor test expectations after diagnostics moved through process.stderr.write rather than console.error.
  Scope: |-
    - In scope: Repair pre-push doctor test expectations after diagnostics moved through process.stderr.write rather than console.error.
    - Out of scope: unrelated refactors not required for "Align doctor tests with stderr writer".
  Plan: |-
    1. Replace stale console.error spies in doctor tests with process.stderr.write capture helper.
    2. Keep assertions unchanged where possible to preserve the stderr diagnostics contract.
    3. Run focused doctor tests plus lint/typecheck before retrying push.
  Verify Steps: |-
    1. Review the requested outcome for "Align doctor tests with stderr writer". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-26T09:13:59.399Z — VERIFY — ok
    
    By: CODER
    
    Note: Aligned doctor tests with process.stderr.write diagnostics.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T09:12:19.834Z, excerpt_hash=sha256:5e2352db5c767d02b5f100c5b9b5b5919506e1aca241478366c68da7ee9076f6
    
    Details:
    
    Checks passed: focused doctor vitest suites; bun run lint:core; bun run typecheck; bun run format:check; git diff --check.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Align doctor tests with stderr writer

Repair pre-push doctor test expectations after diagnostics moved through process.stderr.write rather than console.error.

## Scope

- In scope: Repair pre-push doctor test expectations after diagnostics moved through process.stderr.write rather than console.error.
- Out of scope: unrelated refactors not required for "Align doctor tests with stderr writer".

## Plan

1. Replace stale console.error spies in doctor tests with process.stderr.write capture helper.
2. Keep assertions unchanged where possible to preserve the stderr diagnostics contract.
3. Run focused doctor tests plus lint/typecheck before retrying push.

## Verify Steps

1. Review the requested outcome for "Align doctor tests with stderr writer". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-26T09:13:59.399Z — VERIFY — ok

By: CODER

Note: Aligned doctor tests with process.stderr.write diagnostics.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T09:12:19.834Z, excerpt_hash=sha256:5e2352db5c767d02b5f100c5b9b5b5919506e1aca241478366c68da7ee9076f6

Details:

Checks passed: focused doctor vitest suites; bun run lint:core; bun run typecheck; bun run format:check; git diff --check.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
