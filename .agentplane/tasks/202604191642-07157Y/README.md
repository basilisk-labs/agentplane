---
id: "202604191642-07157Y"
title: "Replace root test matrix with Vitest workspace projects"
result_summary: "Replaced root test script sprawl with vitest.workspace.ts named projects and canonical test:project routing."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "testing"
  - "tooling"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T14:38:03.857Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T15:19:09.803Z"
  updated_by: "CODER"
  note: "Verification passed: project smoke suites, coverage wrapper suites, release CI contract, lifecycle finish test, release-smoke project, full test:fast, format, lint, build, and workflow command contract. Root package.json now has 8 test scripts."
commit:
  hash: "b10004be7babcd503ee2799d91f8dc448a27cb44"
  message: "🧪 07157Y test: add Vitest workspace projects"
comments:
  -
    author: "CODER"
    body: "Start: Replacing the root test script matrix with named Vitest workspace projects and canonical CI aliases while preserving current suite coverage."
  -
    author: "CODER"
    body: "Verified: Vitest workspace projects route the former root test matrix through named projects; package.json is down to 8 test scripts; coverage wrappers, CI workflows, docs, release contract tests, and run-cli finish output expectations were updated. Checks passed: test:fast, project smoke suites, coverage suites, format, lint, build."
events:
  -
    type: "status"
    at: "2026-04-20T14:38:09.262Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Replacing the root test script matrix with named Vitest workspace projects and canonical CI aliases while preserving current suite coverage."
  -
    type: "verify"
    at: "2026-04-20T15:19:09.803Z"
    author: "CODER"
    state: "ok"
    note: "Verification passed: project smoke suites, coverage wrapper suites, release CI contract, lifecycle finish test, release-smoke project, full test:fast, format, lint, build, and workflow command contract. Root package.json now has 8 test scripts."
  -
    type: "status"
    at: "2026-04-20T15:19:32.494Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Vitest workspace projects route the former root test matrix through named projects; package.json is down to 8 test scripts; coverage wrappers, CI workflows, docs, release contract tests, and run-cli finish output expectations were updated. Checks passed: test:fast, project smoke suites, coverage suites, format, lint, build."
doc_version: 3
doc_updated_at: "2026-04-20T15:19:32.496Z"
doc_updated_by: "CODER"
description: "Epic K and J′. Introduce Vitest workspace projects and shrink the root test script matrix."
sections:
  Summary: |-
    Replace root test matrix with Vitest workspace projects
    
    Epic K and J′. Introduce Vitest workspace projects and shrink the root test script matrix.
  Scope: |-
    - In scope: Epic K and J′. Introduce Vitest workspace projects and shrink the root test script matrix.
    - Out of scope: unrelated refactors not required for "Replace root test matrix with Vitest workspace projects".
  Plan: "Introduce vitest.workspace.ts with named projects for fast, package, CLI, critical, platform, backend, guard, release, workflow coverage, and significant coverage suites. Shrink root test:* scripts to the canonical project runners plus required CI aliases, then update scripts/workflows/docs/tests that reference renamed test scripts. Verification: project smoke runs, affected contract tests, lint, format, and build."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T15:19:09.803Z — VERIFY — ok
    
    By: CODER
    
    Note: Verification passed: project smoke suites, coverage wrapper suites, release CI contract, lifecycle finish test, release-smoke project, full test:fast, format, lint, build, and workflow command contract. Root package.json now has 8 test scripts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T14:38:09.268Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Replace root test matrix with Vitest workspace projects

Epic K and J′. Introduce Vitest workspace projects and shrink the root test script matrix.

## Scope

- In scope: Epic K and J′. Introduce Vitest workspace projects and shrink the root test script matrix.
- Out of scope: unrelated refactors not required for "Replace root test matrix with Vitest workspace projects".

## Plan

Introduce vitest.workspace.ts with named projects for fast, package, CLI, critical, platform, backend, guard, release, workflow coverage, and significant coverage suites. Shrink root test:* scripts to the canonical project runners plus required CI aliases, then update scripts/workflows/docs/tests that reference renamed test scripts. Verification: project smoke runs, affected contract tests, lint, format, and build.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T15:19:09.803Z — VERIFY — ok

By: CODER

Note: Verification passed: project smoke suites, coverage wrapper suites, release CI contract, lifecycle finish test, release-smoke project, full test:fast, format, lint, build, and workflow command contract. Root package.json now has 8 test scripts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T14:38:09.268Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
