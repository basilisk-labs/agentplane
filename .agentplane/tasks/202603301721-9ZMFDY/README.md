---
id: "202603301721-9ZMFDY"
title: "Lock current help-routing behavior with CLI contract tests"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "cli"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-30T17:28:28.530Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-30T17:32:07.030Z"
  updated_by: "CODER"
  note: "OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts; added focused help-routing contract coverage for --help, task --help, task plan --help, and unknown-command suggestion flows."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: locking current help, --help, help <cmd>, and unknown-command suggestion behavior with targeted CLI contract tests only; no router refactor in this task."
events:
  -
    type: "status"
    at: "2026-03-30T17:29:20.399Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: locking current help, --help, help <cmd>, and unknown-command suggestion behavior with targeted CLI contract tests only; no router refactor in this task."
  -
    type: "verify"
    at: "2026-03-30T17:32:07.030Z"
    author: "CODER"
    state: "ok"
    note: "OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts; added focused help-routing contract coverage for --help, task --help, task plan --help, and unknown-command suggestion flows."
doc_version: 3
doc_updated_at: "2026-03-30T17:32:07.032Z"
doc_updated_by: "CODER"
description: "Implement Epic 0 / R0.1 by adding behavior-locking tests for help routing, including help, --help, help <cmd>, and unknown-command suggestion flows, so later routing refactors can remove duplication without changing behavior."
sections:
  Summary: |-
    Lock current help-routing behavior with CLI contract tests
    
    Implement Epic 0 / R0.1 by adding behavior-locking tests for help routing, including help, --help, help <cmd>, and unknown-command suggestion flows, so later routing refactors can remove duplication without changing behavior.
  Scope: |-
    - In scope: Implement Epic 0 / R0.1 by adding behavior-locking tests for help routing, including help, --help, help <cmd>, and unknown-command suggestion flows, so later routing refactors can remove duplication without changing behavior.
    - Out of scope: unrelated refactors not required for "Lock current help-routing behavior with CLI contract tests".
  Plan: |-
    1. Audit existing CLI test coverage for help, --help, help <cmd>, and unknown-command suggestion behavior.
    2. Add the smallest set of contract tests that lock the current help-routing behavior without refactoring the router itself.
    3. Verify the targeted test slice and keep the task scoped to Epic 0 / R0.1 only.
  Verify Steps: |-
    1. Run the targeted CLI help-routing test slice. Expected: help, --help, help <cmd>, and unknown-command suggestion flows are asserted by stable tests.
    2. Inspect the changed test files. Expected: the task adds behavior-locking tests only and does not refactor runtime routing logic.
    3. Re-run the exact targeted tests after any snapshot or assertion updates. Expected: the safety-net slice passes cleanly.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-30T17:32:07.030Z — VERIFY — ok
    
    By: CODER
    
    Note: OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts; added focused help-routing contract coverage for --help, task --help, task plan --help, and unknown-command suggestion flows.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T17:29:20.400Z, excerpt_hash=sha256:e5b2e95e24860bccadfe214854e189318f3301cb254e136e0aeeec942c41d76a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Lock current help-routing behavior with CLI contract tests

Implement Epic 0 / R0.1 by adding behavior-locking tests for help routing, including help, --help, help <cmd>, and unknown-command suggestion flows, so later routing refactors can remove duplication without changing behavior.

## Scope

- In scope: Implement Epic 0 / R0.1 by adding behavior-locking tests for help routing, including help, --help, help <cmd>, and unknown-command suggestion flows, so later routing refactors can remove duplication without changing behavior.
- Out of scope: unrelated refactors not required for "Lock current help-routing behavior with CLI contract tests".

## Plan

1. Audit existing CLI test coverage for help, --help, help <cmd>, and unknown-command suggestion behavior.
2. Add the smallest set of contract tests that lock the current help-routing behavior without refactoring the router itself.
3. Verify the targeted test slice and keep the task scoped to Epic 0 / R0.1 only.

## Verify Steps

1. Run the targeted CLI help-routing test slice. Expected: help, --help, help <cmd>, and unknown-command suggestion flows are asserted by stable tests.
2. Inspect the changed test files. Expected: the task adds behavior-locking tests only and does not refactor runtime routing logic.
3. Re-run the exact targeted tests after any snapshot or assertion updates. Expected: the safety-net slice passes cleanly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-30T17:32:07.030Z — VERIFY — ok

By: CODER

Note: OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts; added focused help-routing contract coverage for --help, task --help, task plan --help, and unknown-command suggestion flows.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T17:29:20.400Z, excerpt_hash=sha256:e5b2e95e24860bccadfe214854e189318f3301cb254e136e0aeeec942c41d76a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
