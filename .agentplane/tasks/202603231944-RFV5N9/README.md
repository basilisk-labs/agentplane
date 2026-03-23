---
id: "202603231944-RFV5N9"
title: "Update recipe fixtures and CLI tests after runner network removal"
result_summary: "recipes: no residual fixture drift after network removal"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603231944-GPMSHY"
tags:
  - "code"
  - "test"
  - "recipes"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T19:46:17.905Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T19:54:51.892Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts; Result: pass; Evidence: 26 CLI and recipe scenario tests passed with no remaining runner-level network field in helper-generated recipe surfaces. Scope: fixture and CLI-facing recipe flows after the contract removal. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds completed successfully while the task workspace stayed code-clean. Scope: source build compatibility after the previous contract cleanup. Command: rg -n \"network: false|network: true|AGENTPLANE_RECIPE_NETWORK|run_profile.*network|\\\\.network\\b\" packages/agentplane/src/cli packages/agentplane/src/commands/recipes packages/agentplane/src/runner; Result: pass; Evidence: no remaining runner/recipes matches were found, and the only residual require_network hits live in global approval tests outside this task scope. Scope: residual fixture and CLI audit for the deleted runner network field."
commit:
  hash: "e546f66fbb400783bd0e3878ed1ca40094459f26"
  message: "✅ RFV5N9 code: done"
comments:
  -
    author: "CODER"
    body: "Start: inspect the remaining fixtures, generated examples, and CLI-facing recipe surfaces after the run_profile network contract removal, then close only the leftover test or helper drift that still depends on the deleted field."
  -
    author: "CODER"
    body: "Verified: Audited the remaining helper-generated recipe fixtures and CLI scenario surfaces after the network contract removal, confirmed there is no leftover runner-level network drift, and reran the declared scenario suites and builds to prove the empty residual state."
events:
  -
    type: "status"
    at: "2026-03-23T19:53:57.677Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect the remaining fixtures, generated examples, and CLI-facing recipe surfaces after the run_profile network contract removal, then close only the leftover test or helper drift that still depends on the deleted field."
  -
    type: "verify"
    at: "2026-03-23T19:54:51.892Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts; Result: pass; Evidence: 26 CLI and recipe scenario tests passed with no remaining runner-level network field in helper-generated recipe surfaces. Scope: fixture and CLI-facing recipe flows after the contract removal. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds completed successfully while the task workspace stayed code-clean. Scope: source build compatibility after the previous contract cleanup. Command: rg -n \"network: false|network: true|AGENTPLANE_RECIPE_NETWORK|run_profile.*network|\\\\.network\\b\" packages/agentplane/src/cli packages/agentplane/src/commands/recipes packages/agentplane/src/runner; Result: pass; Evidence: no remaining runner/recipes matches were found, and the only residual require_network hits live in global approval tests outside this task scope. Scope: residual fixture and CLI audit for the deleted runner network field."
  -
    type: "status"
    at: "2026-03-23T19:55:12.148Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Audited the remaining helper-generated recipe fixtures and CLI scenario surfaces after the network contract removal, confirmed there is no leftover runner-level network drift, and reran the declared scenario suites and builds to prove the empty residual state."
doc_version: 3
doc_updated_at: "2026-03-23T19:55:12.148Z"
doc_updated_by: "CODER"
description: "Rewrite recipe fixtures, scenario tests, CLI tests, and generated examples so they no longer depend on run_profile.network or AGENTPLANE_RECIPE_NETWORK."
sections:
  Summary: |-
    Update recipe fixtures and CLI tests after runner network removal
    
    Rewrite recipe fixtures, scenario tests, CLI tests, and generated examples so they no longer depend on run_profile.network or AGENTPLANE_RECIPE_NETWORK.
  Scope: |-
    - In scope: Rewrite recipe fixtures, scenario tests, CLI tests, and generated examples so they no longer depend on run_profile.network or AGENTPLANE_RECIPE_NETWORK.
    - Out of scope: unrelated refactors not required for "Update recipe fixtures and CLI tests after runner network removal".
  Plan: "1. Rewrite recipe fixtures and CLI tests so they stop generating or asserting runner network policy. 2. Update helper archives/examples used by runner and scenario tests. 3. Verify that recipe and CLI suites pass on the new contract. 4. Keep the diff limited to fixtures and tests."
  Verify Steps: "1. Run bunx vitest run packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts. 2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. 3. Confirm helper-generated recipe manifests and CLI expectations no longer contain run_profile.network or AGENTPLANE_RECIPE_NETWORK."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T19:54:51.892Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts; Result: pass; Evidence: 26 CLI and recipe scenario tests passed with no remaining runner-level network field in helper-generated recipe surfaces. Scope: fixture and CLI-facing recipe flows after the contract removal. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds completed successfully while the task workspace stayed code-clean. Scope: source build compatibility after the previous contract cleanup. Command: rg -n "network: false|network: true|AGENTPLANE_RECIPE_NETWORK|run_profile.*network|\\.network\b" packages/agentplane/src/cli packages/agentplane/src/commands/recipes packages/agentplane/src/runner; Result: pass; Evidence: no remaining runner/recipes matches were found, and the only residual require_network hits live in global approval tests outside this task scope. Scope: residual fixture and CLI audit for the deleted runner network field.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T19:53:57.679Z, excerpt_hash=sha256:eccbc31ce169ae2244ecfc63abfe02c2d1072d292ed0c055b8980ecd2b4cd52a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Update recipe fixtures and CLI tests after runner network removal

Rewrite recipe fixtures, scenario tests, CLI tests, and generated examples so they no longer depend on run_profile.network or AGENTPLANE_RECIPE_NETWORK.

## Scope

- In scope: Rewrite recipe fixtures, scenario tests, CLI tests, and generated examples so they no longer depend on run_profile.network or AGENTPLANE_RECIPE_NETWORK.
- Out of scope: unrelated refactors not required for "Update recipe fixtures and CLI tests after runner network removal".

## Plan

1. Rewrite recipe fixtures and CLI tests so they stop generating or asserting runner network policy. 2. Update helper archives/examples used by runner and scenario tests. 3. Verify that recipe and CLI suites pass on the new contract. 4. Keep the diff limited to fixtures and tests.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts. 2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. 3. Confirm helper-generated recipe manifests and CLI expectations no longer contain run_profile.network or AGENTPLANE_RECIPE_NETWORK.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T19:54:51.892Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts; Result: pass; Evidence: 26 CLI and recipe scenario tests passed with no remaining runner-level network field in helper-generated recipe surfaces. Scope: fixture and CLI-facing recipe flows after the contract removal. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds completed successfully while the task workspace stayed code-clean. Scope: source build compatibility after the previous contract cleanup. Command: rg -n "network: false|network: true|AGENTPLANE_RECIPE_NETWORK|run_profile.*network|\\.network\b" packages/agentplane/src/cli packages/agentplane/src/commands/recipes packages/agentplane/src/runner; Result: pass; Evidence: no remaining runner/recipes matches were found, and the only residual require_network hits live in global approval tests outside this task scope. Scope: residual fixture and CLI audit for the deleted runner network field.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T19:53:57.679Z, excerpt_hash=sha256:eccbc31ce169ae2244ecfc63abfe02c2d1072d292ed0c055b8980ecd2b4cd52a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
