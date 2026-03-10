---
id: "202603100816-BRJSBM"
title: "Recipes v1: add deterministic resolver and run-profile selection"
result_summary: "Deterministic resolver library landed for manifest-driven recipe selection; future CLI surfaces can now consume a single compatibility+run_profile contract."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202603100808-FKN7RT"
  - "202603100808-ZCCV0Z"
tags:
  - "code"
  - "recipes"
  - "resolver"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-10T11:28:32.303Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved by user in chat: continue closing the remaining recipes v1 task graph; resolver is the next ready task and remains bounded to manifest-driven selection without orchestration execution."
verification:
  state: "ok"
  updated_at: "2026-03-10T11:40:23.224Z"
  updated_by: "CODER"
  note: "Resolver API inspected via packages/agentplane/src/commands/recipes/impl/resolver.ts and representative selection assertions in packages/agentplane/src/commands/recipes.test.ts; bun typecheck, targeted recipes/scenario vitest contour, and package builds passed on commit b45ca2ba."
commit:
  hash: "b45ca2bab87de697e2dfb7ceef7e3a48f9fd6777"
  message: "✨ BRJSBM task: add deterministic recipe resolver"
comments:
  -
    author: "CODER"
    body: "Start: add a deterministic resolver over project-local self-contained recipes, producing scenario selection output and normalized run profiles without implementing orchestration execution."
  -
    author: "CODER"
    body: "Verified: added a deterministic recipe resolver over project-local self-contained recipes, normalized scenario run profiles, and explicit selection reasons without implementing orchestration execution."
events:
  -
    type: "status"
    at: "2026-03-10T11:28:35.974Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a deterministic resolver over project-local self-contained recipes, producing scenario selection output and normalized run profiles without implementing orchestration execution."
  -
    type: "verify"
    at: "2026-03-10T11:40:23.224Z"
    author: "CODER"
    state: "ok"
    note: "Resolver API inspected via packages/agentplane/src/commands/recipes/impl/resolver.ts and representative selection assertions in packages/agentplane/src/commands/recipes.test.ts; bun typecheck, targeted recipes/scenario vitest contour, and package builds passed on commit b45ca2ba."
  -
    type: "status"
    at: "2026-03-10T11:40:29.210Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: added a deterministic recipe resolver over project-local self-contained recipes, normalized scenario run profiles, and explicit selection reasons without implementing orchestration execution."
doc_version: 3
doc_updated_at: "2026-03-10T11:40:29.210Z"
doc_updated_by: "CODER"
description: "Introduce a recipe resolver layer that scans project-local recipes, validates manifest compatibility, resolves scenario selection, and produces a deterministic run profile without implementing orchestration execution."
id_source: "generated"
---
## Summary

Recipes v1: add deterministic resolver and run-profile selection

Introduce a recipe resolver layer that scans project-local recipes, validates manifest compatibility, resolves scenario selection, and produces a deterministic run profile without implementing orchestration execution.

## Scope

- In scope: Introduce a recipe resolver layer that scans project-local recipes, validates manifest compatibility, resolves scenario selection, and produces a deterministic run profile without implementing orchestration execution.
- Out of scope: unrelated refactors not required for "Recipes v1: add deterministic resolver and run-profile selection".

## Plan

1. Add a resolver module that reads project-local recipes, validates compatibility against the current project/runtime context, and exposes deterministic scenario listings plus scenario selection output with explicit reasons. 2. Introduce resolver return types for selected recipe/scenario and normalized run_profile so other CLI surfaces can consume a single decision contract. 3. Cover resolver behavior with focused unit/CLI tests, then verify with typecheck plus recipe/scenario test contours.

## Verify Steps

1. Inspect the resolver API and one representative selection result. Expected: project-local recipe scanning returns deterministic scenario descriptors plus a normalized `run_profile` and explicit selection reasons.
2. Run `bun run typecheck`. Expected: new resolver types and call sites compile cleanly across recipes and scenario surfaces.
3. Run `bun x vitest run packages/agentplane/src/commands/recipes.test.ts packages/agentplane/src/commands/scenario/impl/commands.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: resolver behavior and dependent recipe/scenario flows pass without regressions.
4. Run `git status --short`. Expected: final diff is limited to the resolver task scope and task-artifact updates.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-10T11:40:23.224Z — VERIFY — ok

By: CODER

Note: Resolver API inspected via packages/agentplane/src/commands/recipes/impl/resolver.ts and representative selection assertions in packages/agentplane/src/commands/recipes.test.ts; bun typecheck, targeted recipes/scenario vitest contour, and package builds passed on commit b45ca2ba.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-10T11:37:07.344Z, excerpt_hash=sha256:6d601a34522f42b41c58d20d508ebb8c5931cbf38cb60b2656a4b55d02f42b97

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Resolver intentionally matches only structured constraints (`recipeId`, `scenarioId`, `tags`, `mode`, `available_inputs`) plus manifest compatibility. `use_when` remains descriptive text and is not used for deterministic auto-selection in v1.
