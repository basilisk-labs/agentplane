---
id: "202603100809-1EE43W"
title: "Recipes v1: migrate examples, docs, and tests to self-contained model"
result_summary: "Bundled recipes, inventory/docs, and CLI reference surfaces are synchronized with recipes v1 self-contained architecture and resolver-backed scenario semantics."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202603100808-FKN7RT"
  - "202603100808-ZCCV0Z"
  - "202603100816-BRJSBM"
  - "202603100809-JCK8G1"
tags:
  - "code"
  - "recipes"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-10T11:52:05.675Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved by user in chat: finish the remaining recipes v1 migration work by syncing examples, docs, help, and reference artifacts with the self-contained scenario-first placeholder model."
verification:
  state: "ok"
  updated_at: "2026-03-10T12:00:29.566Z"
  updated_by: "CODER"
  note: "Updated docs/inventory and generated CLI reference were inspected directly; bundled viewer/dokploy manifests in agentplane-recipes were validated through the runtime parser; bun typecheck, targeted recipes/scenario/help vitest suites, and package builds passed on commit 6839068e."
commit:
  hash: "6839068ed67e7a784734556fd4dccc3fa474f3de"
  message: "✨ 1EE43W task: sync recipe docs and examples with v1"
comments:
  -
    author: "CODER"
    body: "Start: migrate recipe docs, inventory, command metadata, and remaining reference surfaces to the self-contained scenario-first model and the non-executing scenario-run placeholder."
  -
    author: "CODER"
    body: "Verified: recipe docs, bundled examples, command metadata, help snapshot, and generated CLI reference now match the self-contained scenario-first v1 model and the non-executing scenario-run placeholder."
events:
  -
    type: "status"
    at: "2026-03-10T11:52:14.214Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate recipe docs, inventory, command metadata, and remaining reference surfaces to the self-contained scenario-first model and the non-executing scenario-run placeholder."
  -
    type: "verify"
    at: "2026-03-10T12:00:29.566Z"
    author: "CODER"
    state: "ok"
    note: "Updated docs/inventory and generated CLI reference were inspected directly; bundled viewer/dokploy manifests in agentplane-recipes were validated through the runtime parser; bun typecheck, targeted recipes/scenario/help vitest suites, and package builds passed on commit 6839068e."
  -
    type: "status"
    at: "2026-03-10T12:00:37.355Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: recipe docs, bundled examples, command metadata, help snapshot, and generated CLI reference now match the self-contained scenario-first v1 model and the non-executing scenario-run placeholder."
doc_version: 3
doc_updated_at: "2026-03-10T12:00:37.355Z"
doc_updated_by: "CODER"
description: "Update bundled recipe examples, docs, and automated tests to match the project-local self-contained recipe architecture and scenario-first public contract."
id_source: "generated"
---
## Summary

Recipes v1: migrate examples, docs, and tests to self-contained model

Update bundled recipe examples, docs, and automated tests to match the project-local self-contained recipe architecture and scenario-first public contract.

## Scope

- In scope: Update bundled recipe examples, docs, and automated tests to match the project-local self-contained recipe architecture and scenario-first public contract.
- Out of scope: unrelated refactors not required for "Recipes v1: migrate examples, docs, and tests to self-contained model".

## Plan

1. Update recipe-facing docs and inventory artifacts so they describe project-local self-contained recipes, scenario-first public entrypoints, and the current non-executing `scenario run` placeholder behavior.
2. Sync scenario command metadata and generated reference/help surfaces with the new resolver-backed list/info/run semantics.
3. Adjust any remaining bundled examples or tests that still describe the old global install or step-execution model, then verify with targeted recipes/scenario/help checks.

## Verify Steps

1. Inspect the updated recipe docs/inventory and one CLI reference surface. Expected: docs describe project-local self-contained recipes, scenario-first entrypoints, and `scenario run` as a prepared-plan placeholder rather than a step executor.
2. Run `bun run typecheck`. Expected: command metadata, docs-linked codepaths, and remaining recipe surfaces compile cleanly.
3. Run `bun x vitest run packages/agentplane/src/commands/recipes.test.ts packages/agentplane/src/commands/scenario/impl/commands.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: recipes/scenario behavior plus help/reference snapshots pass after the doc/metadata sync.
4. Run `git status --short`. Expected: final diff is limited to the recipes v1 migration scope and task-artifact updates.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-10T12:00:29.566Z — VERIFY — ok

By: CODER

Note: Updated docs/inventory and generated CLI reference were inspected directly; bundled viewer/dokploy manifests in agentplane-recipes were validated through the runtime parser; bun typecheck, targeted recipes/scenario/help vitest suites, and package builds passed on commit 6839068e.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-10T11:59:42.074Z, excerpt_hash=sha256:fcec126fbf9eb0bbf53dc259178d151f6123937a2cdd3e59b5c85a03213cd15e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- `scenario run` in recipes v1 is now a non-executing placeholder by design: it resolves the manifest-level scenario through the deterministic resolver, validates recipe-local files plus the scenario definition contract, prints a prepared run plan, and returns without creating `runs/` artifacts.
- Bundled recipe examples in the nested `agentplane-recipes` repository were synchronized to the scenario-first manifest contract so docs and inventory now reference real self-contained bundles. Nested repo commit: `675fa64`.
