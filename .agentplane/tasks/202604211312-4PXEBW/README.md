---
id: "202604211312-4PXEBW"
title: "Enforce core subpath imports with lint"
result_summary: "Added no-restricted-imports enforcement for @agentplaneorg/core symbols that must use /fs, /git, /logger, /process, /schemas, or /tasks, while preserving intentional aggregate root imports."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-04-21T16:30:42.987Z"
  updated_by: "CODER"
  note: "Verified core subpath import lint guard: bun run lint:core passed; bun run typecheck passed; bun run format:check passed; git diff --check passed; rg root-core imports still finds 185 intentional aggregate imports, while the lint guard blocks exported fs/git/logger/process/schemas/tasks symbols from root @agentplaneorg/core."
commit:
  hash: "500867d8ae287dc9f549e12b6386e442e155357b"
  message: "🧭 4PXEBW lint: enforce core subpath imports"
comments:
  -
    author: "CODER"
    body: "Start: enforce core subpath imports with a lint guard after DZTRN8 root-import migration."
  -
    author: "CODER"
    body: "Verified: core subpath import lint guard. Checks: bun run lint:core; bun run typecheck; bun run format:check; git diff --check; rg root-core imports reviewed as intentional aggregate imports while restricted subpath symbols are blocked by lint."
events:
  -
    type: "status"
    at: "2026-04-21T16:19:36.033Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: enforce core subpath imports with a lint guard after DZTRN8 root-import migration."
  -
    type: "verify"
    at: "2026-04-21T16:30:42.987Z"
    author: "CODER"
    state: "ok"
    note: "Verified core subpath import lint guard: bun run lint:core passed; bun run typecheck passed; bun run format:check passed; git diff --check passed; rg root-core imports still finds 185 intentional aggregate imports, while the lint guard blocks exported fs/git/logger/process/schemas/tasks symbols from root @agentplaneorg/core."
  -
    type: "status"
    at: "2026-04-21T16:30:49.078Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: core subpath import lint guard. Checks: bun run lint:core; bun run typecheck; bun run format:check; git diff --check; rg root-core imports reviewed as intentional aggregate imports while restricted subpath symbols are blocked by lint."
doc_version: 3
doc_updated_at: "2026-04-21T16:30:49.078Z"
doc_updated_by: "CODER"
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
    ### 2026-04-21T16:30:42.987Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified core subpath import lint guard: bun run lint:core passed; bun run typecheck passed; bun run format:check passed; git diff --check passed; rg root-core imports still finds 185 intentional aggregate imports, while the lint guard blocks exported fs/git/logger/process/schemas/tasks symbols from root @agentplaneorg/core.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:19:36.041Z, excerpt_hash=sha256:55f4227d94f66031bafb47b7526a7ff92ab7f78bf5068eec1d8ec5efd8f3b9c6
    
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
### 2026-04-21T16:30:42.987Z — VERIFY — ok

By: CODER

Note: Verified core subpath import lint guard: bun run lint:core passed; bun run typecheck passed; bun run format:check passed; git diff --check passed; rg root-core imports still finds 185 intentional aggregate imports, while the lint guard blocks exported fs/git/logger/process/schemas/tasks symbols from root @agentplaneorg/core.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:19:36.041Z, excerpt_hash=sha256:55f4227d94f66031bafb47b7526a7ff92ab7f78bf5068eec1d8ec5efd8f3b9c6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
