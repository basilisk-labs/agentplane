---
id: "202603100808-ZCCV0Z"
title: "Recipes v1: move install/runtime storage to project recipes directory"
result_summary: "Project-local recipes runtime storage is now the canonical install/discovery surface; install preserves runs/, validates recipe-local assets, and keeps --on-conflict as a compatibility no-op."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202603100808-FKN7RT"
tags:
  - "code"
  - "recipes"
  - "storage"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-10T10:49:37.283Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved by user in chat: recipes are project-local self-contained resources and must stop exporting internals into shared project registries."
verification:
  state: "ok"
  updated_at: "2026-03-10T11:24:31.885Z"
  updated_by: "CODER"
  note: "Verified project-local recipe storage shift with: bun run typecheck; bun x vitest run packages/agentplane/src/commands/recipes.test.ts packages/agentplane/src/commands/scenario/impl/commands.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts --hookTimeout 60000 --testTimeout 60000; bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --hookTimeout 60000 --testTimeout 60000; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build; git status --short."
commit:
  hash: "cb2c197f0b5efc016dbf6422033a89fdb172803d"
  message: "♻️ recipes: move installs to project-local runtime storage"
comments:
  -
    author: "CODER"
    body: "Start: move recipe storage semantics to project-local .agentplane/recipes, remove export into shared registries, and switch recipe discovery away from the global installed registry."
  -
    author: "CODER"
    body: "Verified: recipe installs now land in project-local .agentplane/recipes, install writes recipe-local provenance, scenario/recipe discovery scans project recipes, and install no longer exports recipe internals into shared registries."
events:
  -
    type: "status"
    at: "2026-03-10T10:49:44.516Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: move recipe storage semantics to project-local .agentplane/recipes, remove export into shared registries, and switch recipe discovery away from the global installed registry."
  -
    type: "verify"
    at: "2026-03-10T11:24:31.885Z"
    author: "CODER"
    state: "ok"
    note: "Verified project-local recipe storage shift with: bun run typecheck; bun x vitest run packages/agentplane/src/commands/recipes.test.ts packages/agentplane/src/commands/scenario/impl/commands.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts --hookTimeout 60000 --testTimeout 60000; bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --hookTimeout 60000 --testTimeout 60000; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build; git status --short."
  -
    type: "status"
    at: "2026-03-10T11:24:42.204Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: recipe installs now land in project-local .agentplane/recipes, install writes recipe-local provenance, scenario/recipe discovery scans project recipes, and install no longer exports recipe internals into shared registries."
doc_version: 3
doc_updated_at: "2026-03-10T11:24:42.204Z"
doc_updated_by: "CODER"
description: "Move recipe install/remove/list/info storage semantics to project-local .agentplane/recipes and stop exporting recipe internals into shared project registries."
id_source: "generated"
---
## Summary

Recipes v1: move install/runtime storage to project recipes directory

Move recipe install/remove/list/info storage semantics to project-local .agentplane/recipes and stop exporting recipe internals into shared project registries.

## Scope

- In scope: move installed recipe storage and truth source to project-local `.agentplane/recipes/<recipe-id>/`.
- In scope: keep remote index and download cache global, but stop treating global installed registry as runtime source of truth.
- In scope: remove recipe install-time export into shared project registries such as `.agentplane/agents` and recipe-generated scenario indexes.
- In scope: switch `recipes list/info/explain/remove` storage semantics to project filesystem scan and recipe-local install metadata.
- In scope: remove or neutralize install-time conflict handling that only existed for shared agent export.
- Out of scope: scenario resolver selection logic and real orchestration runtime.

## Plan

1. Rework recipe path resolution so installed recipes live under the current project `.agentplane/recipes`, while remote index and archive cache remain outside the project.
2. Remove install-time export of recipe-local agents and scenario metadata into shared project registries, along with the obsolete conflict-handling path behind that export.
3. Switch `recipes list/info/explain/remove` to scan project-local recipe directories and recipe-local install metadata instead of global installed-registry state.
4. Update tests and verification coverage for project-local storage semantics and record evidence.

## Verify Steps

1. `bun run typecheck`
   Expected: storage-path and install/list/remove command changes compile cleanly across recipes/scenario surfaces.
2. `bun x vitest run packages/agentplane/src/commands/recipes.test.ts packages/agentplane/src/commands/scenario/impl/commands.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts --hookTimeout 60000 --testTimeout 60000`
   Expected: project-local recipe storage semantics and dependent scenario command flows pass.
3. `git status --short`
   Expected: final diff is limited to intentional storage/install/task artifacts for this task.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-10T11:24:31.885Z — VERIFY — ok

By: CODER

Note: Verified project-local recipe storage shift with: bun run typecheck; bun x vitest run packages/agentplane/src/commands/recipes.test.ts packages/agentplane/src/commands/scenario/impl/commands.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts --hookTimeout 60000 --testTimeout 60000; bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --hookTimeout 60000 --testTimeout 60000; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build; git status --short.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-10T10:49:44.516Z, excerpt_hash=sha256:88cc4b8b82bfa4869857f1e3af8601ebbe9c76243df72df4b6e85e3c16eeed06

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert project-local recipe storage and scan changes introduced by this task.
- Re-run task verification commands to confirm the previous global-registry behavior is restored.
- Leave resolver and scenario-placeholder follow-up tasks untouched so rollback stays limited to storage/install semantics.

## Findings
