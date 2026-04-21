---
id: "202604211312-4PXEBW"
title: "Enforce core subpath imports with lint"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604211311-DZTRN8"
tags:
  - "architecture"
  - "code"
  - "lint"
verify:
  - "bun run lint:core"
  - "bun run typecheck"
  - "rg \"from ['\\\"]@agentplaneorg/core['\\\"]\" packages -n"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:12:08.552Z"
  updated_by: "ORCHESTRATOR"
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
doc_updated_at: "2026-04-21T13:12:07.887Z"
doc_updated_by: "PLANNER"
description: "Add a lint guard that forbids new internal @agentplaneorg/core root imports except an allowlisted aggregate case."
sections:
  Summary: |-
    Enforce core subpath imports with lint
    
    Add a lint guard that forbids new internal @agentplaneorg/core root imports except an allowlisted aggregate case.
  Scope: |-
    - In scope: Add a lint guard that forbids new internal @agentplaneorg/core root imports except an allowlisted aggregate case.
    - Out of scope: unrelated refactors not required for "Enforce core subpath imports with lint".
  Plan: "Scope: prevent subpath import regression. Steps: 1. Add an ESLint no-restricted-imports or equivalent local rule for packages/**. 2. Allow only intentional aggregate imports with a comment or explicit path-based exception. 3. Add a focused lint test/fixture if existing lint harness supports it. 4. Update developer docs if import policy is documented. Acceptance: lint fails on a new root core import; current code passes."
  Verify Steps: |-
    1. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `rg "from ['\"]@agentplaneorg/core['\"]" packages -n`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Enforce core subpath imports with lint

Add a lint guard that forbids new internal @agentplaneorg/core root imports except an allowlisted aggregate case.

## Scope

- In scope: Add a lint guard that forbids new internal @agentplaneorg/core root imports except an allowlisted aggregate case.
- Out of scope: unrelated refactors not required for "Enforce core subpath imports with lint".

## Plan

Scope: prevent subpath import regression. Steps: 1. Add an ESLint no-restricted-imports or equivalent local rule for packages/**. 2. Allow only intentional aggregate imports with a comment or explicit path-based exception. 3. Add a focused lint test/fixture if existing lint harness supports it. 4. Update developer docs if import policy is documented. Acceptance: lint fails on a new root core import; current code passes.

## Verify Steps

1. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `rg "from ['\"]@agentplaneorg/core['\"]" packages -n`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
