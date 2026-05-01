---
id: "202605010645-JH4RV4"
title: "AP-13: Split task query prepare tests"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605010645-GA1SAK"
tags:
  - "code"
verify:
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query-run-prepare.test.ts && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000"
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T11:25:44.857Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T11:38:51.440Z"
  updated_by: "CODER"
  note: "Verified split task query prepare tests before merge request. Commands passed: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000 (6 files, 19 tests, oversized baseline OK); bun run vitest:projects:check; bun run typecheck; bun run lint:core; bun run format:check; git diff --check; bun run policy:routing:check; agentplane doctor; bun run framework:dev:bootstrap. Scope remains test split plus oversized baseline update."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: splitting the oversized task query run/prepare suite and moving repeated setup into cli-core-tasks-query testkit helpers without changing task command behavior."
events:
  -
    type: "status"
    at: "2026-05-01T11:26:23.629Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: splitting the oversized task query run/prepare suite and moving repeated setup into cli-core-tasks-query testkit helpers without changing task command behavior."
  -
    type: "verify"
    at: "2026-05-01T11:38:51.440Z"
    author: "CODER"
    state: "ok"
    note: "Verified split task query prepare tests before merge request. Commands passed: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000 (6 files, 19 tests, oversized baseline OK); bun run vitest:projects:check; bun run typecheck; bun run lint:core; bun run format:check; git diff --check; bun run policy:routing:check; agentplane doctor; bun run framework:dev:bootstrap. Scope remains test split plus oversized baseline update."
doc_version: 3
doc_updated_at: "2026-05-01T11:38:51.506Z"
doc_updated_by: "CODER"
description: "Reduce the failing task query/prepare oversized test by moving repeated fixtures into testkit task-query helpers."
sections:
  Summary: |-
    AP-13: Split task query prepare tests
    
    Reduce the failing task query/prepare oversized test by moving repeated fixtures into testkit task-query helpers.
  Scope: |-
    - In scope: Reduce the failing task query/prepare oversized test by moving repeated fixtures into testkit task-query helpers.
    - Out of scope: unrelated refactors not required for "AP-13: Split task query prepare tests".
  Plan: |-
    1. Inspect run-cli.core.tasks.query-run-prepare.test.ts and existing @agentplane/testkit/cli-core-tasks-query helpers.
    2. Move repeated query/run/prepare fixtures into the task-query testkit surface when they are shared by the split files.
    3. Split the oversized query-run-prepare test into focused run and prepare/query files while keeping behavior unchanged.
    4. Update local-ci/test route metadata and oversized baseline only to reflect the split.
    5. Run focused task-query tests, oversized baseline guard, routing/inventory checks, typecheck, lint:core, formatting/diff checks, bootstrap, doctor, and policy routing.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000`. Expected: split task run/query tests and oversized guard pass.
    2. Run route/inventory checks for the split test files. Expected: routing still includes task query suites in the cli-core route.
    3. Run typecheck, lint, formatting/diff checks, bootstrap, doctor, and policy routing. Expected: all pass with no unintended tracked changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T11:38:51.440Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified split task query prepare tests before merge request. Commands passed: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000 (6 files, 19 tests, oversized baseline OK); bun run vitest:projects:check; bun run typecheck; bun run lint:core; bun run format:check; git diff --check; bun run policy:routing:check; agentplane doctor; bun run framework:dev:bootstrap. Scope remains test split plus oversized baseline update.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T11:27:49.045Z, excerpt_hash=sha256:6553ef26b3380782308d0e89d3238cc9586db7aada240ec660a91177ad33c1ca
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

AP-13: Split task query prepare tests

Reduce the failing task query/prepare oversized test by moving repeated fixtures into testkit task-query helpers.

## Scope

- In scope: Reduce the failing task query/prepare oversized test by moving repeated fixtures into testkit task-query helpers.
- Out of scope: unrelated refactors not required for "AP-13: Split task query prepare tests".

## Plan

1. Inspect run-cli.core.tasks.query-run-prepare.test.ts and existing @agentplane/testkit/cli-core-tasks-query helpers.
2. Move repeated query/run/prepare fixtures into the task-query testkit surface when they are shared by the split files.
3. Split the oversized query-run-prepare test into focused run and prepare/query files while keeping behavior unchanged.
4. Update local-ci/test route metadata and oversized baseline only to reflect the split.
5. Run focused task-query tests, oversized baseline guard, routing/inventory checks, typecheck, lint:core, formatting/diff checks, bootstrap, doctor, and policy routing.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000`. Expected: split task run/query tests and oversized guard pass.
2. Run route/inventory checks for the split test files. Expected: routing still includes task query suites in the cli-core route.
3. Run typecheck, lint, formatting/diff checks, bootstrap, doctor, and policy routing. Expected: all pass with no unintended tracked changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T11:38:51.440Z — VERIFY — ok

By: CODER

Note: Verified split task query prepare tests before merge request. Commands passed: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000 (6 files, 19 tests, oversized baseline OK); bun run vitest:projects:check; bun run typecheck; bun run lint:core; bun run format:check; git diff --check; bun run policy:routing:check; agentplane doctor; bun run framework:dev:bootstrap. Scope remains test split plus oversized baseline update.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T11:27:49.045Z, excerpt_hash=sha256:6553ef26b3380782308d0e89d3238cc9586db7aada240ec660a91177ad33c1ca

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
