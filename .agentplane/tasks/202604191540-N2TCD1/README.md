---
id: "202604191540-N2TCD1"
title: "Add command helper surfaces to @agentplane/testkit"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
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
  updated_at: "2026-04-19T15:40:59.589Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T15:42:56.825Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/commands/recipes.list.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/release/check-release-parity-script.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts; Result: pass; Evidence: 4 files and 18 tests passed after introducing canonical testkit helper entry modules and switching representative tests to them. Scope: recipes/task/release/runner helper surfaces. Command: bun run --filter=@agentplane/testkit typecheck; Result: pass; Evidence: @agentplane/testkit typecheck exited with code 0. Scope: new testkit helper modules and package exports."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add canonical command helper modules to @agentplane/testkit and switch representative tests to the new package surface."
events:
  -
    type: "status"
    at: "2026-04-19T15:41:00.271Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add canonical command helper modules to @agentplane/testkit and switch representative tests to the new package surface."
  -
    type: "verify"
    at: "2026-04-19T15:42:56.825Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/recipes.list.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/release/check-release-parity-script.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts; Result: pass; Evidence: 4 files and 18 tests passed after introducing canonical testkit helper entry modules and switching representative tests to them. Scope: recipes/task/release/runner helper surfaces. Command: bun run --filter=@agentplane/testkit typecheck; Result: pass; Evidence: @agentplane/testkit typecheck exited with code 0. Scope: new testkit helper modules and package exports."
doc_version: 3
doc_updated_at: "2026-04-19T15:42:56.840Z"
doc_updated_by: "CODER"
description: "Create canonical testkit modules for recipes, task, release, and runner helpers, then switch representative tests to import them from @agentplane/testkit before deleting the old agentplane-local helper files."
sections:
  Summary: |-
    Add command helper surfaces to @agentplane/testkit
    
    Create canonical testkit modules for recipes, task, release, and runner helpers, then switch representative tests to import them from @agentplane/testkit before deleting the old agentplane-local helper files.
  Scope: |-
    - In scope: Create canonical testkit modules for recipes, task, release, and runner helpers, then switch representative tests to import them from @agentplane/testkit before deleting the old agentplane-local helper files.
    - Out of scope: unrelated refactors not required for "Add command helper surfaces to @agentplane/testkit".
  Plan: |-
    1. Add canonical testkit modules for recipes, task, release, and runner helpers without widening the package graph unsafely.
    2. Re-export or duplicate only the minimum helper surfaces needed so representative tests can consume @agentplane/testkit directly.
    3. Switch a focused set of tests onto the new imports and verify build/test stability before deleting old agentplane-local helper files in a later slice.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T15:42:56.825Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/commands/recipes.list.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/release/check-release-parity-script.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts; Result: pass; Evidence: 4 files and 18 tests passed after introducing canonical testkit helper entry modules and switching representative tests to them. Scope: recipes/task/release/runner helper surfaces. Command: bun run --filter=@agentplane/testkit typecheck; Result: pass; Evidence: @agentplane/testkit typecheck exited with code 0. Scope: new testkit helper modules and package exports.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T15:41:00.287Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add command helper surfaces to @agentplane/testkit

Create canonical testkit modules for recipes, task, release, and runner helpers, then switch representative tests to import them from @agentplane/testkit before deleting the old agentplane-local helper files.

## Scope

- In scope: Create canonical testkit modules for recipes, task, release, and runner helpers, then switch representative tests to import them from @agentplane/testkit before deleting the old agentplane-local helper files.
- Out of scope: unrelated refactors not required for "Add command helper surfaces to @agentplane/testkit".

## Plan

1. Add canonical testkit modules for recipes, task, release, and runner helpers without widening the package graph unsafely.
2. Re-export or duplicate only the minimum helper surfaces needed so representative tests can consume @agentplane/testkit directly.
3. Switch a focused set of tests onto the new imports and verify build/test stability before deleting old agentplane-local helper files in a later slice.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T15:42:56.825Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/recipes.list.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/release/check-release-parity-script.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts; Result: pass; Evidence: 4 files and 18 tests passed after introducing canonical testkit helper entry modules and switching representative tests to them. Scope: recipes/task/release/runner helper surfaces. Command: bun run --filter=@agentplane/testkit typecheck; Result: pass; Evidence: @agentplane/testkit typecheck exited with code 0. Scope: new testkit helper modules and package exports.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T15:41:00.287Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
