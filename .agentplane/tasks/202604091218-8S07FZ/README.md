---
id: "202604091218-8S07FZ"
title: "Allow workflow:wait-remote-checks to accept multiple PRs"
result_summary: "Merged via PR #179."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T12:18:39.201Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T12:23:06.707Z"
  updated_by: "CODER"
  note: "Verified multi-PR support in workflow:wait-remote-checks. Focused tests passed for single-PR, multi-PR order/caching, failure semantics, transient GH retry, auth failure, and timeout paths. Focused lint passed for scripts/wait-remote-pr-checks.mjs and packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts."
commit:
  hash: "1e6b8a5b9acf86a98becae05d2f82ca4f4023b72"
  message: "workflow: Allow workflow:wait-remote-checks to accept multiple PRs (8S07FZ) (#179)"
comments:
  -
    author: "CODER"
    body: "Start: implement multi-PR wait support in workflow:wait-remote-checks with focused tests and verification."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #179 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-09T12:21:08.076Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement multi-PR wait support in workflow:wait-remote-checks with focused tests and verification."
  -
    type: "verify"
    at: "2026-04-09T12:23:06.707Z"
    author: "CODER"
    state: "ok"
    note: "Verified multi-PR support in workflow:wait-remote-checks. Focused tests passed for single-PR, multi-PR order/caching, failure semantics, transient GH retry, auth failure, and timeout paths. Focused lint passed for scripts/wait-remote-pr-checks.mjs and packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts."
  -
    type: "status"
    at: "2026-04-09T12:50:20.470Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #179 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-09T12:50:20.476Z"
doc_updated_by: "INTEGRATOR"
description: "Make the remote-check wait helper accept multiple PR numbers in one invocation so orchestration waves do not need ad hoc shell fan-out just to wait for several task PRs."
sections:
  Summary: |-
    Allow workflow:wait-remote-checks to accept multiple PRs
    
    Make the remote-check wait helper accept multiple PR numbers in one invocation so orchestration waves do not need ad hoc shell fan-out just to wait for several task PRs.
  Scope: |-
    - In scope: Make the remote-check wait helper accept multiple PR numbers in one invocation so orchestration waves do not need ad hoc shell fan-out just to wait for several task PRs.
    - Out of scope: unrelated refactors not required for "Allow workflow:wait-remote-checks to accept multiple PRs".
  Plan: "1. Reproduce the current single-PR failure mode in workflow:wait-remote-checks when multiple PR numbers are passed. 2. Add multi-PR support with deterministic reporting and failure semantics. 3. Cover the new multi-PR path with script tests."
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. <Action>. Expected: <observable result>.
    2. <Action>. Expected: <observable result>.
    3. <Action>. Expected: <observable result>.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T12:23:06.707Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified multi-PR support in workflow:wait-remote-checks. Focused tests passed for single-PR, multi-PR order/caching, failure semantics, transient GH retry, auth failure, and timeout paths. Focused lint passed for scripts/wait-remote-pr-checks.mjs and packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T12:21:08.086Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Allow workflow:wait-remote-checks to accept multiple PRs

Make the remote-check wait helper accept multiple PR numbers in one invocation so orchestration waves do not need ad hoc shell fan-out just to wait for several task PRs.

## Scope

- In scope: Make the remote-check wait helper accept multiple PR numbers in one invocation so orchestration waves do not need ad hoc shell fan-out just to wait for several task PRs.
- Out of scope: unrelated refactors not required for "Allow workflow:wait-remote-checks to accept multiple PRs".

## Plan

1. Reproduce the current single-PR failure mode in workflow:wait-remote-checks when multiple PR numbers are passed. 2. Add multi-PR support with deterministic reporting and failure semantics. 3. Cover the new multi-PR path with script tests.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T12:23:06.707Z — VERIFY — ok

By: CODER

Note: Verified multi-PR support in workflow:wait-remote-checks. Focused tests passed for single-PR, multi-PR order/caching, failure semantics, transient GH retry, auth failure, and timeout paths. Focused lint passed for scripts/wait-remote-pr-checks.mjs and packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T12:21:08.086Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
