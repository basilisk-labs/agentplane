---
id: "202603231310-M3HBVK"
title: "R10: Extend recipes with explicit task_template"
result_summary: "Recipe scenarios now carry an explicit task_template contract through validation and resolver selection, with focused unit and CLI coverage for valid and invalid paths."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
depends_on:
  - "202603231310-XXHQBY"
tags:
  - "code"
  - "recipes"
  - "schema"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T13:10:52.577Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved task graph for runner/scenario execute rollout"
verification:
  state: "ok"
  updated_at: "2026-03-23T14:52:47.415Z"
  updated_by: "CODER"
  note: |-
    Command: bunx vitest run packages/agentplane/src/commands/recipes/impl/scenario.test.ts packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts
    Result: pass
    Evidence: 4 files, 38 tests passed; scenario definitions require task_template, resolver selection hydrates normalized task_template data, invalid task_template errors stay precise, and recipe/scenario CLI flows remained green.
    Scope: packages/agentplane/src/commands/recipes/**, packages/agentplane/src/commands/scenario/impl/commands.ts, packages/agentplane/src/cli/run-cli.scenario.test.ts, packages/agentplane/src/cli/run-cli.recipes.test.ts, packages/agentplane/src/cli/run-cli.test-helpers.ts
    
    Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/recipes.ts packages/agentplane/src/commands/recipes/impl/types.ts packages/agentplane/src/commands/recipes/impl/scenario.ts packages/agentplane/src/commands/recipes/impl/resolver.ts packages/agentplane/src/commands/scenario/impl/commands.ts packages/agentplane/src/cli/run-cli.test-helpers.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/commands/recipes/impl/scenario.test.ts packages/agentplane/src/commands/recipes/impl/resolver.test.ts
    Result: pass
    Evidence: no lint errors on modified recipe/scenario runtime and tests.
    Scope: modified source and test files for R10
commit:
  hash: "88b4320452bec67ecf18dcbb8b2707e2bf8f0111"
  message: "✅ M3HBVK code: done"
comments:
  -
    author: "CODER"
    body: "Start: add an explicit task_template block to recipe scenarios, normalize it through the resolver, and fail fast when recipe execution data would otherwise depend on task-creation heuristics."
  -
    author: "CODER"
    body: "Verified: scenario definitions now require explicit task_template data, resolver selection hydrates normalized task_template metadata, and scenario CLI surfaces precise validation failures instead of relying on task-creation heuristics."
events:
  -
    type: "status"
    at: "2026-03-23T14:38:57.685Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add an explicit task_template block to recipe scenarios, normalize it through the resolver, and fail fast when recipe execution data would otherwise depend on task-creation heuristics."
  -
    type: "verify"
    at: "2026-03-23T14:52:47.415Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/agentplane/src/commands/recipes/impl/scenario.test.ts packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts
      Result: pass
      Evidence: 4 files, 38 tests passed; scenario definitions require task_template, resolver selection hydrates normalized task_template data, invalid task_template errors stay precise, and recipe/scenario CLI flows remained green.
      Scope: packages/agentplane/src/commands/recipes/**, packages/agentplane/src/commands/scenario/impl/commands.ts, packages/agentplane/src/cli/run-cli.scenario.test.ts, packages/agentplane/src/cli/run-cli.recipes.test.ts, packages/agentplane/src/cli/run-cli.test-helpers.ts
      
      Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/recipes.ts packages/agentplane/src/commands/recipes/impl/types.ts packages/agentplane/src/commands/recipes/impl/scenario.ts packages/agentplane/src/commands/recipes/impl/resolver.ts packages/agentplane/src/commands/scenario/impl/commands.ts packages/agentplane/src/cli/run-cli.test-helpers.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/commands/recipes/impl/scenario.test.ts packages/agentplane/src/commands/recipes/impl/resolver.test.ts
      Result: pass
      Evidence: no lint errors on modified recipe/scenario runtime and tests.
      Scope: modified source and test files for R10
  -
    type: "status"
    at: "2026-03-23T14:53:06.412Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: scenario definitions now require explicit task_template data, resolver selection hydrates normalized task_template metadata, and scenario CLI surfaces precise validation failures instead of relying on task-creation heuristics."
doc_version: 3
doc_updated_at: "2026-03-23T14:53:10.409Z"
doc_updated_by: "CODER"
description: "Add a task_template contract to recipe scenarios so scenario execute can materialize tasks without heuristics."
sections:
  Summary: |-
    R10: Extend recipes with explicit task_template
    
    Add a task_template contract to recipe scenarios so scenario execute can materialize tasks without heuristics.
  Scope: |-
    - In scope: Add a task_template contract to recipe scenarios so scenario execute can materialize tasks without heuristics.
    - Out of scope: unrelated refactors not required for "R10: Extend recipes with explicit task_template".
  Plan: |-
    1. Extend recipe scenario and manifest contracts with task_template fields.
    2. Thread the normalized task_template through recipe parsing and resolver output.
    3. Add schema and resolver tests that reject invalid task_template definitions.
  Verify Steps: |-
    1. Resolve a scenario with task_template data. Expected: normalized task_template fields are present in resolver output.
    2. Load an invalid recipe manifest/scenario. Expected: validation fails with a precise task_template error.
    3. Run recipe schema and resolver tests. Expected: existing recipe flows stay green.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T14:52:47.415Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/commands/recipes/impl/scenario.test.ts packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts
    Result: pass
    Evidence: 4 files, 38 tests passed; scenario definitions require task_template, resolver selection hydrates normalized task_template data, invalid task_template errors stay precise, and recipe/scenario CLI flows remained green.
    Scope: packages/agentplane/src/commands/recipes/**, packages/agentplane/src/commands/scenario/impl/commands.ts, packages/agentplane/src/cli/run-cli.scenario.test.ts, packages/agentplane/src/cli/run-cli.recipes.test.ts, packages/agentplane/src/cli/run-cli.test-helpers.ts
    
    Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/recipes.ts packages/agentplane/src/commands/recipes/impl/types.ts packages/agentplane/src/commands/recipes/impl/scenario.ts packages/agentplane/src/commands/recipes/impl/resolver.ts packages/agentplane/src/commands/scenario/impl/commands.ts packages/agentplane/src/cli/run-cli.test-helpers.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/commands/recipes/impl/scenario.test.ts packages/agentplane/src/commands/recipes/impl/resolver.test.ts
    Result: pass
    Evidence: no lint errors on modified recipe/scenario runtime and tests.
    Scope: modified source and test files for R10
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T14:38:57.686Z, excerpt_hash=sha256:db2153d180ddc22ee7da6770a06ff2cb5efbd0e78b01d8e7d9b7bbe2b43c0805
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

R10: Extend recipes with explicit task_template

Add a task_template contract to recipe scenarios so scenario execute can materialize tasks without heuristics.

## Scope

- In scope: Add a task_template contract to recipe scenarios so scenario execute can materialize tasks without heuristics.
- Out of scope: unrelated refactors not required for "R10: Extend recipes with explicit task_template".

## Plan

1. Extend recipe scenario and manifest contracts with task_template fields.
2. Thread the normalized task_template through recipe parsing and resolver output.
3. Add schema and resolver tests that reject invalid task_template definitions.

## Verify Steps

1. Resolve a scenario with task_template data. Expected: normalized task_template fields are present in resolver output.
2. Load an invalid recipe manifest/scenario. Expected: validation fails with a precise task_template error.
3. Run recipe schema and resolver tests. Expected: existing recipe flows stay green.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T14:52:47.415Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/recipes/impl/scenario.test.ts packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts
Result: pass
Evidence: 4 files, 38 tests passed; scenario definitions require task_template, resolver selection hydrates normalized task_template data, invalid task_template errors stay precise, and recipe/scenario CLI flows remained green.
Scope: packages/agentplane/src/commands/recipes/**, packages/agentplane/src/commands/scenario/impl/commands.ts, packages/agentplane/src/cli/run-cli.scenario.test.ts, packages/agentplane/src/cli/run-cli.recipes.test.ts, packages/agentplane/src/cli/run-cli.test-helpers.ts

Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/recipes.ts packages/agentplane/src/commands/recipes/impl/types.ts packages/agentplane/src/commands/recipes/impl/scenario.ts packages/agentplane/src/commands/recipes/impl/resolver.ts packages/agentplane/src/commands/scenario/impl/commands.ts packages/agentplane/src/cli/run-cli.test-helpers.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/commands/recipes/impl/scenario.test.ts packages/agentplane/src/commands/recipes/impl/resolver.test.ts
Result: pass
Evidence: no lint errors on modified recipe/scenario runtime and tests.
Scope: modified source and test files for R10

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T14:38:57.686Z, excerpt_hash=sha256:db2153d180ddc22ee7da6770a06ff2cb5efbd0e78b01d8e7d9b7bbe2b43c0805

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
