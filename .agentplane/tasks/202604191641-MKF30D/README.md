---
id: "202604191641-MKF30D"
title: "Merge exit code and error mapping contracts"
result_summary: "Promoted CLI exit statuses into named ExitCode values with a public ERROR_TO_EXIT contract and updated tests to assert mapped exit outcomes."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "errors"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T07:02:19.862Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T07:03:19.255Z"
  updated_by: "CODER"
  note: "Verified unified exit contract: cli-contract, error-map, and critical exit-code tests passed; agentplane typecheck passed; prettier check passed; framework bootstrap passed."
commit:
  hash: "8c567c34a94b3e02bd453a4c989f2055866dfb6c"
  message: "♻️ MKF30D task: unify CLI exit code contract"
comments:
  -
    author: "CODER"
    body: "Start: unify CLI exit-code constants with error mapping contract."
  -
    author: "CODER"
    body: "Verified: cli-contract, error-map, and critical exit-code tests passed; agentplane typecheck, prettier check, and framework bootstrap passed."
events:
  -
    type: "status"
    at: "2026-04-20T07:02:20.303Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: unify CLI exit-code constants with error mapping contract."
  -
    type: "verify"
    at: "2026-04-20T07:03:19.255Z"
    author: "CODER"
    state: "ok"
    note: "Verified unified exit contract: cli-contract, error-map, and critical exit-code tests passed; agentplane typecheck passed; prettier check passed; framework bootstrap passed."
  -
    type: "status"
    at: "2026-04-20T07:03:32.147Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: cli-contract, error-map, and critical exit-code tests passed; agentplane typecheck, prettier check, and framework bootstrap passed."
doc_version: 3
doc_updated_at: "2026-04-20T07:03:32.147Z"
doc_updated_by: "CODER"
description: "Epic D′. Unify CLI exit code handling and error mapping behind one tested contract."
sections:
  Summary: |-
    Merge exit code and error mapping contracts
    
    Epic D′. Unify CLI exit code handling and error mapping behind one tested contract.
  Scope: |-
    - In scope: Epic D′. Unify CLI exit code handling and error mapping behind one tested contract.
    - Out of scope: unrelated refactors not required for "Merge exit code and error mapping contracts".
  Plan: "1. Inspect existing exit-code and error-map modules plus tests. 2. Promote numeric exit statuses into a named ExitCode enum and exported ERROR_TO_EXIT mapping while preserving existing numbers. 3. Update error-map and contract tests to consume the unified contract rather than a private map. 4. Run error-map/exit-code focused tests, typecheck, formatter, framework bootstrap if needed, commit, verify, and finish."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T07:03:19.255Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified unified exit contract: cli-contract, error-map, and critical exit-code tests passed; agentplane typecheck passed; prettier check passed; framework bootstrap passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T07:02:20.309Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Merge exit code and error mapping contracts

Epic D′. Unify CLI exit code handling and error mapping behind one tested contract.

## Scope

- In scope: Epic D′. Unify CLI exit code handling and error mapping behind one tested contract.
- Out of scope: unrelated refactors not required for "Merge exit code and error mapping contracts".

## Plan

1. Inspect existing exit-code and error-map modules plus tests. 2. Promote numeric exit statuses into a named ExitCode enum and exported ERROR_TO_EXIT mapping while preserving existing numbers. 3. Update error-map and contract tests to consume the unified contract rather than a private map. 4. Run error-map/exit-code focused tests, typecheck, formatter, framework bootstrap if needed, commit, verify, and finish.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T07:03:19.255Z — VERIFY — ok

By: CODER

Note: Verified unified exit contract: cli-contract, error-map, and critical exit-code tests passed; agentplane typecheck passed; prettier check passed; framework bootstrap passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T07:02:20.309Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
