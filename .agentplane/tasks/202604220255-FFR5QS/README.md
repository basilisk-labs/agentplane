---
id: "202604220255-FFR5QS"
title: "Split run-cli query support god helper"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604220255-YDBAT5"
tags:
  - "cli"
  - "refactor"
  - "testing"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:03.474Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T06:27:06.058Z"
  updated_by: "CODER"
  note: "Verified query support split. Checks passed: focused query CLI Vitest suite; bun run typecheck; bun run format:check; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split run-cli query support helper into smaller task-scoped modules and preserve query test behavior."
events:
  -
    type: "status"
    at: "2026-04-22T06:10:22.615Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split run-cli query support helper into smaller task-scoped modules and preserve query test behavior."
  -
    type: "verify"
    at: "2026-04-22T06:27:06.058Z"
    author: "CODER"
    state: "ok"
    note: "Verified query support split. Checks passed: focused query CLI Vitest suite; bun run typecheck; bun run format:check; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check."
doc_version: 3
doc_updated_at: "2026-04-22T06:27:06.065Z"
doc_updated_by: "CODER"
description: "Break run-cli.core.tasks.query-support into focused fixtures and remove import-time side effects from helper modules."
sections:
  Summary: "Make CLI task query test helpers composable and side-effect-free at import time."
  Scope: "CLI test support modules and affected tests only. No production command changes."
  Plan: |-
    1. Identify side-effectful setup in query-support.
    2. Split fixture creation, harness installation, assertions, and data builders into focused modules.
    3. Move installRunCliIntegrationHarness behind explicit test setup calls.
    4. Verify all task query tests.
  Verify Steps: "Run task query CLI tests, fast CI, knip check."
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T06:27:06.058Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified query support split. Checks passed: focused query CLI Vitest suite; bun run typecheck; bun run format:check; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T06:10:22.625Z, excerpt_hash=sha256:e1b02ae7101c29526804df1d53363e8d42ed622e777aa97043ad271cdfc3e141
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore the single query-support helper module and previous imports."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Make CLI task query test helpers composable and side-effect-free at import time.

## Scope

CLI test support modules and affected tests only. No production command changes.

## Plan

1. Identify side-effectful setup in query-support.
2. Split fixture creation, harness installation, assertions, and data builders into focused modules.
3. Move installRunCliIntegrationHarness behind explicit test setup calls.
4. Verify all task query tests.

## Verify Steps

Run task query CLI tests, fast CI, knip check.

## Verification

Pending implementation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T06:27:06.058Z — VERIFY — ok

By: CODER

Note: Verified query support split. Checks passed: focused query CLI Vitest suite; bun run typecheck; bun run format:check; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T06:10:22.625Z, excerpt_hash=sha256:e1b02ae7101c29526804df1d53363e8d42ed622e777aa97043ad271cdfc3e141

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore the single query-support helper module and previous imports.

## Findings

None yet.
