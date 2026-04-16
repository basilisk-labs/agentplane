---
id: "202604161712-0N90F5"
title: "Cut over recipes to project overlays"
result_summary: "Merged via PR #368."
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
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-16T17:12:31.451Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-16T19:07:15.290Z"
  updated_by: "CODER"
  note: "Overlay cutover and framework runtime bootstrap checks passed."
commit:
  hash: "22344199daf48e293d6f0da750f4beaeaab8e3ab"
  message: "recipes/workflow: Cut over recipes to project overlays (0N90F5) (#368)"
comments:
  -
    author: "CODER"
    body: "Start: replace scenario-centric recipes with project overlays, route recipes-domain authority through packages/recipes, and rewire runtime prompt assembly onto compiled overlay bundles."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #368 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-16T17:13:21.578Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace scenario-centric recipes with project overlays, route recipes-domain authority through packages/recipes, and rewire runtime prompt assembly onto compiled overlay bundles."
  -
    type: "verify"
    at: "2026-04-16T17:47:26.256Z"
    author: "CODER"
    state: "ok"
    note: "Overlay cutover checks passed."
  -
    type: "verify"
    at: "2026-04-16T19:07:15.290Z"
    author: "CODER"
    state: "ok"
    note: "Overlay cutover and framework runtime bootstrap checks passed."
  -
    type: "status"
    at: "2026-04-16T19:31:20.688Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #368 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-16T19:31:20.694Z"
doc_updated_by: "INTEGRATOR"
description: "Replace scenario-centric recipes with project overlays, activation state, and compiled runtime bundle."
sections:
  Summary: |-
    Cut over recipes to project overlays
    
    Replace scenario-centric recipes with project overlays, activation state, and compiled runtime bundle.
  Scope: |-
    - In scope: Replace scenario-centric recipes with project overlays, activation state, and compiled runtime bundle.
    - Out of scope: unrelated refactors not required for "Cut over recipes to project overlays".
  Plan: "1. Remove duplicated recipes-domain code from packages/agentplane and route all recipe manifests/types/parsing through packages/recipes. 2. Replace scenario-centric recipe schema with project overlays only: activation state in config, recipes lock file, compiled overlay bundle, and overlay-first CLI commands. 3. Rewrite runner prompt assembly to consume overlay bundle surfaces and markdown fragments instead of single recipe scenario JSON blocks. 4. Update init and recipes commands to install+activate overlays, then run focused tests for recipes, init, runtime behavior, and runner prompt assembly."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-16T17:47:26.256Z — VERIFY — ok
    
    By: CODER
    
    Note: Overlay cutover checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-16T17:13:21.585Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    ### 2026-04-16T19:07:15.290Z — VERIFY — ok
    
    By: CODER
    
    Note: Overlay cutover and framework runtime bootstrap checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-16T17:47:26.258Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Validated overlay activation flow, runtime prompt stacking, manifest compatibility boundary, and CLI install validation.
      Impact: Project overlays now compile into generated artifacts and old scenario-only assumptions no longer bypass runtime validation.
      Resolution: Passed: bun run typecheck; bun test packages/recipes/src/index.test.ts; bun test packages/agentplane/src/runtime/behavior/resolve.test.ts; bun test packages/agentplane/src/runner/context/base-prompts.test.ts; bunx vitest run packages/agentplane/src/commands/recipes.list.test.ts; bunx vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts
    
    - Observation: Validated overlay activation flow, runtime prompt stacking, manifest compatibility boundary, CLI install validation, and repo-local framework bootstrap wiring.
      Impact: Project overlays compile into generated artifacts, invalid legacy manifests no longer bypass runtime validation, and framework checkouts resolve the current worktree runtime instead of foreign install layouts.
      Resolution: Passed: bun run typecheck; bun test packages/recipes/src/index.test.ts; bun test packages/agentplane/src/runtime/behavior/resolve.test.ts; bun test packages/agentplane/src/runner/context/base-prompts.test.ts; bunx vitest run packages/agentplane/src/commands/recipes.list.test.ts; bunx vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts; bunx vitest run packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts; node packages/agentplane/bin/agentplane.js runtime explain; agentplane task verify-show 202604161712-0N90F5
id_source: "generated"
---
## Summary

Cut over recipes to project overlays

Replace scenario-centric recipes with project overlays, activation state, and compiled runtime bundle.

## Scope

- In scope: Replace scenario-centric recipes with project overlays, activation state, and compiled runtime bundle.
- Out of scope: unrelated refactors not required for "Cut over recipes to project overlays".

## Plan

1. Remove duplicated recipes-domain code from packages/agentplane and route all recipe manifests/types/parsing through packages/recipes. 2. Replace scenario-centric recipe schema with project overlays only: activation state in config, recipes lock file, compiled overlay bundle, and overlay-first CLI commands. 3. Rewrite runner prompt assembly to consume overlay bundle surfaces and markdown fragments instead of single recipe scenario JSON blocks. 4. Update init and recipes commands to install+activate overlays, then run focused tests for recipes, init, runtime behavior, and runner prompt assembly.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-16T17:47:26.256Z — VERIFY — ok

By: CODER

Note: Overlay cutover checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-16T17:13:21.585Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

### 2026-04-16T19:07:15.290Z — VERIFY — ok

By: CODER

Note: Overlay cutover and framework runtime bootstrap checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-16T17:47:26.258Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Validated overlay activation flow, runtime prompt stacking, manifest compatibility boundary, and CLI install validation.
  Impact: Project overlays now compile into generated artifacts and old scenario-only assumptions no longer bypass runtime validation.
  Resolution: Passed: bun run typecheck; bun test packages/recipes/src/index.test.ts; bun test packages/agentplane/src/runtime/behavior/resolve.test.ts; bun test packages/agentplane/src/runner/context/base-prompts.test.ts; bunx vitest run packages/agentplane/src/commands/recipes.list.test.ts; bunx vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts

- Observation: Validated overlay activation flow, runtime prompt stacking, manifest compatibility boundary, CLI install validation, and repo-local framework bootstrap wiring.
  Impact: Project overlays compile into generated artifacts, invalid legacy manifests no longer bypass runtime validation, and framework checkouts resolve the current worktree runtime instead of foreign install layouts.
  Resolution: Passed: bun run typecheck; bun test packages/recipes/src/index.test.ts; bun test packages/agentplane/src/runtime/behavior/resolve.test.ts; bun test packages/agentplane/src/runner/context/base-prompts.test.ts; bunx vitest run packages/agentplane/src/commands/recipes.list.test.ts; bunx vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts; bunx vitest run packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts; node packages/agentplane/bin/agentplane.js runtime explain; agentplane task verify-show 202604161712-0N90F5
