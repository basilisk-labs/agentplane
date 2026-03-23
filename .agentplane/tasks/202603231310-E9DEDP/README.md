---
id: "202603231310-E9DEDP"
title: "R11: Assemble recipe context and materialize tasks"
result_summary: "Recipe scenarios can now produce deterministic task records and seeded README content through a shared runner-side materialization path."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
depends_on:
  - "202603231310-M3HBVK"
tags:
  - "code"
  - "recipes"
  - "tasks"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T13:10:54.271Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved task graph for runner/scenario execute rollout"
verification:
  state: "ok"
  updated_at: "2026-03-23T15:01:22.331Z"
  updated_by: "CODER"
  note: |-
    Command: bunx vitest run packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts
    Result: pass
    Evidence: 3 files, 13 tests passed; recipe scenario materialization wrote recipe provenance into origin, seeded Summary/Scope/Plan/Verify Steps in README, deterministic task building stayed stable, and scenario CLI remained green.
    Scope: packages/agentplane/src/runner/context/recipe-context.ts, packages/agentplane/src/runner/usecases/scenario-materialize-task.*, packages/agentplane/src/runner/index.ts, scenario install/materialization integration path
    
    Command: ./node_modules/.bin/eslint packages/agentplane/src/runner/context/recipe-context.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/index.ts
    Result: pass
    Evidence: no lint errors on new runner materialization code and exports.
    Scope: modified runner files for R11
commit:
  hash: "2c93d829950a6b0e3dad6d7d3d459b9c4506284e"
  message: "✅ E9DEDP code: done"
comments:
  -
    author: "CODER"
    body: "Start: assemble recipe context from the selected scenario, materialize a task from task_template with recipe provenance, and seed the task README without relying on ad-hoc scenario-to-task heuristics."
  -
    author: "CODER"
    body: "Verified: recipe context assembly now selects manifest/scenario/agent-skill-tool metadata together, materializes a task with recipe provenance, and seeds the README from task_template without ad-hoc scenario heuristics."
events:
  -
    type: "status"
    at: "2026-03-23T14:53:55.276Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: assemble recipe context from the selected scenario, materialize a task from task_template with recipe provenance, and seed the task README without relying on ad-hoc scenario-to-task heuristics."
  -
    type: "verify"
    at: "2026-03-23T15:01:22.331Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts
      Result: pass
      Evidence: 3 files, 13 tests passed; recipe scenario materialization wrote recipe provenance into origin, seeded Summary/Scope/Plan/Verify Steps in README, deterministic task building stayed stable, and scenario CLI remained green.
      Scope: packages/agentplane/src/runner/context/recipe-context.ts, packages/agentplane/src/runner/usecases/scenario-materialize-task.*, packages/agentplane/src/runner/index.ts, scenario install/materialization integration path
      
      Command: ./node_modules/.bin/eslint packages/agentplane/src/runner/context/recipe-context.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/index.ts
      Result: pass
      Evidence: no lint errors on new runner materialization code and exports.
      Scope: modified runner files for R11
  -
    type: "status"
    at: "2026-03-23T15:01:37.970Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: recipe context assembly now selects manifest/scenario/agent-skill-tool metadata together, materializes a task with recipe provenance, and seeds the README from task_template without ad-hoc scenario heuristics."
doc_version: 3
doc_updated_at: "2026-03-23T15:01:41.886Z"
doc_updated_by: "CODER"
description: "Build recipe runner context and create tasks with recipe provenance plus seeded task docs."
sections:
  Summary: |-
    R11: Assemble recipe context and materialize tasks
    
    Build recipe runner context and create tasks with recipe provenance plus seeded task docs.
  Scope: |-
    - In scope: Build recipe runner context and create tasks with recipe provenance plus seeded task docs.
    - Out of scope: unrelated refactors not required for "R11: Assemble recipe context and materialize tasks".
  Plan: |-
    1. Build bundle.recipe from manifest, resolved scenario, definition, and selected agents/skills/tools.
    2. Materialize a task from task_template and scenario context with origin=recipe metadata.
    3. Seed task docs with concrete Summary, Scope, Plan, and Verify Steps based on recipe context.
  Verify Steps: |-
    1. Materialize a task from a recipe scenario fixture. Expected: the task carries recipe provenance in origin metadata.
    2. Inspect the seeded README. Expected: Summary, Scope, Plan, and Verify Steps are populated from recipe context rather than placeholders.
    3. Run materialization tests. Expected: task creation is deterministic for the same recipe input.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T15:01:22.331Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts
    Result: pass
    Evidence: 3 files, 13 tests passed; recipe scenario materialization wrote recipe provenance into origin, seeded Summary/Scope/Plan/Verify Steps in README, deterministic task building stayed stable, and scenario CLI remained green.
    Scope: packages/agentplane/src/runner/context/recipe-context.ts, packages/agentplane/src/runner/usecases/scenario-materialize-task.*, packages/agentplane/src/runner/index.ts, scenario install/materialization integration path
    
    Command: ./node_modules/.bin/eslint packages/agentplane/src/runner/context/recipe-context.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/index.ts
    Result: pass
    Evidence: no lint errors on new runner materialization code and exports.
    Scope: modified runner files for R11
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T14:53:55.277Z, excerpt_hash=sha256:80a25c954c7f827aadf5d4a186a9362cfac64456dc473eda6498dda88fe4489e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

R11: Assemble recipe context and materialize tasks

Build recipe runner context and create tasks with recipe provenance plus seeded task docs.

## Scope

- In scope: Build recipe runner context and create tasks with recipe provenance plus seeded task docs.
- Out of scope: unrelated refactors not required for "R11: Assemble recipe context and materialize tasks".

## Plan

1. Build bundle.recipe from manifest, resolved scenario, definition, and selected agents/skills/tools.
2. Materialize a task from task_template and scenario context with origin=recipe metadata.
3. Seed task docs with concrete Summary, Scope, Plan, and Verify Steps based on recipe context.

## Verify Steps

1. Materialize a task from a recipe scenario fixture. Expected: the task carries recipe provenance in origin metadata.
2. Inspect the seeded README. Expected: Summary, Scope, Plan, and Verify Steps are populated from recipe context rather than placeholders.
3. Run materialization tests. Expected: task creation is deterministic for the same recipe input.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T15:01:22.331Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts
Result: pass
Evidence: 3 files, 13 tests passed; recipe scenario materialization wrote recipe provenance into origin, seeded Summary/Scope/Plan/Verify Steps in README, deterministic task building stayed stable, and scenario CLI remained green.
Scope: packages/agentplane/src/runner/context/recipe-context.ts, packages/agentplane/src/runner/usecases/scenario-materialize-task.*, packages/agentplane/src/runner/index.ts, scenario install/materialization integration path

Command: ./node_modules/.bin/eslint packages/agentplane/src/runner/context/recipe-context.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/index.ts
Result: pass
Evidence: no lint errors on new runner materialization code and exports.
Scope: modified runner files for R11

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T14:53:55.277Z, excerpt_hash=sha256:80a25c954c7f827aadf5d4a186a9362cfac64456dc473eda6498dda88fe4489e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
