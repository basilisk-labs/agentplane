---
id: "202603121302-H6WCPA"
title: "Cleanup phase: split task backend regression suite"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T13:25:04.736Z"
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
    body: "Start: split the mixed task-backend regression suite into focused helper, local, redmine, and loader files while preserving backend assertions and selector coverage."
events:
  -
    type: "status"
    at: "2026-03-12T13:25:21.034Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split the mixed task-backend regression suite into focused helper, local, redmine, and loader files while preserving backend assertions and selector coverage."
doc_version: 3
doc_updated_at: "2026-03-12T13:32:20.494Z"
doc_updated_by: "CODER"
description: "Split task-backend.test.ts into smaller helper, local backend, redmine backend, and loadTaskBackend suites to reduce mixed regression cost without changing assertions."
id_source: "generated"
---
## Summary

Cleanup phase: split task backend regression suite

Split task-backend.test.ts into smaller helper, local backend, redmine backend, and loadTaskBackend suites to reduce mixed regression cost without changing assertions.

## Scope

- In scope: Split task-backend.test.ts into smaller helper, local backend, redmine backend, and loadTaskBackend suites to reduce mixed regression cost without changing assertions.
- Out of scope: unrelated refactors not required for "Cleanup phase: split task backend regression suite".

## Plan

1. Identify coherent backend test domains inside the mixed task-backend regression suite.
2. Split the suite into focused files for shared helpers, LocalBackend, RedmineBackend, and loader behavior.
3. Update any test selectors or scripts that assume a single task-backend test file.
4. Run targeted tests, lint, and builds; then record evidence and finish the task.

## Verify Steps

1. Run the split task-backend regression suites. Expected: LocalBackend, RedmineBackend, loader/shared, and helper coverage all pass in their new files.
2. Run lint for the split backend test files and any updated selector code. Expected: no new lint violations.
3. Build the touched packages after the backend suite split. Expected: @agentplaneorg/core and agentplane build successfully.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. Backend regression coverage is now split into helpers, LocalBackend, RedmineBackend, and loadTaskBackend suites, which keeps backend-critical runs aligned with the new topology.
2. A shared backend test harness now owns silent-stdio setup and temp-dir helpers instead of repeating them across split suites.
