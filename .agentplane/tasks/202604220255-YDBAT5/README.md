---
id: "202604220255-YDBAT5"
title: "Consolidate CLI harness helpers and backend doubles"
result_summary: "Moved lifecycle tests to public approveTaskPlan from testkit and made stubTaskBackend delegate to makeTaskBackendDouble while preserving CLI harness defaults."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604220255-9AW010"
tags:
  - "cleanup"
  - "testing"
  - "testkit"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:01.840Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T06:05:43.235Z"
  updated_by: "CODER"
  note: "Verified testkit helper consolidation. Checks passed: focused lifecycle/backend/testkit Vitest suite; bun run typecheck; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check."
commit:
  hash: "6c9d684ed8a15b013e859bd2c2134ade444eafc9"
  message: "🧹 YDBAT5 testkit: consolidate CLI helper doubles"
comments:
  -
    author: "CODER"
    body: "Start: consolidate CLI harness helpers and backend doubles."
  -
    author: "CODER"
    body: "Verified: test helper behavior is consolidated in @agentplane/testkit and duplicate local implementations were removed."
events:
  -
    type: "status"
    at: "2026-04-22T05:56:51.138Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: consolidate CLI harness helpers and backend doubles."
  -
    type: "verify"
    at: "2026-04-22T06:05:43.235Z"
    author: "CODER"
    state: "ok"
    note: "Verified testkit helper consolidation. Checks passed: focused lifecycle/backend/testkit Vitest suite; bun run typecheck; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check."
  -
    type: "status"
    at: "2026-04-22T06:05:56.309Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: test helper behavior is consolidated in @agentplane/testkit and duplicate local implementations were removed."
doc_version: 3
doc_updated_at: "2026-04-22T06:05:56.310Z"
doc_updated_by: "CODER"
description: "Deduplicate approveTaskPlan and task-backend double helpers across testkit and run-cli lifecycle helper modules."
sections:
  Summary: "Move duplicated CLI lifecycle helper behavior into one public testkit helper and update tests to consume it."
  Scope: "Test helper modules and tests only. No production behavior change."
  Plan: |-
    1. Compare duplicate approveTaskPlan/helper implementations.
    2. Select canonical home in packages/testkit public API.
    3. Replace duplicate test-local helpers with imports from the canonical helper.
    4. Verify affected CLI lifecycle tests.
  Verify Steps: "Run affected run-cli lifecycle tests, testkit tests, fast CI, knip check."
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T06:05:43.235Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified testkit helper consolidation. Checks passed: focused lifecycle/backend/testkit Vitest suite; bun run typecheck; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T05:56:51.148Z, excerpt_hash=sha256:cf455fb1be9bab62e2c6b4794fef3012b271af8d33166c7fdd2a88b8122eafb7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore local helper definitions and remove canonical exports added by this task."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Move duplicated CLI lifecycle helper behavior into one public testkit helper and update tests to consume it.

## Scope

Test helper modules and tests only. No production behavior change.

## Plan

1. Compare duplicate approveTaskPlan/helper implementations.
2. Select canonical home in packages/testkit public API.
3. Replace duplicate test-local helpers with imports from the canonical helper.
4. Verify affected CLI lifecycle tests.

## Verify Steps

Run affected run-cli lifecycle tests, testkit tests, fast CI, knip check.

## Verification

Pending implementation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T06:05:43.235Z — VERIFY — ok

By: CODER

Note: Verified testkit helper consolidation. Checks passed: focused lifecycle/backend/testkit Vitest suite; bun run typecheck; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T05:56:51.148Z, excerpt_hash=sha256:cf455fb1be9bab62e2c6b4794fef3012b271af8d33166c7fdd2a88b8122eafb7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore local helper definitions and remove canonical exports added by this task.

## Findings

None yet.
