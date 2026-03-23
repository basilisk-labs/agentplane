---
id: "202603231944-GPMSHY"
title: "Remove network from recipe run_profile contract"
result_summary: "recipes: remove run_profile network contract"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603231944-R1ARJ6"
tags:
  - "code"
  - "recipes"
  - "schema"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T19:46:14.928Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T19:53:15.049Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts; Result: pass; Evidence: 42 tests passed after removing network from recipe run_profile typing, normalization, resolver output, and helper fixtures. Scope: recipe contract semantics and direct consumers across resolver, fixtures, and runner-facing tests. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds completed successfully after the contract removal. Scope: source build compatibility for the touched recipe and runner code. Command: bunx prettier --check packages/agentplane/src/commands/recipes/impl/types.ts packages/agentplane/src/commands/recipes/impl/manifest.ts packages/agentplane/src/commands/recipes/impl/resolver.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/cli/run-cli.test-helpers.ts packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts && bunx eslint packages/agentplane/src/commands/recipes/impl/types.ts packages/agentplane/src/commands/recipes/impl/manifest.ts packages/agentplane/src/commands/recipes/impl/resolver.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/cli/run-cli.test-helpers.ts packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts; Result: pass; Evidence: formatting and lint passed on all touched files. Scope: style and static validation for the task diff."
commit:
  hash: "87cd5e26284767953accdc746183c9d21f95c24b"
  message: "✅ GPMSHY code: done"
comments:
  -
    author: "CODER"
    body: "Start: remove network from the recipe run_profile contract itself, update manifest normalization and resolver semantics, and adjust the minimum fixtures and tests needed to keep the contract consistent without the field."
  -
    author: "CODER"
    body: "Verified: Removed network from the supported recipe run_profile contract, dropped it from manifest normalization and resolver output, updated recipe helpers and direct consumer tests, and verified the new contract with recipe, runner, CLI, build, prettier, and eslint checks."
events:
  -
    type: "status"
    at: "2026-03-23T19:51:00.704Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove network from the recipe run_profile contract itself, update manifest normalization and resolver semantics, and adjust the minimum fixtures and tests needed to keep the contract consistent without the field."
  -
    type: "verify"
    at: "2026-03-23T19:53:15.049Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts; Result: pass; Evidence: 42 tests passed after removing network from recipe run_profile typing, normalization, resolver output, and helper fixtures. Scope: recipe contract semantics and direct consumers across resolver, fixtures, and runner-facing tests. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds completed successfully after the contract removal. Scope: source build compatibility for the touched recipe and runner code. Command: bunx prettier --check packages/agentplane/src/commands/recipes/impl/types.ts packages/agentplane/src/commands/recipes/impl/manifest.ts packages/agentplane/src/commands/recipes/impl/resolver.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/cli/run-cli.test-helpers.ts packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts && bunx eslint packages/agentplane/src/commands/recipes/impl/types.ts packages/agentplane/src/commands/recipes/impl/manifest.ts packages/agentplane/src/commands/recipes/impl/resolver.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/cli/run-cli.test-helpers.ts packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts; Result: pass; Evidence: formatting and lint passed on all touched files. Scope: style and static validation for the task diff."
  -
    type: "status"
    at: "2026-03-23T19:53:35.077Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Removed network from the supported recipe run_profile contract, dropped it from manifest normalization and resolver output, updated recipe helpers and direct consumer tests, and verified the new contract with recipe, runner, CLI, build, prettier, and eslint checks."
doc_version: 3
doc_updated_at: "2026-03-23T19:53:35.077Z"
doc_updated_by: "CODER"
description: "Delete the network field from recipe run_profile types, schema normalization, and resolver semantics, or reduce it to deprecated parse-only acceptance if a compatibility window is required."
sections:
  Summary: |-
    Remove network from recipe run_profile contract
    
    Delete the network field from recipe run_profile types, schema normalization, and resolver semantics, or reduce it to deprecated parse-only acceptance if a compatibility window is required.
  Scope: |-
    - In scope: Delete the network field from recipe run_profile types, schema normalization, and resolver semantics, or reduce it to deprecated parse-only acceptance if a compatibility window is required.
    - Out of scope: unrelated refactors not required for "Remove network from recipe run_profile contract".
  Plan: "1. Remove network from recipe run_profile typing and normalization semantics. 2. Decide and implement the compatibility mode for existing manifests. 3. Update resolver and scenario tests to reflect the new contract. 4. Verify with targeted tests and source builds."
  Verify Steps: "1. Run bunx vitest run packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/commands/recipes/impl/resolver.test.ts. 2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. 3. Confirm recipe run_profile no longer exposes network as a supported runtime policy field."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T19:53:15.049Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts; Result: pass; Evidence: 42 tests passed after removing network from recipe run_profile typing, normalization, resolver output, and helper fixtures. Scope: recipe contract semantics and direct consumers across resolver, fixtures, and runner-facing tests. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds completed successfully after the contract removal. Scope: source build compatibility for the touched recipe and runner code. Command: bunx prettier --check packages/agentplane/src/commands/recipes/impl/types.ts packages/agentplane/src/commands/recipes/impl/manifest.ts packages/agentplane/src/commands/recipes/impl/resolver.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/cli/run-cli.test-helpers.ts packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts && bunx eslint packages/agentplane/src/commands/recipes/impl/types.ts packages/agentplane/src/commands/recipes/impl/manifest.ts packages/agentplane/src/commands/recipes/impl/resolver.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/cli/run-cli.test-helpers.ts packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts; Result: pass; Evidence: formatting and lint passed on all touched files. Scope: style and static validation for the task diff.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T19:51:00.706Z, excerpt_hash=sha256:7ddb291b3f4e9e0b6abd43c28281403f7a4f7dd53648431fcd32001cf102f255
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove network from recipe run_profile contract

Delete the network field from recipe run_profile types, schema normalization, and resolver semantics, or reduce it to deprecated parse-only acceptance if a compatibility window is required.

## Scope

- In scope: Delete the network field from recipe run_profile types, schema normalization, and resolver semantics, or reduce it to deprecated parse-only acceptance if a compatibility window is required.
- Out of scope: unrelated refactors not required for "Remove network from recipe run_profile contract".

## Plan

1. Remove network from recipe run_profile typing and normalization semantics. 2. Decide and implement the compatibility mode for existing manifests. 3. Update resolver and scenario tests to reflect the new contract. 4. Verify with targeted tests and source builds.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/commands/recipes/impl/resolver.test.ts. 2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. 3. Confirm recipe run_profile no longer exposes network as a supported runtime policy field.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T19:53:15.049Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts; Result: pass; Evidence: 42 tests passed after removing network from recipe run_profile typing, normalization, resolver output, and helper fixtures. Scope: recipe contract semantics and direct consumers across resolver, fixtures, and runner-facing tests. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds completed successfully after the contract removal. Scope: source build compatibility for the touched recipe and runner code. Command: bunx prettier --check packages/agentplane/src/commands/recipes/impl/types.ts packages/agentplane/src/commands/recipes/impl/manifest.ts packages/agentplane/src/commands/recipes/impl/resolver.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/cli/run-cli.test-helpers.ts packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts && bunx eslint packages/agentplane/src/commands/recipes/impl/types.ts packages/agentplane/src/commands/recipes/impl/manifest.ts packages/agentplane/src/commands/recipes/impl/resolver.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/cli/run-cli.test-helpers.ts packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts; Result: pass; Evidence: formatting and lint passed on all touched files. Scope: style and static validation for the task diff.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T19:51:00.706Z, excerpt_hash=sha256:7ddb291b3f4e9e0b6abd43c28281403f7a4f7dd53648431fcd32001cf102f255

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
