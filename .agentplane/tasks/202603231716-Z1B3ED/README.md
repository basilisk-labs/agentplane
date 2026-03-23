---
id: "202603231716-Z1B3ED"
title: "Backfill recipe test fixture scenario definitions"
result_summary: "Backfilled recipe fixture scenario definitions to match the current runtime schema."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recipes"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T17:17:09.066Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T17:18:46.442Z"
  updated_by: "CODER"
  note: "Recipe fixture helpers now materialize current scenario definitions so install and scenario tests match the runtime contract."
commit:
  hash: "4db16df987e23b8f22a08e4a20f8fe376f5697eb"
  message: "✅ Z1B3ED code: done"
comments:
  -
    author: "CODER"
    body: "Start: persist scenario definition fixture files from recipe manifests in recipes.test-helpers so recipe install and scenario tests match the current runtime contract."
  -
    author: "CODER"
    body: "Verified: recipe test fixtures now materialize current scenario definition files with task_template data when manifests are installed into test workspaces, and the remaining local-directory install fixture was updated to the same schema; targeted recipe tests, builds, and doctor pass."
events:
  -
    type: "status"
    at: "2026-03-23T17:17:16.854Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: persist scenario definition fixture files from recipe manifests in recipes.test-helpers so recipe install and scenario tests match the current runtime contract."
  -
    type: "verify"
    at: "2026-03-23T17:18:46.442Z"
    author: "CODER"
    state: "ok"
    note: "Recipe fixture helpers now materialize current scenario definitions so install and scenario tests match the runtime contract."
  -
    type: "status"
    at: "2026-03-23T17:19:35.199Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: recipe test fixtures now materialize current scenario definition files with task_template data when manifests are installed into test workspaces, and the remaining local-directory install fixture was updated to the same schema; targeted recipe tests, builds, and doctor pass."
doc_version: 3
doc_updated_at: "2026-03-23T17:19:35.200Z"
doc_updated_by: "CODER"
description: "Persist scenario definition fixture files from installed recipe manifests in recipes.test-helpers so recipe install and scenario tests match the current runtime contract requiring task_template-bearing scenario files."
sections:
  Summary: |-
    Backfill recipe test fixture scenario definitions
    
    Persist scenario definition fixture files from installed recipe manifests in recipes.test-helpers so recipe install and scenario tests match the current runtime contract requiring task_template-bearing scenario files.
  Scope: |-
    - In scope: Persist scenario definition fixture files from installed recipe manifests in recipes.test-helpers so recipe install and scenario tests match the current runtime contract requiring task_template-bearing scenario files.
    - Out of scope: unrelated refactors not required for "Backfill recipe test fixture scenario definitions".
  Plan: |-
    1. Keep recipes.test-helpers in sync with the current runtime contract by materializing scenario definition files from manifest scenario descriptors when installed recipe fixtures are written.
    2. Verify the repair against the recipe install and scenario command tests that now require scenario.task_template-backed definition files.
    3. Record verification evidence and finish the repair as a single commit without touching unrelated recipe/runtime code.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/commands/recipes.catalog-install.test.ts packages/agentplane/src/commands/recipes.list.test.ts. Expected: pass.
    2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Expected: pass.
    3. Run AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor. Expected: pass with no new workflow/doc violations.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T17:18:46.442Z — VERIFY — ok
    
    By: CODER
    
    Note: Recipe fixture helpers now materialize current scenario definitions so install and scenario tests match the runtime contract.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T17:17:16.855Z, excerpt_hash=sha256:dcc39d3c0df53a097aa93ebe1c22beaafa7c20b4ea0e17161d38242fa0031590
    
    Details:
    
    Command: bunx vitest run packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/commands/recipes.catalog-install.test.ts packages/agentplane/src/commands/recipes.list.test.ts
    Result: pass
    Evidence: 41 tests passed, including the previously failing local-directory install path and scenario resolver flows.
    Scope: recipe test helper fixture generation and recipe install/scenario command coverage.
    
    Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: both packages built successfully.
    Scope: source build/typecheck for touched test/helper surfaces.
    
    Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor
    Result: pass
    Evidence: doctor reported OK with errors=0 warnings=0.
    Scope: workflow and task-doc invariants after the repair.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Backfill recipe test fixture scenario definitions

Persist scenario definition fixture files from installed recipe manifests in recipes.test-helpers so recipe install and scenario tests match the current runtime contract requiring task_template-bearing scenario files.

## Scope

- In scope: Persist scenario definition fixture files from installed recipe manifests in recipes.test-helpers so recipe install and scenario tests match the current runtime contract requiring task_template-bearing scenario files.
- Out of scope: unrelated refactors not required for "Backfill recipe test fixture scenario definitions".

## Plan

1. Keep recipes.test-helpers in sync with the current runtime contract by materializing scenario definition files from manifest scenario descriptors when installed recipe fixtures are written.
2. Verify the repair against the recipe install and scenario command tests that now require scenario.task_template-backed definition files.
3. Record verification evidence and finish the repair as a single commit without touching unrelated recipe/runtime code.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/commands/recipes.catalog-install.test.ts packages/agentplane/src/commands/recipes.list.test.ts. Expected: pass.
2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Expected: pass.
3. Run AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor. Expected: pass with no new workflow/doc violations.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T17:18:46.442Z — VERIFY — ok

By: CODER

Note: Recipe fixture helpers now materialize current scenario definitions so install and scenario tests match the runtime contract.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T17:17:16.855Z, excerpt_hash=sha256:dcc39d3c0df53a097aa93ebe1c22beaafa7c20b4ea0e17161d38242fa0031590

Details:

Command: bunx vitest run packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/commands/recipes.catalog-install.test.ts packages/agentplane/src/commands/recipes.list.test.ts
Result: pass
Evidence: 41 tests passed, including the previously failing local-directory install path and scenario resolver flows.
Scope: recipe test helper fixture generation and recipe install/scenario command coverage.

Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
Result: pass
Evidence: both packages built successfully.
Scope: source build/typecheck for touched test/helper surfaces.

Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor
Result: pass
Evidence: doctor reported OK with errors=0 warnings=0.
Scope: workflow and task-doc invariants after the repair.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
