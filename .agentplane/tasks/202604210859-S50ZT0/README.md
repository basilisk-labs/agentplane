---
id: "202604210859-S50ZT0"
title: "Enable full no-misused-promises checking"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "lint"
  - "typescript"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-21T08:59:36.802Z"
doc_updated_by: "PLANNER"
description: "Enable @typescript-eslint/no-misused-promises checksVoidReturn and fix or explicitly justify resulting async handler findings."
sections:
  Summary: "Tighten TypeScript linting around async functions passed to void-returning callbacks to reduce unhandled promise risk."
  Scope: "In scope: ESLint rule config, resulting code fixes, and targeted suppressions with comments. Out of scope: unrelated lint cleanup."
  Plan: |-
    1. Enable checksVoidReturn=true for no-misused-promises.
    2. Run lint to collect findings.
    3. Fix handlers by awaiting/catching/wrapping, or add narrow disables with rationale.
    4. Run lint and affected tests.
  Verify Steps: |-
    - Lint passes with checksVoidReturn enabled.
    - Suppressions, if any, are local and explain why the promise cannot leak.
    - No unrelated lint rules are changed.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore prior lint option and revert code fixes for this task only."
  Findings: "Source input: AUDIT M-3 and REFACTORING_PLAN E.4."
id_source: "generated"
---
## Summary

Tighten TypeScript linting around async functions passed to void-returning callbacks to reduce unhandled promise risk.

## Scope

In scope: ESLint rule config, resulting code fixes, and targeted suppressions with comments. Out of scope: unrelated lint cleanup.

## Plan

1. Enable checksVoidReturn=true for no-misused-promises.
2. Run lint to collect findings.
3. Fix handlers by awaiting/catching/wrapping, or add narrow disables with rationale.
4. Run lint and affected tests.

## Verify Steps

- Lint passes with checksVoidReturn enabled.
- Suppressions, if any, are local and explain why the promise cannot leak.
- No unrelated lint rules are changed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore prior lint option and revert code fixes for this task only.

## Findings

Source input: AUDIT M-3 and REFACTORING_PLAN E.4.
