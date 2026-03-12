---
id: "202603121302-H6WCPA"
title: "Cleanup phase: split task backend regression suite"
result_summary: "Replaced the monolithic task-backend regression file with focused helpers/local/redmine/load suites, shared backend test harness utilities, and synchronized backend-critical/local-ci selectors."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-12T13:32:54.437Z"
  updated_by: "CODER"
  note: "Split task-backend coverage into 4 suites, reran the split backend suites plus local-ci-selection (102 tests), validated the updated test:backend-critical script (127 tests), and rebuilt @agentplaneorg/core plus agentplane."
commit:
  hash: "42c8ad976ad1547369fa5faa9cafc6c327891ae9"
  message: "🚧 H6WCPA task: split backend regression suite"
comments:
  -
    author: "CODER"
    body: "Start: split the mixed task-backend regression suite into focused helper, local, redmine, and loader files while preserving backend assertions and selector coverage."
  -
    author: "CODER"
    body: "Verified: backend regression coverage is split by domain and canonical backend-critical routing now follows the new suite topology."
events:
  -
    type: "status"
    at: "2026-03-12T13:25:21.034Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split the mixed task-backend regression suite into focused helper, local, redmine, and loader files while preserving backend assertions and selector coverage."
  -
    type: "verify"
    at: "2026-03-12T13:32:54.437Z"
    author: "CODER"
    state: "ok"
    note: "Split task-backend coverage into 4 suites, reran the split backend suites plus local-ci-selection (102 tests), validated the updated test:backend-critical script (127 tests), and rebuilt @agentplaneorg/core plus agentplane."
  -
    type: "status"
    at: "2026-03-12T13:33:02.304Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: backend regression coverage is split by domain and canonical backend-critical routing now follows the new suite topology."
doc_version: 3
doc_updated_at: "2026-03-12T13:33:02.304Z"
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
#### 2026-03-12T13:32:54.437Z — VERIFY — ok

By: CODER

Note: Split task-backend coverage into 4 suites, reran the split backend suites plus local-ci-selection (102 tests), validated the updated test:backend-critical script (127 tests), and rebuilt @agentplaneorg/core plus agentplane.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T13:32:20.494Z, excerpt_hash=sha256:882e1f884a945b56b1e6620c453a0a41a7ea5e1bc9962d5285847f8782994e76

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. Backend regression coverage is now split into helpers, LocalBackend, RedmineBackend, and loadTaskBackend suites, which keeps backend-critical runs aligned with the new topology.
2. A shared backend test harness now owns silent-stdio setup and temp-dir helpers instead of repeating them across split suites.
