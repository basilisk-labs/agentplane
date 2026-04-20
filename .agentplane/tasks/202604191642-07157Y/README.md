---
id: "202604191642-07157Y"
title: "Replace root test matrix with Vitest workspace projects"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Replacing the root test script matrix with named Vitest workspace projects and canonical CI aliases while preserving current suite coverage."
events:
  -
    type: "status"
    at: "2026-04-20T14:38:09.262Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Replacing the root test script matrix with named Vitest workspace projects and canonical CI aliases while preserving current suite coverage."
doc_version: 3
doc_updated_at: "2026-04-20T14:38:09.268Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
