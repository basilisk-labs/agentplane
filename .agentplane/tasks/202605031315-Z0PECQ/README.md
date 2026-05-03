---
id: "202605031315-Z0PECQ"
title: "Add quickstart first-win demo path"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605031315-ZN8594"
tags:
  - "cli"
  - "code"
  - "onboarding"
verify:
  - "agentplane quickstart"
  - "bun run test:fast"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T13:15:57.590Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T13:33:17.255Z"
  updated_by: "CODER"
  note: "Quickstart now shows a safe first-visible-payoff path and artifact tree; targeted renderer tests, live quickstart output, docs-site typecheck, and diff whitespace checks passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: proceed after ZN8594 implementation and verification; branch_pr leaf finish will be recorded from base after integration."
events:
  -
    type: "status"
    at: "2026-05-03T13:31:33.872Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: proceed after ZN8594 implementation and verification; branch_pr leaf finish will be recorded from base after integration."
  -
    type: "verify"
    at: "2026-05-03T13:33:17.255Z"
    author: "CODER"
    state: "ok"
    note: "Quickstart now shows a safe first-visible-payoff path and artifact tree; targeted renderer tests, live quickstart output, docs-site typecheck, and diff whitespace checks passed."
doc_version: 3
doc_updated_at: "2026-05-03T13:33:17.260Z"
doc_updated_by: "CODER"
description: "Improve the CLI quickstart/onboarding path so a first-time user can see a safe fake-task artifact quickly enough to support the README and website demo promise."
sections:
  Summary: |-
    Add quickstart first-win demo path
    
    Improve the CLI quickstart/onboarding path so a first-time user can see a safe fake-task artifact quickly enough to support the README and website demo promise.
  Scope: |-
    - In scope: Improve the CLI quickstart/onboarding path so a first-time user can see a safe fake-task artifact quickly enough to support the README and website demo promise.
    - Out of scope: unrelated refactors not required for "Add quickstart first-win demo path".
  Plan: "Implement the smallest CLI/onboarding change needed for a first-time quickstart payoff. Acceptance: quickstart can show or generate a safe fake-task artifact path without mutating user code unexpectedly; tests cover the new path; README/site demo promises match actual behavior. Verify with test:fast and agentplane quickstart."
  Verify Steps: |-
    1. Run `bun run test:fast`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `agentplane quickstart`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T13:33:17.255Z — VERIFY — ok
    
    By: CODER
    
    Note: Quickstart now shows a safe first-visible-payoff path and artifact tree; targeted renderer tests, live quickstart output, docs-site typecheck, and diff whitespace checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:31:33.872Z, excerpt_hash=sha256:7c33524722a8bb46b638b2c1de90985d50a24c227611ad844569f40353b8f48f
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun test packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.boot.test.ts packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts --runInBand; Result: pass; Evidence: 21 tests passed; Scope: quickstart renderer and fast-path CLI behavior. Command: agentplane quickstart; Result: pass; Evidence: output includes First visible payoff, demo task commands, and .agentplane/tasks/<task-id>/ tree; Scope: installed quickstart surface. Command: bun run docs:site:typecheck; Result: pass; Evidence: tsc completed; Scope: website TS surface. Command: git diff --check; Result: pass; Evidence: no whitespace errors; Scope: touched CLI/test files.
      Impact: Quickstart remains non-mutating; it shows a safe demo-task path instead of automatically generating task artifacts.
      Resolution: Use the preview text in README and website copy; full final verification remains on the batch task.
id_source: "generated"
---
## Summary

Add quickstart first-win demo path

Improve the CLI quickstart/onboarding path so a first-time user can see a safe fake-task artifact quickly enough to support the README and website demo promise.

## Scope

- In scope: Improve the CLI quickstart/onboarding path so a first-time user can see a safe fake-task artifact quickly enough to support the README and website demo promise.
- Out of scope: unrelated refactors not required for "Add quickstart first-win demo path".

## Plan

Implement the smallest CLI/onboarding change needed for a first-time quickstart payoff. Acceptance: quickstart can show or generate a safe fake-task artifact path without mutating user code unexpectedly; tests cover the new path; README/site demo promises match actual behavior. Verify with test:fast and agentplane quickstart.

## Verify Steps

1. Run `bun run test:fast`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `agentplane quickstart`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T13:33:17.255Z — VERIFY — ok

By: CODER

Note: Quickstart now shows a safe first-visible-payoff path and artifact tree; targeted renderer tests, live quickstart output, docs-site typecheck, and diff whitespace checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:31:33.872Z, excerpt_hash=sha256:7c33524722a8bb46b638b2c1de90985d50a24c227611ad844569f40353b8f48f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun test packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.boot.test.ts packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts --runInBand; Result: pass; Evidence: 21 tests passed; Scope: quickstart renderer and fast-path CLI behavior. Command: agentplane quickstart; Result: pass; Evidence: output includes First visible payoff, demo task commands, and .agentplane/tasks/<task-id>/ tree; Scope: installed quickstart surface. Command: bun run docs:site:typecheck; Result: pass; Evidence: tsc completed; Scope: website TS surface. Command: git diff --check; Result: pass; Evidence: no whitespace errors; Scope: touched CLI/test files.
  Impact: Quickstart remains non-mutating; it shows a safe demo-task path instead of automatically generating task artifacts.
  Resolution: Use the preview text in README and website copy; full final verification remains on the batch task.
