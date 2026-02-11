---
id: "202602111631-9N6WVJ"
title: "T4: Enforce cleanup of .agentplane/.release and .agentplane/.upgrade in tests"
result_summary: "Test helpers now remove .agentplane/.upgrade and .agentplane/.release between tests."
risk_level: "low"
status: "DONE"
priority: "med"
owner: "TESTER"
depends_on:
  - "202602111631-XV07Z9"
tags:
  - "testing"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-11T16:43:07.275Z"
  updated_by: "ORCHESTRATOR"
  note: "Plan approved."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "20e81cfa305b46428bd49c0f0139fe2fc4c6441c"
  message: "✅ 9N6WVJ tests: clean transient release/upgrade dirs after each test"
comments:
  -
    author: "TESTER"
    body: "Start: implement test-harness transient artifact cleanup and verify release/upgrade suites."
  -
    author: "TESTER"
    body: "Verified: bunx vitest run packages/agentplane/src/commands/upgrade.cleanup.test.ts packages/agentplane/src/commands/release/plan.test.ts packages/agentplane/src/commands/release/apply.test.ts; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build."
events:
  -
    type: "status"
    at: "2026-02-11T16:43:07.456Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement test-harness transient artifact cleanup and verify release/upgrade suites."
  -
    type: "status"
    at: "2026-02-11T16:43:38.365Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bunx vitest run packages/agentplane/src/commands/upgrade.cleanup.test.ts packages/agentplane/src/commands/release/plan.test.ts packages/agentplane/src/commands/release/apply.test.ts; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build."
doc_version: 2
doc_updated_at: "2026-02-11T16:43:38.365Z"
doc_updated_by: "TESTER"
description: "Add reliable setup/teardown cleanup for release/upgrade transient artifacts in test harness to avoid cross-test contamination."
id_source: "generated"
---
## Summary

Add deterministic test-harness cleanup for transient release/upgrade artifacts to prevent cross-test contamination between CLI suites.

## Scope

In scope: packages/agentplane/src/cli/run-cli.test-helpers.ts root lifecycle and cleanup hooks. Out of scope: production upgrade/release runtime behavior.

## Plan

1) Register temp test roots in helpers. 2) Add afterEach cleanup for .agentplane/.upgrade and .agentplane/.release under tracked test roots. 3) Validate with targeted release/upgrade tests.

## Risks

Risk: cleanup might remove directories while a test still needs them. Mitigation: clean only after each test and only under helper-created temp roots.

## Verification


## Rollback Plan

Revert helper changes in run-cli.test-helpers.ts and re-run targeted tests to confirm previous behavior.

## Verify Steps

- bunx vitest run packages/agentplane/src/commands/upgrade.cleanup.test.ts packages/agentplane/src/commands/release/plan.test.ts packages/agentplane/src/commands/release/apply.test.ts\n- bun run --filter=@agentplaneorg/core build\n- bun run --filter=agentplane build
