---
id: "202604161300-HA439T"
title: "Unify transient GitHub transport retry coverage across workflow helpers"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-16T13:35:46.765Z"
  updated_by: "CODER"
  note: "Verified: wait-remote-pr-checks now uses the shared GitHub transport retry contract via scripts/lib/gh-transport.mjs, and wait-remote-pr-checks-script.test.ts passes with parity coverage for defaults and transient/permanent classification."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: audit the remaining GitHub helper paths against the current retry contract, extract the smallest shared transient transport retry boundary, and close INC-20260407-01 without broad GitHub workflow refactors."
events:
  -
    type: "status"
    at: "2026-04-16T13:31:12.367Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: audit the remaining GitHub helper paths against the current retry contract, extract the smallest shared transient transport retry boundary, and close INC-20260407-01 without broad GitHub workflow refactors."
  -
    type: "verify"
    at: "2026-04-16T13:35:46.765Z"
    author: "CODER"
    state: "ok"
    note: "Verified: wait-remote-pr-checks now uses the shared GitHub transport retry contract via scripts/lib/gh-transport.mjs, and wait-remote-pr-checks-script.test.ts passes with parity coverage for defaults and transient/permanent classification."
doc_version: 3
doc_updated_at: "2026-04-16T13:35:46.769Z"
doc_updated_by: "CODER"
description: "INC-20260407-01 remains open: GitHub-dependent branch_pr helpers still need one explicit contract for classifying EOF/TLS/SSL transport failures as transient, retrying them with bounded backoff, and surfacing auth/usage failures immediately across PR creation, reconcile, and remote-check paths."
sections:
  Summary: |-
    Unify transient GitHub transport retry coverage across workflow helpers
    
    INC-20260407-01 remains open: GitHub-dependent branch_pr helpers still need one explicit contract for classifying EOF/TLS/SSL transport failures as transient, retrying them with bounded backoff, and surfacing auth/usage failures immediately across PR creation, reconcile, and remote-check paths.
  Scope: |-
    - In scope: INC-20260407-01 remains open: GitHub-dependent branch_pr helpers still need one explicit contract for classifying EOF/TLS/SSL transport failures as transient, retrying them with bounded backoff, and surfacing auth/usage failures immediately across PR creation, reconcile, and remote-check paths.
    - Out of scope: unrelated refactors not required for "Unify transient GitHub transport retry coverage across workflow helpers".
  Plan: "1. Audit GitHub-dependent workflow helpers that still call gh/GraphQL/REST without the shared transient transport retry contract; verify scope by locating the current retry helper and all remaining direct call sites. 2. Implement the smallest shared retry layer or adapter needed so PR creation, reconcile, and remote-check paths classify EOF/TLS/SSL transport failures as transient, retry with bounded backoff, and fail fast on auth or usage errors. 3. Add focused regression coverage for the touched helper paths, then verify the changed commands preserve current success behavior while retrying only the intended transport failures."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-16T13:35:46.765Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: wait-remote-pr-checks now uses the shared GitHub transport retry contract via scripts/lib/gh-transport.mjs, and wait-remote-pr-checks-script.test.ts passes with parity coverage for defaults and transient/permanent classification.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-16T13:31:12.374Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Unify transient GitHub transport retry coverage across workflow helpers

INC-20260407-01 remains open: GitHub-dependent branch_pr helpers still need one explicit contract for classifying EOF/TLS/SSL transport failures as transient, retrying them with bounded backoff, and surfacing auth/usage failures immediately across PR creation, reconcile, and remote-check paths.

## Scope

- In scope: INC-20260407-01 remains open: GitHub-dependent branch_pr helpers still need one explicit contract for classifying EOF/TLS/SSL transport failures as transient, retrying them with bounded backoff, and surfacing auth/usage failures immediately across PR creation, reconcile, and remote-check paths.
- Out of scope: unrelated refactors not required for "Unify transient GitHub transport retry coverage across workflow helpers".

## Plan

1. Audit GitHub-dependent workflow helpers that still call gh/GraphQL/REST without the shared transient transport retry contract; verify scope by locating the current retry helper and all remaining direct call sites. 2. Implement the smallest shared retry layer or adapter needed so PR creation, reconcile, and remote-check paths classify EOF/TLS/SSL transport failures as transient, retry with bounded backoff, and fail fast on auth or usage errors. 3. Add focused regression coverage for the touched helper paths, then verify the changed commands preserve current success behavior while retrying only the intended transport failures.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-16T13:35:46.765Z — VERIFY — ok

By: CODER

Note: Verified: wait-remote-pr-checks now uses the shared GitHub transport retry contract via scripts/lib/gh-transport.mjs, and wait-remote-pr-checks-script.test.ts passes with parity coverage for defaults and transient/permanent classification.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-16T13:31:12.374Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
