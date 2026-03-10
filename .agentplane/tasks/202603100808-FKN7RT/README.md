---
id: "202603100808-FKN7RT"
title: "Recipes v1: redefine self-contained manifest contract"
result_summary: "Manifest v1 contract redefined for scenario-first self-contained recipes"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "recipes"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-10T08:17:17.721Z"
  updated_by: "ORCHESTRATOR"
  note: "Re-approved after user clarification: manifest v1 must expose resolver-facing selection metadata, explicit compatibility, and run_profile without implementing orchestration runtime."
verification:
  state: "ok"
  updated_at: "2026-03-10T10:41:40.538Z"
  updated_by: "REVIEWER"
  note: "Manifest v1 contract passes schema/type/test verification"
commit:
  hash: "cbccaad679d62a0a45803b7d08ebf1c4bd39374f"
  message: "✨ recipes: redefine scenario-first manifest contract"
comments:
  -
    author: "CODER"
    body: "Start: rework recipes manifest contract around project-local self-contained packages, scenario-first public metadata, and first-class skills without implementing scenario orchestration yet."
  -
    author: "INTEGRATOR"
    body: "Verified: manifest v1 contract now models self-contained scenario-first recipes with first-class skills, compatibility metadata, and run-profile descriptors; verification passed and mirrored schema sync was recorded for the nested recipe repository."
events:
  -
    type: "status"
    at: "2026-03-10T08:10:41.025Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: rework recipes manifest contract around project-local self-contained packages, scenario-first public metadata, and first-class skills without implementing scenario orchestration yet."
  -
    type: "verify"
    at: "2026-03-10T10:41:40.538Z"
    author: "REVIEWER"
    state: "ok"
    note: "Manifest v1 contract passes schema/type/test verification"
  -
    type: "status"
    at: "2026-03-10T10:46:02.285Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: manifest v1 contract now models self-contained scenario-first recipes with first-class skills, compatibility metadata, and run-profile descriptors; verification passed and mirrored schema sync was recorded for the nested recipe repository."
doc_version: 3
doc_updated_at: "2026-03-10T10:46:02.285Z"
doc_updated_by: "INTEGRATOR"
description: "Redesign recipe manifest/types/validation around project-local self-contained recipes, scenario-first public entry points, and first-class skills without implementing orchestration runtime."
id_source: "generated"
---
## Summary

Recipes v1: redefine self-contained manifest contract

Redesign recipe manifest/types/validation around project-local self-contained recipes, scenario-first public entry points, and first-class skills without implementing orchestration runtime.

## Scope

- In scope: redesign recipe manifest schema, TypeScript types, and runtime validation for project-local self-contained recipes.
- In scope: make scenarios the only public recipe entry points at the manifest level and add first-class `skills`.
- In scope: add resolver-facing selection metadata, including scenario `run_profile` and explicit compatibility fields, so manifest becomes self-sufficient for discovery and selection.
- In scope: remove manifest-level assumptions that recipe agents or scenarios are exported into shared project registries.
- Out of scope: real scenario orchestration runtime and multi-agent execution semantics beyond placeholder wiring.

## Plan

1. Align recipe manifest schema and runtime types with the self-contained project-local recipe model.
2. Add first-class `skills`, explicit compatibility fields, and scenario-level public descriptors sufficient for recipe discovery and selection without reading internal files.
3. Introduce manifest-level `run_profile` metadata as part of the public scenario contract while keeping execution out of scope.
4. Update manifest parsing and validation to enforce the new contract and reject stale export-oriented assumptions.
5. Cover the new contract with targeted tests and record verification evidence.

## Verify Steps

1. `bun run schemas:check`
   Expected: recipe schema files stay synchronized after manifest v1 changes.
2. `bun run typecheck`
   Expected: updated recipe/scenario types compile without regressions in touched codepaths.
3. `bun x vitest run packages/agentplane/src/commands/recipes.test.ts packages/agentplane/src/commands/scenario/impl/commands.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts --hookTimeout 60000 --testTimeout 60000`
   Expected: targeted recipes and scenario command coverage passes for the new manifest contract.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-10T10:41:40.538Z — VERIFY — ok

By: REVIEWER

Note: Manifest v1 contract passes schema/type/test verification

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-10T10:41:28.805Z, excerpt_hash=sha256:c0aaf07f2a59f50b34c0c3f06eac2386268d7ce2b094b479b73200f89e0fd29a

Details:

- Command: `bun run schemas:check`
  Result: pass
  Evidence: `schemas OK`.
  Scope: root schema parity check after recipe manifest contract changes.
- Command: `bun run typecheck`
  Result: pass
  Evidence: `tsc -b` exited with code 0.
  Scope: recipe/scenario type surfaces and command integrations.
- Command: `bun x vitest run packages/agentplane/src/commands/recipes.test.ts packages/agentplane/src/commands/scenario/impl/commands.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts --hookTimeout 60000 --testTimeout 60000`
  Result: pass
  Evidence: 84 tests passed across recipes/scenario/runtime CLI suites.
  Scope: manifest validation, recipe install/list/info/explain, scenario list/info/run, and runtime edge cases.
- Command: `bun run --filter=@agentplaneorg/core build` and `bun run --filter=agentplane build`
  Result: pass
  Evidence: both package builds exited with code 0 after watched runtime changes.
  Scope: refreshed local task tooling/runtime before verify/finish operations.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert manifest/schema/type validation changes introduced by this task.
- Re-run the task verification commands to confirm legacy recipe contract behavior is restored.
- Leave storage/install and scenario runner follow-up tasks untouched so the rollback stays scoped to manifest v1.

## Findings

- User explicitly approved widening scope to the nested `agentplane-recipes` repository so the mirrored recipe manifest schema could stay in sync with the main repository contract.
- Nested repository commit recorded for schema parity: `da36123` (`feat(schema): align recipe manifest contract with scenario-first recipes`).
