---
id: "202604091338-75VJ4R"
title: "Stabilize wait-remote-pr-checks gh mock under parallel polling"
result_summary: "integrate: squash task/202604091338-75VJ4R/wait-remote-gh-mock-race"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T13:39:31.587Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T13:57:30.062Z"
  updated_by: "CODER"
  note: "Command: bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts --timeout 120000; for i in {1..10}; do bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts -t 'retries transient gh transport errors before resolving the PR' --timeout 120000; done; for i in {1..10}; do bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts -t 'times out with an explicit message when checks never settle' --timeout 120000; done; bun x eslint packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts. Result: pass. Evidence: full file 7/7 pass; transient retry loop 10/10 pass; timeout loop 10/10 pass; eslint and prettier clean. Scope: packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts gh mock harness stability under concurrent status/check-runs polling."
commit:
  hash: "d73aa5574c1054cd520f55c208e179619d54deec"
  message: "🧩 75VJ4R integrate: Stabilize wait-remote-pr-checks gh mock under parallel polling"
comments:
  -
    author: "CODER"
    body: "Start: reproduced the shared gh-state file race locally; concurrent gh api status/check-runs calls in the wait-remote-pr-checks test harness can read partially written JSON and make CI fail nondeterministically across multiple PRs."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604091338-75VJ4R/pr."
events:
  -
    type: "status"
    at: "2026-04-09T13:39:31.644Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduced the shared gh-state file race locally; concurrent gh api status/check-runs calls in the wait-remote-pr-checks test harness can read partially written JSON and make CI fail nondeterministically across multiple PRs."
  -
    type: "verify"
    at: "2026-04-09T13:57:30.062Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts --timeout 120000; for i in {1..10}; do bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts -t 'retries transient gh transport errors before resolving the PR' --timeout 120000; done; for i in {1..10}; do bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts -t 'times out with an explicit message when checks never settle' --timeout 120000; done; bun x eslint packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts. Result: pass. Evidence: full file 7/7 pass; transient retry loop 10/10 pass; timeout loop 10/10 pass; eslint and prettier clean. Scope: packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts gh mock harness stability under concurrent status/check-runs polling."
  -
    type: "status"
    at: "2026-04-09T14:05:41.819Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604091338-75VJ4R/pr."
doc_version: 3
doc_updated_at: "2026-04-09T14:05:41.823Z"
doc_updated_by: "INTEGRATOR"
description: "Fix the flaky wait-remote-pr-checks script test harness so concurrent gh api calls do not corrupt shared mock state and block PR CI across branch_pr workflow tasks."
sections:
  Summary: |-
    Stabilize wait-remote-pr-checks gh mock under parallel polling
    
    Fix the flaky wait-remote-pr-checks script test harness so concurrent gh api calls do not corrupt shared mock state and block PR CI across branch_pr workflow tasks.
  Scope: |-
    - In scope: Fix the flaky wait-remote-pr-checks script test harness so concurrent gh api calls do not corrupt shared mock state and block PR CI across branch_pr workflow tasks.
    - Out of scope: unrelated refactors not required for "Stabilize wait-remote-pr-checks gh mock under parallel polling".
  Plan: "1. Reproduce the flake locally and isolate the shared-state race in the gh mock harness. 2. Make gh mock state reads/writes atomic under concurrent child-process access without changing product behavior. 3. Add or adjust regression coverage, verify the flaky cases in repeated runs, then publish a task PR for downstream rebases."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts --timeout 120000`. Expected: all cases pass, including transient-retry and timeout paths.
    2. Re-run the flaky slices multiple times: `for i in {1..10}; do bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts -t 'retries transient gh transport errors before resolving the PR' --timeout 120000; done` and `for i in {1..10}; do bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts -t 'times out with an explicit message when checks never settle' --timeout 120000; done`. Expected: no intermittent failures.
    3. Run `bun x eslint packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts`. Expected: lint passes with no new formatting or style regressions.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T13:57:30.062Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts --timeout 120000; for i in {1..10}; do bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts -t 'retries transient gh transport errors before resolving the PR' --timeout 120000; done; for i in {1..10}; do bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts -t 'times out with an explicit message when checks never settle' --timeout 120000; done; bun x eslint packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts. Result: pass. Evidence: full file 7/7 pass; transient retry loop 10/10 pass; timeout loop 10/10 pass; eslint and prettier clean. Scope: packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts gh mock harness stability under concurrent status/check-runs polling.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T13:39:31.667Z, excerpt_hash=sha256:49ecf9941e51353ef583be6128cf96431b97967149429aee2c6f89fcc75727d6
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Stabilize wait-remote-pr-checks gh mock under parallel polling

Fix the flaky wait-remote-pr-checks script test harness so concurrent gh api calls do not corrupt shared mock state and block PR CI across branch_pr workflow tasks.

## Scope

- In scope: Fix the flaky wait-remote-pr-checks script test harness so concurrent gh api calls do not corrupt shared mock state and block PR CI across branch_pr workflow tasks.
- Out of scope: unrelated refactors not required for "Stabilize wait-remote-pr-checks gh mock under parallel polling".

## Plan

1. Reproduce the flake locally and isolate the shared-state race in the gh mock harness. 2. Make gh mock state reads/writes atomic under concurrent child-process access without changing product behavior. 3. Add or adjust regression coverage, verify the flaky cases in repeated runs, then publish a task PR for downstream rebases.

## Verify Steps

1. Run `bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts --timeout 120000`. Expected: all cases pass, including transient-retry and timeout paths.
2. Re-run the flaky slices multiple times: `for i in {1..10}; do bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts -t 'retries transient gh transport errors before resolving the PR' --timeout 120000; done` and `for i in {1..10}; do bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts -t 'times out with an explicit message when checks never settle' --timeout 120000; done`. Expected: no intermittent failures.
3. Run `bun x eslint packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts`. Expected: lint passes with no new formatting or style regressions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T13:57:30.062Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts --timeout 120000; for i in {1..10}; do bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts -t 'retries transient gh transport errors before resolving the PR' --timeout 120000; done; for i in {1..10}; do bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts -t 'times out with an explicit message when checks never settle' --timeout 120000; done; bun x eslint packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts. Result: pass. Evidence: full file 7/7 pass; transient retry loop 10/10 pass; timeout loop 10/10 pass; eslint and prettier clean. Scope: packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts gh mock harness stability under concurrent status/check-runs polling.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T13:39:31.667Z, excerpt_hash=sha256:49ecf9941e51353ef583be6128cf96431b97967149429aee2c6f89fcc75727d6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
