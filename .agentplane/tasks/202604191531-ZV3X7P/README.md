---
id: "202604191531-ZV3X7P"
title: "Advance epic E′ testkit consolidation"
result_summary: "Moved the active CLI harness implementation into @agentplane/testkit while preserving agentplane compatibility helpers."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "testkit"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T15:31:32.926Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T15:37:22.383Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/testkit/src/index.test.ts packages/testkit/src/cli.test.ts packages/agentplane/src/cli/run-cli.test-helpers.test.ts; Result: pass; Evidence: 3 files and 3 tests passed after moving the active harness into testkit and keeping compatibility re-exports. Scope: testkit package surface and agentplane helper compatibility. Command: bun run --filter=@agentplane/testkit typecheck; Result: pass; Evidence: @agentplane/testkit typecheck exited with code 0. Scope: moved testkit sources and package boundary."
commit:
  hash: "2f28fb88841e12779abf253fc2084f9cac5dfc1b"
  message: "🧪 testkit: move cli harness into package"
comments:
  -
    author: "CODER"
    body: "Start: consolidate the current test harness into @agentplane/testkit while preserving compatibility imports in agentplane."
  -
    author: "CODER"
    body: "Verified: the active CLI harness now has its own implementation inside @agentplane/testkit, and compatibility entrypoints in agentplane continue to serve existing tests."
events:
  -
    type: "status"
    at: "2026-04-19T15:31:33.467Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: consolidate the current test harness into @agentplane/testkit while preserving compatibility imports in agentplane."
  -
    type: "verify"
    at: "2026-04-19T15:37:22.383Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/testkit/src/index.test.ts packages/testkit/src/cli.test.ts packages/agentplane/src/cli/run-cli.test-helpers.test.ts; Result: pass; Evidence: 3 files and 3 tests passed after moving the active harness into testkit and keeping compatibility re-exports. Scope: testkit package surface and agentplane helper compatibility. Command: bun run --filter=@agentplane/testkit typecheck; Result: pass; Evidence: @agentplane/testkit typecheck exited with code 0. Scope: moved testkit sources and package boundary."
  -
    type: "status"
    at: "2026-04-19T15:38:36.726Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the active CLI harness now has its own implementation inside @agentplane/testkit, and compatibility entrypoints in agentplane continue to serve existing tests."
doc_version: 3
doc_updated_at: "2026-04-19T15:38:36.727Z"
doc_updated_by: "CODER"
description: "Move active testing utilities into @agentplane/testkit, leave thin compatibility entrypoints in agentplane, and start removing test-only helpers from production paths."
sections:
  Summary: |-
    Advance epic E′ testkit consolidation
    
    Move active testing utilities into @agentplane/testkit, leave thin compatibility entrypoints in agentplane, and start removing test-only helpers from production paths.
  Scope: |-
    - In scope: Move active testing utilities into @agentplane/testkit, leave thin compatibility entrypoints in agentplane, and start removing test-only helpers from production paths.
    - Out of scope: unrelated refactors not required for "Advance epic E′ testkit consolidation".
  Plan: |-
    1. Move the active CLI harness and related test-only helpers from packages/agentplane/src/testing into packages/testkit/src.
    2. Leave thin compatibility re-exports in agentplane so existing imports keep working while the package boundary is established.
    3. Update representative tests to import from @agentplane/testkit surfaces.
    4. Verify with focused testkit and CLI helper coverage.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T15:37:22.383Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/testkit/src/index.test.ts packages/testkit/src/cli.test.ts packages/agentplane/src/cli/run-cli.test-helpers.test.ts; Result: pass; Evidence: 3 files and 3 tests passed after moving the active harness into testkit and keeping compatibility re-exports. Scope: testkit package surface and agentplane helper compatibility. Command: bun run --filter=@agentplane/testkit typecheck; Result: pass; Evidence: @agentplane/testkit typecheck exited with code 0. Scope: moved testkit sources and package boundary.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T15:31:33.483Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Advance epic E′ testkit consolidation

Move active testing utilities into @agentplane/testkit, leave thin compatibility entrypoints in agentplane, and start removing test-only helpers from production paths.

## Scope

- In scope: Move active testing utilities into @agentplane/testkit, leave thin compatibility entrypoints in agentplane, and start removing test-only helpers from production paths.
- Out of scope: unrelated refactors not required for "Advance epic E′ testkit consolidation".

## Plan

1. Move the active CLI harness and related test-only helpers from packages/agentplane/src/testing into packages/testkit/src.
2. Leave thin compatibility re-exports in agentplane so existing imports keep working while the package boundary is established.
3. Update representative tests to import from @agentplane/testkit surfaces.
4. Verify with focused testkit and CLI helper coverage.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T15:37:22.383Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/testkit/src/index.test.ts packages/testkit/src/cli.test.ts packages/agentplane/src/cli/run-cli.test-helpers.test.ts; Result: pass; Evidence: 3 files and 3 tests passed after moving the active harness into testkit and keeping compatibility re-exports. Scope: testkit package surface and agentplane helper compatibility. Command: bun run --filter=@agentplane/testkit typecheck; Result: pass; Evidence: @agentplane/testkit typecheck exited with code 0. Scope: moved testkit sources and package boundary.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T15:31:33.483Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
