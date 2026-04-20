---
id: "202604191640-3MTXR7"
title: "Promote shared git helpers into core git client"
result_summary: "shared git helpers promoted into core-backed wrappers"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "git"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T19:46:29.314Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T19:51:41.053Z"
  updated_by: "CODER"
  note: "Moved shared git process, branch, and status primitives into @agentplaneorg/core; agentplane wrappers now re-export the canonical implementation and focused core/workflow tests pass."
commit:
  hash: "f9ea09ceeb1f168be069c9f0b520cccb4d31b895"
  message: "🧩 3MTXR7 workflow: refresh task artifacts after commit"
comments:
  -
    author: "CODER"
    body: "Start: auditing remaining git shell helpers so the first B′ slice can move stable git primitives into @agentplaneorg/core without widening command-layer behavior."
  -
    author: "CODER"
    body: "Verified: shared git runtime now resolves from @agentplaneorg/core, wrapper exports remain compatible, and focused core plus workflow suites pass."
events:
  -
    type: "status"
    at: "2026-04-19T19:46:40.961Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: auditing remaining git shell helpers so the first B′ slice can move stable git primitives into @agentplaneorg/core without widening command-layer behavior."
  -
    type: "verify"
    at: "2026-04-19T19:51:41.053Z"
    author: "CODER"
    state: "ok"
    note: "Moved shared git process, branch, and status primitives into @agentplaneorg/core; agentplane wrappers now re-export the canonical implementation and focused core/workflow tests pass."
  -
    type: "status"
    at: "2026-04-19T19:51:41.100Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: shared git runtime now resolves from @agentplaneorg/core, wrapper exports remain compatible, and focused core plus workflow suites pass."
doc_version: 3
doc_updated_at: "2026-04-19T19:51:41.105Z"
doc_updated_by: "CODER"
description: "Epic B′. Move remaining command-layer git helpers into @agentplaneorg/core git surfaces and shrink agentplane wrappers."
sections:
  Summary: |-
    Promote shared git helpers into core git client
    
    Epic B′. Move remaining command-layer git helpers into @agentplaneorg/core git surfaces and shrink agentplane wrappers.
  Scope: |-
    - In scope: Epic B′. Move remaining command-layer git helpers into @agentplaneorg/core git surfaces and shrink agentplane wrappers.
    - Out of scope: unrelated refactors not required for "Promote shared git helpers into core git client".
  Plan: |-
    1. Implement the change for "Promote shared git helpers into core git client".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T19:51:41.053Z — VERIFY — ok
    
    By: CODER
    
    Note: Moved shared git process, branch, and status primitives into @agentplaneorg/core; agentplane wrappers now re-export the canonical implementation and focused core/workflow tests pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T19:46:40.975Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Promote shared git helpers into core git client

Epic B′. Move remaining command-layer git helpers into @agentplaneorg/core git surfaces and shrink agentplane wrappers.

## Scope

- In scope: Epic B′. Move remaining command-layer git helpers into @agentplaneorg/core git surfaces and shrink agentplane wrappers.
- Out of scope: unrelated refactors not required for "Promote shared git helpers into core git client".

## Plan

1. Implement the change for "Promote shared git helpers into core git client".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T19:51:41.053Z — VERIFY — ok

By: CODER

Note: Moved shared git process, branch, and status primitives into @agentplaneorg/core; agentplane wrappers now re-export the canonical implementation and focused core/workflow tests pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T19:46:40.975Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
