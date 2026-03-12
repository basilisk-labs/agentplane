---
id: "202603121125-RZ4HDW"
title: "Patch stabilization: split task CLI integration bucket"
result_summary: "Task CLI integration coverage now runs through smaller split suites with matching fast-CI routing."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks*.test.ts --hookTimeout 60000 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T11:38:58.067Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved because run-cli.core.tasks.test.ts remains the largest mixed CLI bucket after the lifecycle, guard, and workflow splits."
verification:
  state: "ok"
  updated_at: "2026-03-12T11:53:07.976Z"
  updated_by: "CODER"
  note: "Verified split task CLI suites and updated fast-CI routing."
commit:
  hash: "b7f403efa4714ea54a8a2446fb1bd12648df9c2d"
  message: "🚧 RZ4HDW task: split task CLI suites and route them in fast-CI"
comments:
  -
    author: "CODER"
    body: "Start: split the oversized task CLI integration bucket into smaller suites grouped by task lifecycle, task docs, and task inventory behavior while preserving existing coverage."
  -
    author: "CODER"
    body: "Verified: the oversized task CLI bucket is now split into query, doc-write, and export suites, and fast-CI still routes task split files through the targeted cli-core contour."
events:
  -
    type: "status"
    at: "2026-03-12T11:38:59.549Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split the oversized task CLI integration bucket into smaller suites grouped by task lifecycle, task docs, and task inventory behavior while preserving existing coverage."
  -
    type: "verify"
    at: "2026-03-12T11:53:07.976Z"
    author: "CODER"
    state: "ok"
    note: "Verified split task CLI suites and updated fast-CI routing."
  -
    type: "status"
    at: "2026-03-12T11:53:59.794Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the oversized task CLI bucket is now split into query, doc-write, and export suites, and fast-CI still routes task split files through the targeted cli-core contour."
doc_version: 3
doc_updated_at: "2026-03-12T11:53:59.794Z"
doc_updated_by: "CODER"
description: "Decompose the oversized run-cli task integration test bucket into smaller suites with preserved coverage and lower regression-localization cost."
id_source: "generated"
---
## Summary

Patch stabilization: split task CLI integration bucket

Decompose the oversized run-cli task integration test bucket into smaller suites with preserved coverage and lower regression-localization cost.

## Scope

- In scope: Decompose the oversized run-cli task integration test bucket into smaller suites with preserved coverage and lower regression-localization cost.
- Out of scope: unrelated refactors not required for "Patch stabilization: split task CLI integration bucket".

## Plan

1. Split the oversized run-cli task integration bucket into smaller suites grouped by behavior.
2. Keep test helpers and assertions stable while preserving the old coverage surface.
3. Run the split suites and ensure the package build still passes.

## Verify Steps

- The old mixed task bucket is replaced by smaller suites with equivalent coverage.
- The new suite set passes under vitest.
- Package builds remain green.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T11:53:07.976Z — VERIFY — ok

By: CODER

Note: Verified split task CLI suites and updated fast-CI routing.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T11:38:59.549Z, excerpt_hash=sha256:2752fd379d02e0b228375c2e1f3be06ec9d79136e5d71559ffb2d927896fc008

Details:

Checks:
- bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks*.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts --hookTimeout 60000 --testTimeout 60000
- ./node_modules/.bin/eslint packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts packages/agentplane/src/cli/run-cli.core.tasks.export.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts scripts/lib/local-ci-selection.mjs
- bun run --filter=@agentplaneorg/core build
- bun run --filter=agentplane build

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
